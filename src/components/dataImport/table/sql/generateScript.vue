<!-- 获取源系统数据模式 -->
<template>
  <div>
    <el-col :span="24">
      <el-dropdown class="btn">
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="getODSLoadMode">生成调度脚本</el-dropdown-item>
          <el-dropdown-item command="exportOdsSchedulScript">导出调度脚本</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
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
                       label="数据模式">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       prop="dataSourceTable"
                       label="表名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true"
                       prop="metaStatus"
                       label="是否存在"
                       :filters="[{ text: '存  在', value: '存  在' }, { text: '不存在', value: '不存在' }, { text: '无此连接', value: '无此连接' }, { text: '未查询', value: '未查询' }]"
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
  </div>
</template>

<script>
import mixin from './generateScript-Mixin'
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
