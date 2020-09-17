/*
 * 字典管理模块
 */
let id = 1
const initData = {
  page: 1,
  rows: 10,
  totalSize: 2,
  totalPages: 1,
  content: [
    {
      id: id++,
      createBy: 'admin',
      createTime: new Date(),
      lastUpdateBy: null,
      lastUpdateTime: null,
      value: 'male',
      label: '男',
      type: 'sex',
      description: '性别',
      sort: 0,
      remarks: '性别',
      delFlag: 0
    },
    {
      id: id++,
      createBy: 'admin',
      createTime: new Date(),
      lastUpdateBy: null,
      lastUpdateTime: null,
      value: 'female',
      label: '女',
      type: 'sex',
      description: '性别',
      sort: 1,
      remarks: '性别',
      delFlag: 0
    }
  ]
}

// 保存
export function save () {
  return {
    url: 'sys/dict/save',
    type: 'post',
    data: {
      code: 200,
      msg: null
    },
    callback (opts) {
      const data = opts.body
      data.id = data.id ? data.id : id++
      data.createBy = 'admin'
      data.createTime = new Date()
      data.lastUpdateBy = 'admin'
      data.lastUpdateTime = new Date()
      data.delFlag = 0
      return {
        code: 200,
        msg: null,
        data: opts.body
      }
    }
  }
}
// 批量删除
export function batchDelete () {
  return {
    url: 'sys/dict/delete',
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
    url: 'sys/dict/findPage',
    type: 'post',
    callback (opts) {
      const size = 10
      const res = Object.assign({}, initData)
      if (opts.body.params.label) {
        res.totalSize = size
        res.content = Array.from({ length: size }).map(item => {
          return {
            id: id++,
            createBy: 'admin',
            createTime: new Date(),
            lastUpdateBy: null,
            lastUpdateTime: null,
            value: 'male',
            label: opts.body.params.label + Math.ceil(Math.random() * 10),
            type: 'sex',
            description: '性别',
            sort: 0,
            remarks: '性别',
            delFlag: 0
          }
        })
      }
      return {
        code: 200,
        msg: null,
        data: res
      }
    }
  }
}
