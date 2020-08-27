import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 字典管理模块
 */

// 保存
export async function save (data) {
  return axios({
    url: `${baseUrl}/dict/save`,
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
    url: `${baseUrl}/dict/delete`,
    method: 'post',
    data
  })
}

// 分页查询
export async function findPage (data) {
  return axios({
    url: `${baseUrl}/dict/findPage`,
    method: 'post',
    data: {
      ...data.pageRequest,
      ..._.pickBy(data.filters, _.identity)
    }
  })
}
