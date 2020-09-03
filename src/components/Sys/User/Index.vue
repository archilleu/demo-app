<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <HyListTemplate
      :api="$api.sys.user"
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
          formatter: formatDateTime
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
      }
    }
  },

  methods: {
  }
}
</script>
