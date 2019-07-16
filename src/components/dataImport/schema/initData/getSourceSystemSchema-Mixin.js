
export default {
  name: 'GetSourceSystemSchema',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        query: '',
        pagesize: 50
      },
      total: 0,
      // 数据列表
      tableList: [],
      // 选中项
      multipleSelection: []
    }
  },
  methods: {
    // 获取列表数据
    async getData () {
      const { data: { data, code } } = await this.$http.get('/getSourceMetaData/getDataInfo', {
        params: this.reqParams
      })
      console.log(data)
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableList = data.list
      this.total = data.total
    },
    // 获取状态
    async getStatus (row) {
      const loading = this.$loading({
        lock: true,
        text: '正在获取...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { data: { code, msg } } = await this.$http.post('/getSourceMetaData/getConnection', this.multipleSelection)
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.multipleSelection = []
      this.$message.success(msg)
      this.getData()
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 切换页码
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
