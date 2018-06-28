<template>
  <div class="lottery padding-b-3">
    <div id="lottery">
      <div class="lottery-wrap">
        <div class="draw-lottery">
          <p class="text-center ft-1p3">
            <span v-if="token">今日可抽奖次数：<span class="draw-count">{{drawCount < 0 ? 0 : drawCount}}</span>次</span>
          </p>
          <!-- 抽奖转盘 1, "当日加息"" ; 2, "现金奖励 ; 3, "加息券 ; 4, "现金券" ; 5, "特权本金" ; 6, "谢谢"-->
          <div class="lottery-box" id="js-rect-luck-draw-con">
            <div class="lottery-item js-item selecting" data-sort="1" data-prize-id="1">
              <img src="../../images/lottery/one-day-rate.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="2" data-prize-id="2">
              <img src="../../images/lottery/cash.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="3" data-prize-id="3">
              <img src="../../images/lottery/rate-coupon.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="8" data-prize-id="5">
              <img src="../../images/lottery/privilege.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-start-btn" @click="getPrize">
              <img src="../../images/lottery/draw.png" alt="">
            </div>
            <div class="lottery-item js-item selecting" data-sort="4" data-prize-id="4">
              <img src="../../images/lottery/cash-coupon.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="7" data-prize-id="6">
              <img src="../../images/lottery/thanks.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="6" data-prize-id="1">
              <img src="../../images/lottery/one-day-rate.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="5" data-prize-id="5">
              <img src="../../images/lottery/privilege.png" alt="">
              <span class="item-mask"></span>
            </div>
          </div>
        </div>
      <div class="lottery-other">
          <p class="display-inb" @click="ruleBox()">活动规则</p>
          <p class="display-inb" @click="toLotteryRecord()">我的奖励</p>
        </div>
        <!-- 幸运用户 -->
        <div class="lucky-users">
          <img src="../../images/lottery/title-lucky-users.png" alt="" width="48%">
          <div class="lucky-users-wrap">
            <ul class="lucky-users-box margin-b-0">
              <li class="text-justify" v-for="item in luckyUsers"><span>恭喜{{item.mobile}}</span>{{item.prizeName}}</li>
            </ul>
          </div>
          <p class="text-center state" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</p>
        </div>
      </div>
    </div>
    <!--中奖弹窗-->
    <div class="mask-common showDrawBox" v-show="showDrawBox">
      <div class="draw-box">
        <!-- 抽奖 获得奖励-->
        <div class="receive-draw" v-if="receiveDraw">
          <img src="../../images/lottery/receive-draw-02.png" alt="头像" class="avator" v-show="prizeList.prizeType !== 6">
          <img src="../../images/lottery/receive-draw-01.png" alt="恭喜您获得奖励!" width="75%" class="margin-auto display-bl" v-show="prizeList.prizeType !== 6">
          <img src="../../images/lottery/upper-limit-02.png" alt="头像" class="avator" v-if="prizeList.prizeType === 6">
          <!-- 获得加息券、现金券奖励 -->
          <div class="getPrize-coupons" v-bind:class="{'getRates': prizeList.prizeType === 3, 'getCoupon': prizeList.prizeType === 4}" v-show="prizeList.prizeType === 3 || prizeList.prizeType === 4">
            {{prizeList.prizeValue || 0.2}}
            <span>{{prizeList.prizeType === 3 ? '%' : '元'}}</span>
          </div>
          <!-- 获得1,当日加息; 2, 现金奖励; 5, 特权本金 -->
          <div class="getPrize-money" v-show="prizeList.prizeType === 1 || prizeList.prizeType === 2 || prizeList.prizeType === 5">
            <div class="icon" v-bind:class="{'getPrivilege': prizeList.prizeType === 5, 'getCash': prizeList.prizeType === 2, 'getOneRate': prizeList.prizeType === 1}"></div>
            <div class="prizeCont">
              <p>{{prizeList.prizeValue || 0.2}}{{prizeList.prizeType === 1 ? '%' : '元'}}</p>
              <p>{{prizeList.prizeText || '当日加息'}}</p>
            </div>
          </div>
          <!-- 获得谢谢 -->
          <img src="../../images/lottery/reward-thanks.png" alt="获得谢谢" class="reward-thanks" v-show="prizeList.prizeType === 6">
          <div class="prize-effect" v-show="prizeList.prizeType !== 6">{{prizeList.prizeCont || '前往【我的】>>【优惠券】中即可查看使用咯～'}}</div>
          <!-- 第一次抽奖 未分享 出现 ；第二次获得奖励 隐藏 -->
          <img src="../../images/lottery/close-drawBox.png" alt="关闭中奖弹窗" class="close" @click="closeDraw(showDrawBox);">
        </div>
        <!-- 抽奖次数达上限，欢迎明日再来！ -->
        <div class="upper-limit" v-if="showUpperLimit">
          <img src="../../images/lottery/upper-limit-02.png" alt="头像" class="avator">
          <img src="../../images/lottery/upper-limit-01.png" alt="抽奖次数达上限，欢迎明日再来！" class="margin-auto display-bl" width="75%">
          <img src="../../images/lottery/close-drawBox.png" alt="关闭中奖弹窗" class="close" @click="closeDraw(showDrawBox);">
        </div>
        <!-- 今日次数用完需分享 -->
        <div class="usedAndcanShare" v-if="usedAndcanShare">
          <img src="../../images/lottery/receive-draw-02.png" alt="头像" class="avator">
          <img src="../../images/lottery/usedAndcanShare-01.png" alt="今日免费抽奖机会已使用！分享好友可再获一次免费抽奖机会" width="90%">
          <img src="../../images/lottery/close-drawBox.png" alt="关闭中奖弹窗" class="close" @click="closeDraw(showDrawBox);">
        </div>
        <!-- <img src="../../images/lottery/close-drawBox.png" alt="关闭中奖弹窗" width="8%" @click="closeDraw(showDrawBox);"> -->
        <div class="share-friends" @click="LotteryShareTo();" v-if="usedAndcanShare || canShare">分享好友，再抽一次</div>
      </div>
    </div>
    <!--活动规则-->
    <div class="mask-common text-center" v-show="showRules">
      <div class="rule-box">
        <div class="rule-title">
          <img src="../../images/lottery/rule-title.png" width="50%">
          <img src="../../images/lottery/rule-title-portrait.png"  width="12%" class="hongcai-portrait">
        </div>
        <div class="rule-bg">
          <div class="rule-content">
            <p>1.每人每天拥有1次免费抽奖机会，首次分享幸运大抽奖到第三方平台，可再获得1次免费抽奖机会；</p>
            <p>2.您可在【我的奖励】中查看自己最近两周内的中奖情况；</p>
            <p>3.抽中的当日加息奖励系统将自动为您使用，次日即可获得奖励，加息仅针对您当日宏财精选及宏财尊贵项目在投总资产有效，包含当日新增出借金额，不含购买的债权转让项目及已经成功转让的资产；</p>
            <p>4.抽中的特权本金、返现、现金券及加息券奖励将直接发放至您的账户中，可在【我的】页面相应位置查看；</p>
            <p>5.所有奖励均可叠加获得；</p>
            <p>6.在法律规定范围内，平台保留本活动最终解释权；</p>
            <p>7.如有更多相关问题，可致电详询<br>
              客服电话：400-990-7626 <br>
              服务时间：工作日9:00-18:00
            </p>
          </div>
        </div>
      </div>
      <img src="../../images/lottery/close-drawBox.png" alt="关闭弹窗" width="8%" @click="ruleBox()">
    </div>
  </div>
