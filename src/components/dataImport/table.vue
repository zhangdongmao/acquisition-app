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
                       :disabled="active == 3"
                       @click="NextStep">下一步</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       v-show="active == 0"
                       @click="getStatus(active)">探源</el-button>

            <el-dropdown class="btn"
                         v-show="active == 1||active == 2||active == 3"
                         @command="handleCommand">
              <span class="el-dropdown-link"> 操作 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <p v-show="active == 1">
                  <el-dropdown-item command="21">生成建表语句</el-dropdown-item>
                  <el-dropdown-item command="22">执行建表语句</el-dropdown-item>
                </p>
                <p v-show="active == 2">
                  <el-dropdown-item command="31">生成初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="32">执行初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="33">刷新执行状态</el-dropdown-item>
                </p>
                <p v-show="active == 3">
                  <el-dropdown-item command="41">生成调度脚本</el-dropdown-item>
                  <el-dropdown-item command="42">导出调度脚本</el-dropdown-item>
                </p>
              </el-dropdown-menu>
            </el-dropdown>

          </el-col>
          <el-col style="margin-top:20px;">
            <TabColInfo ref="TabColInfo"
                        v-show="active == 0" />
            <CreateTable ref="CreateTable"
                         v-show="active == 1" />
            <InitScript ref="InitScript"
                        v-show="active == 2" />
            <SchedulingScript ref="SchedulingScript"
                              v-show="active == 3" />
          </el-col>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

import TabColInfo from './table/getTabColInfo'
import CreateTable from './table/createTable'
import SchedulingScript from './schema/schedulingScript'
import InitScript from './schema/InitScript'

export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    TabColInfo,
    CreateTable,
    SchedulingScript,
    InitScript
  },
  methods: {
    NextStep () {
      let _this = this

      if (this.active === 0) {
        if (this.$refs.TabColInfo.multipleSelection.length == 0) {
          this.$refs.TabColInfo.$message.warning('请勾选相应系统名')
        } else {
          _this.active++
          let params = {
            tableList: this.$refs.TabColInfo.tableList,
            multipleSelection: this.$refs.TabColInfo.multipleSelection
          }
          _this.$refs.CreateTable.setValue(params)
        }
        return
      }
      if (this.active === 1) {
        _this.active++
        let params = {
          total: _this.$refs.CreateTable.total,
          tableList: _this.$refs.CreateTable.tableList,
          multipleSelection: _this.$refs.CreateTable.multipleSelection
        }
        _this.$refs.InitScript.setValue(params)
        return
      }

      if (this.active === 2) {
        _this.active++
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
        this.$refs.TabColInfo.getMetaData()
      }
    },
    handleCommand (command) {
      // 校验规则
      if (command === '21') { this.$refs.CreateTable.getODSLoadMode() }
      // 执行建表语句
      if (command === '22') { this.$refs.CreateTable.odsCreateTable() }
      // 生成初始化脚本
      if (command === '31') { this.$refs.InitScript.initOdsLoad() }
      // 执行初始化脚本
      if (command === '32') { this.$refs.InitScript.getPreExecuteFile() }
      // 刷新脚本执行状态
      if (command === '33') { this.$refs.InitScript.viewSqoopStatus() }
      // 生成调度脚本
      if (command === '41') { this.$refs.SchedulingScript.generate() }
      // 导出调度脚本
      if (command === '42') { this.$refs.SchedulingScript.exportFile() }
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
