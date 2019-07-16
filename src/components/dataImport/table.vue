<!-- 数据导入-按表名搜索 -->
<template>
  <div>
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
                       v-if="active > 0"
                       class="btn-back"
                       @click="back">上一步</el-button>
            <el-button size="mini"
                       type="primary"
                       class="btn"
                       @click="next">下一步</el-button>
          </el-col>
          <el-col style="margin-top:20px;">
            <div v-show="active == 0">
              <ComponentsGetTabColInfo ref="myComponentsGetTabColInfo" />
            </div>
            <div v-show="active == 1">
              <ComponentsCreateOdsTable ref="myComponentsCreateOdsTable" />
            </div>
            <div v-show="active == 2">
              <!-- <ComponentsGenerateScript ref="myComponentsGenerateScript" /> -->
            </div>
            <div v-show="active == 3">
              <ComponentsGenerateScript ref="myComponentsGenerateScript" />
            </div>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import ComponentsGetTabColInfo from './table/initData/getTabColInfo'
import ComponentsCreateOdsTable from './table/createOdsTable/createOdsTable'
import ComponentsGenerateScript from './table/sql/generateScript'
export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    ComponentsGetTabColInfo,
    ComponentsCreateOdsTable,
    ComponentsGenerateScript
  },
  methods: {
    next () {
      let _this = this
      if (_this.active == 0) {
        _this.active++
        let tableList = _this.$refs.myComponentsGetTabColInfo.tableList
        console.log(tableList)
        _this.$refs.myComponentsCreateOdsTable.setTableList(tableList)
      } else if (_this.active == 1) {
        _this.active++
        let tableList = _this.$refs.myComponentsCreateOdsTable.tableList
        console.log(tableList)
        _this.$refs.myComponentsGenerateScript.setTableList(tableList)
      } else if (_this.active == 2) {
        _this.active++
        console.log(_this.active)
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
