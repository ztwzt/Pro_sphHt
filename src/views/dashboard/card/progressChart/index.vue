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
                //最小值和最大值
                min:0,
                max:100
            },
            yAxis: {
                show: false,
                     //均分
                type: 'category'
            },
            series: [
                {
                    type: 'bar',
                    data: [78],
                    //柱条宽度
                    barWidth:10,
                    color:'yellowgreen',
                    //背景颜色
                    showBackground:true,
                    backgroundStyle:{
                        color:'#eee'
                    },
                    //图像上的文本
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right'
                    }
                    
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
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