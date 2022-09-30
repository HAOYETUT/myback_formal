<!--单图片上传-->
<template>
  <div>
    <el-upload
      name="imgFile"
      class="image-upload"
      accept=".jpg, .png"
      action=""
      :show-file-list="false"
      :multiple="false"
      :before-upload="beforeUpload"
      :http-request="customUpload"
    >
      <img v-if="imgUrl" :src="imgUrl" class="image-url">
      <i v-else class="el-icon-plus image-upload-icon" />
      <div v-show="!!imgUrl" class="upload-hover" @click.stop>
        <i class="el-icon-zoom-in mr10" @click="preview()" />
        <i class="el-icon-delete" @click="rmImage()" />
      </div>
    </el-upload>
    <viewer :images="imgUrl" :visible.sync="viewerVisible" :navbar="0" :title="0" />
  </div>

</template>

<script>
import { FILE_TYPE } from '@/utils/constant'
import { sysFileUploadFile } from '@/api'
import viewer from '@/components/Viewer'
import { tempFolder } from '@/config/settings'
import { PROVIEW_FILE_API } from '@/config'

export default {
  components: {
    viewer
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 是否是上传改变的
    isUpload: {
      type: Boolean,
      default: false
    },
    // 上传的文件夹
    previewFolder: {
      type: String,
      default: 'img/system'
    },
  },
  data() {
    return {
      viewerVisible: false,
      path: ''
    }
  },
  computed: {
    imgUrl() {
      if (!this.value) return ''
      const previewApi = PROVIEW_FILE_API
      return this.isUpload ? `${previewApi}/${this.path}${this.value}` : `${previewApi}/${this.previewFolder}/${this.value}`
    }
  },
  methods: {
    beforeUpload(file) {
      const type = FILE_TYPE[file.type]
      if (['jpg', 'png'].indexOf(type) === -1) {
        this.$message.warning('请上传正确的文件类型！')
        return false
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$message.warning(`文件大小必须小于5MB！`)
        return false
      }
      return true
    },
    async customUpload({ file }) {
      const formData = new FormData()
      formData.append('imgFile', file)
      formData.append('to_folder', tempFolder)
      const { path, new_name } = await sysFileUploadFile(formData)
      this.path = path
      this.$emit('update:isUpload', true)
      // 文件地址
      this.emitInput(new_name)
      this.$nextTick(() => {
        this.$emit('upload-success', this.imgUrl, file)
      })
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    preview() {
      this.viewerVisible = true
      this.$emit('preview', this.imgUrl)
    },
    rmImage() {
      this.emitInput('')
      this.$emit('upload-remove')
    }
  }
}
</script>
<style lang="scss" scoped>
.image-upload {
  ::v-deep {
    .el-upload {
      position: relative;
      cursor: pointer;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;

      &:hover {
        border-color: #409eff;
      }
    }

    .image-url {
      width: 120px;
      height: 120px;
      vertical-align: middle;
    }

    .image-upload-icon {
      width: 120px;
      height: 120px;
      font-size: 28px;
      line-height: 120px;
      color: #8c939d;
      text-align: center;
    }

    .upload-hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 20px;
      color: #fff;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;

      &::after {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        content: '';
      }

      &:hover {
        opacity: 1;
      }
    }
  }
}

</style>
