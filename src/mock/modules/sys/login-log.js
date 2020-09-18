/*
 * 登录日志模块
 */

export function batchDelete () {
  return {
    url: 'sys/log/delete',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data: 1
    }
  }
}

let id = 0
const initData = {
  id: 1,
  createBy: 'admin',
  createTime: new Date(),
  lastUpdateBy: new Date(),
  lastUpdateTime: new Date(),
  userName: 'admin',
  status: 'login',
  ip: '0:0:0:0:0:0:0:1'
}

// 分页查询
export function findPage (params) {
  return {
    url: 'sys/login-log/findPage',
    type: 'post',
    callback (opts) {
      const ret = {
        page: 1,
        rows: 20,
        totalSize: 25,
        totalPages: 2,
        content: []
      }

      if (opts.body.params.userName || opts.body.params.status) {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            userName: opts.body.params.userName + Math.ceil(Math.random() * 20),
            status: Math.random() > 0.5 ? 'login' : 'logout'
          })
        })
      } else {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            userName: 'admin',
            status: Math.random() > 0.5 ? 'login' : 'logout'
          })
        })
      }
      return {
        code: 200,
        msg: null,
        data: ret
      }
    }
  }
}
