<!-- 数据导入 -->
<template>
  <div>

    请选择导入方式：
    <el-select v-model="value"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <ComponentTable v-if="value == '1'"
                    ref="myComponentTable" />
    <ComponentExcel v-if="value == '2'"
                    ref="myComponentExcel" />
    <ComponentSchema v-if="value == '3'"
                     ref="myComponentSchema" />
  </div>
</template>
<script>
import ComponentExcel from './excel.vue'
import ComponentTable from './table.vue'
import ComponentSchema from './schema.vue'
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '输入表名导入'
      }, {
        value: '2',
        label: '上传excel导入'
      }, {
        value: '3',
        label: '指定schema导入'
      }],
      value: ''
    }
  },
  components: {
    ComponentExcel, ComponentTable, ComponentSchema
  },
  methods: {
  }
}
</script>
