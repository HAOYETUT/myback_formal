import Vue from 'vue'
import RemixIcon from '@/components/RemixIcon'

Vue.component('vab-remix-icon', RemixIcon)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
