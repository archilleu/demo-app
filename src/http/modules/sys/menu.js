import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 菜单管理模块
 */

// 保存
export async function save (data) {
  return axios({
    url: `${baseUrl}/menu/save`,
    method: 'post',
    data
  })
}

// 删除
export async function del (id) {
  batchDelete([id])
}

// 批量删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/menu/delete`,
    method: 'post',
    data
  })
}
// 查找导航菜单树
export async function findNavTree (params) {
  return axios({
    url: `${baseUrl}/menu/findNavTree`,
    method: 'get',
    params
  })
}
// 查找导航菜单树
export async function findMenuTree (data = {}) {
  return axios({
    url: `${baseUrl}/menu/findMenuTree`,
    method: 'post',
    data: {
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
