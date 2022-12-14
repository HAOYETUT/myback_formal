<template>
  <div class="vue-admin-beautiful-wrapper" :class="classObj">
    <div
      v-if="'horizontal' === layout"
      class="layout-container-horizontal"
      :class="{
        fixed: header === 'fixed',
        'no-tags-bar': tagsBar === 'false' || tagsBar === false,
      }"
    >
      <div :class="header === 'fixed' ? 'fixed-header' : ''">
        <top-bar />
        <div
          v-if="tagsBar === 'true' || tagsBar === true"
          :class="{ 'tag-view-show': tagsBar }"
        >
          <div class="vab-main">
            <tags-bar />
          </div>
        </div>
      </div>
      <div class="vab-main main-padding">
        <!-- <ad></ad> -->
        <app-main />
      </div>
    </div>
    <div
      v-else
      class="layout-container-vertical"
      :class="{
        fixed: header === 'fixed',
        'no-tags-bar': tagsBar === 'false' || tagsBar === false,
      }"
    >
      <div
        v-if="device === 'mobile' && collapse === false"
        class="mask"
        @click="handleFoldSideBar"
      />
      <side-bar />
      <div class="vab-main" :class="collapse ? 'is-collapse-main' : ''">
        <div :class="header === 'fixed' ? 'fixed-header' : ''">
          <nav-bar />
          <tags-bar v-if="tagsBar === 'true' || tagsBar === true" />
        </div>
        <!-- <ad></ad> -->
        <app-main />
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script>
import { AppMain, NavBar, SideBar, TagsBar, TopBar } from './components'
import { mapActions, mapGetters } from 'vuex'
import { tokenName } from '@/config/settings'
export default {
  name: 'Layout',
  components: {
    TopBar,
    NavBar,
    SideBar,
    AppMain,
    TagsBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      layout: 'settings/layout',
      tagsBar: 'settings/tagsBar',
      collapse: 'settings/collapse',
      header: 'settings/header',
      device: 'settings/device'
    }),
    classObj() {
      return {
        mobile: this.device === 'mobile'
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    const isMobile = this.handleIsMobile()
    if (isMobile) {
      this.$store.dispatch('settings/toggleDevice', 'mobile')
      setTimeout(() => {
        this.$store.dispatch('settings/foldSideBar')
      }, 2000)
    } else {
      this.$store.dispatch('settings/openSideBar')
    }
    this.$nextTick(() => {
      window.addEventListener(
        'storage',
        (e) => {
          if (e.key === tokenName || e.key === null) window.location.reload()
          if (e.key === tokenName && e.value === null) window.location.reload()
        },
        false
      )
    })
  },
  methods: {
    ...mapActions({
      handleFoldSideBar: 'settings/foldSideBar'
    }),
    handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992
    },
    handleResize() {
      if (!document.hidden) {
        const isMobile = this.handleIsMobile()
        this.$store.dispatch(
          'settings/toggleDevice',
          isMobile ? 'mobile' : 'desktop'
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: $base-z-index - 2;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.vue-admin-beautiful-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-container-horizontal {
    position: relative;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tags-bar-height});
    }

    &.fixed.no-tags-bar {
      padding-top: $base-top-bar-height;
    }

    ::v-deep {
      .vab-main {
        width: 88%;
        margin: auto;
      }

      .fixed-header {
        @include fix-header;
      }

      .tag-view-show {
        background: $base-color-white;
        box-shadow: $base-box-shadow;
      }

      .nav-bar-container {
        .fold-unfold {
          display: none;
        }
      }
    }
  }

  .layout-container-vertical {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tags-bar-height});
    }

    &.fixed.no-tags-bar {
      padding-top: $base-nav-bar-height;
    }

    .vab-main {
      position: relative;
      min-height: 100%;
      margin-left: $base-left-menu-width;
      transition: $base-transition;

      ::v-deep {
        .fixed-header {
          @include fix-header;

          left: $base-left-menu-width;
          width: $base-right-content-width;
          box-shadow: $base-box-shadow;
          transition: $base-transition;
        }

        .nav-bar-container {
          position: relative;
          box-sizing: border-box;
        }

        .tags-bar-container {
          box-sizing: border-box;
        }

        .app-main-container {
          // width: calc(100% - #{$base-padding} - #{$base-padding});
          // width: 100%;
          // background: $base-color-white;
          // border-radius: $base-border-radius;
        }
      }

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        ::v-deep {
          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - 65px);
          }
        }
      }
    }
  }

  /* ??????????????? */
  &.mobile {
    ::v-deep {
      .el-pager,
      .el-pagination__jump {
        display: none;
      }

      .layout-container-vertical {
        .el-scrollbar.side-bar-container.is-collapse {
          width: 0;
        }

        .vab-main {
          width: 100%;
          margin-left: 0;
        }
      }

      .vab-main {
        .fixed-header {
          left: 0 !important;
          width: 100% !important;
        }
      }
    }
  }

  /* ??????????????? */
}
</style>
