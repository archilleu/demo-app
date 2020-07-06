// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import store from './store'
import { sync } from 'vuex-router-sync'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import * as filters from '@/filter'

Vue.config.productionTip = false
Vue.prototype.global = global

for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(ElementUI)
Vue.use(api)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
