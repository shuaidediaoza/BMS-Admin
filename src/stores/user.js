//状态管理
import { defineStore } from 'pinia'
import { login,register } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user:null,
    //token: localStorage.getItem('token') || null
  }),
  actions: {
    async userRegister(userData) {

        const response = await register(userData);
        // 处理注册成功逻辑

        return response;
    },

    async userLogin(credentials) {

      //data外不要加{}
        const data = await login(credentials);
        //this.token = data.token;

        this.user = data.data;

        // 存储token
       //localStorage.setItem('token', data.token);
        return data;
      },
    },

    logout() {
      //this.token = null;
      this.user = null;
      //localStorage.removeItem('token');
    }

  }
)
