<!-- 数据导入 按excel导入 -->
<template>
  <div>
    <ComponentsCustomizationOds />
  </div>
</template>
<script>
import ComponentsCustomizationOds from './excel/customizationOds/customizationOds.vue'
export default {
  components: {
    ComponentsCustomizationOds
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
