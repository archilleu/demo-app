<template>
  <div class="hy-height-100">
    <!-- 表格栏目 -->
    <HyListTemplate
      permsAdd="sys:config:add"
      permsEdit="sys:config:edit"
      permsInfo="sys:config:view"
      permsDelete="sys:config:delete"
      permsView="sys:config:view"
      :api="$api.sys.config"
      :columns="columns"
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
        {prop: 'id', label: 'ID', minWidth: 100},
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
          minWidth: 120,
          formatter: formatDateTime
        }
      ]
    }
  },

  methods: {
  }
}
</script>
