<template>
    <div id="invite">
        <div class="page1">
            <div class="imgs">
                <img src="../../images/invite/invite01-1.png">
                <img src="../../images/invite/invite01-2.png">
                <img src="../../images/invite/invite01-3.png">
                <img src="../../images/invite/invite01-4.png">
                <img src="../../images/invite/invite01-5.png">
                <img src="../../images/invite/invite01-6.png">
                <img src="../../images/invite/invite02-1.png">
                <img src="../../images/invite/invite02-2.png">
                <img src="../../images/invite/invite02-3.png">
                <img src="../../images/invite/invite02-4.png">
                <img src="../../images/invite/invite02-5.png">
                <img src="../../images/invite/invite02-6.png">
                <img src="../../images/invite/invite02-7.png">
                <img src="../../images/invite/invite02-8.png">
                <img src="../../images/invite/invite03.png">
                <img src="../../images/invite/invite04.png">
                <img src="../../images/invite/invite05.png">
                <img src="../../images/invite/invite06.png">
            </div>
            <div class="invite-btns" v-show="!isLogged || (isLogged && !isInvitedFriends)">
                <!-- 马上邀请按钮 -->
                <img src="../../images/invite/toInvite-btn.png" width="94.4%" @click="toLogin">
                 <!--ios下显示 -->
                <div class="iosTip" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</div>
            </div>
            <!-- 邀请好友>0 && 活动进行中 ：从页面底部弹出分享框 -->
            <div class="invite-btn" v-show="isLogged && isInvitedFriends && !isActivityEnd">
                <!-- 查看奖励按钮 -->
                <router-link :to="{name: 'ActivityReward',params: {token: token}}">
                    <img src="../../images/invite/rewards-btn.png" width="40%" class="rewards-btn">
                <!-- 继续邀请按钮 -->
                </router-link>
                <img src="../../images/invite/toInvite-yellow-btn.png" width="40%" class="toInvite-btn" @click="toShare">
                <!-- ios下显示 -->
                <div class="iosTip" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</div>
            </div>
            <!-- 邀请好友>0 && 活动停止 -->
            <div class="invite-btn" v-show="isLogged && isActivityEnd">
                <!-- 查看奖励按钮 -->
                <router-link :to="{name: 'ActivityReward',params: {token: token}}">
                    <img src="../../images/invite/rewards-btn.png" width="40%" class="rewards-btn">
                </router-link>
                <!-- 点击出现活动结束页面 -->
                <img src="../../images/invite/toInvite-grey-btn.png" width="40%" class="toInvite-btn">
                <!-- ios下显示 -->
                <div class="iosTip" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</div>
            </div>
            <!-- 活动规则 -->
            <div class="invite-rule" @click="showRuleBox"></div>
        </div>
        <!-- 活动规则 -->
        <div class="invite-Rulebox" v-if="showRules">
            <div class="ruleBox width-100 height-100 position-re bg-grey0p5" >
                <div class="box">
                    <div class="rec-act-rule bg-white border-ra-0p5">
                    <div class="rule1">
                        <p class="rule-title">1.如何获得邀请资格？</p>
                        <p class="rule-content">本活动结束之前注册的宏财网用户均可获得邀请好友的资格。</p>
                    </div>
                </div>
                <div class="rec-act-rule bg-white border-ra-0p5">
                    <div class="rule2">
                        <p class="rule-title">2.老用户成功邀请好友投资后，能获得什么福利？</p>
                        <p class="rule-content"><i class="fa fa-circle" aria-hidden="true"></i><span>活动有效期间，老用户A每邀请一位新用户B注册成为宏财网用户，且B自注册之日起30天内完成首次投资（含宏财精选、宏财尊贵两种类别），A即可获得B该笔及未来60天内每笔投资额度50%的特权本金，特权本金按8%年均回报率计息，收益进入A的账户余额。</span><br/>
                        <i class="fa fa-circle" aria-hidden="true"></i><span>老用户通过邀请单个新用户获得的平台奖励特权本金上限为10万元。</span><br/>
                        <i class="fa fa-circle" aria-hidden="true"></i><span>老用户获得的特权本金随着其所邀请新用户的在投本金的增减而相应增减。</span><br/>
                        <i class="fa fa-circle" aria-hidden="true"></i><span>老用户邀请新用户的数量无上限。</span><br>
                            <i class="fa fa-circle" aria-hidden="true"></i><span>特权本金计息时长截至B首投之后的第60天，第61天起所有特权本金失效，不再计息。</span>
                        </p>
                    </div>
                </div>
                <div class="rec-act-rule bg-white border-ra-0p5">
                    <div class="rule2">
                        <p class="rule-title">3.新用户通过老用户邀请注册后，可以得到什么奖励？</p>
                        <p class="rule-content"><i class="fa fa-circle" aria-hidden="true"></i><span>新用户通过邀请注册后，立享“合伙人特权大礼包”：</span></p>
                        <p class="list-page">
                            &nbsp;1）10%特权加息券1张 <br/>
                            &nbsp;2）精选加息券：0.3%、0.5%、0.8%，各1张 <br/>
                            &nbsp;3）尊贵加息券：0.8%、1.2%、1.6%，各1张 <br/>
                            &nbsp;4）精选现金券：总计167元现金投资券 <br/>
                            &nbsp;5）尊贵现金券：总计826元现金投资券
                        </p>
                        <p class="rule-content"><i class="fa fa-circle" aria-hidden="true"></i><span>新用户须在注册之日起30天内进行首次投资宏财精选或宏财尊贵产品，老用户才可获得相应特权本金。</span></p>
                    </div>
                </div>
                <div class="rec-act-rule bg-white border-ra-0p5">
                    <div class="rule1">
                        <p class="rule-title">4.什么是特权本金？</p>
                        <p class="rule-content">特权本金是平台奖励给用户的虚拟本金，不可提现或用于投资；其产生的收益按8%年均回报率每日计息、次日显示昨日收益；特权本金产生的收益进入用户账户余额，可用于投资或提现。</p>
                    </div>
                </div>
                <div class="rec-act-rule bg-white border-ra-0p5">
                    <div class="rule1">
                        <p class="rule-title">5.新用户可否重复领奖？</p>
                        <p class="rule-content">同一手机号、身份证号的新用户，只享受一次合伙人礼包，不可重复获得。</p>
                    </div>
                </div>
                <div class="tips">
                    <p>本活动解释权归宏财网所有</p>
                    <p>活动咨询请致电客服400-990-7626（工作日：9:00-18:00）</p>
                </div>
                </div>
                <div class="close-rule" @click="showRuleBox"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {Utils, InviteShareUtils, ruleBox, bridgeUtil} from '../../service/Utils'
