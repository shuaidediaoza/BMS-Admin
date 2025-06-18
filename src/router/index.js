import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //默认加载页面
    // {
    //   path: '/',
    //   redirect: '/BMS-login', // 默认跳转到登录页面
    // },

    //根据登录状态进行页面跳转
    {
      path: '/',
      name: 'root',
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        if (userStore.isLoggedIn) {
          next('/home') // 已登录跳到主页
        } else {
          next('/BMS-register') // 未登录跳到登录页
        }
      }
    },

    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home-Page.vue')
    },

    {
      path: '/BMS-register',
      name: 'BMS-register',
      component: () => import('@/views/Login&Register/BMS-register.vue'),
    },

    {
      path: '/BMS-login',
      name: 'BMS-login',
      component: () => import('@/views/Login&Register/BMS-login.vue'),
    },

    {
      path: '/home-page',
      name: 'home-page',
      component: () => import('@/views/Pages/home-page.vue')
    },

    {
      path: '/Human-Resource',
      name: 'Human-Resource',
      component: () => import('@/views/Pages/Human-Resource.vue')
    },

    {
      path: '/ShopStatus',
      name: 'ShopStatus',
      component: () => import('@/views/Pages/ShopStatus.vue')
    },

    {
      path: '/WareHouse',
      name: 'WareHouse',
      component: () => import('@/views/Pages/WareHouse.vue')
    },



  ],
})

export default router