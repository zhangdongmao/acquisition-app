<!-- 入湖总览 -->
<template>
  <div>
     <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">入湖总览</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">入湖总览</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 卡片 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select clearable @change="handleChange" v-model="systemvalue" placeholder="请选择业务源系统"  size="mini">
            <el-option
              v-for="item in systemList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="schemavalue" placeholder="请选择数据模式"  size="mini">
            <el-option
              v-for="item in schemaList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" plain @click="getData()">查询</el-button>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="请输入表名"
            v-model="tablevalue"
            clearable size="mini">
          </el-input>
          <el-button size="mini" type="primary" plain @click="getData()">搜索</el-button>
        </el-col>
      </el-row>
      <el-table height="418" :data="tableList" style="width: 100%">
        <el-table-column prop="businessSystemNameShortName" label="源系统缩写" width="100"></el-table-column>
        <el-table-column prop="dataSourceSchema" label="数据模式" width="100"></el-table-column>
        <el-table-column prop="dataSourceTable" label="表名" width="200">
          <template slot-scope="scope">
            <a href="" @click.prevent="tableName(scope.row)">{{scope.row.dataSourceTable}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="dataFlagForCrtOdsHive" label="ODS入湖状态" width="120">
          <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.dataFlagForCrtOdsHive === '1' ? 'primary' : 'info'"
            disable-transitions>
            {{scope.row.dataFlagForCrtOdsHive === "1" ? "备用区入湖" : '未入湖'}}
          </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dataFlagForCrtDwHive" label="DW入湖状态" width="140">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.dataFlagForCrtDwHive === '1' ? 'primary' : 'info'"
              disable-transitions>
              {{scope.row.dataFlagForCrtDwHive === "1" ? "备用区入湖" : '未入湖'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dataFlagForCrtOdsScript" label="ODS脚本状态" width="120">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.dataFlagForCrtOdsScript === '1' ? 'primary' : 'info'"
              disable-transitions>
              {{scope.row.dataFlagForCrtOdsScript === "1" ? "初始化脚本" : '未加载'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dataFlagForCrtDwScript" label="DW脚本状态" width="120">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.dataFlagForCrtDwScript === '1' ? 'primary' : 'info'"
              disable-transitions>
              {{scope.row.dataFlagForCrtDwScript === "1" ? "初始化脚本" : '未加载'}}
            </el-tag>
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
      <!-- 弹出层 -->
      <el-dialog title="字段列表：" :visible.sync="dialogTableVisible">
        <el-table  height="275" :data="tableInfo">
          <el-table-column property="dataSourceColName" label="字段名"></el-table-column>
          <el-table-column property="dataSourceColLen" label="字段类型"></el-table-column>
          <el-table-column property="dataSourceColIsnullFlag" label="可为空">
            <template slot-scope="scope">
              {{scope.row.dataSourceColIsnullFlag ==="1" ? 'Y' : 'N'}}
            </template>
          </el-table-column>
          <el-table-column property="dataSourceColPrimarykeyFlag" label="主键">
            <template slot-scope="scope">
              {{scope.row.dataSourceColPrimarykeyFlag ? "Y" : ''}}
            </template>
          </el-table-column>
          <el-table-column property="dataSourceColComment" label="注释"></el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import mixin from './Overview-Mixin'
export default {
  mixins: [mixin]
}
</script>
<style scoped>
.el-input {
  width: 200px
}
.el-table {
  margin-top: 10px
}
</style>
