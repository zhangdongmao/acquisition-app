export default {
  name: 'CreateDWTable',
  data () {
    return {
      // 列表请求参数
      reqParams: {
        pagenum: 1,
        query: [],
        pagesize: 500
      },
      // 总条数
      total: 0,
      // 数据列表
      tableList: [],
      // 选中项
      multipleSelection: [],
      // 级联列表
      selectList: [],
      value: ''
    }
  },
  methods: {
    // 获取列表数据
    async getData () {
      const {data: {data, code}} = await this.$http.get('/hiveCreateTable/getDWCreateTabList', {
        params: this.reqParams
      })
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableList = data.list
      this.total = data.total
      console.log(data)
    },
    // 获取下拉列表
    async selectSystem () {
      const {data: {data, code, msg}} = await this.$http.get('/hiveCreateTable/getDWSystemAndSchemaFilterList')
      if (code !== 200) return this.$message.error(msg)
      // 遍历业务系统
      for (var i = 0; i < data.length; i++) {
        this.selectList.push({value: data[i].businessSystemNameShortName + ' ', label: data[i].businessSystemNameShortName})
        // 遍历数据模式
        this.selectList[i].children = []
        for (var j = 0; j < data[i].dataSourceSchemas.length; j++) {
          this.selectList[i].children.push({
            value: data[i].dataSourceSchemas[j],
            label: data[i].dataSourceSchemas[j]
          })
        }
      }
    },
    // 查询
    async search () {
      this.reqParams.query = []
      this.reqParams.query = this.value
      const {data: {data, code, msg}} = await this.$http.post('/hiveCreateTable/getDWCreateTabListByFilter',this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      this.total = data.total
      this.tableList = data.list
      // this.selectList = []
    },
    // 获取状态
    async getStatus () {
      const loading = this.$loading({
          lock: true,
          text: '正在建表...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      const {data: {code,msg}} = await this.$http.post('/hiveCreateTable/dWCreateTable',{
        params: this.multipleSelection
      })
      // console.log(code,msg)
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
    // 分页 点击当前页，改变pagenum
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      if (this.value.length !== 0) {
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
