import axios from 'axios'
import { storage } from '@/utils'
// axios.defaults.baseURL = 'http://192.168.1.101:8081'
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
