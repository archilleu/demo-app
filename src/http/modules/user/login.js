import axios from '../../axios'
import { baseUrl } from '../user/api'

/*
 * 系统登录模块
 */

// 登录
export async function login (data) {
  return axios({
    url: `${baseUrl}/login`,
    method: 'post',
    data
  })
}

// 登出
export async function logout () {
  return axios({
    url: `${baseUrl}/logout`,
    method: 'get'
  })
}
