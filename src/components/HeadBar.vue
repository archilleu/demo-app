<template>
  <el-row>
    <div class="headbar" background-color="#545c64">
      <!-- logo和标题 -->
      <el-col :md="7" :sm="8" :xs="2">
        <span class="logo-title">
          <img src="@/assets/logo.png" alt="logo" />
          <span>贵州省警用航空智能云</span>
        </span>
      </el-col>

      <!-- 主菜单栏 -->
      <el-col :md="10" :sm="14" :xs="18">
        <span class="main-menu">
          <el-menu
            :default-active="activeIndex"
            class="el-main-menu"
            mode="horizontal"
            @select="handleSelect"
            background-color="#1e374f"
            text-color="#fff"
            active-text-color="#409eff"
          >
            <el-menu-item index="1">警航中心</el-menu-item>
            <el-menu-item index="2">通航中心</el-menu-item>
            <el-menu-item index="3">测试中心</el-menu-item>
            <el-menu-item index="4">系统管理</el-menu-item>
          </el-menu>
        </span>
      </el-col>

      <!-- 工具栏 -->
      <el-col :md="7" :sm="2" :xs="4">
        <span class="toolbar">
          <el-menu
            class="el-menu-toolbar"
            mode="horizontal"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409eff"
          >
            <el-menu-item index="1">
              <!-- 用户信息 -->
              <span class="user-info">
                {{user.name}}
                <img :src="user.avatar" />
              </span>
            </el-menu-item>
          </el-menu>
        </span>
      </el-col>
    </div>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
import mock from "@/mock/index";
import Hamburger from "./Hamburger";

export default {
  data() {
    return {
      user: {
        name: "Louis",
        avatar: "",
        role: "超级管理员",
        registeInfo: "注册时间：2018-12-20 "
      },
      activeIndex: "1",
      langVisible: false
    };
  },
  components: {
    Hamburger
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key + keyPath);
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      this.user.name = user;
      this.user.avatar = require("@/assets/user.png");
    }
  },
  computed: {
    ...mapState({})
  }
};
</script>

<style scoped lang="scss">
@import "../assets/base.scss";

.headbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $headBarHeight;
  line-height: $headBarHeight;
  background-color: #1e374f;
  display: flex;
  justify-content: space-between;
  > span {
    display: inline-block;
    height: inherit;
  }
  ul {
    border-bottom: none;
  }
  .logo-title {
    height: $headBarHeight;
    display: flex;
    > img {
      margin: 10px;
      height: 40px;
    }
    > span {
      color: white;
      font-size: 20px;
      font-weight: bold;
      overflow: hidden;
    }
  }
  .main-menu {
    display: flex;
    justify-content: center;
  }
  .toolbar {
    display: flex;
    justify-content: flex-end;
  }
  .user-info {
    color: #fff;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
    }
  }
}
</style>