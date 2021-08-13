import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 操作日志模块
 */

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/login-log/${id}`,
    method: 'delete',
  })
}

// 删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/login-log/delete`,
    method: 'delete',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/login-log/list`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
