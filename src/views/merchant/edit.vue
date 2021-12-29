<template>
  <div class="app-container">
    <h2>商户信息编辑</h2>
    <el-form ref="editMerchantInfo" :model="info" label-width="120px" :rules="rules">
      <el-form-item label="商户名称" prop="name">
        <el-input v-model="info.name" placeholder="请输入商户名称" style="width: 300px" />
      </el-form-item>
      <el-form-item label="商户地址" prop="address">
        <el-input v-model="info.address" placeholder="请输入商户地址" style="width: 500px" />
      </el-form-item>
      <el-form-item label="商户联系方式" prop="telephone">
        <el-input v-model="info.telephone" placeholder="请输入商户联系方式" style="width: 300px" />
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          v-model="businessTime"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择营业时间"
          format="HH:mm"
          value-format="HH:mm"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="商户公告" prop="announcement">
        <el-input v-model="info.announcement" autosize type="textarea" maxlength="255" show-word-limit style="width: 500px" />
      </el-form-item>
      <el-form-item label="商户LOGO" prop="picture">
        <el-upload
          class="avatar-uploader"
          :action="apiHost"
          :headers="headers"
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="checkFile"
        >
          <img v-if="info.picture" :src="info.picture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
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
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>

<script>
import { mapGetters } from 'vuex'
import { getMerchantInfo, editMerchantInfo } from '@/api/merchant'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      businessTime: [],
      info: {
        name: '',
        address: '',
        telephone: '',
        announcement: '',
        businessStartTime: '',
        businessEndTime: '',
        picture: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商户名称', trigger: 'blur' },
          { min: 3, max: 255, message: '商户名称长度在3-255之间', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入商户地址', trigger: 'blur' },
          { min: 5, max: 255, message: '商户地址长度在5-255之间', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入商户联系方式', trigger: 'blur' },
          { min: 11, max: 20, message: '商户联系方式长度在11-20之间', trigger: 'blur' }
        ],
        announcement: [
          { min: 5, max: 500, message: '商户公告长度在5-500之间', trigger: 'blur' }
        ]
      },
      apiHost: 'http://localhost:8111/upload',
      headers: {}
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  created() {
    this.headers.token = getToken()
    this.getInfo()
  },
  methods: {
    getInfo() {
      getMerchantInfo(this.merchantId)
        .then(response => {
          const { merchantInfo } = response.data
          this.info.name = merchantInfo.name
          this.info.address = merchantInfo.address
          this.info.telephone = merchantInfo.telephone
          this.info.announcement = merchantInfo.announcement
          this.businessTime = [merchantInfo.businessStartTime, merchantInfo.businessEndTime]
          this.info.picture = merchantInfo.picture
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    submit() {
      this.info.businessStartTime = this.businessTime[0]
      this.info.businessEndTime = this.businessTime[1]
      this.$confirm('确定修改商户信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs['editMerchantInfo'].validate((valid) => {
          if (valid) {
            editMerchantInfo(this.merchantId, this.info)
              .then(response => {
                const { message } = response
                this.$message({
                  type: 'success',
                  message: message
                })
                this.$router.push('/merchant/info')
              })
              .catch(error => {
                this.$message.error(error)
              })
          } else {
            alert('请核对是否输入正确')
            return false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
      })
    },
    cancel() {
      this.$router.push('/merchant/info')
    },
    handleSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.info.picture = 'http://' + res.data.fileName
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
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  }
}
</script>
