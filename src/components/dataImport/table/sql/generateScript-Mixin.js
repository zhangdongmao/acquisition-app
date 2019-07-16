export default {
  name: 'tableGenerateODSScript',
  data () {
    return {
      // 列表数据
      tableList: [{ businessSystemNameShortName: 'erp' }],
      // 选中项
      multipleSelection: []
    }
  },
  created () {
    this.test()
  },
  methods: {
    test () {
      this.tableList = [{ businessSystemNameShortName: 'dms' }]
    },
    // 获取状态
    async getStatus () {
      const loading = this.$loading({
        lock: true,
        text: '正在初始化脚本...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { code, msg } } = await this.$http.post('/generateScript/generateSqoopScript', {
        params: this.multipleSelection
      })
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
      if (this.reqParams.query.length !== 0) {
        this.search()
      } else {
        this.getData()
      }
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    setTableList (tableList) {
      this.tableList = tableList
      console.log(this.tableList)
    },
    indexMethod (index) {
      return index
    },
    filterCrtResult (value, row) {
      console.log(row)
      return row.createResult === value
    },
    clearFilter () {
      this.$refs.tableList.clearFilter()
    },
    filterTag (value, row) {
      return row.metaStatus === value
    }
  }
}
