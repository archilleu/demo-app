<template>
  <HyFormTemplate :dataForm="dataForm" :rules="dataFormRules" :readOnly="readOnly" :api="api">
    <el-form-item label="菜单类型" prop="type">
      <el-radio-group v-model="dataForm.type">
        <el-radio v-for="(type, index) in menuTypeList" :label="index" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="menuTypeList[dataForm.type] + '名称'" prop="name">
      <el-input v-model="dataForm.name" :placeholder="menuTypeList[dataForm.type] + '名称'"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单" prop="parentName">
      <popup-tree-input
        :data="popupTreeData"
        :props="popupTreeProps"
        :prop="dataForm.parentName==null||dataForm.parentName==''?'顶级菜单':dataForm.parentName"
        nodeKey="id"
        :currentChangeHandle="handleTreeSelectChange"
      ></popup-tree-input>
    </el-form-item>
    <el-form-item v-if="dataForm.type !== 0" label="授权标识" prop="perms">
      <el-input
        v-model="dataForm.perms"
        placeholder="如: sys:user:add, sys:user:edit, sys:user:delete"
      ></el-input>
    </el-form-item>
    <el-form-item v-if="dataForm.type === 1" label="菜单路由" prop="url">
      <el-row>
        <el-col :span="22">
          <el-input v-model="dataForm.url" placeholder="菜单路由"></el-input>
        </el-col>
        <el-col :span="2">
          <el-tooltip placement="top" effect="light" style="padding: 10px;">
            <div slot="content">
              <p>URL格式：</p>
              <p>1.常规业务开发的功能URL，如用户管理，components目录下页面路径为 /Sys/User/Index, 此处填写 /sys/user/index。</p>
              <p>2.嵌套外部网页，如通过菜单打开百度网页，此处填写 http://www.baidu.com，http:// 不可省略。</p>
              <p>示例：用户管理：/sys/user/index 嵌套百度：http://www.baidu.com 嵌套网页：http://127.0.0.1:8000</p>
            </div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="dataForm.type !== 2" label="排序编号" prop="orderNum">
      <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序编号"></el-input-number>
    </el-form-item>
    <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
      <el-row>
        <el-col :span="22">
          <el-input v-model="dataForm.icon" placeholder="菜单图标名称（如：fa fa-home fa-lg）"></el-input>
        </el-col>
        <el-col :span="2">
          <el-tooltip placement="top" effect="light" style="padding: 10px;">
            <div slot="content">
              <p>推荐使用 Font Aweson 图标</p>
              <p>使用步骤：</p>
              <p>
                1.进入
                <a href="http://www.fontawesome.com.cn/faicons/" target="_blank">Font Aweson</a> 页面
              </p>
              <p>2.查找到需要的图标,点击查看。</p>
              <p>3.复制图片样式到此处。</p>
              <p>示例：fa fa-home fa-lg</p>
            </div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
  </HyFormTemplate>
</template>

<script>
import HyFormTemplate from '@/components/ZCore/HyFormTemplate'
import PopupTreeInput from '@/components/ZCore/PopupTreeInput'

export default {
  name: 'dept-detail',
  components: {
    HyFormTemplate,
    PopupTreeInput
  },

  data () {
    return {
      dataFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      menuTypeList: ['目录', '菜单', '按钮'],
      options: [],
      popupTreeData: [],
      popupTreeProps: {
        label: 'name',
        children: 'children'
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
      return this.$api.sys.menu.save
    }
  },
  async mounted () {
    try {
      const res = await this.$api.sys.menu.findMenuTree()
      this.popupTreeData = res.data
    } catch (e) {
      this.$message({ message: e, type: 'success', center: true })
    }
  },
  methods: {
    // 菜单树选中
    handleTreeSelectChange (data, node) {
      this.dataForm.parentId = data.id
      this.dataForm.parentName = data.name
    }
  }
}
</script>
