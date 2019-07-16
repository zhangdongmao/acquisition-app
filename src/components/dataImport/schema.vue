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
            <el-step title="获取源系统数据模式"></el-step>
            <el-step title="获取表及字段信息"></el-step>
            <el-step title="建表"></el-step>
            <el-step title="脚本生成"></el-step>
            <el-step title="导出"></el-step>
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
    ComponentsGenerateScript
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
      }

      if (this.active == 1) {
        // let params = [];
        this.$refs.myComponentsTabColInfo.getStatus().then(rsp => {
          if (rsp.code == 200) {
            _this.active++
            _this.$refs.myComponentsCreateTable.setValue(rsp.data)
          }
        })
      }
      // if(this.active == 0){
      //    this.$refs.myComponentsSourceSystemSchema.getStatus().then(code => {
      //       if(code ==200){
      //           if (this.active++ > 2) this.active = 0;
      //       }
      //    });
      // }
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
