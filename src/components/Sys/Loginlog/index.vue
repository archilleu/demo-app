<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <HyListTemplate
      permsInfo="sys:loginlog:view"
      permsView="sys:loginlog:view"
      permsDelete="sys:loginlog:delete"
      :api="$api.sys.loginLog"
      :columns="columns"
      :columnsExpand="columnsExpand"
      :showAdd="false"
      :showEdit="false"
      :showInfo="false"
      :showBatchDelete="false"
    >
      <!-- 过滤栏 -->
      <template v-slot:filters="props">
        <el-form-item label="用户名" label-width="80px" prop="userName">
          <el-input v-model="props.filters.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="80px" prop="status">
          <el-input v-model="props.filters.status" autocomplete="off"></el-input>
        </el-form-item>
      </template>
    </HyListTemplate>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyListTemplate from '@/components/ZCore/HyListTemplate'
import { formatDateTime } from '@/utils/datetime'

export default {
  components: {
    HyButton,
    HyListTemplate
  },

  data () {
    return {
      columns: [
        {prop: 'id', label: 'ID', minWidth: 60},
        {prop: 'userName', label: '用户名', minWidth: 100},
        {prop: 'status', label: '状态', minWidth: 120},
        {prop: 'ip', label: 'IP', minWidth: 120},
        {prop: 'time', label: '耗时', minWidth: 80},
        {prop: 'createBy', label: '创建人', minWidth: 100},
        {
          prop: 'createTime',
          label: '创建时间',
          minWidth: 120,
          formatter: formatDateTime
        }
      ],
      columnsExpand: {
        labelWidth: '80px',
        data: [
          {prop: 'id', label: 'ID'},
          {prop: 'userName', label: '用户名'},
          {prop: 'status', label: '状态'},
          {prop: 'ip', label: 'IP'},
          {prop: 'time', label: '耗时'},
          {prop: 'createBy', label: '创建人'},
          {
            prop: 'createTime',
            label: '创建时间',
            minWidth: 120,
            formatter: formatDateTime
          }
        ]
      }
    }
  }
}
</script>
