<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <div class="options">
        <el-dropdown class="btn">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="getODSLoadMode">生成建表语句</el-dropdown-item>
            <el-dropdown-item command="odsInitScript">执行建表语句</el-dropdown-item>
            <el-dropdown-item command="odsInitScript">重跑</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-divider></el-divider>
      <el-table height="387"
                :data="tableList"
                ref="tableList"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column type="index"
                         :index="indexMethod">
        </el-table-column>
        <el-table-column prop="businessSystemNameShortName"
                         label="源系统缩写"
                         width="120">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceSchema"
                         label="数据模式"
                         width="120">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="dataSourceTable"
                         label="表名"
                         width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="metaStatus"
                         label="探源状态"
                         width="120"
                         :filters="[{ text: '已探源', value: '已探源' },
                               { text: '无表', value: '无表' }, { text: '无连接', value: '无连接' }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tagType"
                    disable-transitions>{{scope.row.metaStatus}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="createResult"
                         label="建表状态"
                         :filters="[{ text: '建表成功', value: '建表成功' }, { text: '建表失败', value: '建表失败' }, { text: '无元数据', value: '无元数据' }, { text: '未建表', value: '未建表' }]"
                         :filter-method="filterCrtResult"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tagCreateType"
                    disable-transitions>{{scope.row.createResult}}
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
                     :total="total"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import mixin from './createOdsTable-Mixin'
export default {
  mixins: [mixin]
}
</script>
<style>
</style>
