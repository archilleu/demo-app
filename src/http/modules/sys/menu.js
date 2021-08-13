import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 菜单管理模块
 */

// 添加
export async function add (data) {
  return axios({
    url: `${baseUrl}/menu/add`,
    method: 'post',
    data
  })
}

// 修改
export async function edit (data) {
  let url = `${baseUrl}/menu/${data.id}`
  return axios({
    url,
    method: 'put',
    data
  })
}

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/menu/${id}`,
    method: 'delete',
  })
}

// 删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/menu/delete`,
    method: 'delete',
    data
  })
}

// 获取菜单树
export async function getMenuTree (data = {}) {
  return axios({
    url: `${baseUrl}/menu/tree`,
    method: 'get',
    data: {
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
