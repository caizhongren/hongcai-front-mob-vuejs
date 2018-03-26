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
        <input type="tel" placeholder="请输入手机号" v-model="user.mobile"  v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
        <div class="btns">
          <div class="exchangeBtn" @click="exchange">马上领取</div>
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
            <input type="tel" id="picCaptcha"  v-model="user.picCaptcha"  v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
            <span>图形验证</span>
          </div>
          <div class="boxBoder">
            <input type="tel"  v-model="user.mobileCaptcha"  v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" autocomplete="off"/>
            <span>获取短信</span>
          </div>
        </form>
      </div>
    </div>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
  </div>
</template>
<script>
  import $ from 'zepto'
  import FoolRules from './FoolRules.vue'
  export default {
    data () {
      return {
        showRules: false,
        user: {
          mobile: '',
          mobileCaptcha: '',
          picCaptcha: ''
        },
        isRegister: false
      }
    },
    props: ['showErrMsg'],
    watch: {
    },
    mounted () {
      this.refreshCode()
    },
    created () {},
    methods: {
      // 图形验证码
      refreshCode () {
        this.$http.get('/hongcai/rest/captchas', {
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
      exchange () {
        var that = this
        if (that.mobile === '') {
          return
        }
        if (that.mobile.length < 11) {
          that.showErrMsg('请输入正确的手机号码！')
          return
        }
        alert('马上领取')
      },
      oninputHandler () {
        this.mobile = this.mobile.replace(/\D/g, '')
        this.mobile = this.mobile.length > 11 ? this.mobile.slice(0, 11) : this.mobile
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
    height: 1.1rem;
    line-height: 1.2rem;
    padding: 0 .6rem;
    color: #51171b;
    font-size: .25rem;
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
    height: 4.8rem;
    background: url('../../images/foolsDay/box-bg.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 1.5rem auto;
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
    height: 1rem;
    line-height: 1.05rem;
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
</style>
