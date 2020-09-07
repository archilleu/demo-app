import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 系统配置模块
 */

// 保存
export async function save (data) {
  return axios({
    url: `${baseUrl}/config/save`,
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
    url: `${baseUrl}/config/delete`,
    method: 'post',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/config/findPage`,
    method: 'post',
    data: {
      ...data.pageRequest,
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
