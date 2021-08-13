/*
 * 字典管理模块
 */
let id = 1
const initData = {
  id: id++,
  createBy: 'admin',
  createTime: new Date(),
  lastUpdateBy: new Date(),
  lastUpdateTime: new Date(),
  value: 'male',
  label: '男',
  type: 'sex',
  description: '性别',
  sort: 0,
  remarks: '性别',
  delFlag: 0
}

export function add () {
  return {
    url: 'sys/dict/add',
    type: 'post',
    data: {
      code: 200,
      msg: null,
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

export function edit () {
  return {
    url: `sys/dict/*`,
    type: 'put',
    data: {
      code: 200,
      msg: null,
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

// 删除
export function del () {
  return {
    url: `sys/dict/*`,
    type: 'delete',
    data: {
      code: 200,
      msg: null,
      data: 1
    }
  }
}

// 批量删除
export function batchDelete (data) {
  return {
    url: 'sys/dict/delete',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data
    }
  }
}

// 分页查询
export function findPage (params) {
  return {
    url: 'sys/dict/list',
    type: 'post',
    callback (opts) {
      const ret = {
        page: 1,
        rows: 20,
        totalSize: 25,
        totalPages: 2,
        content: []
      }
      if (opts.body.params.label) {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            label: opts.body.params.label + Math.ceil(Math.random() * 20)
          })
        })
      } else {
        ret.content = Array.from({ length: ret.rows }).map(item => {
          return Object.assign({}, initData, {
            id: id++,
            label: initData.label + Math.ceil(Math.random() * 20)
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
