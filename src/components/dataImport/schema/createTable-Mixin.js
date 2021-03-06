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
        ifIncrement: 0,
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

      // 是否生成建表语句
      // dataFlagForCrtOdsDll
      // 是否执行建表语句
      // dataFlagForCrtOdsHive
      this.tableList = data.list
      for (let i = 0; i < this.tableList.length; i++) {
        if (this.tableList[i].dataFlagForCrtOdsHive !== '1') {
          this.tableList[i].createTableStatus = 'none'
        } else {
          this.tableList[i].createTableStatus = 'success'
        }

        this.tableList[i].index = i
        if (this.tableList[i].odsDataLoadMode == null) {
          this.tableList[i].odsDataLoadMode = 'none'
        }
      }
      // var indexs = []
      // await this.tableList.forEach(item => {
      //   indexs.push(item.index)
      // })
      // this.defaultCheck(indexs)
    },
    async setValue (val) {
      if (val != null && val.length > 0) {
        this.value = val
        this.search()
      }
    },
    // 定义ODS加载策略
    async getODSLoadMode () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      const loading = this.getLoading('定义ODS加载策略...')
      const { data: { code, msg } } = await this.$http.post('/hiveCreateTable/getODSLoadMode', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) {
        this.$message.error(msg)
      } else {
        // 查询ods表名和加载策略
        await this.selectOdsLoadMode()
        // 判断ODS加载策略成功，生成ods建表语句
        await this.saveOdsDdlInfo()

        await this.search()
      }
    },
    // 查询ods表名及加载策略
    async  selectOdsLoadMode () {
      var indexs = []
      const loading = this.getLoading('查询ods加载策略...')
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/selectOdsLoadMode',
        this.multipleSelection)

      loading.close()
      if (code !== 200) {
        this.$message.error(msg)
      } else {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          data[i].index = this.multipleSelection[i].index
          data[i].createTableStatus = 'none'
          this.tableList.splice(this.multipleSelection[i].index, 1, data[i])
          indexs.push(this.multipleSelection[i].index)
        }
      }
      this.defaultCheck(indexs)
    },
    // 生成ods建表语句
    async  saveOdsDdlInfo () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      const loading = this.getLoading('正在生成ODS建表语句...')
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/saveOdsDdlInfo', {
        params: this.multipleSelection
      })
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success('建表语句生成成功')
    },
    // 执行ods建表语句
    async odsCreateTable () {
      var flag = false
      // 判断是否存在未生成建表语句的表
      this.multipleSelection.forEach(item => {
        if (!item.odsDataLoadMode || item.odsDataLoadMode === 'none') {
          flag = true
        }
      })
      // 若都已生成过建表语句，则可以建表
      if (flag) {
        this.$message.warning('存在上一步未成功的数据')
        return
      }
      const loading = this.getLoading('正在建表...')
      const { data: { data, code, msg } } = await this.$http.post('/hiveCreateTable/createOdsTable', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) {
        this.$message.error(msg)
      } else {
        this.$message.success(msg)
      }
      let indexs = []
      // 更新建表状态
      for (let i = 0; i < this.multipleSelection.length; i++) {
        // indexs.push
        this.multipleSelection[i].createTableStatus = data[i].result
        if (data[i].result === '成功') {
          indexs.push(this.multipleSelection[i].index)
        }
        this.tableList.splice(this.multipleSelection[i].index, 1, this.multipleSelection[i])
      }
      this.defaultCheck(indexs)
    },
    async view (row, modify) {
      this.dialog.visible = false
      if (row.odsDataLoadMode === 'increment') {
        this.dialog.ifIncrement = 1
      }
      const { data: { data, code, msg } } =
        await this.$http.get('/hiveCreateTable/selectOdsDdlInfo', {
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
      const { data: { data, code, msg } } =
        await this.$http.post('/hiveCreateTable/updateOdsTable', submitData)
      if (code !== 200) return this.$message.error(msg)
      let msg2 = '增量数据更新成功'
      if (this.dialog.activeName === 'first') {
        msg2 = '全量数据更新成功'
      }
      this.$message.success(msg2)
    },
    // 默认勾选源库中存在的表
    defaultCheck (indexs) {
      if (indexs) {
        indexs.forEach(index => {
          this.$refs.tableList.toggleRowSelection(this.tableList[index], true)
        })
      } else {
        this.$refs.tableList.clearSelection()
      }
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
    },
    handleClose () {
      this.dialog.visible = false
      this.dialog.fullContext = ''
      this.dialog.incrementContext = ''
    },
    // dialog表单重置
    formReset () {
      if (this.dialog.activeName === 'first') {
        this.dialog.fullContext =
          this.dialog.sourceFullData.odsDataTableDdlInfo
      } else {
        this.dialog.incrementContext =
          this.dialog.sourceIncrementData.odsDataTableDdlInfo
      }
    },
    filterTag (value, row) {
      return row.metaStatus === value
    },
    getLoading (text) {
      return this.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  mounted () {
  }
}
