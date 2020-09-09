<template>
  <div class="hy-height-100 lazyTable">
    <div ref="hy-toolbar" class="hy-toolbar">
      <el-form :inline="true" size="mini">
        <!-- 自定义工具栏 -->
        <el-form-item>
          <hy-button icon="fa fa-plus" label="新增" size="mini" type="success" @click="handleAdd" />
        </el-form-item>
      </el-form>

      <el-tooltip v-if="false" effect="dark" content="打开查询选项" placement="bottom-end">
        <span class="search-btn" @click="showFiltersDialog = true">
          <i class="el-icon-search"></i>
        </span>
      </el-tooltip>
      <el-drawer
        title="查询条件"
        size="30%"
        :wrapperClosable="false"
        :visible.sync="showFiltersDialog"
        direction="rtl"
        custom-class="search-drawer"
        ref="searchDrawer"
      >
        <!-- 自定义搜索栏 -->
        <el-form
          class="filtersForm"
          :model="filters"
          label-position="left"
          ref="filtersForm"
          size="mini"
        >
          <el-form-item label="名称" label-width="50px" prop="name">
            <el-input v-model="filters.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="footer">
            <hy-button label="重置" :loading="resetLoading" @click="findReset" />
            <hy-button label="搜索" type="success" :loading="filtersLoading" @click="findTreeData" />
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <!--表格树内容栏-->
    <div class="tree-table">
      <el-table
        lazy
        stripe
        rowKey="id"
        size="mini"
        :load="load"
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        highlight-current-row
        element-loading-text="加载中..."
      >
        <!-- 自定义列 -->
        <el-table-column
          v-for="column in columns"
          :prop="column.prop"
          :label="column.label"
          :min-width="column.minWidth"
          :key="column.prop"
          :formatter="column.formatter"
          show-overflow-tooltip
        ></el-table-column>

        <!-- 左边固定操作列 -->
        <el-table-column label="操作" width="140" fixed="right" header-align="center" align="center">
          <template slot-scope="scope">
            <hy-button
              icon="fa fa-edit"
              :circle="true"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            />
            <hy-button
              icon="fa fa-envelope-o"
              :circle="true"
              size="mini"
              type="info"
              @click="handleInfo(scope.row)"
            />
            <hy-button
              icon="fa fa-trash"
              :circle="true"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--自定义新增\编辑\查看-->
    <hy-dialog-template
      :title="dialogTitle"
      width="30%"
      :visible.sync="dialogVisible"
      @hy-dialog-tpl:ok="findTreeData"
    >
      <Detail :dataForm="dataForm" :readOnly="readOnly"></Detail>
    </hy-dialog-template>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import HyDialogTemplate from '@/components/ZCore/HyDialogTemplate'
import { formatDateTime } from '@/utils/datetime'

import Detail from './Detail'

export default {
  components: {
    HyButton,
    HyDialogTemplate,

    Detail
  },
  data () {
    return {
      loading: false,
      columns: [
        { prop: 'id', label: 'ID', minWidth: 100 },
        { prop: 'name', label: '名称', minWidth: 100 },
        {
          prop: 'parentName',
          label: '上级机构',
          minWidth: 150,
          formatter: function (data) {
            if (data.parentName == null) {
              return '空'
            } else {
              return data.parentName
            }
          }
        },
        { prop: 'orderNum', label: '排序', minWidth: 80 },
        { prop: 'createBy', label: '创建人', minWidth: 100 },
        {
          prop: 'createTime',
          label: '创建时间',
          minWidth: 140,
          formatter: formatDateTime
        }
      ],
      tableData: [],

      // 编辑修改对话框
      dialogVisible: false,
      dialogTitle: '',
      dataForm: {},
      readOnly: false,

      // 搜索对话框
      showFiltersDialog: false,
      filters: {},
      // 搜索加载状态
      filtersLoading: false,
      resetLoading: false
    }
  },
  methods: {
    // 获取数据
    async findTreeData () {
      try {
        this.loading = true
        const res = await this.$api.sys.dept.findDeptTree()
        this.tableData = res.data
      } catch (e) {
        this.$message({
          message: e,
          type: 'error',
          center: true
        })
      } finally {
        this.loading = false
      }
    },
    // 懒加载机构
    async load (tree, treeNode, resolve) {
      try {
        const res = await this.$api.sys.dept.findDeptTree({
          filters: {
            ...this.filters,
            parentId: tree.id
          }
        })
        resolve(res.data)
      } catch (e) {
        this.$message({
          message: e,
          type: 'error',
          center: true
        })
      }
    },
    // 重置
    async findReset () {
      try {
        this.$refs.filtersForm.resetFields()
        this.resetLoading = true
        await this.findTreeData()
      } finally {
        this.resetLoading = false
      }
    },
    // 显示新增界面
    handleAdd: function () {
      this.dialogTitle = '添加'
      this.dialogVisible = true
      this.dataForm = {
        name: '',
        parentId: 0,
        parentName: '',
        orderNum: 0
      }
    },
    // 显示编辑界面
    handleEdit: function (row) {
      this.dialogTitle = '编辑'
      this.dialogVisible = true
      this.readOnly = false
      this.dataForm = Object.assign({}, row)
    },
    // 显示查看界面
    handleInfo: function (row) {
      this.dialogTitle = '擦看'
      this.dialogVisible = true
      this.readOnly = true
      this.dataForm = Object.assign({}, row)
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          try {
            this.loading = true
            await this.$api.sys.dept.del(row.id)
            await this.$api.sys.dept.findDeptTree({ filters: this.filters })
            this.$message({ message: '删除成功', type: 'success' })
          } catch (e) {
            this.$message({ message: e, type: 'error', center: true })
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.findTreeData()
  }
}
</script>

<style lang="scss" scoped>
.lazyTable {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tree-table {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
