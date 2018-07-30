<template>
  <div class="beans">
    <transition name="router-fade" mode="out-in">
      <router-view :bean="bean" :baseFileUrl="baseFileUrl"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        bean: 0,
        baseFileUrl: process.env.baseFileUrl
      }
    },
    props: ['token', 'showErrMsg', 'transitionName'],
    watch: {
      'token': function (val) {
        val ? this.getUserPoints() : null
      },
      '$route': function (to, from) {
        this.token ? this.getUserPoints() : null
      }
    },
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
