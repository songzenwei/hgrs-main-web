/*
 * @Author: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @Date: 2024-07-25 11:31:14
 * @LastEditors: 'rssongxinwei' 'wb_yy_songxinwei@rd.domain.com'
 * @LastEditTime: 2024-07-29 09:36:07
 * @FilePath: \hgrs-main-web\src\router\components.js
 * @Description: 路由组件
 */
// 设置会被编译到本app.js中的组件
const components = {
  '/home/index': require('@/views/home/index.vue'),
  '/home/element/message': require('@/views/home/element/message.vue'),
  '/home/element/notice': require('@/views/home/element/notice.vue'),
  '/home/element/form': require('@/views/home/element/form.vue'),
  '/home/element/treeListTable': require('@/views/home/element/treeListTable.vue'),
  '/login/index': require('@/views/login/index'),
  '/home-custom/index': require('@/views/homeCustom/index'),

  '/personal-workench/index': require('@/views/personalWorkench/index'),
  '/data-platorm/index': require('@/views/dataPlatorm/index'),
  '/intelligence-app/index': require('@/views/intelligenceApp/index'),
  '/integration-management/index': require('@/views/integrationManagement/index'),
  '/system-management/index': require('@/views/systemManagement/index')
}
export default components
