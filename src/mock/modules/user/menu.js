// 获取导航菜单树
export function findNavTree () {
  const navTreeData = {
    code: 200,
    msg: null,
    data: [
      {
        id: 1,
        createBy: null,
        createTime: null,
        lastUpdateBy: null,
        lastUpdateTime: null,
        parentId: 0,
        name: '系统管理',
        url: null,
        perms: null,
        type: 0,
        icon: 'el-icon-setting',
        orderNum: 0,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: [
          {
            id: 2,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 1,
            name: '用户管理',
            url: '/sys/user',
            perms: null,
            type: 1,
            icon: 'el-icon-service',
            orderNum: 1,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 7,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 1,
            name: '机构管理',
            url: '/sys/dept',
            perms: null,
            type: 1,
            icon: 'el-icon-news',
            orderNum: 2,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 12,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 1,
            name: '角色管理',
            url: '/sys/role',
            perms: null,
            type: 1,
            icon: 'el-icon-view',
            orderNum: 4,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 17,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 1,
            name: '菜单管理',
            url: '/sys/menu',
            perms: null,
            type: 1,
            icon: 'el-icon-menu',
            orderNum: 5,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 22,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 1,
            name: '字典管理',
            url: '/sys/dict',
            perms: null,
            type: 1,
            icon: 'el-icon-edit-outline',
            orderNum: 7,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 27,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 1,
            name: '系统配置',
            url: '/sys/config',
            perms: null,
            type: 1,
            icon: 'el-icon-edit-outline',
            orderNum: 7,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 32,
            createBy: null,
            createTime: null,
            lastUpdateBy: 'admin',
            lastUpdateTime: '2018-09-23T11:32:28.000+0000',
            parentId: 1,
            name: '登录日志',
            url: '/sys/loginlog',
            perms: null,
            type: 1,
            icon: 'el-icon-info',
            orderNum: 8,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          },
          {
            id: 35,
            createBy: null,
            createTime: null,
            lastUpdateBy: 'admin',
            lastUpdateTime: '2018-09-23T11:32:28.000+0000',
            parentId: 1,
            name: '操作日志',
            url: '/sys/log',
            perms: null,
            type: 1,
            icon: 'el-icon-info',
            orderNum: 8,
            delFlag: 0,
            parentName: '系统管理',
            level: 1,
            children: []
          }
        ]
      },
      {
        id: 43,
        createBy: 'admin',
        createTime: '2018-12-27T03:05:48.000+0000',
        lastUpdateBy: 'admin',
        lastUpdateTime: '2018-12-27T03:06:39.000+0000',
        parentId: 0,
        name: '服务治理',
        url: '',
        perms: '',
        type: 0,
        icon: 'el-icon-service',
        orderNum: 2,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: [
          {
            id: 44,
            createBy: 'admin',
            createTime: '2018-11-03T03:06:48.000+0000',
            lastUpdateBy: 'admin',
            lastUpdateTime: '2018-12-27T03:08:11.000+0000',
            parentId: 43,
            name: '注册中心',
            url: 'http://127.0.0.1:8500',
            perms: null,
            type: 1,
            icon: ' el-icon-view',
            orderNum: 0,
            delFlag: 0,
            parentName: '服务治理',
            level: 1,
            children: []
          }
        ]
      },
      {
        id: 46,
        createBy: null,
        createTime: null,
        lastUpdateBy: 'admin',
        lastUpdateTime: '2018-12-27T03:04:18.000+0000',
        parentId: 0,
        name: '接口文档',
        url: 'http://127.0.0.1:8001/swagger-ui.html',
        perms: null,
        type: 1,
        icon: 'el-icon-document',
        orderNum: 3,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: []
      },
      {
        id: 38,
        createBy: 'admin',
        createTime: '2018-12-27T02:57:29.000+0000',
        lastUpdateBy: 'admin',
        lastUpdateTime: '2019-01-10T09:31:04.000+0000',
        parentId: 0,
        name: '系统监控',
        url: '',
        perms: '',
        type: 0,
        icon: 'el-icon-info',
        orderNum: 4,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: [
          {
            id: 39,
            createBy: null,
            createTime: null,
            lastUpdateBy: 'admin',
            lastUpdateTime: '2018-12-27T03:03:45.000+0000',
            parentId: 38,
            name: '数据监控',
            url: 'http://127.0.0.1:8001/druid/login.html',
            perms: null,
            type: 1,
            icon: 'el-icon-warning',
            orderNum: 0,
            delFlag: 0,
            parentName: '系统监控',
            level: 1,
            children: []
          },
          {
            id: 41,
            createBy: 'admin',
            createTime: '2018-11-02T12:02:15.000+0000',
            lastUpdateBy: 'admin',
            lastUpdateTime: '2018-12-27T03:03:53.000+0000',
            parentId: 38,
            name: '服务监控',
            url: 'http://127.0.0.1:8000/',
            perms: null,
            type: 1,
            icon: 'el-icon-view',
            orderNum: 1,
            delFlag: 0,
            parentName: '系统监控',
            level: 1,
            children: []
          }
        ]
      },
      {
        id: 48,
        createBy: 'admin',
        createTime: '2018-11-15T06:39:30.000+0000',
        lastUpdateBy: 'admin',
        lastUpdateTime: '2018-11-15T06:56:18.000+0000',
        parentId: 0,
        name: '代码生成',
        url: '/generator/generator',
        perms: '',
        type: 1,
        icon: 'el-icon-star-on',
        orderNum: 5,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: []
      },
      {
        id: 50,
        createBy: 'admin',
        createTime: '2018-11-15T06:39:30.000+0000',
        lastUpdateBy: 'admin',
        lastUpdateTime: '2018-11-15T06:56:18.000+0000',
        parentId: 0,
        name: '在线用户',
        url: '/sys/online',
        perms: '',
        type: 1,
        icon: 'el-icon-view',
        orderNum: 5,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: []
      },
      {
        id: 52,
        createBy: null,
        createTime: null,
        lastUpdateBy: 'admin',
        lastUpdateTime: '2018-11-15T06:39:43.000+0000',
        parentId: 0,
        name: '外部链接',
        url: null,
        perms: null,
        type: 0,
        icon: 'el-icon-link',
        orderNum: 6,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: [
          {
            id: 56,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 52,
            name: '百度',
            url: 'http://www.baidu.com',
            perms: null,
            type: 1,
            icon: 'fa fa-globe',
            orderNum: 2,
            delFlag: 0,
            parentName: '使用案例',
            level: 1,
            children: []
          },
          {
            id: 57,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 52,
            name: 'Bing',
            url: 'http://bing.com',
            perms: null,
            type: 1,
            icon: 'fa fa-globe',
            orderNum: 2,
            delFlag: 0,
            parentName: '使用案例',
            level: 1,
            children: []
          }
        ]
      }
    ]
  }
  return {
    url: 'user/menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
}
