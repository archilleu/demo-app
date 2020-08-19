/**
 * api插件
 */
import api from './api'

export default {
  install (Vue, options) {
    Object.defineProperties(Vue.prototype, {
      $api: {
        get () {
          return api
        }
      }
    })
  }
}
