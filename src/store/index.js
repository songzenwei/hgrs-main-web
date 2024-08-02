import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user' // 导入 user 模块
import getters from './getters'
import publicData from './modules/publicData' // 参数服务数据

Vue.use(Vuex)
// 组装 user 并导出
const store = new Vuex.Store({
  modules: {
    publicData,
    user // 对应上面导入的 user 模块，以逗号分割增加组装
  },
  getters
})
export default store
