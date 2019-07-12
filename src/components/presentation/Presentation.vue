<!-- 入湖报告 -->
<template>
  <div>
     <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">入湖总览</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">入湖报告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-select v-model="value" placeholder="请选择业务源系统" clearable size="mini">
          <el-option
            v-for="item in systemList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button size="mini" type="primary" plain @click="search()">查询</el-button>
      </el-row>
      <el-button :loading="downloadLoading" style="float: right; margin-right: 20px" type="primary" size="mini" @click="handleDownload()"><a ref="link">导出</a></el-button>
      <el-table @selection-change="handleSelectionChange" height="387" :data="tableList" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="businessSystemNameShortName" label="源系统缩写"></el-table-column>
        <el-table-column prop="dataSourceSchema" label="数据模式"></el-table-column>
        <el-table-column prop="tableCount" label="总表量"></el-table-column>
        <el-table-column prop="odsCount" label="ODS入湖表量"></el-table-column>
        <el-table-column prop="dwCount" label="DW入湖表量"></el-table-column>
        <el-table-column prop="date" label="统计日期"></el-table-column>
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
import mixin from './Presentation-Mixin'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
.el-input {
  width: 200px
}
</style>