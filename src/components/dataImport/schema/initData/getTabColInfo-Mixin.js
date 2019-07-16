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
      this.reqParams.query = this.value;
      console.log(this.value,this.reqParams.query)
      const {data: {data, msg, code}} = await this.$http.post('/getSourceMetaData/getSchemaByFilter',this.reqParams)
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
      });
      const {data: {code, msg}} = await this.$http.post('/getSourceMetaData/importingMetadata',this.multipleSelection)
      console.log(code,msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg);
      this.search()
    },
    async setValue (val) {
      if(val != null ){
        this.value = val;
        this.search();
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
    }
  },
  mounted () {
  }
}
