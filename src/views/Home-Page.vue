<script setup>
import {  useRouter  } from 'vue-router';

const router = useRouter()

const WH = ()=>{
  router.push('/WareHouse')
}

const SS = ()=>{
  router.push('/ShopStatus')
}

const HR = ()=>{
  router.push('/Human-Resource')
}

// const homepage = ()=>{
//   router.push('/home-page')
// }


// 这里可以添加逻辑，例如按钮点击事件
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <!-- <button class="nav-button" @click="homepage">首页</button> -->
      <button class="nav-button" @click="WH">仓库</button>
      <button class="nav-button" @click="SS">店铺</button>
      <button class="nav-button" @click="HR">人事</button>
    </div>
    <div class="content">
      <!-- 这里可以放置其他内容 -->
      <h1>欢迎来到后台管理系统</h1>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex; /* 使用 Flexbox 布局 */
  height: 100vh; /* 充满整个视口高度 */
}

.sidebar {
  width: 200px; /* 侧边栏宽度 */
  background-color: #f0f0f0; /* 侧边栏背景颜色 */
  padding: 20px; /* 内边距 */
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: flex-start; /* 左对齐 */
  border-radius: 30px;/* 圆角 */
}

.nav-button {
  width: 100%; /* 按钮宽度 */
  padding: 15px; /* 按钮内边距 */
  margin: 10px 0; /* 按钮间距 */
  border: 2px solid #000; /* 边框 */
  border-radius: 20px; /* 圆角 */
  background-color: #fff; /* 背景颜色 */
  font-size: 16px; /* 字体大小 */
  cursor: pointer; /* 鼠标指针样式 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
}

.nav-button:hover {
  background-color: #e0e0e0; /* 悬停时的背景颜色 */
}

.content {
  flex: 1; /* 占据剩余空间 */
  padding: 20px; /* 内边距 */
  background-color: #fff; /* 内容区域背景颜色 */
  border-radius: 5px;
}
</style>