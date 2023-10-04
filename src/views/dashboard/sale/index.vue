<template>
    <el-card class="box-card" style="margin: 10px 0px;">
        <div slot="header" class="clearfix">
            <el-tabs class="tab" v-model="activateName">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visite"></el-tab-pane>
            </el-tabs>
            <div class="right">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                    :default-time="['12:00:00']" size="mini" v-model="date" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
        </div>
        <div>
            <el-row :gutter="10">
                <el-col :span="18">
                    <div class="charts" ref="charts"></div>
                </el-col>
                <el-col :span="6">
                    <h3>门店{{ title }}列表</h3>
                    <ul>
                        <li>
                            <span class="rindex">0</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                        <li>
                            <span class="rindex">1</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                        <li>
                            <span class="rindex">2</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                        <li>
                            <span>3</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                        <li>
                            <span>4</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                        <li>
                            <span>5</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                        <li>
                            <span>6</span>
                            <span>肯德基</span>
                            <span class="rvalue">123455</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
    name: 'sale',
    data() {
        return {
            activateName: 'sale',
            myChart: null,
            date: []
        }
    },
    computed: {
        title() {
            return this.activateName == 'sale' ? '销售额' : '访问量'
        },
        ...mapState({
            listData: state => state.home.list
        })
    },
    methods: {
        setDay() {
            const day = dayjs().format('YYYY-MM-DD')
            this.date = [day, day]
        },
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            this.date = [start, end]
        },
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.date = [start, end]
        },
        setYear() {
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.date = [start, end]
        }
    },
    watch: {
        title() {
            //可以更新配置
            this.myChart.setOption({
                title: {
                    text: this.title + '趋势'
                },
                xAxis: {
                    data: this.title == '销售额' ? this.listData.orderFullYearAxis : this.listData.userFullYearAxis
                },
                series: [{
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.title == '销售额' ? this.listData.userFullYear : this.listData.orderFullYear
                }]
            })
        },
        listData() {
            this.myChart.setOption({
                title: {
                    text: this.title + '趋势'
                },
                xAxis: {
                    data: this.listData.orderFullYearAxis
                },
                series: [{
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.listData.userFullYear
                }]
            })
        }
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.charts)
        this.myChart.setOption(
            {
                title: {
                    text: '销售额趋势'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }
                ]
            }
        )
    }
}
</script>

<style scoped>
.charts {
    height: 300px;
}

.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0px;
    margin-right: 10px;
}

.right span {
    margin-right: 10px;
}

.el-date-editor--datetimerange.el-input__inner {
    width: 200px;
    margin: 0px 20px;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0px;
}

ul li {
    height: 8%;
    padding-bottom: 35px;
}

.rindex {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: aliceblue;
    text-align: center;
    background-color: black;
}

.rvalue {
    float: right;
}</style>