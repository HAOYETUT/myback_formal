<!--顶部栏-->
<template>
  <div class="nav-bar-container">
    <!--面包屑-->
    <el-row :gutter="15">
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            :title="collapse ? '展开' : '收起'"
            class="fold-unfold"
            @click="handleCollapse"
          />
          <breadcrumb class="hidden-xs-only" />
        </div>
      </el-col>
      <!--头像主题配置等-->
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <avatar />
          <!-- <error-log /> -->
          <full-screen-bar class="mr10" />
          <theme-bar />
          <span class="poi" @click="refreshRoute">刷新<i class="el-icon-refresh" /></span>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  Avatar,
  Breadcrumb,
  // ErrorLog,
  FullScreenBar,
  ThemeBar
} from '@/layouts/components'

export default {
  name: 'NavBar',
  components: {
    Avatar,
    Breadcrumb,
    // ErrorLog,
    FullScreenBar,
    ThemeBar
  },
  data() {
    return {
      pulse: false
    }
  },
  computed: {
    ...mapGetters({
      collapse: 'settings/collapse',
      visitedRoutes: 'tagsBar/visitedRoutes',
      device: 'settings/device',
      routes: 'routes/routes'
    })
  },
  methods: {
    handleCollapse() {
      this.$store.dispatch('settings/changeCollapse')
    },
    async refreshRoute() {
      this.$baseEventBus.$emit('reloadRouterView')
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  position: relative;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-bar-height;

    .fold-unfold {
      font-size: 20px;
      color: $base-color-gray;
      cursor: pointer;
    }

    ::v-deep {
      .breadcrumb-container {
        margin-left: 10px;
      }
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;

    ::v-deep {
      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: $base-color-gray;
        cursor: pointer;
        fill: $base-color-gray;
      }

      button {
        svg {
          margin-right: 0;
          color: $base-color-white;
          cursor: pointer;
          fill: $base-color-white;
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
