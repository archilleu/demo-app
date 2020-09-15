/**
 * 用户模块
 */
import * as login from '../user/login'
import * as menu from './menu'
import * as permission from './permission'

export default {

  login,
  menu,
  permission
}

export const baseUrl = 'user'
