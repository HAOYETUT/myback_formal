import { storage, tokenTableName, userInfoTableName, readwriteName } from '@/config/settings'

/**
 * @description 获取accessToken
 */
export function getAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenTableName, accessToken)
    } else {
      return localStorage.setItem(tokenTableName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken)
  }
}

/**
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}
/**
 * 保存用户信息
 */
export function setUserInfo(userInfo) {
  return localStorage.setItem(userInfoTableName, JSON.stringify(userInfo))
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  try {
    return JSON.parse(localStorage.getItem(userInfoTableName))
  } catch (error) {
    // for debug
    console.log('getUserInfo:' + error)
    return {}
  }
}

/**
 * 删除用户信息
 */
export function removeUserInfo() {
  return localStorage.removeItem(userInfoTableName)
}

// 设置角色读写权限
export function setReadWrite(readwrite) {
  return localStorage.setItem(readwriteName, JSON.stringify(readwrite))
}

// 获取角色读写权限
export function getReadWrite() {
  try {
    return JSON.parse(localStorage.getItem(readwriteName))
  } catch (error) {
    console.log('getReadWrite:' + error) // for debug
    return {}
  }
}
// 删除角色读写权限
export function removeReadWrite() {
  return localStorage.removeItem(readwriteName)
}
