export default {
  name: 'Derive',
  data() {
    return {
      reqParamsDW: {
        pagenum: 1,
        query: '',
        pagesize: 50
      },
      reqParamsODS: {
        pagenum: 1,
        query: '',
        pagesize: 50
      },
      totalDW: 0,
      totalODS: 0,
      activeName: 'first',
      tableListDW: [],
      tableListODS: [],
      systemOptionsDW: [],
      systemOptionsODS: [],
      // 选中项
      multipleSelectionDW: [],
      multipleSelectionODS: [],
    };
  },
  methods: {
    async getDWData () {
      const {data: {data,code}} = await this.$http.get('/exportScript/getDwTabList')
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableListDW = data
      console.log(data)
    },
    // 选项卡ODS选中
    async getODSData () {
      const {data: {data,code}} = await this.$http.get('/exportScript/getOdsTabList')
      if (code !== 200) return this.$message.error('获取数据失败')
      this.tableListODS = data
      console.log(data)
    },
    // 导出
    async getStatusDW (type) {
      const loading = this.$loading({
        lock: true,
        text: '正在导出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      await this.$http.post('/exportScript/exportDwScript', {params: this.multipleSelectionDW}, {
        responseType: 'blob'
      }).then(res => {
        let blob = new Blob([res.data], {
          type: 'text/plain'
        })
        loading.close()
        console.log(res)
        // if (res.status !== 200) return this.$message.error('导出失败')
        // this.$message.success('导出成功')
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
    async getStatusODS (type) {
      const loading = this.$loading({
        lock: true,
        text: '正在导出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const res = await this.$http.post('/exportScript/exportOdsScript', {params: this.multipleSelectionODS}, {
        responseType: 'blob'
      }).then(res => {
        let blob = new Blob([res.data], {
          type: 'text/plain'
        })
        loading.close()
        console.log(res)
        // if (res.status !== 200) return this.$message.error('导出失败')
        // this.$message.success('导出成功')
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
    handleSelectionChangeDW (val) {
      this.multipleSelectionDW = val
    },
    // 选中项
    handleSelectionChangeODS (val) {
      this.multipleSelectionODS = val
    },
    changePagerDW (newPage) {
      this.reqParamsDW.pagenum = newPage
      this.getDWData()
    },
    changePagerODS (newPage) {
      this.reqParamsODS.pagenum = newPage
      this.getODSData()
    }
  },
  mounted () {
    this.getDWData()
    this.getODSData()
  }
};
