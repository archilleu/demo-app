/*
 * 操作日志模块
 */

export function batchDelete () {
  return {
    url: 'sys/login-log/delete',
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
  userName: 'admin',
  operation: 'operation',
  method: 'com.hoya.controller.SysUserController.findPage',
  params: '{"pageNum":"1","pageSize":"8"}',
  time: 12,
  ip: '127.0.0.1',
  remark: 'remark log',
  createBy: 'admin',
  createTime: new Date()
}

// 分页查询
export function findPage (params) {
  return {
    url: 'sys/log/findPage',
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
            userName: opts.body.params.userName + Math.ceil(Math.random() * 20)
          })
        })
      } else {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            userName: 'admin' + id
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
