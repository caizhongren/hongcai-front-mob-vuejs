<template>
  <div class="FenTian">
    <div class="header">
      <div class="logo">
        <img src="../../images/fentian/logo-hongcai.png" alt="">
        <img src="../../images/fentian/logo-fen.png" alt="" width="8.5%">
      </div>
      <img src="../../images/fentian/register-header-text.png" alt="" class="title">
      <p class="RMB">价值 <span class="ft-yellow">RMB410</span></p>
      <ul class="gifts">
        <li>
          <img src="../../images/fentian/gift1-1.png" alt="">
          <p class="num">x 1</p>
        </li>
        <li>
          <img src="../../images/fentian/gift13-24.png" alt="">
          <p class="num">x 1</p>
        </li>
        <li>
          <img src="../../images/fentian/gift1-3.png" alt="">
          <p class="num">x 2</p>
        </li>
      </ul>
      <ul class="giftName">
        <li>【时装兑换令牌】</li>
        <li>【神器印记礼包】</li>
        <li>【魔气结晶】</li>
      </ul>
      <p class="tip ft-yellow">注册认证即可领取兑换码</p>
    </div>
    <div class="contents">
      <!-- 注册表单 -->
      <div class="register-form">
        <form>
          <input type="tel" name="mobile" class="mobile" placeholder="请输入手机号" v-model="user.mobile" v-bind:value="user.mobile" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" autocomplete="off">
          <div class="pic">
            <input type="tel" maxlength="4" name="picCaptcha" placeholder="请输入图形验证码" v-model="user.picCaptcha" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler1(e)" autocomplete="off">
            <span @click="refreshCode"><img alt="图形验证码" id="picCaptcha" width="100%" height="100%"></span>
          </div>
          <div class="captcha">
            <input type="tel" name="captcha" placeholder="请输入短信验证码" v-model="user.captcha" v-on:input="oninputHandler2" v-on:beforepaste="beforepasteHandler(e)" autocomplete="off">
            <span class="send" @click="getCaptcha" id="sent">获取</span>
          </div>
          <button type="button" @click="register(user)">立即注册</button>
        </form>
      </div>
      <!-- 产品特点 -->
      <div class="product">
        <p class="product-title">产品特点</p>
        <div class="product-box">
          <p class="txt"><img src="../../images/fentian/icon-product.png" alt="" class="product-icon1">  风控严格：信托耕耘十多年的金融生态圈，借款企业信息知根知底，还款有保障。</p>
          <p class="txt txt2"><img src="../../images/fentian/icon-product.png" alt="" class="product-icon2">  平台稳健：上线三年多，始终零逾期，资金由银行存管，信息安全通过国家等保三级认证。</p>
          <ul class="projects">
            <li class="fl">
              <div class="jx">
                <p>以55天汽车金融为主，年化收益率 7.8%-9.8%</p>
                <p>宏财精选项目</p>
              </div>
            </li>
            <li class="fr">
              <div class="zg">
                <p>以180天以上小微金融为主，年化收益率10.3%-11%</p>
                <p>宏财尊贵项目</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择宏财的4大理由 -->
      <div class="hongcai">
        <div class="title">选择宏财的4大理由</div>
        <ul class="abouts">
          <li>
            <img src="../../images/fentian/about-1.png" alt="">
            <p>银行存管</p>
            <p>2017年6月正式上线 <br/>海口联合农商银行资金存管</p>
          </li>
          <li>
            <img src="../../images/fentian/about-2.png" alt="">
            <p>国资背景</p>
            <p>2016年获国有企业<br/>1亿元A轮战略融资</p>
          </li>
          <li>
            <img src="../../images/fentian/about-3.png" alt="">
            <p>博士团队</p>
            <p>拥有博士高管团队的<br/>互联网金融信息服务平台</p>
          </li>
          <li>
            <img src="../../images/fentian/about-4.png" alt="">
            <p>优质资产</p>
            <p>十多年金融生态圈<br/>积累优质资产</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {Utils, sendMobCaptcha} from '../../service/Utils'
  export default {
    data () {
      return {
        canGetCaptch: true,
        user: {
          mobile: '',
          picCaptcha: '',
          captcha: '',
          mobileCaptchaType: 1,
          mobileCaptchaBusiness: 0
        },
        styleObject: {
          color: '#666',
          background: 'white'
        }
      }
    },
    props: ['showErrMsg'],
    watch: {
    },
    created () {
    },
    mounted () {
      this.refreshCode()
    },
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
      getCaptcha () {
        if (!this.canGetCaptch) {
          return
        }
        if (!this.user.mobile) {
          this.showErrMsg('请输入手机号！', '', this.styleObject)
          return
        }
        // 校验手机号
        var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[03678])|(14[0-9]))\d{8}$/
        if (!mobilePattern.test(this.user.mobile)) {
          this.showErrMsg('请输入正确的手机号！', '', this.styleObject)
          return
        }
        if (!this.user.picCaptcha) {
          this.showErrMsg('请输入图形验证码！', '', this.styleObject)
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
              that.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！', '', that.styleObject)
            } else {
              that.showErrMsg(res.data.msg, '', that.styleObject)
            }
            return
          }
          var $send = document.getElementById('sent')
          sendMobCaptcha.countDown($send)
        })
        .catch(function (err) {
          setTimeout(function () {
            that.canGetCaptch = true
          }, 1000)
          console.log(err)
          that.showErrMsg('验证码发送失败', '', that.styleObject)
        })
      },
      register (user) {
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
              that.showErrMsg('请输入正确的手机号！', '', that.styleObject)
            } else if (res.data.code === -1005) {
              that.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！', '', that.styleObject)
            } else {
              that.showErrMsg(res.data.msg, '', that.styleObject)
            }
            return
          }
          // 注册成功
          that.$router.push({name: 'FenPushSuccess'})
        })
        .catch(function (err) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          console.log(err)
        })
      }
    },
    destroyed () {
    }
  }
