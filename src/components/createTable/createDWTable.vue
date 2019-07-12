<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">建表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">DW建表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card>
      <!-- 查询 -->
      <el-row :gutter="20">
        <!-- 级联 -->
        <!--v-model="reqParams.query"-->
        <el-col :span="12">
          <el-cascader
            v-model="value"
            placeholder="业务系统/数据模式"
            :props="{ expandTrigger: 'hover' }"
            :options="selectList"
            clearable size="mini">
          </el-cascader>
          <el-button size="mini" type="primary" plain @click="search()">查询</el-button>
        </el-col>
        <!-- 个人中心 -->
        <el-col :span="12">
          <el-button size="mini" type="primary" class="btn" @click="getStatus()">建表</el-button>
        </el-col>
      </el-row>
      <!-- 列表 -->
      <el-table
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
                        label="数据模式">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                        prop="dataSourceTable"
                        label="表名">
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
  </div>
</template>

<script>
import mixin from './createDWTable-Mixin'
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
