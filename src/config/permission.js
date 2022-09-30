/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/pageTitle'
import {
  authentication,
  routesWhiteList,
  progressBar,
  recordRoute
} from './settings'

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
})

router.beforeEach(async(to, from, next) => {
  // debugger
  // console.log(store.getters,'store.getters')
  if (progressBar) VabProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = store.getters['user/accessToken']

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      if (progressBar) VabProgress.done()
    } else {
      const hasRoutes = store.getters['routes/routes'] && store.getters['routes/routes'].length > 0
      if (hasRoutes) {
        next()
      } else {
        await store.dispatch('user/getInfo')
        let accessRoutes = []
        if (authentication === 'intelligence') {
          accessRoutes = await store.dispatch('routes/setRoutes', permissions)
          // 后端加载路由
        } else if (authentication === 'all') {
          console.log(await store.dispatch('routes/setAllRoutes'),"store.dispatch('routes/setAllRoutes')")
          accessRoutes = await store.dispatch('routes/setAllRoutes')
        }
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (recordRoute) {
        next(`/login?redirect=${to.path}`)
      } else {
        next('/login')
      }
      if (progressBar) VabProgress.done()
    }
  }
})
router.afterEach(() => {
  if (progressBar) VabProgress.done()
})
