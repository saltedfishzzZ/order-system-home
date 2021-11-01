<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h2>{{ action }}商品</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: ''
    }
  },
  created() {
  },
  methods: {}
}
</script>
