export default {
  name: 'tableGetTabColInfo',
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
      tablevalue: 'commodity',
      systemvalue: '',
      schemavalue: 'test',
      systemList: [],
      schemaList: [],
      dialogTableVisible: false,
      // 选中项
      multipleSelection: [],
      tableInfo: []
    }
  },
  methods: {
    async getMetaData () {
      let indexs = []
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在获取...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // console.log(this.multipleSelection)
        const { data: { code, msg, data } } = await this.$http.post('/convertMetadata/importingMetadata', this.multipleSelection)

        if (code !== 200) {
          loading.close()
          return this.$message.error(msg)
        }

        for (let i = 0; i < data.length; i++) {
          this.tableList.splice(this.multipleSelection[i].index, 1, data[i])
        }
        console.log(this.tableList)
        this.tableList.forEach(item => {
          if (item.metaStatus) {
            if (item.metaStatus === 'exists') {
              item.metaStatus = '已探源'
              item.tagType = 'success'
              indexs.push(item.index)
            } else if (item.metaStatus === 'not_exists') {
              item.metaStatus = '无表'
              item.tagType = 'warning'
            } else if (item.metaStatus === 'con_not_exists') {
              item.metaStatus = '无连接'
              item.tagType = 'warning'
            }
          } else {
            item.metaStatus = '未查询'
            item.tagType = 'info'
          }
        })
        this.defaultCheck(indexs)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.getIndexInfo()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },

    // 获取索引
    async getIndexInfo () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在获取...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const { data: { code, msg, data } } = await this.$http.post('/convertMetadata/importIndex', this.multipleSelection)
        loading.close()
        console.log(code)
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.getTabCapacity()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    // 获取表空间
    async getTabCapacity () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在获取...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const { data: { code, msg, data } } = await this.$http.post('/convertMetadata/getCapacity', this.multipleSelection)
        console.log(this.tableList)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
          for (let i = 0; i < this.tableList.length; i++) {
            this.tableList[i].createResult = '未建表'
          }
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    // 定义ODS加载策略
    async getODSLoadMode () {
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
    indexMethod (index) {
      return index
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    tableRowClassName ({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
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
          this.$refs.tableList.toggleRowSelection(this.$refs.tableList.data[index], true)
        })
      } else {
        this.$refs.tableList.clearSelection()
      }
    },
    addTable () {
      var item = {}
      item.businessSystemNameShortName = this.systemvalue
      item.dataSourceSchema = this.schemavalue
      item.dataSourceTable = this.tablevalue
      if (!this.systemvalue) {
        return this.$message.warning('请选择业务源系统')
      }
      if (!this.schemavalue) {
        return this.$message.warning('请输入Schema')
      }
      if (!this.tablevalue) {
        return this.$message.warning('请输入表名')
      }
      this.tableList.push(item)
      for (let i = 0; i < this.tableList.length; i++) {
        this.tableList[i].metaStatus = '未探源'
        this.tableList[i].index = i
      }
      this.schemavalue = ''
      this.tablevalue = ''
    },

    // 下拉 系统名列表
    async getSystemList () {
      const { data: { data, code, msg } } = await this.$http.get('/enterHuOverview/getSystemName')
      if (code !== 200) return this.$message.error(msg)

      data.forEach(item => {
        this.systemList.push({ value: item, label: item })
      })
      // console.log(data)
    },
    // 删除入湖表
    deletTable (index, row) {
      console.log(index, row)
      this.tableList.splice(index, 1)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    handleChange (val) {

    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    },
    filterTag (value, row) {
      return row.metaStatus === value
    }
  },
  mounted () {
    this.getSystemList()
  }
}
