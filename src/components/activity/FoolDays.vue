<template>
  <!-- 活动主页面 -->
  <router-view></router-view>
</template>
<script>
  import {Utils} from '../../service/Utils.js'
  export default {
    data () {
      return {
      }
    },
    props: ['showErrMsg'],
    watch: {},
    mounted () {},
    created: function () {
      this.checkLogin()
    },
    methods: {
      checkLogin () {
        if (Utils.isWeixin()) {
          Utils.redirectToWechatAuth(window.location.path)
        } else {
          console.log('waha')
        }
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
