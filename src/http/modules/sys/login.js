import axios from '../../axios'

/*
 * 系统登录模块
 */

// 登录
export async function login (data) {
  return await axios({
    url: 'login',
    method: 'post',
    data
  })
}

// 登出
export async function logout () {
  return await axios({
    url: 'logout',
    method: 'get'
  })
}