</script>
<style scoped>
  .FenTian {
  }
  .hongcai {
    width: 85%;
    height: 5.6rem;
    background: url('../../images/fentian/bg-box2.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0.5rem auto 0;
  }
  .hongcai .abouts {
    overflow: hidden;
    clear: both;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .hongcai .abouts li {
    float: left;
    width: 50%;
    text-align: center;
    border-bottom: 1px solid #490745;
    border-right: 1px solid #490745;
    box-sizing: border-box;
  }
  .hongcai .abouts li:nth-child(4) {
    border-bottom: navajowhite;
    border-right: navajowhite;
  }
  .hongcai .abouts li:nth-child(2) {
    border-right: navajowhite;
  }
  .hongcai .abouts li:nth-child(3) {
    border-bottom: navajowhite;
  }
  .hongcai .abouts li img {
    width: 40%;
    vertical-align: sub;
  }
  .hongcai .abouts li p {
    margin-bottom: 0;
    font-size: .23rem;
    font-weight: bold;
    line-height: 1.33;
    letter-spacing: 1.1px;
    color: #340e36;
    text-align: center;
  }
  .hongcai .abouts li p:nth-child(3) {
    line-height: 1.2;
    font-size: .2rem;
    transform: scale(0.95);
    font-weight: normal;
    margin-top: .1rem;
  }
  .hongcai .abouts li:nth-child(1) p:nth-child(3), .hongcai .abouts li:nth-child(2) p:nth-child(3) {
    margin-bottom: .1rem;
  }
  .hongcai .abouts li:nth-child(3) img, .hongcai .abouts li:nth-child(4) img {
    margin-top: .2rem;
  }
  .hongcai .title {
    font-weight: bold;
    letter-spacing: 1.8px;
    color: #ffffff;
    font-size: .26rem;
    background: url('../../images/fentian/about-title.png') no-repeat center center;
    background-size: contain;
    width: 3.2rem;
    height: .7rem;
    line-height: .73rem;
    margin: 0 auto;
    z-index: 1;
    position: relative;
    top: -.35rem;
  }
  ul.projects {
    overflow: hidden;
    clear: both;
    width: 100%;
    margin: 1rem auto;
  }
  ul.projects li {
    width: 50%;
    height: 2.55rem;
    background: url('../../images/fentian/jx.png') no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 0; 
  }
  ul.projects li .jx, ul.projects li .zg {
    width: 61%;
    margin: .35rem auto;
  }
  ul.projects li .jx p, ul.projects li .zg p {
    text-align: center;
  }
  ul.projects li .jx p:nth-child(1), ul.projects li .zg p:nth-child(1) {
    font-size: .2rem;
    line-height: 1.38;
    text-align: justify;
    color: #240d1f;
    margin-bottom: 0;
    height: 1.38rem;
  }
  ul.projects li .jx p:nth-child(2), ul.projects li .zg p:nth-child(2) {
    font-size: .25rem;
    color: #fff;
    font-weight: bold;
  }
  ul.projects li:nth-child(2) {
    background: url('../../images/fentian/zg.png') no-repeat center center;
    background-size: 104% 101%;
  }
  .product {
    padding: .5rem 0;
  }
  .product-title {
    font-weight: bold;
    letter-spacing: 1.8px;
    color: #ffffff;
    font-size: .26rem;
    background: url('../../images/fentian/product-title.png') no-repeat center center;
    background-size: contain;
    width: 2.5rem;
    height: .72rem;
    line-height: .75rem;
    margin: 0 auto;
    z-index: 1;
    position: relative;
  }
  .product-box {
    background: url('../../images/fentian/bg-box.png') no-repeat center center;
    background-size: contain;
    width: 85%;
    height: 5.5rem;
    margin: 0 auto;
    margin-top: -.35rem;
    z-index: 0;
    position: relative;
    padding: .5rem 0 .4rem;
  }
  .product-box .txt, .product-box .txt2 {
    border-radius: 27.8px;
    background-color: #390f3e;
    color: #fff;
    width: 86%;
    font-size: .2rem;
    position: relative;
    text-align: justify;
    margin: .12rem .3rem;
  }
  .product-box .txt {
    padding: .12rem .25rem .1rem .32rem;
    float: right;
  }
  .product-box .txt2 {
    padding: .12rem .32rem .1rem .25rem;
    float: left;
  }
  .product-box .product-icon1, .product-box .product-icon2 {
    width: 11%;
    position: absolute;
  }
  .product-box .product-icon1 {
    top: 0;
    left: -.3rem;
  }
  .product-box .product-icon2 {
    bottom: 0;
    right: -.3rem;
  }
  .ft-yellow {
    color: #f6ff00;
  }
  .FenTian .header {
    background: url('../../images/fentian/register-header.png') no-repeat left top;
    background-size: contain;
    width: 100%;
    height: 3.772rem;
  }
  .FenTian .header .logo {
    text-align: left;
    padding-top: .12rem;
  }
  .FenTian .header .title {
    width: 55%;
    margin: 0 0 .08rem .18rem;
    float: left;
  }
  .FenTian .header .logo img:nth-child(1) {
    width: 17%;
    margin: 0rem .12rem 0.05rem .7rem;
  }
  .header .RMB {
    background: url('../../images/fentian/RMB.png') no-repeat right center;
    background-size: contain;
    width: 2.75rem;
    height: .5rem;
    line-height: .55rem;
    clear: both;
    color: #ffffff;
    font-weight: bold;
    font-size: .28rem;
    padding-left: .2rem;
	  letter-spacing: 0.2px;
  }
  .contents {
    background-image: linear-gradient(to top, #3b0f42, #130c04);
    padding-bottom: .5rem;
  }
  .gifts {
    overflow: hidden;
    margin: 0 .5rem;
  }
  .gifts li {
    float: left;
    width: 14.8%;
    position: relative;
    background: #fff;
    border-radius: .12rem;
    padding: .25rem .2rem .09rem;
    margin: .35rem 0.3rem .12rem;
    overflow: hidden;
  }
  .gifts li img:nth-child(1) {
    width: 91%;
  }
  .gifts li .num {
    position: absolute;
    left: -.28rem;
    top: .14rem;
    color: #fff;
    transform: rotate(-45deg);
    background: #ff6000;
    height: .23rem;
    line-height: .25rem;
    width: 1.06rem;
    font-size: .2rem;
  }
  .giftName {
    overflow: hidden;
    font-size: .22rem;
    color: #fff;
    line-height: 1.96;
    margin: 0 .5rem;
  }
  .giftName li {
    float: left;
    width: 33.33%;
  }
  .header .tip {
    line-height: 1.27;
    font-size: .35rem;
    font-weight: bold;
    margin: .15rem;
  }
  .register-form input {
    color:#666;
    font-size: .24rem;
  }
  .register-form input:-ms-input-placeholder, .register-form input:-moz-placeholder, .register-form input::-webkit-input-placeholder, .register-form input:placeholder {
    color: #999;
    font-size: .24rem;
  }
  .register-form {
    padding-top: 2.4rem;
    margin-top: -.2rem;
  }
  form input, form button {
    width: 68%;
    padding: 0 .4rem;
    margin: 0 0 .3rem 0;
    height: 0.76rem;
    border: none !important;
    color: #666;
    border-radius: .5rem;
    font-size: .24rem;
  }
  form .pic, form .captcha {
    width: 80%;
    margin: 0 auto;
  }
  form .pic input, form .captcha input {
    width: 50%;
    float: left;
  }
  form .pic span, form .captcha span {
    width: 30%;
    height: .76rem;
    background-color: #fff;
    border-radius: .5rem;
    float: right;
  }
  form .captcha span {
    font-size: .30rem;
    line-height: .82rem;
    color: #d0262a;
    font-weight: bold;
  }
  form .captcha span.send {
    background-color: #fdbf2c;
  }
  form button {
    width: 80%;
    font-size: .35rem;
    color: #d0262a;
    border-radius: .1rem;
    background: url('../../images/fentian/invest-btn.png') no-repeat center center;
    background-size: contain;
    height: 0.85rem;
    font-weight: bold;
    line-height: .7rem;
  }
</style>
