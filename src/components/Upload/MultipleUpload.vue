<!--多文件上传-->
<template>
  <div class="upload-container">
    <el-upload
      drag
      :show-file-list="false"
      action=""
      accept=".jpg, .png"
      :before-upload="beforeUpload"
      :http-request="customUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <ul class="image-preview">
      <li v-for="(item,index) in copyFileList" :key="index" class="image-item">
        <img :src="setSrc(item)">
        <div class="image-actions">
          <i class="el-icon-zoom-in mr10" @click="preview(item)" />
          <i class="el-icon-delete" @click="rmImage(item)" />
        </div>
      </li>
    </ul>
    <viewer :images="previewImg" :visible.sync="viewerVisible" :navbar="0" :title="0" />
  </div>
</template>

<script>
import { FILE_TYPE } from '@/utils/constant'
import { sysFileUploadFile } from '@/api'
import viewer from '@/components/Viewer'
import { PROVIEW_FILE_API } from '@/config'

import _ from 'lodash'
export default {
  components: {
    viewer
  },
  props: {
    // 文件列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    // 上传的文件夹
    previewFolder: {
      type: String,
      default: 'img/system'
    }
  },
  data() {
    return {
      // 图片列表对象
      copyFileList: [],
      viewerVisible: false,
      previewImg: '',
      path: ''
    }
  },
  watch: {
    fileList: {
      handler(newVal) {
        this.copyFileList = _.cloneDeep(newVal)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setSrc(item) {
      return this.formatImgUrl(item)
    },
    beforeUpload(file) {
      const type = FILE_TYPE[file.type]
      if (['jpg', 'png'].indexOf(type) === -1) {
        this.$message.warning('请上传正确的文件类型！')
        return false
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$message.warning('文件大小必须小于5MB！')
        return false
      }
      if (this.copyFileList.length >= 3) {
        this.$message.warning('最多上传3张图片！')
        return false
      }
      return true
    },
    async customUpload({ file }) {
      const formData = new FormData()
      formData.append('imgFile', file)
      formData.append('to_folder', 'system_temp')
      const { path, new_name } = await sysFileUploadFile(formData)
      this.path = path
      this.copyFileList.push({ imgUrl: new_name, isUpload: true })
      this.$emit('upload-success', this.copyFileList)
    },
    preview(item) {
      this.previewImg = this.formatImgUrl(item)
      this.viewerVisible = true
      this.$emit('preview', this.copyFileList)
    },
    formatImgUrl(item) {
      const previewApi = PROVIEW_FILE_API
      return item.isUpload ? `${previewApi}/${this.path}${item.imgUrl}` : `${previewApi}/${this.previewFolder}/${item.imgUrl}`
    },
    rmImage(item) {
      this.copyFileList = this.copyFileList.filter((el) => el.imgUrl !== item.imgUrl)
      this.$emit('remove-success', this.copyFileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-preview {
  list-style: none;
  cursor: pointer;

  .image-item {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    margin: 0 8px 8px 0;
    vertical-align: middle;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .image-actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
</style>
