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
      value: ''
    }
  },
  methods: {
    // 获取列表数据
    async getData () {
      const { data: { data, code } } = await this.$http.get('/getSourceMetaData/getSchema', {
        params: this.reqParams
      })
      console.log(data)
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableList = data.list
      this.total = data.total
      // this.systemOptions = data
      // var hash = {};
      // this.systemOptions = this.systemOptions.reduce(function(arr, current) {
      //     hash[current.businessSystemNameShortName] ? '' : hash[current.businessSystemNameShortName] = true && arr.push(current);
      //     return arr
      // }, [])
      // this.systemOptions.forEach(item => {
      //   item.text = item.businessSystemNameShortName
      //   item.value = item.businessSystemNameShortName
      // })
    },
    // 获取下拉列表数据
    async selectData () {
      const { data: { code, msg, data } } = await this.$http.get('/getSourceMetaData/getSystemFilterList')
      console.log(data)
      if (code !== 200) return this.$message.error(msg)
      data.forEach(item => {
        this.systemList.push({ label: item, value: item })
      })
    },
    // 查询
    async search () {
      this.reqParams.query = []
      this.reqParams.query.push(this.value)
      console.log(this.value, this.reqParams.query)
      const { data: { data, msg, code } } = await this.$http.post('/getSourceMetaData/getSchemaByFilter', this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      this.tableList = data.list
      this.total = data.total
    },
    // 获取状态
    async getStatus () {
      const loading = this.$loading({
        lock: true,
        text: '正在获取...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { code, msg } } = await this.$http.post('/getSourceMetaData/importingMetadata', this.multipleSelection)
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
    // 分页 点击当前页，改变pagenum
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      if (this.value) {
        this.search()
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
    this.selectData()
  }
}
