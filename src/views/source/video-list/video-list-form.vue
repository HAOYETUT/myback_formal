
<template>
  <el-drawer
    v-drawer-move
    size="460px"
    :title="drawerTitle"
    :wrapper-closable="false"
    :visible.sync="visibleDrawer"
    :before-close="handleBeforClose"
  >
    <drawer-layout>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="音乐名称" prop="song_title">
          <el-input v-model="form.song_title" />
        </el-form-item>
        <el-form-item label="歌手名称" prop="port_name">
          <el-input v-model="form.port_name" />
        </el-form-item>

        <el-form-item label="歌曲格式" prop="song_format" class="w100">
          <el-select v-model="form.song_format" placeholder="请选择" style="width:340px;">
            <el-option v-for="item in MUSIC_OPTION_FORMAT" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="歌曲类型" prop="song_style" class="w100">
          <el-select v-model="form.song_style" placeholder="请选择" style="width:340px;">
            <el-option v-for="item in MUSIC_OPTION_TYPE" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="resetFormInfo()">取消</el-button>
        <el-button :loading="submitLoading" type="primary" @click="formSubmit()">保存</el-button>
      </template>
    </drawer-layout>
  </el-drawer>
</template>

<script>
import formDrawer from '@/mixins/formDrawer'
import { getFormatForm, diff } from '@/utils'
import _ from 'lodash'
import { MUSIC_OPTION_TYPE, MUSIC_OPTION_FORMAT } from '@/option'
// import { portAdd, portEditor } from '@/api/db'
const INIT_FORM = {
  district:'',
  song_title:'',
  port_name:'',
  song_style: '',
}
export default {
  mixins: [formDrawer],
  props:{
    postOption: {
      default() {
        return ''
      }
    },
  },
  data() {
    return {
      drawerName: '港区',
      form: { ...INIT_FORM },
      initForm: { ...INIT_FORM },
      MUSIC_OPTION_TYPE,
      MUSIC_OPTION_FORMAT,
      rules: {
        song_title: [{ required: true, pattern: /[\S]+/, message: '请输入音乐名称', trigger: 'blur' }],
        port_name: [{ required: true, pattern: /[\S]+/, message: '请输入歌手名称', trigger: 'blur' }],
        song_style: [{ required: true, pattern: /[\S]+/, message: '请选择歌曲类型', trigger: 'blur' }],
        song_format: [{ required: true, pattern: /[\S]+/, message: '请选择歌曲格式', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async addSubmit() {
      if (this.submitLoading) return
      this.submitLoading = true
      // const { data, msg } = await portAdd(this.form).finally(() => { this.submitLoading = false })
      // this.$emit('add-success', data || {})
      // // this.resetFormInfo()
      // this.$baseEventBus.$emit('reloadRouterView')
      // this.pulse = true
      // setTimeout(() => {
      //   this.pulse = false
      // }, 1000)
      // this.$message.success(msg || '保存成功！')
    },
    async editSubmit() {
      if (_.isEqual(this.form, this.copyForm)) return this.$message.warning('数据未修改过！')
      if (this.submitLoading) return
      this.submitLoading = true
      const { a, b } = diff(this.copyForm, this.form)
      // const { data, msg } = await portEditor({ a, b, ...getFormatForm(this.form, INIT_FORM) }).finally(() => { this.submitLoading = false })
      // this.$emit('edit-success', { ...this.form, ...data })
      // this.resetFormInfo()
      // this.$message.success(msg || '保存成功！')
    }
  }
}
</script>
