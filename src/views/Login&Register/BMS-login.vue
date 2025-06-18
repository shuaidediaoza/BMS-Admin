<template>
  <div class="container">
    <div class="login-box">
      <div class="title">
        登录界面
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
           class="login-button"
           @click="login"
           :loading="loading"
           :disabled="loading"
          >
          {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        没有账号，<router-link to="/BMS-register">立即注册</router-link>
        <RouterView></RouterView>
      </div>
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
const password = ref('')
const loading = ref(false)  // 添加加载状态

const login = async () => {
  // 基本表单验证
  if (!username.value.trim()) {
    ElMessage.warning('用户名不能为空')
    return
  }

  if (!password.value) {
    ElMessage.warning('密码不能为空')
    return
  }

  // 密码长度验证
  // if (password.value.length < 6) {
  //   ElMessage.warning('密码长度至少为6位')
  //   return
  // }

  try {
    loading.value = true  // 开始加载

    // 准备登录凭证
    const credentials = {
      username: username.value,
      password: password.value
    }

    // 调用store中的登录方法
    const response = await userStore.userLogin(credentials)
    console.log(response)
    // 登录成功处理
    if (response && response.code==200) {  // 根据实际API响应结构调整
      ElMessage.success('登录成功！')

      // 跳转到首页或其他目标页面
      router.push('/home')
    } else {
      // 处理API返回的错误信息
      const errorMsg = response?.message || '登录失败，请检查用户名和密码'
      ElMessage.error(errorMsg)
    }
  } catch (error) {
    // 处理网络错误或异常
    console.error('登录异常:', error)
    ElMessage.error('登录失败: ' + (error.message || '网络错误'))
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

.login-box {
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

.login-button {
  width: 100%;
  background-color: rgb(31, 162, 199) !important;
  border: 2px solid #000 !important;
}

.register-link {
  margin-top: 15px;
  font-size: 14px;
  color: #1749b4;
}

.register-link a {
  color: #940fd6;
  text-decoration: none;
}

.register-link a:hover {
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
