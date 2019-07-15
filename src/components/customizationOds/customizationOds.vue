<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="showEditor">
      <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </el-dialog>
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
            <el-step title="数据探源"></el-step>
            <!-- <el-step title="获取索引信息"></el-step>
            <el-step title="获取表空间大小"></el-step> -->
            <el-step title="备用区建表"></el-step>
            <el-step title="数据初始化"></el-step>
            <el-step title="调度脚本生成"></el-step>
          </el-steps>
          <!--<el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
          <el-divider></el-divider>
          <div id="import-excel" v-if="active === 0">
            <el-button size="mini" type="primary" class="btn" @click="next">下一步</el-button>
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
              <el-button size="mini" type="primary" class="btn" @click="next">下一步</el-button>
              <el-button size="mini" type="primary" class="btn" @click="getMetaData">探源</el-button>
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
                label="业务源系统名称"
                width="120">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataSourceSchema"
                               label="数据模式">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
            </el-table>
          </div>
          <!-- <div v-if="active === 2">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="getIndexInfo">获取</el-button>
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
                label="业务源系统名称"
                width="120">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataSourceSchema"
                               label="数据模式">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="metaStatus" label="状态" >
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.metaStatus}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="active === 3">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="getTabCapacity">获取</el-button>
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
                label="业务源系统名称"
                width="120">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true"
                               prop="dataSourceSchema"
                               label="数据模式">
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="dataSourceTable" label="表名" ></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="metaStatus" label="状态" >
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.metaStatus}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div> -->
          <div v-if="active === 2">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="next">下一步</el-button>
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
              <el-table-column :show-overflow-tooltip="true" prop="metaStatus" label="是否存在"
                               :filters="[{ text: '存  在', value: '存  在' }, { text: '不存在', value: '不存在' }, { text: '无此连接', value: '无此连接' }, { text: '未建表', value: '未建表' }]"
                               :filter-method="filterTag"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.metaStatus}}
                  </el-tag>
                </template>
              </el-table-column>
              <!-- <el-table-column :show-overflow-tooltip="true" prop="createResult" label="建表状态"
                               :filters="[{ text: '建表成功', value: '建表成功' }, { text: '建表失败', value: '建表失败' }, { text: '无元数据', value: '无元数据' }, { text: '未建表', value: '未建表' }]"
                               :filter-method="filterCrtResult"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagCreateType"
                  disable-transitions>{{scope.row.createResult}}
                  </el-tag>
                </template> 
              </el-table-column>-->
            </el-table>
          </div>
          <div v-if="active === 3">
            <el-col :span="24">
              <el-button size="mini" type="primary" class="btn" @click="next">下一步</el-button>
              <el-dropdown class="btn">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="createOdsLoad">生成初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">执行初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">重跑初始化脚本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              
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
              <el-table-column :show-overflow-tooltip="true" prop="metaStatus" label="是否存在"
                               :filters="[{ text: '存  在', value: '存  在' }, { text: '不存在', value: '不存在' }, { text: '无此连接', value: '无此连接' }, { text: '未查询', value: '未查询' }]"
                               :filter-method="filterTag"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.metaStatus}}
                  </el-tag>
                </template>
              </el-table-column>
              <!-- <el-table-column :show-overflow-tooltip="true" prop="createResult" label="建表状态"
                               :filters="[{ text: '建表成功', value: '建表成功' }, { text: '建表失败', value: '建表失败' }, { text: '无元数据', value: '无元数据' }, { text: '未建表', value: '未建表' }]"
                               :filter-method="filterCrtResult"
                               filter-placement="bottom-end">
                               <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagCreateType"
                  disable-transitions>{{scope.row.createResult}}
                  </el-tag>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div v-if="active === 4">
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
              <el-table-column :show-overflow-tooltip="true" prop="metaStatus" label="是否存在"
                               :filters="[{ text: '存  在', value: '存  在' }, { text: '不存在', value: '不存在' }, { text: '无此连接', value: '无此连接' }, { text: '未查询', value: '未查询' }]"
                               :filter-method="filterTag"
                               filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagType"
                  disable-transitions>{{scope.row.metaStatus}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="createResult" label="建表状态"
                               :filters="[{ text: '建表成功', value: '建表成功' }, { text: '建表失败', value: '建表失败' }, { text: '无元数据', value: '无元数据' }, { text: '未建表', value: '未建表' }]"
                               :filter-method="filterCrtResult"
                               filter-placement="bottom-end">
                               <template slot-scope="scope">
                  <el-tag
                  :type="scope.row.tagCreateType"
                  disable-transitions>{{scope.row.createResult}}
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
import mixin from './customizationOds-Mixin'
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
