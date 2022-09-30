<template>
  <el-drawer
    :wrapper-closable="false"
    :size="wrapSize"
    :visible.sync="visibleDrawer"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </el-drawer>
</template>

<script>
const SIZES = { samll: '320px', default: '520px', large: '720px' }
export default {
  name: 'BaseDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    /* small large default*/
    size: {
      type: String,
      default: '520px'
    }
  },
  data() {
    return {}
  },
  computed: {
    wrapSize() {
      return SIZES[this.size] || this.size
    },
    visibleDrawer: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>
