import axios from 'axios'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
const request = (config) => {
  if (config.method?.toLocaleLowerCase() === 'get') {
    config.params = config.data
    delete config.data
  }
  return service.request(config)
}

export default request
