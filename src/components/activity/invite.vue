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
                <img src="../../images/invite/invite03.png">
                <img src="../../images/invite/invite04.png">
                <img src="../../images/invite/invite05.png">
                <img src="../../images/invite/invite06.png">
            </div>
            <div class="invite-btns" v-show="!isLogged || (isLogged && !isInvitedFriends)">
                <!-- 马上邀请按钮 -->
                <img src="../../images/invite/toInvite-btn.png" width="94.4%" @click="toShare">
                 <!--ios下显示 -->
                <div class="iosTip" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</div>
            </div>
            <!-- 邀请好友>0 && 活动进行中 ：从页面底部弹出分享框 -->
            <div class="invite-btn" v-show="isLogged && isInvitedFriends && !isActivityEnd">
                <!-- 查看奖励按钮 -->
                <router-link :to="{name: 'ActivityReward'}">
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
                <router-link :to="{name: 'ActivityReward'}">
                    <img src="../../images/invite/rewards-btn.png" width="40%" class="rewards-btn">
                </router-link>
                <!-- 点击出现活动结束页面 -->
                <img src="../../images/invite/toInvite-grey-btn.png" width="40%" class="toInvite-btn" @click="toShare">
                <!-- ios下显示 -->
                <div class="iosTip" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</div>
            </div>
            <!-- 活动规则 -->
            <div class="invite-rule" @click="showRuleBox"></div>
        </div>
        <!-- 活动规则 -->
        <div class="invite-Rulebox mask-common" v-show="showRules">
            <div class="ruleBox width-100 height-100 position-re bg-grey0p5" >
                <div class="ruleTitle">
                    <img src="../../images/invite/activity-rule.png" alt="" width="50%">
                </div>
                <div class="box">
                    <div class="slide position-re slide-banner" id="slideBanner">
                      <ul class="">
                        <li>
                          <p>
                            <span>【老用户邀请奖励】</span>
                            1.活动期间，邀请注册好友人数每满3人，老用户即可获得：<br>
                            精选项目1.2%无条件加息券 x 1张<br>
                            尊贵项目2.4%无条件加息券 x 1张<br>
                            (优惠券奖励可叠加获得，有效期自发放日起30天内)<br>
                            2.如邀请的新用户于注册日起30天内进行投资，老用户可获得其首投日起未来90天内，该好友每笔投资折合年化投资金额x2%的佣金返现，可从单个好友处获得佣金上限为1000元，可邀请好友人数无上限。
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>【老用户邀请奖励】</span>
                            1.活动期间，邀请注册好友人数每满3人，老用户即可获得：<br>
                            精选项目1.2%无条件加息券 x 1张<br>
                            尊贵项目2.4%无条件加息券 x 1张<br>
                            (优惠券奖励可叠加获得，有效期自发放日起30天内)<br>
                            2.如邀请的新用户于注册日起30天内进行投资，老用户可获得其首投日起未来90天内，该好友每笔投资折合年化投资金额x2%的佣金返现，可从单个好友处获得佣金上限为1000元，可邀请好友人数无上限。
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>【老用户邀请奖励】</span>
                            1.活动期间，邀请注册好友人数每满3人，老用户即可获得：<br>
                            精选项目1.2%无条件加息券 x 1张<br>
                            尊贵项目2.4%无条件加息券 x 1张<br>
                            (优惠券奖励可叠加获得，有效期自发放日起30天内)<br>
                            2.如邀请的新用户于注册日起30天内进行投资，老用户可获得其首投日起未来90天内，该好友每笔投资折合年化投资金额x2%的佣金返现，可从单个好友处获得佣金上限为1000元，可邀请好友人数无上限。
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>【老用户邀请奖励】</span>
                            1.活动期间，邀请注册好友人数每满3人，老用户即可获得：<br>
                            精选项目1.2%无条件加息券 x 1张<br>
                            尊贵项目2.4%无条件加息券 x 1张<br>
                            (优惠券奖励可叠加获得，有效期自发放日起30天内)<br>
                            2.如邀请的新用户于注册日起30天内进行投资，老用户可获得其首投日起未来90天内，该好友每笔投资折合年化投资金额x2%的佣金返现，可从单个好友处获得佣金上限为1000元，可邀请好友人数无上限。
                          </p>
                        </li>
                        <li>
                          <p>
                            <span>【老用户邀请奖励】</span>
                            1.活动期间，邀请注册好友人数每满3人，老用户即可获得：<br>
                            精选项目1.2%无条件加息券 x 1张<br>
                            尊贵项目2.4%无条件加息券 x 1张<br>
                            (优惠券奖励可叠加获得，有效期自发放日起30天内)<br>
                            2.如邀请的新用户于注册日起30天内进行投资，老用户可获得其首投日起未来90天内，该好友每笔投资折合年化投资金额x2%的佣金返现，可从单个好友处获得佣金上限为1000元，可邀请好友人数无上限。
                          </p>
                        </li>
                      </ul>
                    </div>
                </div>
            </div>
            <div class="dot">
                <span @click="toggle(item - 1)" v-for="item in number">{{item}}</span>
            </div>
            <div class="close-rule" @click="showRuleBox"></div>
        </div>
    </div>
