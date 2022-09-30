<!--搜索框布局组件-->
<template>
  <div class="search-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SearchItem'
}
</script>
<style lang="scss" scoped>
.search-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  line-height: 32px;
  vertical-align: top;
}
</style>
