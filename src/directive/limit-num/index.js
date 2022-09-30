import limitNum from './limit-num'

const install = function(Vue) {
  Vue.directive('limit-num', limitNum)
}

if (window.Vue) {
  window['limit-num'] = limitNum
  Vue.use(install)  // eslint-disable-line
}

limitNum.install = install
export default limitNum
