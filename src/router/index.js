import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '../views/layout/index'

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: _import('404'),
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
      component: () => import('@/views/desktop')
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
