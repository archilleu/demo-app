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
export async function del (data) {
  return batchDelete([data])
}

// 批量删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/menu/delete`,
    method: 'post',
    data
  })
}
// 获取菜单树
export async function getMenuTree (data = {}) {
  return axios({
    url: `${baseUrl}/menu/getMenuTree`,
    method: 'post',
    data: {
      params: {
        ..._.pickBy(data.filters, _.identity)
      }
    }
  })
}
