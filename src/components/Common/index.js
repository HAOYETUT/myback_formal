import BaseTable from './BaseTable'
import SimpleSearch from './SimpleSearch'
import BaseButton from './BaseButton'
import TableLayout from './TableLayout'
import DrawerLayout from './DrawerLayout'
import SearchItem from './SearchItem'
// import TableColTool from './TableColTool'
const components = [
  BaseTable,
  SimpleSearch,
  BaseButton,
  TableLayout,
  DrawerLayout,
  SearchItem,
  // TableColTool
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
