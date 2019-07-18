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
      let tableData = params.tableList
      // 执行脚本状态 生成脚本状态
      tableData.forEach(item => {
        item.executeScriptStatus = 'none'
        item.createScriptStatus = 'none'
      })
      _this.tableList = tableData
      _this.total = params.tatal
      var indexs = []
      await params.multipleSelection.forEach(item => {
        indexs.push(item.index)
      })
      this.defaultCheck(indexs)
    },
    // 生成初始化脚本
    async  initOdsLoad () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      let flag = false
      this.multipleSelection.forEach(item => {
        if (item.createTableStatus !== 'success') {
          flag = true
        }
      })
      if (flag) {
        this.$message.warning('存在上一步未成功的数据')
        return
      }

      const loading = this.getLoading('正在生成初始化脚本...')
      const { data: { data, code, msg } } =
        await this.$http.post('/generateScript/initOdsLoad', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)

      for (let i = 0; i < this.multipleSelection.length; i++) {
        let index = this.multipleSelection[i].index
        let row = this.tableList[index]
        row.createScriptStatus = 'success'
        this.tableList.splice(index, 1, row)
      }
    },
    // 生成待执行脚本文件
    async getPreExecuteFile () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      let flag = false
      // 判断是否存在未生成初始化脚本的表
      this.multipleSelection.forEach(item => {
        if (item.createScriptStatus !== 'success') {
          flag = true
        }
      })
      if (flag) {
        this.$message.warning('存在上一步未成功的数据')
        return
      }

      const loading = this.getLoading('正在生成待执行脚本文件...')
      const { data: { data, code, msg } } =
        await this.$http.post('/executeScript/generateAllSqoopScript', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.execDispatchCommand()

      // this.$message.success(msg)
    },
    // 执行初始化脚本
    async execDispatchCommand () {
      const loading = this.getLoading('正在执行初始化脚本...')
      const { data: { data, code, msg } } =
        await this.$http.post('/executeScript/execDispatchCommand', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.viewSqoopStatus()
    },
    // 获取执行脚本后的状态
    async viewSqoopStatus () {
      const loading = this.getLoading('正在获取执行脚本后的状态...')
      let params = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        params.push(this.multipleSelection[i].odsDataTable)
      }
      const { data: { data, code, msg } } = await this.$http.post('/executeScript/viewSqoopStatus', params)

      loading.close()
      if (code !== 200) return this.$message.error(msg)
      console.log(data, msg)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let oldOdsDataTable = this.multipleSelection[i].odsDataTable
        let index = this.multipleSelection[i].index
        let row = this.tableList[index]
        for (let j = 0; j < data.length; j++) {
          let row2 = data[j]
          if (oldOdsDataTable === row2.odsDataTable) {
            row.executeScriptStatus = row2.status
            this.tableList.splice(index, 1, row)
          }
        }
      }
      this.$message.success(msg)
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
    // 默认勾选源库中存在的表
    defaultCheck (indexs) {
      if (indexs) {
        indexs.forEach(index => {
          this.$refs.multipleTable.toggleRowSelection(this.tableList[index], true)
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
