<template>
  <HyFormTemplate :dataForm="dataForm" :rules="dataFormRules" :readOnly="readOnly" :api="api">
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="上级机构" prop="parentId">
      <el-cascader
        v-model="dataForm.parentId"
        :props="cascaderProps"
        :show-all-levels="false"
        style="width:100%"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="上级机构" prop="parentId" v-if="false">
      <el-input v-model="dataForm.parentId" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="排序编号" prop="orderNum">
      <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0"></el-input-number>
    </el-form-item>
  </HyFormTemplate>
</template>

<script>
import HyFormTemplate from '@/components/ZCore/HyFormTemplate'

export default {
  name: 'dept-detail',
  components: {
    HyFormTemplate
  },

  data () {
    const that = this
    return {
      dataFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      cascaderProps: {
        lazy: true,
        checkStrictly: true,
        lazyLoad: async function (node, resolve) {
          let parentId = null
          if (node.data) {
            parentId = node.data.value
          }
          const res = await that.$api.sys.dept.findDeptTree({filters: {parentId}})
          const data = res.data
          const nodes = data.map(item => {
            return {
              label: item.name,
              value: item.id,
              leaf: false
            }
          })

          resolve(nodes)
        }
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
      return this.$api.sys.dept.save
    }
  },
  methods: {}
}
</script>
