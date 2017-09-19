<template>
  <div>
    <div class="register" v-if="checkCode">
      <div class="header">
        <img src="../../images/register/header1.png" alt="" width="58%">
        <img src="../../images/register/header2.png" alt="" width="51%">
        <img src="../../images/register/vinda.png" alt="" width="27%">
      </div>
      <div class="contents">
        <div class="register-tip">
          现在注册下载宏财网app，并加入宏财网50+会员专属群，即可免费领取维达抽纸三连包一提。
        </div>
        <div class="registerForm">
          <form name="registerForm">
            <input type="tel" class="mobile" name="mobile" placeholder="请输入手机号" autocomplete="off" v-model="user.mobile" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler">
            <div class="pwd">
              <input type="text" id="password" name="password" placeholder="请设置登录密码" autocomplete="off" v-model="user.password" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler1">
              <span class="eyes" @click="changeEyes($event)"></span>
            </div>
            <button type="button" @click="register(user)">立即注册</button>
          </form>
        </div>
        <div class="good-projects">
          <img src="../../images/register/good-project.png" alt="" width="65%">
          <ul class="projects">
            <li v-for="item in projects">
              <p class="rate-txt">预计年化收益率</p>
              <p class="rate-num">{{item.rate || 8}}%</p>
              <p class="date">投资期限：{{item.date || 55}}天</p>
            </li>
          </ul>
        </div>
        <div class="choose-us">
          <img src="../../images/register/choose-us.png" alt="" width="65%">
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
      </div>
    </div>
    <div v-if="!checkCode" class="checkCode">
       二维码已失效 <br>请重新扫描
    </div>
  </div>
