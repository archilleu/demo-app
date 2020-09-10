<template>
  <div class="hy-height-100 lazyTable">
    <div ref="hy-toolbar" class="hy-toolbar">
      <el-form :inline="true" size="mini">
        <!-- 自定义工具栏 -->
        <el-form-item>
          <hy-button icon="fa fa-plus" label="新增" size="mini" type="success" @click="handleAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!--表格树内容栏-->
    <div class="tree-table">
      <el-table
        lazy
        stripe
        rowKey="id"
        size="mini"
        :load="load"
        :data="deptTreeData"
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
    <el-dialog
      width="30%"
      :title="dlg.title"
      :visible.sync="dlg.visible"
      :close-on-click-modal="false"
    >
      <Detail :dataForm="dlg.dataForm" :readOnly="dlg.readOnly" @submit:ok="refreshTable"></Detail>
    </el-dialog>
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
        { prop: 'name', label: '名称', minWidth: 200 },
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

      // 表格数据
      deptTreeData: [],

      // 编辑修改对话框
      dlg: {
        visible: false,
        title: '',
        dataForm: {},
        readOnly: false
      }
    }
  },
  methods: {
    // 获取数据
    async findTreeData (params) {
      try {
        this.loading = true
        const res = await this.$api.sys.dept.findDeptTree(params)
        this.deptTreeData = res.data
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
        const res = await this.$api.sys.dept.findDeptTree({parentId: tree.id})
        resolve(res.data)
      } catch (e) {
        this.$message({
          message: e,
          type: 'error',
          center: true
        })
      }
    },
    // 显示新增界面
    handleAdd: function () {
      this.dlg.dialogTitle = '添加'
      this.dlg.visible = true
      this.dlg.readOnly = false
      this.dlg.dataForm = {
        name: '',
        parentId: null,
        parentName: '',
        orderNum: 0
      }
    },
    // 显示编辑界面
    handleEdit: function (row) {
      this.dlg.dialogTitle = '编辑'
      this.dlg.visible = true
      this.dlg.readOnly = false
      this.dlg.dataForm = Object.assign({}, row)
    },
    // 显示查看界面
    handleInfo: function (row) {
      this.dlg.dialogTitle = '擦看'
      this.dlg.visible = true
      this.dlg.readOnly = true
      this.dlg.dataForm = Object.assign({}, row)
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确认删除选中机构吗？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          try {
            this.loading = true
            await this.$api.sys.dept.del(row)
            const res = await this.$api.sys.dept.findDeptTree()
            this.deptTreeData = res.data
            this.$message({ message: '删除成功', type: 'success' })
          } catch (e) {
            this.$message({ message: e, type: 'error', center: true })
          } finally {
            this.loading = false
          }
        })
        .catch(() => {})
    },
    async refreshTable () {
      this.deptTreeData = []
      await this.findTreeData()
    }
  },
  mounted () {
    this.findTreeData()
  }
}
</script>

<style lang="scss">
.lazyTable {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tree-table {
    flex-grow: 1;
    overflow: auto;
  }
  .el-dialog__body {
    margin: 10px 20px;
    padding: 20px 30px;
    border-top: 1px solid #8080808a;
  }
  .el-dialog {
    border-radius: 1%;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  }
}
</style>
