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
          <el-col :span="24"
                  style="margin-top:20px;">
            <el-button size="mini"
                       type="primary"
                       :disabled="active == 0"
                       class="btn-back"
                       @click="TheLastStep">上一步</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       :disabled="active == 4"
                       @click="NextStep">下一步</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       v-show="active == 0||active == 1"
                       @click="getStatus(active)">获取</el-button>

            <el-dropdown class="btn"
                         v-show="active == 2||active == 3||active == 4"
                         @command="handleCommand">
              <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <p v-show="active == 1">
                  <el-dropdown-item command="11">探源</el-dropdown-item>
                  <el-dropdown-item command="12">生成建表语句</el-dropdown-item>
                  <el-dropdown-item command="13">执行建表语句</el-dropdown-item>
                  <el-dropdown-item command="14">生成初始化脚本</el-dropdown-item>
                </p>
                <p v-show="active == 2">
                  <el-dropdown-item command="21">生成建表语句</el-dropdown-item>
                  <el-dropdown-item command="22">执行建表语句</el-dropdown-item>
                  <el-dropdown-item command="23">全部生成建表语句</el-dropdown-item>
                  <el-dropdown-item command="24">全部执行建表语句</el-dropdown-item>
                </p>
                <p v-show="active == 3">
                  <el-dropdown-item command="31">生成初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="35">全部生成初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="32">执行初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="34">导出初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="33">刷新执行状态</el-dropdown-item>
                </p>
                <p v-show="active == 4">
                  <el-dropdown-item command="41">生成调度脚本</el-dropdown-item>
                  <el-dropdown-item command="42">导出调度脚本</el-dropdown-item>
                  <el-dropdown-item command="43">全部生成调度脚本</el-dropdown-item>
                </p>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col style="margin-top:20px;">
            <SourceSystemSchema ref="SourceSystemSchema"
                                v-show="active == 0" />
            <TabColInfo ref="TabColInfo"
                        v-show="active == 1" />
            <CreateTable ref="CreateTable"
                         v-show="active == 2" />
            <InitScript ref="InitScript"
                        v-show="active == 3" />
            <SchedulingScript ref="SchedulingScript"
                              v-show="active == 4" />
          </el-col>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

import SourceSystemSchema from './schema/sourceSystemSchema'
import TabColInfo from './schema/getTabColInfo'
import CreateTable from './schema/createTable'
import SchedulingScript from './schema/schedulingScript'
import InitScript from './schema/InitScript'

export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    SourceSystemSchema,
    TabColInfo,
    CreateTable,
    SchedulingScript,
    InitScript
  },
  methods: {
    NextStep () {
      let _this = this
      _this.active++
      if (this.active === 1) {
        let params = this.$refs.SourceSystemSchema.multipleSelection
        let params2 = []
        for (var i = 0; i < params.length; i++) {
          if (params[i].status === '1') {
            params2.push(params[i].business_system_name_short_name)
          }
        };
        _this.$refs.TabColInfo.setValue(params2)
        return
      }

      if (this.active === 2) {
        let params = this.$refs.TabColInfo.multipleSelection
        _this.$refs.CreateTable.setValue(params)
        return
      }
      if (this.active === 3) {
        var params = {
          total: _this.$refs.CreateTable.total,
          tableList: _this.$refs.CreateTable.tableList,
          multipleSelection: _this.$refs.CreateTable.multipleSelection
        }
        _this.$refs.InitScript.setValue(params)
        return
      }

      if (this.active === 4) {
        let params = {
          total: _this.$refs.InitScript.total,
          tableList: _this.$refs.InitScript.tableList,
          multipleSelection: _this.$refs.InitScript.multipleSelection
        }
        _this.$refs.SchedulingScript.setValue(params)
      }
    },
    TheLastStep () {
      if (this.active-- === 0) this.active = 0
    },
    getStatus (param) {
      if (param === 0) {
        this.$refs.SourceSystemSchema.getStatus()
      }
      if (param === 1) {
        this.$refs.TabColInfo.getStatus()
      }
    },
    handleCommand (command) {
      // 探源
      if (command === '11') { this.$refs.TabColInfo.getStatus() }
      // 根据schema生成建表语句
      if (command === '12') { this.$refs.TabColInfo.saveOdsDdlInfoBySchema() }
      // 根据schema执行建表语句
      if (command === '13') { this.$refs.TabColInfo.createOdsTableBySchema() }
      // 根据schema生成初始化脚本
      if (command === '14') { this.$refs.TabColInfo.createSqoopScriptBySchema() }

      // 校验规则
      if (command === '21') { this.$refs.CreateTable.getODSLoadMode() }
      // 执行建表语句
      if (command === '22') { this.$refs.CreateTable.odsCreateTable() }
      // 根据schema生成建表语句
      if (command === '23') {
        this.$refs.TabColInfo.createDdl()
        this.$refs.CreateTable.search()
      }
      // 根据schema执行建表语句
      if (command === '24') {
        this.$refs.TabColInfo.createOdsTableBySchema()
        this.$refs.CreateTable.search()
      }

      // 生成初始化脚本
      if (command === '31') { this.$refs.InitScript.initOdsLoad() }
      // 根据schema生成初始化脚本
      if (command === '35') { this.$refs.TabColInfo.createSqoopScriptBySchema() }

      // 执行初始化脚本
      if (command === '32') { this.$refs.InitScript.getPreExecuteFile() }
      // 刷新脚本执行状态
      if (command === '33') { this.$refs.InitScript.viewSqoopStatus() }
      // 导出初始化脚本
      if (command === '34') { this.$refs.InitScript.exportFile() }

      // 生成调度脚本
      if (command === '41') { this.$refs.SchedulingScript.generate() }
      // 导出调度脚本
      if (command === '42') { this.$refs.SchedulingScript.exportFile() }
      // 全部生成调度脚本
      if (command === '43') { this.$refs.TabColInfo.allGenerate() }
    },
    Back () {
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
