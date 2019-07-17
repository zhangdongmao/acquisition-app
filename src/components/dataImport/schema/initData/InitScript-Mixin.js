export default {
  name: 'initData',
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
      dialog: {
        ifModify: 0,
        visible: false,
        title: '编辑',
        context: '',
        sourceData: {
          data: ''
        }
      },
      dialogTable: {
        visible: false,
        title: '查看',
        context: '',
        tableList: [],
        tableTitles: []
      }

    }
  },
  methods: {
    // 初始化页面值
    async setValue (params) {
      let _this = this
      console.log(params)
      let tableData = params.tableList
      tableData.forEach(item => {
        item.executeStatus = 'none'
      })
      _this.tableList = tableData
      _this.total = params.tatal
      var indexs = []
      await params.multipleSelection.forEach(item => {
        indexs.push(item.index)
      })
      indexs.forEach(index => {
        this.$refs.multipleTable.toggleRowSelection(this.tableList[index], true)
      })
    },
    // 生成初始化脚本
    async  initOdsLoad () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      // const loading = this.$loading({
      //   lock: true,
      //   text: '正在生成初始化脚本...',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      console.log(this.multipleSelection)
      const { data: { data, code, msg } } = await this.$http.post('/generateScript/initOdsLoad', this.multipleSelection)
      console.log(code, msg)
      // loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
    },
    // 执行初始化脚本
    async execDispatchCommand () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '正在执行初始化脚本...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { data, code, msg } } = await this.$http.post('/executeScript/execDispatchCommand', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.viewSqoopStatus()
      this.$message.success(msg)
    },
    // 获取执行脚本后的状态
    async viewSqoopStatus () {
      const loading = this.$loading({
        lock: true,
        text: '正在获取执行脚本后的状态...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let params = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        params.push(this.multipleSelection[i].odsDataTable)
      }

      const { data: { data, code, msg } } = await this.$http.post('/executeScript/viewSqoopStatus', params)
      loading.close()
      if (code === 200) {
        for (let i = 0; i < this.tableList.length; i++) {
          let row = this.tableList[i]
          for (let j = 0; j < data.length; j++) {
            let row2 = data[j]
            if (row.odsDataTable === row2.odsDataTable) {
              row.executeStatus = row2.status
              this.tableList.splice(this.tableList[i].index, 1, row)
            }
          }
        }
      }
    },
    // 查看数据校验
    async viewHiveData (row, modify) {
      this.dialogTable.visible = false
      let param = { params: { odsDataTable: 'test' } }
      const { data: { data, code, msg } } = await this.$http.get('/executeScript/viewHiveData', param)
      this.dialogTable.tableList = data.data
      this.dialogTable.tableTitles = data.title
      this.dialogTable.visible = true
    },
    // 查看脚本
    async view (row, modify) {
      this.dialog.visible = false
      const { data: { data, code, msg } } = await this.$http.post('/executeScript/viewSqoopScript', row)

      this.dialog.context = data
      this.dialog.sourceData = row
      this.dialog.sourceData.context = data

      if (this.dialog.ifModify === 0) {
        this.dialog.title = '查看'
      }
      if (this.dialog.ifModify != 0) {
        this.dialog.title = '编辑'
      }
      this.dialog.visible = true
    },
    // 保存脚本
    async formSubmit () {
      let sumitData = {
        businessSystemNameShortName: this.dialog.sourceData.businessSystemNameShortName,
        dataSourceSchema: this.dialog.sourceData.dataSourceSchema,
        dataSourceTable: this.dialog.sourceData.dataSourceTable,
        odsDataSqoopDefine: this.dialog.context
      }

      const { data: { data, code, msg } } = await this.$http.post('/executeScript/saveSqoopScript', sumitData)

      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
      this.handleClose()
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
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
      // console.log(val)
    },
    handleClose () {
      this.dialog.visible = false
      this.dialog.context = ''
    },
    dialogTableHandleClose () {
      this.dialogTable.visible = false
    },
    formReset () {
      this.dialog.context = this.dialog.sourceData.context
    }
  },
  mounted () {

  }
}
