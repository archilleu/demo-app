import _ from 'lodash'
import { baseUrl } from './api'
import axios from '../../axios'

/*
 * 用户资源模块
 */

// 查找导航菜单树
export async function list () {
  return axios({
    url: `${baseUrl}/findPermission`,
    method: 'get'
  })
}
