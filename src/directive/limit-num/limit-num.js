/* 输入时只能输入数字 */
export default {
  inserted(el, binding, vnode) {
    // el-input 是 element-ui 自定义组件,绑定上的不是input标签
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      el = el.getElementsByTagName('input')[0]
    }
    function inputHandler(e) {
      e.target.value = `${e.target.value}`.replace(/[^0-9]/g, '')
    }
    el.__vueLimitNum__ = inputHandler
    el.addEventListener('input', inputHandler)
  },
  unbind(el) {
    el.removeEventListener('input', el.__vueLimitNum__)
    delete el.__vueLimitNum__
  }
}
