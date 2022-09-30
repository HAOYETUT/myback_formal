import readwrite from './readwrite'

const install = function(Vue) {
  Vue.directive('readwrite', readwrite)
}
if (window.Vue) {
  window['readwrite'] = readwrite
  Vue.use(install)  // eslint-disable-line
}

readwrite.install = install

export default readwrite