</template>

<script>
  import {Utils, bridgeUtil, ModalHelper} from '../../service/Utils'
  import $ from 'zepto'
  import {LuckDraw} from '../../service/rect.luckdraw.js'
  export default {
    name: 'lottery',
    data () {
      return {
        drawCount: -1,
        prizeList: {},
        showRules: false,
        canShare: false,
        showDrawBox: false,
        showUpperLimit: false,
        usedAndcanShare: false,
        receiveDraw: false,
        shareCallHandCallback: null,
        luckyUsers: [],
        timer: null,
        isiOS: Utils.isIos(),
        isAndroid: Utils.isAndroid(),
        domain: process.env.domain,
        inviteCode: '',
        busy: false
      }
    },
    props: ['token'],
    watch: {
      token: function (value) {
        if (value !== '') {
          this.getDrawCount(this.token)
          this.getInviteCode()
        }
      },
      showDrawBox: function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    created: function () {
      var that = this
      that.getLuckyUsers()
      if (that.token) {
        that.getDrawCount(that.token)
        that.getInviteCode()
      }
      that.shareRegisterCallback = function (data) {
        data = Utils.isAndroid() ? JSON.parse(data) : data
        if (data.isShareSuccess === 1) {
          that.$http.post('/hongcai/rest/lotteries/share', {
            token: that.token
          })
          .then(function (res) {
            if (res.data && res.data.ret !== -1) {
              that.drawCount = !res.data.isEffective ? that.drawCount : that.drawCount + 1
              that.showDrawBox = false
            }
          })
          .catch(function (err) {
            console.log(err)
          })
        }
      }
    },
    methods: {
      getInviteCode: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/users/0/voucher?token=' + that.token
        }).then(function (response) {
          that.inviteCode = response.data.inviteCode
          bridgeUtil.webConnectNative('HCNative_NeedShare', 'HCWeb_ShareSuccess', {
            'HC_shareType': 2,
            'title': '今日运势，一试便知',
            'subTitle': '100%有礼！随机奖金、特权本金、返现加息券样样都有！好运从这里开始！',
            'url': that.domain + '/lottery?inviteCode=' + that.inviteCode,
            'imageUrl': 'https://mmbiz.qlogo.cn/mmbiz_jpg/8MZDOEkib8AlvibTmbDkqwbDiasl9BphCGgYnicBzl9VfX4Sm9cpvFiarGsV73IRYurUF9LPibzL0JLR5SGmd1TeO3ug/0?wx_fmt=jpeg'
          }, function (response) {}, that.shareRegisterCallback)
        })
      },
      draw: function (prizeId) {
        var prizeList = {}
        var that = this
        LuckDraw.RectLuckDraw('#js-rect-luck-draw-con', prizeList, {
          turnAroundCount: 2,
          maxAnimateDelay: 400,
          turnStartCallback: function () {
            that.busy = true
          },
          turnEndCallback: function (prizeId, obj) {
            that.busy = false
            that.showDrawBox = true
            $('.lottery-item').addClass('selecting')
          },
          startBtnClick: function ($btn) {
            if (LuckDraw.isLocked() || that.busy) {
              return
            }
            // prizeId ? LuckDraw.start(prizeId) : ''
          }
        })
      },
      toLotteryRecord: function () {
        if (!this.token || this.token === '') {
          bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, '')
          return
        }
        this.$router.push({name: 'LotteryRecord'})
      },
      ruleBox: function () {
        // ruleBox.showRuleBox(document.querySelector('#lottery'), this, closeBox)
        this.showRules = !this.showRules
        this.showRules ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      closeDraw: function (showDrawBox) {
        this.showDrawBox = !this.showDrawBox
      },
      toLogin: function () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {}, null)
      },
      getPrize: function () {
        var that = this
        if (!that.token || that.token === '') {
          that.toLogin()
          return
        }
        if (that.drawCount < 0 || LuckDraw.isLocked() || that.busy) {
          return
        }
        that.busy = true
        that.$http.post('/hongcai/rest/lotteries/draw', {
          token: that.token
        })
        .then((response) => {
          that.busy = true
          if (response.data && response.data.ret === -1) {
            that.showDrawBox = true
            that.receiveDraw = false
            that.busy = false
            if (response.data.code === -1300) {
              that.showUpperLimit = true
            } else if (response.data.code === -1301) {
              that.usedAndcanShare = true
            } else {
              // alert(response.data.msg)
              that.showDrawBox = false
            }
          } else {
            that.receiveDraw = true
            that.usedAndcanShare = false
            $('.lottery-item').removeClass('selecting')
            var receivePrize = response.data
            var prizeId = receivePrize.prizeType || 1
            // console.log(prizeId)
            that.canShare = response.data.canShare
            that.draw(prizeId)
            LuckDraw.start(prizeId)
            switch (prizeId) {
              case 1:
                that.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '当日加息',
                  prizeValue: '+' + receivePrize.value,
                  prizeCont: '奖励自动生效，次日即可前往【资金流水】中查看哟～'
                }
                break
              case 2:
                that.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '现金返现',
                  prizeValue: receivePrize.value,
                  prizeCont: '奖励已发放至您的可用余额中，可前往【资金流水】中查看哟～'
                }
                break
              case 3:
                that.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '加息券',
                  prizeValue: receivePrize.value,
                  prizeCont: '前往【我的】>>【优惠券】中即可使用咯～'
                }
                break
              case 4:
                that.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '现金券',
                  prizeValue: Number(receivePrize.value).toFixed(0),
                  prizeCont: '前往【我的】>>【优惠券】中即可查看使用咯～'
                }
                break
              case 5:
                that.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '特权本金',
                  prizeValue: Number(receivePrize.value).toFixed(0),
                  prizeCont: '前往【我的】>>【特权本金】即可查看，无需操作，奖励次日到账哟～'
                }
                break
              case 6:
                that.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '谢谢',
                  prizeValue: receivePrize.value,
                  prizeCont: '什么都木有赚到，换个姿势再试一次吧～'
                }
                break
            }
            that.drawCount = that.drawCount <= 0 ? that.drawCount : that.drawCount - 1
          }
        })
      },
      getDrawCount: function (token) {
        var that = this
        that.$http({
          url: '/hongcai/rest/lotteries/drawCount?token=' + token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1 || res.data === 0) {
            that.drawCount = res.data
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      LotteryShareTo: function () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_Share', 'HCWeb_ShareSuccess', {
          'HC_shareType': 2,
          'title': '今日运势，一试便知',
          'subTitle': '100%有礼！随机奖金、特权本金、返现加息券样样都有！好运从这里开始！',
          'url': that.domain + '/lottery?inviteCode=' + that.inviteCode,
          'imageUrl': 'https://mmbiz.qlogo.cn/mmbiz_jpg/8MZDOEkib8AlvibTmbDkqwbDiasl9BphCGgYnicBzl9VfX4Sm9cpvFiarGsV73IRYurUF9LPibzL0JLR5SGmd1TeO3ug/0?wx_fmt=jpeg'
        }, function () {}, that.shareRegisterCallback)
        that.showDrawBox = false
      },
      getLuckyUsers: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/lotteries/luckyUsers'
        })
        .then(function (res) {
          that.luckyUsers = res.data
          for (var i = 0; i < that.luckyUsers.length; i++) {
            var prizeType = that.luckyUsers[i].prizeType
            switch (prizeType) {
              case 1:
                that.luckyUsers[i].prizeName = '获得+' + that.luckyUsers[i].value + '%当日加息'
                break
              case 2:
                that.luckyUsers[i].prizeName = '获得返现' + that.luckyUsers[i].value + '元'
                break
              case 3:
                that.luckyUsers[i].prizeName = '获得+' + that.luckyUsers[i].value + '%加息券'
                break
              case 4:
                that.luckyUsers[i].prizeName = '获得' + Number(that.luckyUsers[i].value).toFixed(0) + '元现金券'
                break
              case 5:
                that.luckyUsers[i].prizeName = '获得特权本金' + Number(that.luckyUsers[i].value).toFixed(0) + '元'
                break
            }
          }
          that.luckyTimer(-2.5)
        })
      },
      luckyTimer: function (val) {
        var $luckyUsersList = document.querySelector('.lucky-users-box')
        this.timer = setInterval(function () {
          if (val % -12.5 === 0 && val !== 0) {
            val = 0
            $luckyUsersList.classList.remove('animate')
            $luckyUsersList.style.webkitTransform = 'translateY(0rem)'
          } else {
            $luckyUsersList.className += ' animate'
            $luckyUsersList.style.webkitTransform = 'translateY(' + val + 'rem)'
          }
          val -= 2.5
        }, 5000)
      }
    },
    destory: function () {
      window.clearInterval(this.timer)
    }
  }
