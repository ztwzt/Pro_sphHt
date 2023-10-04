<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
            <detail title="总销售额" count="126560">
              <template slot="charts">
                <span>周同笔&nbsp;56.7%<svg t="1696320169626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4828" width="16" height="16"><path d="M194.108395 621.186771 863.223758 621.186771 528.668123 251.67295Z" fill="#1afa29" p-id="4829"></path></svg></span>
                &nbsp;&nbsp;
                <span>日同笔&nbsp;19.96%<svg t="1696320268594" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7742" width="16" height="16"><path d="M863.321996 251.674996 194.108395 251.674996 528.677333 621.186771Z" fill="#d81e06" p-id="7743"></path></svg></span>
              </template>
              <template slot="footer">
                <span>日销售额￥ 12333</span>
              </template>
            </detail>
        </el-card>
        
    </el-col>
      <el-col :span="6">
        <el-card>
            <detail title="访问量" count="88480">
              <template slot="charts">
                  <lineChart></lineChart>
              </template>
              <template slot="footer">
                <span>日访问量 1233</span>
              </template>
            </detail>
        </el-card>
    </el-col>
      <el-col :span="6">
        <el-card>
            <detail title="支付笔数" count="88460">
              <template slot="charts">
                <barChart></barChart>
              </template>
              <template slot="footer">
                <span>转化率 66%</span>
              </template>
            </detail>
        </el-card>
    </el-col>
      <el-col :span="6">
        <el-card>
            <detail title="运营活动效果" count="78%">
              <template slot="charts">
                <progressChart></progressChart>
              </template>
              <template slot="footer">
                <span>周同笔&nbsp;56.7%<svg t="1696320169626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4828" width="16" height="16"><path d="M194.108395 621.186771 863.223758 621.186771 528.668123 251.67295Z" fill="#1afa29" p-id="4829"></path></svg></span>
                &nbsp;&nbsp;
                <span>日同笔&nbsp;19.96%<svg t="1696320268594" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7742" width="16" height="16"><path d="M863.321996 251.674996 194.108395 251.674996 528.677333 621.186771Z" fill="#d81e06" p-id="7743"></path></svg></span>
              </template>
            </detail>
        </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import detail from './detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
    name:'card',
    components:{
        detail,
        lineChart,
        barChart,
        progressChart
    }
}
</script>

<style>

</style>