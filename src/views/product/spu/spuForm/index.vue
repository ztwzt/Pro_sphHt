<template>
  <div>
    <el-form ref="form" label-width="80px " :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm, index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>
      <!-- SPU图片 
        file-lis：展示的数据，【数组-数组里面需要 url name】
        :on-preview:图片预览
        :on-remove:照片删除
      -->
      <el-form-item label="SPU图片">
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handlerSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}项未选择`" v-model="attrId">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`"
            v-for="(unSelect) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%;" border :data="spu.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName" width="width"></el-table-column>
          <el-table-column label="属性值名称列表" prop="prop" width="width">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="row,$index">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'spuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      //需要兼顾添加和修改，所以对象必须有初始字段
      spu: {
        category3Id: 0,
        tmId:'',
        description: "",
        spuName: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0
          }
        ],
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
      },//spu信息
      tradeMarkList: [],//品牌信息
      spuImageList: [{
        url: "./favicon.ico",
        spuId: 5117,
        name: '1.jpg',
        imgUrl: './favicon.ico',
        imgName: '1.jpg'
      },
      {
        url: "./favicon.ico",
        spuId: 5117,
        name: '2.jpg',
        imgUrl: './favicon.ico',
        imgName: '2.jpg'
      }],//spu图片
      baseSaleAttrList: [],//销售属性
      attrId: ''//收集未选择销售属性id
    }
  },
  methods: {
    //取消按钮
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})
      //清理数据
      //this_data 可以操作data中的响应式数据
      //$options 当前组件的配置对象 data() 执行，返回的响应式数据为空
      Object.assign(this._data,this.$options.data())
      console.log(this.$options.data())
    },
    //图片上传成功回调
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    //照片删除墙回调
    handleRemove(file, fileList) {
      //file:代表删除的图片
      //fileList:剩余的图片
      // 收集照片墙数据
      this.spuImageList = fileList
    },
    //照片墙预览回调
    handlePictureCardPreview(file) {
      //地址赋值
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //初始化数据
    async initSpuData(spu) {
      //获取spu信息
      //let spuResult=await this.$API.spu.getSpuById(spu.id)
      //获取品牌信息
      let tradeMarkResult = await this.$API.spu.getTrademarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      //获取spu图片
      let spuImageList = await this.$API.spu.getSpuImageList(spu.id)
      if (spuImageList.code == 200) {
        this.spuImageList = spuImageList.data
      }
      //获取销售属性
      let baseSaleAttrList = await this.$API.spu.getBaseSaleAttrList()
      if (baseSaleAttrList.code == 200) {
        this.baseSaleAttrList = baseSaleAttrList.data
      }
    },
    //添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrId.split(":")
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrId = ''
    },
    //添加属性值回调
    addSaleAttrValue(row) {
      //控制button  and input 的切换
      this.$set(row, 'inputVisible', true)
      //通过inputvalue收集数据
      this.$set(row, 'inputvalue', '')
    },
    //添加属性值  失去焦点
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() == '') {
        this.$message('属性值不能为空')
        return
      }
      let flag = row.spuSaleAttrValueList.every(item => {
        return item.saleAttrValueName != inputValue
      })
      if (!flag) {
        this.$message('属性值不能重复')
        return
      }

      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    //保存回调
    async save() {
      //整理参数
      this.sup.spuImageList = this.spuImageList.map(item => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url
        }
      })
      let result = await this.$API.spu.reqSave(this.spu)
      if (result.code == 200) {
        this.$message({ type: "success", message: '保存成功' })
        this.$emit('changeScene', {scene:0,flag:this.spu.id?'修改':'添加'})
      }
      //清理数据
      Object.assign(this._data,this.$options.data())
    },
    //添加请求
    async addSpuData(category3Id) {
      this.spu.category3Id=category3Id
      //获取销售属性
      let baseSaleAttrList = await this.$API.spu.getBaseSaleAttrList()
      if (baseSaleAttrList.code == 200) {
        this.baseSaleAttrList = baseSaleAttrList.data
      }
      //获取品牌信息
      let tradeMarkResult = await this.$API.spu.getTrademarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
    }
  },
  computed: {
    //计算未选择的销售属性
    unSelectSaleAttr() {
      //filter从数组中过滤出用户需要的元素 ，并返回一个新的数组
      let result = this.baseSaleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          //every 返回一个boolean 值
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  },
  mounted() {

  }
}
</script>

<style>
.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}</style>