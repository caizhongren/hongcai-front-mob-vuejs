<template>
  <div class="fools-exchange" v-client-height>
    <div class="header">
      <div class="exchangeHeader">恭喜您获得</div>
      <img src="../../images/foolsDay/rule-icon.png" alt="活动规则" class="ruleIcon" @click="showRules = true">
    </div>
    <div class="contents">
      <div class="gift">
        精选1.5％无条件加息券 <br>
        尊贵2.5％无条件加息券 <br>
        特权本金2018元（有效期3天)
      </div>
      <form name="mobile" class="mobileBox">
        <input type="tel" placeholder="请输入手机号" v-model="user.mobile"  v-on:input="oninputHandler('mobile')" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
        <div class="btns">
          <div class="exchangeBtn" @click="checkMobile(user)">马上领取</div>
          <img src="../../images/foolsDay/line2.png" alt="曲线" width="26%">
        </div>
      </form>
      <div class="tips">
        温馨提示： <br>
        1.每个账户只能兑换一次奖励，兑换时请务必填写正确的手机账号； <br>
        2.奖励兑换后将在一个工作日内发放至您的宏财网账户，请及时查收； <br>
        3.召集更多好友来测谎，勇攀“愚人榜”，500000元特权本金等着你！(约合收益110元)。
      </div>
    </div>
    <!-- 新用户注册验证码弹窗 -->
    <div class="fools-box mask-common" v-client-height v-if="!isRegister">
      <div class="CaptchaBox">
        <div class="title">请输入</div>
        <form name="captcha" class="captcha">
          <div class="boxBoder">
            <input type="tel" v-model="user.picCaptcha"  v-on:input="oninputHandler('picCaptcha')" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
            <img alt="图形验证码" id="picCaptcha" width="100%" height="100%" @click="refreshCode"/>
          </div>
          <div class="boxBoder">
            <input type="tel"  v-model="user.mobileCaptcha"  v-on:input="oninputHandler('mobileCaptcha')" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
            <span @click="getCaptcha" id="sent">获取短信</span>
          </div>
          <div class="sureCaptchaBtn">
            <img src="../../images/foolsDay/queren-yellow.png" alt="确认" width="40%" @click="register(user)">
          </div>
        </form>
      </div>
      <img src="../../images/foolsDay/close-icon.png" alt="关闭按钮" width="15%" @click="closeRegister">
    </div>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
  </div>
