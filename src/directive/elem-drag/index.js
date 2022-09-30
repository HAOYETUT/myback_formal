/* 指定的元素拖动指令 */
import drag from './drag'

const install = function(Vue) {
  Vue.directive('elem-drag', drag)
}

if (window.Vue) {
  window['elem-drag'] = drag
  Vue.use(install)  // eslint-disable-line
}
drag.install = install
export default drag
