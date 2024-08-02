/*
 * @Author: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @Date: 2024-07-25 11:31:14
 * @LastEditors: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @LastEditTime: 2024-07-29 09:28:38
 * @FilePath: \hgrs-main-web\src\router\routes.js
 * @Description: 路由配置
 */
const { SERVICEID } = require('@/config.js')

// 设置路由
const routes = [
  {
    path: `/${SERVICEID}/home/index`,
    component: '/home/index',
    meta: { title: '我的工作台', icon: 'fa fa-home' }
  },
  {
    path: `/${SERVICEID}/home/element/message`,
    component: '/home/element/message',
    meta: { title: '消息', icon: 'fa fa-home' }
  },
  {
    path: `/${SERVICEID}/home/element/notice`,
    component: '/home/element/notice',
    meta: { title: '通知', icon: 'fa fa-home' }
  },
  {
    path: `/${SERVICEID}/home/element/form`,
    component: '/home/element/form',
    meta: { title: '表单', icon: 'fa fa-home' }
  },
  {
    path: `/${SERVICEID}/home/element/treeListTable`,
    component: '/home/element/treeListTable',
    meta: { title: '带机构树列表', icon: 'fa fa-home' }
  },

  // 登录
  {
    path: `/${SERVICEID}/login/index`,
    component: '/login/index'
  },
  // 首页
  {
    path: `/${SERVICEID}/home-custom/index`,
    component: '/home-custom/index'
  },
  // 我的工作台
  {
    path: `/${SERVICEID}/personal-workench/index`,
    component: '/personal-workench/index'
  },
  // 数据中台
  {
    path: `/${SERVICEID}/data-platorm/index`,
    component: '/data-platorm/index'
  },
  // 智能应用
  {
    path: `/${SERVICEID}/intelligence-app/index`,
    component: '/intelligence-app/index'
  },
  // 一站式集成管理
  {
    path: `/${SERVICEID}/integration-management/index`,
    component: '/integration-management/index'
  },
  // 系统管理
  {
    path: `/${SERVICEID}/system-management/index`,
    component: '/system-management/index'
  }
]

module.exports = routes
