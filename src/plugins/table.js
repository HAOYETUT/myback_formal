import Vue from 'vue'
import XEUtils from 'xe-utils'
import {
  VXETable,
  Table,
  Column,
  Header,
  Footer,
  Tooltip,
  Toolbar,
  Button,
  Edit,
  Input,
  Validator,
  Grid
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.setup({
  i18n: key => XEUtils.get(zhCNLocat, key),
  table: {
    resizable: true,
    autoResize: true,
    stripe: true,
    checkboxConfig: {
      trigger: 'row',
      highlight: true
    },
    size: 'small',
    border: true,
    showOverflow: true,
    sortConfig: { trigger: 'cell',
      iconAsc: 'el-icon-caret-top',
      iconDesc: 'el-icon-caret-bottom',
      orders: ['desc', 'asc', null]
    }
  }
})
Vue.use(Tooltip)
Vue.use(Column)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Toolbar)
Vue.use(Button)
Vue.use(Edit)
Vue.use(Input)
Vue.use(Validator)
Vue.use(Grid)
// 再安装核心库
Vue.use(Table)

// 给 vue 实例挂载全局窗口对象，属性名称随意定义，例如：$XModal
Vue.prototype.$modal = VXETable.modal
