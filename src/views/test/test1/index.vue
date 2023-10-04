<template>
  <div>
    <!-- 按钮权限 -->
    <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btn1.Add1')!=-1">111</el-button>
    <el-button type="primary">222</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>