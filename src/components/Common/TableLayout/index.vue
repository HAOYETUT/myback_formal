<!--表格布局-->
<template>
  <div class="flex-table">
    <!--表格头部  slot-->
    <slot name="header" />
    <div class="flex-content">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'TableLayout'
}
</script>

<style lang="scss" scoped>
/* table自适应父容器 */
.flex-table {
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

}

.flex-content {
  flex: 1;
  overflow-y: hidden;
}
</style>
