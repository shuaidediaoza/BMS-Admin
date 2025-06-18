<template>
  <div class="container">
    <div class="register-box">
      <div class="title">
        注册账户
      </div>
      <el-form>
        <el-form-item>
          <el-input
            v-model="username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="email"
            placeholder="请输入邮箱"
            prefix-icon="Message"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="register-button"
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-link">已有账号，<router-link to="/BMS-login">立即登录</router-link></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'  // 导入用户状态管理
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()  // 初始化用户store

// 表单数据
const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)  // 添加加载状态

const register = async () => {
  // 表单验证
  if (!username.value.trim()) {
    ElMessage.warning('用户名不能为空')
    return
  }

  if (!email.value.trim()) {
    ElMessage.warning('邮箱不能为空')
    return
  }

  if (!password.value) {
    ElMessage.warning('密码不能为空')
    return
  }

  // 简单的邮箱格式验证
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // if (!emailRegex.test(email.value)) {
  //   ElMessage.warning('请输入有效的邮箱地址')
  //   return
  // }

  // 密码长度验证
  // if (password.value.length < 6) {
  //   ElMessage.warning('密码长度至少为6位')
  //   return
  // }

  try {
    loading.value = true  // 开始加载

    // 准备注册数据
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    // 调用store中的注册方法
    const response = await userStore.userRegister(userData)

    // 注册成功处理
    if (response && response.code === 200) {  // 根据实际API响应结构调整
      ElMessage.success('注册成功！')

      // 自动填充登录表单（可选）
      // router.push({
      //   name: 'Login',
      //   query: {
      //     username: username.value,
      //     email: email.value
      //   }
      // })

      // 或者直接跳转到登录页
      router.push('/BMS-login')
    } else {
      // 处理API返回的错误信息
      const errorMsg = response.message || '注册失败，请稍后重试'
      ElMessage.error(errorMsg)
    }
  } catch (error) {
    // 处理网络错误或异常
    console.error('注册异常:', error)
    ElMessage.error('注册失败: ' + (error.message || '网络错误'))
  } finally {
    loading.value = false  // 结束加载
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/images/login-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  padding: 16px;
}

.register-box {
  background: rgba(205, 84, 175, 0);
  padding: 40px;
  border: 2px solid #1749b4;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  color: #000;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #1749b4;
  padding: 10px;
  border-radius: 10px;
  background-image: linear-gradient(to right, #ba239c, #0015ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.register-button {
  width: 100%;
  background-color: rgb(31, 162, 199) !important;
  border: 2px solid #000 !important;
}

.login-link {
  margin-top: 15px;
  font-size: 14px;
  color: #1749b4;
}

.login-link a {
  color: #940fd6;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

:deep(.el-input__wrapper) {
  background: rgba(205, 84, 175, 0);
  box-shadow: 0 0 0 2px #1749b4 inset;
  border-radius: 10px;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 2px #1749b4 inset;
}

:deep(.el-input__inner) {
  color: #1749b4;
}

:deep(.el-input__prefix) {
  color: #1749b4;
}
</style>