export default {
  name: 'createOdsTable',
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
      // 选中项
      multipleSelection: [],
      tableInfo: []
    }
  },
  methods: {
    setTableList (tableList) {
      let _this = this
      _this.tableList = tableList
    },
    filterTag (value, row) {
      return row.metaStatus === value
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
    // 默认勾选源库中存在的表
    defaultCheck (indexs) {
      if (indexs) {
        indexs.forEach(index => {
          console.log('index:', index)
          this.$refs.tableList.toggleRowSelection(this.$refs.tableList.data[index], true)
        })
      } else {
        this.$refs.tableList.clearSelection()
      }
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
