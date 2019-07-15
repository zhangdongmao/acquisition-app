<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 卡片 -->
    <el-card>  
        <!-- <el-button size="mini" type="primary" class="btn" @click="getStatus()">获取</el-button>    -->      
      <el-table
      height="387"
      @selection-change="handleSelectionChange" :data="tableList"  style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="business_system_name_short_name"
          label="业务源系统缩写">
        </el-table-column>
        <el-table-column label="获取状态">
          <template slot-scope="scope">
            {{scope.row.status === null ? '未获取' : '已获取'}}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background
      @current-change="changePager"
      :page-size="reqParams.pagesize"
      :current-page="reqParams.pagenum"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import mixin from './getSourceSystemSchema-Mixin'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
.btn {
  float: right;
  margin-right: 50px
}
.left {
  float: left;
}
.el-icon-s-unfold, .el-icon-s-fold {
  font-size: 16px;
  font-weight: none
}
</style>