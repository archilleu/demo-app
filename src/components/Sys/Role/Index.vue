<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <div class="table-role">
      <HyListTemplate
        :api="$api.sys.role"
        :columns="columns"
        :showBatchDelete="false"
        :pageRequest="pageRequest"
        :paginationSmall="true"
        @handleCurrentChange="handleRoleSelectChange"
      >
        <!-- 工具条栏 -->
        <template v-slot:toolbar></template>

        <!-- 过滤栏 -->
        <template v-slot:filters="props">
          <el-form-item label="名称" label-width="50px" prop="name">
            <el-input v-model="props.filters.name" autocomplete="off"></el-input>
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
        highlight-current
        node-key="id"
        :props="defaultProps"
        class="menu-tree"
        ref="menuTree"
        :render-content="renderContent"
        v-loading="menuLoading"
        element-loading-text="加载中..."
      ></el-tree>
      <div class="menu-footer">
        <div>
          <el-checkbox
            v-model="checkAll"
            @change="handleCheckAll"
            :disabled="this.selectRole == null"
          >
            <b>全选</b>
          </el-checkbox>
        </div>
        <div>
          <hy-button
            label="重置"
            type="primary"
            @click="resetSelection"
            :disabled="this.selectRole == null"
          />
          <hy-button
            label="提交"
            type="primary"
            @click="submitAuthForm"
            :disabled="this.selectRole == null"
            :loading="authLoading"
          />
        </div>
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
        {prop: 'id', label: 'ID', minWidth: 80},
        {prop: 'name', label: '名称', minWidth: 100},
        {prop: 'remark', label: '备注', minWidth: 120},
        {prop: 'createBy', label: '创建人', minWidth: 100},
        {
          prop: 'createTime',
          label: '创建时间',
          minWidth: 140,
          formatter: formatDateTime
        }
      ],

      pageRequest: {
        page: 1,
        rows: 10
      },

      selectRole: null,
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
  computed: {
    // 当前全部的菜单数组列表
    menuListData () {
      let menuList = []
      let list = this._.clone(this.menuData)
      while (list.length > 0) {
        const menu = list.pop()
        menuList.push({id: menu.id})
        if (menu.children && menu.children.length > 0) {
          list = list.concat(menu.children)
        }
      }
      return menuList
    }
  },

  methods: {
    // 获取菜单树数据
    async findMenuTree () {
      this.menuLoading = true
      const res = await this.$api.sys.menu.findMenuTree()
      this.menuData = res.data
      this.menuLoading = false
    },
    // 角色选择改变监听
    async handleRoleSelectChange ({val}) {
      if (val == null) {
        return
      }
      try {
        this.menuLoading = true
        this.selectRole = val
        const res = await this.$api.sys.role.findRoleMenus({ roleId: val.id })
        this.currentRoleMenus = res.data
        this.$refs.menuTree.setCheckedNodes(res.data)
      } catch (e) {
        this.$message({ message: e, type: 'error', center: true })
      } finally {
        this.menuLoading = false
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
        this.$refs.menuTree.setCheckedNodes(this.menuListData)
      } else {
        this.$refs.menuTree.setCheckedNodes([])
      }
    },
    // 角色菜单授权提交
    async submitAuthForm () {
      let roleId = this.selectRole.id
      if (this.selectRole.name === 'admin') {
        this.$message({
          message: '超级管理员拥有所有菜单权限，不允许修改！',
          type: 'error',
          center: true
        })
        return
      }
      this.authLoading = true
      let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, false)
      let roleMenus = []
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        let roleMenu = { roleId: roleId, menuId: checkedNodes[i].id }
        roleMenus.push(roleMenu)
      }

      try {
        this.$api.sys.role.saveRoleMenus(roleMenus)
        this.$message({ message: '操作成功', type: 'success', center: true })
      } catch (e) {
        this.$message({ message: e, type: 'error', center: true })
      } finally {
        this.authLoading = false
      }
    },
    renderContent (h, { node, data, store }) {
      return (
        <div class="column-container">
          <span class='title' style1="text-algin:center;margin-right:80px;">{data.name}</span>
          <span class='typ' style1="text-algin:center;margin-right:80px;">
            <el-tag
              type={data.type === 0 ? '' : data.type === 1 ? 'success' : 'info'}
              size="small"
            >
              {data.type === 0 ? '目录' : data.type === 1 ? '菜单' : '按钮'}
            </el-tag>
          </span>
          <span class='icon' style1="text-algin:center;margin-right:80px;">
            <i class={data.icon}></i>
          </span>
          <span class='parent-name' style1="text-algin:center;margin-right:80px;">
            {data.parentName ? data.parentName : '顶级菜单'}
          </span>
          <span class='url' style1="text-algin:center;margin-right:80px;">
            {data.url ? data.url : '\t'}
          </span>
        </div>
      )
    }
  },
  async mounted () {
    await this.findMenuTree()
  }
}
</script>

<style lang="scss" scope>
.hy-height-100 {
  .table-menu,
  .table-role {
    height: 50%;
    &.table-menu {
      box-sizing: border-box;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      .menu-header {
        border-top: 1px solid #8080803d;
        padding-top: 8px;
        padding-left: 8px;
        margin-bottom: 8px;
        span {
          color: #4f5154;
        }
      }
      .el-tree {
        flex-grow: 1;
        width: 100%;
        overflow-x: auto;
        .column-container {
          .title {
            text-align: center;
            margin-right: 80px;
          }
          .typ {
            text-align: center;
            margin-right: 80px;
          }
          .icon {
            text-align: center;
            margin-right: 80px;
          }
          .parent-name {
            text-align: center;
            margin-right: 80px;
          }
          .url {
            text-align: center;
            margin-right: 80px;
          }
        }
      }
      .menu-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 10px;
      }
    }
  }
}
</style>
