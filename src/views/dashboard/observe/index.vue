<template>
    <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <search></search>
        </el-col>
          <el-col :span="12">
            <category></category>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import search from './search'
import category from './category'
export default {
    name:'observe',
    components:{
        search,
        category
    }
}
</script>

<style>

</style>