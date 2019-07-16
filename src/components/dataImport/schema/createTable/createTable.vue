<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-button size="mini" type="primary" class="btn" @click="getODSLoadMode()">建表</el-button>
        </el-col>
      </el-row> -->
      <el-table height="387"
                :data="tableList"
                style="width: 100%"
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
                         prop="dataSourceTable"
                         label="ODS表名"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text"
                     @click="view(this)">查看</el-button>
          <el-button type="text"
                     @click="modify(this)">修改</el-button>
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
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">

      <el-form ref="form"
               :model="form">
        <el-input type="textarea"
                  v-show="dialogTitle != '查看'"
                  v-model="form.desc"></el-input>
        <span v-show="dialogTitle == '查看'">{{form.desc}}</span>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   v-show="dialogTitle != '查看'"
                   @click="dialogVisible = false">确 定</el-button>
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
