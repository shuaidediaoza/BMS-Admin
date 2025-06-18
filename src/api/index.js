import axios from "axios";

//基础配置
const service = axios.create({
  baseURL:"http://localhost:8080/",
  timeout:5000
})

//请求拦截器
service.interceptors.request.use(conf =>{
  return conf;
},error => Promise.reject(error))

//响应拦截器
service.interceptors.response.use(response => response.data,
  error => {
    // 统一处理错误
    return Promise.reject(error.response?.data || '请求失败');
  } )

//导出
export default service