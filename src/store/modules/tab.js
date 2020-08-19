export default {
  state: {
    // 标签页
    mainTabs: [{
      name: '主页',
      title: '主页',
      icon: 'fa fa-home fa-lg',
      path: '/',
      closable: false
    }],

    // 当前标签页
    mainTabsActiveName: '主页'
  },

  mutations: {
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },

    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    }
  }
}
