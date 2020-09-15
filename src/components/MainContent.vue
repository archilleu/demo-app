<template>
  <div
    id="main-container"
    class="main-container"
    :class="$store.state.app.collapse?'position-collapse-left':'position-left'"
  >
    <!-- 标签页 -->
    <div class="tab-container">
      <el-tabs
        class="tabs"
        :class="$store.state.app.collapse?'position-collapse-left':'position-left'"
        v-model="mainTabsActiveName"
        type="card"
        @tab-click="selectedTabHandle"
        @tab-remove="removeTabHandle"
      >
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
          <div>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane
          v-for="item in mainTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.closable"
        >
          <span slot="label">
            <i :class="item.icon"></i>
            {{item.title}}
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
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
  methods: {
    selectedTabHandle (tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name)
      if (tab.length >= 1) {
        if (this.$router.currentRoute.name === tab[0].name) return
        this.$router.push({ name: tab[0].name })
      }
    },
    removeTabHandle (tabName) {
      if (tabName === '主页') return
      this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
      if (this.mainTabs.length >= 1) {
        if (tabName === this.mainTabsActiveName) {
          this.$router.push(
            { name: this.mainTabs[this.mainTabs.length - 1].name },
            () => {
              this.mainTabsActiveName = this.$route.name
            }
          )
        }
      } else {
        this.$router.push('/')
      }
    },
    tabsCloseCurrentHandle () {
      this.removeTabHandle(this.mainTabsActiveName)
    },
    tabsCloseOtherHandle () {
      this.mainTabs = this.mainTabs.filter(
        item => item.name === this.mainTabsActiveName || item.name === '主页'
      )
    },
    tabsCloseAllHandle () {
      if (this.mainTabs.length > 1) {
        this.mainTabs.splice(0)
        this.$router.push('/')
      } else {
      }
    },
    tabsRefreshCurrentHandle () {
      var tempTabName = this.mainTabsActiveName
      this.removeTabHandle(tempTabName)
      this.$nextTick(() => {
        this.$router.push({ name: tempTabName })
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/toolbar.scss";
</style>

<style scoped lang="scss">

@import "@/assets/base.scss";

//MainContent标签栏高度
$mainContentTabsHeight: 40px;

.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: $mainContentTabsHeight;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  .tab-container {
    overflow: hidden;
    .tabs {
      position: fixed;
      top: 0;
      right: 50px;
      padding-left: 0px;
      padding-right: 2px;
      height: $mainContentTabsHeight;
      line-height: $mainContentTabsHeight;
      font-size: 14px;
      background: rgb(255, 253, 255);
      .tabs-tools {
        position: fixed;
        top: 0;
        right: 0;
        height: $mainContentTabsHeight;
        font-size: 14px;
        line-height: $mainContentTabsHeight;
        cursor: pointer;
        border-color: rgba(200, 206, 206, 0.5);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-left-width: 1px;
        border-left-style: solid;
        background: rgba(255, 255, 255, 1);
        i {
          width: 50px;
          text-align: center;
        }
      }
      .tabs-tools:hover {
        background: rgba(200, 206, 206, 1);
      }
    }
  }
  .main-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5px;
    overflow-y: auto;
  }
}

.position-left {
  left: $navBarWeight;
}
.position-collapse-left {
  left: $navBarCollapseWeight;
}
</style>
