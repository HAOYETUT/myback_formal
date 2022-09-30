<template>
  <div class="editor-wrapper">
    <!-- 图片上传组件辅助-->
    <el-upload
      id="quill-upload"
      class="hideUpload"
      action=""
      accept=".jpg, .png"
      :multiple="false"
      :show-file-list="false"
      :http-request="uploadImg"
      :before-upload="beforeUpload"
    />
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    />
    <el-dialog
      append-to-body
      top="80px"
      title="内容预览"
      class="quill-preview"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <div v-html="content" />
      <div class="dialog___footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import 'quill/dist/quill.snow.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import { sysFileUploadFile } from '@/api'
import { FILE_TYPE } from '@/utils/constant'
import { PROVIEW_FILE_API } from '@/config'
const icons = Quill.import('ui/icons')
icons['link'] = '<i class="el-icon-view"></i>'

const AlignStyle = Quill.import('attributors/style/align')
const BackgroundStyle = Quill.import('attributors/style/background')
const ColorStyle = Quill.import('attributors/style/color')
const DirectionStyle = Quill.import('attributors/style/direction')
const FontStyle = Quill.import('attributors/style/font')
const SizeStyle = Quill.import('attributors/style/size')
Quill.register(AlignStyle, true)
Quill.register(BackgroundStyle, true)
Quill.register(ColorStyle, true)
Quill.register(DirectionStyle, true)
Quill.register(FontStyle, true)
Quill.register(SizeStyle, true)

// 工具栏配置
const TOOL_BAR_OPTIONS = [

  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent

  [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'], // remove formatting button,
  [{ 'direction': 'rtl' }], // text direction
  // 重写link功能,改为 预览
  ['image', 'video', 'link', 'aLink']
]
export default {
  name: 'Mquill',
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    const that = this
    return {
      myQuill: null,
      dialogVisible: false,
      editorOption: {
        modules: {
          toolbar: {
            container: TOOL_BAR_OPTIONS, // '#toolbar',   // 工具栏
            handlers: {
              image(value) {
                if (value) {
                  // 手动触发 upload
                  const uploadInput = document.querySelector('#quill-upload input')
                  uploadInput && uploadInput.click()
                }
              },
              // 重写link功能,改为 预览
              link() {
                that.dialogVisible = true
              },
              // 加a标签
              aLink: function(value) { // 添加工具方法
                if (value) {
                  var range = this.quill.getSelection()
                  if (range == null || range.length === 0) return
                  var preview = this.quill.getText(range)
                  this.quill.format('color', '#2cb2f6')
                  this.quill.format('underline', 'underline')
                  if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
                    preview = 'mailto:' + preview
                  }
                  var tooltip = this.quill.theme.tooltip
                  tooltip.edit('link', preview)
                } else {
                  this.quill.format('link', false)
                }
              }

            }
          }
        }
      }
    }
  },
  computed: {
    content: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.myQuill = this.$refs.myQuillEditor.quill
      this.myQuill.container.style.height = `${500}px`
      // 自定义粘贴图片功能
      this.myQuill.root.addEventListener('paste', async e => {
        const cd = e.clipboardData
        if (!cd || !cd.items) return
        const items = cd.items
        let item = items[0]
        const types = cd.types || []
        for (let i = 0; i < types.length; i++) {
          if (types[i] === 'Files') {
            item = items[i]
            break
          }
        }
        // check img
        if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
          e.preventDefault()
          const file = item.getAsFile()
          this.uploadImg({ file })
        }
      }, false)
      this.initALink()
    })
  },
  methods: {
    // 在使用的页面中初始化隐藏a标签
    initALink: function() {
      const sourceEditorButton = document.querySelector('.ql-aLink')
      sourceEditorButton.style.cssText = 'width:20px;font-size:14px;'
      sourceEditorButton.innerHTML = '<i class="el-icon-link"></i>'
    },
    async uploadImg({ file }) {
      const formData = new FormData()
      formData.append('imgFile', file)
      formData.append('to_folder', 'system_temp')
      const { new_name, path } = await sysFileUploadFile(formData)
      const resImgUrl = `${PROVIEW_FILE_API}/${path}${new_name}`
      this.insertImage(resImgUrl)
    },
    // imgUrl 返回的图片地址
    insertImage(imgUrl) {
      if (!imgUrl) return
      // 获取光标所在位置
      const index = (this.myQuill.getSelection() || {}).index || this.myQuill.getLength() - 1
      // 插入图片  res.info为服务器返回的图片地址
      this.myQuill.insertEmbed(index, 'image', imgUrl)
      // 调整光标到最后
      this.myQuill.setSelection(index + 1)
    },
    beforeUpload(file) {
      const type = FILE_TYPE[file.type]
      if (['jpg', 'png', 'gif'].indexOf(type) === -1) {
        this.$message.warning('请上传正确的文件类型！')
        return false
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$message.warning('文件大小必须小于5MB！')
        return false
      }
      return true
    },
    uploadError() {},
    onEditorBlur(quill) {},
    onEditorFocus(quill) {
    },
    onEditorReady(quill) {

    },
    onEditorChange({ quill, html, text }) { }
  }
}
</script>

<style lang="scss" scoped>

  .hideUpload {
    display: none;
  }

</style>
