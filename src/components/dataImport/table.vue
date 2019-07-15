<!-- 数据导入-按表名搜索 -->
<template>
  <div>
    <!-- 面包屑 -->
    <el-divider></el-divider>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps>
         
          <el-divider></el-divider>
          <div v-if="active === 0">
            1
          </div>
           <div v-if="active === 1">
             2
          </div>
           <div v-if="active === 2">
             3
          </div>
          <el-button style="margin-top: 12px;" @click="last">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      last() {
        if (this.active-- == 0) this.active = 0;
      }
    }
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
