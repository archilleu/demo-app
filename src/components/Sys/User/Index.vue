<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <HyListTemplate
      :api="$api.sys.user"
      :columns="columns"
      :columnsExpand="columnsExpand"
      @handleCurrentChange="handleCurrentChange"
      :showBatchDelete="false"
    >
      <!-- 工具条栏 -->
      <template v-slot:toolbar>
        <hy-button
          icon="fa fa-check"
          label="选择角色"
          size="mini"
          type="primary"
          @click="handleSelectRole"
          :disabled="!selectedUser"
        />
      </template>

      <!-- 过滤栏 -->
      <template v-slot:filters="props">
        <el-form-item label="名称" label-width="50px" prop="name">
          <el-input v-model="props.filters.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="email" label-width="50px" prop="email">
          <el-input v-model="props.filters.email" autocomplete="off"></el-input>
        </el-form-item>
      </template>

      <!-- CURD详情栏 -->
      <template v-slot:detail="props">
        <Detail :dataForm="props.dataForm" :readOnly="props.readOnly"></Detail>
      </template>
    </HyListTemplate>

    <!-- 角色栏 -->
    <HyDialogTemplate :title="title" width="50%" :visible.sync="roleVisibleDlg">
      <Role :user="selectedUser"></Role>
    </HyDialogTemplate>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyListTemplate from '@/components/ZCore/HyListTemplate'
import HyDialogTemplate from '@/components/ZCore/HyDialogTemplate'
import { formatDateTime, formatDate } from '@/utils/datetime'

import Detail from './Detail'
import Role from './Role'

export default {
  components: {
    HyButton,
    HyListTemplate,
    HyDialogTemplate,

    Detail,
    Role
  },

  data () {
    return {
      columns: [
        {prop: 'id', label: 'ID', minWidth: 80},
        {prop: 'name', label: '用户名', minWidth: 120},
        {prop: 'nickName', label: '昵称', minWidth: 120},
        {prop: 'deptName', label: '机构', minWidth: 120},
        {prop: 'roleNames', label: '角色', minWidth: 100},
        {prop: 'email', label: '邮箱', minWidth: 120},
        {prop: 'mobile', label: '手机', minWidth: 100},
        {prop: 'status', label: '状态', minWidth: 70},
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
          {prop: 'id', label: 'ID'},
          {prop: 'name', label: '用户名'},
          {prop: 'nickName', label: '昵称'},
          {prop: 'deptName', label: '机构'},
          {prop: 'roleNames', label: '角色'},
          {prop: 'email', label: '邮箱'},
          {prop: 'mobile', label: '手机'},
          {prop: 'status', label: '状态'},
          {
            prop: 'createTime',
            label: '创建时间',
            minWidth: 140,
            formatter: formatDateTime
          }
        ]
      },

      roleVisibleDlg: false,
      selectedUser: null
    }
  },
  computed: {
    title () {
      if (!this.selectedUser) {
        return ''
      }

      return `选择角色:${this.selectedUser.name}`
    }
  },

  methods: {
    handleSelectRole () {
      this.roleVisibleDlg = true
    },
    handleCurrentChange (row) {
      if (!row) { return }
      this.selectedUser = row.val
    }
  }
}
</script>
