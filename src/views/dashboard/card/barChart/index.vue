<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts"
export default {
    name: 'barChart',
    mounted() {
        let barChart = echarts.init(this.$refs.charts)
        barChart.setOption({
            xAxis: {
                show: false,
                //均分
                type: 'category'
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    type: 'bar',
                    data: [10, 7, 33, 12, 6,11,66,23,11,1,5,99],
                    
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip:{
                
            }
        })
    }
}
</script>

<style>
.charts {
    width: 100%;
    height: 100%;
}
</style>