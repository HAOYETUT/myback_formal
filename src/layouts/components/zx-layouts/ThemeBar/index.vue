<template>
  <span v-show="themeBar" class="poi" @click="handleChangeTheme">
    <i class="el-icon-s-tools" />
    <span>主题配置</span>
    <el-drawer
      title="主题配置"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="300px"
    >
      <el-scrollbar style="height: 94vh; overflow: hidden;">
        <div class="el-drawer__body">
          <el-form ref="form" :model="theme">
            <el-form-item label="布局">
              <el-radio-group v-model="theme.layout">
                <el-radio-button label="vertical">纵向布局</el-radio-button>
                <el-radio-button label="horizontal">横向布局</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头部">
              <el-radio-group v-model="theme.header">
                <el-radio-button label="fixed">固定头部</el-radio-button>
                <el-radio-button label="noFixed">不固定头部</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="多标签">
              <el-radio-group v-model="theme.tagsBar">
                <el-radio-button label="true">开启</el-radio-button>
                <el-radio-button label="false">不开启</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单背景色">
              <el-color-picker
                v-model="theme.menuBackground"
                :predefine="[
                  '#2a58ad',
                  '#001529',
                  '#f56c6c',
                  '#0fd59d',
                  '#3fb884',
                  '#ff7a47',
                  '#a80505',
                ]"
                show-alpha
              />
            </el-form-item>
            <el-form-item label="菜单选中色">
              <el-color-picker
                v-model="theme.menuBackgroundActive"
                :predefine="['#22468a', '#1890ff', '#21e6af', '#f57e6c']"
                show-alpha
              />
            </el-form-item>
            <el-form-item label="菜单文字色">
              <el-color-picker
                v-model="theme.menuColor"
                :predefine="['#000', '#fff']"
                show-alpha
              />
            </el-form-item>
            <el-form-item label="标签主题色">
              <el-color-picker
                v-model="theme.tagBackgroundActive"
                :predefine="['#1890ff', '#0fd59d', '#f56c6c']"
                show-alpha
              />
            </el-form-item>
            <el-form-item label="默认按钮主题色">
              <el-color-picker
                v-model="theme.buttonBackground"
                :predefine="['#1890ff', '#0fd59d', '#f56c6c']"
                show-alpha
              />
            </el-form-item>
            <el-form-item label="分页选中色">
              <el-color-picker
                v-model="theme.paginationBackgroundActive"
                :predefine="['#1890ff', '#0fd59d', '#f56c6c']"
                show-alpha
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSetDfaultTheme">恢复默认</el-button>
              <el-button
                type="primary"
                @click="handleSaveTheme"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </span>
</template>

<script>
import variables from '@/styles/variables.scss'
import { mapGetters } from 'vuex'

