import Vue from 'vue'
import './element'
import './support'
import '@/styles/vab.scss'
import vab from '@/utils/vab'
import '@/remixIcon'
import '@/colorfulIcon'
import '@/config/permission'
import '@/utils/errorLog'
import permission from '@/directive/permission'
import drawermove from '@/directive/drawer-move'
import drag from '@/directive/drag'
import readwrite from '@/directive/read-write'
import elemdrag from '@/directive/elem-drag'
import limitnum from '@/directive/limit-num'
import 'lib-flexible/flexible.js'
import * as echarts from "echarts"; // 引入echarts
Vue.prototype.$echarts = echarts // 挂载到vue实例，方便全局使用

require('echarts/theme/macarons') // echarts theme
import 'echarts/map/js/china.js'


Vue.use(vab)
Vue.use(permission)
Vue.use(drag)
Vue.use(drawermove)
Vue.use(readwrite)
Vue.use(elemdrag)
Vue.use(limitnum)
