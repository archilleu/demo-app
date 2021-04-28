<template>
  <div class="page-container"
       style="margin-top:15px;">
    <div><span>姓名:</span><span>{{ user.sub }}</span></div>
    <div><span>角色:</span><span>{{ user.roles }}</span></div>
    <div><span>权限:</span><span>{{ user.authorities }}</span></div>
  </div>
</template>

<script>
import LocalUser from "@/utils/user.js";

export default {
  data () {
    return {
      user: {}
    }
  },
  components: {
  },
  methods: {
  },
  mounted () {
    this.user = LocalUser.user()
    this.user.authorities = this.user.authorities.map(item => item.authority)
  }
}
</script>