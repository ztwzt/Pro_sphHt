<template>
  <a :title="title" style="margin:10px">
    <!-- $attrs 收集除props 外的所有参数 -->
  <el-button v-bind="$attrs" v-on="$listeners">
    </el-button>
  </a>
</template>

<script>
export default {
    name:'HintButton',
    props:['title']
}
</script>

<style>

</style>