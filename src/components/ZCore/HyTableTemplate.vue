<template>
  <div class="table-pagination"
       ref="tablePagination">
    <!--表格栏-->
    <el-table ref="hyTable"
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
              :align="align">
      <!-- 详情列 -->
      <el-table-column v-if="columnsExpand && columnsExpand.data.length!=0"
                       type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   class="table-expand"
                   size="mini"
                   :label-width="columnsExpand.labelWidth">
            <el-form-item v-for="item in columnsExpand.data"
                          :key="item.prop"
                          :label="item.label">
              <span v-if="!item.formatter">{{ props.row[item.prop] }}</span>
              <span v-else>{{ item.formatter(props.row[item.prop], props.row) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 多选列 -->
      <el-table-column type="selection"
                       header-align="center"
                       align="center"
                       width="50"
                       v-if="showCheckbox"></el-table-column>

      <!-- 自定义列 -->
      <el-table-column v-for="column in columns"
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
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="column.formatter">{{ column.formatter(scope.row, scope.column) }}</div>
          <div v-else-if="column.template"
               v-html="column.template(scope.row)"></div>
          <div v-else>{{ scope.row[scope.column.property] }}</div>
        </template>
      </el-table-column>

      <!-- 左边固定操作列 -->
      <el-table-column label="操作"
                       width="140"
                       fixed="right"
                       v-if="showOperation"
                       header-align="center"
                       align="center">
        <template slot-scope="scope">
          <hy-button :perms="permsEdit"
                     icon="fa fa-edit"
                     :circle="true"
                     :size="size"
                     type="primary"
                     @click="handleEdit(scope.$index, scope.row)"
                     v-if="showEdit" />
          <hy-button :perms="permsInfo"
                     icon="fa fa-envelope-o"
                     :circle="true"
                     :size="size"
                     type="info"
                     @click="handleInfo(scope.$index, scope.row)"
                     v-if="showInfo" />
          <hy-button :perms="permsDelete"
                     icon="fa fa-trash"
                     :circle="true"
                     :size="size"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)"
                     v-if="showDelete" />
        </template>
      </el-table-column>
    </el-table>

    <!--分页栏-->
    <div class="pagination"
         ref="pagination">
      <el-pagination :small="paginationSmall"
                     :current-page="pageRequest.page"
                     :page-sizes="[10, 20, 30, 40, 50]"
                     :page-size="pageRequest.rows"
                     :layout="layout"
                     :total="data.totalSize"
                     :pager-count="5"
                     background
                     @current-change="refreshPageRequest"
                     @size-change="handleSizeChange"></el-pagination>
      <i class="el-icon-refresh"
         @click="findPage(filters)"></i>
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
      // type: Object,
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
        const res = await this.api.findPage({ filters, pageRequest: this.pageRequest })
        res.data.totalSize = parseInt(res.data.totalSize)
        this.data = res.data
      } catch (e) {
        this.$msg.error(e)
      } finally {
        this.loading = false
      }
    },

    // 保存数据
    save (data) {
      let idx = this.data.content.findIndex(item => item.id === data.id)
      if (idx !== -1) {
        // update
        this.$set(this.data.content, idx, data)
      } else {
        // add
        if (this.data.content.length < this.pageRequest.rows) {
          this.data.content.unshift(data)
        } else {
          this.data.content.splice(this.pageRequest.rows - 1, 1)
          this.data.content.unshift(data)
        }
        this.data.totalSize++
      }
    },

    // 选择切换(多选)
    selectionChange (selections) {
      this.$emit('selection-change', selections)
    },

    // 选择切换
    handleCurrentChange (val) {
      this.currentRow = val
      this.$emit('current-change', { val: val })
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
      this.$emit('data-edit', { index: index, row: row })
    },

    // 查看
    handleInfo (index, row) {
      this.$emit('data-info', { index: index, row: row })
    },

    // 删除
    async handleDelete (index, row) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          try {
            this.loading = true
            await this.api.del(row.id)
            let idx = this.data.content.findIndex(item => item.id === row.id)
            if (idx !== -1) {
              if (row.id === this.currentRow.id) {
                this.handleCurrentChange(null)
              }
              this.data.content.splice(idx, 1)
            }
            this.$msg.success('删除成功')
          } catch (e) {
            this.$msg.error(e)
          } finally {
            this.loading = false
          }
        })
        .catch(() => { })
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
