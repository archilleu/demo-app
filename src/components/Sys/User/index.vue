<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <HyListTemplate ref="roleTable"
                    permsAdd="sys:user:add"
                    permsEdit="sys:user:edit"
                    permsInfo="sys:user:view"
                    permsDelete="sys:user:delete"
                    permsView="sys:user:view"
                    dialogWidth="30%"
                    :api="$api.sys.user"
                    :columns="columns"
                    :columnsExpand="columnsExpand"
                    @current-change="handleCurrentChange"
                    :showBatchDelete="false">
      <!-- 工具条栏 -->
      <template v-slot:toolbar>
        <hy-button :perms="true"
                   icon="fa fa-check"
                   label="选择角色"
                   size="mini"
                   type="primary"
                   @click="handleSelectRole"
                   :disabled="!selectedUser" />
        <hy-button :perms="true"
                   icon="fa fa-check"
                   label="修改密码"
                   size="mini"
                   type="primary"
                   @click="handleModifyPassword"
                   :disabled="!selectedUser" />
      </template>

      <!-- 过滤栏 -->
      <template v-slot:filters="props">
        <el-form-item label="名称"
                      label-width="50px"
                      prop="name">
          <el-input v-model="props.filters.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="email"
                      label-width="50px"
                      prop="email">
          <el-input v-model="props.filters.email"
                    autocomplete="off"></el-input>
        </el-form-item>
      </template>

      <!-- CURD详情栏 -->
      <template v-slot:detail="props">
        <Detail :dataForm="props.dataForm"
                :readOnly="props.readOnly"></Detail>
      </template>
    </HyListTemplate>

    <!-- 角色栏 -->
    <el-dialog :title="title"
               width="40%"
               :visible.sync="roleVisibleDlg">
      <Role :user="selectedUser"
            @save-ok="roleSave"></Role>
    </el-dialog>

    <!-- 密码栏 -->
    <el-dialog :title="pwdTitle"
               width="40%"
               :visible.sync="passwordVisibleDlg">
      <Password :user="selectedUser"
                :api="$api.sys.user.modifyPassword">
      </Password>
    </el-dialog>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyListTemplate from '@/components/ZCore/HyListTemplate'
import { formatDate, expandFormatDate } from '@/utils/datetime'

import Detail from './Detail'
import Role from './Role'
import Password from './Password'

export default {
  components: {
    HyButton,
    HyListTemplate,

    Detail,
    Role,
    Password
  },

  data () {
    return {
      columns: [
        { prop: 'id', label: 'ID', minWidth: 80 },
        { prop: 'name', label: '用户名', minWidth: 120 },
        { prop: 'nickName', label: '昵称', minWidth: 120 },
        { prop: 'deptName', label: '机构', minWidth: 120 },
        {
          prop: 'roles',
          label: '角色',
          minWidth: 100,
          formatter: (data) => {
            if (!data.roles) {
              return;
            }
            return data.roles.map((item) => item.name);
          }
        },
        { prop: 'email', label: '邮箱', minWidth: 120 },
        { prop: 'mobile', label: '手机', minWidth: 100 },
        { prop: 'status', label: '状态', minWidth: 70 },
        {
          prop: 'createTime',
          label: '创建时间',
          minWidth: 140,
          formatter: formatDate
        }
      ],
      columnsExpand: {
        labelWidth: '80px',
        data: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: '用户名' },
          { prop: 'nickName', label: '昵称' },
          { prop: 'deptName', label: '机构' },
          {
            prop: 'roles',
            label: '角色',
            formatter: (data) => {
              if (!data) {
                return;
              }
              return data.map((item) => item.name);
            }
          },
          { prop: 'email', label: '邮箱' },
          { prop: 'mobile', label: '手机' },
          {
            prop: 'status',
            label: '状态',
            formatter: (status) => {
              if (status) {
                return '有效'
              }
              return '无效'
            }
          },
          {
            prop: 'createTime',
            label: '创建时间',
            minWidth: 140,
            formatter: expandFormatDate
          }
        ]
      },

      roleVisibleDlg: false,
      passwordVisibleDlg: false,
      selectedUser: null
    }
  },
  computed: {
    title () {
      if (!this.selectedUser) {
        return ''
      }

      return `选择角色:${this.selectedUser.name}`
    },
    pwdTitle () {
      if (!this.selectedUser) {
        return ''
      }

      return `修改密码:${this.selectedUser.name}`
    }
  },

  methods: {
    handleSelectRole () {
      this.roleVisibleDlg = true
    },
    handleModifyPassword () {
      this.passwordVisibleDlg = true
    },
    handleCurrentChange (row) {
      if (!row) { return }
      this.selectedUser = row.val
    },
    roleSave () {
      this.$refs.roleTable.findPage()
    }
  }
}
</script>
