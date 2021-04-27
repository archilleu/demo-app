<template>
  <div class="menu-table">
    <div ref="hy-toolbar"
         class="hy-toolbar">
      <el-form :inline="true"
               size="mini">
        <!-- 自定义工具栏 -->
        <el-form-item>
          <hy-button icon="fa fa-plus"
                     perms="sys:menu:add"
                     label="新增"
                     size="mini"
                     type="success"
                     @click="handleAdd" />
          <hy-button icon="fa fa-refresh"
                     perms="sys:menu:view"
                     label="刷新"
                     size="mini"
                     type="primary"
                     @click="handleRefresh" />
        </el-form-item>
      </el-form>

      <el-tooltip effect="dark"
                  content="打开查询选项"
                  placement="bottom-end">
        <span v-if="false"
              class="search-btn"
              @click="showFiltersDialog = true">
          <i class="el-icon-search"></i>
        </span>
      </el-tooltip>
      <el-drawer title="查询条件"
                 size="30%"
                 :wrapperClosable="false"
                 :visible.sync="showFiltersDialog"
                 direction="rtl"
                 custom-class="search-drawer"
                 ref="searchDrawer">
        <!-- 自定义搜索栏 -->
        <el-form class="filtersForm"
                 :model="filters"
                 label-position="left"
                 ref="filtersForm"
                 size="mini">
          <el-form-item label="名称"
                        label-width="50px"
                        prop="name">
            <el-input v-model="filters.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="footer">
            <hy-button label="重置"
                       :loading="resetLoading"
                       @click="findReset" />
            <hy-button label="搜索"
                       type="success"
                       :loading="filtersLoading"
                       @click="findTreeData" />
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <!--表格树内容栏-->
    <div class="tree-table">
      <el-table stripe
                rowKey="id"
                size="mini"
                :data="tableData"
                style="width: 100%;"
                v-loading="loading"
                highlight-current-row
                element-loading-text="加载中...">
        <el-table-column prop="id"
                         header-align="center"
                         align="left"
                         width="100"
                         label="ID"></el-table-column>
        <!-- 自定义列 -->
        <el-table-column v-for="column in columns"
                         align="center"
                         header-align="center"
                         :prop="column.prop"
                         :label="column.label"
                         :min-width="column.minWidth"
                         :key="column.prop"
                         :formatter="column.formatter"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-if="!column.template">{{ scope.row[scope.column.property] }}</div>
            <div v-else
                 v-html="column.template(scope.row)"></div>
          </template>
        </el-table-column>

        <!-- 左边固定操作列 -->
        <el-table-column label="操作"
                         width="140"
                         fixed="right"
                         header-align="center"
                         align="center">
          <template slot-scope="scope">
            <hy-button perms="sys:menu:add"
                       icon="fa fa-edit"
                       :circle="true"
                       size="mini"
                       type="primary"
                       @click="handleEdit(scope.row)" />
            <hy-button perms="sys:menu:view"
                       icon="fa fa-envelope-o"
                       :circle="true"
                       size="mini"
                       type="info"
                       @click="handleInfo(scope.row)" />
            <hy-button perms="sys:menu:delete"
                       icon="fa fa-trash"
                       :circle="true"
                       size="mini"
                       type="danger"
                       @click="handleDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--自定义新增\编辑\查看-->
    <el-dialog width="40%"
               :title="dlg.title"
               :visible.sync="dlg.visible"
               :close-on-click-modal="false">
      <Detail :dataForm="dlg.dataForm"
              :readOnly="dlg.readOnly"
              @submit:ok="updateTreeTableData"></Detail>
    </el-dialog>
  </div>
</template>

<script>
import HyButton from '@/components/ZCore/HyButton'
import { formatDateTime } from '@/utils/datetime'

import Detail from './Detail'

export default {
  components: {
    HyButton,

    Detail
  },
  data () {
    return {
      loading: false,
      columns: [
        { prop: 'name', label: '名称', minWidth: 100 },
        {
          prop: 'icon',
          label: '图标',
          minWidth: 50,
          template: function (row) {
            if (row.icon != null) {
              return `<i class='${row.icon}'></i>`
            }
          }
        },
        {
          prop: 'type',
          label: '类型',
          minWidth: 80,
          template: function (row) {
            switch (row.type) {
              case 0:
                return '<span class="el-tag el-tag--small el-tag--light">目录</span>'
              case 1:
                return '<span class="el-tag el-tag--success el-tag--small el-tag--light">菜单</span>'
              case 2:
                return '<span class="el-tag el-tag--info el-tag--small el-tag--light">按钮</span>'
            }
          }
        },
        { prop: 'url', label: '菜单URL', minWidth: 150 },
        { prop: 'perms', label: '授权标识L', minWidth: 150 },
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
      dlg: {
        visible: false,
        title: '',
        dataForm: {},
        readOnly: false
      },

      // 搜索对话框
      showFiltersDialog: false,
      filters: {
      },
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
        const res = await this.$api.sys.menu.getMenuTree({ filters: this.filters })
        this.tableData = res.data
      } catch (e) {
        this.$msg.error(e)
      } finally {
        this.loading = false
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
      this.dlg.title = '添加'
      this.dlg.visible = true
      this.dlg.readOnly = false
      this.dlg.dataForm = {
        type: 1,
        orderNum: 0,
        parentId: 0,
        parentName: '' // 注意需要提前赋值，否则后面添加的话vue不能感知不存在的对象
      }
    },
    // 显示编辑界面
    handleEdit: function (row) {
      this.dlg.title = '编辑'
      this.dlg.visible = true
      this.dlg.readOnly = false
      this.dlg.dataForm = Object.assign({}, row)
    },
    // 显示查看界面
    handleInfo: function (row) {
      this.dlg.title = '查看'
      this.dlg.visible = true
      this.dlg.readOnly = true
      this.dlg.dataForm = Object.assign({}, row)
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          await this.$api.sys.menu.del(row)
          this.$msg.success('删除成功')

          this.handleRefresh()
        } catch (e) {
          this.$msg.error(e)
        } finally {
          this.loading = false
        }
      }).catch(() => { })
    },
    updateTreeTableData () {
      this.handleRefresh()
    },
    handleRefresh () {
      this.tableData = []
      this.findTreeData()
    }
  },
  mounted () {
    this.findTreeData()
  }
}
</script>

<style lang="scss" scoped>
.menu-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tree-table {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
