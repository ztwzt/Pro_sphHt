<template>
  <div>
    <el-card style="margin:20px 0px">
      <categorySelected @getCategoryId="getCategoryId" :show="!isShowTable"></categorySelected>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-inco-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <el-table :data="attrList" style="width: 100%;" border>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id"
                style="margin:5px 20px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
          :disabled="(attrInfo.attrName == '')">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width:100%;margin: 20px 0px;" border :data="attrInfo.attrValueList">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="属性值名称" prop="prop" align="center" width="width">
            <template slot-scope="{row,$index}">
              <!-- 模式切换 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)"
                @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else style="display: block;" @click="toEdit(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" align="center" width="width">
            <template slot-scope="{row,$index}">
              <template>
                <!-- 气泡确认框 -->
                <el-popconfirm :title="`确定删除${row.valueName}吗?`" @onConfirm="deleteAttrValue(index)">
                  <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini"></el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      //flag:true,无法控制多个属性
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      }
    }
  },
  methods: {
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
        this.getAttrList()
      }
    },
    //请求attr
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      let result = await this.$API.attr.reqGetCategoryList(category1Id, category2Id, category3Id)
      if (result.code) {
        this.attrList = result.data
      }
    },
    //添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,//在已有的属性上新增新的属性值 
        valueName: '',
        flag: true//给每一个属性值添加一个标记，且只控制改属性值 push flag 响应式数据
      })
      //自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    //添加属性回调  
    addAttr() {
      this.isShowTable = false
      //收集一条数据
      //清除数据
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    //修改属性
    updateAttr(row) {
      this.isShowTable = false
      //由于数据结构当中存在对象套数组，数组里面套对象，深拷贝
      this.attrInfo = cloneDeep(row)
      console.log(this.attrInfo==row)
      //加上flag
      this.attrInfo.attrValueList.forEach(item => {
        //不能这样书写，flag不是响应式数据
        //item.flag=false
        //api $set 添加响应式数据(对象，属性，属性值)
        this.$set(item, 'flag', false)

      })
    },
    //模式切换
    toLook(row) {
      //row 当前用户添加的最新的属性值
      //属性值校验
      if (row.valueName.trim() == '') {
        this.$message('请你输入一个正确的属性');
        return;
      }
      //元素是否重复
      let isRepat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      if (isRepat) return;
      row.flag = false
    },
    //input 自动获取焦点 
    toEdit(row, index) {
      row.flag = true
      //input -> v-if 此时不一定有input结构 
      //nextTick 保证input结构完整 
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    //删除属性值
    deleteAttrValue(index){
      //当前删除操作是不需要答请求的
       this.attrInfo.attrValueList.splice(index,1)
    },
    //保存按钮
    async save(){
      //整理参数
      this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
        //boolean
        if(item.valueName!=''){
          //去除flag
          delete item.flag
          return true
        }
      })
      try{
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({type:'success',message:'保存成功'})
        //再次获取数据展示
        this.getAttrList()
        this.isShowTable=true
      }catch(error){

      }
    }
  }
}
</script>

<style></style>