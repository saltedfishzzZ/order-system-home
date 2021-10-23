<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h3>类别列表</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :offset="23">
        <el-button
          size="small"
          type="primary"
        >添加
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="categoryList"
      border
      style="width: 100%; margin-bottom: 20px; margin-top: 20px;"
    >
      <el-table-column
        type="selection"
        width="100"
        align="center"
      />
      <el-table-column
        prop="id"
        label="ID"
        width="100"
        align="center"
      />
      <el-table-column
        prop="categoryName"
        label="名称"
        width="250"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="250"
        align="center"
      />
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="250"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template>
          <el-button
            size="mini"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
          >删除
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
      @size-change="changePageSize"
      @current-change="changePageNo"
    />
  </div>
</template>

<script>
import { getCategoryList } from '@/api/categoty'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      categoryList: [],
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
    this.fetchData(this.pageNo, this.pageSize)
  },
  methods: {
    fetchData(pageNo, pageSize) {
      getCategoryList(this.merchantId, pageNo, pageSize)
        .then(response => {
          const { content, totalElements } = response.data.categoryList
          this.categoryList = content
          this.total = totalElements
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 改变页的数量
    changePageSize(val) {
      this.pageSize = val
      this.fetchData(this.pageNo, this.pageSize)
    },
    // 改变页数
    changePageNo(val) {
      this.pageNo = val
      this.fetchData(this.pageNo, this.pageSize)
    }
  }
}

</script>
