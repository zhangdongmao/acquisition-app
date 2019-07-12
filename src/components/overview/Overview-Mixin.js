import { runInThisContext } from "vm";

export default {
  name: 'Overview',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        // 表名
        tablename: '',
        pagesize: 50,
        systemname: '',
        schema: ''
      },
      total: 0,
      // 表名
      sourceTable: '',
      tableList: [],
      tablevalue: '',
      systemvalue: '',
      schemavalue: '',
      systemList: [],
      schemaList: [],
      dialogTableVisible: false,
      tableInfo: []
    }
  },
  methods: {
    async getData () {
      this.reqParams.systemname = this.systemvalue
      this.reqParams.schema = this.schemavalue
      this.reqParams.tablename = this.tablevalue
      const {data: {data, code, msg}} = await this.$http.get('/enterHuOverview/getSysNameAndSchemaAndTableName',{
        params: this.reqParams
      })
      if (code !== 200) return this.$message.error(msg)
      this.tableList = data.list
      this.total = data.total
    },
    // 下拉 系统名列表
    async getSystemList () {
      const {data: {data, code, msg}} = await this.$http.get('/enterHuOverview/getSystemName')
      if (code !== 200) return this.$message.error(msg)
      data.forEach(item => {
        this.systemList.push({value: item, label: item})
      });
      // console.log(data)
    },
    // 切换系统名 显示数据模式
    async handleChange (val) {
      console.log(val)
      this.schemaList = []
      const {data: {data, code, msg}} = await this.$http.get(`/enterHuOverview/getSchema`, {
        params: {"systemname": val}
      })
      if (code !== 200) return this.$message.error(msg)
      data.forEach(item => {
        this.schemaList.push({value: item, label: item})
      });
    },
    // 弹出层
    async tableName (row) {
      console.log(row)
      this.dialogTableVisible = true
      const {data: {data, code, msg}} = await this.$http.get(`/enterHuOverview/getByTableInfo?systemname=${row.businessSystemNameShortName}&schema=${row.dataSourceSchema}&tablename=${row.dataSourceTable}`)
      if (code !== 200) return this.$message.error(msg)
      this.tableInfo = data
      this.tableInfo.forEach(item => {
        if (!item.dataSourceColLen) {
          if (item.dataSourceColScale && item.dataSourceColScale !== "0") {
            item.dataSourceColLen = item.dataSourceColDatatype + '(' + item.dataSourceColOrder + ',' + item.dataSourceColScale + ')'
          } else {
            item.dataSourceColLen = item.dataSourceColDatatype + '(' + item.dataSourceColOrder + ')'
          }
        }
      })
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    },

  },
  mounted () {
    this.getData()
    this.getSystemList()
  }
}
