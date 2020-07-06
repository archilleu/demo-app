<template>
  <div class="page-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.label" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <hy-button icon="fa fa-search" label="查询" type="primary" @click="findPage(null)" />
        </el-form-item>
        <el-form-item>
          <hy-button icon="fa fa-plus" label="添加" type="primary" @click="handleAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格栏目 -->
    <HyTable
      permsEdit="sys:dict:edit"
      permDelete="sys:dict:delete"
      :data="pageResult"
      :columns="columns"
      :loading="loading"
      :showOverflowTooltip="true"
      @findPage="findPage"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></HyTable>

    <!--新增和编辑界面-->
    <el-dialog
      :title="operation?'新增':'编辑'"
      width="40%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="auto"
        :rules="dataFormRules"
        ref="dataForm"
        :size="size"
      >
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="label">
          <el-input v-model="dataForm.label" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="dataForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="dataForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述 " prop="description">
          <el-input v-model="dataForm.description" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HyButton from "@/components/Core/HyButton";
import HyTable from "@/components/Core/HyTable";
import { formatDateTime } from "@/utils/datetime";

export default {
  components: {
    HyButton,
    HyTable
  },

  data() {
    return {
      columns: [
        { prop: "id", label: "ID", minWidth: 50 },
        { prop: "label", label: "名称", minWidth: 100 },
        { prop: "value", label: "值", minWidth: 100 },
        { prop: "type", label: "类型", minWidth: 80 },
        { prop: "sort", label: "排序", minWidth: 80 },
        { prop: "description", label: "描述", minWidth: 120 },
        { prop: "remarks", label: "备注", minWidth: 120 },
        { prop: "createBy", label: "创建人", minWidth: 100 },
        {
          prop: "createTime",
          label: "创建时间",
          minWidth: 140,
          formatter: formatDateTime
        }
      ],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},

      loading: false,
      size: "small",
      filters: {
        label: ""
      },
      dataForm: {
        id: 0,
        label: "",
        value: "",
        type: "",
        sort: 0,
        description: "",
        remarks: ""
      },
      dataFormRules: {
        label: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },

      operation: false, // true:新增,false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false //提交中
    };
  },

  methods: {
    // 获取分页数据
    findPage: function(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.loading = true;
      this.pageRequest.params = [{ name: "label", value: this.filters.label }];
      this.$api.dict.findPage(this.pageRequest).then(res => {
        this.pageResult = res.data;
        this.loading = false;
      });
    },
    //显示新增界面
    handleAdd() {
      this.dialogVisible = true;
      this.operation = true;
      this.dataForm = {
        id: 0,
        label: "",
        value: "",
        type: "",
        sort: 0,
        description: "",
        remarks: ""
      };
    },
    handleEdit(data) {
      this.dialogVisible = true;
      this.operation = false;
      this.dataForm = Object.assign({}, data.row);
    },
    handleDelete(data) {
      this.loading = true;
      this.$api.dict.batchDelete(data.params).then(res => {
        if (res.code == 200) {
          this.$message({ message: "删除成功", center: true, type: "success" });
          this.findPage(null);
        } else {
          this.$message({
            message: "操作失败, " + res.msg,
            center: true,
            type: "error"
          });
        }
      });
    },
    submitForm() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            this.$api.dict.save(params).then(res => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error"
                });
              }
              this.editLoading = false;
              this.$refs.dataForm.resetFields();
              this.dialogVisible = false;
              this.findPage(null);
            });
          });
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>