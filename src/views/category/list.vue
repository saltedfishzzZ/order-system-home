<template>
  <div class="app-container">
    <h3>类别列表</h3>
    <el-table
      :data="categoryList"
      border
      style="width: 100%"
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
        label="操作"
        align="center"
      >
        <template>
          <el-button
            size="mini"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/categoty'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      categoryList: []
    }
  },
  computed: {
    ...mapGetters([
      'merchantId'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCategoryList(this.merchantId)
        .then(response => {
          const { content } = response.data.categoryList
          this.categoryList = content
        })
        .catch(error => {
          this.$message.error(error)
        })
    }
  }
}

</script>
