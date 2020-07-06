<template>
  <div @click="handleClick">
    <el-tooltip v-if="collapse" class="item" effect="dark" :content="label" placement="right">
      <div class="account">
        <i :class="icon"></i>
      </div>
    </el-tooltip>
    <div v-else class="account">
      <i :class="icon"></i>
      <span>{{label}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuTreeItem",
  props: {
    label: {
      // 标签文本
      type: String,
      required: true
    },
    icon: {
      // 标签图标
      type: String,
      required: true
    },
    url: {
      // 标签URL
      type: String
    },
    collapse: {
      // 折叠
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick: function() {
      //URL为空
      if (!this.url) {
        this.$emit("click", {});
      } else {
        // 通过菜单URL跳转至指定路由
        this.$router.push("/" + this.url);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.account {
  padding: 0 20px;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #182c3f;
  }
  i {
    color: #909399;
    font-size: 18px;
    margin-left: 3px;
  }
  span {
    color: white;
    font-size: 14px;
    margin-left: 13px;
  }
}
</style>