export default {
  name: 'ThemeBar',
  data() {
    return {
      drawerVisible: false,
      theme: {
        layout: '',
        header: '',
        tagsBar: '',
        menuBackground: variables['menu-background'],
        menuBackgroundActive: variables['menu-background-active'],
        menuColor: variables['menu-color'],
        tagBackgroundActive: variables['tag-background-active'],
        buttonBackground: variables['button-background'],
        paginationBackgroundActive: variables['pagination-background-active']
      }
    }
  },
  computed: {
    ...mapGetters({
      layout: 'settings/layout',
      header: 'settings/header',
      tagsBar: 'settings/tagsBar',
      themeBar: 'settings/themeBar'
    })
  },
  mounted() {},
  created() {
    this.$baseEventBus.$on('theme', () => {
      this.handleChangeTheme()
    })
    const theme = localStorage.getItem('BYUI-VUE-THEME')
    this.theme.layout = this.layout
    this.theme.header = this.header
    this.theme.tagsBar = this.tagsBar
    if (theme !== null) {
      this.$set(this.theme, 'menuBackground', JSON.parse(theme).menuBackground)
      this.$set(
        this.theme,
        'menuBackgroundActive',
        JSON.parse(theme).menuBackgroundActive
      )
      this.$set(this.theme, 'menuColor', JSON.parse(theme).menuColor)
      this.$set(
        this.theme,
        'tagBackgroundActive',
        JSON.parse(theme).tagBackgroundActive
      )
      this.$set(
        this.theme,
        'buttonBackground',
        JSON.parse(theme).buttonBackground
      )
      this.$set(
        this.theme,
        'paginationBackgroundActive',
        JSON.parse(theme).paginationBackgroundActive
      )
      this.handleSetTheme()
    }
  },
  methods: {
    handleChangeTheme() {
      this.drawerVisible = true
    },
    handleChangeQq() {
      window.open('tencent://message/?uin=1204505056')
    },
    handleSetTheme() {
      const {
        layout,
        header,
        tagsBar,
        menuBackground,
        menuBackgroundActive,
        menuColor,
        tagBackgroundActive,
        buttonBackground,
        paginationBackgroundActive
      } = this.theme

      const style = document.createElement('style')
      style.id = 'BYUI-VUE-THEME'
      style.innerHTML = `
        .top-bar-container,
        .top-bar-container .vab-main,
        .side-bar-container,
        .logo-container-vertical,
        .logo-container-horizontal,
        .el-menu,
        .el-menu-item,
        .el-submenu.is-active.is-opened,
        .el-submenu__title,
        .el-menu-item.is-active,
        .el-menu-item .is-active {
          background-color:${menuBackground}!important;
        }

        body .el-menu--horizontal .top-bar-item-container .el-menu-item:hover,
        body .el-menu--horizontal .top-bar-item-container .el-menu-item.is-active,
        body .vue-admin-beautiful-wrapper .side-bar-container .el-submenu .el-menu-item.is-active,
        body .vue-admin-beautiful-wrapper .side-bar-container .el-menu-item:hover,
        body .side-bar-container .el-menu .el-menu-item.is-active {
          background-color:${menuBackgroundActive}!important;
        }

        .vab-main .tags-bar-container .tags-content .el-tabs__header .el-tabs__item.is-active {
          background:  ${tagBackgroundActive}!important;
          border: 1px solid ${tagBackgroundActive}!important;
        }

        .el-button.el-button--primary {
          background-color: ${buttonBackground}!important;
          border-color: ${buttonBackground}!important;
        }

        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: ${paginationBackgroundActive}!important;
          border-color: ${paginationBackgroundActive}!important;
        }

        body .vue-admin-beautiful-wrapper .side-bar-container .el-menu .nest-menu [class*=menu].is-active {
          background-color:${menuBackgroundActive}!important
        }
        body .vue-admin-beautiful-wrapper .side-bar-container .el-menu [class*=menu] span,
        body .vue-admin-beautiful-wrapper .side-bar-container .el-menu [class*=menu] svg,
        body .vue-admin-beautiful-wrapper .side-bar-container .el-menu [class*=menu] i
        {
          color:${menuColor}!important
        }

      `
      document.getElementsByTagName('head').item(0).appendChild(style)
      localStorage.setItem(
        'BYUI-VUE-THEME',
        `{
            "menuBackground":"${menuBackground}",
            "menuBackgroundActive":"${menuBackgroundActive}",
            "menuColor":"${menuColor}",
            "tagBackgroundActive":"${tagBackgroundActive}",
            "layout":"${layout}",
            "header":"${header}",
            "tagsBar":"${tagsBar}",
            "buttonBackground":"${buttonBackground}",
            "paginationBackgroundActive":"${paginationBackgroundActive}"
          }`
      )
      this.handleSwitchLayout(layout)
      this.handleSwitchHeader(header)
      this.handleSwitchTagsBar(tagsBar)
      this.drawerVisible = false
    },
    handleSaveTheme() {
      this.handleSetTheme()
      location.reload()
    },
    handleSetDfaultTheme() {
      localStorage.removeItem('BYUI-VUE-THEME')
      this.$store.dispatch('settings/changeLayout', this.theme.layout)
      this.$refs['form'].resetFields()
      Object.assign(this.$data, this.$options.data())
      this.drawerVisible = false
      location.reload()
    },
    handleSwitchLayout(layout) {
      this.$store.dispatch('settings/changeLayout', layout)
    },
    handleSwitchHeader(header) {
      this.$store.dispatch('settings/changeHeader', header)
    },
    handleSwitchTagsBar(tagsBar) {
      this.$store.dispatch('settings/changeTagsBar', tagsBar)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin right-bar {
  position: fixed;
  right: 0;
  z-index: $base-z-index;
  width: 60px;
  min-height: 60px;
  text-align: center;
  cursor: pointer;
  background: $base-color-blue;
  border-radius: $base-border-radius;

  > div {
    padding-top: 10px;
    // border-bottom: 1px solid $base-color-white;

    &:hover {
      opacity: 0.9;
    }

    p {
      font-size: $base-font-size-small;
      line-height: 30px;
      color: $base-color-white;
    }
  }
}

.theme-bar-setting {
  @include right-bar;

  top: 40vh;

  ::v-deep {
    svg:not(:root).svg-inline--fa {
      display: block;
      margin-right: auto;
      margin-left: auto;
      color: $base-color-white;
    }

    .svg-icon {
      display: block;
      margin-right: auto;
      margin-left: auto;
      font-size: 20px;
      color: $base-color-white;
      fill: $base-color-white;
    }
  }
}

.el-drawer__body {
  padding: 20px;
}
</style>
