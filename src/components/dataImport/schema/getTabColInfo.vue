<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <el-table height="387"
                :data="tableList"
                ref="tableList"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="businessSystemNameShortName"
                         label="业务源系统名称">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceSchema"
                         label="数据模式">
        </el-table-column>
      </el-table>
      <!-- 分页
      <el-pagination background
                     @current-change="changePager"
                     :page-size="reqParams.pagesize"
                     :current-page="reqParams.pagenum"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>-->
    </el-card>
  </div>
</template>

<script>
import mixin from './getTabColInfo-Mixin'
export default {
  mixins: [mixin]
}

</script>
<style scoped>
.btn {
  float: right;
  margin-right: 50px;
}
</style>
