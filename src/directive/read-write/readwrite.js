import { getReadWrite } from '@/utils/accessToken'

export default {
  inserted(el, binding) {
    const readWrite = getReadWrite()
    // 不可写,去除页面操作按钮
    if (!readWrite.write) {
      el.parentNode ? el.parentNode.removeChild(el) : el.style.display = 'none'
    }
  }
}

