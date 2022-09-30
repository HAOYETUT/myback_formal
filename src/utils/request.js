import axios from 'axios'
import { BASE_API } from '@/config'
import '@/config'

import { contentType, messageDuration, requestTimeout, successCode } from '@/config/settings'
import { Message, Notification } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: BASE_API,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})
service.interceptors.request.use(
  config => {
    if (store.getters['user/accessToken']) {
      config.headers['sk'] = store.getters['user/accessToken']
    }
    // if (config.url && process.env.NODE_ENV !== 'production') {
    //   const prefix = config.url.indexOf('?') === -1 ? '?' : '&'
    //   config.url += `${prefix}debug=y`
    // }

    // console.log(config)
    return config
  },
  error => {
    console.log(error, '$$$$') // for debug
    return Promise.reject(error)
  }
)

const errorMsg = (message) => {
  return Message({
    message: message,
    type: 'error',
    duration: messageDuration
  })
}
/**
 *  203 token失效
 *  204 操作失败
 */
service.interceptors.response.use(
  response => {
    if (Object.prototype.toString.call(response.data) === '[object Blob]') {
      return response.data
    }
    const res = response.data
    const { code, msg } = res || {}
    if (code !== successCode) {
      // 其他客户端已经登录,退出登录
      if (code === 203) {
        Notification.error({ title: '提示', message: msg || '您的账号在其它地方登录！', duration: 3000 })
        setTimeout(() => {
          store.dispatch('user/resetAccessToken').then(() => {
            location.reload()
          })
        }, 3000)
      } else {
        errorMsg(msg || `接口${code || ''}异常`)
      }
      return Promise.reject(new Error(msg || 'Error'))
    } else {
      return res
    }
  }, error => {
    if (error.config.errorFun) {
      error.config.errorFun(error)
      return false
    }
    // 网络连接过程异常处理
    let { message } = error
    if (message === 'Network Error') {
      message = '网络连接异常'
    }
    if (message.includes('timeout')) {
      message = '网络请求超时'
    }
    // Server Error
    if (message.includes('500')) {
      message = '服务器异常'
    }
    errorMsg(message || '未知异常')
    return Promise.reject(error)
  }
)
export default service