</template>

<script>
import $ from 'zepto'
import {Utils, InviteShareUtils, bridgeUtil, ModalHelper} from '../../service/Utils'
import {swiper} from '../../service/swipeSlide'
export default {
  name: 'Invite',
  data () {
    return {
      showRules: true,
      autoSwipe: true,
      isLogged: false,
      isInvitedFriends: true,
      isActivityEnd: false,
      isiOS: true,
      voucher: '',
      shareItem: {},
      nativeNeedDatas: {},
      slideTab: {},
      number: [1, 2, 3, 4, 5]
    }
  },
  created: function () {
    this.token ? this.getInvitedFriends() : ''
    this.token ? this.getInviteCode() : ''
    this.isiOS = Utils.isIos()
    this.token ? this.isLogged = true : this.isLogged = false
    bridgeUtil.webConnectNative('HCNative_NeedInviteList', null, {
      // 1 需要显示 0 不需要显示
      isShow: 0
    }, function (res) {}, null)
  },
  props: ['token'],
  watch: {
    token: function (value) {
      if (value && value !== '') {
        this.getInvitedFriends()
        this.getInviteCode()
      }
      this.token ? this.isLogged = true : this.isLogged = false
    }
  },
  mounted () {
    this.showRules = false
    swiper.init({
      autoSwipe: false,
      axisX: true,
      continuousScroll: true,
      speed: 1000,
      transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
      firstCallback: function (i, sum) {
        $('.dot').children().first().addClass('cur')
      },
      callback: function (i, sum) {
        $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
      }
    })
  },
  methods: {
    toggle (index) {
      swiper.goTo(index)
    },
    showRuleBox: function () {
    //   var $invite = document.querySelector('#invite')
    //   ruleBox.showRuleBox($invite, this, this.showRules)
      this.showRules = !this.showRules
      this.showRules ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
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
        } else if (response.data.code && response.data.code === -1000) {
          this.isInvitedFriends = false
          this.isActivityEnd = false
        } else {
          this.isInvitedFriends = true
          this.isActivityEnd = false
        }
      })
    },
    toLogin: function () {
    //   var regesterHandCallback = function (data) {
    //     data = Utils.isIos() === true ? data : JSON.parse(data)
    //     window.location.replace(window.location.pathname)
    //     this.getInvitedFriends()
    //   }
      bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, null)
    },
    getInviteCode: function () {
      var that = this
      that.$http({
        method: 'get',
        url: '/hongcai/rest/users/0/voucher?token=' + that.token
      }).then(function (response) {
        that.voucher = response.data.inviteCode
        that.shareItem = InviteShareUtils.share(that.voucher)
        that.nativeNeedDatas = {
          'HC_shareType': 1,
          'title': that.shareItem.title,
          'subTitle': that.shareItem.subTitle,
          'url': that.shareItem.linkUrl,
          'imageUrl': that.shareItem.imageUrl
        }
      })
    },
    toShare: function () {
      // var that = this
      if (!this.token || this.token === '') {
        this.toLogin()
        return
      }
      if (this.isActivityEnd) {
        alert('活动结束')
        return
      }
      bridgeUtil.webConnectNative('HCNative_InviteShare', null, this.nativeNeedDatas, function (response) {
      }, null)
    }
  }
}
</script>