</template>
<script>
  import $ from 'zepto'
  import FoolRules from './FoolRules.vue'
  import {Utils, sendMobCaptcha} from '../../service/Utils'
  export default {
    data () {
      return {
        canGetCaptch: true,
        showRules: false,
        user: {
          mobile: '',
          mobileCaptcha: '',
          picCaptcha: '',
          mobileCaptchaType: 1,
          mobileCaptchaBusiness: 0
        },
        busy: false,
        isRegister: true
      }
    },
    props: ['checkLogin', 'userInfo'],
    watch: {
      userInfo: function (val) {
        val && val.id > 0 ? null : this.checkLogin()
      }
    },
    mounted () {
    },
    created () {},
    methods: {
      closeRegister () {
        this.isRegister = true
        this.user = {
          mobile: '',
          mobileCaptcha: '',
          picCaptcha: ''
        }
      },
      // 图形验证码
      refreshCode () {
        this.axios.get('/hongcai/rest/captchas', {
          code: Math.random()
        })
        .then(function (res) {
          $('#picCaptcha').attr({'src': 'data:image/png;base64,' + res.data.data})
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      closeRules () {
        this.showRules = false
      },
      getCaptcha () {
        if (!this.canGetCaptch) {
          return
        }
        if (!this.user.picCaptcha) {
          this.$parent.showErrMsg('请输入图形验证码！')
          return
        }
        if (!sendMobCaptcha.canGetMobileCapcha) {
          return
        }
        var that = this
        that.canGetCaptch = false
        // 短信验证码接口 & 动画
        that.axios.post('/hongcai/rest/users/mobileCaptcha', {
          mobile: that.user.mobile,
          picCaptcha: that.user.picCaptcha,
          type: that.user.mobileCaptchaType,
          business: that.user.mobileCaptchaBusiness,
          device: Utils.deviceCode()
        })
        .then(function (res) {
          setTimeout(function () {
            that.canGetCaptch = true
          }, 1000)
          if (res.data.code || res.data.ret === -1) {
            if (res.data.code === -1005) {
              that.showRegister = false
              that.$parent.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！')
            } else {
              that.$parent.showErrMsg(res.data.msg)
              return
            }
          } else {
            var $send = document.getElementById('sent')
            sendMobCaptcha.countDown($send)
          }
        })
        .catch(function (err) {
          setTimeout(function () {
            that.canGetCaptch = true
          }, 1000)
          console.log(err)
          that.$parent.showErrMsg('验证码发送失败')
        })
      },
      register (user) {
        var that = this
        if (that.busy) { return }
        if (!user.picCaptcha) {
          this.$parent.showErrMsg('请输入图形验证码！')
          return
        }
        if (!user.mobileCaptcha) {
          this.$parent.showErrMsg('请输入短信验证码！')
          return
        }
        that.busy = true
        that.axios.post('/hongcai/rest/users/register', {
          picCaptcha: user.picCaptcha,
          mobile: user.mobile,
          password: '',
          captcha: user.mobileCaptcha,
          channelCode: that.$route.query.f || 'foolsDay',
          act: that.$route.query.act || '43',
          device: Utils.deviceCode()
        })
        .then(function (res) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          if (res.data.code && res.data.ret === -1) {
            if (res.data.code === -1003) {
              that.$parent.showErrMsg('请输入正确的手机号！')
            } else if (res.data.code === -1005) {
              that.$parent.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！')
            } else {
              that.$parent.showErrMsg(res.data.msg)
            }
            return
          }
          // 注册并领取
          that.exchange(that.user)
        })
        .catch(function (err) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          console.log(err)
        })
      },
      exchange (user) {
        var that = this
        that.axios.post('/hongcai/rest/activitys/foolsDay/rewardRecord', {
          mobile: user.mobile
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.$router.replace({name: 'FoolSuccess', query: {mobile: user.mobile}})
          } else {
            that.$parent.showErrMsg(res.data.msg)
          }
        })
      },
      checkMobile (user) {
        var that = this
        if (that.busy) { return }
        if (!that.user.mobile || !that.isRegister && (!that.user.picCaptcha || !that.user.mobileCaptcha)) {
          console.log(that)
          return
        }
        // 校验手机号
        var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[03678])|(14[0-9]))\d{8}$/
        if (!mobilePattern.test(that.user.mobile)) {
          console.log(that)
          that.$parent.showErrMsg('请输入正确的手机号！')
          return
        }
        that.busy = true
        that.axios.post('/hongcai/rest/users/isUnique', {
          account: user.mobile
        }).then(function (res) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          if (res.data && res.data.ret === -1) { // 已注册
            // 调用领取奖励接口
            that.exchange(user)
          } else {
            that.isRegister = false
            that.refreshCode()
          }
        })
      },
      oninputHandler (type) {
        if (type === 'mobile') {
          this.user.mobile = this.user.mobile.replace(/\D/g, '')
          this.user.mobile = this.user.mobile.length > 11 ? this.user.mobile.slice(0, 11) : this.user.mobile
        } else if (type === 'picCaptcha') {
          this.user.picCaptcha = this.user.picCaptcha.replace(/\D/g, '')
          this.user.picCaptcha = this.user.picCaptcha.length > 4 ? this.user.picCaptcha.slice(0, 4) : this.user.picCaptcha
        } else {
          this.user.mobileCaptcha = this.user.mobileCaptcha.replace(/\D/g, '')
          this.user.mobileCaptcha = this.user.mobileCaptcha.length > 6 ? this.user.mobileCaptcha.slice(0, 6) : this.user.mobileCaptcha
        }
      },
      beforepasteHandler (e) {
        e.clipboardData.setData('text', e.clipboardData.getData('text').replace(/\D/g, ''))
      }
    },
    components: {FoolRules},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-exchange {
    background: #f89b32;
    width: 100%;
    overflow-x: hidden;
  }
  .header {
    background: url('../../images/foolsDay/comm-header.png') no-repeat 0 0;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .3rem;
  }
  .exchangeHeader {
    width: 40%;
    height: 1.4rem;
    line-height: 1.5rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin-left: 7%;
    font-size: .32rem;
    color: #fff;
    float: left;
  }
  .gift {
    color: #fff;
    font-size: .25rem;
    width: 78%;
    margin: 0 auto;
    height: 4rem;
    padding: 1.9rem 0 0 1rem;
    text-align: left;
    font-weight: bold;
    background: url('../../images/foolsDay/exchange.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .mobileBox {
    padding: 0 10%;
  }
  .mobileBox input {
    border: none;
    background: url('../../images/foolsDay/mobile-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 77%;
    /* height: .5rem;
    line-height: .5rem; */
    padding: 0.5rem .6rem;
    color: #51171b;
    font-size: .26rem;
  }
  input::-webkit-input-placeholder {
    color: #51171b;
  }
  .btns {
    overflow: hidden;
    clear: both;
    margin-top: -.1rem;
  }
  .btns img {
    float: right;
  }
  .exchangeBtn {
    width: 35%;
    height: 1rem;
    line-height: 1.15rem;
    background: url('../../images/foolsDay/take-btn.png') no-repeat center center;
    background-size: 100% 100%;
    color: #fff;
    font-size: .26rem;
    float: right;
    margin-left: -.1rem;
  }
  .tips {
    color: #fff;
    font-size: .23rem;
    text-align: justify;
    padding: .3rem;
  }
  .ruleIcon {
    width: 28%;
    float: right;
    margin-top: -.1rem;
  }
  /* 新用户注册验证码弹窗 */
  .CaptchaBox {
    width: 70%;
    height: 5.5rem;
    background: url('../../images/foolsDay/box-bg.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 1.5rem auto 0.5rem;
    padding: .12rem;
  }
  .CaptchaBox .title {
    width: 42%;
    height: 1rem;
    line-height: 1.05rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    padding: 0rem .23rem;
    font-size: .28rem;
    color: #fff;
    margin: .23rem 0 0 .23rem;
  }
  .captcha .boxBoder {
    background: url('../../images/foolsDay/chacap-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 88%;
    height: 1rem;
    line-height: 1.05rem;
    color: #51171b;
    font-size: .25rem;
    margin: 0.23rem auto;
    padding-left: .5rem;
  }
  .boxBoder input {
    border: none;
    height: .5rem;
    padding: .25rem 0 .2rem 0;
    background: transparent;
    width: 40%;
    float: left;
  }
  .boxBoder span {
    float: right;
    background: url('../../images/foolsDay/chacat.png') no-repeat center center;
    background-size: 100% 100%;
    width: 45%;
    height: .65rem;
    line-height: .7rem;
    color: #fff;
    font-size: .25rem;
    margin-top: .2rem;
  }
  #picCaptcha {
    float: right;
    width: 45%;
    height: .65rem;
    line-height: .7rem;
    color: #fff;
    font-size: .25rem;
    margin-top: .15rem;
  }
  .sureCaptchaBtn {
    background: url('../../images/foolsDay/konw-bg.png') no-repeat center center;
    background-size: 100% 100%;
    width: 50%;
    height: .75rem;
    line-height: 1rem;
    margin: 0 auto;
  }
</style>
