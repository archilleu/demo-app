import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 机构管理模块
 */

// 添加
export async function add (data) {
  return axios({
    url: `${baseUrl}/dept/add`,
    method: 'post',
    data
  })
}

// 修改
export async function edit (data) {
  let url = `${baseUrl}/dept/${data.id}`
  return axios({
    url,
    method: 'put',
    data
  })
}

// 删除
export async function del (id) {
  return axios({
    url: `${baseUrl}/dept/${id}`,
    method: 'delete',
  })
}

// 批量删除
export async function batchDelete (data) {
  return axios({
    url: `${baseUrl}/dept/delete`,
    method: 'delete',
    data
  })
}

// 查询机构树
export async function findByParentId (id) {
  let res = await axios({
    url: `${baseUrl}/dept/${id}/children`,
    method: 'get'
  })

  const depts = res.data
  for(let item of depts) {
    item.hasChildren = true
  }

  return res
}

// 查询整颗机构树
export async function getTree () {
  return axios({
    url: `${baseUrl}/dept/tree`,
    method: 'get'
  })
}
