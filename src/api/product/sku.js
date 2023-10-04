import request from '@/utils/request'
//获取sku数据 GET /admin/product/list/{page}/{limit}
export const reqGetSkuList=(page,limit)=>request({
    url:`/admin/product/list/${page}/${limit}`,
    method:'get'
})
//sku down GET /admin/product/cancelSale/{skuId}
export const skuDown=(skuId)=>request({
    url:` /admin/product/cancelSale/${skuId}`,
    method:'get'
})
//sku up GET /admin/product/onSale/{skuId}
export const skuUp=(skuId)=>request({
    url:`/admin/product/onSale/${skuId}`,
    method:'get'
})
//sku 侧边栏展示 GET /admin/product/getSkuById/{skuId}
export const getSkuById=(skuId)=>request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get'
})