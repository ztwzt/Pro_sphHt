import mockRequest from "@/utils/mock"
const state={
    list:{}
}
const mutations={
    getData(state,list){
        state.list=list
    }
}
const actions={
    async getData({commit}){
       let result=await mockRequest.get('/home/list')
        if(result.code=20000){
            commit('getData',result.data)
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}