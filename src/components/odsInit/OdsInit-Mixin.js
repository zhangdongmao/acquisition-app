import axios from "axios";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  name: 'OdsInit',
  data() {
    return {
      tableList: [{businessSystemNameShortName: 'ERP', dataSourceSchema: 'APPS', dataSourceTable: 'table1', odsDataTable: 'odsTable1'}],
      showEditor: false,
      content: 'asdasdasda'
    }
  },
  components: {
    quillEditor
  },
  mounted() {

  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) { }, // 准备编辑器
    onEditorBlur() { }, // 失去焦点事件
    onEditorFocus() { }, // 获得焦点事件
    onEditorChange() { }, // 内容改变事件


    scriptEdit(index,row) {
      this.showEditor = false
    },
    indexMethod(index) {
      return index+1
    },
    // 选中项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  }
}