<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <div class="table-info">
        <span class="title">请添加入湖表：</span>
        <el-select clearable
                   @change="handleChange"
                   v-model="systemvalue"
                   placeholder="请选择业务源系统"
                   size="mini">
          <el-option v-for="item in systemList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="请输入schema"
                  v-model="schemavalue"
                  clearable
                  size="mini"
                  class="table-info-input"></el-input>
        <el-input placeholder="请输入表名"
                  v-model="tablevalue"
                  clearable
                  size="mini"
                  class="table-info-input"></el-input>
        <el-button size="mini"
                   type="primary"
                   plain
                   @click="addTable()">添加</el-button>
      </div>

      <el-table height="387"
                :data="tableList"
                style="width: 100%"
                ref="tableList"
                @selection-change="handleSelectionChange">

        <el-table-column type="selection"
                         width="55"></el-table-column>
        <!-- <el-table-column type="index"
                         :index="indexMethod"></el-table-column> -->
        <el-table-column prop="businessSystemNameShortName"
                         label="业务源系统名称"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceSchema"
                         label="数据模式"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceTable"
                         label="表名"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="metaStatus"
                         label="探源状态"
                         :filters="[{ text: '未探源', value: '未探源' },
                                    { text: '已探源', value: '已探源' },
                                    { text: '无表', value: '无表' },
                                    { text: '无连接', value: '无连接' }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            {{scope.row.metaStatus}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="deletTable(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页
      <el-pagination background
                     @current-change="changePager"
                     :page-size="reqParams.pagesize"
                     :current-page="reqParams.pagenum"
                     layout="prev, pager, next"
                     :total="total"></el-pagination> -->
    </el-card>
  </div>
</template>

<script>
import mixin from './getTabColInfo-Mixin'
export default {
  mixins: [mixin]
}
</script>

<style>
.title {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.options {
  position: relative;
  margin-bottom: 40px;
}
/* .table-info {
  position: relative;
  flex-direction: row;
  justify-content: center;
} */
.table-info-input {
  width: 200px;
}
</style>
