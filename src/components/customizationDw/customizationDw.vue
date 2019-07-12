<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">定制化入湖</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">定制化入湖</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-steps :active="active" finish-status="success">
            <el-step title="加载入湖清单"></el-step>
            <el-step title="DW备用区建表"></el-step>
            <el-step title="DW加载脚本"></el-step>
            <el-step title="脚本导出"></el-step>
          </el-steps>
          <!--<el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
          <el-divider></el-divider>
          <div id="import-excel" v-if="active === 0">
            <el-upload
              class="excel-upload"
              drag
              ref="excelUpload"
              :action="this.upload_url"
              accept=".xls,.xlsx"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
            </el-upload>
            <el-button style="margin-left: 260px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </div>
          <div v-if="active === 1">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="dwCreateTable">建表</el-button>
              <el-button size="mini" type="primary" class="btn-back" @click="back">上一步</el-button>
            </el-col>
            <el-table
              height="387"
              :data="tableList"
              ref="tableList"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                type="index"
                :index="indexMethod">
              </el-table-column>
              <el-table-column
                prop="businessSystemNameShortName"
                label="源系统缩写"
                width="120">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataSourceSchema"
                               label="数据模式"
              >
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="result" label="建表状态"
                               :filters="[{ text: '建表成功', value: '建表成功' }, { text: '建表失败', value: '建表失败' }, { text: '无元数据', value: '无元数据' }
                               , { text: '未建表', value: '未建表' }]"
                               :filter-method="filterTag"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.result}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="active === 2">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="dwInitScript">初始化脚本</el-button>
              <el-button size="mini" type="primary" class="btn-back" @click="back">上一步</el-button>
            </el-col>
            <!-- ref="tableList" -->
            <el-table
              height="387"
              :data="tableList"
              ref="tableList"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                :index="indexMethod">
              </el-table-column>
              <el-table-column
                prop="businessSystemNameShortName"
                label="源系统缩写"
                width="120">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataSourceSchema"
                               label="数据模式"
              >
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="result" label="建表状态" >
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.result}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="active === 3 || active === 4">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="dwExportScript">导出</el-button>
              <el-button size="mini" type="primary" class="btn-back" @click="back">上一步</el-button>
            </el-col>
            <el-table
              height="387"
              :data="tableList"
              ref="tableList"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                :index="indexMethod">
              </el-table-column>
              <el-table-column
                prop="businessSystemNameShortName"
                label="源系统缩写"
                width="120">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataSourceSchema"
                               label="数据模式"
              >
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="result" label="建表状态" >
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.result}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
            <div></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import mixin from './customizationDw-Mixin'
export default {
  mixins: [mixin]
}
</script>
<style>
  .btn {
    float: right;
    margin-right: 50px;
  }
  .btn-back{
    float: left;
    margin-left: 50px;
  }
</style>
