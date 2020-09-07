<template>
  <div class="hy-height-100">
    <div ref="hyListTemplateContainer" class="hy-list-template-container">
        <div ref="hy-toolbar" class="hy-toolbar">
            <el-form :inline="true" size="mini">
                <el-form-item class="footer">
                    <hy-button label="重置" :loading="resetLoading" @click="findReset" />
                    <hy-button label="搜索" type="success" :loading="filtersLoading" @click="filtersPage" />
                </el-form-item>

                <slot name="toolbar"></slot>
            </el-form>
        </div>
    </div>
    <!-- 表格栏目 -->
    <HyTableTemplate
      ref="hyTableTemplate"
      :api="$api.sys.role"
      :columns="columns"
      :columnsExpand="columnsExpand"
      :showOperation="false"
      :hightlightCurrentRow="true"
      :showOverflowTooltip="true"
      size="mini"
      :paginationSmall="true"
      @selection-change="selectionChange"
    ></HyTableTemplate>

  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyTableTemplate from '@/components/ZCore/HyTableTemplate'
import HyListTemplate from '@/components/ZCore/HyListTemplate'
import { formatDateTime, formatDate } from '@/utils/datetime'

import Detail from './Detail'

export default {
  components: {
    HyButton,
    HyTableTemplate,
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
          formatter: formatDate
        }
      ],
      columnsExpand: {
        labelWidth: '80px',
        data: [
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
        ]
      },

      // 搜索加载状态
      filtersLoading: false,
      resetLoading: false
    }
  },

  methods: {

    // 获取搜索数据
    async filtersPage () {
      try {
        this.filtersLoading = true
        await this.findPage()
      } finally {
        this.filtersLoading = false
      }
    },
    // 重置
    async findReset () {
      try {
        this.$refs.filtersForm.resetFields()
        this.resetLoading = true
        await this.findPage()
      } finally {
        this.resetLoading = false
      }
    },

    // 选中行改变
    selectionChange (selections) {
      this.selections = selections
      this.$emit('selection-change', selections)
    },
  }
}
</script>
