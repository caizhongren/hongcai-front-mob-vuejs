<template>
  <div>
    <div class="mg-promotion">
        <header>
          <img class="header" src="../../images/mangoTV/act-head.png" alt="" width="100%">
          <p>携手宏财网&nbsp;&nbsp;&nbsp;开启新视野</p>
        </header>
        <div class="gift">
          <p class="title">0元变身VIP，追星看剧更华丽</p>
          <div v-show="!user.registerSuccess">
            <img src="../../images/mangoTV/courtesy1-vip.png" alt="" class="vip-img">
            <div class="content">
              <p>现在注册认证宏财网，即可免费获得<span class="ft-important">芒果TV会员</span>1个月</p>
              <p>*每个账号限领一次</p>
              <span class="take-btn" @click="showRegister = true">立即变身VIP</span>
            </div>
          </div>
          <div class="success" v-show="user.registerSuccess">
            <img src="../../images/mangoTV/success-msg.png" width="60%" alt="">
            <p>您已获得芒果TV会员1个月奖励资格<br>下载宏财网App，登录首页开通存管即可获取</p>
            <!-- <p>下载宏财网App，登录首页开通存管即可获取</p> -->
            <span class="take-btn">立即变身VIP</span>
          </div>
        </div>
        <div class="gift gift2">
          <p class="title">首投VIP再升级，季卡年卡送给你</p>
          <ul class="card-list">
            <li class="vip-card">
              <!-- <p>3个月VIP</p> -->
              <p>首笔投资满1000元</p>
            </li>
            <li class="vip-card">
              <!-- <p>半年VIP</p> -->
              <p>首笔投资满2000元</p>
            </li>
            <li class="vip-card">
              <!-- <p>年度VIP</p> -->
              <p>首笔投资满5000元</p>
            </li>
            <li class="vip-card">
              <!-- <p>年度全屏VIP</p> -->
              <p>首笔投资满10000元</p>
            </li>
          </ul>
          <p class="tip">
            *温馨提示:<br>
            活动首投仅限宏财精选、宏财尊贵项目有效，债权转让项目不参与本次活动。<br>
            奖励剩余数量每分钟更新一次。
          </p>
        </div>
        <div class="about">
          <img src="../../images/mangoTV/about.png" alt="" width="60%" class="margin-auto">
          <ul class="about-list">
            <li>
              <div class="title">
                国资背景
              </div>
              <div class="words">
                <p>2016年获国有企业一亿元A轮战略投资</p>
                <p>新三板金控第一股入主</p>
                <p>拥有博士高管团队的互联网金融平台</p>
              </div>
            </li>
            <li>
              <div class="title">
                银行存管
              </div>
              <div class="words">
                <p>2016年加入网贷行业协会，首批接入北京存管通平台，所有投资信息实时上传北京金融局等监管部门</p>
                <p>2017年6月正式上线海口农商银行资金存管，实现银行级资金安全保障</p>
              </div>
            </li>
            <li>
              <div class="title">
                风控安全
              </div>
              <div class="words">
                <p>十多年金融生态圈，积累优质资产</p>
                <p>银行级存管确保用户投资资金万无一失</p>
                <p>所有项目借款方知根知底，铸造闭环征信体系</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="statement">
          该活动与设备生产商Apple Inc.公司无关
        </div>
    </div>
    <div class="mask-common" v-show="showRegister" @click="closeMask">
      <div class="register-wrap" id="register">
        <form action="" name="registerForm">
          <div>
            <input type="mobile" id="mobile" name="mobile" placeholder="请输入手机号" v-model="user.mobile ">
            <input type="text" id="picCaptcha" name="picCaptcha" placeholder="请输入图形验证码" v-model="user.picCaptcha">
            <span @click="refreshCode"><img id="checkCaptcha" alt="图形验证码" class="margin-auto displa-bl" width="100%"></span>
            <input type="text" id="captcha" name="captcha" placeholder="请输入短信验证码" v-model="user.captcha">
            <span class="capcha-wrap" id="send" @click="getCaptcha">获取</span>
            <button type="button" @click="register(user)">立即注册</button>
          </div>
        </form>
      </div>
    </div>
    <p id="err" v-show="showErr">{{errMsg}}</p>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {Utils, sendMobCaptcha, ModalHelper} from '../../service/Utils'
  export default {
    name: 'mgPromotion',
    data () {
      return {
        showRegister: false,
        showErr: false,
        canGetCaptch: true,
        busy: false,
        getPicCaptcha: '',
        errMsg: '',
        user: {
          registerSuccess: false,
          mobileCaptchaType: 1,
          mobileCaptchaBusiness: 0,
          mobile: '',
          picCaptcha: '',
          captcha: ''
        }
      }
    },
    watch: {
      'user.mobile': function (newVal, oldVal) {
        this.user.mobile = newVal.length > 11 ? newVal.slice(0, 11) : newVal
      },
      'user.picCaptcha': function (newVal, oldVal) {
        this.user.picCaptcha = newVal.length > 4 ? newVal.slice(0, 4) : newVal
      },
      'user.captcha': function (newVal, oldVal) {
        this.user.captcha = newVal.length > 6 ? newVal.slice(0, 6) : newVal
      },
      'showRegister': function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    created () {
    },
    mounted () {
      this.refreshCode()
    },
    methods: {
      // 图形验证码
      refreshCode () {
        var that = this
        this.$http.get('/hongcai/rest/captchas', {
          code: Math.random()
        })
        .then(function (res) {
          $('#checkCaptcha').attr({'src': 'data:image/png;base64,' + res.data.data})
          console.log(that.getCaptcha)
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      // 用户点击获取
      getCaptcha () {
        if (!this.canGetCaptch || !this.user.mobile || !this.user.picCaptcha) { return }
        // 校验手机号
        var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[03678])|(14[0-9]))\d{8}$/
        var that = this
        if (!mobilePattern.test(that.user.mobile)) {
          that.showErrMsg(true, '手机号码格式有误')
          return
        }
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
          if (!res.data || res.data.ret === -1) {
            that.showErrMsg(true, res.data.msg)
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
          that.showErrMsg(true, '验证码发送失败')
        })
      },
      register (user) {
        if (this.busy) { return }
        var that = this
        if (!user.mobile || !user.picCaptcha || !user.captcha) {
          return
        }
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
            that.showErrMsg(true, res.data.msg)
            return
          }
          // 注册成功
          that.user.registerSuccess = true
        })
        .catch(function (err) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          console.log(err)
        })
      },
      showErrMsg (isShow, msg) {
        this.showErr = isShow
        this.errMsg = msg
        var that = this
        setTimeout(function () {
          that.showErr = false
          that.errMsg = ''
        }, 2000)
      },
      // 点击蒙层关闭弹窗
      closeMask ($event) {
        var _con = $('#register')
        if (_con.has($event.target).length === 0) {
          this.showRegister = false
        }
      }
    }
  }
