<template>
  <div class="menu-bar-container">
    <!-- logo 标题 -->
    <div class="title" :class="collapse?'title-collapse':'title-notcollapse'">
      <el-avatar :size="40" :src="url" fit="cover" @click.native="goHome"></el-avatar>
      <span class="name" v-if="!collapse">智能云</span>
      <i class="el-icon-d-arrow-left" title="收缩" v-if="!collapse" @click="onCollapse"></i>
      <i class="el-icon-d-arrow-right" title="展开" v-else-if="collapse" @click="onCollapse"></i>
    </div>
    <!-- 导航菜单 -->
    <el-menu
      ref="navmenu"
      default-active="1"
      :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="collapse"
      :collapse-transition="false"
      background-color="#1e374f"
      text-color="#fff"
      active-text-color="#409eff"
      @open="handleopen"
      @close="handleclose"
      @select="handleselect"
    >
      <!-- 导航菜单树组件，动态加载菜单 -->
      <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
    </el-menu>
    <!-- 系统用户 -->
    <hr />
    <menu-tree-item label="系统用户" icon="el-icon-user" url="account" :collapse="collapse"></menu-tree-item>

    <div id="footer" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
      <!-- 系统反馈 -->
      <menu-tree-item label="系统反馈" icon="el-icon-chat-round" url="feedback" :collapse="collapse"></menu-tree-item>
      <menu-tree-item label="退出" icon="el-icon-switch-button" @click="logout" :collapse="collapse"></menu-tree-item>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MenuTree from "@/components/MenuTree";
import MenuTreeItem from "@/components/MenuTree/MenuTreeItem";
export default {
  data() {
    return {
      url: require("@/assets/logo.png")
    };
  },
  components: {
    MenuTree,
    MenuTreeItem
  },
  computed: {
    ...mapState({
      appName: state => state.app.appName,
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse,
      navTree: state => state.menu.navTree
    }),
    mainTabs: {
      get() {
        return this.$store.state.tab.mainTabs;
      },
      set(val) {
        this.$store.commit("updateMainTabs", val);
      }
    },
    mainTabsActiveName: {
      get() {
        return this.$store.state.tab.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("updateMainTabsActiveName", val);
      }
    }
  },
  watch: {
    $route: "handleRoute"
  },
  created() {
    //创建主页选项
    this.handleRoute(this.$route);
  },
  methods: {
    goHome() {
      if (this.$router.currentRoute.path !== "/") this.$router.push("/");
    },
    onCollapse() {
      this.$store.commit("onCollapse");
    },
    handleopen() {
      console.log("handleopen");
    },
    handleclose() {
      console.log("handleclose");
    },
    handleselect(a, b) {
      console.log("handleselect");
    },
    handleRoute(route) {
      //判断是否存在标签页,没有则添加
      var tab = this.mainTabs.filter(item => item.name === route.name)[0];
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon
        };
        this.mainTabs.push(tab);
      }
      this.mainTabsActiveName = tab.name;

      //高亮导航菜单
      if (this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = route.meta.index.toString();
        this.$refs.navmenu.initOpenedMenu();
      }
    },
    logout() {
      this.$confirm("确认退出吗？", "提示", {}).then(() => {
        //TODO,登出
        this.$message({ message: "退出成功", type: "success" });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/base.scss";

$footerHeight: 112px;

.menu-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: $footerHeight;
  background-color: rgb(30, 55, 79);
  overflow-y: scroll;
  .title {
    position: relative;
    padding: 20px 0 5px 12px;
    height: 40px;
    display: flex;
    align-items: center;
    .name {
      color: white;
      font-weight: bold;
      margin-left: 10px;
    }
    i {
      cursor: pointer;
      color: #6f7782;
      font-size: 12px;
      position: absolute;
      top: 4px;
      &.el-icon-d-arrow-left {
        right: 20px;
      }
      &.el-icon-d-arrow-right {
        right: 0;
      }
    }
  }
  hr {
    width: 100%;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.15);
    border-image: initial;
    border-width: 1px 0px 0px;
    margin: 8px 0px;
    background: none transparent;
  }
  .el-menu {
    border: none;
  }
  .menu-bar-width {
    width: $navBarWeight;
  }
  .menu-bar-collapse-width {
    width: $navBarCollapseWeight;
  }

  #footer {
    position: fixed;
    bottom: 0;
    background-color: #1e374f;
    height: $footerHeight;
    padding-top: 20px;
  }
}

// ::-webkit-scrollbar {
//   display: none;
// }
</style>
<style lang="scss">
.title {
  img {
    width: 100% !important;
    cursor: pointer;
  }
}
</style>