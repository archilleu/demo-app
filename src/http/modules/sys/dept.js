import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 机构管理模块
 */

// 保存
export async function save (data) {
  return axios({
    url: `${baseUrl}/dept/save`,
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
    url: `${baseUrl}/dept/delete`,
    method: 'post',
    data
  })
}

// 查询机构树
export async function findDeptTree (data = {}) {
  return axios({
    url: `${baseUrl}/dept/findTree`,
    method: 'post',
    data: {
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
