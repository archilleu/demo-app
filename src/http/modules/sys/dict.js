import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 字典管理模块
 */

// 添加
export async function add (data) {
  return axios({
    url: `${baseUrl}/dict/add`,
    method: 'post',
    data
  })
}

// 修改
export async function edit (data) {
  let url = `${baseUrl}/dict/${data.id}`
  return axios({
    url,
    method: 'put',
    data
  })
}

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/dict/${id}`,
    method: 'delete',
  })
}

// 删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/dict/delete`,
    method: 'delete',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/dict/list`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
