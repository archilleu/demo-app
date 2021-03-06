import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 操作日志模块
 */

// 删除
export async function del (data) {
  return batchDelete([data])
}

// 删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/log/delete`,
    method: 'post',
    data
  })
}
// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/log/findPage`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
