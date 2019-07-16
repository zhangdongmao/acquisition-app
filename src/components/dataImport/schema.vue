<!-- 数据导入 按schema搜索 -->
<template>
  <div>
    <!-- 面包屑 -->
    <el-divider></el-divider>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-steps :active="active"
                    finish-status="success">
            <el-step title="加载入湖清单"></el-step>
            <el-step title="数据探源"></el-step>
            <el-step title="备用区建表"></el-step>
            <el-step title="数据初始化"></el-step>
            <el-step title="调度脚本生成"></el-step>
          </el-steps>
          <!-- <el-button style="margin-top: 12px;" @click="last">上一步</el-button>-->

          <el-col :span="24"
                  style="margin-top:20px;">
            <el-button size="mini"
                       type="primary"
                       v-if="active > 0"
                       class="btn-back"
                       @click="back">上一步</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       @click="next">下一步</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       v-show="active == 0"
                       @click="getStatus(0)">获取</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       v-show="active == 1"
                       @click="getStatus(1)">获取</el-button>
            <el-dropdown class="btn"
                         v-show="active == 2"
                         @command="handleCommand">
              <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item command="getODSLoadMode">生成建表语句</el-dropdown-item>
                <el-dropdown-item command="odsCreateTable">执行建表语句</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown class="btn"
                         v-show="active == 3"
                         @command="handleCommand">
              <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="initOdsLoad">生成初始化脚本</el-dropdown-item>
                <el-dropdown-item command="execDispatchCommand">执行初始化脚本</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown class="btn"
                         v-show="active == 4"
                         @command="handleCommand">
              <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="createOdsSchedulScript">生成调度脚本</el-dropdown-item>
                <el-dropdown-item command="exportOdsSchedulScript">导出调度脚本</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col style="margin-top:20px;">
            <div v-show="active == 0">
              <ComponentsSourceSystemSchema ref="myComponentsSourceSystemSchema" />
            </div>
            <div v-show="active == 1">
              <ComponentsTabColInfo ref="myComponentsTabColInfo" />
            </div>
            <div v-show="active == 2">
              <ComponentsCreateTable ref="myComponentsCreateTable" />
            </div>
            <div v-show="active == 3">
              <ComponentsInitData ref="myComponentsInitData" />
            </div>
            <div v-show="active == 4">
              <ComponentsGenerateScript ref="myComponentsGenerateScript" />
            </div>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

import ComponentsSourceSystemSchema from './schema/initData/getSourceSystemSchema'
import ComponentsTabColInfo from './schema/initData/getTabColInfo'
import ComponentsCreateTable from './schema/createTable/createTable'
import ComponentsGenerateScript from './schema/sql/generateScript'
import ComponentsInitData from './schema/initData/initData'

export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    ComponentsSourceSystemSchema,
    ComponentsTabColInfo,
    ComponentsCreateTable,
    ComponentsGenerateScript,
    ComponentsInitData
  },
  methods: {
    next () {
      let _this = this
      if (this.active == 0) {
        _this.active++
        let params = this.$refs.myComponentsSourceSystemSchema.multipleSelection
        let params2 = []
        for (var i = 0; i < params.length; i++) {
          params2.push(params[i].business_system_name_short_name)
        };
        _this.$refs.myComponentsTabColInfo.setValue(params2)
        return
      }

      if (this.active == 1) {
        _this.active++
        let params = this.$refs.myComponentsTabColInfo.tableList

        _this.$refs.myComponentsCreateTable.setValue(params)
        return
      }
      if (this.active == 2) {
        let multipleSelection = _this.$refs.myComponentsCreateTable.multipleSelection
        _this.active++

        var params = {
          total: _this.$refs.myComponentsCreateTable.total,
          tableList: _this.$refs.myComponentsCreateTable.tableList,
          multipleSelection: multipleSelection
        }

        _this.$refs.myComponentsInitData.setValue(params)
        _this.$refs.myComponentsInitData.multipleSelection = multipleSelection
        return
      }
      if (this.active == 3) {
        _this.active++
      }
    },
    back () {
      if (this.active-- == 0) this.active = 0
    },
    getStatus (param) {
      if (param == 0) {
        this.$refs.myComponentsSourceSystemSchema.getStatus()
      }
      if (param == 1) {
        this.$refs.myComponentsTabColInfo.getStatus()
      }
    },
    handleCommand (command) {
      // 校验规则
      if (command == 'getODSLoadMode') {
        this.$refs.myComponentsCreateTable.getODSLoadMode()
      }
      // 执行建表语句
      if (command == 'odsCreateTable') {
        this.$refs.myComponentsCreateTable.odsCreateTable()
      }
      // 生成初始化脚本
      if (command == 'initOdsLoad') {
        this.$refs.myComponentsInitData.initOdsLoad()
      }
      // 执行初始化脚本
      if (command == 'execDispatchCommand') {
        this.$refs.myComponentsInitData.execDispatchCommand()
      }
      // 生成调度脚本
      if (command == 'createOdsSchedulScript') {
        this.$refs.myComponentsCreateTable.createOdsSchedulScript()
      }
      // 导出调度脚本
      if (command == 'exportOdsSchedulScript') {
        this.$refs.myComponentsCreateTable.exportOdsSchedulScript()
      }
    },
    back () {
      if (this.active-- === 0) this.active = 0
    }
  }
}
</script>
<style>
.btn {
  float: right;
  margin-right: 50px;
}
.btn-back {
  float: left;
  margin-left: 50px;
}
</style>
