/*
 * 菜单管理模块
 */

// 保存
export function save () {
  return {
    url: 'sys/menu/save',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data: 1
    }
  }
}
// 批量删除
export function batchDelete () {
  return {
    url: 'sys/menu/delete',
    type: 'post',
    data: {
      code: 200,
      msg: null,
      data: 1
    }
  }
}

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
            url: '/sys/user/index',
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
            url: '/sys/dept/index',
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
            url: '/sys/role/index',
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
            url: '/sys/menu/index',
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
            url: '/sys/dict/index',
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
        name: '使用案例',
        url: null,
        perms: null,
        type: 0,
        icon: 'el-icon-picture-outline',
        orderNum: 6,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: [
          {
            id: 53,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 52,
            name: '国际化',
            url: '/demo/i18n',
            perms: null,
            type: 1,
            icon: 'el-icon-edit',
            orderNum: 1,
            delFlag: 0,
            parentName: '使用案例',
            level: 1,
            children: []
          },
          {
            id: 55,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 52,
            name: '换皮肤',
            url: '/demo/theme',
            perms: null,
            type: 1,
            icon: 'el-icon-picture',
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
    url: 'sys/menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
}

// 获取菜单树
export function findMenuTree () {
  const menuTreeData = {
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
            children: [
              {
                id: 3,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 2,
                name: '查看',
                url: null,
                perms: 'sys:user:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '用户管理',
                level: 2,
                children: []
              },
              {
                id: 4,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 2,
                name: '新增',
                url: null,
                perms: 'sys:user:add',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '用户管理',
                level: 2,
                children: []
              },
              {
                id: 5,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 2,
                name: '修改',
                url: null,
                perms: 'sys:user:edit',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '用户管理',
                level: 2,
                children: []
              },
              {
                id: 6,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 2,
                name: '删除',
                url: null,
                perms: 'sys:user:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '用户管理',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 8,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 7,
                name: '查看',
                url: null,
                perms: 'sys:dept:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '机构管理',
                level: 2,
                children: []
              },
              {
                id: 9,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 7,
                name: '新增',
                url: null,
                perms: 'sys:dept:add',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '机构管理',
                level: 2,
                children: []
              },
              {
                id: 10,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 7,
                name: '修改',
                url: null,
                perms: 'sys:dept:edit',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '机构管理',
                level: 2,
                children: []
              },
              {
                id: 11,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 7,
                name: '删除',
                url: null,
                perms: 'sys:dept:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '机构管理',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 13,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 12,
                name: '查看',
                url: null,
                perms: 'sys:role:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '角色管理',
                level: 2,
                children: []
              },
              {
                id: 14,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 12,
                name: '新增',
                url: null,
                perms: 'sys:role:add',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '角色管理',
                level: 2,
                children: []
              },
              {
                id: 15,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 12,
                name: '修改',
                url: null,
                perms: 'sys:role:edit',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '角色管理',
                level: 2,
                children: []
              },
              {
                id: 16,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 12,
                name: '删除',
                url: null,
                perms: 'sys:role:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '角色管理',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 18,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 17,
                name: '查看',
                url: null,
                perms: 'sys:menu:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '菜单管理',
                level: 2,
                children: []
              },
              {
                id: 19,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 17,
                name: '新增',
                url: null,
                perms: 'sys:menu:add',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '菜单管理',
                level: 2,
                children: []
              },
              {
                id: 20,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 17,
                name: '修改',
                url: null,
                perms: 'sys:menu:edit',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '菜单管理',
                level: 2,
                children: []
              },
              {
                id: 21,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 17,
                name: '删除',
                url: null,
                perms: 'sys:menu:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '菜单管理',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 23,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 22,
                name: '查看',
                url: null,
                perms: 'sys:dict:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '字典管理',
                level: 2,
                children: []
              },
              {
                id: 24,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 22,
                name: '新增',
                url: null,
                perms: 'sys:dict:add',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '字典管理',
                level: 2,
                children: []
              },
              {
                id: 25,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 22,
                name: '修改',
                url: null,
                perms: 'sys:dict:edit',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '字典管理',
                level: 2,
                children: []
              },
              {
                id: 26,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 22,
                name: '删除',
                url: null,
                perms: 'sys:dict:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '字典管理',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 28,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 27,
                name: '查看',
                url: null,
                perms: 'sys:config:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '系统配置',
                level: 2,
                children: []
              },
              {
                id: 29,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 27,
                name: '新增',
                url: null,
                perms: 'sys:config:add',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '系统配置',
                level: 2,
                children: []
              },
              {
                id: 30,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 27,
                name: '修改',
                url: null,
                perms: 'sys:config:edit',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '系统配置',
                level: 2,
                children: []
              },
              {
                id: 31,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 27,
                name: '删除',
                url: null,
                perms: 'sys:config:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '系统配置',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 33,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 32,
                name: '查看',
                url: null,
                perms: 'sys:loginlog:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '登录日志',
                level: 2,
                children: []
              },
              {
                id: 34,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 32,
                name: '删除',
                url: null,
                perms: 'sys:loginlog:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '登录日志',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 36,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 35,
                name: '查看',
                url: null,
                perms: 'sys:log:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '操作日志',
                level: 2,
                children: []
              },
              {
                id: 37,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 35,
                name: '删除',
                url: null,
                perms: 'sys:log:delete',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '操作日志',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 45,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 44,
                name: '查看',
                url: null,
                perms: 'sys:consul:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '注册中心',
                level: 2,
                children: []
              }
            ]
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
        children: [
          {
            id: 47,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 46,
            name: '查看',
            url: null,
            perms: 'sys:swagger:view',
            type: 2,
            icon: null,
            orderNum: 0,
            delFlag: 0,
            parentName: '接口文档',
            level: 1,
            children: []
          }
        ]
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
            children: [
              {
                id: 40,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 39,
                name: '查看',
                url: null,
                perms: 'sys:druid:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '数据监控',
                level: 2,
                children: []
              }
            ]
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
            children: [
              {
                id: 42,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 41,
                name: '查看',
                url: null,
                perms: 'sys:monitor:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '服务监控',
                level: 2,
                children: []
              }
            ]
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
        children: [
          {
            id: 49,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 48,
            name: '查看',
            url: null,
            perms: 'sys:generator:view',
            type: 2,
            icon: null,
            orderNum: 0,
            delFlag: 0,
            parentName: '代码生成',
            level: 1,
            children: []
          }
        ]
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
        children: [
          {
            id: 51,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 50,
            name: '查看',
            url: null,
            perms: 'sys:online:view',
            type: 2,
            icon: null,
            orderNum: 0,
            delFlag: 0,
            parentName: '在线用户',
            level: 1,
            children: []
          }
        ]
      },
      {
        id: 52,
        createBy: null,
        createTime: null,
        lastUpdateBy: 'admin',
        lastUpdateTime: '2018-11-15T06:39:43.000+0000',
        parentId: 0,
        name: '使用案例',
        url: null,
        perms: null,
        type: 0,
        icon: 'el-icon-picture-outline',
        orderNum: 6,
        delFlag: 0,
        parentName: null,
        level: 0,
        children: [
          {
            id: 53,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 52,
            name: '国际化',
            url: '/demo/i18n',
            perms: null,
            type: 1,
            icon: 'el-icon-edit',
            orderNum: 1,
            delFlag: 0,
            parentName: '使用案例',
            level: 1,
            children: [
              {
                id: 54,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 53,
                name: '查看',
                url: null,
                perms: 'sys:dict:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '国际化',
                level: 2,
                children: []
              }
            ]
          },
          {
            id: 55,
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: null,
            parentId: 52,
            name: '换皮肤',
            url: '/demo/theme',
            perms: null,
            type: 1,
            icon: 'el-icon-picture',
            orderNum: 2,
            delFlag: 0,
            parentName: '使用案例',
            level: 1,
            children: [
              {
                id: 56,
                createBy: null,
                createTime: null,
                lastUpdateBy: null,
                lastUpdateTime: null,
                parentId: 55,
                name: '查看',
                url: null,
                perms: 'sys:dict:view',
                type: 2,
                icon: null,
                orderNum: 0,
                delFlag: 0,
                parentName: '换皮肤',
                level: 2,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
  return {
    url: 'sys/menu/findMenuTree',
    type: 'post',
    data: menuTreeData
  }
}

export function setParentName (data) {
  if (data == null) {
    return
  }
  const len = data.length
  for (let i = 0; i < len; i++) {
    const menu = data[i]
    menu.parentName = 'menu' + menu.parentId
    if (menu.children != null) {
      setParentName(menu.children)
    }
  }
}
