import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/api',
  timeout: 5000 // request timeout
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 请求头token
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
