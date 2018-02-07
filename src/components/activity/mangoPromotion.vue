
<template>
  <div>
    <div class="mg-promotion">
      <header class="position-re">
        <img class="logo position-ab" src="../../images/mangoTV/logo.png" alt="宏财网" width="60%">
        <img class="header" src="../../images/mangoTV/act-head.png" alt="" width="100%">
        <p class="ft-white position-ab">携手宏财网&nbsp;&nbsp;&nbsp;开启新视界</p>
      </header>
      <div class="gift">
        <p class="title ft-white">0元变身VIP，追星看剧更华丽</p>
        <div>
          <img src="../../images/mangoTV/courtesy1-vip.png" alt="" class="vip-img" v-if="actEnding === 1 && !user.registerSuccess || actEnding === 2">
          <div class="content text-justify" v-if="actEnding === 1 && !user.registerSuccess">
            <p>现在注册认证宏财网，即可免费获得<span class="ft-important">芒果TV会员</span>1个月</p>
            <p>*每个账号限领一次</p>
            <span class="take-btn ft-important text-center" @click="showRegister = true">立即变身VIP</span>
          </div>
          <img src="../../images/mangoTV/activityEnd.png" class="ending-img" alt="活动已结束" width="40%" v-show="actEnding === 2">
        </div>
        <div class="success" v-if="actEnding === 1 && user.registerSuccess">
          <img src="../../images/mangoTV/success-msg.png" width="60%" alt="">
          <p>您已获得芒果TV会员1个月奖励资格<br>下载宏财网App，登录首页开通存管即可获取</p>
          <!-- <p>下载宏财网App，登录首页开通存管即可获取</p> -->
          <span class="take-btn ft-important text-center" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">前往下载APP</span>
        </div>
      </div>
      <div class="gift gift2">
        <p class="title">首投VIP再升级，季卡年卡送给你</p>
        <ul class="card-list position-re">
          <li class="vip-card" v-for="card in cards">
            <p>首笔投资满{{card.minInvestAmount || 0}}元</p>
          </li>
          <img src="../../images/mangoTV/act-ending.png" width="50%" class="position-ab" v-if="actEnding === 2">
        </ul>
        <p class="tip text-justify">
          *温馨提示:<br>
          活动首投仅限宏财精选、宏财尊贵项目有效，债权转让项目不参与本次活动。
        </p>
      </div>
      <div class="about">
        <img src="../../images/mangoTV/about.png" alt="" width="60%" class="margin-auto">
        <ul class="about-list">
          <li class="bg-white">
            <div class="title ft-white">
              国资背景
            </div>
            <div class="words text-justify">
              <p>2016年获国有企业一亿元A轮战略投资</p>
              <p>新三板金控第一股入主</p>
              <p>拥有博士高管团队的互联网金融平台</p>
            </div>
          </li>
          <li class="bg-white">
            <div class="title ft-white">
              银行存管
            </div>
            <div class="words text-justify">
              <p>2016年加入网贷行业协会，首批接入北京存管通平台，所有投资信息实时上传北京金融局等监管部门</p>
              <p>2017年6月正式上线海口联合农商银行资金存管，实现银行级资金安全保障</p>
            </div>
          </li>
          <li class="bg-white">
            <div class="title ft-white">
              风控安全
            </div>
            <div class="words text-justify">
              <p>十多年金融生态圈，积累优质资产</p>
              <p>银行级存管确保用户投资资金万无一失</p>
              <p>所有项目借款方知根知底，铸造闭环征信体系</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask-common" v-show="showRegister" @click="closeMask">
      <div class="register-wrap position-re" id="register">
        <img src="../../images/summer-plan/close.png" alt="" width="13.5%" height="33%" class="position-ab close" @click="showRegister = false">
        <img src="../../images/mangoTV/mask-header.png" width="70%" alt="" class="mask-header position-ab">
        <form action="#" name="registerForm">
          <div>
            <input type="tel" id="mobile" name="mobile" placeholder="请输入手机号" v-model="user.mobile" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler">
            <input maxlength="4" type="tel" id="picCaptcha" name="picCaptcha" placeholder="请输入图形验证码" v-model="user.picCaptcha" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler(e)">
            <span @click="refreshCode"><img id="checkCaptcha" alt="图形验证码" class="margin-auto displa-bl" width="100%" height="90%"></span>
            <input type="tel" id="captcha" name="captcha" placeholder="请输入短信验证码" v-model="user.captcha" v-on:input="oninputHandler2" v-on:beforepaste="beforepasteHandler(e)">
            <span class="send" id="send" @click="getCaptcha">获取</span>
            <button type="button" @click="register(user)">立即注册</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {Utils, sendMobCaptcha, ModalHelper, InputMaskHelper} from '../../service/Utils'
  export default {
    name: 'mgPromotion',
    data () {
      return {
        showRegister: false,
        canGetCaptch: true,
        busy: false,
        actEnding: 1,
        scrollTop: 0,
        user: {
          registerSuccess: false,
          mobileCaptchaType: 1,
          mobileCaptchaBusiness: 0,
          mobile: '',
          picCaptcha: '',
          captcha: ''
        },
        cards: []
      }
    },
    props: ['showErrMsg'],
    watch: {
      'showRegister': function (newVal, oldVal) {
        var that = this
        if (newVal) {
          ModalHelper.afterOpen()
        } else {
          ModalHelper.beforeClose()
          that.user.mobile = ''
          that.user.picCaptcha = ''
          that.user.captcha = ''
          $('#send').innerHTML = '获取'
        }
      }
    },
    created () {
      this.getAward()
    },
    mounted () {
      this.refreshCode()
      var handleEle = document.getElementById('register')
      InputMaskHelper.windowChange(handleEle)
    },
    methods: {
      oninputHandler () {
        this.user.mobile = this.user.mobile.replace(/\D/g, '')
        this.user.mobile = this.user.mobile.length > 11 ? this.user.mobile.slice(0, 11) : this.user.mobile
      },
      beforepasteHandler (e) {
        e.clipboardData.setData('text', e.clipboardData.getData('text').replace(/\D/g, ''))
      },
      oninputHandler1 () {
        this.user.picCaptcha = this.user.picCaptcha.replace(/\D/g, '')
      },
      beforepasteHandler1 (e) {
        e.clipboardData.setData('tel', e.clipboardData.getData('tel').replace(/\D/g, ''))
      },
      oninputHandler2 () {
        this.user.captcha = this.user.captcha.length > 6 ? this.user.captcha.slice(0, 6) : this.user.captcha
        this.user.captcha = this.user.captcha.replace(/\D/g, '')
      },
      getAward () {
        var that = this
        that.$http({
          methods: 'get',
          url: '/hongcai/rest/activitys/mango/award'
        }).then(function (response) {
          if (response && response.ret !== -1) {
            that.cards = response.data.list
            that.actEnding = response.data.activityStatus
          }
        })
      },
      // 图形验证码
      refreshCode () {
        $('#picCaptcha').focus()
        this.$http.get('/hongcai/rest/captchas', {
          code: Math.random()
        })
        .then(function (res) {
          $('#checkCaptcha').attr({'src': 'data:image/png;base64,' + res.data.data})
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      // 用户点击获取
      getCaptcha () {
        $('#captcha').focus()
        if (!this.canGetCaptch) {
          return
        }
        if (!this.user.mobile) {
          this.showErrMsg('请输入手机号！')
          return
        }
        // 校验手机号
        var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[03678])|(14[0-9]))\d{8}$/
        if (!mobilePattern.test(this.user.mobile)) {
          this.showErrMsg('请输入正确的手机号！')
          return
        }
        if (!this.user.picCaptcha) {
          this.showErrMsg('请输入图形验证码！')
          return
        }
        if (!sendMobCaptcha.canGetMobileCapcha) {
          return
        }
        var that = this
        that.canGetCaptch = false
        // 短信验证码接口 & 动画
        that.$http.post('/hongcai/rest/users/mobileCaptcha', {
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
              that.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！', 1)
              $('#mobile').blur()
              $('#picCaptcha').blur()
              $('#captcha').blur()
            } else {
              that.showErrMsg(res.data.msg)
            }
            return
          }
          var $send = document.getElementById('send')
          sendMobCaptcha.countDown($send)
        })
        .catch(function (err) {
          setTimeout(function () {
            that.canGetCaptch = true
          }, 1000)
          console.log(err)
          that.showErrMsg('验证码发送失败')
        })
      },
      register (user) {
        $('#captcha').focus()
        if (this.busy) { return }
        if (!user.mobile || !user.picCaptcha || !user.captcha) {
          return
        }
        var that = this
        that.busy = true
        that.$http.post('/hongcai/rest/users/register', {
          picCaptcha: user.picCaptcha,
          mobile: user.mobile,
          password: '',
          captcha: user.captcha,
          channelCode: that.$route.query.f,
          act: that.$route.query.act,
          device: Utils.deviceCode()
        })
        .then(function (res) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          if (res.data.code && res.data.ret === -1) {
            if (res.data.code === -1003) {
              that.showErrMsg('请输入正确的手机号！')
            } else if (res.data.code === -1005) {
              that.showRegister = false
              that.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！', 1)
              $('#mobile').blur()
              $('#picCaptcha').blur()
              $('#captcha').blur()
            } else {
              that.showErrMsg(res.data.msg)
            }
            return
          }
          // 注册成功
          $('#captcha').blur()
          that.showRegister = false
          that.user.registerSuccess = true
        })
        .catch(function (err) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          console.log(err)
        })
      },
      closeMask ($event) {
        // var _con = $('#register')
        // if (_con.has($event.target).length === 0) {
        //   this.showRegister = false
        // }
      }
    }
  }
