<template>
  <!-- 活动主页面 -->
  <div class="fools-day">
    <router-view></router-view>
  </div>
</template>
<script>
  import {Utils} from '../../service/Utils.js'
  export default {
    data () {
      return {
      }
    },
    props: [],
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
