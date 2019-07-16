export default {
  name: 'CreateODSTable',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        query: [],
        pagesize: 500
      },
      total: 0,
      listLoading: false,
      tableList: [],
      // 选中项
      multipleSelection: [],
      // 下拉列表
      selectList: [],
      value: [],
      dialog: {
        ifModify: 0,
        activeName: 'first',
        visible: false,
        title: '编辑',
        tab1: '全量',
        tab2: '增量',
        fullContext: '',
        incrementContext: '',
        sourceFullData: {
          odsDataTableDdlInfo: '',
          businessSystemNameShortName: '',
          dataSourceSchema: '',
          dataSourceTable: '',
          odsDataTable: ''
        },
        sourceIncrementData: {}
      }

    }
  },
  methods: {
    // 查询
    async search () {
      this.reqParams.query = []
      this.reqParams.query = this.value
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/getDataSourceTabInfoBySysSortNameAndDataSourceSchemas', this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      console.log(data)
      this.tableList = data.list
      this.tableList.forEach(function (item) {
        item.executeStatus = 'none'
      })
    },
    async setValue (val) {
      if (val != null) {
        this.value = val
        this.search()
      }
    },
    // 定义ODS加载策略
    async getODSLoadMode () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '定义ODS加载策略...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const { data: { code, msg } } = await this.$http.post('/hiveCreateTable/getODSLoadMode', this.multipleSelection)
        console.log(code, msg)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          // 查询ods表名和加载策略
          this.selectOdsLoadMode()
          // 判断ODS加载策略成功，生成ods建表语句
          this.saveOdsDdlInfo()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    // 查询ods标名及加载策略
    async  selectOdsLoadMode () {
      const loading = this.$loading({
        lock: true,
        text: '查询ods加载策略...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/selectOdsLoadMode',
        this.multipleSelection)

      for (let i = 0; i < this.tableList.length; i++) {
        let row = this.tableList[i]
        for (let j = 0; j < data.length; j++) {
          let row2 = data[j]
          if (row.businessSystemNameShortName == row2.businessSystemNameShortName &&
            row.dataSourceSchema == row2.dataSourceSchema &&
            row.dataSourceTable == row2.dataSourceTable) {
            row.odsDataTable = row2.odsDataTable
            if (row2.odsDataLoadMode == 'full') {
              row.odsDataLoadMode = '全量'
            }
            if (row2.odsDataLoadMode == 'increment') {
              row.odsDataLoadMode = '增量'
            }
            this.tableList.splice(this.tableList[i].index, 1, row)
          }
        }
      }
      loading.close()
      if (code !== 200) return this.$message.error(msg)
    },
    // 生成ods建表语句
    async  saveOdsDdlInfo () {
      const loading = this.$loading({
        lock: true,
        text: '正在生成ODS建表语句...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/saveOdsDdlInfo', {
        params: this.multipleSelection
      })
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
    },
    // 执行ods建表语句
    async odsCreateTable () {
      const loading = this.$loading({
        lock: true,
        text: '正在建表...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/createOdsTable', this.multipleSelection)
      console.log(code, msg)
      for (let i = 0; i < this.tableList.length; i++) {
        let row = this.tableList[i]
        for (let j = 0; j < data.length; j++) {
          let row2 = data[j]
          if (row.businessSystemNameShortName == row2.businessSystemNameShortName &&
            row.dataSourceSchema == row2.dataSourceSchema &&
            row.dataSourceTable == row2.dataSourceTable) {
            row.executeStatus = row2.result
            this.tableList.splice(this.tableList[i].index, 1, row)
          }
        }
      }
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
    },
    async view (row, modify) {
      this.dialog.visible = false

      const { data: { data, code, msg } } = await this.$http.get('/hiveCreateTable/selectOdsDdlInfo', {
        params: row
      })
      // str.charAt(str.length - 1) == "="
      if (data != null && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let odsDataSchema = data[i].odsDataSchema
          if (odsDataSchema.endsWith('_inc')) {
            this.dialog.sourceIncrementData = data[i]
            this.dialog.incrementContext = data[i].odsDataTableDdlInfo
          } else {
            this.dialog.sourceFullData = data[i]
            this.dialog.fullContext = data[i].odsDataTableDdlInfo
          }
        }
      }

      if (this.dialog.ifModify === 0) {
        this.dialog.title = '查看'
      }
      if (this.dialog.ifModify != 0) {
        this.dialog.title = '编辑'
      }
      this.dialog.visible = true
    },
    async formSubmit () {
      let submitData = {}
      if (this.dialog.activeName === 'first') {
        submitData = this.dialog.sourceFullData
        submitData.odsDataTableDdlInfo = this.dialog.fullContext
      } else {
        submitData = this.dialog.sourceIncrementData
        submitData.odsDataTableDdlInfo = this.dialog.incrementContext
      }

      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/updateOdsTable', submitData)
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 分页 点击当前页，改变pagenum
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.search()
    },
    handleChange (val) {
      // console.log(val)
    },
    handleClose () {
      this.dialog.visible = false
      this.dialog.fullContext = ''
      this.dialog.incrementContext = ''
    },
    formReset () {
      if (this.dialog.activeName === 'first') {
        this.dialog.fullContext = this.dialog.sourceFullData.odsDataTableDdlInfo
      } else {
        this.dialog.incrementContext = this.dialog.sourceIncrementData.odsDataTableDdlInfo
      }
    }
  },
  mounted () {
  }
}
