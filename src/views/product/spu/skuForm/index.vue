<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
            <el-form-item label="SKU名称" >
                <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input placeholder="价格（元）" type="number" v-model="skuInfo.price"></el-input>
            </el-form-item>
            <el-form-item label="重量（千克）">
                <el-input placeholder="重量（千克）" v-model="skuInfo.weight"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true" ref="form" label-width="80px">
                    <el-form-item :label="attr.attrName"  v-for="(attr,index) in attrInfoList" :key="attr.id">
                        <el-select placeholder="请选择" v-model="attr.attrIdAndValue">
                            <el-option :label="attrValue.valueName" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id" :value="`${attr.id}:${attrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true" ref="form" label-width="80px">
                    <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
                        <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                            <el-option :value="`${saleAttr.id}:${saleAttrValue.id}`" :label="saleAttrValue.saleAttrValueName" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table border style="100%" :data="spuImageList" @selection-change="handlerSelectionChange">
                    <el-table-column label="" prop="prop" width="80" type="selection"></el-table-column>
                    <el-table-column label="图片" prop="prop" width="width">
                        <template slot-scope="{row,$index}">
                            <img :src="row.imgUrl" style="width: 100px;height: 100px;"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName" width="width"></el-table-column>
                    <el-table-column label="操作" prop="prop" width="width">
                        <template slot-scope="{row,$index}">
                            <el-button type="primary" v-if="row.isDefault==0" @click="changeIsDefault(row)">设置默认</el-button>
                            <el-button v-else>默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveSku">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'skuForm',
    data() {
        return {
            //spu图片
            spuImageList: [{
                url: "./favicon.ico",
                spuId: 5117,
                name: '1.jpg',
                imgUrl: './favicon.ico',
                imgName: '1.jpg',
                isDefault:0
            },
            {
                url: "./favicon.ico",
                spuId: 5117,
                name: '2.jpg',
                imgUrl: './favicon.ico',
                imgName: '2.jpg',
                isDefault:0 
            }],
            //spu属性
            spuSaleAttrList: [
                {
                    baseSaleAttrId: 0,
                    id: 0,
                    saleAttrName: "颜色",
                    spuId: 0,
                    spuSaleAttrValueList: [
                        {
                            baseSaleAttrId: 0,
                            id: 0,
                            isChecked: "",
                            saleAttrName: "颜色",
                            saleAttrValueName: "红色",
                            spuId: 0
                        }
                    ]
                }
            ],
            attrInfoList: [{
                attrName:'ztw',
                id:100,
                attrValueList:[
                    {
                        id:1,
                        valueName:'www'
                    },
                    {
                        id:2,
                        valueName:'kkk'
                    }
                ]
            },
            {
                attrName:'ztww',
                id:101,
                attrValueList:[
                {
                        id:3,
                        valueName:'www'
                    },
                    {
                        id:4,
                        valueName:'kkk'
                    }
                ]
            }
            ],
            skuInfo: {
                //一 父组件给的数据
                //2 v-model
                //3 书写代码收集
                category3Id: 0,
                isSale: 0,
                price:'',
                skuDefaultImg: "",
                skuDesc: "",
                spuId: 0,
                tmId: 0,
                weight: "",
                skuName: "",
                //平台属性
                skuAttrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueId: 0
                    // }
                ],
                skuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "",
                    //     imgUrl: "",
                    //     isDefault: "",
                    //     skuId: 0,
                    //     spuImgId: 0
                    // }
                ],
                //销售属性
                skuSaleAttrValueList: [
                    // {
                    //     id: 0,
                    //     saleAttrId: 0,
                    //     saleAttrName: "",
                    //     saleAttrValueId: 0,
                    //     saleAttrValueName: "",
                    //     skuId: 0,
                    //     spuId: 0
                    // }
                ],
            },
            spu: {},
            //收集图片字段
            imageList:[]
        }
    },
    methods: {
        //save sku
        async saveSku(){
            //整理参数
            const {attrInfoList,skuInfo,spuSaleAttrList,imageList}=this
            //收集sku平台属性值
            // let arr=[]
            // attrInfoList.forEach(item=>{
            //     //用户选择属性
            //     if(item.attrIdAndValue){
            //         const [attrId,valueId]=item.attrIdAndValue.split(':')
            //         let obj={attrId,valueId}
            //         arr.push=obj
            //     }
            // })
            skuInfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
                if(item.attrIdAndValue){
                    const [attrId,valueId]=item.attrIdAndValue.split(':')
                    prev.push({attrId,valueId})
                }
                return prev
            },[])
            //收集spu销售属性
           skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
                if(item.attrIdAndValue){
                    const [saleAttrId,saleAttrValueId]=item.attrIdAndValueId.split(':')
                    prev.push({saleAttrId,saleAttrValueId})
                }
                return prev
            },[])
            //整理图片的数据
            skuInfo.skuImageList=imageList.map(item=>{
                return{
                    imgName:item.imgName,
                    imgUrl:item.imgUrl,
                    isDefault:item.isDefault,
                    spuImgId:item.id
                }
            })
            let result= await this.$API.spu.saveSku(skuInfo)
            if(result.code==200){
                this.$message({type:'success',message:'添加成功'})
            }else{
                this.$message.err('添加失败')
            }
        },
        //cancel button
        cancel(){
            //父组件自定义事件
            this.$emit('changeScenes',0)
            //清除数据
            Object.assign(this._data,this.$options.data())
        },
        //image changeIsDefault
        changeIsDefault(row){
            this.spuImageList.forEach(item=>{
                item.isDefault=0
            })
            row.isDefault=1
            //收集数据
            this.skuInfo.skuDefaultImg=row.imgUrl
        },
        //table checkbox
        handlerSelectionChange(selection){
            //获取到选中信息 缺少字段
            this.imageList=selection
        },
        //发请求
        async getData(category1Id, category2Id, spu) {
            this.spu = spu
            //收集父组件给的数据
            this.skuInfo.category3Id = spu.category3Id
            this.skuInfo.spuId = spu.id
            this.skuInfo.tmId = spu.tmId
            let result1 = await this.$API.spu.getSpuImageList(spu.id)
            //添加字段
            if(result1.code==200){
                let list=result1.data
                list.forEach(item => {
                    item.isDefault=0
                });
            }
            let result2 = await this.$API.spu.getSpuSaleAttrList(spu.id)
            // let result3 = await this.$API.sku.getAttrInfoList(category1Id, category2Id, spu.category3Id)
        }
    }
}
</script>

<style></style>