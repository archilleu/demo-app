<template>
  <div>
    <!-- 搜索栏 -->
    <div ref="hyListTemplateContainer" class="hy-list-template-container">
      <el-form :inline="true" size="mini" v-if="false">
        <el-form-item label="名称" prop="name">
          <el-input v-model="filters.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <hy-button label="搜索" type="success" :loading="filtersLoading" @click="filtersPage" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格栏目 -->
    <el-table
      ref="roleTable"
      class="role-table"
      max-height="300px"
      :data="data"
      highlight-current-row
      @selection-change="selectionChange"
      row-key="id"
      v-loading="loading"
      element-loading-text="加载中..."
      :border="true"
      :stripe="true"
      :show-overflow-tooltip="true"
      size="mini"
      align="center"
    >
      <!-- 多选列 -->
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>

      <!-- 自定义列 -->
      <el-table-column
        v-for="column in columns"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :key="column.prop"
        :type="column.type"
        :reserve-selection="true"
        :formatter="column.formatter"
        :sortable="column.sortable==null?true:column.sortable"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="column.formatter">{{ column.formatter(scope.row, scope.column) }}</div>
          <div v-else-if="column.template" v-html="column.template(scope.row)"></div>
          <div v-else>{{ scope.row[scope.column.property] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <hy-button label="取消" :perms="true" @click="cancle" />
      <hy-button label="保存" perms="sys:user:edit" type="success" :loading="saveLoading" @click="submit" />
    </div>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'

import Detail from './Detail'

export default {
  components: {
    HyButton,

    Detail
  },

  data () {
    return {
      columns: [
        {prop: 'name', label: '名称', minWidth: 100},
        {prop: 'remark', label: '备注', minWidth: 120}
      ],

      data: [],

      filters: {
        name: null
      },
      filtersLoading: false,

      selections: null,

      loading: false,

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

    async findPage () {
      try {
        this.loading = true
        const data = {
          filters: this.filters,
          pageRequest: {
            page: 1,
            rows: 10000
          }
        }
        const res = await this.$api.sys.role.findAll(data)
        this.data = res.data
        this.$nextTick(() => {
          this.toggleRowSelection(this.user.userRoles)
        })
      } catch (e) {
        this.$message({ message: e, type: 'error', center: true })
      } finally {
        this.loading = false
      }
    },

    // 获取搜索数据
    async filtersPage () {
      try {
        this.filtersLoading = true
        this.findPage()
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
          userId: this.user.id,
          roles: this.selections.map(item => item.id)
        }
        this.saveLoading = true
        await this.$api.sys.user.saveUserRoles(data)
      } catch (e) {
        this.$message({ message: e, type: 'error', center: true })
      } finally {
        this.saveLoading = false
        this.$emit('save-ok', true)
        this.$parent.$emit('update:visible', false)
      }
    },
    cancle () {
      this.$parent.$emit('update:visible', false)
    },
    // 设置选中行
    toggleRowSelection (rows) {
      this.$refs.roleTable.clearSelection()

      let selected = []
      rows.forEach(row => {
        this.data.forEach(item => {
          if (item.id === row.roleId) { selected.push(item) }
        })
      })

      selected.forEach(row => {
        this.$refs.roleTable.toggleRowSelection(row)
      })
    }
  },
  watch: {
    user () {
      this.toggleRowSelection(this.user.userRoles)
    }
  },
  async mounted () {
    await this.findPage()
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 20px;
  text-align: right;
}
</style>
