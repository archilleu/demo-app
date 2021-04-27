<template>
  <div class="hy-height-100">
    <iframe :src="src"
            scrolling="auto"
            frameborder="0"
            class="frame"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  mounted () {
    const path = this.$router.currentRoute.path
    this.src = path.substring(1)
  },
  watch: {
    $route (val, oldVal) {
      const path = this.$router.currentRoute.path
      this.src = path.substring(1)
    }
  }
}
</script>

<style lang="scss">
.frame {
  width: 100%;
  height: 100%;
}
</style>
