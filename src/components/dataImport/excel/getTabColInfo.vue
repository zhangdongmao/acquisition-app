<!-- 获取源系统数据模式 -->
<template>
  <div>
    <!-- 卡片 -->
    <el-card>
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
                     :total="total">
      </el-pagination>-->
    </el-card>
  </div>
</template>

<script>
import mixin from './getTabColInfo-Mixin'
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
