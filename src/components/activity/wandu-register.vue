<template>
  <div class="wandu-register">
    <div class="header-img">
      <p>活动时间：{{actInfo.startTime | date}}—{{actInfo.endTime | date}}</p>
    </div>
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
    <div class="act-rules">
      <div class="rule-title clearfix">
        <span class="line"></span>
        <p class="display-inb">活动规则</p>
        <span class="line"></span>
      </div>
      <p class="item"><span>1.</span><span>活动期间，新注册用户将获得18888元特权本金(有效期1天)+966元现金红包奖励；</span></p>
      <p class="item"><span>2.</span><span>如注册日起30天内还未开通银行存管，则奖励将自动失效，请注意及时开通；</span></p>
      <p class="item"><span>3.</span><span>在法律规定范围内，宏财网保留本活动最终解释权.</span></p>
    </div>
    <div class="title-btn">
      优质项目推荐        
    </div>
    <div class="good-projects">
      <ul class="projects">
        <li v-for="item in projects">
          <p class="rate-txt">预计年化收益率</p>
          <p class="rate-num">{{item.rate || 8}}%</p>
          <p class="date">投资期限：{{item.date || 55}}天</p>
        </li>
      </ul>
    </div>
    <div class="title-btn">
      关于宏财        
    </div>
    <div class="choose-us">
      <div class="about">
        <div class="title">国资背景</div>
        <div class="content">
          <div class="text fr">
            <p>
              <span class="icon"></span>
              <span>2016年获国有企业一亿元A轮战略投资</span>
            </p>
            <p>
              <span class="icon"></span>
              <span>新三板金控第一股鑫融基入股</span>
            </p>
            <p>
              <span class="icon"></span>
              <span>拥有博士高管团队的互联网金融平台</span>
            </p>
          </div>
        </div>
      </div>
      <div class="about2">
        <div class="title">银行存管</div>
        <div class="content">
          <div class="text fl">
            <p>
              <span class="icon"></span>
              <span>2016年加入网贷行业协会，首批接入北京存管通平台，所有投资信息实时上传北京金融局等监管部门</span>
            </p>
            <p>
              <span class="icon"></span>
              <span>2017年6月正式上线海口联合农商银行资金存管，实现银行级资金安全保障</span>
            </p>
          </div>
        </div>
      </div>
      <div class="about3">
        <div class="title">风控安全</div>
        <div class="content">
          <div class="text fr">
            <p>
              <span class="icon"></span>
              <span>十多年金融生态圈，积累优质资产</span>
            </p>
            <p>
              <span class="icon"></span>
              <span>银行级存管确保用户投资资金万无一失</span>
            </p>
            <p>
              <span class="icon"></span>
              <span>所有项目借款方知根知底，铸造闭环征信体系</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mask-common" v-show="!actInfo.status">
      <div class="red-package">
        <p>本活动已结束!<br>请前往App参与其<br>他活动吧!</p>
      </div>
      <p class="upload-btn" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">下载宏财网App</p>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {Utils, sendMobCaptcha} from '../../service/Utils'
  export default {
    name: 'wanduRegister',
    data () {
      return {
        canGetCaptch: true,
        isIos: Utils.isIos(),
        busy: false,
        actInfo: {},
        projects: [
          {
            rate: 8.6,
            date: 55
          },
          {
            rate: 9.3,
            date: 85
          },
          {
            rate: 9.8,
            date: 180
          },
          {
            rate: 11.6,
            date: 360
          }
        ],
        user: {
          mobile: '',
          picCaptcha: '',
          captcha: '',
          mobileCaptchaType: 1,
          mobileCaptchaBusiness: 0
        }
      }
    },
    props: ['showErrMsg'],
    created () {
      var that = this
      that.$http({
        url: '/hongcai/rest/activitys/wandu/channel/status?activityType=' + that.$route.query.act + '&channelCode=' + that.$route.query.f
      })
      .then(function (res) {
        that.actInfo = res.data
      })
      .catch(function (err) {
        console.log(err)
      })
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
              that.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！')
            } else {
              that.showErrMsg(res.data.msg)
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
          that.showErrMsg('验证码发送失败')
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
              that.showErrMsg('请输入正确的手机号！')
            } else if (res.data.code === -1005) {
              that.showErrMsg('该活动只针对新用户哦，您已经注册过了，前往登录app参与其他活动吧！')
            } else {
              that.showErrMsg(res.data.msg)
            }
            return
          }
          // 注册成功
          that.$router.push({name: 'WanduSuccess'})
        })
        .catch(function (err) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .wandu-register {
    background-color: #e81352;
    width: 100%;
    overflow-x: hidden;
  }
  .header-img {
    height: 4.25rem;
    background: url('../images/register/wandu-header.jpg') no-repeat 0 0;
    background-size: 100%;
  }
  .header-img p {
    margin-left: 10%;
    color: #fff;
    height: 100%;
    width: 90%;
    line-height: 8rem;
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
    padding-top: .4rem;
    height: 5rem;
  }
  form input, form button {
    width: 68%;
    padding: 0 .4rem;
    margin: 0 0 .35rem 0;
    height: 0.76rem;
    border: none !important;
    color: #666;
    border-radius: .1rem;
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
    border-radius: .1rem;
    float: right;
  }
  form .captcha span {
    font-size: .30rem;
    line-height: .82rem;
    color: #e81352;
  }
  form .captcha span.send {
    background-color: #feec1c;
  }
  form button {
    width: 80%;
    font-size: .3rem;
    color: #e71e59;
    border-radius: .1rem;
    background-color: #feec1c;
  }
  /* 活动规则 */
  .act-rules {
    padding: .3rem .35rem;
    width: 88%;
    height: 3.5rem;
    margin: 0 auto;
    border-radius: 15px;
    background-color: #ec4475;
    font-weight: 500;
    text-align: justify;
    color: #fff;
  }
  .act-rules p {
    color: #fefefe;
    font-size: .24rem;
    font-weight: 500;
    text-align: justify;
  }
  .act-rules .rule-title .line {
    width: 20%;
    height: 1px;
    background-color: #fff;
    margin-left: 13%;
    float: left;
    margin-top: .2rem;
    margin-bottom: .35rem;
  }
  .act-rules .rule-title p {
    float: left;
    font-size: .28rem;
    font-weight: bold;
    margin-left: 6%;
    margin-right: -8%;
    height: .2rem;
    color: #f0d730;
  }
  .act-rules .item span:first-child {
    float: left;
  }
  .act-rules .item span:last-child {
    line-height: 1.7;
    width: 95%;
    display: inline-block;
  }
  /* 优质项目 */
  .title-btn {
    height: 1rem;
    width: 48%;
    margin: 1rem auto .6rem;
    background: url('../images/register/wandu-btn.png') no-repeat 0 0;
    background-size: 100%;
    font-size: .32rem;
    font-weight: bold;
    line-height: .76rem;
    color: #e81352;
  }
  .projects {
    overflow: hidden;
    clear: both;
  }
  .projects li {
    float: left;
    width: 46%;
    height: 2.5rem;
    background: url('../images/register/bg-rate1.png') no-repeat center center;
    background-size: 100%;
    text-align: center;
    color: #e81352;
    margin-bottom: .2rem;
  }
  .projects li:nth-child(odd) {
    margin: 0 2%;
  }
  .rate-txt {
    font-size: .28rem;
    font-weight: 500;
    line-height: 2.7;
    margin-left: .22rem;
  }
  .rate-num {
    height: .95rem;
    line-height: 1rem;
    border-radius: 5px;
    font-size: .5rem;
    font-weight: 500;
    margin-left: 12%;
  }
  .date {
    font-size: .26rem;
    font-weight: 500;
    line-height: 1.78;
    margin-left: .3rem;
    margin-top: .2rem;
  }
  /* 选择我们 */
  .choose-us {
    padding-bottom: .3rem;
  }
  .about .title, .about2 .title, .about3 .title {
    background: linear-gradient(to right, transparent 0%, #ed6728 40%, transparent 100%);
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ed6728 40%, rgba(255, 255, 255, 0) 100%);
    background: url('../images/register/wandu-title.png') no-repeat center center;
    background-size: cover;
    width: 60%;
    height: .9rem;
    line-height: .95rem;
    text-align: center;
    padding-left: .5rem;
    margin-left: -.6rem;
    color: #fff;
    font-size: .3rem;
  }
  .about .content, .about3 .content {
    background: url('../images/register/background-gz.png') no-repeat .4rem .6rem;
    background-size: 90%;
    height: 3rem;
    padding-right: .3rem;
  }
  .about2 .content {
    background: url('../images/register/custody-bg.png') no-repeat .2rem -0rem;
    background-size: 90%;
    height: 2.8rem;
  }
  .about3 .content {
    background: url('../images/register/control-bg.png') no-repeat .4rem .4rem;
    background-size: 90%;
  }
  .about .text, .about2 .text, .about3 .text {
    width: 50%;
    text-align: justify;
    color: rgba(255, 255, 255, 0.87);
    font-size: .24rem;
    font-weight: 500;
    line-height: 1.55;
    margin-top: .3rem;
  }
  .about .icon, .about2 .icon, .about3 .icon {
    float: left;
    margin-top: .05rem;
    background-size: 100%;
    border: .14rem solid transparent;
    border-left-color: #feec1c;
  }
  .about2 .title{
    margin: .6rem 0 .5rem 43%;
  }
  .about2 .text {
    margin: -1.3rem 0 0 .35rem;
  }
  .about3 .text {
    margin-top: 0rem;
  }
  .about .text span:nth-child(2), .about2 .text span:nth-child(2), .about3 .text span:nth-child(2) {
    display: inline-block;
    width: 85%;
  }
  .about3 .title {
    margin: .1rem 0;
    margin-left: -.5rem;
    padding-left: .4rem;
  }
  /* 活动结束蒙层 */
  .red-package {
    margin-top: 1rem;
    padding-top: 0.6rem;
    height: 6rem;
    background: url('../images/register/red-bag1.png') no-repeat top center;
    background-size: 80%;
  }
  .red-package p:last-child {
    margin-top: 1.75rem;
    line-height: 1.4;
    font-size: .26rem;
    color: #feef1d;
  }
  .upload-btn {
    width: 80%;
    height: .9rem;
    line-height: .95rem;
    font-size: .3rem;
    color: #e71e59;
    margin: -1rem auto .2rem;
    border-radius: .1rem;
    background-color: #feec1c;
  }
</style>

