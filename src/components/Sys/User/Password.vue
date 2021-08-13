<template>

  <el-form :model="ruleForm"
           status-icon
           size="mini"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="密码"
                  prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码"
                  prop="confirmPassword">
      <el-input v-model="ruleForm.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 :loading="saveLoading"
                 @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        confirmPassword: '',
      },
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      },

      saveLoading: false
    }
  },
  props: {
    user: {
      type: Object,
      required: false
    },
    api: {
      type: Function,
      required: true
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = {
            id: this.user.id,
            password: this.ruleForm.password
          }

          try {
            this.saveLoading = true
            await this.api(data)
            this.$msg.success('修改成功')
          } catch (e) {
            this.$msg.error(e)
          } finally {
            this.saveLoading = false
            this.$emit('save-ok', true)
            this.$parent.$emit('update:visible', false)
          }
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.$parent.$emit('update:visible', false)
    }
  }
}
</script>