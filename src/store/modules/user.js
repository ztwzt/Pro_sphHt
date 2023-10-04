import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
//路由模块当中重置路由的方法
import { resetRouter,anyRoutes,asyncRoutes,constantRoutes,} from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar:'',
    routes:[],
    roles:[],
    buttons:[],
    //对比项目路由和服务器数据 决定是否需要展示
    resultAsyncRoutes:[],
    //最终路由
    resultAllRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  //存储用户信息
  SET_USERINFO:(state,userInfo)=>{
    state.name=userInfo.name
    state.avatar=userInfo.avatar
    state.routes=userInfo.routes
    state.buttons=userInfo.buttons
    state.roles=userInfo.roles
  },
  //最终计算出来的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    state.resultAsyncRoutes=asyncRoutes
    //合并路由
    state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    //给路由添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }

}

const actions = {
  // user login
  async login({ commit }, userInfo) {
   //解构数据 
    const { username, password } = userInfo
    let result=await login({ username: username.trim(), password: password })
    if(result.code==20000){
      commit('SET_TOKEN',result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        //vuex存储用户全部信息
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
  //路由对比
  const computedAsyncRoutes=(asyncRoutes,routes)=>{
    //过滤出需要展示的数据
   return asyncRoutes.filter(item=>{
      if(routes.indexOf(item.name)!=-1){
        if(item.children&&item.children.length){
            item.children=computedAsyncRoutes(item.children,routes)
        }
        return true 
      }
    })
  }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

