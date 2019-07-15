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
      tableList: [],
      // 选中项
      multipleSelection: [],
      // 下拉列表
      selectList: [],
      value: [],
      dialogVisible: false,
      dialogTitle: '查看',
      form: {
        ddl: ''
      }
    }
  },
  methods: {
    // 查询
    async search () {
      this.reqParams.query = []
      this.reqParams.query = this.value
      const {data: {data, code, msg}} = await this.$http.post('/hiveCreateTable/getDataSourceTabInfoBySysSortNameAndDataSourceSchemas',this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      console.log(data)
      this.tableList = data.list
      this.total = data.total
      console.log(this.reqParams.query)
    },
    async setValue (param) {
      if(param.length == 0){
        return;
      }
        this.value = param;
        this.search();
    },
      // 定义ODS加载策略
      async getODSLoadMode() {
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
            // 判断ODS加载策略成功，执行建表操作
            this.odsCreateTable()
          }
        } else {
          this.$message.warning('请勾选相应表名')
        }
      },
    // ods建表
    async odsCreateTable () {
      const loading = this.$loading({
        lock: true,
        text: '正在建表...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const {data: {data, code, msg}} = await this.$http.post('/hiveCreateTable/createODSTable',{
        params: this.multipleSelection
      })
      console.log(code, msg)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success(msg)
      this.search()
    },
    async view (row){
      this.dialogVisible = false;
      this.dialogTitle = '查看' ;
      this.dialogVisible = true;
   

    },
    async modify (row){
      this.dialogVisible = false;
      this.dialogTitle = '修改' ;
      this.dialogVisible = true;
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 分页 点击当前页，改变pagenum
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      if (this.value.length !== 0) {
        this.search()
      }else {
        this.getData()
      }
    },
    handleChange (val) {
      // console.log(val)
    }
  },
  mounted () {
  }
}
