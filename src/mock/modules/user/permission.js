// 查找用户的菜单权限标识集合
export function findPermissions () {
  const permsData = {
    code: 200,
    msg: null,
    data: [
      null,
      'sys:user:view',
      'sys:menu:delete',
      'sys:dept:edit',
      'sys:dict:edit',
      'sys:dict:delete',
      'sys:menu:add',
      'sys:user:add',
      'sys:log:view',
      'sys:dept:delete',
      'sys:role:edit',
      'sys:role:view',
      'sys:dict:view',
      'sys:user:edit',
      'sys:user:delete',
      'sys:dept:view',
      'sys:dept:add',
      'sys:role:delete',
      'sys:menu:view',
      'sys:menu:edit',
      'sys:dict:add',
      'sys:role:add',
      'sys:config:add',
      'sys:config:edit',
      'sys:config:view',
      'sys:config:delete',
      'sys:config:view',
      'sys:log:view',
      'sys:log:view',
      'sys:log:delete',
      'sys:loginlog:view',
      'sys:loginlog:view',
      'sys:loginlog:delete'
    ]
  }
  return {
    url: 'user/findPermission',
    type: 'get',
    data: permsData
  }
}
