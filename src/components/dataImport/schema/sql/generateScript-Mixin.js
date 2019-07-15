export default {
  name: 'GenerateODSScript',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        query: [],
        pagesize: 5000
      },
      total: 0,
      // 列表数据
      tableList: [],
      // 选中项
      multipleSelection: [],
      selectList: [],
      options: [],
      value: ''
    }
  },
  methods: {
    // 获取列表数据
    async getData () {
      const {data: {data, code}} = await this.$http.get('/generateScript/getODSTableInfo',{
        params: this.reqParams
      })
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableList = data.list
      this.total = data.total
      console.log(data)
    },
    // 获取下拉列表
    async selectSystem () {
      const {data: {data, code, msg}} = await this.$http.get('/generateScript/getOdsSystemFilterList',{
        params: this.reqParams
      })
      if (code !== 200) return this.$message.error(msg)
      data.forEach(item => {
        this.selectList.push({label: item, value: item})
      });
      console.log(this.selectList)
    },
    // 查询
    async search () {
      this.reqParams.query = []
      this.reqParams.query.push(this.value)
      const {data: {data, code, msg}} = await this.$http.post('/generateScript/getOdsListByFilter',this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      this.tableList = data.list
      this.total = data.total
      // this.value = ''
    },
    // 获取状态
    async getStatus () {
      const loading = this.$loading({
          lock: true,
          text: '正在初始化脚本...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      const {data: {code, msg}} = await this.$http.post('/generateScript/generateSqoopScript',{
        params: this.multipleSelection
      })
      console.log(code,msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg);
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
    // 切换页码
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      if (this.value) {
        this.search()
      }else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
    this.selectSystem()
  }
}
