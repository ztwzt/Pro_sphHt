//统一暴露接口函数
import  * as tradeMask from './product/tradeMask'
import  * as sku from './product/sku'
import  * as spu from './product/spu'
import  * as attr from './product/attr'
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'
 export default{
    tradeMask,
    sku,
    spu,
    attr,
    user,
    role,
    permission
 }