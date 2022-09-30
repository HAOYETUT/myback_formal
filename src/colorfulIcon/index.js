import Vue from 'vue'
import ColorfullIcon from '@/components/ColorfullIcon'

Vue.component('vab-colorful-icon', ColorfullIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
