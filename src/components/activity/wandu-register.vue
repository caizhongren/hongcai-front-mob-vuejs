<template>
  <div class="wandu-register">
    <div class="header-img">
      <p>活动时间：{{actInfo.startTime | date}}—{{actInfo.endTime | date}}</p>
    </div>
    <div class="register-form">
      <form>
        <input type="tel" name="mobile" class="mobile" placeholder="请输入手机号" v-model="user.mobile" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler" autocomplete="off">
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
<style scoped>
  @import '../../css/wandu.css';
</style>
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

