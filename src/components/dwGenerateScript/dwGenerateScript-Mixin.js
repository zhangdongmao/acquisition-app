import axios from 'axios'

export default {
  name: 'dwGenerateScript',
  data () {
    return {
      tableList: [],
      upload_url: axios.defaults.baseURL + '/executepy/uploadExcel'
    }
  },
  methods: {
    async generateScript () {
      const { data: { code, msg } } = await this.$http.post('/executepy/runpy')
      if (code !== 200) {
        this.$message.error(msg)
      } else {
        this.$message.success(msg)
      }
    },
    submitUpload () {
      console.log(this.$refs.excelUpload)
      if (this.$refs.excelUpload.uploadFiles.length === 0) {
        this.$message.warning('请添加要上传的文件')
      } else {
        this.$refs.excelUpload.submit()
      }
    },
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
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
    }
  }
}
