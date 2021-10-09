<template>
  <div class="app-container">
    <el-descriptions title="商户信息" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="editInfo">编辑</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />&nbsp;商户名
        </template>
        {{ merchantInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class=" el-icon-location-outline" />&nbsp;商户地址
        </template>
        {{ merchantInfo.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class=" el-icon-mobile-phone" />&nbsp;商户联系方式
        </template>
        {{ merchantInfo.telephone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets" />&nbsp;商户公告
        </template>
        {{ merchantInfo.announcement }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time" />&nbsp;营业时间
        </template>
        {{ merchantInfo.businessStartTime }} - {{ merchantInfo.businessEndTime }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMerchantInfo } from '@/api/merchant'

export default {
  data() {
    return {
      merchantInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getMerchantInfo(this.merchantId)
        .then(response => {
          const { merchantInfo } = response.data
          this.merchantInfo = merchantInfo
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    editInfo() {
      this.$router.push('/merchant/edit')
    }
  }
}
</script>
