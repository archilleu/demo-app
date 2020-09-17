import Mock from 'mockjs'
import { baseURL } from '@/utils/global'
import user from './modules/user/api'
import sys from './modules/sys/api'

// 1. 开启/关闭[所有模块]拦截, 通过调[openMock参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 3. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
// const openMock = false
const openMock = true

fnCreate(user, openMock)
fnCreate(sys, openMock)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */

function fnCreate (mod, isOpen = true) {
  if (!isOpen) { return }

  console.log(mod)
  for (const item in mod) {
    const api = mod[item]
    for (const key in api) {
      ((res) => {
        if (res.isOpen === false) { return }

        let url = baseURL
        if (!url.endsWith('/')) {
          url = url + '/'
        }

        url = url + res.url
        Mock.mock(new RegExp(url), res.type, (opts) => {
          opts.body = opts.body ? JSON.parse(opts.body) : {}
          console.log('%c mock:req: ', 'color:blue', opts)
          console.log('%c mock:rep: ', 'color:blue', res.data)
          return (res.callback && res.callback(opts)) || res.data
        })
      })(api[key]() || {})
    }
  }
}
