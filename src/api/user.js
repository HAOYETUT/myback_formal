import request from '@/utils/request'

// 登录
export async function login(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// 获取验证码
export function getVerify() {
  return request({
    url: '/Api/verify',
    method: 'get'
  })
}

// 退出
export function logout(data) {
  return request({
    url: '/Api/SysLogin/loginOut',
    method: 'post',
    data
  })
}

// 修改用户名
export function editorSystemAdminInfo(data) {
  return request({
    url: '/Ht/SystemAdmin/EditorSystemAdminInfo',
    method: 'post',
    data
  })
}
// 修改密码
export function ChangePassword(data) {
  return request({
    url: '/Ht/SystemAdmin/ChangePassword',
    method: 'post',
    data
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post'
  })
}
