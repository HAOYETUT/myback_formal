<template>
  <div class="top-bar-container">
    <div class="vab-main">
      <el-row>
        <el-col :xl="2" :lg="2" :md="2" :sm="4" :xs="0">
          <logo />
        </el-col>
        <el-col :xl="20" :lg="18" :md="18" :sm="15" :xs="15">
          <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
            <el-menu
              :background-color="variables['menu-background']"
              :text-color="variables['menu-color']"
              :active-text-color="variables['menu-color-active']"
              :default-active="activeMenu"
              mode="horizontal"
              menu-trigger="hover"
            >
              <template v-for="route in routes">
                <side-bar-item
                  v-if="!route.hidden"
                  :key="route.path"
                  :base-path="route.path"
                  :item="route"
                />
              </template>
            </el-menu>
          </el-scrollbar>

        </el-col>
        <el-col :xl="2" :lg="4" :md="4" :sm="5" :xs="9">
          <div class="right-panel">
            <!-- <error-log class="hidden-md-and-down" /> -->
            <avatar />
            <full-screen-bar />
            <theme-bar />
            <!-- <vab-icon
              class="hidden-md-and-down"
              title="重载路由"
              :pulse="pulse"
              :icon="['fas', 'redo']"
              @click="refreshRoute"
            /> -->

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SideBarItem from '../SideBar/components/SideBarItem'
import variables from '@/styles/variables.scss'
import { mapGetters } from 'vuex'
import {
  Avatar,
  // ErrorLog,
  FullScreenBar,
  Logo,
  ThemeBar
} from '@/layouts/components'

export default {
  components: {
    Avatar,
    // ErrorLog,
    FullScreenBar,
    ThemeBar,
    SideBarItem,
    Logo
  },
  data() {
    return {
      pulse: false,
      menuTrigger: 'hover'
    }
  },
  computed: {
    ...mapGetters({
      routes: 'routes/routes',
      visitedRoutes: 'tagsBar/visitedRoutes'
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap
    }

  },
  methods: {
    async refreshRoute() {
      this.$baseEventBus.$emit('reloadRouterView')
      this.pulse = true
      setTimeout(() => {
        this.pulse = false
      }, 1000)
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }
  }
}
</script>
<style lang="scss" scoped>
.top-bar-container {
  display: flex;
  align-items: center;
  // justify-items: flex-end;
  height: $base-top-bar-height;
  background: $base-menu-background;

  .vab-main {
    .scroll-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }

    background: $base-menu-background;

    ::v-deep {
      .el-menu {
        &.el-menu--horizontal {
          display: flex;
          align-items: center;
          height: $base-top-bar-height;
          border-bottom: 0 solid transparent !important;

          .el-menu-item,
          .el-submenu__title {
            height: $base-menu-item-height;
            padding: 0 15px;
            line-height: $base-menu-item-height;
          }
        }

        &--horizontal {
          .el-menu {
            .el-menu-item,
            .el-submenu__title {
              height: $base-menu-item-height;
              line-height: $base-menu-item-height;
            }
          }

          .el-submenu,
          .el-menu-item {
            &.is-active {
              background-color: $base-color-blue !important;
              border-bottom: 0 solid transparent !important;

              .el-submenu__title {
                border-bottom: 0 solid transparent !important;
              }
            }
          }

          > .el-menu-item {
            .el-tag {
              margin-top: calc(#{$base-top-bar-height} / 2 - 7.5px);
              margin-left: 5px;
            }

            @media only screen and (max-width: 1199px) {
              .el-tag {
                display: none;
              }
            }

            &.is-active {
              background-color: transparent !important;
              border-bottom: 3px solid $base-color-blue !important;
            }
          }
        }
      }
    }
  }

  .right-panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: $base-top-bar-height;
    color: #fff;

    ::v-deep {
      .user-name {
        color: rgba($base-color-white, 0.9);
      }

      .user-name + i {
        color: rgba($base-color-white, 0.9);
      }

      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-big;
        color: rgba($base-color-white, 0.9);
        cursor: pointer;
        fill: rgba($base-color-white, 0.9);
      }

      button {
        svg {
          margin-right: 0;
          color: rgba($base-color-white, 0.9);
          cursor: pointer;
          fill: rgba($base-color-white, 0.9);
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
}
</style>