<style scoped>
    #invite {
        background-image: linear-gradient(to bottom, #f8902d 0%, #f8902d 100%);
    }
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
        padding: 0 .3rem;
        background: rgba(0,0,0,.5);
    }
    .ruleBox {
        background: url('../../images/invite/invite-rule-bg.png') no-repeat center bottom;
        background-size: 100%;
        height: 8.6rem;
        overflow: hidden;
        position: relative;
        z-index: 10;
    }
    .box {
        position: relative;
        overflow: hidden;
        top: 2.4rem;
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
    .list-page span {
        float: left;
        width: 9%;
        height: .5rem;
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
        width: .8rem;
        height: .8rem;
        position: absolute;
        bottom: 9%;
        left: 44%;
        background: url(../../images/invite/close-rule.png) no-repeat;
        background-size: cover;
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
    @media(max-height: 480px) {
      .ruleBox {
        height: 8rem;
      }
      .box {
        top: 1rem;
      }
      .close-rule {
        bottom: 2%;
      }
    }
    /*活动规则*/
::-webkit-scrollbar {display:none}
  .about {
    background-color: #f9f4f3;
  }
  p {
    color: #666666;
    font-size: .26rem;
    padding: .5rem 0 .6rem;
  }
  .wrapper {
    margin: 0.35rem auto;
    height: 5.9rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow-x: hidden;
    -webkit-transform: rotate(0deg);
  }
  .wrapper div {
    overflow-y: hidden;
    overflow-x: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .wrapper img {
    border-radius: 12.5px;
  }
  .bd{
    z-index:0;
  }
  .bd li a img {
    vertical-align:top;
    width:100%;
  }
  .slide-banner {
    margin: .35rem auto 0;
    height: 4rem;
    border-radius: 12.5px;
    width: 90%;
    overflow: hidden;
    -webkit-transform:rotate(0deg)
  }
  .slide{
    height: 100%;
    position: relative;
    margin: 0 auto;
    margin-top: -.4rem;
    text-align: left;
  }
  .slide:after{
    content: '';
    display: block;
    width: 100%;
    padding-top: 50%;
  }
  .slide ul{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide li{
    overflow: hidden;
    list-style: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  /* 解决js阻塞页面显示首屏 */
  .slide li:first-child{
    z-index: 1;
  }
  .slide li p{
    padding-left: .4rem;
    padding-right: .4rem;
    color: #fefefe;
    font-size: .24rem;
    line-height: 1.8;
  }
  .slide li p span{
    font-size: .26rem;
    display: block;
  }
  .dot{
    right: 0;
    bottom: 2.1rem;
    z-index: 0;
    width: 100%;
    font-size: 0;
    position: absolute;
    padding: 0 .3rem;
  }
  .dot span{
    display: inline-block;
    width: 19.5%;
    height: 1rem;
    background-color: #160d6d;
    border-left: 1px solid #4362d7;
    border-bottom: 1px solid #4362d7;
    color: #6787ff;
    font-size: .4rem;
    line-height: 1.2rem;
    font-family: CTCuYuanSF;
    text-align: center;
    font-weight: 500;
  }
  .dot span:last-child{
    border-right: 1px solid #4362d7;
  }
  .dot .cur{
    background-color: #4464e0;
    color: #ffffff;
  }
  .ruleTitle img{
    position: fixed;
    top: 0.8rem;
    left: 2.04rem;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .dot{
        bottom: 4.5rem;
    }
    .close-rule{
        bottom: 3.4rem;
    }
  }
</style>
