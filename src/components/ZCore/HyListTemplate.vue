<template>
  <div ref="hyListTemplateContainer" class="hy-list-template-container">
    <div ref="hy-toolbar" class="hy-toolbar">
      <el-form :inline="true" :size="size">
        <!-- 自定义工具栏 -->
        <el-form-item v-if="showOperation & showAdd">
          <hy-button
            :perms="permsAdd"
            icon="fa fa-plus"
            label="新增"
            :size="size"
            type="success"
            @click="handleAdd"
          />
        </el-form-item>

        <el-form-item v-if="showBatchDelete">
          <hy-button
            :perms="permsDelete"
            label="批量删除"
            icon="fa fa-edit"
            :size="size"
            type="danger"
            @click="handleBatchDelete()"
            :disabled="this.selections.length===0"
          ></hy-button>
        </el-form-item>

        <slot name="toolbar"></slot>
      </el-form>

      <el-tooltip v-if="showFilter" effect="dark" content="打开查询选项" placement="bottom-end">
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
          :size="size"
        >
          <slot name="filters" :filters="filters">
            <div class="warning">请添加查询条件</div>
          </slot>
          <el-form-item class="footer">
            <hy-button label="重置" :perms="true" :loading="resetLoading" @click="findReset" />
            <hy-button label="搜索" :perms="permsView" type="success" :loading="filtersLoading" @click="filtersPage" />
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <HyTableTemplate
      ref="hyTableTemplate"
      :api="api"
      :columns="columns"
      :columnsExpand="columnsExpand"
      :showEdit="showEdit"
      :showInfo="showInfo"
      :showDelete="showDelete"
      :showCheckbox="showCheckbox"
      :showOperation="showOperation"
      :permsEdit="permsEdit"
      :permsDelete="permsDelete"
      :permsInfo="permsInfo"
      :hightlightCurrentRow="true"
      :showOverflowTooltip="true"
      :size="size"
      :pageRequest="pageRequest"
      :paginationSmall="paginationSmall"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="selectionChange"
      @handleEdit="handleEdit"
      @handleInfo="handleInfo"
      @handleBatchDelete="handleBatchDelete"
    ></HyTableTemplate>

    <!--自定义新增\编辑\查看-->
    <hy-dialog-template
      :title="dialogTitle"
      width="50%"
      :visible.sync="dialogVisible"
      @hy-dialog-tpl:ok="refreshTable"
    >
      <slot name="detail" :dataForm="dataForm" :readOnly="readOnly"></slot>
    </hy-dialog-template>
  </div>
</template>

<script>
import HyButton from './HyButton'
import HyTableTemplate from './HyTableTemplate'
import HyDialogTemplate from './HyDialogTemplate'

export default {
  name: 'hy-list-template',

  components: {
    HyButton,
    HyTableTemplate,
    HyDialogTemplate
  },

  data () {
    return {
      // 表格样式大小
      size: 'mini',

      // 显示搜索对话框
      showFiltersDialog: false,

      // 搜索选项
      filters: {},

      // 表格数据
      pageResult: {},

      // 选中的所有行
      selections: [],

      // 模态框是否显示
      dialogVisible: false,

      // 模态框标题
      dialogTitle: '',

      // 表格数据加载状态
      loading: false,

      // 新增编辑界面数据
      dataForm: {},
      // 是否只读
      readOnly: false,

      // 搜索加载状态
      filtersLoading: false,
      resetLoading: false
    }
  },

  props: {
    // 表格表头列
    columns: {
      type: Array,
      required: true
    },
    // 表格项目详情
    columnsExpand: {
      type: Object,
      required: false
    },
    // 操作表格api对象
    api: {
      type: Object,
      required: true
    },
    // 表格分页
    pageRequest: {
      type: Object,
      default () {
        return {
          page: 1,
          rows: 20
        }
      }
    },

    paginationSmall: {
      // 分页组件大小
      type: Boolean,
      default: false
    },

    // 是否显示新增
    showAdd: {
      type: Boolean,
      default: true
    },
    // 是否显示编辑
    showEdit: {
      type: Boolean,
      default: true
    },
    showInfo: {
      // 是否显示操作组件(查看)
      type: Boolean,
      default: true
    },
    // 是否显示删除
    showDelete: {
      type: Boolean,
      default: true
    },
    // 是否显示复选框
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 是否显示批量删除
    showBatchDelete: {
      type: Boolean,
      default: true
    },
    // 是否显示搜索框
    showFilter: {
      type: Boolean,
      default: true
    },
    // 是否显示操作栏
    showOperation: {
      type: Boolean,
      default: true
    },
    permsAdd: {
      // 操作权限(添加)
      type: String,
      required: false
    },
    permsDelete: {
      // 操作权限(删除)
      type: String,
      required: false
    },
    permsEdit: {
      // 操作权限(编辑)
      type: String,
      required: false
    },
    permsInfo: {
      // 操作权限(查看)
      type: String,
      required: false
    },
    permsView: {
      // 操作权限(查看列表)
      type: String,
      required: false
    }
  },

  methods: {
    // 获取分页数据
    async findPage () {
      await this.$refs.hyTableTemplate.findPage(this.filters)
    },

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

    // 添加修改后更新数据行
    refreshTable ({ data }) {
      this.$refs.hyTableTemplate.save(data.data)
    },

    // 选中行改变
    selectionChange (selections) {
      this.selections = selections
      this.$emit('selection-change', selections)
    },

    // 批量删除
    handleBatchDelete () {
      // let ids = this.selections.map((item) => {
      //   return item.id
      // })
      this.batchDelete(this.selections)
    },

    // 批量删除
    batchDelete (ids) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          await this.api.batchDelete(ids)
          await this.findPage({ pageRequest: this.pageRequest })
          this.$message({ message: '删除成功', type: 'success', center: true })
        } catch (e) {
          this.$message({ message: e, type: 'error', center: true })
        } finally {
          this.loading = false
        }
      }).catch(() => {})
    },

    // 当前选中行改变
    handleCurrentChange (data) {
      this.$emit('handleCurrentChange', data)
    },
    // 设置选中行
    toggleRowSelection (rows) {
      this.$refs.hyTableTemplate.toggleRowSelection(rows)
    },
    // 显示新增界面
    handleAdd () {
      this.dialogVisible = true
      this.dialogTitle = '增加'

      // 赋值默认的数据域
      this.dataForm = {}
      this.readOnly = false
    },

    // 显示编辑界面
    handleEdit (params) {
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.readOnly = false
      this.dataForm = Object.assign({}, params.row)
    },

    // 显示查看界面
    handleInfo (params) {
      this.dialogVisible = true
      this.dialogTitle = '查看'
      this.readOnly = true
      this.dataForm = Object.assign({}, params.row)
    }
  }
}
</script>

<style lang="scss" scoped>
.hy-list-template-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-pagination {
    flex-grow: 1;
    border-top: 1px solid #8080806e;
  }
}
</style>
