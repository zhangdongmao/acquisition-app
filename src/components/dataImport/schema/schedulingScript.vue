<!-- 获取源系统数据模式 -->
<template>
  <div>
    <el-card>
      <el-table height="387"
                :data="tableList"
                style="width: 100%"
                ref="multipleTable"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="businessSystemNameShortName"
                         label="源系统缩写">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceSchema"
                         label="数据模式">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceTable"
                         label="表名"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="odsDataTable"
                         label="ODS表名"></el-table-column>
        <el-table-column label="加载策略">
          <template slot-scope="scope">
            <p v-if="scope.row.odsDataLoadMode=='full'">
              全量
            </p>
            <p v-else-if="scope.row.odsDataLoadMode=='increment'">
              增量
            </p>
            <p v-else-if="scope.row.odsDataLoadMode=='none'">
              未定义
            </p>
          </template>
        </el-table-column>
        <el-table-column label="初始化状态">
          <template slot-scope="scope">
            <p v-if="scope.row.executeScriptStatus=='none'">
              未执行
            </p>
            <p v-else-if="scope.row.executeScriptStatus=='failed'">
              失败
            </p>
            <p v-else-if="scope.row.executeScriptStatus=='completed'">
              成功
            </p>
            <p v-else-if="scope.row.executeScriptStatus=='running'">
              正在执行
            </p>
            <p v-else-if="scope.row.executeScriptStatus=='waiting'">
              等待
            </p>
          </template>
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
import mixin from './schedulingScript-Mixin'
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
