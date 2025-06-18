//import './assets/main.css'
//不注释样式显示有问题

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入组件
import ElementPlus from 'element-plus'
//引入样式
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
//挂载组件
app.use(ElementPlus)

app.mount('#app')
