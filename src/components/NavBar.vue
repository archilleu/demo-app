<template>
  <div class="menu-bar-container"
       :class="collapse?'title-collapse':'title-notcollapse'">
    <!-- logo 标题 -->
    <div class="title">
      <div v-if="!collapse">
        <el-tooltip class="item"
                    effect="dark"
                    content="主页"
                    placement="bottom">
          <el-image style="height:40px;cursor:pointer;"
                    :src="url"
                    fit="contain"
                    @click.native="goHome"></el-image>
        </el-tooltip>
      </div>
      <div v-else>
        <el-tooltip class="item"
                    effect="dark"
                    content="主页"
                    placement="right">
          <el-avatar style="cursor:pointer"
                     :size="40"
                     :src="url"
                     fit="contain"
                     @click.native="goHome"></el-avatar>
        </el-tooltip>
      </div>
    </div>
    <!-- 导航菜单 -->
    <div class="nav-menu">
      <el-menu ref="navmenu"
               unique-opened
               default-active="1"
               :collapse="collapse"
               :collapse-transition="false"
               background-color="#1e374f"
               text-color="#fff"
               active-text-color="#409eff">
        <!-- 导航菜单树组件，动态加载菜单 -->
        <menu-tree v-for="item in navTree"
                   :key="item.id"
                   :menu="item"></menu-tree>
      </el-menu>
    </div>

    <div id="footer"
         :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
      <!-- 系统用户 -->
      <menu-tree-item label="系统用户"
                      icon="el-icon-user"
                      url="account"
                      :collapse="collapse"></menu-tree-item>
      <menu-tree-item label="退出"
                      icon="el-icon-switch-button"
                      @click="logout"
                      :collapse="collapse"></menu-tree-item>
    </div>
    <div id="collapse"
         :class="collapse?'collapse':'no-collapse'"
         @click="onCollapse">
      <i v-if="!collapse"
         class="el-icon-back"></i>
      <i v-else
         class="el-icon-right"></i>
    </div>
  </div>
</template>

<script>
import LocalUser from "@/utils/user.js";
import { mapState } from 'vuex'
import MenuTree from '@/components/ZCore/MenuTree'
import MenuTreeItem from '@/components/ZCore/MenuTree/MenuTreeItem'
export default {
  data () {
    return {
      url: require('@/assets/logo.jpg')
    }
  },
  components: {
    MenuTree,
    MenuTreeItem
  },
  computed: {
    ...mapState({
      collapse: state => state.app.collapse,
      navTree: state => state.menu.navTree
    }),
    mainTabs: {
      get () {
        return this.$store.state.tab.mainTabs
      },
      set (val) {
        this.$store.commit('updateMainTabs', val)
      }
    },
    mainTabsActiveName: {
      get () {
        return this.$store.state.tab.mainTabsActiveName
      },
      set (val) {
        this.$store.commit('updateMainTabsActiveName', val)
      }
    }
  },
  watch: {
    // 监听路由变化
    $route: 'handleRoute'
  },
  created () {
    // 创建主页选项
    this.handleRoute(this.$route)
  },
  methods: {
    goHome () {
      if (this.$router.currentRoute.path !== '/') this.$router.push('/')
    },
    onCollapse () {
      this.$store.commit('onCollapse')
    },
    handleRoute (route) {
      // 判断是否存在标签页,没有则添加
      var tab = this.mainTabs.filter(item => item.name === route.name)[0]
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon,
          path: route.path,
          closable: route.meta.closable
        }
        this.mainTabs.push(tab)
      }
      this.mainTabsActiveName = tab.name

      // 高亮导航菜单
      if (this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = route.meta.index.toString()
        this.$refs.navmenu.initOpenedMenu()
      }
    },
    logout () {
      this.$confirm('确认退出吗？', '提示', {}).then(() => {
        LocalUser.clear();

        // 刷新页面，清除vuex状态
        window.location.replace('/#/login')
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/base.scss';

.title-notcollapse {
  width: $navBarWeight;
}
.title-collapse {
  width: $navBarCollapseWeight;
}

.title-collapse,
.title-notcollapse {
  transition: width 0.2s;
}

.menu-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(30, 55, 79);
  border-right: 1px solid #1e374fd1;
  box-shadow: 0px 0px 10px 1px #1e374ff7;
  z-index: 10;
  .title {
    padding: 6px 0 4px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  .nav-menu {
    flex-grow: 1;
    overflow-y: scroll;
    .el-menu {
      border-right: none;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #footer {
    box-sizing: border-box;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    background-color: #1e374f;
  }

  #collapse {
    background-color: #ffffff00;
    padding: 0;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 50%;
    border-radius: 50%;
    color: #1774ec;
    transform: translate(-50%, -50%);
    transition: 0.8s;
    i {
      background-color: #ffffff;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.8s cubic-bezier(1, 0.02, 1, -0.09);
    }
  }

  &:hover {
    #collapse {
      background-color: #1774ec42;
      padding: 20px;
      opacity: 1;
      i {
        color: white;
        background-color: #1774ec;
        cursor: pointer;
      }
    }
    #collapse.collapse {
      left: $navBarCollapseWeight;
    }
    #collapse.no-collapse {
      left: $navBarWeight;
    }
  }
}
</style>

<style lang="scss">
.title {
  .el-avatar {
    > img {
      width: 100%;
    }
  }
}
</style>
