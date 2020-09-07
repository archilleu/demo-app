import _ from 'lodash'
import { baseUrl } from '../user/api'
import axios from '../../axios'

/*
 * 用户资源模块
 */

// 查找导航菜单树
export async function findNavTree () {
  return axios({
    url: `${baseUrl}/menu/findNavTree`,
    method: 'get'
  })
}
