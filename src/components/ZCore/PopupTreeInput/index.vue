<template>
  <div>
    <el-popover ref="popover" :placement="placement" trigger="click">
      <el-tree
        class="popover"
        :data="data"
        :props="props"
        :node-key="nodeKey"
        ref="popupTree"
        @current-change="currentChangeHandle"
        :default-expand-all="defaultExpandAll"
        :highlight-current="true"
        :expand-on-click-node="true"
      ></el-tree>
    </el-popover>
    <el-input
      v-model="prop"
      v-popover:popover
      :readonly="true"
      :placeholder="placeholder"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'PopupTreeInput',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    props: {
      type: Object,
      default () {
        return {
          label: 'name',
          children: 'children'
        }
      }
    },
    prop: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '点击选择内容'
    },
    placement: {
      type: String,
      default: 'right-start'
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    currentChangeHandle: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.popover {
  max-height: 364px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
