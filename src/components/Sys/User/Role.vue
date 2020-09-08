<template>
  <div class="hy-height-100">
    <!-- 搜索栏 -->
    <div ref="hyListTemplateContainer" class="hy-list-template-container">
      <el-form :inline="true" size="mini">
        <el-form-item label="名称" prop="name">
          <el-input v-model="filters.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <hy-button label="搜索" type="success" :loading="filtersLoading" @click="filtersPage" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格栏目 -->
    <HyTableTemplate
      ref="hyTableTemplate"
      :api="$api.sys.role"
      :columns="columns"
      :showOperation="false"
      :showCheckbox="true"
      :hightlightCurrentRow="true"
      :showOverflowTooltip="true"
      size="mini"
      style="height:300px"
      :paginationSmall="true"
      @selection-change="selectionChange"
    ></HyTableTemplate>

    <div class="footer">
      <hy-button label="保存" type="success" :loading="saveLoading" @click="submit" />
    </div>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyTableTemplate from '@/components/ZCore/HyTableTemplate'

import Detail from './Detail'

export default {
  components: {
    HyButton,
    HyTableTemplate,

    Detail
  },

  data () {
    return {
      columns: [
        {prop: 'name', label: '名称', minWidth: 100},
        {prop: 'remark', label: '备注', minWidth: 120}
      ],

      filters: {
        name: null
      },
      filtersLoading: false,

      selections: null,

      saveLoading: false
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {

    // 获取搜索数据
    async filtersPage () {
      try {
        this.filtersLoading = true
        await this.$refs.hyTableTemplate.findPage(this.filters)
        this.$refs.hyTableTemplate.toggleRowSelection(this.user.userRoles)
      } finally {
        this.filtersLoading = false
      }
    },

    // 选中行改变
    selectionChange (selections) {
      this.selections = selections
    },

    async submit () {
      try {
        const data = {
          user: this.user,
          userRoles: this.selections
        }
        this.saveLoading = true
        await this.$api.sys.user.saveUserRoles(data)
      } catch (e) {
        this.$message({ message: e, type: 'error', center: true })
      } finally {
        this.saveLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 20px;
  text-align: right;
}
</style>
