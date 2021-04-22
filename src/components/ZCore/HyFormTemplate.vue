<template>
  <el-form :rules="rules"
           :model="dataForm"
           :disabled="readOnly"
           :label-width="labelWidth"
           :label-position="labelPosition"
           ref="hyFormTemplate"
           size="mini"
           class="hy-form-template">
    <slot>填写表单项</slot>

    <el-form-item v-if="!readOnly"
                  class="hy-footer">
      <el-button @click="emitClose">{{ info.btnCancle }}</el-button>
      <el-button type="primary"
                 @click="onSubmit"
                 :loading="loading">{{ info.btnSubmit }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'hy-form-template',

  data () {
    return {
      loading: false
    }
  },

  props: {
    // 表单数据
    dataForm: {
      type: Object,
      required: true
    },

    readOnly: {
      type: Boolean,
      required: false
    },

    // 表单验证规则
    rules: {
      type: Object,
      required: false
    },

    // label宽度
    labelWidth: {
      type: String,
      default: 'auto'
    },

    // 对齐方式
    labelPosition: {
      type: String,
      default: 'left'
    },

    // 操作表单api
    api: {
      type: Function,
      required: true
    },

    // 操作提示
    info: {
      type: Object,
      default () {
        return {
          btnCancle: '取消',
          btnSubmit: '提交',
          confirm: {
            title: '提示',
            msg: '确认提交吗？'
          },
          success: '提交成功',
          error: '提交失败:'
        }
      }
    }
  },

  methods: {
    onSubmit () {
      this.$refs.hyFormTemplate.validate((valid) => {
        if (!valid) {
          return
        }

        this.$confirm(this.info.confirm.msg, this.info.confirm.title, {})
          .then(async () => {
            try {
              this.loading = true
              const res = await this.api(this.dataForm)

              this.$message({ message: this.info.success, type: 'success', center: true })

              this.emitClose()
              this.emitSubmit(res)
            } catch (e) {
              this.$message({ message: this.info.error + e, type: 'error', center: true })
            } finally {
              this.loading = false
            }
          })
          .catch((e) => { console.error(e) })
      })
    },

    emitClose () {
      //this->包裹模板->对话框->自定义对话框包裹(最终处理的event模板)
      this.$parent.$parent.$emit('hy-form-template:close', false)
    },
    emitSubmit (data) {
      this.$parent.$parent.$emit('hy-form-template:submit', data)
    }
  }
}
</script>

<style lang="scss">
.hy-form-template {
  .hy-footer {
    > div {
      text-align: right;
    }
  }
}
</style>
