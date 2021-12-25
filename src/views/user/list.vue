<template>
  <div class="app-container">
    <el-upload
      :action="apiHost"
      class="avatar-uploader"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="checkFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      imageUrl: '',
      apiHost: 'http://localhost:8111/upload',
      headers: {}
    }
  },
  created() {
    this.headers.token = getToken()
  },
  methods: {
    handleSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = 'http://' + res.data.fileName
    },
    checkFile(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

