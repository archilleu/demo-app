<template>
  <HyFormTemplate :dataForm="dataForm" :rules="dataFormRules" :readOnly="readOnly" :api="api">
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色名" prop="name">
      <el-input v-model="dataForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注 " prop="remark">
      <el-input v-model="dataForm.remark" auto-complete="off" type="textarea"></el-input>
    </el-form-item>
  </HyFormTemplate>
</template>

<script>
import HyFormTemplate from '@/components/ZCore/HyFormTemplate'

export default {
  name: 'role-detail',
  components: {
    HyFormTemplate
  },

  data () {
    return {
      dataFormRules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }]
      }
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
      return this.$api.sys.role.save
    }
  },
  methods: {}
}
</script>
