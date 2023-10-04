import request from  '@/utils/request'


//获取品牌列表 /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList=(page,limit)=>request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get'
}
)


//新增品牌 POST /admin/product/baseTrademark/save
//修改 PUT /admin/product/baseTrademark/update
export const reqAddOrUpdateTradeMask=(tradeMask)=>{
    if(tradeMask.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMask})
    }else{
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMask})
    }
}
//删除品牌 DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMask=(id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete'
})