</script>
<style scoped>
  .lucky-users-box.animate {
    -webkit-transition:all 1s ease-in-out;
    -moz-transition:all 1s ease-in-out;
    -o-transition:all 1s ease-in-out;
    -ms-transition:all 1s ease-in-out;    
    transition:all 1s ease-in-out;
    -webkit-transform:translateY(-2.5rem);
    transform:translateY(-2.5rem);
  }
  .lottery .lottery-wrap {
    background: url('../../images/lottery/lottery-bg.jpg') 0 0 no-repeat;
    background-size: cover;
    padding-top: .6rem;
  }
  /*转盘部分*/
  .lottery .lottery-wrap .draw-lottery {
    background: url(../../images/lottery/draw-bg1.png) -0.05rem 0 no-repeat;
    height: .8rem;
    width: 97%;
    margin: 0 auto;
    background-size: 100% 100%; 
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box {
    width: 92%;
    margin: 0 auto;
    text-align: center;
    padding-top: .88rem;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box .lottery-item {
    display: inline-block;
    width: 25%;
    position: relative;
  }
  /*每种奖励上的蒙层*/
  .lottery .lottery-wrap .draw-lottery .lottery-box .lottery-item .item-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10;
    border-radius: .1rem;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box .selecting .item-mask {
    display: none;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box .lottery-item img{
    width: 100%;
    display: block;
  }

  /*活动规则、我的奖励*/
  .lottery .lottery-wrap .lottery-other {
    width: 94%;
    margin: .24rem auto .85rem;
    text-align: center;
  }
  .lottery .lottery-wrap .lottery-other p {
    width: 40%;
    height: .8rem;
    border-radius: .1rem;
    line-height: .8rem;
    font-size: .4rem;
  }
  .lottery .lottery-wrap .lottery-other p:first-child {
    color: #046151;
    margin-right: .3rem;
    background: url(../../images/lottery/rule-btn.png) no-repeat;
    background-size: 100% 100%;
  }
  .lottery .lottery-wrap .lottery-other p:last-child {
    color: #564705;
    background: url(../../images/lottery/reward-btn.png) no-repeat;
    background-size: 100% 100%;
  }
  /*幸运用户*/
  .lottery .lottery-wrap .lucky-users {
    background-color: #fbd942;
    padding-bottom: .3rem;
  }
  .lottery .lottery-wrap .lucky-users img{
    display: block;
    margin: .24rem auto;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap {
    width: 92%;
    margin: 0 auto;
    padding: 0.12rem .2rem;
    background: #f7d25e;
    border: 0.26rem solid #edcd40;
    border-radius: .24rem;
    height: 33rem;
    overflow-y: hidden;
    position: relative;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap li{
    color: #000;
    margin-bottom: .23rem;
  }
  /*中奖弹窗*/
  .draw-box {
    text-align: center;
  }
  /* .draw-box .receive-draw {
    text-align: center;
    padding: 16% 0 .4rem;
  } */
  .draw-box .receive-draw .getPrize-coupons {
    height: 1.6rem;
    font-size: .65rem;
    color: #fff;
    padding: .18rem 16%;
    text-align: left;
    font-family: Arial;
  }
  .draw-box .getPrize-coupons span {
    font-size: .3rem;
    display: inline-block;
  }
  .receive-draw .getRates {
    background: url('../../images/lottery/reward-rate.png') no-repeat center center;
    background-size: contain;
  }
  .receive-draw .getCoupon {
    background: url('../../images/lottery/reward-coupon.png') no-repeat center center;
    background-size: contain;
  }
  .getPrize-money {
    clear: both;
    overflow: hidden;
    width: 80%;
    margin: 0.2rem auto;
    text-align: center;
  }
  .getPrize-money .icon {
    float: left;
    width: 1rem;
    height: 1rem;
  }
  .getPrivilege {
    background: url('../../images/lottery/reward-privilege.png') no-repeat center center;
    background-size: contain;
  }
  .getCash {
    background: url('../../images/lottery/reward-cash.png') no-repeat center center;
    background-size: contain;
  }
  .getOneRate {
    background: url('../../images/lottery/reward-one-rate.png') no-repeat center center;
    background-size: contain;
  }
  .reward-thanks {
    width: 90%;
    padding: .1rem .2rem;
  }
  .getPrize-money .prizeCont {
    float: right;
    width: 70%;
    color: #fa7474;
    padding-top: .05rem;
  }
  .getPrize-money .prizeCont p:nth-child(1) {
    font-weight: bold;
    line-height: 0.92;
    letter-spacing: 1.7px;
    font-size: .57rem;
  }
  .getPrize-money .prizeCont p:nth-child(2) {
    font-weight: bold;
    line-height: 1.83;
    letter-spacing: 0.9px;
    font-size: .25rem;
  }
  .draw-box .receive-draw .prize-effect {
    color: #666666;
    font-size: .24rem;
    text-align: justify;
    width: 80%;
    margin: 0 auto;
    line-height: 1.4;
  }
  .draw-box .upper-limit, .draw-box .usedAndcanShare, .draw-box .receive-draw {
    width: 70%;
    height: 2.68rem;
    border-radius: .23rem;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 40%;
    position: relative;
  } 
  .draw-box .receive-draw {
    height: auto;
    padding: .2rem 0;
  }
  .upper-limit .avator, .usedAndcanShare .avator, .receive-draw .avator {
    margin: -.9rem auto 0;
    width: 35%;
  }
  .upper-limit .avator {
    margin-bottom: .35rem;
  }
  .upper-limit .close, .usedAndcanShare .close, .receive-draw .close {
    position: absolute;
    right: -0.25rem;
    top: -0.3rem;
    width: 13%;
  }
  .share-friends {
    background: url('../../images/lottery/share-friends.png') no-repeat center center;
    background-size: contain;
    width: 80%;
    height: .75rem;
    margin: .8rem auto;
    font-size: .24rem;
    line-height: .75rem;
    letter-spacing: 0.9px;
    text-align: center;
    color: #feeeed;
  }
  /* .draw-box .usedAndcanShare {
    padding: 40% 0 .7rem;
  } */
  /*规则弹窗*/
  .rule-box {
    padding: 20% .2rem .5rem;
    -webkit-overflow-scrolling: touch;
  }
  .rule-box .rule-title {
    position: relative;
    margin-bottom: .1rem;
  }
  .rule-box .rule-title .hongcai-portrait {
    position: absolute;
    top: -.62rem;
    left: 27%;
  }
  .rule-box .rule-bg {
    height: 6rem;
    overflow: auto;
    background: url('../../images/lottery/rule-bg.png') no-repeat center center;
    background-size: contain;
  }
  .rule-box .rule-bg .rule-content {
    height: 4.86rem;
    position: relative;
    top: .5rem;
    padding: 0 1rem;
    overflow: auto;
  }
  .rule-box .rule-bg .rule-content p {
    margin-bottom: .1rem;
    color: #fff;
    font-size: .24rem;
    text-align: justify;
  }
  .state {
    font-size: .2rem;
    color: #000;
    margin: 0.7rem 0 0;
  }
  .lottery .lottery-wrap {
    padding-top: 1.5rem;
    height: 15rem;
  }
  .lottery .lottery-wrap .draw-lottery {
    height: 7.6rem;
  }
  .lottery .lottery-wrap .draw-lottery p {
    height: 1.3rem;
    line-height: 2.4rem;
    margin-bottom: 0;
    color: #222;
  }
  .lottery .lottery-wrap .draw-lottery .draw-count {
    font-size: .37rem;
    margin-right: .1rem;
    color: #f5fb60;
  }
  .lottery .lottery-wrap .draw-lottery .lottery-box {
      padding-top: .88rem;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap {
    height: 5.7rem;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap li{
    font-size: .24rem;
    margin-bottom: 0;
    height: .5rem;
    line-height: .5rem;
  }
  .lottery .lottery-wrap .lucky-users .lucky-users-wrap li span{
    display: inline-block;
    width: 46%;
  }
  .about-background, .bank-custody, .risk-safety ul li {
    width: 92%;
  }
  /* .draw-box .receive-draw {
    padding: 18% 0 .2rem;
  } */
  @media(max-height: 480px) {
    .draw-box .receive-draw {
      padding:  0 0 .4rem;
    }
    .rule-box {
      padding: 0 .2rem .5rem;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
