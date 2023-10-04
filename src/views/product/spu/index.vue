<template>
    <div>
        <el-card style="margin: 20px 0px;">
            <categorySelected @getCategoryId="getCategoryId" :show="scene != 0"></categorySelected>
        </el-card>
        <el-card>
            <!-- 三个部分 -->
            <div v-show="scene == 0">
                <!-- 展示spu列表 -->
                <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加SPU</el-button>
                <el-table border width="100%" :data="records">
                    <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
                    <el-table-column label="Spu名称" prop="spuName" width="width"></el-table-column>
                    <el-table-column label="Spu描述" prop="description" width="width"></el-table-column>
                    <el-table-column label="操作" prop="prop" width="width">
                        <template slot-scope="{row,$index}">
                            <!-- 封装title -->
                            <!-- 标签命名规则 hint-button <=> HintButton -->
                            <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku"
                                @click="addSku(row)"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"
                                @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看sku" @click="handler(row)"></hint-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" onConfirm="deleteSpu(row)">
                                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"
                                    slot="reference"></hint-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination :total="total" :current-page="page" :page-size="limit"
                    layout="prev,pager,next,jumper,->,sizes,total" :page-sizes="[3, 5, 10]" @current-change="getSpuList"
                    @size-change="handlerSizeChange" style="text-align: center;"></el-pagination>
            </div>
            <spuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></spuForm>
            <skuForm v-show="scene == 2" @changeScenes="changeScenes" ref="sku"></skuForm>
            <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
                <el-table :data="skuList" border style="width:100%;" v-loading="loading">
                    <el-table-column label="名称" prop=""></el-table-column>
                    <el-table-column label="价格"  prop=""></el-table-column>
                    <el-table-column label="重量"  prop=""></el-table-column>
                    <el-table-column label="默认图片"  prop=""></el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import skuForm from './skuForm'
import spuForm from './spuForm'
export default {
    name: 'spu',
    components: {
        skuForm,
        spuForm
    },
    data() {
        return {
            category1Id: '2',
            category2Id: '13',
            category3Id: '61',
            page: 1,
            limit: 3,
            total: 5,
            scene: 0,//代表展示spu列表  1添加或修改spu 2添加sku
            //三级联动
            show: true,
            dialogTableVisible:false,//dia 对话框
            spu:{},//dia 展示
            skuList:[],//sku dia 展示
            loading:true,//el loading 效果
            //spu数据
            records: [
                {
                    spuName: 'ztw',
                    description: '超晒',
                    id: 4959,
                    category3Id: '61'
                },
                {
                    spuName: 'ztww',
                    description: '超晒',
                    id: 4959
                },
                {
                    spuName: 'ztwww',
                    description: '超晒',
                    id: 4959
                },
                {
                    spuName: 'ztwwww',
                    description: '超晒',
                    id: 4959
                },
                {
                    spuName: 'ztwwwww',
                    description: '超晒',
                    id: 4959
                }
            ]
        }
    },
    methods: {
        //close dia
        close(){
            this.loading=true
            //清除数据，方便展示下一次数据 解决数据回显
            this.sku=''
        },
        //查看sku按钮
        async handler(row){
            this.spu=row
            this.dialogTableVisible=true
            //获取spu列表展示
            let result=await this.$API.spu.findSku(row.id)
            if(result.code==200){
                this.skuList=result.data
                this.loading=false//取消loading 效果
            }
        },  
        //sku cancel button
        changeScenes(scene) {
            this.scene = scene
        },
        //添加sku
        addSku(row) {
            this.scene = 2
            //调用子组件方法->请求
            this.$refs.sku.getData(this.category1Id, this.category2Id, row)
        },
        //删除spu
        async deleteSpu(row) {
            let result = await this.$API.spu.deleteSpu(row.id)
            if (result.code == 200) {
                this.$message({ type: 'success', message: '删除成功！' })
                //页面数据条数判断
                this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
            } else {
                this.$message.error('删除失败！');
            }
        },
        //pagesize change
        handlerSizeChange(limit) {
            this.limit = limit
            this.getSpuList(this.page)
        },
        //获取supList es6默认参数  @current-change="getSpuList" 点击分页器第几页的回调
        async getSpuList(pages = 1) {
            this.page = pages
            const { page, limit, category3Id } = this
            let result = await this.$API.spu.reqGetSpuList(page, limit, category3Id)
            if (result.code == 200) {
                this.records = result.data.records
                this.total = result.data.total
            }
        },
        //三级联动
        getCategoryId({ categoryId, level }) {
            if (level == 1) {
                this.category2Id = ''
                this.category3Id = ''
                this.category1Id = categoryId
            } else if (level == 2) {
                this.category2Id = categoryId
                this.category3Id = ''
            } else if (level == 3) {
                this.category3Id = categoryId
                //请求
                this.getSpuList()
            }
        },
        //切换scene 添加sku
        addSpu() {
            this.scene = 1
            //通知子组件发送请求
            this.$refs.spu.addSpuData(this.category3Id)
        },
        //x修改sku
        updateSpu(row) {
            this.scene = 1
            //获取子组件spuForm 操作子组件 拿到子组件，可以操作子组件数据和方法
            this.$refs.spu.initSpuData(row)
        },
        //scene
        changeScene(scene, flag) {
            this.scene = scene
            if (flag == '修改')
                this.getSpuList(this.page)
            else
                this.getSpuList()
        }
    }
}
</script>

<style></style>