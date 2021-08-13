import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 角色管理模块
 */

// 添加
export async function add (data) {
  return axios({
    url: `${baseUrl}/role/add`,
    method: 'post',
    data
  })
}

// 修改
export async function edit (data) {
  let url = `${baseUrl}/role/${data.id}`
  return axios({
    url,
    method: 'put',
    data
  })
}

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/role/${id}`,
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

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/role/list`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}

// 查询全部
export async function findAll (data) {
  return axios({
    url: `${baseUrl}/role/list-all`,
    method: 'get'
  })
}

// 查询角色菜单集合
export async function findRoleMenus (id) {
  return axios({
    url: `${baseUrl}/role/${id}/menus`,
    method: 'get',
  })
}

// 保存角色菜单集合
export async function saveRoleMenus (data) {
  return axios({
    url: `${baseUrl}/role/save-menus`,
    method: 'post',
    data
  })
}
