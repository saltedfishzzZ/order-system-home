import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
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
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/info',
    name: '商户信息',
    meta: { title: '商户信息', icon: 'el-icon-menu' },
    children: [
      {
        path: 'info',
        name: '信息展示',
        component: () => import('@/views/merchant/info'),
        meta: { title: '信息展示', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'edit',
        name: '信息编辑',
        component: () => import('@/views/merchant/edit'),
        meta: { title: '信息编辑', icon: 'el-icon-edit' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    children: [{
      path: 'list',
      name: '类别信息',
      component: () => import('@/views/category/list'),
      meta: { title: '类别信息', icon: 'el-icon-collection-tag' }
    }]
  },
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: '商品信息',
    meta: { title: '商品信息', icon: 'el-icon-goods' },
    children: [
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/good/list'),
        meta: { title: '商品列表', icon: 'el-icon-menu' }
      },
      {
        path: 'edit',
        name: '新增商品',
        component: () => import('@/views/good/edit'),
        meta: { title: '编辑商品', icon: 'el-icon-edit' }
      },
      {
        path: 'edit/:id',
        name: '编辑商品',
        hidden: true,
        component: () => import('@/views/good/edit'),
        meta: { title: '编辑商品', icon: 'el-icon-edit' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-menu '},
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'el-icon-menu' }
      }
    ]
  },

  // 404
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
