<template>
  <div class="table-pagination" ref="tablePagination">
    <!--表格栏-->
    <el-table
      ref="hyTable"
      class="hy-table"
      height="100%"
      :data="data.content"
      :highlight-current-row="hightlightCurrentRow"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      row-key="id"
      v-loading="loading"
      element-loading-text="加载中..."
      :border="border"
      :stripe="stripe"
      :show-overflow-tooltip="showOverflowTooltip"
      :size="size"
      :align="align"
    >
      <!-- 详情列 -->
      <el-table-column v-if="columnsExpand && columnsExpand.data.length!=0" type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            class="table-expand"
            size="mini"
            :label-width="columnsExpand.labelWidth"
          >
            <el-form-item v-for="item in columnsExpand.data" :key="item.prop" :label="item.label">
              <span v-if="!item.formatter">{{ props.row[item.prop] }}</span>
              <span v-else>{{ item.formatter(props.row[item.prop], props.row) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 多选列 -->
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
        v-if="showCheckbox"
      ></el-table-column>

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

      <!-- 左边固定操作列 -->
      <el-table-column
        label="操作"
        width="140"
        fixed="right"
        v-if="showOperation"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <hy-button
            icon="fa fa-edit"
            :circle="true"
            :size="size"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="showEdit"
          />
          <hy-button
            icon="fa fa-envelope-o"
            :circle="true"
            :size="size"
            type="info"
            @click="handleInfo(scope.$index, scope.row)"
            v-if="showInfo"
          />
          <hy-button
            icon="fa fa-trash"
            :circle="true"
            :size="size"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="showDelete"
          />
        </template>
      </el-table-column>
    </el-table>

    <!--分页栏-->
    <div class="pagination" ref="pagination">
      <el-pagination
        :small="paginationSmall"
        :current-page="pageRequest.page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageRequest.rows"
        :layout="layout"
        :total="data.totalSize"
        :pager-count="5"
        background
        @current-change="refreshPageRequest"
        @size-change="handleSizeChange"
      ></el-pagination>
      <i class="el-icon-refresh" @click="findPage(filters)"></i>
    </div>
  </div>
</template>

<script>
import HyButton from './HyButton'
export default {
  name: 'hy-table',
  components: {
    HyButton
  },
  props: {
    // 表格获取列表数据的api
    api: {
      type: Object,
      required: true
    },
    // 表格列配置
    columns: {
      type: Array,
      required: true
    },
    // 表格展开列数据
    columnsExpand: {
      type: Object,
      default () {
        return {
          data: [],
          labelWidth: '120px'
        }
      }
    },
    // 分页信息
    pageRequest: {
      type: Object,
      default: () => {
        return {
          page: 1,
          rows: 20
        }
      }
    },
    // 尺寸样式
    size: {
      type: String,
      default: 'mini'
    },
    align: {
      // 文本对齐方式
      type: String,
      default: 'left'
    },
    paginationSmall: {
      // 分页组件大小
      type: Boolean,
      default: false
    },
    showDelete: {
      // 是否显示操作组件(删除)
      type: Boolean,
      default: true
    },
    showEdit: {
      // 是否显示操作组件(编辑)
      type: Boolean,
      default: true
    },
    showInfo: {
      // 是否显示操作组件(查看)
      type: Boolean,
      default: true
    },
    showCheckbox: {
      // 是否显示操作组件(批量删除)
      type: Boolean,
      default: false
    },
    showOperation: {
      // 是否显示操作组件(修改删除)
      type: Boolean,
      default: true
    },
    border: {
      // 是否显示边框
      type: Boolean,
      default: false
    },
    stripe: {
      // 是否显示斑马线
      type: Boolean,
      default: true
    },
    hightlightCurrentRow: {
      // 是否高亮当前行
      type: Boolean,
      default: true
    },
    showOverflowTooltip: {
      // 当内容过长被隐藏时显示tooltip
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 加载标识
      loading: false,

      // 表格分页数据
      data: {
        content: []
      },

      // 过滤条件
      filters: null,

      // 当前行
      currentRow: null
    }
  },
  computed: {
    layout () {
      if (!this.paginationSmall) {
        return 'total, sizes, prev, pager, next, jumper'
      } else {
        return 'total, prev, pager, next, jumper'
      }
    }
  },
  methods: {
    // 分页查询
    async findPage (filters) {
      this.filters = filters
      try {
        this.loading = true
        const data = {
          filters,
          pageRequest: this.pageRequest
        }
        const res = await this.api.findPage(data)
        this.data = res.data
      } catch (e) {
        this.$message({ message: e, type: 'error', center: true })
      } finally {
        this.loading = false
      }
    },

    // 选择切换(多选)
    selectionChange (selections) {
      this.$emit('selection-change', selections)
    },

    // 选择切换
    handleCurrentChange (val) {
      this.currentRow = val
      this.$emit('handleCurrentChange', { val: val })
    },
    // 换页刷新
    refreshPageRequest (page) {
      this.pageRequest.page = page
      this.findPage(this.filters)
    },

    // 页大小改变
    handleSizeChange (page) {
      this.pageRequest.rows = page
      this.findPage(this.filters)
    },

    // 编辑
    handleEdit (index, row) {
      this.$emit('handleEdit', { index: index, row: row })
    },

    // 查看
    handleInfo (index, row) {
      this.$emit('handleInfo', { index: index, row: row })
    },

    // 删除
    async handleDelete (index, row) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          try {
            this.loading = true
            await this.api.del(row)
            await this.findPage(this.filters)
            this.$message({ message: '删除成功', type: 'success', center: true })
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
    this.refreshPageRequest(1)
  }
}
</script>

<style lang="scss" scoped>
.table-pagination {
  display: flex;
  flex-direction: column;
  .pagination {
    display: flex;
    padding: 10px 0 0 0;
    align-items: center;
    justify-content: flex-end;
    > button {
      margin-right: 15px;
    }
    .el-icon-refresh {
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.table-expand {
  font-size: 0;
  .el-form-item__label {
    color: #99a9bf !important;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
