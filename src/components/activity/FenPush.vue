<template>
  <div class="FenTian overflow-hid">
    <div class="header">
      <div class="logo">
        <img src="../../images/fentian/logo-hongcai.png" alt="">
        <img src="../../images/fentian/logo-fen.png" alt="" width="8.5%">
      </div>
      <img src="../../images/fentian/register-header-text.png" alt="" class="title">
      <p class="RMB">价值 <span class="ft-yellow">RMB410</span></p>
      <ul class="gifts">
        <li>
          <img src="../../images/fentian/gift0-1.png" alt="">
          <p class="num">x 1</p>
        </li>
        <li>
          <img src="../../images/fentian/gift0-2.png" alt="">
          <p class="num">x 1</p>
        </li>
        <li>
          <img src="../../images/fentian/gift0-3.png" alt="">
          <p class="num">x 2</p>
        </li>
      </ul>
      <ul class="giftName">
        <li>【时装兑换令牌】</li>
        <li>【圣器印记礼包】</li>
        <li>【魔气结晶】</li>
      </ul>
      <p class="tip ft-yellow">注册认证即可领取兑换码</p>
    </div>
    <div class="contents">
      <!-- 注册表单 -->
      <div class="register-form">
        <form>
          <input type="tel" name="mobile" maxlength="11" class="mobile" placeholder="请输入手机号" v-model="user.mobile" v-on:input="user.mobile = user.mobile.replace(/\D/g, '')" autocomplete="off">
          <div class="pic">
            <input type="tel" maxlength="4" name="picCaptcha" placeholder="请输入图形验证码" v-model="user.picCaptcha" v-on:input="user.picCaptcha = user.picCaptcha.replace(/\D/g, '')" autocomplete="off">
            <span @click="refreshCode"><img alt="图形验证码" id="picCaptcha" width="100%" height="100%"></span>
          </div>
          <div class="captcha">
            <input type="tel" name="captcha" maxlength="6" placeholder="请输入短信验证码" v-model="user.captcha" v-on:input="user.captcha = user.captcha.replace(/\D/g, '')" autocomplete="off">
            <span class="send" @click="getCaptcha" id="sent">获取</span>
          </div>
          <button type="button" @click="register(user)">立即注册</button>
        </form>
      </div>
      <!-- 产品特点 -->
      <div class="product">
        <p class="product-title">项目特点</p>
        <div class="product-box">
          <div class="projectType">
            <p>精选项目</p>
            <div>
              <p>期限：180天以内(含180天)</p>
              期望年均回报率：8%-10%
            </div>
          </div>
          <p class="description">由优质资产方推荐，经过宏财网严格风控程序层层筛选出的优质中短期金融资产。项目均有足额抵押物，灵活稳健，具有一定流动性。</p>
          <div class="projectType">
            <p>尊贵项目</p>
            <div>
              <p>期限：180天以上</p>
              期望年均回报率：10%-12%
            </div>
          </div>
          <p class="description">由优质资产方推荐，经过宏财网严格风控程序层层筛选出的优质中长期金融资产。宏财网对项目全程把控，回报丰厚。</p>
          <div class="tips"><img src="../../images/fentian/tips.png" alt="提示" width="6%"> 会员还可按等级享受加息优惠</div>
        </div>
      </div>
      <!-- 战略合作 -->
      <div class="hongcai">
        <div class="title">战略合作</div>
        <ul class="abouts">
          <li>
            <img src="../../images/fentian/hk.png" alt="">
            <p>海口银行</p>
            <p>全程资金存管</p>
          </li>
          <li>
            <img src="../../images/fentian/fdd.png" alt="">
            <p>法大大</p>
            <p>合同电子签章</p>
          </li>
          <hr class="hr hr1" width="85%" color="#490745">
          <hr class="hr" width="85%" color="#490745">
          <li>
            <img src="../../images/fentian/yb.png" alt="">
            <p>易宝支付</p>
            <p>合作支付通道</p>
          </li>
          <li>
            <img src="../../images/fentian/xrj.png" alt="">
            <p>鑫融基</p>
            <p>优质资产推荐方</p>
          </li>
          <hr class="hr hr1" width="85%" color="#490745">
          <hr class="hr" width="85%" color="#490745">
          <li>
            <img src="../../images/fentian/gx.png" alt="">
            <p>国信</p>
            <p>优质资产推荐方</p>
          </li>
          <li>
            <img src="../../images/fentian/qt.png" alt="">
            <p>青桐</p>
            <p>优质资产推荐方</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask-common fen-mask" v-show="activityStatus === 2">
      <img src="../../images/fentian/activityEnd.png" alt="" width="60%">
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
        },
        activityStatus: 1 // 1 正常 2 结束
      }
    },
    props: ['showErrMsg'],
    watch: {
      activityStatus: function (val) {
        val && val === 2 ? $('.FenTian').height(window.innerHeight + 'px') : $('.FenTian').height('auto')
      }
    },
    mounted () {
      this.refreshCode()
    },
    created () {
      this.getActivityStatus()
    },
    methods: {
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
      },
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
          that.activityStatus = res.data.status
        })
      }
    },
    destroyed () {
      sendMobCaptcha.resetGetMobileCapcha()
    }
  }
