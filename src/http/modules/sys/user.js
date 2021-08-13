import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 用户管理模块
 */

// 添加
export async function add (data) {
  return axios({
    url: `${baseUrl}/user/add`,
    method: 'post',
    data
  })
}

// 修改
export async function edit (data) {
  let url = `${baseUrl}/user/${data.id}`
  return axios({
    url,
    method: 'put',
    data
  })
}

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/user/${id}`,
    method: 'delete',
  })
}

// 删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/user/delete`,
    method: 'delete',
    data
  })
}

// 修改密码
export async function modifyPassword(data) {
  return axios({
    url: `${baseUrl}/user/${data.id}/password`,
    method: 'put',
    data: {
      password: data.password
    }
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/user/list`,
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
    url: `${baseUrl}/user/save-user-roles`,
    method: 'post',
    data
  })
}
