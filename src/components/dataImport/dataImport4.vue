<!-- 数据导入 按schema搜索 -->
<template>
  <div>
       <el-divider></el-divider>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-steps :active="active" finish-status="success">
            <el-step title="加载入湖清单"></el-step>
            <el-step title="数据探源"></el-step>
            <el-step title="备用区建表"></el-step>
            <el-step title="数据初始化"></el-step>
            <el-step title="调度脚本生成"></el-step>
          </el-steps>
        <el-col :span="24" style="margin-top:20px;" >

          <div v-show="active == 0"  >
              
                导入方式：
                <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
          </div>
              <el-button size="mini" type="primary" v-show="active > 0" class="btn-back" @click="back">上一步</el-button> 
              <el-button size="mini" type="primary" class="btn" @click="next">下一步</el-button>

              <el-button size="mini" type="primary" class="btn" @click="getStatus(0)"  v-show="active == 0" >获取</el-button>   
              <el-button size="mini" type="primary" class="btn" @click="getStatus(1)"  v-show="active == 1" >获取</el-button>     
              
              <el-dropdown class="btn" v-show="active == 2" >
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="getODSLoadMode">生成建表语句</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">执行建表语句</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">重跑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown class="btn" v-show="active == 3" >
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="createOdsLoad">生成初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">执行初始化脚本</el-dropdown-item>
                  <el-dropdown-item command="odsInitScript">重跑初始化脚本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown class="btn" v-show="active == 4" >
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="getODSLoadMode">生成调度脚本</el-dropdown-item>
                  <el-dropdown-item command="exportOdsSchedulScript">导出调度脚本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              
        </el-col>
         <el-col style="margin-top:20px;" >
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
  
  import ComponentsSourceSystemSchema  from './schema/initData/getSourceSystemSchema';
  import ComponentsTabColInfo  from './schema/initData/getTabColInfo';
  import ComponentsCreateTable  from './schema/createTable/createTable';
  import ComponentsGenerateScript  from './schema/sql/generateScript';  
  
  export default {
    data() {
      return {
        active: 0,
        value: '',
        options: [{
            value: '1',
            label: '表名'
          }, {
            value: '2',
            label: 'excel'
          }, {
            value: '3',
            label: 'schema'
          }],
      };
    },
    components: {
      ComponentsSourceSystemSchema,ComponentsTabColInfo,
      ComponentsCreateTable,ComponentsGenerateScript
    },
    methods: {
      next() {
        let _this = this;
       if(this.active == 0){
          _this.active++;
          let params = this.$refs.myComponentsSourceSystemSchema.multipleSelection;
          let params2 = [];
          for(var i = 0; i < params.length; i++) {
                params2.push(params[i].business_system_name_short_name);
          };
            _this.$refs.myComponentsTabColInfo.setValue(params2);
            return;

        }

        if(this.active == 1){
            _this.active++;
          let params = this.$refs.myComponentsTabColInfo.multipleSelection;
          _this.$refs.myComponentsCreateTable.setValue(params);
          return;
        }
       
      },
      back() {
        if (this.active-- == 0) this.active = 0;
      },
      getStatus(param){
        if(param == 0){
          this.$refs.myComponentsSourceSystemSchema.getStatus();
        }
         if(param == 1){
          this.$refs.myComponentsTabColInfo.getStatus();
        }
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