</script>
<style scoped>
  .statement {
    margin-top: .8rem;
    width: 100%;
    height: .9rem;
    line-height: 1rem;
    text-align: center;
    color: #333;
    font-size: .22rem;
    background-color: #fab281;
  }
  /* 错误提示 */
  #err {
    position: fixed;
    top: 2.8rem;
    left: 1.4rem;
    right: 1.4rem;
    padding: .15rem 0;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: .2rem;
    text-align: center;
    font-size: .23rem;
    color: #fff;
    z-index: 10000000;
  }
  /* 主页面 */
  .mg-promotion {
    background: url('../../images/mangoTV/bg.png') no-repeat 0 0;
    background-size: 100% 100%;
    overflow: hidden;
    font-family: PingFang-SC;
  }
  header {
    position: relative;
    width: 100%;
    margin-top: -0.5rem;
  }
  header p {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 24.5%;
    color: #fff;
    font-size: .28rem;
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
    color: #fff;
    padding-top: 1.05rem;
    margin-left: 31%;
    font-size: .28rem;
    text-align: left;
  }
  .gift .success img{
    margin: .3rem 0 .05rem;
  }
  .gift .success p {
    font-size: .24rem;
    padding: 0 8%;
    margin-bottom: .15rem;
    line-height: 1.3;
    color: #333;
  }
  .gift .success .take-btn {
    width: 44%;
    margin: 0 auto;
  }
  .gift .vip-img {
    width: 42%;
    border-radius: 5px;
    float: left;
    margin: .4rem .3rem 0 .4rem;
  }
  .gift .content {
    float: left;
    width: 2.6rem;
    text-align: justify;
  }
  .content p {
    color: #333;
    font-size: .25rem;
  }
  .content p:first-child {
    line-height: 1.29;
    margin-top: .33rem;
  }
  .content p:first-child + p {
    color: #666;
    margin-top: .03rem;
  }
  .gift .take-btn {
    background: url('../../images/mangoTV/change-btn.png') no-repeat 0 0;
    margin-top: .05rem;
    height: .93rem;
    line-height: .95rem;
    width: 100%;
    background-size: 100% 100%;
    font-size: .32rem;
    text-align: center;
    color: #fd6200;
    display: block;
  }
  .gift2 {
    margin-top: .1rem;
    margin-bottom: .9rem;
    height: 8rem;
    background: url('../../images/mangoTV/gift02.png') no-repeat center top;
    background-size: 100% 100%;
  }
  .gift2 p.tip {
    color: #ff4b64;
    font-size: .2rem;
    text-align: justify;
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
    border-radius: .1rem;
    margin-bottom: .35rem;
    margin-left: .3rem;
    /* border: solid 1px #ffee5d; */
    /* box-shadow: 0 2px 3.5px 0 rgba(167, 76, 36, 0.74); */
    background: url('../../images/mangoTV/vip1.png') no-repeat 0 0;
    background-size: 100% 100%;
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
    color: #666;
    font-size: .26rem;
    line-height: 11.9;
  }
  /* 关于我们 */
  .about .about-list li {
    width: 80%;
    margin: .35rem auto 0;
    color: #fff;
    font-size: .28rem;
    border-radius: .1rem;
	  box-shadow: 0 2.5px 0 0 rgba(4, 122, 87, 0.55);
    background-color: #fff;
    border-radius: .1rem;
  }
  .about .about-list li .words {
    padding: .3rem .5rem .3rem .2rem;
  }
  .about .about-list li .words p {
    color: rgba(51, 51, 51, 0.87);
    opacity: 0.87;
    font-size: .23rem;
    line-height: 1.8;
    text-align: justify;
    padding-left: .42rem;
    background: url('../../images/mangoTV/yes-icon.png') no-repeat .1rem .13rem;
    background-size: 4%;
  }
  .about-list li .title {
    height: 53px;
    line-height: 53px;
    width: 102%;
    margin-left: -1%;
	  background-color: #45c7a9;
    background-image: url('../../images/mangoTV/about-title-bg.png');
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center center;
  }
  /* 注册弹窗 */
  .mask-common .register-wrap {
    margin: 1.5rem auto;
    width: 88%;
    height: 56%;
    background: url('../../images/mangoTV/mask-bg.png') no-repeat 0 0;
    background-size: 100% 100%;
  }
  .register-wrap input {
    padding: 0 .4rem;
    margin: 0 0 .35rem 0;
    height: 0.64rem;
    width: 60%;
    border-radius: .1rem;
    border: none !important;
    color: #666;
    font-size: .24rem;
  }
  input:-moz-placeholder, input::-webkit-input-placeholder, input:-ms-input-placeholder {
    color: #999;
  }
  .register-wrap input:first-child {
    width: 60%;
    margin-top: 1.6rem;
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
    border-radius: .1rem;
    padding: 0 .05rem;
    margin: 0 0 .35rem 0;
    height: .64rem;
    line-height: .68rem;
    color: #fd6300;
    font-size: .25rem;
    text-align: center;
    background: #fff; 
  }
  form .capcha-wrap {
    background-color: #ffde01;
  }
  form button {
    width: 46%;
    height: .9rem;
    line-height: .9rem;
    color: #fd6300;
    font-size: .3rem;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    background: url('../../images/mangoTV/change-btn.png') no-repeat 0 0;
    background-size: 100% 100%;
    border: none;
    outline: none;
  }
</style>
