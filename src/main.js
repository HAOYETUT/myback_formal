import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins'
import './plugins/table'
import './plugins/utils'
import 'element-ui/lib/theme-chalk/display.css'
import * as filters from '@/filters'
// import "@/mock/mock.js";
Vue.config.productionTip = false;

// 公共组件
import baseComponents from '@/components/Common'
Vue.use(baseComponents)

// 全局 filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
