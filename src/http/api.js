/*
 * 接口统一集成模块
 */

// 系统模块
import sys from './modules/sys/api'

// 用户模块
import user from './modules/user/api'

// 默认全部导出
export default {
  sys,
  user
}