</template>
<script>
  import {Utils} from '../../service/Utils'
  import {md5} from '../../service/md5.js'
  import $ from 'zepto'
  export default {
    name: 'Register',
    data () {
      return {
        busy: false,
        user: {
          mobile: '',
          password: ''
        },
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
            rate: 10.7,
            date: 270
          }
        ],
        eyes: true,
        guestId: this.$cookie.get('guestId'),
        checkCode: true
      }
    },
    props: ['showErrMsg'],
    created () {
      if (!this.guestId) {
        this.$cookie.set('guestId', Utils.guestId(32, 16), 1)
        this.guestId = this.$cookie.get('guestId')
      }
      console.log(this.guestId)
      this.offlineCode()
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
        this.user.password = this.user.password.replace(/[\W]/g, '')
        this.user.password = this.user.password.length > 16 ? this.user.password.slice(0, 16) : this.user.password
      },
      beforepasteHandler1 (e) {
        this.user.password = this.user.password.replace(/[\W]/g, '')
      },
      changeEyes (event) {
        var el = $(event.currentTarget)
        var pwd = el.prev()
        if (this.eyes) {
          el.removeClass('eyes-grey').addClass('eyes')
          pwd.attr('type', 'text')
        } else {
          el.removeClass('eyes').addClass('eyes-grey')
          pwd.attr('type', 'password')
        }
        this.eyes = !this.eyes
      },
      offlineCode () {
        var that = this
        that.$http.post('/hongcai/rest/users/offline/checkCode', {
          guestId: that.guestId,
          code: that.$route.query.code
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            that.checkCode = response.data.status
            // that.checkCode = true
          }
        })
      },
      register (user) {
        // $('#password').focus()
        var that = this
        if (that.busy) { return }
        var mobilePattern = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[03678])|(14[0-9]))\d{8}$/
        var pwdPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/
        if (!user.mobile || !user.password) {
          return
        }
        if (!mobilePattern.test(user.mobile)) {
          that.showErrMsg('请输入正确手机号码')
          return
        }
        if (!pwdPattern.test(user.password)) {
          that.showErrMsg('登录密码由6-16位数字、字母组合而成，请重新设置！')
          return
        }
        that.busy = true
        that.$http.post('/hongcai/rest/users/offline/register', {
          guestId: that.guestId,
          code: that.$route.query.code,
          mobile: user.mobile,
          password: md5(user.password),
          channelCode: that.$route.query.f
        }).then(function (response) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          if (response && response.data.ret !== -1) {
            if (response.data.status) {
              that.$router.push({name: 'RegisterSuccess'})
            }
          } else {
            that.showErrMsg(response.data.msg)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .checkCode {
    font-size: .6rem;
    font-weight: bold;
    margin: 2rem auto;
  }
  .register {
    width: 100%;
  }
  .header {
    height: 5.34rem;
    background: url('../../images/register/header-bg.png') no-repeat center top;
    background-size: contain;
    padding-top: 1rem;
    position: relative;
  }
  .header img {
    display: block;
    margin: 0 auto;
  }
  .header img:nth-child(2) {
    margin-top: .2rem;
    position: relative;
    left: -.1rem;
  }
  .header img:nth-child(3) {
    position: absolute;
    right: .1rem;
    bottom: 1.2rem;
  }
  .contents {
    font-family: PingFang-SC;
    margin-top: -.1rem;
    background:#ff8401; /* 一些不支持背景渐变的浏览器 */  
    background:linear-gradient(to bottom, #ff8401 0%, #ffa62e 20%, #ff8401 100%);  
    background:-webkit-gradient(linear, 0 0, 0 bottom, #ff8401 0%, #ffa62e 20%, #ff8401 100%);  
  }
  .register-tip {
    font-size: .24rem;
    font-weight: bold;
    font-stretch: normal;
    line-height: 1.24;
    letter-spacing: normal;
    color: #fef2b7;
    padding: 0.2rem .8rem .5rem;
    text-align: justify;
  }
  .registerForm {
    margin-bottom: 1rem; 
  }
  .registerForm .mobile {
    width: 68%;
    padding: 0 .4rem;
    margin: 0 0 .35rem 0;
    height: 0.76rem;
    border: none !important;
    color: #666;
    border-radius: .1rem;
    font-size: .24rem;
  }
  .registerForm .pwd {
    padding: 0.02rem .3rem .02rem .4rem;
    width: 80%;
    height: 0.76rem;
    border-radius: .1rem;
    color: #666;
    margin: 0 auto;
    background: #fff;
  }
  .pwd input {
    width: 90%;
    float: left;
    height: 0.74rem;
    font-size: .24rem;
    border: none !important;
  }
  .pwd .eyes {
    display: inline-block;
    width: 10%;
    height: .76rem;
    background: url('../../images/register/eyes-orange.png') no-repeat center center;
    background-size: contain;
    float: right;
  }
  .pwd .eyes-grey {
    display: inline-block;
    width: 10%;
    height: .76rem;
    background: url('../../images/register/eyes-grey.png') no-repeat center center;
    background-size: contain;
    float: right;
  }
  .registerForm button {
    width: 80%;
    height: 0.76rem;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-size: .3rem;
    margin-top: .3rem;
    font-weight: bold;
    background-image: linear-gradient(to top, #e64d23, #f6602b);
    /* box-shadow: 0 7.5px 14.5px 0 rgba(252, 232, 101, 0.76); */
  }
  .projects {
    overflow: hidden;
    clear: both;
    padding: .3rem 0 .6rem;
  }
  .projects li {
    float: left;
    width: 50%;
    height: 2.5rem;
    background: url('../../images/register/bg-rate.png') no-repeat center center;
    background-size: 100%;
    text-align: center;
    color: #ffffff;
    margin-bottom: .2rem;
  }
  .rate-txt {
    font-size: .3rem;
    font-weight: 500;
    line-height: 1.6;
    margin-top: .1rem;
  }
  .rate-num {
    width: 60%;
    height: .95rem;
    line-height: .96rem;
    border-radius: 5px;
    background-color: #ffffff;
    margin: 0.05rem auto .02rem;
    color: #f55e2a;
    font-size: .56rem;
    font-weight: 500;
  }
  .date {
    font-size: .26rem;
    font-weight: 500;
    line-height: 1.78;
  }
  .choose-us {
    padding-bottom: 1.2rem;
  }
  .about .title, .about2 .title, .about3 .title {
    background: linear-gradient(to right, transparent 0%, #ed6728 40%, transparent 100%);
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ed6728 40%, rgba(255, 255, 255, 0) 100%);
    background: url('../../images/register/title-bg.png') no-repeat center center;
    background-size: contain;
    width: 50%;
    height: .9rem;
    line-height: .95rem;
    text-align: center;
    color: #fff;
    font-size: .48rem;
  }
  .about .content, .about3 .content {
    background: url('../../images/register/background-gz.png') no-repeat .2rem .3rem;
    background-size: 100% 100%;
    height: 3rem;
    padding-right: .3rem;
  }
  .about2 .content {
    background: url('../../images/register/custody-bg.png') no-repeat -.18rem 0;
    background-size: 100% 100%;
    height: 2.8rem;
  }
  .about3 .content {
    background: url('../../images/register/control-bg.png') no-repeat .2rem .3rem;
    background-size: 100% 100%;
  }
  .about .text, .about2 .text, .about3 .text {
    width: 50%;
    text-align: justify;
    color: rgba(255, 255, 255, 0.87);
    font-size: .26rem;
    font-weight: 500;
    line-height: 1.55;
    margin-top: .2rem;
  }
  .about .icon, .about2 .icon, .about3 .icon {
    float: left;
    width: .28rem;
    height: .5rem;
    display: inline-block;
    background: url('../../images/register/icon.png') no-repeat 0 5px;
    background-size: 100%;
    margin-right: .12rem;
  }
  .about2 .title{
    margin: .6rem 0 .5rem 50%;
  }
  .about2 .text {
    margin: -1.5rem 0 0 .15rem;
  }
  .about3 .text {
    margin-top: -.3rem;
  }
  .about .text span:nth-child(2), .about2 .text span:nth-child(2), .about3 .text span:nth-child(2) {
    display: inline-block;
    width: 85%;
  }
  .about3 .title{
    margin: .3rem 0;
  }
  @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) 
    and (orientation : portrait) { 
    .header {
      height: 6.1rem;
    }
  }
</style>
