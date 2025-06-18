<template>
  <div class="container">
    <div class="card">
      <div class="item">
        <span class="label">总营业额</span>
        <span class="value">123</span>
      </div>
      <div class="item">
        <span class="label">总利润</span>
        <span class="value">123</span>
      </div>
      <div class="item">
        <span class="label">成本</span>
        <span class="value">123</span>
      </div>
      <div class="item">
        <span class="label">仓库</span>
        <span class="value">50%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加逻辑代码
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器填满整个视口 */
  background-color: #f0f0f0; /* 背景颜色 */
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px; /* 卡片宽度 */
}

.item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0; /* 每个项之间的间距 */
}

.label {
  font-weight: bold; /* 标签加粗 */
}

.value {
  color: #333; /* 值的颜色 */
}
</style>