export default {
  name: 'Invite',
  data () {
    return {
      showRules: false,
      isLogged: Boolean,
      isInvitedFriends: true,
      isActivityEnd: false,
      isiOS: true,
      token: '',
      voucher: String
    }
  },
  created: function () {
    this.token = this.$route.query.token
    this.token ? this.getInvitedFriends() : ''
    this.isiOS = Utils.isIos()
    this.token ? this.isLogged = true : this.isLogged = false
  },
  methods: {
    showRuleBox: function () {
      var $invite = document.querySelector('#invite')
      ruleBox.showRuleBox($invite, this, this.showRules)
    },
    getInvitedFriends: function () {
      this.$http({
        method: 'get',
        url: '/hongcai/rest/users/0/isInvitedFriends?token=' + this.token
      }).then((response) => {
        if (response.data && response.data.ret !== -1) {
          this.isInvitedFriends = response.data.flag
        } else if (response.data.code && response.data.code === -1041) {
          this.isActivityEnd = true
        } else {
          this.isInvitedFriends = true
          this.isActivityEnd = false
        }
      })
    },
    setupWebViewJavascriptBridge: function (callback) {
      if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady'
          , function () {
            callback(window.WebViewJavascriptBridge)
          },
          false
        )
      }
      if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'https://__bridge_loaded__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
    toLogin: function () {
      var regesterHandCallback = function (data) {
        window.location.replace(window.location.pathname + '?token=' + data.token)
        this.getInvitedFriends()
      }
      bridgeUtil.webConnectNative('HCNative_Login', 'HCWeb_LoginSuccess', {}, function (response) {}, regesterHandCallback)
    },
    toShare: function () {
      var that = this
      that.$http({
        method: 'get',
        url: '/hongcai/rest/users/0/voucher?token=' + that.token
      }).then((response) => {
        if (response.data && response.data.ret !== -1) {
          that.voucher = response.data.inviteCode
        }
      })
      var shareItem = InviteShareUtils.share(that.voucher)
     //   var linkUrl = location.href.split('#')[0]
      console.log(shareItem)
     //   console.log(linkUrl)
      var nativeNeedDatas = {
        'title': shareItem.title,
        'subTitle': shareItem.subTitle,
        'linkUrl': shareItem.linkUrl,
        'imageUrl': shareItem.imageUrl
      }
      bridgeUtil.webConnectNative('HCNative_Share', null, nativeNeedDatas, function (response) {
         alert('分享成功')
      }, null)
    }
  }
}
</script>

