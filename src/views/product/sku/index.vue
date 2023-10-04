<template>
    <div>
        <el-table border style="width: 100%;" :data="records">
            <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
            <el-table-column label="名称" prop="skuName" width="width"></el-table-column>
            <el-table-column label="描述" prop="skuDesc" width="width"></el-table-column>
            <el-table-column label="默认图片" width="110">
                <template slot-scope="{row,$index}">
                    <img :src="row.skuDefaultImg" style="width: 80px;height: 80px;">
                </template>
            </el-table-column>
            <el-table-column label="重量" prop="weight" width="80"></el-table-column>
            <el-table-column label="价格" prop="price" width="80"></el-table-column>
            <el-table-column label="操作" prop="prop" width="width">
                <template slot-scope="{row,$index}">
                    <el-button icon="el-icon-sort-down" size="mini" @click="up(row)" v-if="row.isSale == 0"></el-button>
                    <el-button type="success" icon="el-icon-sort-up" size="mini" v-else @click="down(row)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
                    <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuById(row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页  -->
        <el-pagination @size-change="handlerSizeChange" @current-change="getSkuList" :total="30" :current-page="1"
            :page-size="3" :page-sizes="[3, 5, 10]" layout="prev,pager,next,jumper,->,sizes,total"
            style="text-align: center;">
        </el-pagination>
        <!-- drawer -->
        <el-drawer :visible.sync="show" :show-close="false" size="50%">
            <el-row>
                <el-col :span="5">
                    <div class="grid-content bg-purple">名称</div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ skuInfo.skuName }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <div class="grid-content bg-purple">描述</div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ skuInfo.skuDesc }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <div class="grid-content bg-purple">价格</div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">{{ skuInfo.price }}元</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <div class="grid-content bg-purple">平台属性</div>
                </el-col>
                <el-col :span="16">
                    <template>
                        <el-tag type="success" v-for="(attr, index) in skuInfo.skuAttrValueList" :key="attr.id"
                            style="margin-right: 10px;">{{ attr.attrId }}-{{ attr.valueId }}</el-tag>
                    </template>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <div class="grid-content bg-purple">商品图片</div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                        <el-carousel height="150px">
                            <el-carousel-item v-for="item in skuInfo.skuImageList"  :key="item.id">
                                <img :src="item.imgUrl"/>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'sku',
    data() {
        return {
            page: 1,
            limit: 10,
            total: 0,
            records: [],
            skuInfo: {},
            show: false
        }
    },
    methods: {
        // button edit
        edit() {
            this.$message({ type: 'info', message: '正在开发中...' })
        },
        async getSkuList(page = 1) {
            console.log(page)
            this.page = page
            let result = await this.$API.sku.reqGetSkuList(this.page, this.limit)
            if (result.code == 200) {
                this.total = result.data.total
                this.records = result.data.records
            }
        },
        handlerSizeChange(limit) {
            this.limit = limit
            this.getSkuList()
        },
        //上架
        async up(row) {
            let result = this.$API.sku.skuUp(row.id)
            if (result.code == 200) {
                row.isSale = 1
                this.$message({ type: 'success', message: '上架成功' })
            } else {
                this.message.err('上架失败')
            }
        },
        //下架
        down(row) {

            let result = this.$API.sku.skuDown(row.id)
            if (result.code == 200) {
                row.isSale = 0
                this.$message({ type: 'success', message: '下架成功' })
            } else {
                this.$message.error('下架失败')
            }
        },
        //抽屉
        async getSkuById(row) {
            this.show = true
            let result = await this.$API.sku.getSkuById(row.id)
            if (result.code == 200) {
                this.skuInfo = result.data
            }
        }
    },
    mounted() {
        this.getSkuList()
    }
}
</script>

<style scoped>
/* 
    为什么影响不到：因为scope 通过标签内自定义属性实现 且父组件自定义属性只能影响到子组件根标签
    深度选择器 父组件 style scope 也能影响子组件
    css >>>
    less /deep/ 
    scss ::
 */
.el-row .el-col-5 {
    font-size: 18px;
    text-align: right;
}

.el-col {
    margin: 10px 10px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  >>>.el-carousel__button{
    width: 10px;
    height: 10px;
    background-color:red;
    border-radius: 50%;
  }
</style>