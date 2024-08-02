const publicData = {
  state: {
    paramsMapList: null,
    addRouterList: [],
    cacheRouteList: [],
    tabData: []
  },
  mutations: {
    SET_PARAMS_MAP_LIST(state, data) {
      state.paramsMapList = data
    },
    SET_ADD_ROUTERLIST(state, view) {
      if (state.addRouterList.some(v => v.path === view.path)) return false
      state.addRouterList.push(view)
    },
    SET_CACHEROUTERLIST(state, view) {
      if (state.cacheRouteList.includes(view.name)) return false
      if (!view.meta.noCache) {
        state.cacheRouteList.push(view.name)
      }
    },
    DEL_ROUTERLIST(state, view) {
      for (let index = 0; index < state.addRouterList.length; index++) {
        if (
          state.addRouterList[index].path === view.path ||
          state.addRouterList[index].path.indexOf(view.path) !== -1
        ) {
          state.addRouterList.splice(index, 1)
        }
      }
    },
    DEL_CACHEROUTERLIST(state, view) {
      let result = view.path.split('/')
      let index = state.cacheRouteList.indexOf(result[result.length - 1])
      index > -1 && state.cacheRouteList.splice(index, 1)
    },
    SET_TAB_DATA(state, data) {
      state.tabData = data
    }
  }
}
export default publicData
