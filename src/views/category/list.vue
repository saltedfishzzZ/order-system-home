<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h2>类别列表</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :offset="21">
        <el-button
          size="small"
          type="primary"
          @click="addCategory"
        >添加
        </el-button>
        <el-button
          size="small"
          type="danger"
          style="margin-right: 20px;"
          @click="batchDelete"
        >批量删除
        </el-button>
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
        <template v-slot="scope">
          <el-button
            size="mini"
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
            >删除</el-button>
          </el-popconfirm>
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addOrEditShowStatus"
    >
      <el-form :model="addOrEditForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addOrEditForm.name" placeholder="请输入类别名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrEditShowStatus = false">取消</el-button>
        <el-button type="primary" @click="handleAddOrUpdate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList, batchDeleteCategory, deleteCategory, addCategory } from '@/api/categoty'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      categoryList: [],
      selectCategoryList: [],
      addOrEditForm: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      showStatus: false,
      addOrEditShowStatus: false,
      dialogTitle: ''
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
    // 添加
    addCategory() {
      this.addOrEditShowStatus = true
      this.dialogTitle = '添加类别'
    },
    handleAddOrUpdate() {
      if (this.addOrEditForm.id) {
        console.log('更新类别')
      } else {
        this.addOrEditForm.merchantId = this.merchantId
        addCategory(this.addOrEditForm)
          .then(response => {
            console.log(response)
            const { message } = response
            this.$message({
              type: 'success',
              message: message,
              duration: 1000
            })
          })
          .catch(error => this.$message.error(error))
      }
      setTimeout(() => {
        this.addOrEditShowStatus = false
        this.$router.go(0)
      }, 1000)
    },
    // 单个删除
    deleteById(id) {
      deleteCategory(id)
        .then(response => {
          const { message } = response
          this.$message({
            type: 'success',
            message: message,
            duration: 1000
          })
        })
        .catch(error => {
          this.$message.error(error)
        })
      setTimeout(() => {
        this.$router.go(0)
      }, 1000)
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
            const { message } = response
            this.$message({
              type: 'success',
              message: message,
              duration: 1000
            })
          })
          .catch(error => {
            this.$message.error(error)
          })
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
}

</script>
