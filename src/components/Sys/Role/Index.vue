<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <div class="table-role">
      <HyListTemplate
        :api="$api.sys.dict"
        :columns="columns"
        :columnsExpand="columnsExpand"
        :showBatchDelete="false"
      >
        <!-- 工具条栏 -->
        <template v-slot:toolbar></template>

        <!-- 过滤栏 -->
        <template v-slot:filters="props">
          <el-form-item label="名称" label-width="50px" prop="label">
            <el-input v-model="props.filters.label" autocomplete="off"></el-input>
          </el-form-item>
        </template>

        <!-- CURD详情栏 -->
        <template v-slot:detail="props">
          <Detail :dataForm="props.dataForm" :readOnly="props.readOnly"></Detail>
        </template>
      </HyListTemplate>
    </div>

    <!-- 菜单栏 -->
    <div class="table-menu">
      <div class="menu-header">
        <span>
          <B>角色菜单授权</B>
        </span>
      </div>
      <el-tree
        :data="menuData"
        size="mini"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        style="width: 100%;pading-top:20px; overflow-x: auto"
        class="menu-tree"
        ref="menuTree"
        :render-content="renderContent"
        v-loading="menuLoading"
        element-loading-text="拼命加载中"
        :check-strictly="true"
        @check-change="handleMenuCheckChange"
      ></el-tree>
      <div style="float:left;padding-left:24px;padding-top:12px;padding-bottom:4px;">
        <el-checkbox
          v-model="checkAll"
          @change="handleCheckAll"
          :disabled="this.selectRole.id == null"
        >
          <b>全选</b>
        </el-checkbox>
      </div>
      <div style="float:right;padding-right:15px;padding-top:4px;padding-bottom:4px;">
        <hy-button
          label="重置"
          perms="sys:role:edit"
          type="primary"
          @click="resetSelection"
          :disabled="this.selectRole.id == null"
        />
        <hy-button
          label="提交"
          perms="sys:role:edit"
          type="primary"
          @click="submitAuthForm"
          :disabled="this.selectRole.id == null"
          :loading="authLoading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyListTemplate from '@/components/ZCore/HyListTemplate'
import { formatDateTime } from '@/utils/datetime'

import Detail from './Detail'

export default {
  components: {
    HyButton,
    HyListTemplate,

    Detail
  },

  data () {
    return {
      columns: [
        {prop: 'id', label: 'ID', minWidth: 60},
        {prop: 'label', label: '名称', minWidth: 100},
        {prop: 'value', label: '值', minWidth: 100},
        {prop: 'type', label: '类型', minWidth: 80},
        {prop: 'sort', label: '排序', minWidth: 80},
        {prop: 'description', label: '描述', minWidth: 120},
        {prop: 'remarks', label: '备注', minWidth: 120},
        {prop: 'createBy', label: '创建人', minWidth: 100},
        {
          prop: 'createTime',
          label: '创建时间',
          minWidth: 140,
          formatter: formatDateTime
        }
      ],
      columnsExpand: {
        labelWidth: '80px',
        data: [
          {prop: 'id', label: 'ID'},
          {prop: 'label', label: '名称'},
          {prop: 'value', label: '值'},
          {prop: 'type', label: '类型'},
          {prop: 'sort', label: '排序'},
          {prop: 'description', label: '描述'},
          {prop: 'remarks', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {
            prop: 'createTime',
            label: '创建时间',
            formatter: formatDateTime
          }
        ]
      },

      selectRole: {},
      menuData: [],
      menuSelections: [],
      menuLoading: false,
      authLoading: false,
      checkAll: false,
      currentRoleMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  methods: {
    // 获取数据
    findTreeData: function () {
      this.menuLoading = true
      this.$api.menu.findMenuTree().then(res => {
        this.menuData = res.data
        this.menuLoading = false
      })
    },
    // 角色选择改变监听
    handleRoleSelectChange (val) {
      if (val == null || val.val == null) {
        return
      }
      this.selectRole = val.val
      this.$api.role.findRoleMenus({ roleId: val.val.id }).then(res => {
        this.currentRoleMenus = res.data
        this.$refs.menuTree.setCheckedNodes(res.data)
      })
    },
    // 树节点选择监听
    handleMenuCheckChange (data, check, subCheck) {
      if (check) {
        // 节点选中时同步选中父节点
        let parentId = data.parentId
        this.$refs.menuTree.setChecked(parentId, true, false)
      } else {
        // 节点取消选中时同步取消选中子节点
        if (data.children != null) {
          data.children.forEach(element => {
            this.$refs.menuTree.setChecked(element.id, false, false)
          })
        }
      }
    },
    // 重置选择
    resetSelection () {
      this.checkAll = false
      this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus)
    },
    // 全选操作
    handleCheckAll () {
      if (this.checkAll) {
        let allMenus = []
        this.checkAllMenu(this.menuData, allMenus)
        this.$refs.menuTree.setCheckedNodes(allMenus)
      } else {
        this.$refs.menuTree.setCheckedNodes([])
      }
    },
    // 递归全选
    checkAllMenu (menuData, allMenus) {
      menuData.forEach(menu => {
        allMenus.push(menu)
        if (menu.children) {
          this.checkAllMenu(menu.children, allMenus)
        }
      })
    },
    // 角色菜单授权提交
    submitAuthForm () {
      let roleId = this.selectRole.id
      if (this.selectRole.name == 'admin') {
        this.$message({
          message: '超级管理员拥有所有菜单权限，不允许修改！',
          type: 'error'
        })
        return
      }
      this.authLoading = true
      let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true)
      let roleMenus = []
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        let roleMenu = { roleId: roleId, menuId: checkedNodes[i].id }
        roleMenus.push(roleMenu)
      }
      this.$api.role.saveRoleMenus(roleMenus).then(res => {
        if (res.code == 200) {
          this.$message({ message: '操作成功', type: 'success' })
        } else {
          this.$message({ message: '操作失败, ' + res.msg, type: 'error' })
        }
        this.authLoading = false
      })
    },
    renderContent (h, { node, data, store }) {
      return (
        <div class="column-container">
          <span style="text-algin:center;margin-right:80px;">{data.name}</span>
          <span style="text-algin:center;margin-right:80px;">
            <el-tag
              type={data.type === 0 ? '' : data.type === 1 ? 'success' : 'info'}
              size="small"
            >
              {data.type === 0 ? '目录' : data.type === 1 ? '菜单' : '按钮'}
            </el-tag>
          </span>
          <span style="text-algin:center;margin-right:80px;">
            {' '}
            <i class={data.icon}></i>
          </span>
          <span style="text-algin:center;margin-right:80px;">
            {data.parentName ? data.parentName : '顶级菜单'}
          </span>
          <span style="text-algin:center;margin-right:80px;">
            {data.url ? data.url : '\t'}
          </span>
        </div>
      )
    }
  }
}
</script>

<style lang="scss" scope>
.hy-height-100 {
  > div {
    height: 50%;
  }
}
</style>
