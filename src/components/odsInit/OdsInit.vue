<template>
  <div>
    <el-dialog title="初始化脚本" :visible.sync="showEditor">
      <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </el-dialog>
    <el-dropdown class="btn">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="createOdsLoad">生成初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">执行初始化脚本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
    <el-table
      height="387"
      :data="tableList"
      ref="tableList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="businessSystemNameShortName" label="业务源系统名称" width="120"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="dataSourceSchema" label="数据模式"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="odsDataTable" label="ODS表名"></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="scriptView(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="scriptEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
import mixin from './OdsInit-Mixin'
export default {
  mixins: [mixin]
}
</script>