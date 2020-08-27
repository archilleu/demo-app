<template>
  <HyFormTemplate :dataForm="dataForm" :rules="dataFormRules" :readOnly="readOnly" :api="api">
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
  </HyFormTemplate>
</template>

<script>
import HyFormTemplate from '@/components/ZCore/HyFormTemplate'

export default {
  name: 'dict-detail',
  components: {
    HyFormTemplate
  },

  data () {
    return {
      dataFormRules: {
        label: [{ required: true, message: '请输入名字', trigger: 'blur' }]
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
      return this.$api.sys.dict.save
    }
  },
  methods: {}
}
</script>
