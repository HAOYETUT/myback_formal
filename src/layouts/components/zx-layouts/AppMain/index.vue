<template>
  <section class="app-main-container">
    <transition mode="out-in" name="fade-transform">
      <keep-alive
        v-if="routerView"
        :include="cachedRoutes"
        :max="keepAliveMaxNum"
      >
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  keepAliveMaxNum,
  title
} from '@/config/settings'

export default {
  name: 'AppMain',
  data() {
    return {
      show: true,
      title,
      keepAliveMaxNum,
      routerView: true
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'tagsBar/visitedRoutes',
      device: 'settings/device',
      skeleton: 'settings/skeleton'
    }),
    cachedRoutes() {
      const cachedRoutesArr = []
      this.visitedRoutes.forEach((item) => {
        if (!item.meta.noKeepAlive) {
          cachedRoutesArr.push(item.name)
          this.handleSkeleton()
        }
      })
      return cachedRoutesArr
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (this.device === 'mobile') {
          this.$store.dispatch('settings/foldSideBar')
        }
      },
      immediate: true
    }
  },
  created() {
    // 重载所有路由
    this.$baseEventBus.$on('reloadRouterView', () => {
      this.routerView = false
      this.$nextTick(() => {
        this.routerView = true
        // this.handleSkeleton();
      })
    })
  },
  mounted() {
    // this.handleSkeleton()
  },
  methods: {
    handleSkeleton() {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main-container {
  position: relative;
  width: 100%;
  min-height: calc(100vh - #{$base-nav-bar-height} - #{$base-tags-bar-height});
  overflow: hidden;
}

.no-tags-bar {
  .app-main-container {
    min-height: calc(100vh - #{$base-nav-bar-height});
  }
}
</style>
