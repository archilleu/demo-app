// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import api from './http'
import global from '@/utils/global'
import message from '@/utils/message'

/* eslint-disable no-unused-vars */
import mock from '@/mock/index.js'

import _ from 'lodash'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.prototype.global = global

Vue.prototype._ = _

// 启用ElementUI
Vue.use(ElementUI)

// 启用api插件
Vue.use(api)

Vue.use(message)

// 在store中关联router
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
