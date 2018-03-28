<template>
  <!-- 活动主页面 -->
  <router-view :userInfo="userInfo"></router-view>
</template>
<script>
  import {Utils} from '../../service/Utils.js'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  export default {
    data () {
      return {
        wechat_code: this.$route.query.code,
        userInfo: {
          openid: 'oBBBjs6uL13Z7E03h5E2hEOnM_l8'
        }
      }
    },
    props: ['showErrMsg'],
    watch: {
      '$route': WechatShareUtils.configJsApi
    },
    mounted () {},
    created: function () {
      console.log('sss')
      this.checkLogin()
      WechatShareUtils.configJsApi()
    },
    methods: {
      checkLogin () {
        var that = this
        that.axios({
          method: 'get',
          url: '/hongcai/rest/users/checkSession'
        }).then((response) => {
          // 已登录，直接返回
          if (response.data && response.data.ret !== -1) {
            that.userInfo = JSON.stringify(response.data)
            return
          }
          // 未登录，则检查路由中是否存在 code，不存在，则跳转到微信授权
          if (!that.$route.query.code) {
            Utils.redirectToWechatAuth(window.location.href)
          } else {
            // 存在code，则调用登录接口
            that.axios({
              method: 'get',
              url: '/hongcai/rest/users/' + that.$route.query.code + '/openid'
            }).then((response) => {
              if (response.data && response.data.ret !== -1) {
                that.userInfo = JSON.stringify(response.data)
              } else {
                Utils.redirectToWechatAuth(window.location.href)
              }
            })
          }
        })
        if (!Utils.isWeixin()) {
          // Utils.redirectToWechatAuth(window.location.href)
        }
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
