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
      value: []
    }
  },
  methods: {
    // 获取列表数据
    async getData () {
      const loading = this.$loading({
        lock: true,
        text: '正在获取...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const {data: {data, code}} = await this.$http.get('/hiveCreateTable/getODSTableInfo',{
        params: this.reqParams
      })
      loading.close()
      console.log(data)
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableList = data.list
      this.total = data.total
    },
    async getODSLoadMode () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '定义ODS加载策略...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const {data: {code,msg}} = await this.$http.post('/hiveCreateTable/getODSLoadMode', this.multipleSelection)
        console.log(code,msg)
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
    // 获取下拉列表
    async selectSystem () {
      const {data: {data, code, msg}} = await this.$http.get('/hiveCreateTable/getODSSystemAndSchemaFilterList')
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
      const {data: {data, code, msg}} = await this.$http.post('/hiveCreateTable/getODSCreateTabListByFilter',this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      console.log(data)
      this.tableList = data.list
      this.total = data.total
      console.log(this.reqParams.query[0])
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
      console.log(data)
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
    this.getData()
    this.selectSystem()
  }
}
