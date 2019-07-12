export default {
  name: 'Presentation',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        query: {},
        pagesize: 50
      },
      total: 0,
      tableList: [],
      // 下拉列表
      systemList: [],
      value: '',
      multipleSelection: [],
      bookType: 'xlsx',
      downloadLoading: false
    }
  },

  methods: {
    // 获取列表数据
    async getData () {
      const {data: {data, code, msg}} = await this.$http.get('/tableStatus/getStatusList',{
        params: this.reqParams
      })
      if (code !== 200) return this.$message.error(msg)
      this.tableList = data.list
      this.total = data.total
    },
    // 下拉 系统名列表
    async getSystemList () {
      const {data: {data, code, msg}} = await this.$http.get('/tableStatus/getSysList')
      if (code !== 200) return this.$message.error(msg)
      data.forEach(item => {
        this.systemList.push({value: item, label: item})
      });
      // console.log(data)
    },
    // 查询
    async search () {
      this.reqParams.query = {}
      this.reqParams.query.businessSystemNameShortName = this.value
      const {data: {data, code, msg}} = await this.$http.post('/tableStatus/getStatusBySys', this.reqParams)
      if (code !== 200) return this.$message.error(msg)
      console.log(data)
      this.tableList = data.list
      this.total = data.total
      this.value = ''
    },
    // 导出
    async handleDownload (type) {
      const loading = this.$loading({
        lock: true,
        text: '正在导出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const res = await this.$http.post('/tableStatus/exportExcle', this.multipleSelection, {
        responseType: 'blob'
      }).then(res => {
        let blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        loading.close()
        console.log(res)
        if (res.status !== 200) return this.$message.error('导出失败')
        this.$message.success('导出成功')
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob)
        } else {
          let elink = document.createElement('a')
          elink.download = decodeURIComponent(res.headers['filename'].substring(3,res.headers['filename'].length))
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          document.body.removeChild(elink)
        }
      }).catch(err => {
        console.warn(err)
      })
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 分页
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      if (this.reqParams.query) {
        this.search()
      }else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
    this.getSystemList()
  }
}
