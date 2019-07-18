
import axios from 'axios'
export default {
  name: 'GetSourceSystemSchema',
  data () {
    return {
      tableList: [],
      upload_url: axios.defaults.baseURL + '/convertMetadata/uploadExcel'
    }
  },
  methods: {
    submitUpload () {
      console.log(this.$refs.excelUpload)
      if (this.$refs.excelUpload.uploadFiles.length === 0) {
        this.$message.warning('请添加要上传的文件')
      } else if (this.$refs.excelUpload.uploadFiles.length > 1) {
        this.$message.warning('一次只能上传一个文件')
      } else {
        this.$refs.excelUpload.submit()
      }
    },
    handleAvatarSuccess (response, file, fileList) {
      this.tableList = response.data
      for (let i = 0; i < this.tableList.length; i++) {
        this.tableList[i].result = '未查询'
        this.tableList[i].index = i
      }
    },

    beforeAvatarUpload (file) {
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
  },
  mounted () {
  }
}
