<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h2>{{ action }}商品</h2>
      </el-col>
    </el-row>
    <el-form
      ref="form"
      :model="good"
      label-width="80px"
      style="padding-bottom: 40px;"
    >
      <el-form-item label="商品名称">
        <el-input
          v-model="good.name"
          style="width: 50%;"
        />
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select
          v-model="good.categoryId"
          filterable
          clearable
          placeholder="请选择商品类别"
        >
          <el-option
            v-for="item in allCategoryName"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number
          v-model="good.stock"
          :min="-1"
          :max="10000"
        />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="good.price"
          :min="0"
          :precision="2"
          :step="0.1"
        />
      </el-form-item>
      <el-form-item label="包装费用">
        <el-input-number
          v-model="good.packingFee"
          :min="0"
          :precision="2"
          :step="0.1"
        />
      </el-form-item>
      <el-form-item label="商品主料">
        <el-input
          v-model="good.goodsDetail.mainElements"
          style="width: 50%;"
        />
      </el-form-item>
      <el-form-item label="商品辅料">
        <el-input
          v-model="good.goodsDetail.extraElements"
          style="width: 50%;"
        />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          v-model="good.goodsDetail.description"
          type="textarea"
          :rows="2"
          placeholder="请输入商品描述"
          style="width: 50%;"
        />
      </el-form-item>
      <el-form-item label="商品份量">
        <el-input
          v-model="good.goodsDetail.weight"
          style="width: 50%;"
        />
      </el-form-item>
      <el-form-item label="商品口味">
        <el-input
          v-model="good.goodsDetail.taste"
          style="width: 50%;"
        />
      </el-form-item>
    </el-form>
    <el-row>
      <div style="position: fixed; bottom: 0; background-color: white; width: 100%; height: 80px;">
        <el-divider />
        <el-col
          :span="24"
        >
          <el-button
            type="primary"
            size="small"
            @click="saveGood"
          >
            保存
          </el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getAllCategoryName } from '@/api/categoty'
import * as goodApi from '@/api/good'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      action: '',
      goodId: '',
      good: {
        goodsDetail: {}
      },
      allCategoryName: []
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  created() {
    if (this.$route.params.id) {
      this.action = '修改'
      this.goodId = this.$route.params.id
      this.getGood(this.goodId)
    } else {
      this.action = '新增'
    }
    this.getAllCategoryName()
  },
  methods: {
    // 保存或更新
    saveGood() {
      if (this.goodId) {
        this.good.id = this.goodId
        goodApi.editGood(this.good)
          .then(response => {
            const { message } = response
            this.$message({
              type: 'success',
              message: message,
              duration: 1000
            })
          })
          .catch(error => this.$message.error(error))
        setTimeout(() => {
          this.$router.push('/good/list')
        }, 1000)
      } else {
        this.good.merchantId = this.merchantId
        goodApi.addGood(this.good)
          .then(response => {
            const { message } = response
            this.$message({
              type: 'success',
              message: message,
              duration: 1000
            })
          })
          .catch(error => this.$message.error(error))
        setTimeout(() => {
          this.$router.push('/good/list')
        }, 1000)
      }
    },
    // 获取单个商品
    getGood(id) {
      goodApi.getGood(id)
        .then(response => {
          this.good = response.data.good
        })
        .catch(error => this.$message.error(error))
    },
    // 获取全部类别
    getAllCategoryName() {
      getAllCategoryName(this.merchantId)
        .then(response => {
          this.allCategoryName = response.data.allCategoryName
        })
        .catch(error => this.$message.error(error))
    }
  }
}
</script>
