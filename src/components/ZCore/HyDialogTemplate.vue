<template>
  <!-- 通过el-dialog的update:visible消息更新本组件prop的visible值（直接用.sync 会导致vue警告，因为修改了prop visible值 -->
  <el-dialog class="hy-dialog-template"
             :title="title"
             :width="width"
             :visible="visible"
             @update:visible="handleClose"
             :close-on-click-modal="closeOnClickModal"
             @hy-form-template:submit="handleSubmit"
             @hy-form-template:close="handleClose">
    <!-- 因为表单不只有数据，而且又有验证规则,这里不能直接使用HyFormTemplate -->
    <slot>缺少HyFormTemplate组件</slot>
  </el-dialog>
</template>

<script>

export default {
  name: 'hy-dialog-template',

  props: {
    // 标题
    title: {
      type: String,
      required: true
    },
    // 宽度
    width: {
      type: String,
      default: '40%'
    },

    // 可见
    visible: {
      type: Boolean,
      required: true
    },

    // 点击蒙板关闭对话框
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleSubmit (data) {
      this.$emit('hy-dialog-template:submit', data)
    },

    handleClose (val) {
      this.$emit('update:visible', val)
    }
  }
}
</script>

<style lang="scss">
.hy-dialog-template {
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
