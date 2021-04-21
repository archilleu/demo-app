import axios from 'axios'
import config from './config'
import { getToken, clearToken } from '@/utils/token'
import router from '@/router'

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })
    // request 请求拦截器
    instance.interceptors.request.use(
      config => {
        const token = getToken()
        // 发送请求时携带token
        if (token) {
          config.headers.token = token
        } else {
          // 重定向到登录页面
          if (router.currentRoute.path !== '/login') {
            router.push('/login')
          }
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // response 响应拦截器
    instance.interceptors.response.use(
      response => {
        return response.data
      },
      err => {
        // 请求超时
        if (err.code === 'ECONNABORTED') {
          console.error('请求超时')
          const res = {
            status: -1,
            message: '请求超时'
          }
          return Promise.reject(JSON.stringify(res))
        }
        // 网络不可达
        if (err.message.indexOf('Network Error') !== -1) {
          console.error('网络不可达:' + err)
          const res = {
            status: -2,
            message: '网络不可达'
          }
          return Promise.reject(JSON.stringify(res))
        }

        // 响应空内容
        if (!err.response) {
          err.response = {}
          err.response.status = -1
          err.response.message = '未知错误'
        } else {
          if (err.response) {
            if (err.response.status === 401) {
              clearToken()
              if (router.currentRoute.path === '/login') {
                return
              }

              router.push('/login')
            }
          }
        }

        // 返回接口返回的错误信息
        if (!err.response.data.data) {
          delete err.response.data.data
        }
        return Promise.reject(JSON.stringify(err.response.data))
      }
    )
    // 请求处理
    instance(options).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
