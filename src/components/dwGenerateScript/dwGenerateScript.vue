<template>
  <div>
    <el-button type="primary"
               class="top-btn"
               @click="generateScript">生成脚本</el-button>
    <el-divider></el-divider>
    <el-upload class="excel-upload"
               drag
               ref="excelUpload"
               :action="this.upload_url"
               accept=".xls,.xlsx"
               :auto-upload="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip"
           slot="tip">只能上传xls/xlsx文件</div>
    </el-upload>
    <el-button style="margin-left: 260px;"
               size="small"
               type="success"
               @click="submitUpload">上传到服务器</el-button>
  </div>
</template>
<script>
import mixin from './dwGenerateScript-Mixin'
export default {
  mixins: [mixin]
}
</script>
<style>
.top-btn {
  margin-bottom: 10px;
}
</style>
