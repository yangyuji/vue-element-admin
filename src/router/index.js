import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '@/views/layout/index.vue'

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: import('@/views/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/desktop',
    name: 'desktop',
    hidden: true,
    children: [{
      path: 'desktop',
      component: () => import('@/views/desktop/index.vue')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态加载菜单
export const asyncRouterMap = [
  {
    name: '使用实例',
    path: '/examples',
    component: Layout,
    redirect: '/examples/table/list',
    meta: {
      title: '使用实例',
      icon: 'el-icon-tickets',
      roles: ['admin']
    },
    children: [
      {
        name: '数据列表',
        path: 'table/list',
        component: () => import('@/views/examples/table/list'),
        meta: {
          title: '数据列表',
          roles: ['admin']
        }
      },
      {
        name: '新增表单',
        meta: { title: '新增表单' },
        path: 'table/add',
        hidden: true,
        props: true,
        component: () => import('@/views/examples/form/edit')
      },
      {
        name: '编辑表单',
        meta: { title: '编辑表单' },
        path: 'table/edit/:id',
        hidden: true,
        props: true,
        component: () => import('@/views/examples/form/edit')
      }
    ]
  },
  {
    path: '/debug',
    component: Layout,
    redirect: '/debug/index',
    name: '系统日志',
    meta: {
      title: '系统日志',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    children: [
      {
        name: '错误日志',
        meta: { title: '错误日志' },
        path: 'index',
        props: true,
        component: () => import('@/views/debug/index')
      }
    ]
  }
]
