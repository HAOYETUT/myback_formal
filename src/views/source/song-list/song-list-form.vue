
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
        <el-form-item label="所属港区" prop="port_from_id" class="w100">
          <el-select v-model="form.port_from_id" placeholder="请选择" style="width:340px;">
            <el-option v-for="item in postOption" :key="item.port_from_id" :label="item.name" :value="item.port_from_id" />
          </el-select>
        </el-form-item>
        <el-form-item label="港区名称" prop="port_name">
          <el-input v-model="form.port_name" />
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="form.province" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" />
        </el-form-item>
        <el-form-item label="区" prop="district">
          <el-input v-model="form.district" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item prop="lng">
          <template #label>
            <el-tooltip placement="top-start">
              <div slot="content">
                <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">添加经伟度，系统会为您自动计算距离<b>[点击]</b></a>
              </div>
              <span class="poi" style="color: #01aaed;">经度</span>
            </el-tooltip>
          </template>
          <el-input v-model="form.lng" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" />
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
// import { portAdd, portEditor } from '@/api/db'
const INIT_FORM = {
  port_from_id: '',
  name: '',
  address: '',
  type: 1,
  lng: '',
  lat: '',
  province:"",
  city:'',
  district:'',
  port_name:'',
  port_id:''
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
      citysOptions: [{ label: '上海', value: 1 }, { label: '天津', value: 2 }, { label: '青岛', value: 3 }, { label: '九江', value: 4 },{label: '太仓', value: '5'}],
      rules: {
        port_from_id: [{ required: true, pattern: /[\S]+/, message: '请选择所属港区; 注：不可为0', trigger: 'blur' }],
        city: [{ required: true, pattern: /[\S]+/, message: '请输入市级; 注：不可为0', trigger: 'blur' }],
        port_name: [{ required: true, pattern: /[\S]+/, message: '请输入港区名称; 注：不可为0', trigger: 'blur' }],
        province: [{ required: true, pattern: /[\S]+/, message: '请输入省级; 注：不可为0', trigger: 'blur' }],
        district: [{ required: true, pattern: /[\S]+/, message: '请输入区级; 注：不可为0', trigger: 'blur' }],
        lng: [{ required: true, pattern: /[\S]+/, message: '请输入经度; 注：不可为0', trigger: 'blur' }],
        lat: [{ required: true, pattern: /[\S]+/, message: '请输入纬度; 注：不可为0', trigger: 'blur' }],
        address: [{ required: true, pattern: /[\S]+/, message: '请输入地址; 注：不可为0', trigger: 'blur' }],
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
