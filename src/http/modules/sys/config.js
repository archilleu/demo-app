import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 系统配置模块
 */

// 添加
export async function add (data) {
  return axios({
    url: `${baseUrl}/config/add`,
    method: 'post',
    data
  })
}

// 修改
export async function edit (data) {
  let url = `${baseUrl}/config/${data.id}`
  return axios({
    url,
    method: 'put',
    data
  })
}

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/config/${id}`,
    method: 'delete',
  })
}

// 批量删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/config/delete`,
    method: 'delete',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/config/list`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
