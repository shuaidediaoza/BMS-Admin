<script setup>
// import login from "./views/BMS-login.vue"
// import register from "./views/BMS-register.vue"
// import home from "./views/Home-Page.vue"
</script>

<template>
  <!-- <login></login>
  是手动指定了登录页面组件始终显示，
  而不是通过路由来决定该显示哪个页面。
  这样，哪怕你调用了 router.push('/register')，也不会生效。 -->
  <!-- <register></register> -->

  <router-view></router-view>
   <!-- <home></home> -->
</template>

<style scoped></style>
