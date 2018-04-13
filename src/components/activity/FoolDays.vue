<template>
  <!-- 活动主页面 -->
  <div>
    <div class="fools-orient mask-common" v-client-height v-if="showOrient || activityStatus === 2">
      <p v-show="showOrient">请勿横屏，影响体验效果哦！</p> 
      <img v-show="activityStatus === 2" src="../../images/foolsDay/activityEnd.png" alt="活动结束" class="activityEnd" width="60%">
    </div>
    <router-view :userInfo="userInfo" :checkLogin="checkLogin"></router-view>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {Utils, ModalHelper} from '../../service/Utils.js'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  export default {
    data () {
      return {
        wechat_code: this.$route.query.code,
        userInfo: {
          openid: ''
        },
        entryUrl: '',
        showOrient: false,
        activityStatus: 1,
        act: this.$route.query.act || 43
      }
    },
    props: ['showErrMsg'],
    watch: {
      '$route': function () {
        this.getActivityStatus()
        if (!Utils.isIos()) {
          WechatShareUtils.configJsApi()
        }
      },
      showOrient: function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted () {},
    created: function () {
      this.checkLogin()
      this.getActivityStatus()
      this.entryUrl = window.location.href
      WechatShareUtils.configJsApi(this.entryUrl)
      if (window.orientation === 90 || window.orientation === -90) {
        this.showOrient = true
      }
      var that = this
      $(window).bind('orientationchange', function (e) {
        that.orient(window.orientation)
      })
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.act).then(function (res) {
          that.activityStatus = res.data.status
        })
      },
      orient (val) {
        if (val === 90 || val === -90) { // 判断手机竖横屏状态
          this.showOrient = true
        } else if (val === 180 || val === 0) { // 判断手机竖屏状态
          this.showOrient = false
        }
      },
      checkLogin () {
        if (!Utils.isWeixin()) {
          Utils.redirectToWechatAuth(window.location.href)
          return
        }
        if (Utils.isWindowsWechat()) {
          alert('请在微信客户端打开链接')
          return
        }
        var that = this
        that.axios({
          method: 'get',
          url: '/hongcai/rest/users/checkSession'
        }).then((response) => {
          // 已登录，直接返回
          if (response.data && response.data.ret !== -1) {
            that.userInfo = response.data
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
                that.userInfo = response.data
              } else {
                Utils.redirectToWechatAuth(window.location.href)
              }
            })
          }
        })
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-orient {
    color: #fff;
    font-size: .26rem;
    padding: 1rem 0;
    z-index: 9999999999;
  }
  .activityEnd {
    margin-top: 3rem;
  }
</style>
