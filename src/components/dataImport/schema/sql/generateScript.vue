<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">脚本生成</el-breadcrumb-item>
      <el-breadcrumb-item>ODS脚本生成</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select v-model="value"
                     placeholder="请选择业务系统"
                     size="mini">
            <el-option v-for="item in selectList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-button size="mini"
                     type="primary"
                     plain
                     @click="search()">查询</el-button>
        </el-col>
        <el-col :span="12">
          <el-button size="mini"
                     type="primary"
                     class="btn"
                     @click="getStatus()">初始化脚本</el-button>
        </el-col>
      </el-row>
      <el-table height="387"
                :data="tableList"
                style="width: 100%"
                ref="tableList"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="businessSystemNameShortName"
                         label="源系统缩写">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceSchema"
                         label="数据模式"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceTable"
                         label="表名"></el-table-column>
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
import mixin from './generateScript-Mixin'
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