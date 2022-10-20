<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off">
      <div class="title-container">
        <h1 class="title">{{ title }}</h1>
      </div>
      <el-form-item prop="user_name">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input v-model.trim="loginForm.user_name" v-focus auto-complete="off" placeholder="请输入用户名" tabindex="1" type="text" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input :key="passwordType" ref="password" v-model.trim="loginForm.password" class="input-pass" :type="passwordType" auto-complete="off" placeholder="请输入密码" tabindex="2" />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view" />
        </span>
      </el-form-item>
      <el-form-item prop="verify">
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input v-model.trim="loginForm.verify" auto-complete="off" placeholder="请输入验证码" tabindex="3" type="text" @keyup.enter.native="handleLogin" />
        <!-- <verify-code class="verify-code" :v-code="vCode" @click="getVerify()" /> -->
      </el-form-item>
      <el-button :loading="loading" class="w100" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
    
    <div style="position: absolute;bottom:0;padding:5px;text-align: center;left:0;right:0">
      <audio controls  loop muted class="audio">
        <source autoplay src="@/assets/audio/夜曲 - 周杰伦.mp3" >
        您的浏览器不支持 audio 元素。
      </audio>
      <div style="color:#fff;margin-bottom:5px;">
        <a target="_blank" style="color:#fff" href="https://beian.miit.gov.cn">小哪吒影音后台管理系统</a>
        <span style="display: inline-block;padding: 0 5px;">|</span>
        <!-- <img alt="401" src="@/assets/images/ga_icon.png" style="vertical-align: middle; margin-right: 3px;" /> -->
        <img alt="401" src="@/assets/images/nezha.jpg" style="vertical-align: middle; margin-right: 3px; width: 15px;height: 15px;" />
        <a style="color:#fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011302005873" target="_blank">系统由VUE2.0技术支持</a>
      </div>
    </div>
  </div>
</template>

<script>
// import { getVerify } from '@/api/user'
// import VerifyCode from '@/components/VerifyCode'
export default {
  name: 'Login',
  components: {
    // VerifyCode
  },
  directives: {
    focus: {
      inserted(el) {
        el.querySelector('input').focus()
      }
    }
  },
  data() {
    return {
      vCode: [],
      title: this.$baseTitle,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // 验证码
      verifyData: {},
      loginForm: {
        user_name: '',
        password: '',
        verify: ''
      },
      loginRules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }
  },
  mounted() {
    // this.getVerify()
  },
  methods: {
    // async getVerify() {
    //   const { data, formV, time } = await getVerify()
    //   this.vCode = data || []
    //   this.verifyData = { data: (data || []).join(''), formV, time }
    // },
    showPwd() {
      this.passwordType === 'password'
        ? (this.passwordType = '')
        : (this.passwordType = 'password')
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (!valid) return
        const params = { ...this.loginForm, ...this.verifyData, port: 'Admin' }
        this.loading = true
        await this.$store.dispatch('user/login', params).finally(() => {
          this.loading = false
        })
        const routerPath = this.redirect === '/404' || this.redirect === '/401' ? '/' : this.redirect
        this.$router.push(routerPath).catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* icon input 宽度间隔 */
$input-gutter-icon: 40px;
.audio {
  width: 100%;
  height: 50px;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  // background: #333;
  background: url('../../assets/sw-01.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 320px;
    max-width: 100%;
    padding: 20px;
    margin: 0 auto;
    overflow: hidden;
    color: #fff;
    // background-color: rgba(0, 0, 0, 0.5);
    background: pink;
    border-radius: 10px;
    .title-container {
      position: relative;
      margin-bottom: 20px;
      .title {
        text-align: center;
      }
    }
  }
  .svg-container {
    position: absolute;
    z-index: 11;
    width: $input-gutter-icon;
    font-size: 16px;
    color: #606266;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    color: #606266;
    cursor: pointer;
  }
  .verify-code {
    position: absolute;
    top: 0;
    right: 0;
  }
  /* reset element-ui css */
  ::v-deep {
    .el-input {
      input {
        padding-left: $input-gutter-icon;
        border: 0;
        border-radius: 0;
      }
    }
  }
}
</style>
