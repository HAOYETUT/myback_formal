/* 处理路由 */
import { routeTableName } from '@/config/settings'
import { parseHorizontal, camelCase, firstCapitalize } from '@/utils'

/**
 *  获取路由菜单
 */
export function getAccessRoutes() {
  try {
    console.log(JSON.parse(localStorage.getItem(routeTableName)),'JSON.parse(localStorage.getItem(routeTableName))')
    return JSON.parse(localStorage.getItem(routeTableName))
  } catch (e) {
    console.log('getAccessRoutes:' + e) // for debug
    return []
  }
}

/**
 *  保存路由菜单
 */
export function setAccessRoutes(accessRoutes) {
  //执行了保存路由菜单
  return localStorage.setItem(routeTableName, JSON.stringify(accessRoutes))
}

/**
 *  删除路由菜单
 */
export function removeAccessRoutes() {
  return localStorage.removeItem(routeTableName)
}

/**
 * @description  格式化路由列表
 * https://pro.antdv.com/docs/authority-management
 */
export function formatAllRoutes(routerList = []) {
  console.log(routerList,'routerList')
  const formatRoutes = routerList.map((item, index) => {
    let tempJump = parseHorizontal(item.jump)
    console.log(tempJump,'tempJump')
    // let params = '';
    // if(tempJump.indexOf("?")>0){
    //   var temp = tempJump.split("?");
    //   tempJump = temp[0];
    //   params = temp[1];
    // }

    const currentRouter = {
      // 路由地址
      path: !item.jump ? `/menu${index}` : `/${tempJump}`,
      // 路由名称
      name: !item.jump ? `name${index}` : `${firstCapitalize(camelCase(tempJump))}`,
      // 该路由对应页面的 组件
      component: !item.jump
        ? (resolve) => require(['@/layouts'], resolve)
        : (resolve) =>
          require([`@/views/${tempJump}`], resolve),
      // meta
      meta: {
        title: item.title,
        affix: false,
        icon: item?.icon || 'el-icon-document',
        noKeepAlive: false
      }
    }
    // 是否有子菜单,并递归处理
    if (item.list && item.list.length > 0) {
      // debugger
      currentRouter.children = formatAllRoutes(item.list)
    }
    return currentRouter
  })
  return formatRoutes
}

/**
 * @description 判断当前路由是否包含权限
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role))
  } else {
    return true
  }
}

/**
 * @description intelligence模式根据permissions数组拦截路由
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions) {
  const finallyRoutes = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}
