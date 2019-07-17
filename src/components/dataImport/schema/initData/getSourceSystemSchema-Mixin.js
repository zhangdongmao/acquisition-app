
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
      if (code !== 200) return this.$message.error('获取数据失败')
      for (let i = 0; i < data.list.length; i++) {
        data.list[i].index = i
      }
      this.tableList = data.list
      this.total = data.total
    },
    // 获取状态
    async getStatus (row) {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
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
      this.$message.success(msg)
      await this.getData()
      var indexs = []
      this.tableList.forEach(item => {
        if (item.status === '1') {
          indexs.push(item.index)
        }
      })
      this.defaultCheck(indexs)
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 默认勾选源库中存在的表
    defaultCheck (indexs) {
      if (indexs) {
        indexs.forEach(index => {
          this.$refs.tableList.toggleRowSelection(this.tableList[index], true)
        })
      } else {
        this.$refs.tableList.clearSelection()
      }
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
