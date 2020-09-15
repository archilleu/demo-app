const tableMixin = {
  data () {
    return {

      // 编辑修改对话框
      dialogVisible: false,
      dialogTitle: '',
      dataForm: {},
      readOnly: false,

      // 搜索对话框
      showFiltersDialog: false,
      filters: {
      },
      // 搜索加载状态
      filtersLoading: false,
      resetLoading: false
    }
  },

  methods: {

    // 获取分页数据
    async findPage () {
      await this.$refs.hyTableTemplate.findPage(this.filters)
    },

    // 获取搜索数据
    async filtersPage () {
      try {
        this.filtersLoading = true
        await this.findPage()
      } finally {
        this.filtersLoading = false
      }
    },

    // 重置
    async findReset () {
      try {
        this.$refs.filtersForm.resetFields()
        this.resetLoading = true
        await this.findPage()
      } finally {
        this.resetLoading = false
      }
    },
    // 显示新增界面
    handleAdd () {
      this.dialogVisible = true
      this.dialogTitle = '增加'

      // 赋值默认的数据域
      this.dataForm = {}
      this.readOnly = false
    },

    // 显示编辑界面
    handleEdit (params) {
      this.dialogVisible = true
      this.dialogTitle = '编辑'
      this.readOnly = false
      this.dataForm = Object.assign({}, params.row)
    },

    // 显示查看界面
    handleInfo (params) {
      this.dialogVisible = true
      this.dialogTitle = '查看'
      this.readOnly = true
      this.dataForm = Object.assign({}, params.row)
    }
  }

}

export default tableMixin
