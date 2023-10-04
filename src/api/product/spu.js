import request from "@/utils/request";

//获取spuList GET /admin/product/{page}/{limit}
export const reqGetSpuList = (page, limit, categoryId3) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { categoryId3 },
  });
//品牌数据 GET /admin/product/baseTrademark/getTrademarkList
export const getTrademarkList = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });
//销售属性 GET /admin/product/baseSaleAttrList
export const getBaseSaleAttrList = () =>
  request({
    url: "/admin/product/baseSaleAttrList",
    method: "get",
  });
//spu信息 GET /admin/product/getSpuById/{spuId}
export const getSpuById = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get",
  });
//获取spu 图片 GET /admin/product/spuImageList/{spuId}
export const getSpuImageList = (spuId) =>request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
//保存 (修改或添加)spu POST /admin/product/saveSpuInfo
export const reqSave = (spuInfo) => {
  if (spuInfo.id) {
    //是否携带spuId 修改添加
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data:spuInfo
    })
  }else{
    return request({
        url: "/admin/product/saveSpuInfo",
        method: "post",
        data:spuInfo
      })
  }
}
//删除spu DELETE /admin/product/deleteSpu/{spuId}

export const deleteSpu=(spuId)=>request({
  url:`/admin/product/deleteSpu/${spuId}`,
  method:'delete'
})
//获取spu ->sku GET /admin/product/findBySpuId/{spuId}
export const findSku=(spuId)=>request({
  url:`/admin/product/findBySpuId/${spuId}`,
  method:'get'
})
//获取sku属性 GET /admin/product/spuSaleAttrList/{spuId}
export const getSpuSaleAttrList=(spuId)=>request({
  url:`/admin/product/spuSaleAttrList/${spuId}`,
  method:'get'
})
//获取属性列表GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getAttrInfoList=(category1Id,category2Id,category3Id)=>request({
  url:`/admin/product/spuSaleAttrList/${category1Id}/${category2Id}/${category3Id}`,
  method:'get'
})
//save POST /admin/product/saveSkuInfo
export const saveSku=(skuInfo)=>request({
  url:' /admin/product/saveSkuInfo',
  method:'post',
  data:skuInfo
})