import axios from 'axios'
import { storage } from '@/utils'
// axios.defaults.baseURL = 'http://localhost:8080'
// 请求拦截
axios.interceptors.request.use(async (config) => {
  const urls = config.url.split('/')
  if (urls[3] !== 'educator_login' && urls[4] !== 'register') {
    const token = storage.getItem('educatortoken')
    config.headers.token = token
  }
  return config
})
export default axios
