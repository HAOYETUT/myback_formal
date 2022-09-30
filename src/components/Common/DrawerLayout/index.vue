<!--抽屉中间内容布局-->
<template>
  <div class="flex-drawer">
    <slot name="header" />
    <div class="flex-drawer-content">
      <div class="pd">
        <slot />
      </div>

    </div>
    <div class="footer-wrapper">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'DrawerLayout'
}
</script>

<style lang="scss" scoped>
.flex-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pd {
  padding: 10px 20px 0;
}

.flex-drawer-content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.footer-wrapper {
  padding: 10px;
  text-align: right;
  border-top: 1px solid #dcdfe6;
}
</style>
