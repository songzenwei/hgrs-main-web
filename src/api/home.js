/*
 * @Author:
 * @Date: 2022-03-07 16:35:52
 * @LastEditTime: 2022-03-07 16:45:46
 * @FilePath: \cacp-docsc:\Users\lvhongyan\AppData\template\src\api\home.js
 * @Description: TODO 关于本文件的一些描述
 */
import request from '@/utils/request'
import { microService1 } from '@/utils/index'
// 根据业务模块命名，和 /views/* 一一对应

export function fakeUser (params) {
  // 创建用户
  return request({
    url: `${microService1}/api/user?${params}`, // 通过 /config/index.js 中 proxyTable 代理转发请求
    method: 'POST',
    data: params
  })
}
export function queryUser (params) {
  // 查询用户
  return request({
    url: `/api/user?${params}`,
    method: 'get'
  })
}
export function modifyUser (params) {
  // 修改用户
  return request({
    url: `/api/user?${params}`,
    method: 'patch'
  })
}
export function removeUser (params) {
  // 删除用户
  return request({
    url: `/api/user?${params}`,
    method: 'delete'
  })
}

export function getRole (params) {
  // 获取角色
  return request({
    url: `/apk/pmd?${params}`,
    method: 'get'
  })
}

export function switchedRoles (params) {
  // 查询用户
  return request({
    url: `/apk/pmdone?${params}`,
    method: 'get'
  })
}

// 获取菜单menu
export function getMenuList (params) {
  // 创建用户
  return request({
    url: `${microService1}/api/user?${params}`,
    method: 'POST',
    data: params
  })
}

// 按钮权限
export function getAvailButtons (params) {
  return request({
    url: `${microService1}/api/user?${params}`,
    data: params,
    method: 'POST'
  })
}
