import axios from 'axios'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'Customization',
  data () {
    return {
      active: 0,
      tableList: [],
      content: '',
      showEditor: false,
      editorOption: {},
      upload_url: axios.defaults.baseURL + '/convertMetadata/uploadExcel'
    }
  },
  components: {
    quillEditor
  },
  mounted () {

  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) { }, // 准备编辑器
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange () { }, // 内容改变事件
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
        // console.log(code,msg)
        // console.log(data)
        // console.log(this.tableList)
        for (let i = 0; i < data.length; i++) {
          this.tableList.splice(this.multipleSelection[i].index, 1, data[i])
        }
        console.log(this.tableList)
        this.tableList.forEach(item => {
          if (item.metaStatus) {
            if (item.metaStatus === 'exists') {
              item.metaStatus = '存  在'
              item.tagType = 'success'
              indexs.push(item.index)
            } else if (item.metaStatus === 'not_exists') {
              item.metaStatus = '不存在'
              item.tagType = 'warning'
            } else if (item.metaStatus === 'con_not_exists') {
              item.metaStatus = '无此连接'
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
          this.$message.success(msg)
          this.next()
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
        // console.log(code,msg)
        // console.log(data)
        console.log(this.tableList)
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
        // console.log(code,msg)
        // console.log(data)
        console.log(this.tableList)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
          for (let i = 0; i < this.tableList.length; i++) {
            this.tableList[i].createResult = '未建表'
          }
          this.next()
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
    // ODS建表
    async odsCreateTable () {
      var indexs = []
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在建表...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const { data: { code, msg, data } } = await this.$http.post('/hiveCreateTable/createODSTable', {
          params: this.multipleSelection
        })
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          this.tableList[this.multipleSelection[i].index].createResult = data[i].result
        }
        this.tableList.forEach(item => {
          if (item.createResult) {
            if (item.createResult === 'success') {
              item.createResult = '建表成功'
              item.tagCreateType = 'success'
              indexs.push(item.index)
            } else if (item.createResult === 'failed') {
              item.createResult = '建表失败'
              item.tagCreateType = 'failed'
            } else if (item.createResult === 'avail') {
              item.createResult = '无元数据'
              item.tagCreateType = 'warning'
            }
          } else {
            item.createResult = '未建表'
            item.tagCreateType = 'info'
          }
        })
        // this.defaultCheck(indexs)
        console.log(this.tableList)
        console.log(code, msg)
        console.log(data)
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
    async createOdsLoad () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        // const loading = this.$loading({
        //   lock: true,
        //   text: '正在初始化脚本...',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        console.log(this.multipleSelection)
        const { data: { code, msg } } = await this.$http.post('/generateScript/createOdsLoad', this.multipleSelection)
        console.log(code, msg)
        // loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
          // this.next()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    async odsInitScript () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        // const loading = this.$loading({
        //   lock: true,
        //   text: '正在初始化脚本...',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        console.log(this.multipleSelection)
        const { data: { code, msg } } = await this.$http.post('/generateScript/initOdsLoad', this.multipleSelection)
        console.log(code, msg)
        // loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
          // this.next()
        }
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    async exportOdsSchedulScript () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        console.log(this.multipleSelection)
        await this.$http.post('/exportScript/exportOdsSchedulScript', { params: this.multipleSelection }, {
          responseType: 'blob'
        }).then(res => {
          let blob = new Blob([res.data], {
            type: 'text/plain'
          })
          loading.close()
          console.log(res)
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob)
          } else {
            let elink = document.createElement('a')
            elink.download = decodeURIComponent(res.headers['filename'].substring(3, res.headers['filename'].length))
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
          }
          // this.next()
        }).catch(err => {
          console.warn(err)
        })
      } else {
        this.$message.warning('请勾选相应表名')
      }
    },
    async exportOdsInitScript () {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        const loading = this.$loading({
          lock: true,
          text: '正在导出...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        console.log(this.multipleSelection)
        await this.$http.post('/exportScript/exportOdsInitScript', { params: this.multipleSelection }, {
          responseType: 'blob'
        }).then(res => {
          let blob = new Blob([res.data], {
            type: 'text/plain'
          })
          loading.close()
          console.log(res)
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob)
          } else {
            let elink = document.createElement('a')
            elink.download = decodeURIComponent(res.headers['filename'].substring(3, res.headers['filename'].length))
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            document.body.removeChild(elink)
          }
          // this.next()
        }).catch(err => {
          console.warn(err)
        })
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
    tableRowClassName ({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    },
    filterTag (value, row) {
      return row.metaStatus === value
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
        this.tableList[i].result = '未查询'
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
