<template>
  <HyFormTemplate :dataForm="dataForm" :rules="dataFormRules" :readOnly="readOnly" :api="api">
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="dataForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="dataForm.nickName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="机构" prop="deptName">
      <popup-tree-input
        :data="deptData"
        :props="deptTreeProps"
        :prop="dataForm.deptName"
        :nodeKey="''+dataForm.deptId"
        :currentChangeHandle="deptTreeCurrentChangeHandle"
      ></popup-tree-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="userRoles" v-if="!operation">
      <el-select v-model="dataForm.userRoles" multiple placeholder="请选择" style="width: 100%;">
        <el-option v-for="item in roles" :key="item.id" :label="item.remark" :value="item.id"></el-option>
      </el-select>
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
      return this.$api.sys.user.save
    }
  },
  methods: {}
}
</script>
