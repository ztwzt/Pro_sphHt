<template>
    <el-card>
        <div slot="header">
            <div class="category-header">
                <span>销售额类别占比</span>
                <el-radio-group v-model="value">
                    <el-radio-button label="全部渠道"></el-radio-button>
                    <el-radio-button label="线上"></el-radio-button>
                    <el-radio-button label="门店"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div ref="charts" class="charts">

        </div>
    </el-card>
</template>

<script>
import *  as echarts from 'echarts'
export default {
    name: 'category',
    data() {
        return {
            value: '全部渠道'
        }
    },
    mounted() {
        let charts = echarts.init(this.$refs.charts)
        charts.setOption(
            {
                title: {
                    text: 'Direct',
                    subtext: 735,
                    left: 'center',
                    top: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            position: 'outsize'
                        },
                        labelLine: {
                            show: true
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            }
        )
        //绑定图表事件
        charts.on('mouseover',(params)=>{
            const {name,value}=params.data
            charts.setOption({
                title: {
                    text:name,
                    subtext:value 
                }
            })
        }
        );
    },

}
</script>

<style scoped>
.category-header {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
}

.charts {
    width: 100%;
    height: 300px;
}
</style>