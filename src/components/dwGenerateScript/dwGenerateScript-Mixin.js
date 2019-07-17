import axios from 'axios'

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
  methods: {
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
    }
  }
}
