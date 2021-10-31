<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h2>商品列表</h2>
      </el-col>
    </el-row>
    <el-row style="padding-bottom: 20px;">
      <el-col :span="24" :offset="21">
        <el-button
          size="small"
          type="primary"
        >添加
        </el-button>
        <el-button
          size="small"
          type="danger"
          style="margin-right: 20px;"
        >批量删除
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="goodList"
      border
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            size="small"
            class="demo-table-expand"
          >
            <el-form-item label="主料">
              <span>{{ props.row.goodsDetail.mainElements }}</span>
            </el-form-item>
            <el-form-item label="辅料">
              <span>{{ props.row.goodsDetail.extraElements }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.goodsDetail.desc }}</span>
            </el-form-item>
            <el-form-item label="份量">
              <span>{{ props.row.goodsDetail.weight }}</span>
            </el-form-item>
            <el-form-item label="口味">
              <span>{{ props.row.goodsDetail.taste }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="商品名"
        prop="name"
      />
      <el-table-column
        v-slot="props"
        label="类别名"
      >
        <el-tag>{{ props.row.categoryName }}</el-tag>
      </el-table-column>
      <el-table-column
        v-slot="props"
        label="商品状态"
      >
        <el-tag>{{ props.row.goodStatus }}</el-tag>
      </el-table-column>
      <el-table-column
        v-slot="props"
        label="库存"
      >{{ props.row.stock === -1 ? '不限量' : stock }}</el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
      />
      <el-table-column
        label="包装费(元)"
        prop="packingFee"
      />
      <el-table-column
        label="创建时间"
        prop="createTime"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            style="margin-right: 5px;"
          >编辑
          </el-button>
          <el-popconfirm
            icon="el-icon-warning"
            icon-color="red"
            title="删除后无法恢复, 请确认是否删除?"
            @confirm="deleteById(scope.row.id)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              style="margin-right: 5px;"
            >删除</el-button>
          </el-popconfirm>
          <el-button
            size="mini"
            type="primary"
            style="margin-right: 5px; margin-top: 5px;"
            @click="updateStatus(scope.row.id, scope.row.status)"
          >
            {{ getShowNameByStatus(scope.row.status) }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="1"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
      @size-change="changePageSize"
      @current-change="changePageNo"
    />
  </div>
</template>

<style>
.pagination {
  padding-top: 20px;
}

.demo-table-expand {
  font-size: 0;
  padding-left: 20px;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { mapGetters } from 'vuex'
import * as goodApi from '@/api/good'

export default {
  data() {
    return {
      goodList: [],
      pageNo: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  created() {
    this.fetchGoodList()
  },
  methods: {
    fetchGoodList() {
      goodApi.listGood(this.merchantId, this.pageNo, this.pageSize)
        .then(response => {
          const { content, totalElements } = response.data.goods
          this.goodList = content
          this.total = totalElements
        })
        .catch(error => this.$message.error(error))
    },
    // 改变页的数量
    changePageSize(val) {
      this.pageSize = val
      this.fetchGoodList()
    },
    // 改变页数
    changePageNo(val) {
      this.pageNo = val
      this.fetchGoodList()
    },
    // 获取对应的改变商品状态的方法
    getShowNameByStatus(status) {
      if (status === 0) {
        return '上架'
      } else if (status === 1) {
        return '下架'
      } else {
        return '重新上架'
      }
    },
    // 修改商品状态
    updateStatus(id, oldStatus) {
      let status = 0
      if (oldStatus === 0) {
        status = 1
      } else if (oldStatus === 1) {
        status = 2
      } else {
        status = 0
      }
      goodApi.editStatusById(id, status)
        .then(response => {
          const { message } = response
          this.$message({
            type: 'success',
            message: message,
            duration: 1000
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 500)
        })
        .catch(error => this.$message.error(error))
    },
    // 根据id删除
    deleteById(id) {
      goodApi.deleteById(id)
        .then(response => {
          const { message } = response
          this.$message({
            type: 'success',
            message: message,
            duration: 1000
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        })
        .catch(error => this.$message.error(error))
    }
  }
}
</script>