</script>
<style scoped>
  .gift .success p, .content p {
    color: #333;
  }
  .mg-promotion, header, header p, .gift .take-btn, .about-list li .title {
    width: 100%;
  }
  header p, .gift .title, .about .about-list li {
    color: #fff;
    font-size: .28rem;
  }
  .gift .success p, .register-wrap input {
    font-size: .24rem;
  }
  .gift .vip-img, .gift2 .card-list li, .about .about-list li, .register-wrap input, form span {
    border-radius: .1rem;
  }
  .content p:first-child + p, .vip-card p:first-child, .register-wrap input {
    color: #666;
  }
  /* 主页面 */
  .mg-promotion {
    padding-bottom: .6rem;
    background: url('../../images/mangoTV/bg.png') no-repeat 0 0;
    background-size: 100% 100%;
    overflow: hidden;
    font-family: PingFang-SC;
    /* position: fixed; */
  }
  header {
    margin-top: -0.5rem;
  }
  header p {
    left: 0;
    bottom: 24.5%;
  }
  .logo {
    top: 0.5rem;
    left: 20%;
  }
  .ft-important {
    color: #fd6200 !important;
  }
  .gift {
    height: 4.4rem;
    width: 96%;
    margin-left: 0.5%;
    margin-top: -1rem;
    background: url('../../images/mangoTV/gift01.png') no-repeat center top;
    background-size: 100% 100%;
  }
  .gift .title {
    padding-top: 1.05rem;
    margin-left: 31%;
    text-align: left;
  }
  .gift .ending-img {
    margin-top: 1rem;
  }
  .gift .success img{
    margin: .3rem 0 .05rem;
  }
  .gift .success p {
    padding: 0 8%;
    margin-bottom: .15rem;
    line-height: 1.3;
  }
  .gift .success .take-btn {
    width: 44%;
    margin: 0 auto;
  }
  .gift .vip-img {
    width: 42%;
    float: left;
    margin: .6rem .3rem 0 .4rem;
  }
  .gift .content {
    float: left;
    width: 2.6rem;
  }
  .content p {
    font-size: .25rem;
  }
  .content p:first-child {
    line-height: 1.29;
    margin-top: .33rem;
  }
  .content p:first-child + p {
    margin-top: .03rem;
  }
  .gift .take-btn {
    background: url('../../images/mangoTV/change-btn.png') no-repeat 0 0;
    margin-top: .05rem;
    height: .93rem;
    line-height: .95rem;
    background-size: 100% 100%;
    font-size: .3rem;
    font-weight: bold;
    display: block;
  }
  .gift2 {
    margin-top: .1rem;
    margin-bottom: .9rem;
    height: 7.6rem;
    background: url('../../images/mangoTV/gift02.png') no-repeat center top;
    background-size: 100% 100%;
  }
  .gift2 p.tip {
    color: #ff4b64;
    font-size: .2rem;
    line-height: 1.5;
    padding: 0 8.5%;
  }
  .gift2 .card-list {
    padding: .55rem 0.05rem 0 0rem;
  }
  .gift2 .card-list li {
    width: 44%;
    height: 1.8rem;
    box-sizing: content-box;
    display: inline-block;
    margin-bottom: .35rem;
    margin-left: .3rem;
    background: url('../../images/mangoTV/vip1.png') no-repeat 0 0;
    background-size: 100% 100%;
  }
  .gift2 .card-list img {
    left: 25%;
    top: 19%;
  }
  .vip-card:first-child + li {
    background: url('../../images/mangoTV/vip2.png') no-repeat 0 0;
    background-size: 100% 100%;
    margin-left: .2rem;
  }
  .vip-card:first-child + li + li{
    background: url('../../images/mangoTV/vip3.png') no-repeat 0 0;
    background-size: 100% 100%;
  }
  .vip-card:first-child + li + li + li {
    background: url('../../images/mangoTV/vip4.png') no-repeat 0 0;
    background-size: 100% 100%;
    margin-left: .2rem;
  }
  .vip-card p:first-child {
    font-size: .26rem;
    line-height: 11.86;
  }
  /* 关于我们 */
  .about .about-list li {
    width: 80%;
    margin: .35rem auto 0;
	  box-shadow: 0 2.5px 0 0 rgba(4, 122, 87, 0.55);
  }
  .about .about-list li .words {
    padding: .3rem .5rem .3rem .2rem;
  }
  .about .about-list li .words p {
    color: rgba(51, 51, 51, 0.87);
    opacity: 0.87;
    font-size: .23rem;
    line-height: 1.8;
    padding-left: .42rem;
    background: url('../../images/mangoTV/yes-icon.png') no-repeat .1rem .13rem;
    background-size: 4%;
  }
  .about-list li .title {
    height: 53px;
    line-height: 53px;
    border-radius: .1rem .1rem 0 0;
	  background-color: #45c7a9;
    background-image: url('../../images/mangoTV/about-title-bg.png');
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center center;
  }
  /* 注册弹窗 */
  .mask-common .register-wrap {
    margin: 2.5rem auto;
    width: 88%;
    height: 4.8rem;
    background-image: -moz-linear-gradient(top, #f1456d, #fdd386);
    background-image: -webkit-linear-gradient(top, #f1456d, #fdd386);
    background-image: -o-linear-gradient(top, #f1456d, #fdd386);
    background-image: linear-gradient(to top, #f1456d, #fdd386);
    border-radius: 12.5px;
    /* background: url('../../images/mangoTV/mask-bg.png') no-repeat 0 0; */
    box-shadow: 0 1px 0 0 rgba(61, 66, 64, 0.21);
    border: solid 1px #5e1534;
    -webkit-overflow-scrolling: touch;
  }
  .register-wrap .close {
    right: 0;
    top: -1.55rem;
  }
  .register-wrap .mask-header {
    left: 14%;
    top: -.9rem;
  }
  .register-wrap input {
    padding: 0 .4rem;
    margin: 0 0 .35rem 0;
    height: 0.64rem;
    width: 60%;
    border: none !important;
  }
  input:-moz-placeholder, input::-webkit-input-placeholder, input:-ms-input-placeholder {
    color: #999;
  }
  .register-wrap input:first-child {
    width: 60%;
    margin-top: 0.6rem;
  }
  .register-wrap input:nth-child(2), .register-wrap input:nth-child(4) {
    float: left;
    width: 36%;
    margin-left: 13%;
    margin-right: 2%;
  }
  form span {
    width: 20%;
    float: left;
    padding: 0 .05rem;
    margin: 0 0 .35rem 0;
    height: .64rem;
    line-height: .68rem;
    color: #fd6300;
    font-size: .25rem;
    background: #fff;
  }
  form .send {
    background-color: #ffde01;
  }
  form button {
    width: 46%;
    height: .9rem;
    line-height: .9rem;
    color: #fd6300;
    font-size: .3rem;
    font-weight: bold;
    margin: 0 auto;
    background: url('../../images/mangoTV/change-btn.png') no-repeat 0 0;
    background-size: 100% 100%;
    border: none;
    outline: none;
  }
</style>
