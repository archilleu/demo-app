<template>
  <el-form
    ref="deptForm"
    :rules="dataFormRules"
    :model="dataForm"
    :disabled="readOnly"
    label-width="100px"
    label-position="left"
    size="mini"
  >
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="机构" prop="parentName">
      <popup-tree-input
        :data="popupTreeData"
        :prop="dataForm.parentName"
        nodeKey="id"
        :currentChangeHandle="handleTreeSelectChange"
      ></popup-tree-input>
    </el-form-item>
    <el-form-item label="上级机构" prop="parentId" v-if="false">
      <el-input v-model="dataForm.parentId" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="排序编号" prop="orderNum">
      <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item v-if="!readOnly" class="footer">
      <el-button @click="emitClose">取消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import PopupTreeInput from '@/components/ZCore/PopupTreeInput'

export default {
  name: 'dept-detail',
  components: {
    PopupTreeInput
  },

  data () {
    return {
      dataFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },

      popupTreeData: [],

      loading: false
    }
  },
  props: {
    dataForm: {
      type: Object,
      required: true
    },

    readOnly: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    api () {
      return this.$api.sys.dept.save
    }
  },
  methods: {
    onSubmit () {
      this.$refs.deptForm.validate((valid) => {
        if (!valid) {
          return
        }

        this.$confirm('确定', '保存机构', {})
          .then(async () => {
            try {
              this.loading = true
              await this.$api.sys.dept.save(this.dataForm)

              this.$message({message: '成功', type: 'success', center: true})
              this.emitSubmit()
            } catch (e) {
              this.$message({message: '失败' + e, type: 'error', center: true})
            } finally {
              this.loading = false
            }
          })
          .catch((e) => {})
      })
    },

    emitClose () {
      this.$parent.$emit('update:visible', false)
    },
    async emitSubmit () {
      this.$emit('submit:ok', { visible: false })
      this.emitClose()
      await this.getTreeData()
    },
    // 菜单树选中
    handleTreeSelectChange (data, node) {
      this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
    },

    async getTreeData () {
      try {
        const res = await this.$api.sys.dept.findDeptTreeAll()
        this.popupTreeData = res.data
      } catch (e) {
        this.$message({ message: e, type: 'success', center: true })
      }
    }
  },
  async mounted () {
    await this.getTreeData()
  }
}
</script>
