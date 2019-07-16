<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 卡片 -->
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
        <el-table-column :show-overflow-tooltip="true"
                         prop="odsDataLoadMode"
                         label="加载策略"></el-table-column>
        <el-table-column label="执行状态">
          <template slot-scope="scope">
            <p v-if="scope.row.executeStatus=='none'">
              未执行
            </p>
            <p v-else-if="scope.row.executeStatus=='failed'">
              失败
            </p>
            <p v-else-if="scope.row.executeStatus=='success'">
              成功
            </p>
          </template>
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="{row}">
            <el-button type="text"
                       @click="viewHiveData(row);">查看</el-button>
            <el-button type="text"
                       @click="view(row); dialog.ifModify = 1">编辑</el-button>
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

    <el-dialog :title="dialog.title"
               :visible.sync="dialog.visible"
               width="50%"
               :before-close="handleClose">
      <el-input type="textarea"
                rows="15"
                :disabled="dialog.ifModify == 0"
                v-model="dialog.context"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="formReset">重置</el-button>
        <el-button type="primary"
                   v-show="dialog.ifModify != 0"
                   @click="formSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="dialogTable.title"
               :visible.sync="dialogTable.visible"
               width="50%"
               :before-close="dialogTableHandleClose">
      <template>
        <el-table :data="dialogTable.tableList"
                  border
                  height="300"
                  style="width: 100%">
          <el-table-column v-for="value in dialogTable.tableTitles"
                           :key="value"
                           :prop="value"
                           :label="value"
                           width="150"
                           height="40" />

        </el-table>
      </template>

    </el-dialog>

  </div>
</template>

<script>
import mixin from './initData-Mixin'
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
