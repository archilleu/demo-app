<template>
  <!-- <login-page></login-page> -->
  <el-form :model="loginForm"
           :rules="fieldRules"
           ref="loginForm"
           label-position="left"
           label-width="0px"
           class="demo-ruleForm login-container">
    <span class="tool-bar"></span>
    <h2 class="title"
        style="padding-left:22px;">系统登录</h2>
    <el-form-item prop="account">
      <el-input type="text"
                v-model="loginForm.account"
                auto-complete="off"
                placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary"
                 style="width:45%;"
                 @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary"
                 style="width:45%;"
                 @click.native.prevent="login"
                 :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import router from '@/router'
import LocalUser from "@/utils/user.js";

export default {
  name: 'Login',
  components: {
    // "login-page": async () => {
    //   let page = "default";
    //   try {
    //     const res = await getParam();
    //     page = res.data.jspLogin;
    //     store.commit('sysParam', res.data)
    //     return import(`./LoginPage/${page}`)
    //   } catch (e) {
    //     return import('./LoginPage/default')
    //   }
    // }
  },
  data () {
    return {
      loading: false,
      loginForm: {
        account: 'admin',
        password: 'admin'
      },
      fieldRules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: true
    }
  },
  methods: {
    async login () {
      try {
        this.loading = true

        // 登录
        const res = await this.$api.user.login.login(this.loginForm)
        LocalUser.init(res.data.token);

        this.$store.commit('menuRouteLoaded', false)
        router.push('/')
      } catch (e) {
        this.$msg.error(e)
        this.loading = false
      }
    },
    reset () {
      this.$refs.loginForm.resetFields()
    }
  },
  created () {
    // 刷新路由，应为没有删除路由的方法
    if (this.$store.state.app.menuRouteLoaded) {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
