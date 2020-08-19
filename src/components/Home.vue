<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <nav-bar></nav-bar>
    <!-- 主内容区域 -->
    <main-content></main-content>
  </div>
</template>

<script>
import NavBar from './NavBar'
import MainContent from './MainContent'
export default {
  components: {
    NavBar,
    MainContent
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
