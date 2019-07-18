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
        <el-table-column label="加载策略"
                         :filters="[{ text: '全量', value: 'full' },
                               { text: '增量', value: 'increment' }, { text: '未定义', value: 'none' }]"
                         :filter-method="filterTag">
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
        <el-table-column label="建表状态"
                         :filters="[{ text: '未执行', value: 'none' },
                               { text: '失败', value: 'failed' },
                              { text: '成功', value: 'success' }]"
                         :filter-method="filterTag">
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
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text"
                       v-if="row.executeScriptStatus == 'completed'"
                       @click="viewHiveData(row);">数据查看</el-button>
            <el-button type="text"
                       v-if="row.createScriptStatus == 'success'"
                       @click="view(row); dialog.ifModify = 1">编辑</el-button>
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
      <el-input type="textarea"
                rows="15"
                :disabled="dialog.ifModify == 0"
                v-model="dialog.context"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="formReset">重置</el-button>
        <el-button type="primary"
                   v-show="dialog.ifModify != 0"
                   @click="formSubmit">保存</el-button>
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
import mixin from './initScript-Mixin'
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
