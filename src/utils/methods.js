/*
 * @Author: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @Date: 2024-07-29 10:04:35
 * @LastEditors: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @LastEditTime: 2024-07-29 10:15:16
 * @FilePath: \hgrs-main-web\src\utils\methods.js
 * @Description: 通用功能
 */
export function isExistence (target, list) {
  if (target === '/') return false
  const str = JSON.stringify(list)
  return str.indexOf(target) !== -1
}
