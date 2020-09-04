<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <HyListTemplate
      :api="$api.sys.loginLog"
      :columns="columns"
      :showAdd="false"
      :showEdit="false"
      :showBatchDelete="false"
    >
      <!-- 过滤栏 -->
      <template v-slot:filters="props">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="props.filters.username" autocomplete="off"></el-input>
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
      ]
    }
  }
}
</script>