</script>
<style scoped>
  /* 活动结束蒙层 */
  .fen-mask {
    background-color: rgba(0,0,0,0.9) !important;
    padding-top: 2.5rem;
  }
  .hr {
    height: 1px;
    border: 0px;
    margin: 0px auto;
    margin-bottom: .2rem;
  }
  .hr1 {
    transform: rotate(90deg);
  }
  .hongcai {
    width: 85%;
    height: 7.6rem;
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
    box-sizing: border-box;
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
    color: #3e1543;
    text-align: center;
  }
  .hongcai .abouts li p:nth-child(3) {
    line-height: 1.2;
    letter-spacing: normal;
    font-size: .21rem;
    /* transform: scale(0.95); */
    font-weight: normal;
    margin-top: .05rem;
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
    background-size: 100% 100%;
    width: 85%;
    height: 6.5rem;
    margin: 0 auto;
    margin-top: -.35rem;
    z-index: 0;
    position: relative;
    padding: .5rem 0 .4rem;
  }
  .product-box .projectType {
    background: url('../../images/fentian/xmbg.png') no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: 1.78rem;
    margin: 0 auto;
    padding: .28rem .6rem .28rem .42rem;
  }
  .product-box .projectType>p {
    float: left;
    width: 5px;
    color: #fff;
    text-align: center;
    line-height: 1.22;
    font-size: .23rem;
  }
  .product-box .projectType>div {
    float: right;
    width: 74%;
    color: #390f3e;
    line-height: 1.97;
    letter-spacing: 0.4px;
    font-size: .23rem;
    font-weight: bold;
    text-align: left;
  }
  .product-box .projectType>div>p {
    border-bottom: 1px solid #f4c97b;
  }
  .product-box .description {
    width: 80%;
    margin: -.2rem auto .1rem;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: justify;
    color: #390f3e;
    font-size: .21rem;
  }
  .product-box .tips {
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #461f4b;
    font-size: .21rem;
    margin-top: .35rem;
  }
  .product-box .tips img {
    vertical-align: text-bottom;
    margin-right: .1rem;
  }
  .ft-yellow {
    color: #f6ff00;
  }
  .FenTian .header {
    background: url('../../images/fentian/register-header.png') no-repeat left top;
    background-color: #3b0f42;
    background-size: cover;
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
    font-size: .3rem;
    padding-left: .3rem;
	  letter-spacing: 0.2px;
  }
  .contents {
    background-image: linear-gradient(to top, #3b0f42, #130c04);
    background-color: #130c04;
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
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
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
    margin: .2rem;
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
    padding-top: 37.5%;
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
