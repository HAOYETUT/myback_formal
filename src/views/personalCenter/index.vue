<template>
  <div class="personalCenter-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="修改登录账号">
        <el-form ref="formInfo" :inline="true" :model="formInfo" :rules="formInforules">
          <el-form-item label="登录账号" prop="name">
            <el-input v-model="formInfo.name" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="formInfoLoading" type="primary" @click="formInfoSubmit()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改登录密码">
        <el-form ref="formPwd" style="width:320px" :model="formPwd" :rules="formPwdrules">
          <el-form-item label="老密码" prop="old_password">
            <el-input v-model="formPwd.old_password" />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="formPwd.password" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="formPwdLoading" type="primary" @click="formPwdSubmit()">保存密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { editorSystemAdminInfo, ChangePassword } from '@/api/user'
export default {
  name: 'PersonalCenter',
  data() {
    return {
      formInfoLoading: false,
      formInfo: { name: '' },
      formInforules: {
        name: [{ required: true, pattern: /[\S]+/, message: '请输入登录账号', trigger: 'blur' }]
      },
      /** edit pwd */
      formPwdLoading: false,
      formPwd: { old_password: '', password: '' },
      formPwdrules: {
        old_password: [{ required: true, pattern: /[\S]+/, message: '请输入老密码', trigger: 'blur' }],
        password: [{ required: true, pattern: /[\S]+/, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      // userName: 'user/userName'
    })
  },
  watch: {
    // userName: {
    //   handler(newVal) {
    //     this.formInfo.name = newVal
    //   },
    //   immediate: true
    // }
  },
  methods: {
    ...mapActions({
      setInfo: 'user/setInfo'
    }),
    // 修改用户名
    formInfoSubmit() {
      this.$refs.formInfo.validate(async valid => {
        if (!valid || this.formInfoLoading) return
        this.formInfoLoading = true
        // const { msg } = await editorSystemAdminInfo(this.formInfo).finally(() => { this.formInfoLoading = false })
        // this.setInfo(this.formInfo.name)
        // this.$message.success(msg || 'success')
      })
    },
    // 修改密码
    formPwdSubmit() {
      this.$refs.formPwd.validate(async valid => {
        if (!valid || this.formPwdLoading) return
        this.formPwdLoading = true
        // const { msg } = await ChangePassword(this.formPwd).finally(() => { this.formPwdLoading = false })
        // this.$message.success(msg || 'success')
      })
    }
  }
}
</script>

