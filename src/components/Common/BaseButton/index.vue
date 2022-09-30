<!--组件按钮:统一表格是选中或不选-->
<template>
  <el-button :loading="loading" :type="(checkedLength === 1 && !isMany) || (checkedLength >= 1 && isMany) ? type : ''" v-bind="$attrs" @click="handleClick">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    // 选中的表格长度
    checkedLength: {
      type: Number,
      default: 0
    },
    // 是否允许多选功能
    isMany: {
      type: Boolean,
      default: false
    },
    // 按钮颜色类型
    type: {
      type: String,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleClick(evt) {
      if (this.checkedLength <= 0) {
        return this.$message.warning('请勾选要操作的数据！')
      }
      if (this.checkedLength > 1 && !this.isMany) {
        return this.$message.warning('请勾选一项数据！')
      }
      this.$emit('click', evt)
    }
  }
}
</script>

