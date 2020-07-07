import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Intro from '@/components/Intro/Intro'
import Account from '@/components/Intro/Account'
import Feedback from '@/components/Intro/Feedback'
import api from '@/http/api'
import store from '@/store'
import Cookies from "js-cookie";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: '首页',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        },
        {
          path: '/account',
          name: '系统用户',
          component: Account,
          meta: {
            icon: 'el-icon-chat-round',
            index: 0
          }
        },
        {
          path: '/feedback',
          name: '用户反馈',
          component: Feedback,
          meta: {
            icon: 'el-icon-switch-button',
            index: 0
          }
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = Cookies.get('token')
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
      let userName = sessionStorage.getItem('user')
      addDynamicMenuAndRoutes(userName, to, from)
      next();
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userName, to, from) {
  if (store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.menu.findNavTree({ 'userName': userName })
    .then(res => {
      // 添加动态路由
      let dynamicRoutes = buildDynamicRoutes(res.data)
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.addRoutes(router.options.routes)
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      // 保存菜单树
      store.commit('setNavTree', res.data)
    }).then(res => {
      api.user.findPermissions({ 'name': userName }).then(res => {
        // 保存用户权限标识集合
        store.commit('setPerms', res.data)
      })
    })
    .catch(function (res) {
    })
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
* 构建菜单的动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function buildDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {/* /\S/ 匹配非空白字符 */
      menuList[i].url = menuList[i].url.replace(/^\//, '') /* /^\// 去掉第一个斜杠 */
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = ''
        for (let i = 0; i < array.length; i++) {
          url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
        }
        url = url.substring(0, url.length - 1)
        route['component'] = resolve => require([`@/components/${url}`], resolve)
      } catch (e) { }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    buildDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router