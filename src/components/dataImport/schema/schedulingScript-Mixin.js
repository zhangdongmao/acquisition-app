import axios from 'axios'
export default {
  name: 'SchedulingScript',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        query: [],
        pagesize: 5000
      },
      total: 0,
      // 列表数据
      tableList: [],
      // 选中项
      multipleSelection: [],
      selectList: [],
      options: [],
      value: ''
    }
  },
  methods: {

    // 初始化页面值
    async setValue (params) {
      let _this = this
      console.log(params)
      let tableData = params.tableList
      // 执行调度脚本 生成调度脚本 状态
      tableData.forEach(item => {
        item.executeSchedulingScriptStatus = 'none'
        item.createSchedulingScriptStatus = 'none'
      })
      _this.tableList = tableData
      _this.total = params.tatal
      var indexs = []
      await params.multipleSelection.forEach(item => {
        indexs.push(item.index)
      })

      indexs.forEach(index => {
        this.$refs.multipleTable.toggleRowSelection(this.tableList[index], true)
      })
    },
    // 生成调度脚本
    async generate () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      let flag = false
      this.multipleSelection.forEach(item => {
        if (item.executeScriptStatus !== 'completed') {
          flag = true
        }
      })
      if (flag) {
        this.$message.warning('存在上一步未成功的数据')
        return
      }

      const loading = this.getLoading('正在生成调度脚本...')
      const { data: { data, code, msg } } = await this.$http.post('/generateScript/createOdsLoad', this.multipleSelection)
      loading.close()
      if (code !== 200) return this.$message.error(msg)
      this.$message.success('生成调度脚本成功')

      this.multipleSelection.forEach(e => {
        e.createSchedulingScriptStatus = 'success'
      })
    },
    // 导出调度脚本
    async exportFile () {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请勾选相应表名')
        return
      }
      let flag = false
      this.multipleSelection.forEach(item => {
        if (item.createScriptStatus === 'none') {
          flag = true
        }
      })
      if (flag) {
        this.$message.warning('存在上一步未成功的数据')
        return
      }

      const loading = this.getLoading('正在导出调度脚本...')
      await this.$http.post('/exportScript/exportOdsSchedulScript', this.multipleSelection, {
        responseType: 'blob'
      }).then(res => { // 处理返回的文件流
        loading.close()
        let blob = new Blob([res.data], {
          type: 'text/plain'
        })
        const fileName = decodeURIComponent(res.headers['filename'])
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      })
      // axios({ // 用axios发送post请求
      //   method: 'post',
      //   url: url, // 请求地址
      //   data: this.multipleSelection, // 参数
      //   responseType: 'blob', // 表明返回服务器返回的数据类型
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 切换页码
    changePager (newPage) {

    },
    filterTag (value, row) {
      return row.metaStatus === value
    },
    getLoading (text) {
      return this.$loading({
        lock: true,
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  mounted () {
  }
}
