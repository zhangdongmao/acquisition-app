<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <el-table v-loading="listLoading"
                height="387"
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
                         label="数据模式">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceTable"
                         label="表名"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="metaStatus"
                         label="探源状态"
                         :filters="[{ text: '已探源', value: '已探源' },
                                    { text: '无表', value: '无表' },
                                    { text: '无连接', value: '无连接' }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="odsDataTable"
                         label="ODS表名"></el-table-column>
        <el-table-column label="加载策略">
          <template slot-scope="scope">
            <p v-if="scope.row.odsDataLoadMode == 'full'">
              全量
            </p>
            <p v-else-if="scope.row.odsDataLoadMode == 'increment'">
              增量
            </p>
            <p v-else-if="scope.row.odsDataLoadMode == 'none'">
              未定义
            </p>
          </template>
        </el-table-column>

        <el-table-column label="建表状态">
          <template slot-scope="scope">
            <p v-if="scope.row.createTableStatus=='none'">
              未执行
            </p>
            <p v-else-if="scope.row.createTableStatus=='failed'">
              失败
            </p>
            <p v-else-if="scope.row.createTableStatus=='success'">
              成功
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="{row}">
            <el-button type="text"
                       v-if="row.odsDataLoadMode != 'none'"
                       @click="view(row);">编辑</el-button>
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

    <el-dialog :title="dialog.title"
               :visible.sync="dialog.visible"
               width="50%"
               :before-close="handleClose">

      <el-tabs v-model="dialog.activeName"
               type="border-card">
        <el-tab-pane label="全量"
                     name="first">
          <el-input type="textarea"
                    rows="15"
                    v-model="dialog.fullContext"></el-input>
        </el-tab-pane>
        <el-tab-pane label="增量"
                     v-if="dialog.ifIncrement == 1"
                     name="second">
          <el-input type="textarea"
                    rows="15"
                    v-model="dialog.incrementContext"></el-input>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="formReset">重置</el-button>
        <el-button type="primary"
                   @click="formSubmit">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import mixin from './createTable-Mixin'
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
