import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 用户管理模块
 */

// 保存
export async function save (data) {
  return axios({
    url: `${baseUrl}/user/save`,
    method: 'post',
    data
  })
}

// 删除
export async function del (data) {
  return batchDelete([data])
}

// 删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/user/delete`,
    method: 'post',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/user/findPage`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}

// 查找用户的菜单权限标识集合
export async function findPermissions (params) {
  return axios({
    url: `${baseUrl}/user/findPermissions`,
    method: 'get',
    params
  })
}

// 修改用户角色
export async function saveUserRoles (data) {
  return axios({
    url: `${baseUrl}/user/saveUserRoles`,
    method: 'post',
    data
  })
}
