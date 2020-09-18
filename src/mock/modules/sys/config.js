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

// 保存
export function save () {
  return {
    url: 'sys/config/save',
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
    url: 'sys/config/delete',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data: 1
    }
  }
}
// 分页查询
export function findPage (params) {
  return {
    url: 'sys/config/findPage',
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
