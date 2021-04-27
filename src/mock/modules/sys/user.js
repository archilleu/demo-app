/*
 * 用户管理模块
 */

import { random } from "core-js/core/number"

// 保存
export function save () {
  return {
    url: 'sys/user/save',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data: 1
    },
    callback (opts) {
      const data = opts.body
      const ret = Object.assign({}, initData, { ...data })
      ret.id = data.id ? data.id : id++
      return {
        code: 200,
        msg: null,
        data: ret
      }
    }
  }
}
// 批量删除
export function batchDelete () {
  return {
    url: 'sys/user/delete',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data: 1
    }
  }
}

let id = 1
const initData = {
  id: 1,
  createBy: 'admin',
  createTime: new Date(),
  lastUpdateBy: 'admin',
  lastUpdateTime: new Date(),
  name: 'name',
  nickName: 'nickName',
  avatar: null,
  password: 'fd80ebd493a655608dc893a9f897d845',
  salt: 'YzcmCZNvbXocrsz9dm8e',
  email: '@qq.com',
  mobile: '13889700023',
  status: 1,
  deptId: 7,
  delFlag: 0,
  deptName: 'deptName',
  roles: [{
    id: 10,
    name: 'name',
    remark: Math.ceil(Math.random() * 4)
  }]
}

// 分页查询
export function findPage (params) {
  return {
    url: 'sys/user/findPage',
    type: 'post',
    callback (opts) {
      const ret = {
        page: 1,
        rows: 20,
        totalSize: 25,
        totalPages: 2,
        content: []
      }

      if (opts.body.params.name || opts.body.params.email) {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            name: opts.body.params.name + Math.ceil(Math.random() * 20),
            email: opts.body.params.email + Math.ceil(Math.random() * 20),
            roles: [{ id: id, name: 'name'+Math.random(), remark:'remark'+Math.random(), roleId: Math.ceil(Math.random() * 3) }]
          })
        })
      } else {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            name: initData.name + id,
            email: id + initData.email,
            nickName: initData.nickName + id,
            roles: [{ id: id, name: 'name'+Math.random(), remark:'remark'+Math.random(), roleId: Math.ceil(Math.random() * 3) }]
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
