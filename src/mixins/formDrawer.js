import _ from 'lodash'
/* 表单抽屉 mixins */
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // add或edit模式
    mode: {
      type: String,
      default: ''
    },
    // 需要编辑的数据
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      submitLoading: false,
      // 值 copy,用于比较
      copyForm: {},
      // 是否是上传触发成功的图片
      isUpload: false
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        this.form = _.cloneDeep(newVal)
        this.copyForm = _.cloneDeep(newVal)
      },
      deep: true
    }
  },
  computed: {
    drawerTitle() {
      return this.mode === 'add' ? `添加${this.drawerName}` : this.mode === 'edit' ? `编辑${this.drawerName}` : ''
    },
    visibleDrawer: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    // 表单提交前校验
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        if (this.mode === 'add') {
          this.addSubmit()
        } else if (this.mode === 'edit') {
          this.editSubmit()
        }
      })
    },
    // init form
    resetFormInfo(bool, callBack) {
      this.isUpload = false
      this.copyForm = {}
      // this.form = _.cloneDeep(this.initForm)
      if (bool) {
        if (!_.isEqual(this.form, this.initForm)) {
          this.$confirm('还未保存，确认关闭吗？')
            .then(_ => {
              this.$nextTick(() => {
                this.$refs.form.clearValidate()
              })
              // 需在组件内自定义resetCustomFormInfo方法
              if (Object.prototype.toString.call(this.resetCustomFormInfo) === '[object Function]') this.resetCustomFormInfo()
              this.visibleDrawer = false
              if (callBack) callBack()
            })
            .catch(_ => {})
        } else {
          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })
          // 需在组件内自定义resetCustomFormInfo方法
          if (Object.prototype.toString.call(this.resetCustomFormInfo) === '[object Function]') this.resetCustomFormInfo()
          this.visibleDrawer = false
          if (callBack) callBack()
        }
      } else {
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
        // 需在组件内自定义resetCustomFormInfo方法
        if (Object.prototype.toString.call(this.resetCustomFormInfo) === '[object Function]') this.resetCustomFormInfo()
        this.visibleDrawer = false
        if (callBack) callBack()
      }
    },
    // drawer 关闭之前重置表单数据
    handleBeforClose(done) {
      this.resetFormInfo()
      done()
    },
    // drawer 关闭之前重置表单数据
    handleBeforSureClose(done) {
      this.resetFormInfo(1, () => {
        done()
      })
    },
    // 清空对象值
    clearValue(obj) {
      Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
          this.clearValue(obj[key])
        } else {
          obj[key] = ''
        }
      })
    }
  }
}
