/**
 * @description router全局配置,可分文件抽离
 */

 import Vue from 'vue'
 import VueRouter from 'vue-router'
 import Layout from '@/layouts'
 import { routerMode } from '@/config/settings'
 Vue.use(VueRouter)
 export const constantRoutes = [
   {
     path: '/login',
     component: () => import('@/views/login/index'),
     hidden: true
   },
   {
     path: '/401',
     name: '401',
     component: () => import('@/views/401'),
     hidden: true
   },
   {
     path: '/404',
     name: '404',
     component: () => import('@/views/404'),
     hidden: true
   },
 
   // TODO
   {
     path: '/',
     component: Layout,
     redirect: '/index',
     children: [
       {
         path: '/index',
         name: 'Index',
         component: () => import('@/views/index/index'),
         meta: {
           title: '首页',
           icon: 'el-icon-s-home',
           affix: true,
           noKeepAlive: true
         }
       },
      
     ]
   },
  //  {
  //   path: '/mpney',
  //   name: 'MoneyList',
  //   meta: {
  //     title: '会员',
  //     icon: 'el-icon-document',
  //     affix: true,
  //     noKeepAlive: true
  //   }
  // },
  {
    path: '/personal-center',
    component: Layout,
    hidden: true,
    redirect: '/personal-center/index',
    meta: {
      title: '管理员',
      icon: 'el-icon-document'
    },
    
    children: [
      {
        path: 'index',
        name: 'PersonalCenter',
        component: () => import('@/views/personalCenter/index'),
        meta: {
          title: '个人中心'
        }
      },
      // {
      //   path: '/money-list',
      //   name: 'MoneyList',
      //   component: () => import('@/views/money/money-list/index'),
      //   meta: {
      //     title: '会员',
      //     affix: false,
      //     noKeepAlive: true
      //   }
      // }
    ]
  },{
    path: '/money',
    component: Layout,
    hidden: false,
    redirect: '/money/money-list',
    meta: {
      title: '11111111111',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/money-list',
        // name: 'MoneyList',
        component: () => import('@/views/money/money-list/index'),
        meta: {
          title: '会员',
          affix: false,
          noKeepAlive: true
        }
      }, {
        path: '/unmoney-list',
        // name: 'UnmoneyList',
        component: () => import('@/views/money/unmoney-list/index'),
        meta: {
          title: '普通用户',
          affix: false,
          noKeepAlive: true
        }
      }
    ]
  }
   
 ]
 
 /* 当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
 export const asyncRoutes = [
  //  {
  //    path: '/',
  //    component: Layout,
  //    redirect: '/index',
  //    children: [
  //      {
  //        path: '/index',
  //        name: 'Index',
  //        component: () => import('@/views/index/index'),
  //        meta: {
  //          title: '首页',
  //          icon: 'home',
  //          affix: true,
  //          noKeepAlive: true
  //        }
  //      }
  //    ]
  //  },
 
  //  {
  //    path: '/personalCenter',
  //    component: Layout,
  //    hidden: true,
  //    redirect: 'personalCenter',
  //    children: [
  //      {
  //        path: 'personalCenter',
  //        name: 'PersonalCenter',
  //        component: () => import('@/views/personalCenter/index'),
  //        meta: {
  //          title: '个人中心'
  //        }
  //      }
  //    ]
  //  },
  //  {
  //    path: '*',
  //    redirect: '/404',
  //    hidden: true
  //  }
 ]
 
 const router = new VueRouter({
   mode: routerMode,
   scrollBehavior: () => ({
     y: 0
   }),
   routes: constantRoutes
 })
 /* const originalPush = VueRouter.prototype.push;
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
  }; */
 
 export function resetRouter() {
   router.matcher = new VueRouter({
     mode: routerMode,
     scrollBehavior: () => ({
       y: 0
     }),
     routes: constantRoutes
   }).matcher
 }
 
 /* 重复点击菜单阻止报错
   */
 const originalPush = VueRouter.prototype.push
 VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
 }
 
 export default router
 