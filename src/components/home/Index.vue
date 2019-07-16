<!-- 首页 -->
<template>
  <el-container class="home_container">
    <!-- 顶部logo -->
    <!-- <el-header class="home_header" style="height: 40px; box-sizing: border-box"> -->
    <!-- <div> -->
    <!-- <img class="left logo" src="../../assets/images/logo.png" alt=""> -->

    <!-- <span class="left title">自助化平台</span> -->
    <!-- <el-button type="danger" size="mini" round class="right" style="margin-top: 15px">个人中心</el-button> -->
    <!-- </div> -->
    <!-- </el-header> -->
    <el-container>
      <el-aside class="home_aside"
                :width="collapse ? '30px' : '300px'">
        <el-menu style="height: 100%"
                 router
                 :collapse="collapse"
                 :default-active="$route.name"
                 :unique-opened="true"
                 class="el-menu-vertical-demo sidebar"
                 background-color="#304156"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据导入</span>
            </template>
            <el-menu-item index="dataImport">
              <i class="el-icon-menu"></i>
              <span>数据导入</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>初始化业务元数据</span>
            </template>
              <el-menu-item index="getSourceSystemSchema">
                <i class="el-icon-menu"></i>
                <span>获取源系统数据模式</span>
              </el-menu-item>
              <el-menu-item index="getTabColInfo">
                <i class="el-icon-menu"></i>
                <span>获取表及字段信息</span>
              </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"> -->
          <!--<i class="el-icon-location"></i>-->
          <!-- <i class="el-icon-menu"></i>
              <span>建表</span>
            </template>
            <el-menu-item index="createODSTable">
              <i class="el-icon-menu"></i>
              <span>ODS建表</span>
            </el-menu-item>
            <el-menu-item index="createDWTable">
              <i class="el-icon-menu"></i>
              <span>DW建表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"> -->
          <!--<i class="el-icon-location"></i>-->
          <!-- <i class="el-icon-menu"></i>
              <span>脚本生成</span>
            </template>
            <el-menu-item index="generateODSScript">
              <i class="el-icon-menu"></i>
              <span>ODS脚本生成</span>
            </el-menu-item>
            <el-menu-item index="generateDWScript">
              <i class="el-icon-menu"></i>
              <span>DW脚本生成</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"> -->
          <!--<i class="el-icon-location"></i>-->
          <!-- <i class="el-icon-menu"></i>
              <span>导出</span>
            </template>
            <el-menu-item index="derive">
              <i class="el-icon-menu"></i>
              <span>导出</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>定制化入湖</span>
            </template>
            <el-menu-item index="customizationOds">
              <i class="el-icon-menu"></i>
              <span>ODS定制化入湖</span>
            </el-menu-item>
            <el-menu-item index="customizationDw">
              <i class="el-icon-menu"></i>
              <span>DW定制化入湖</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>dw模型设计</span>
            </template>
            <el-menu-item index="dwModelDesign">
              <i class="el-icon-menu"></i>
              <span>dw模型设计</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>入湖总览</span>
            </template>
            <el-menu-item index="overview">
              <i class="el-icon-menu"></i>
              <span>入湖总览</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="11">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>入湖报告</span>
            </template>
            <el-menu-item index="presentation">
              <i class="el-icon-menu"></i>
              <span>入湖报告</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      iconArr: ['icon-user-fill', 'icon-cog', 'icon-shoppingcart', 'icon-file', 'icon-chart-area'],
      // navList:[
      //   {name:'/Table',navItem:'发现项目'},
      //   {name:'/communityActivity',navItem:'社区动态'},
      //   {name:'/publishProject',navItem:'发布项目'},
      //   {name:'/personalCenter',navItem:'个人中心'},
      //   {name:'/manageCenter',navItem:'管理员中心'},
      // ],
    }
  },
  methods: {

  }
}
</script>
<style scoped>
/* .el-icon-arrow-down:before {
  margin-left: 10px
} */
.logo {
  height: 30px;
}
.home_container {
  height: 100%;
}
.home_header {
  background: #304156;
  line-height: 60px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.title {
  color: #ccc;
  font-size: 15px;
  padding-left: 20px;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
</style>
