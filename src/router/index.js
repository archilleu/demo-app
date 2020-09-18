import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Intro from '@/components/Intro/Intro'
import Account from '@/components/Intro/Account'
import api from '@/http/api'
import store from '@/store'
import { getToken } from '@/utils/token'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: '主页',
          component: Intro,
          meta: {
            name: '主页',
            icon: 'fa fa-home fa-lg',
            index: 0,
            closable: false
          }
        },
        {
          path: '/account',
          name: '系统用户',
          component: Account,
          meta: {
            name: '系统用户',
            icon: 'fa fa-user-o',
            index: 0,
            closable: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (to.path === '/login') {
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!token) {
      next({ path: '/login' })
    } else {
      next()
      await addDynamicMenuAndRoutes()
    }
  }
})

/**
* 加载动态菜单和路由
*/
async function addDynamicMenuAndRoutes () {
  if (store.state.app.menuRouteLoaded) {
    return
  }
  try {
    // 获取导航树
    const res = await api.user.menu.findNavTree()
    // 因为加载过程有等待，防止等待过程中二次调用
    if (store.state.app.menuRouteLoaded) {
      return
    }

    const dynamicRoutes = buildDynamicRoutes(res.data)
    router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
    router.addRoutes(router.options.routes)

    // 加载权限(可以从token还原，不需要向后台获取)
    const token = getToken()
    const jwt = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1]))))
    const authorities = jwt.authorities.map(item => item.authority)
    store.commit('setPerms', authorities)

    // 提交加载动态路由完毕状态
    store.commit('menuRouteLoaded', true)
    store.commit('setNavTree', res.data)
  } catch (e) {
    console.error(e)
  }
}

/**
* 构建菜单的动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function buildDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      // 包含子菜单，需要递归调用
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) { /* /\S/ 匹配非空白字符 */
      // url有效并且不是空白字符串

      // 分离url参数
      const urlParams = menuList[i].url.replace(/^\//, '').split('?')
      menuList[i].url = urlParams[0]
      const params = {}
      if (urlParams[1]) {
        var paramsArr = this._.split(urlParams[1], '&')
        _.forEach(paramsArr, function (item) {
          var key = this._.split(item, '=')[0]
          var value = this._.split(item, '=')[1]
          params[key] = value
        })
      }

      // 创建路由配置
      const route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name, // FIXME:命名路由可能存在潜在冲突
        meta: {
          name: menuList[i].name,
          icon: menuList[i].icon,
          index: menuList[i].id,
          closable: true,
          params
        }
      }
      try {
        if (/^http[s]?:\/\/.*/.test(menuList[i].url)) {
          route.path = `/${route.path}`
          route.component = resolve => require(['@/components/ZCore/IFrame/IFrame'], resolve)
        } else {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/components/sys/user.vue",否则组件加载不到
          const array = menuList[i].url.split('/')
          let url = ''
          for (let i = 0; i < array.length; i++) {
          // 路径第一个字符大写，用来标识路径
            url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route.component = resolve => require([`@/components/${url}`], resolve)
        }
      } catch (e) {}

      routes.push(route)
    }
  }

  // 包含子菜单，需要递归调用
  if (temp.length >= 1) {
    buildDynamicRoutes(temp, routes)
  }

  return routes
}

export default router
