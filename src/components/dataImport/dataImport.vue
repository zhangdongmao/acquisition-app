<!-- 数据导入 -->
<template>
  <div>
    
导入方式：
     <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <ComponentTable  v-show="value == 1" ref="myComponentTable" /> 
   <ComponentExcel  v-show="value == 2" ref="myComponentExcel" /> 
   <ComponentSchema v-show="value == 3" ref="myComponentSchema" /> 
  </div>
</template>
<script>
   import ComponentExcel  from './excel.vue';
   import ComponentTable  from './table.vue';
   import ComponentSchema  from './schema.vue';
  export default {


    data() {
      return {
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
        value: ''
      }
    },
    components: {
    ComponentExcel,ComponentTable,ComponentSchema
    },
    methods: {
          parentClick() {
            //this.$refs.mychild.childClick("我是子组件里面的方法哦");  // 调用子组件的方法childClick
      }
    }
  }
</script>
