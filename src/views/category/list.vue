<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h3>类别列表</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :offset="22">
        <el-button
          size="small"
          type="primary"
        >添加
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="batchDelete"
        >批量删除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="categoryList"
      border
      style="width: 100%; margin-bottom: 20px; margin-top: 20px;"
      @selection-change="handleSelection"
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
import { getCategoryList, batchDeleteCategory } from '@/api/categoty'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      categoryList: [],
      selectCategoryList: [],
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
    },
    // 表格中选中处理
    handleSelection(val) {
      this.selectCategoryList = val
    },
    // 批量删除选中数据
    batchDelete() {
      // 选中数量为0时无需删除
      if (this.selectCategoryList.length === 0) {
        this.$notify.info({
          title: '消息',
          message: '当前无选中数据可删除'
        })
        return
      }
      // 当有选中数据时
      this.$confirm('确认批量删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const selectIdList = []
        this.selectCategoryList.map(item => selectIdList.push(item.id))
        batchDeleteCategory(selectIdList)
          .then(response => {
            this.$message.success(response.message)
          })
          .catch(error => {
            this.$message.error(error)
          })
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
}

</script>
