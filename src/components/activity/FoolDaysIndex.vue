<template>
  <!-- 活动主页面 -->
  <div class="fools-day" v-client-height v-if="showPage">
    <img src="../../images/foolsDay/clown1.png" alt="小丑" class="clown1">
    <img src="../../images/foolsDay/question-txt.png" alt="文案" class="txt">
    <div class="setQuestion" @click="setQuestion">
      <img src="../../images/foolsDay/play-txt.png" alt="立即出招" width="75%">
    </div>
    <div class="ruleIcon" @click="showRules = true">
      <img src="../../images/foolsDay/rule-txt.png" alt="活动规则" width="75%">
    </div>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
    <div class="fools-qrcode mask-common" v-client-height v-if="showQrCode">
      <img src="../../images/foolsDay/qrcode.png" alt="长按识别图中二维码" width="50%">
      <div class="qrcodeBox">
        <img src="../../images/foolsDay/wechat-qrcode.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import FoolRules from './FoolRules.vue'
  import {WechatShareUtils} from '../../service/WechatShareUtils'
  import wx from 'weixin-js-sdk'
  export default {
    data () {
      return {
        showRules: false,
        takeRecordStatus: 0,
        showQrCode: false,
        showPage: false,
        busy: false
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? this.getTakeRecordStatus() : this.checkLogin()
      }
    },
    mounted () {
      wx.ready(function () {
        var shareLink = process.env.vue_domain + '/activity/fools-day'
        WechatShareUtils.onMenuShareAppMessage('谁说愚人节一定要说假话', '借着这个机会，又有多少人道出了埋藏心底的秘密...', shareLink, 'https://mmbiz.qpic.cn/mmbiz_png/8MZDOEkib8AnEm8IKUChDJ7X50kEO9u4GxRe5kwWibuAEq0mOHqmyZnsAk27P9lMk2NjCM0VOFBXPf4nByXcFI5g/0?wx_fmt=png')
      })
    },
    created () {
      this.userInfo.id > 0 ? this.getTakeRecordStatus() : null
    },
    methods: {
      getTakeRecordStatus () {
        var that = this
        that.axios({
          method: 'get',
          url: '/hongcai/rest/activitys/foolsDay/takeRecordStatus'
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            that.takeRecordStatus = response.data.status
            if (that.takeRecordStatus !== -1) {
              that.$router.replace({name: 'FoolResult'})
            } else {
              that.showPage = true
            }
          }
        })
      },
      setQuestion () {
        var that = this
        if (that.busy) {
          return
        }
        that.busy = true
        if (that.userInfo.openid === '' || that.userInfo.openid === undefined) {
          alert('openid未获取到')
          that.checkLogin()
        } else {
          that.axios('/hongcai/rest/wechat/subscribeStatus')
          .then(function (res) {
            setTimeout(function () {
              that.busy = false
            }, 1000)
            if (res.data.ret !== -1) {
              if (res.data && that.takeRecordStatus === -1) {
                that.$router.replace({name: 'FoolQuestion'})
              } else {
                that.showQrCode = true
              }
            }
          })
        }
      },
      closeRules () {
        this.showRules = false
      }
    },
    components: {FoolRules},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-qrcode {
    padding-top: 1.3rem;
  }
  .qrcodeBox {
    width: 65%;
    margin-top: .5rem;
    background: rgba(255,0,0,.95);
    margin: .5rem auto;
    padding: .25rem .25rem .1rem;
    border-radius: .2rem;
  }
  .qrcodeBox img {
    width: 100%;
    border-radius: .2rem;
  }
  .fools-day {
    background: url('../../images/foolsDay/bg-1.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }
  .fools-day .clown1 {
    position: absolute;
    right: -22%;
    bottom: 13%;
    width: 75%;
    pointer-events: none
  }
  .fools-day .txt {
    position: absolute;
    left: 5%;
    top: 37%;
    width: 65%;
    pointer-events: none
  }
  .fools-day .setQuestion {
    width: 38%;
    height: 1.2rem;
    line-height: 1.5rem;
    background: url(../../images/foolsDay/comm-btn.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    bottom: 28%;
    left: 14%;
    text-align: center;
    padding-left: 5px;
  }
  .fools-day .ruleIcon {
    width: 23%;
    height: .8rem;
    line-height: 1rem;
    background: url(../../images/foolsDay/rule-btn.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    bottom: 19.5%;
    left: 14%;
    text-align: center;
    padding-left: 5px;
  }
</style>
