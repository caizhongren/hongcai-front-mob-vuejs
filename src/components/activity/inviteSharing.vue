<template>
  <div class="inviteMsg">
    <div class="inviteShare">
      <div class="imgs">
        <img src="../../images/invite/invite-share_01.png" alt="">
        <img src="../../images/invite/invite-share_02.png" alt="">
        <img src="../../images/invite/invite-share_03.png" alt="">
        <img src="../../images/invite/invite-share_04.png" alt="">
        <img src="../../images/invite/invite-share_05.png" alt="">
        <img src="../../images/invite/invite-share_06.png" alt="">
        <img src="../../images/invite/invite-share_07.png" alt="">
        <img src="../../images/invite/invite-share_08.png" alt="">
        <img src="../../images/invite/invite-share_09.png" alt="">
        <img src="../../images/invite/invite-share_10.png" alt="">
      </div>
      <span>18888元特权本金(邀请专属)</span>
      <span>966元现金券</span>
    </div>
    <div class="inviteForm">
      <p><input type="tel" name="mobile" class="mobile" placeholder="请输入手机号" v-model="user.mobile" v-on:input="oninputHandler" v-on:beforepaste="beforepasteHandler(e)" autocomplete="off"></p>
      <p>
        <input type="tel" maxlength="4" name="picCaptcha" placeholder="请输入图形验证码" v-model="user.picCaptcha" v-on:input="oninputHandler1" v-on:beforepaste="beforepasteHandler(e)" autocomplete="off" style="width:50%">
        <span @click="refreshCode" class="verification"><img alt="图形验证码" id="picCaptcha" width="100%" height="100%"></span>
      </p>
      <p>
        <input type="tel" name="captcha" placeholder="请输入短信验证码" v-model="user.captcha" v-on:input="oninputHandler2" v-on:beforepaste="beforepasteHandler(e)" autocomplete="off" style="width:50%">
        <span class="send obtain" @click="getCaptcha" id="sent">获取</span>
      </p>
      <p><input type="button" @click="register(user)" value="接受邀请"></p>
    </div>
    <div class="inviteDetail">
      <div class="inviteContent friends">
        <p>
          <span></span>
          <span>已受邀好友</span>
          <span></span>
        </p>
        <ul class="text-left overflow-hid">
          <li v-for="item in inviteMsg">
            <p>{{item.mobile}} &nbsp;&nbsp; {{item.createTime | dateDotTime}}</p>
            <p>{{item.encourage}}</p>
          </li>
          <p v-show="!inviteMsg.length" class="text-center">暂无数据</p>
        </ul>
      </div>
      <div class="inviteContent rules">
        <p>
          <span></span>
          <span>活动规则</span>
          <span></span>
        </p>
        <div class="rulesContent text-left">
          <!-- <span class="fl">1.</span><p class="fl overflow-hid">本活动只针对新注册用户有效，同时特权本金奖励仅通过邀请方式注册的新用户可获得；</p>
          <span class="fl">2.</span><p>如注册后30日内未开通银行存管，则邀请专属特权本金奖励将自动失效，请注意及时开通哟；</p>
          <span class="fl">3.</span><p>本活动最终解释权归宏财网所有。</p> -->
          <ul>
            <li class="overflow-hid"><span class="fl">1.</span><p class="fl">本活动只针对新注册用户有效，同时特权本金奖励仅通过邀请方式注册的新用户可获得；</p></li>
            <li class="overflow-hid"><span class="fl">2.</span><p class="fl">如注册后30日内未开通银行存管，则邀请专属特权本金奖励将自动失效，请注意及时开通哟；</p></li>
            <li class="overflow-hid"><span class="fl">3.</span><p class="fl">本活动最终解释权归宏财网所有。</p></li>
          </ul>
        </div>
      </div>
      <div class="inviteContent cooperation">
        <p>
          <span></span>
          <span>战略合作</span>
          <span></span>
        </p>
        <div class="cooperations">
          <p>
            <span></span>
            <span></span>
          </p>
          <p class="overflow-hid"><span class="fl">全程资金存管</span><span class="fr">合同电子签章</span></p>
          <p>
            <span></span>
            <span></span>
          </p>
          <p class="overflow-hid"><span class="fl">合作支付通道</span><span class="fr">优质资产推荐方</span></p>
          <p>
            <span></span>
            <span></span>
          </p>
          <p class="overflow-hid"><span class="fl">优质资产推荐方</span><span class="fr">优质资产推荐方</span></p>
        </div>
      </div>
    </div>
    <div class="mask-common" v-show="activityStatus !== 1">
      <div class="activityEnd">
        <img src="../../images/invite/invite-end.png" alt="" width="70%">
        <span>本活动已结束欢迎下载宏财网App参与更多活动</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .inviteMsg{
    background: #060547 !important;
    position: relative;
  }
  .inviteShare span:nth-child(2){
    color: #060547;
    font-size: .28rem;
    font-weight: bold;
    display: block;
    position: absolute;
    right: .4rem;
    top: 3.06rem;
    width: 2rem;
    text-align: left;
  }
  .inviteShare span:last-child{
    display: block;
    position: absolute;
    left: 0.46rem;
    top: 4.5rem;
    text-align: justify;
    color: #060547;
    font-size: .28rem;
    font-weight: bold;
  }
  .imgs img{
    display: inline-block;
    vertical-align: top;
    width: 100%;
  }
  .inviteForm{
    background: #060547;
    margin-top: -.8rem;
    position: relative;
  }
  .inviteForm p{
    margin: 0 auto;
    width: 80%;
    height: .8rem;
    border-radius: 5px;
    margin-bottom: .2rem;
  }

  ::-webkit-input-placeholder{
    color: #999999;
  }
  .inviteForm input{
    border: none;
    width: 81%;
    height: 100%;
    padding: 0 10%;
    font-size: .24rem;
    color: #000000;
    float: left;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #b43ea8;
  }
  .verification{
    width: 25%;
    display: block;
    margin-left: 5%;
    height: .8rem;
    float: right;
    background: #FFFFFF;
    border-radius: 5px;
  }
  .inviteForm #sent{
    display: block;
    width: 24%;
    margin-left: 5%;
    padding: 0;
    text-align: center;
    background-image: linear-gradient(277deg, #75306c, #2923ab);
    color: #FFFFFF;
    font-family: PingFang-SC;
    font-weight: bold;
    border: 1px solid #ffca61;
    line-height: .76rem;
    font-size: .3rem;
    float: right;
    border-radius: 5px;
  }
  .inviteForm p:last-child{
    margin-top: .4rem;
  }
  .inviteForm p:last-child input{
    width: 100%;
    box-shadow: 3.2px 2.4px 0 0 #29599d;
    background-image: linear-gradient(130deg, #2923ab, #75306c);
    border: solid 2px #ffca61;
    font-family: STYuanti-TC;
    font-size: .34rem;
    color: #fbe756;
    text-shadow: 0px 1.5px 0 rgba(41, 19, 69, 0.88);
    letter-spacing: 1.1px;
  }
  .inviteDetail{
    margin-top: .6rem;
    padding-bottom: .2rem;
  }
  .inviteContent{
    width: 80%;
    background :url(../../images/invite/friends-bg_01.png) no-repeat,
                url(../../images/invite/friends-bg_03.png) no-repeat center bottom,
                url(../../images/invite/friends-bg_02.png) repeat-y;
    background-size: contain;
    color: #FFFFFF;
    margin: .6rem auto 0;
    padding: 0 .35rem;
  }
  .inviteContent:nth-child(2){
    /*background: url(../../images/invite/invite-content-2.png) no-repeat;
    background-size: contain;*/
    height: 3.84rem;
  }
  .inviteContent:last-child{
    background: url(../../images/invite/invite-content-3.png) no-repeat;
    background-size: contain;
    height: 6.6rem;
  }
  .inviteContent>p:first-child{
    padding-top: .4rem;
    font-weight: bold;
    font-size: .3rem;
    margin-bottom: .2rem;
  }
  .inviteContent>p:first-child span{
    height: .4rem;
    display: inline-block;
  }
  .inviteContent>p:first-child span:first-child{
    width: 20%;
    height: .3rem;
    background: url(../../images/invite/pendant-left.png) no-repeat center;
    background-size: contain;
    margin: 0 .1rem;
  }
  .inviteContent>p:first-child span:last-child{
    width: 20%;
    height: .3rem;
    background: url(../../images/invite/pendant-right.png) no-repeat center;
    background-size: contain;
    margin: 0 .1rem;
  }
  /*已受邀好友*/
  .inviteContent.friends ul{
    margin-top: .2rem;
    padding-bottom: .2rem;
    font-size: .22rem;
  }
  .inviteContent.friends{
    border-bottom: 1px solid #4464e0;
    margin-top: .9rem !important;
  }
  .inviteContent.friends li{
    margin-bottom: .16rem;
  }
  .inviteContent.friends ul li p:first-child{
    padding: 0;
    font-size: .22rem;
  }
  .inviteContent.friends ul li p:last-child{
    color: #857af8;
  }
  /*活动规则*/
  .inviteContent.rules .rulesContent{
    margin-top: .2rem;
    text-align: justify;
  }
  .inviteContent.rules{
    border-bottom: 1px solid #4464e0;
    font-size: .22rem;
  }
  .rulesContent p{
    width: 94%;
    float: right;
  }
  /*战略合作*/
  .inviteContent .cooperations p:nth-child(odd){
    height: .8rem;
  }
  .inviteContent .cooperations p:nth-child(even){
    margin-bottom: .1rem;
  }
  .inviteContent .cooperations p:nth-child(odd) span{
    height: .8rem;
    border-radius: 5px;
    background-color: #ffffff;
    width: 45%;
    display: inline-block;
    margin: 0 2%;
    background-size: cover;
  }
  .inviteContent .cooperations p:nth-child(1) span:nth-child(1){
    background: url(../../images/invite/cooperation-1.png) no-repeat center;
    background-size: 95%;
    background-color: #ffffff;
  }
  .inviteContent .cooperations p:nth-child(1) span:nth-child(2){
    background: url(../../images/invite/cooperation-2.png) no-repeat center;
    background-size: 53%;
    background-color: #ffffff;
    background-position: .58rem 0.05rem;
  }
  .inviteContent .cooperations p:nth-child(3) span:nth-child(1){
    background: url(../../images/invite/cooperation-3.png) no-repeat center;
    background-size: 67%;
    background-color: #ffffff;
  }
  .inviteContent .cooperations p:nth-child(3) span:nth-child(2){
    background: url(../../images/invite/cooperation-4.png) no-repeat center;
    background-size: 90%;
    background-color: #ffffff;
  }
  .inviteContent .cooperations p:nth-child(5) span:nth-child(1){
    background: url(../../images/invite/cooperation-5.png) no-repeat center;
    background-size: 68%;
    background-color: #ffffff;
  }
  .inviteContent .cooperations p:nth-child(5) span:nth-child(2){
    background: url(../../images/invite/cooperation-6.png) no-repeat center;
    background-size: 88%;
    background-color: #ffffff;
  }
  .inviteContent .cooperations p:nth-child(even){
    font-family: PingFang-SC;
    font-weight: 500;
    line-height: 2.4;
    letter-spacing: 1px;
    text-align: justify;
    color: #ffffff;
  }
  .inviteContent .cooperations p:nth-child(even) span{
    display: block;
    width: 50%;
    text-align: center;
  }
  .activityEnd{
    position: absolute;
    top: 3rem;
    left: 10%;
  }
  .activityEnd span{
    position: absolute;
    width: 2rem;
    text-align: justify;
    color: #060547;
    right: 1.3rem;
    top: 0.28rem;
  }
</style>
<script>
  import $ from 'zepto'
  import {Utils, sendMobCaptcha, ModalHelper} from '../../service/Utils'
  export default {
    // name: 'wanduRegister',
    data () {
      return {
        canGetCaptch: true,
        busy: false,
        user: {
          mobile: '',
          picCaptcha: '',
          captcha: '',
          mobileCaptchaType: 1,
          mobileCaptchaBusiness: 0
        },
        inviteMsg: '',
        activityType: 44,
        activityStatus: 1,
        arr: ['月薪3千买房买车的秘密原来在这里！', '跟着土豪迈向人生巅峰！', '有“财”同享才是真“壕”友！', '我发现了财富增值的奥秘！', '躺着赚钱的感觉原来是这样～']
      }
    },
    props: ['showErrMsg'],
    watch: {
      'activityStatus': function (value) {
        value === 2 ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    created () {
      this.getInvitedFriends()
      this.getActivityStatus()
      this.activityStatus === 2 ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
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
        e.clipboardData.setData('tel', e.clipboardData.getData('tel').replace(/\D/g, ''))
      },
      oninputHandler1 () {
        this.user.picCaptcha = this.user.picCaptcha.replace(/\D/g, '')
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
      encourageMixed () {
        return this.arr[Math.floor(Math.random() * this.arr.length)]
      },
      getInvitedFriends () {
        var that = this
        that.$http.get('/hongcai/rest/activitys/invite/invitePrivilegedFriends?inviteCode=' + that.$route.params.inviteCode, {
        })
        .then(function (res) {
          that.inviteMsg = res.data
          for (var i = 0; i < that.inviteMsg.length; i++) {
            that.inviteMsg[i].encourage = that.encourageMixed()
          }
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
          inviteCode: that.$route.params.inviteCode,
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
          that.$router.push({name: 'ActivitySucceed'})
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
        that.$http('/hongcai/rest/activitys/' + that.activityType).then(function (res) {
          that.activityStatus = res.data.status
        })
      }
    }
  }
</script>
