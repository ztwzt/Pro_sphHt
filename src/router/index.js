import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//死的路由无法进行权限判定
//需要获取数据进行路由调整
//进行路由拆分

//常量路由：不管什么角色都可以看见
export const constantRoutes = 
[
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
 {
    path:'/product',
    component:Layout,
    name:'product',
    meta:{title:'商品管理',icon:'el-icon-goods'},
    children:[
      {
         path:'tradeMask',
         name:'tradeMask',
         component:()=>import('@/views/product/tradeMask'),
         meta:{title:'品牌管理'}
      },
      {
        path:'attr',
        name:'attr',
        component:()=>import('@/views/product/attr'),
        meta:{title:'平台属性管理'}
      }
      ,
      {
        path:'spu',
        name:'spu',
        component:()=>import('@/views/product/spu'),
        meta:{title:'Spu管理'}
      },
      {
        path:'sku',
        name:'sku',
        component:()=>import('@/views/product/sku'),
        meta:{title:'Sku管理'}
      }
    ]
  },
]
//异步路由：通过过滤筛选的路由
export const asyncRoutes=[
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },
  // {
  //   path:'/product',
  //   component:Layout,
  //   name:'product',
  //   meta:{title:'商品管理',icon:'el-icon-goods'},
  //   children:[
  //     {
  //        path:'tradeMask',
  //        name:'tradeMask',
  //        component:()=>import('@/views/product/tradeMask'),
  //        meta:{title:'品牌管理'}
  //     },
  //     {
  //       path:'attr',
  //       name:'attr',
  //       component:()=>import('@/views/product/attr'),
  //       meta:{title:'平台属性管理'}
  //     }
  //     ,
  //     {
  //       path:'spu',
  //       name:'spu',
  //       component:()=>import('@/views/product/spu'),
  //       meta:{title:'Spu管理'}
  //     },
  //     {
  //       path:'sku',
  //       name:'sku',
  //       component:()=>import('@/views/product/sku'),
  //       meta:{title:'Sku管理'}
  //     }
  //   ]
  // },
  {
    path:'/test',
    component:Layout,
    name:'test',
    meta:{title:'测试管理',icon:'el-icon-goods'},
    children:[
      {
         path:'test1',
         name:'test1',
         component:()=>import('@/views/test/test1'),
         meta:{title:'测试管理1'}
      },
      {
        path:'test2',
        name:'test2',
        component:()=>import('@/views/test/test2'),
        meta:{title:'测试管理2'}
      }
    ]
  },
]
//任意路由:当你路径出现错误的时候，重定向到404
export const anyRoutes=[
    // 404 page must be placed at the end !!!
    { 
      path: '*', redirect: '/404', hidden: true 
    }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  //注册路由
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
