<template>
  <div>
    <el-tabs v-model="activeName"
             type="card">
      <el-tab-pane label="DW导出"
                   name="first">
        <el-button size="mini"
                   type="primary"
                   class="btn"
                   @click="getStatusDW()">导出</el-button>
        <el-table height="387"
                  :data="tableListDW"
                  style="width: 100%"
                  ref="tableList"
                  @selection-change="handleSelectionChangeDW">
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
        <!--<el-pagination background-->
        <!--@current-change="changePagerDW"-->
        <!--:page-size="reqParamsDW.pagesize"-->
        <!--:current-page="reqParamsDW.pagenum"-->
        <!--layout="prev, pager, next"-->
        <!--:total="totalDW">-->
        <!--</el-pagination>-->
      </el-tab-pane>
      <el-tab-pane label="ODS导出"
                   name="second"
                   @click="getODSData()">
        <el-button size="mini"
                   type="primary"
                   class="btn"
                   @click="getStatusODS()">导出</el-button>
        <el-table height="387"
                  :data="tableListODS"
                  style="width: 100%"
                  ref="tableList"
                  @selection-change="handleSelectionChangeODS">
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
        <!--<el-pagination background-->
        <!--@current-change="changePagerODS"-->
        <!--:page-size="reqParamsODS.pagesize"-->
        <!--:current-page="reqParamsODS.pagenum"-->
        <!--layout="prev, pager, next"-->
        <!--:total="totalODS">-->
        <!--</el-pagination>-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mixin from './Derive-Mixin'
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
