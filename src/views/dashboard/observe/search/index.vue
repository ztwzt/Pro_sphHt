<template>
    <el-card>
        <div slot="header">
            <div class="search-header">
                <span>热门搜索</span>
                <el-dropdown>
                    <span>
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div>
            <el-row :gutter="10">
                <el-col :span="12">
                    <lineChart></lineChart>
                </el-col>
                <el-col :span="12">
                    <lineChart></lineChart>
                </el-col>
            </el-row>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="排名" width="80" type="index">
                </el-table-column>
                <el-table-column label="搜索关键字" width="150">
                </el-table-column>
                <el-table-column label="用户数" sortable width="width">
                </el-table-column>
                <el-table-column label="周涨幅" sortable width="width">
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="1000" class="pagination">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import lineChart from './lineChart'
export default {
    name: 'search',
    data() {
        return {
            tableData: [{}]
        }
    },
    components: {
        lineChart
    }
}
</script>

<style>
.search-header {
    display: flex;
    justify-content: space-between;
}
.pagination{
    float:right;
}
</style>