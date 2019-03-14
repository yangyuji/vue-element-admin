import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '/cas-admin-app',
  timeout: 15000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Admin-Token'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '0000') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
      }
      // 后端接口返回错误
      console.log('api error: ' + res)
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('http error: ', error)
    // http协议错误
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
