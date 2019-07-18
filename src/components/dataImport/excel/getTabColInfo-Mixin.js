export default {
  data () {
    return {
      // 请求列表参数
      reqParams: {
        pagenum: 1,
        query: [],
        pagesize: 50
      },
      // 总条数
      total: 0,
      // 列表数据
      tableList: [],
      // 选中项
      multipleSelection: [],
      // 下拉列表
      systemList: [],
      value: []
    }
  },
  methods: {

    // 查询
    async search () {
      this.reqParams.query = []
      this.reqParams.query = this.value
      console.log(this.value, this.reqParams.query)
      const { data: { data, msg, code } } = await this.$http.post('/getSourceMetaData/getSchemaByFilter', this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      for (let i = 0; i < data.list.length; i++) {
        data.list[i].index = i
      }
      this.tableList = data.list
      this.total = data.total
      var indexs = []
      await this.tableList.forEach(item => {
        indexs.push(item.index)
      })
      this.defaultCheck(indexs)
    },
    // 获取状态
    async getStatus () {
      if (this.multipleSelection.length === 0) {
        if (this.tableList.length === 0) {
          this.$message.warning('暂无数据')
          return
        } else {
          this.$message.warning('请勾选相应表名')
          return
        }
      }
      const loading = this.getLoading('正在获取...')
      const { data: { code, msg } } = await this.$http.post('/getSourceMetaData/importingMetadata', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
    },
    async setValue (val) {
      if (val != null && val.length !== 0) {
        this.value = val
        this.search()
      }
    },
    // 默认勾选源库中存在的表
    defaultCheck (indexs) {
      if (indexs) {
        indexs.forEach(index => {
          console.log(index)
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
