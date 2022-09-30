/**
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑
 */
import Vue from 'vue'
// import { login } from '@/api/user'
import { getAccessToken, removeAccessToken, setAccessToken, setUserInfo, getUserInfo, removeUserInfo, setReadWrite, removeReadWrite } from '@/utils/accessToken'
import { setAccessRoutes, removeAccessRoutes } from '@/utils/handleRoutes'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config/settings'
import { routerList } from '@/mock/router'
const state = {
  accessToken: getAccessToken(),
  userName: '',
  admin_id: '',
  avatar: '',
  nav_group_id: '',
  group_name: '',
  my_push_admin: '',
  region: [],
  forwarder_region:[],
  permissions: []
}
const getters = {
  accessToken: (state) => state.accessToken,
  userName: (state) => state.userName,
  admin_id: (state) => state.admin_id,
  avatar: (state) => state.avatar,
  nav_group_id: (state) => state.nav_group_id,
  group_name: (state) => state.group_name,
  permissions: (state) => state.permissions,
  my_push_admin: (state) => state.my_push_admin,
  region: (state) => state.region,
  forwarder_region: (state) => state.forwarder_region
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setAdminId(state, admin_id) {
    state.admin_id = admin_id
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setNavGroupId(state, nav_group_id) {
    state.nav_group_id = nav_group_id
  },
  setGroupName(state, group_name) {
    state.group_name = group_name
  },
  setMy_push_admin(state, my_push_admin) {
    state.my_push_admin = my_push_admin
  },
  setRegion(state, region) {
    state.region = region
  },
  setForwarderRegion(state, forwarder_region) {
    state.forwarder_region = forwarder_region
  }
}
const actions = {
  // user login
  async login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // login(userInfo).then((res) => {
        // console.log(res,'wwwwwwwwwwwwwwwwwwww')
        const data = {
          tokenName: 'token',
          left_nav: routerList,
          name: '许亚兵',
          readwrite: [],
          token: 'dhuacasdiuq-desa',
          group_name: '管理员'
        }
        console.log(data)
        const accessToken = data[tokenName] || ''
        commit('setAccessToken', accessToken)
        // 保存返回的路由信息
        setAccessRoutes(data.left_nav || [])
        // 保存用户信息
        setUserInfo({ userName: data.name || '', admin_id: data.admin_id, nav_group_id: data.nav_group_id, group_name: data.group_name, my_push_admin: data.my_push_admin, region: data.region, forwarder_region: data.forwarder_region })

        // 保存用户读写权限
        setReadWrite(data.readwrite || {})
        Vue.prototype.$baseNotify(`欢迎登录${title}!`)
        resolve()
      // }).catch((error) => {
      //   reject(error)
      // })
    })
  },
  // 修改用户名
  setInfo({ commit }, userName) {
    setUserInfo({ userName: userName })
    commit('setUserName', userName)
  },
  async getInfo({ commit }) {
    const userInfo = getUserInfo()
    commit('setUserName', userInfo.userName)
    commit('setAdminId', userInfo.admin_id)
    return userInfo
  },
  // 退出登录
  async logout({ dispatch }) {
    await dispatch('tagsBar/delAllRoutes', null, { root: true })
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  // 清除状态和localstorage
  async resetAccessToken({ commit, dispatch }) {
    commit('setUserName', '')
    commit('setAccessToken', '')
    await dispatch('routes/removeAllRoutes', null, { root: true })
    removeAccessToken()
    removeAccessRoutes()
    removeUserInfo()
    removeReadWrite()
  }
}
export default { state, getters, mutations, actions }
