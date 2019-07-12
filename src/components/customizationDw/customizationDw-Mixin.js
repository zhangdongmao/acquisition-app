import axios from "axios";

export default {
  name: 'Customization',
  data () {
    return {
      active: 0,
      tableList: [],
      upload_url: axios.defaults.baseURL + '/convertMetadata/uploadExcel'
    }
  },
  mounted () {

  },
  methods: {
    async dwCreateTable () {
      var indexs = []
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在建表...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const {data: {code,msg,data}} = await this.$http.post('/hiveCreateTable/dWCreateTable',{
          params: this.multipleSelection
        })
        console.log(code,msg)
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          this.tableList.splice(this.multipleSelection[i].index, 1, data[i])
        }
        console.log(this.tableList)
        this.tableList.forEach(item => {
          if (item.result) {
            if (item.result === 'success') {
              item.result = '建表成功'
              item.tagType = 'success'
              indexs.push(item.index)
            } else if (item.result === 'failed') {
              item.result = '建表失败'
              item.tagType = 'failed'
            } else if (item.result === 'avail') {
              item.result = '无元数据'
              item.tagType = 'warning'
            }
          } else {
            item.result = '未建表'
            item.tagType = 'info'
          }
        })
        this.defaultCheck(indexs)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
          this.next()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    async dwInitScript () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在初始化脚本...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const {data: {code, msg}} = await this.$http.post('/generateScript/generateDwInitScript',{
          params: this.multipleSelection
        })
        console.log(code, msg)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
          this.next()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    // 导出
    async dwExportScript (type) {
      const loading = this.$loading({
        lock: true,
        text: '正在导出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      await this.$http.post('/exportScript/exportDwScript', {params: this.multipleSelection}, {
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
    indexMethod (index) {
      return index
    },
    // 选中项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    next () {
      if (this.active < 7) {
        this.active++
      }
    },
    back () {
      if (this.active > 0) {
        this.active--
      }
      this.clearFilter()
    },
    tableRowClassName ({row, rowIndex}) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },

    filterTag (value, row) {
      return row.isExists === value
    },
    clearFilter () {
      this.$refs.tableList.clearFilter()
    },
    defaultCheck (indexs) {
      if (indexs) {
        indexs.forEach(index => {
          console.log('index:', index)
          this.$refs.tableList.toggleRowSelection(this.$refs.tableList.data[index], true)
          // this.$refs.tableList.toggleRowSelection(row)
        })
      } else {
        this.$refs.tableList.clearSelection()
      }
    },
    submitUpload () {
      console.log(this.$refs.excelUpload)
      if (this.$refs.excelUpload.uploadFiles.length === 0) {
        this.$message.warning('请添加要上传的文件')
      } else if (this.$refs.excelUpload.uploadFiles.length > 1) {
        this.$message.warning('一次只能上传一个文件')
      } else {
        this.$refs.excelUpload.submit()
        this.next()
      }
    },
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
      this.tableList = response.data
      for (let i = 0; i < this.tableList.length; i++) {
        this.tableList[i].index = i
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        })
      }
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isXLS) {
      //   this.$message.error('上传文件只能是 xls或xlsx 格式!')
      // }
    }
  }
}
