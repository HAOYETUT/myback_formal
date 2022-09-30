import drag from './drag'

const install = function(Vue) {
  Vue.directive('drawer-move', drag)
}

if (window.Vue) {
  window['drawer-move'] = drag
  Vue.use(install)  // eslint-disable-line
}

drag.install = install
export default drag
