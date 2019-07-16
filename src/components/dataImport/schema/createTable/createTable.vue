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
<<<<<<< HEAD
      <el-table v-loading="listLoading"
      height="387"
      :data="tableList"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="businessSystemNameShortName"
        label="源系统缩写">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       prop="dataSourceSchema"
                       label="数据模式"
                       >
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="odsDataTable" label="ODS表名" ></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="odsDataLoadMode" label="加载策略" ></el-table-column>
   
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
      <el-table-column  label="编辑" >
  
        <template slot-scope="{row}">
          <el-button type="text" @click="view(row); dialog.ifModify = 1" >编辑</el-button>
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
=======
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
>>>>>>> 3519c60cb25647029ac3dc0567d4c4c2a5df508d
    </el-card>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">

<<<<<<< HEAD
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="50%" 
      :before-close="handleClose">
      <el-tabs v-model="dialog.activeName" type="border-card" >
        <el-tab-pane label="全量" name="first">
          <el-input type="textarea"  rows="15"  :disabled="dialog.ifModify == 0" v-model="dialog.fullContext"></el-input>
        </el-tab-pane>
        <el-tab-pane label="增量" name="second">
          <el-input type="textarea"  rows="15"  :disabled="dialog.ifModify == 0" v-model="dialog.incrementContext"></el-input> 
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formReset">重置</el-button>
        <el-button type="primary"  v-show="dialog.ifModify != 0" @click="formSubmit">确 定</el-button>
=======
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
>>>>>>> 3519c60cb25647029ac3dc0567d4c4c2a5df508d
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
