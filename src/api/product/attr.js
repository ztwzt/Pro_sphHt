 import request from '@/utils/request'
 // admin/product/getCategory1
export const reqGetCategory1=()=>request({
    url:'/admin/product/getCategory1',
    method:'get'
})

// admin/product/getCategory2/{category1Id}
export const reqGetCategory2=(category1Id)=>request({
    url:`/admin/product/getCategory2/${category1Id}`,
    method:'get'
})

// admin/product/getCategory3/{category2Id}
export const reqGetCategory3=(category2Id)=>request({
    url:`admin/product/getCategory3/${category2Id}`,
    method:'get'
})
//获取商品/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetCategoryList=(category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})
//添加属性值和属性名的操作  
export const reqAddOrUpdateAttr=(data)=>request({
    url:'/admin/product/saveAttrInfo',
    method:'post',
    data
})