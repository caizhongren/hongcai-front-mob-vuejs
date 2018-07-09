<template>
  <div class="beans">
    <transition :name="transitionName">
      <router-view :bean="bean"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        bean: 0
      }
    },
    props: ['token', 'showErrMsg', 'transitionName'],
    created () {
      this.token ? this.getUserPoints() : null
    },
    methods: {
      getUserPoints () {
        var that = this
        that.$http('/hongcai/rest/users/0/account?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.bean = res.data.points
          } else {
            console.log(res.data.msg)
          }
        })
      }
    }
  }
</script>