<style scoped>
    .imgs {
        margin-bottom: 1rem;
    }
    .imgs img {
        width: 100%;
        vertical-align: top;
        display: inline-block;
    }
    .invite-btn, .invite-btns {
        position: fixed;
        z-index: 9999;
        bottom: 0rem;
        background-color: #f8902d;
        padding: .08rem 0;
    }
    .invite-btns img {
        position: relative;
        top: .06rem;
    }
    .rewards-btn {
        position: relative;
        top: .06rem;
        left: -6%;
    }
    .toInvite-btn {
        position: relative;
        top: .06rem;
        right: -6%;
    }
    .iosTip {
        font-size: .1rem;
        text-align: center;
        color: #fff;
        -webkit-transform: scale(.8);
        transform: scale(.8);
    }
    .invite-rule {
        background: url('../../images/invite/invite-rule.png') no-repeat center center;
        background-size: contain;
        width: 1rem;
        height: 1rem;
        position: fixed;
        top: 3.5rem;
        right: 0rem;
    }
    .invite-Rulebox {
        position: fixed;
        top: 0;
        z-index: 99999;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0 .3rem;
        background: rgba(0,0,0,.5);
    }
    .ruleBox {
        background: url('../../images/invite/invite-rule-bg.png') no-repeat center center;
        background-size: contain;
        height: 10rem;
        overflow: auto;
    }
    .box {
        position: relative;
        overflow: auto;
        top: 2rem;
        height: 6.1rem;
    }
    .rec-act-rule {
        border-radius: 0.1rem;
        padding: .1rem;
        background-color: #fdf6d9;
        margin: 0 0.3rem;
        margin-bottom: .2rem;
    }
    .rec-act-rule .rule1, .rec-act-rule .rule2 {
        background-image: linear-gradient(to bottom, #e6c590 0%, #c79653 100%);
        border-radius: .1rem;
        padding: .1rem 0;
        text-align: left;
        overflow: hidden;
    }
    .rule-title {
        font-size: 0.22rem;
        color: #f83b15;
        padding: .1rem 0 0rem .1rem;
    }
    .rule-content {
        font-size: .2rem;
        color: #7c4618;
        line-height: .35rem;
        text-align: justify;
        padding: 0 .3rem;
        margin-top: .1rem;
        overflow: hidden;
    }
    .rule-content i {
        display: block;
        width: .12rem;
        height: .13rem;
        background: #f83b15;
        border-radius: 50%;
        margin-right: .04rem;
        float: left;
        margin-top: .08rem;
    }
    .rule-content span {
        float: left;
        width: 96%;
    }
    .list-page {
        font-size: .2rem;
        color: #7c4618;
        line-height: .35rem;
        text-align: justify;
        padding: 0 .3rem;
        margin-top: .1rem;
        padding-left: 0.4rem;
        overflow: hidden;
    }
    .tips {
        /*position: fixed;*/
        bottom: 2.62rem;
        left: 0.53rem;
    }
    .tips p {
        margin-bottom: 0;
        text-align: center;
        font-size: 0.2rem;
        color: #e4a150;
    }
    .close-rule {
        width: 10%;
        height: 5.6%;
        position: absolute;
        bottom: 11.3%;
        left: 45%;
    }
    @media (min-width: 320px) {
        .tips {
            -webkit-transform: scale(.88);
            transform: scale(.88);
            left: 0.15rem;
        }
    }
    @media (min-width: 360px) {
        .tips {
            -webkit-transform: scale(1);
            transform: scale(1);
            left: 0.54rem;
        }
    }
    @media (min-width: 375px) {
        .tips {
            left: 0.65rem;
        }
    }
    @media (min-width: 414px) {
        .tips {
            left: 0.7rem;
        }
    }
</style>
