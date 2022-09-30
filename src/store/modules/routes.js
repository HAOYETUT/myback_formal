/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { filterAsyncRoutes, formatAllRoutes, getAccessRoutes } from '@/utils/handleRoutes'
import { routeTableName } from '@/config/settings'

const state = { routes: [], partialRoutes: [] }
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  },
  setAllRoutesEmpty(state, routes = []) {
    state.routes = routes
  }
}
const actions = {
  async setRoutes({ commit }, permissions) {
    let accessedRoutes = []
    if (permissions.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = await filterAsyncRoutes(asyncRoutes, permissions)
    }
    commit('setRoutes', accessedRoutes)
    return accessedRoutes
  },
  // 获取路由信息
  async setAllRoutes({ commit }) {
    // debugger
    const routesList = getAccessRoutes(routeTableName)
    const accessRoutes = formatAllRoutes(routesList)
    console.log(accessRoutes)
    accessRoutes.push({ path: '*', redirect: '/404', hidden: true })
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },

  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
  removeAllRoutes({ commit }) {
    commit('setAllRoutesEmpty', [])
  }
}
export default { state, getters, mutations, actions }
