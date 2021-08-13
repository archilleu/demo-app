/*
 * 系统配置模块
 */

let id = 1
const initData = {
  id: 1,
  createBy: 'admin',
  createTime: new Date(),
  lastUpdateBy: null,
  lastUpdateTime: null,
  value: '#14889A',
  label: 'theme',
  type: 'color',
  description: '主题色',
  sort: 0,
  remarks: '主题色',
  delFlag: 0
}

export function add () {
  return {
    url: 'sys/config/add',
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
    url: `sys/config/*`,
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
    url: `sys/config/*`,
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
    url: 'sys/config/delete',
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
    url: 'sys/config/list',
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
