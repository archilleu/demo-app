import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 角色管理模块
 */

// 保存
export async function save (data) {
  return axios({
    url: `${baseUrl}/role/save`,
    method: 'post',
    data
  })
}

// 删除
export async function del (data) {
  return batchDelete([data])
}

// 批量删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/role/delete`,
    method: 'post',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/role/findPage`,
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
    url: `${baseUrl}/role/findAll`,
    method: 'get'
  })
}

// 查询角色菜单集合
export async function findRoleMenus (params) {
  return axios({
    url: `${baseUrl}/role/findRoleMenus`,
    method: 'get',
    params
  })
}

// 保存角色菜单集合
export async function saveRoleMenus (data) {
  return axios({
    url: `${baseUrl}/role/saveRoleMenus`,
    method: 'post',
    data
  })
}
