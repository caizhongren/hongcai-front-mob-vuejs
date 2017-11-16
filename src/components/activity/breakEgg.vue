<template>
  <div class="break-egg">
    <audio preload="preload" id="one"><source src="../../assets/one.mp3"></audio>
    <audio preload="preload" id="ten"><source src="../../assets/ten.mp3"></audio>
    <div class="egg-header">
      <img src="../../images/break-egg/hander.png" class="header" width="100%">
      <div class="activityTime" :class="{'padding-l-0': activityStatus === 2}">
        <img src="../../images/break-egg/icon-head.png" width="14%">
        <span v-if="activityStatus === 1">活动时间:{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日至{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日</span>
        <span class="actEnd" v-if="activityStatus === 2">活动已结束</span>
      </div>
    </div>
    <!-- 砸蛋框 -->
    <div class="eggsBox">
      <div class="tipBox" :class="{'noEgg': (token !== '' && activityEnd === 1 && breakNumber <=0) || (token !== '' &&  activityEnd === 2)}">
        <p v-show="token !== ''">
          <span v-show="breakNumber >0 && activityEnd === 1">剩余彩蛋<br>{{breakNumber}}枚</span>
          <span v-show="breakNumber <=0 && activityStatus === 1">窝里空空如也...快去投资砸彩蛋吧!</span>
        </p>
        <p v-show="!token">马上登录砸彩蛋</p>
        <p v-show="token !== '' &&  (activityEnd === 2 || activityStatus === 2 && breakNumber <=0)">活动结束了，下次记得早点来参与～</p>
      </div>
      <div v-show="!token || (token!== '' && activityEnd === 1 && breakNumber >0)">
        <img v-bind:src="eggImgSrc" class="egg" width="50%">
        <img src="../../images/break-egg/hammer-lf.png" class="hammer">
        <img src="../../images/break-egg/eggs.png" class="eggs">
      </div>
      <img v-show="token !== '' && (activityEnd === 2 || breakNumber <=0)" src="../../images/break-egg/icon-head3.png" class="egg margin-auto" :class="{'margin-l-pt8': breakNumber <=0 || activityEnd === 2}" width="56%">
    </div>
    <div class="eggsBorder"></div>
    <!-- 砸蛋按钮 -->
    <div class="breakBtns">
      <div v-if="token !== '' && activityEnd === 1">
        <!-- 可砸蛋按钮 -->
        <div v-if="breakNumber >0">
          <img src="../../images/break-egg/btn-yellow-1.png" class="yellowBtn fl" @click="breakEgg(1)">
          <img src="../../images/break-egg/btn-yellow-10.png" class="yellowBtn fr" v-show="breakNumber >=10" @click="breakEgg(2)">
          <img src="../../images/break-egg/btn-grey-10.png" class="greyBtn fr" v-show="breakNumber <10">
        </div>
        <!-- 没有砸蛋次数按钮 -->
        <img v-if="breakNumber <=0 && activityStatus === 1" src="../../images/break-egg/btn-invest.png" class="margin-auto" width="48%" @click="toInvest()">
      </div>
      <!-- 未登录按钮 -->
      <img v-if="!token" src="../../images/break-egg/btn-login.png" class="margin-auto" width="48%" @click="toLogin">
      <!-- 活动已结束按钮 -->
      <img v-if="token !== '' &&  (activityEnd === 2 || activityStatus === 2 && breakNumber <=0)" src="../../images/break-egg/btn-activiiyEnd.png" class="margin-auto" width="45%">
    </div>
    <!-- 活动介绍 -->
    <div class="egg-info">
      <div class="cumulativeInvestAmount">
        <img src="../../images/break-egg/icon-eggs.png" width="14%">
        <p v-if="!token">马上登录砸彩蛋</p>
        <p v-if="token !== ''">累计年化投资金额：{{cumulativeInvestAmount}}元</p>
      </div>
      <div class="">
        <p v-if="token !== ''" class="rewardDetail" @click="toRecord">查看奖励详情>></p>
        <p class="example">活动期间，新增投资宏财精选、宏财尊贵项目(不含债权转让)，累计年化投资金额每满1000元，即可获得彩蛋一枚，砸蛋有机会获得以下奖励：</p>
      </div>
      <ul class="privileged">
        <li><img src="../../../static/images/reward-10000.png" alt=""></li>
        <li><img src="../../../static/images/reward-50000.png" alt=""></li>
        <li><img src="../../../static/images/reward-80000.png" alt=""></li>
      </ul>
      <ul class="rate">
        <li><img src="../../images/break-egg/reward-2.png" alt=""></li>
        <li><img src="../../images/break-egg/reward-5.png" alt=""></li>
      </ul>
      <img src="../../images/break-egg/money.png" class="bottomMoney">
    </div>
    <!-- 活动规则 -->
    <div class="egg-rules">
      <div class="rules">
        <img src="../../images/break-egg/icon-eggs.png" width="14%">
        活动规则
      </div>
      <div class="">
        <p class="rule-num"><span>1</span>活动时间</p>
        <p class="rule-content">本次活动仅限于{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日至{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日内参与有效，活动期间，可随时砸蛋领取奖励，如活动结束后3个工作日内仍未砸蛋领奖，将视为自动放弃奖励；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>2</span>参与方式</p>
        <p class="rule-content">活动期间，用户新增年化投资金额每满1000元(本活动仅针对投资宏财精选及宏财尊贵项目，不含债权转让项目)，即可获得一枚奖励彩蛋，砸彩蛋可获得特权本金奖励或无条件加息券奖励；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>3</span>关于无条件加息优惠券</p>
        <p class="rule-content">无条件加息券可在投资宏财精选及宏财尊贵项目时使用，无起投金额限制，每笔投资仅可使用一张优惠券(优惠券包含加息券及现金券)，使用有效期至{{activityInfo.validityYear}}年{{activityInfo.validityMonth}}月{{activityInfo.validityDate}}日，过期作废，如此超稀有奖励可别忘记及时使用哟；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>4</span>关于特权本金奖励</p>
        <p class="rule-content">特权本金是平台向用户提供的一种虚拟资金，用于回馈奖励等活动。其本身不可提现或用于投资，但享受8%年化收益率。根据不同的活动规则，特权本金具有不同的计息时长，每日计息产生的收益直接发放至用户可用余额，可用于提现或投资；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>5</span>在法律规定范围内，平台保留本活动最终解释权。</p>
      </div>
    </div>
    <div v-if="isIos" class="iosTips">该活动与设备生产商Apple Inc.公司无关</div>
    <button class="invest-fixed-btn" @click="toInvest()" :disabled="busy">立即投资</button>
    <div class="icon-calculator" @click="showMask = !showMask;showCalculator = !showCalculator">
      <p>计算器</p>
    </div>
    <!-- 弹窗 -->
    <div class="mask-common egg-mask" v-show="showMask" :class="{'calcu-mask': showCalculator}">
      <break-Egg-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></break-Egg-Calculator>
      <div class="before-break" v-show="showBeforeBreak">
        <div class="one-time-break" v-show="oneTimeBreak">
          <img src="../../images/break-egg/icon-head2.png" alt="" width="11%" class="position-ab">
          <p>猜一猜<br>&nbsp;&nbsp;我会孵出什么奖励？</p>
          <img v-bind:src="eggImgSrc" alt="" width="45%" class="egg">
        </div>
        <div class="ten-times-break" v-show="tenTimeBreak">
          <img src="../../images/break-egg/icon-head2.png" alt="" width="11%" class="position-ab">
          <p>宝宝肚子鼓鼓的<br>快敲开看看都有啥？</p>
          <img v-bind:src="eggImgSrc" alt="" width="55%" class="egg">
        </div>
      </div>
      <div class="after-break" v-show="showAfterBreak">
        <div class="one-time-break" v-show="oneTimeBreak">
          <img src="../../images/break-egg/icon-head2.png" alt="" width="11%" class="position-ab">
          <p class="title">恭喜您获得</p>
          <div class="receive">
            <img v-bind:src="rewardList[0].imgSrc" id="reward-one" class="display-bl margin-auto" :class="{'margin-t-1p3': rewardList[0].type === 2}" width="35%">
            <img v-bind:src="brokenEggSrc" alt="" class="display-bl margin-auto padding-t-0p2" width="50%">
            <img src="../../images/break-egg/reward-egg3.png" alt="" class="position-ab reward-break" width="22%">
            <p class="receive-msg" :class="{'padding-t-1p3': rewardList[0].type === 2}">{{receiveMsg(oneTimeMsgs)}}</p>
          </div>
        </div>
        <div class="ten-time-break" v-show="tenTimeBreak" :class="{'padding-t-0p5': priviledgeList.length > 0 && rateList.length > 0}">
          <img src="../../images/break-egg/icon-head2.png" alt="" width="11%" class="position-ab">
          <p class="title">恭喜您获得</p>
          <div class="receive" :class="{'height-5': priviledgeList.length > 0 && rateList.length > 0}">
            <div class="priviledges" id="priviledges">
              <div v-for="reward in priviledgeList" v-if="priviledgeList.length > 0"><img v-bind:src="reward.imgSrc" width="78%"><span>x{{reward.count}}</span></div>
            </div>
            <div class="rate-coupons" id="rate-coupons">
              <div v-for="reward in rateList" v-if="rateList.length > 0"><img v-bind:src="reward.imgSrc" width="76%" :class="{'margin-t-0p4': priviledgeList.length === 0}"><span>x{{reward.count}}</span></div>
            </div>
            <img v-bind:src="brokenEggSrc" alt="" class="display-bl margin-auto" width="50%">
            <img src="../../images/break-egg/reward-egg3.png" alt="" class="position-ab reward-break" width="22%">
            <p class="receive-msg" :class="{'margin-t-1': priviledgeList.length === 0}">{{receiveMsg(tenTimesMsgs)}}</p>
          </div>
        </div>
        <img src="../../images/break-egg/icon-close.png" alt="" width="10%" class="close-mask" @click="closeMask">
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil, Utils, ModalHelper, audioPlayUtil} from '../../service/Utils'
  import breakEggCalculator from './breakEggCalculator.vue'
  import $ from 'zepto'
  export default {
    name: 'breakEgg',
    data () {
      return {
        eggImgSrc: '',
        brokenEggSrc: '',
        eggImgNumber: Math.floor(Math.random() * 5 + 1),
        breakNumber: 0, // 剩余砸蛋次数
        activityStatus: 1, // 1 正常 2 结束
        activityEnd: 1, // 1 -活动结束3天内 2 —活动结束3天后
        activityInfo: {
          startYear: 0,
          startMonth: 0,
          startDate: 0,
          endYear: 0,
          endMonth: 0,
          endDate: 0,
          validityYear: 0,
          validityMonth: 0,
          validityDate: 0
        },
        cumulativeInvestAmount: 0, // 年化总金额
        showCalculator: false,
        showAfterBreak: false, // 砸开之后
        showBeforeBreak: false, // 砸开之前
        oneTimeBreak: false, // 砸一次
        tenTimeBreak: false, // 砸十次
        busy: false,
        isIos: Utils.isIos(),
        showMask: false,
        oneTimeMsgs: ['下次能不能轻点敲人家～', '先有鸡先有蛋?你告诉宝宝…', '你挑着蛋～我牵着马～'],
        tenTimesMsgs: ['噼里啪啦，财气冲天哟～', '蛋无虚发，每个都营养“十”足哟～', '大力出奇迹～土豪再一次～'],
        rewardList: [
          {
            type: 1,
            amount: 10000,
            count: 2
          },
          {
            type: 1,
            amount: 50000,
            count: 3
          },
          {
            type: 1,
            amount: 80000,
            count: 3
          },
          {
            type: 2,
            amount: 2,
            count: 2
          },
          {
            type: 2,
            amount: 5,
            count: 3
          }
        ],
        priviledgeList: [],
        rateList: [],
        afterTimer: null,
        beforeTimer: null,
        hammerTimer: null,
        CalculatorTimer: null
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        val && val !== '' ? this.getUserBreakInfo() : null
      },
      showMask (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted () {
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (t >= window.innerHeight + 50) {
          $('.invest-fixed-btn').show().addClass('fixed')
        } else {
          $('.invest-fixed-btn').hide().removeClass('fixed')
        }
      }
    },
    created () {
      this.getActivityStatus()
      this.CalculatorAnimt()
      this.token && this.token !== '' ? this.getUserBreakInfo() : null
      this.eggImgSrc = '../../../static/images/egg' + this.eggImgNumber + '.png'
      this.brokenEggSrc = '../../../static/images/brokenEgg' + this.eggImgNumber + '.png'
      // for (let i = 0; i < this.rewardList.length; i++) {
      //   this.rewardList[i].imgSrc = '../../../static/images/reward-' + this.rewardList[i].amount + '.png'
      //   if (this.rewardList[i].type === 1) {
      //     this.priviledgeList.push(this.rewardList[i])
      //   } else {
      //     this.rateList.push(this.rewardList[i])
      //   }
      // }
    },
    methods: {
      receiveMsg (arr) {
        return arr[Math.floor(Math.random() * arr.length)]
      },
      closeCalculator () {
        this.showMask = false
        this.showCalculator = false
      },
      closeMask () {
        this.showMask = false
        this.showAfterBreak = false
        this.showBeforeBreak = false
        this.oneTimeBreak = false
        this.tenTimeBreak = false
      },
      CalculatorAnimt () {
        var that = this
        var a = -1
        that.CalculatorTimer = setInterval(function () {
          if (a === 4) {
            var CalculatorTimer = null
            $('.icon-calculator').css('transform', 'rotate(0deg)')
            document.querySelector('.icon-calculator').style.webkitTransform = 'rotate(0deg)'
            clearInterval(that.CalculatorTimer)
            CalculatorTimer = setTimeout(function () {
              that.CalculatorAnimt()
              clearTimeout(CalculatorTimer)
            }, 3000)
            return
          }
          a += 1
          if (a % 2 === 0) {
            $('.icon-calculator').css('transform', 'rotate(-30deg)')
            document.querySelector('.icon-calculator').style.webkitTransform = 'rotate(-30deg)'
          } else {
            $('.icon-calculator').css('transform', 'rotate(30deg)')
            document.querySelector('.icon-calculator').style.webkitTransform = 'rotate(30deg)'
          }
        }, 200)
      },
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
          that.activityStatus = res.data.status
          var startTime = res.data.startTime
          var endTime = res.data.endTime
          var validityTime = 1000 * 60 * 60 * 24 * 7 // 加息券使用期限 活动时间+7天
          that.activityInfo = {
            startYear: new Date(startTime).getFullYear(),
            startMonth: new Date(startTime).getMonth() + 1,
            startDate: new Date(startTime).getDate(),
            endYear: new Date(endTime).getFullYear(),
            endMonth: new Date(endTime).getMonth() + 1,
            endDate: new Date(endTime).getDate(),
            validityYear: new Date(endTime + validityTime).getFullYear(),
            validityMonth: new Date(endTime + validityTime).getMonth() + 1,
            validityDate: new Date(endTime + validityTime).getDate()
          }
        })
      },
      getUserBreakInfo () { // 用户参与活动信息查询 剩余砸蛋次数 = totalValue - usedCount
        var that = this
        that.$http({
          url: '/hongcai/rest/activity/breakEggs/0/info?token=' + that.token
        }).then(function (res) {
          if (!res.data || res.data.ret === -1) {
            return
          }
          that.breakNumber = res.data.totalValue - res.data.usedValue
          that.activityEnd = res.data.status
          that.cumulativeInvestAmount = res.data.honorAmount + res.data.selectionAmount
        }).catch(function (err) {
          console.log(err)
        })
      },
      toInvest () {
        var that = this
        if (that.busy) {
          return
        }
        that.busy = true
        setTimeout(function () {
          that.busy = false
        }, 2000)
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
      },
      toRecord () {
        this.$router.push({name: 'BreakEggRecord', query: {act: this.$route.query.act}})
      },
      toLogin () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {}, null)
      },
      breakEgg (breakType) {
        // breakType  砸蛋 1: 1次 2:10次
        if (this.busy) {
          return
        }
        this.busy = true
        if (breakType > this.breakNumber) {
          return
        }
        var that = this
        that.$http.post('/hongcai/rest/activity/breakEggs/0/break', {
          token: that.token,
          type: breakType
        }).then(function (res) {
          if (!res.data || res.data.ret === -1) {
            return
          }
          var a = 0
          that.hammerTimer = setInterval(function () {
            a += 1
            if (a % 2 === 0) {
              $('.hammer').css('transform', 'rotate(-45deg) translateX(-0.5rem)')
              document.querySelector('.hammer').style.webkitTransform = 'rotate(-45deg) translateX(-0.5rem)'
            } else {
              $('.hammer').css('transform', 'rotate(0deg) translateX(0rem)')
              document.querySelector('.hammer').style.webkitTransform = 'rotate(0deg) translateX(0rem)'
            }
          }, 200)
          that.beforeEggBreakAnimate(breakType)
          that.rewardList = res.data
          that.priviledgeList = []
          that.rateList = []
          for (let i = 0; i < that.rewardList.length; i++) {
            that.rewardList[i].imgSrc = '../../../static/images/reward-' + that.rewardList[i].amount + '.png'
            if (that.rewardList[i].type === 1) {
              that.priviledgeList.push(that.rewardList[i])
            } else {
              that.rateList.push(that.rewardList[i])
            }
          }
        }).catch(function (err) {
          console.log(err)
          setTimeout(function () {
            that.busy = false
          }, 1000)
        })
      },
      beforeEggBreakAnimate (breakType) { // 蛋壳打破之前
        var that = this
        that.beforeTimer = setTimeout(function () {
          that.showMask = true
          clearInterval(that.hammerTimer)
          that.showBeforeBreak = true
          var a = 0
          that.hammerTimer = setInterval(function () {
            a += 1
            if (a % 2 === 0) {
              $('.before-break .egg').css('transform', 'rotate(-20deg)')
              document.querySelector('.before-break .egg').style.webkitTransform = 'rotate(-20deg)'
            } else {
              $('.before-break .egg').css('transform', 'rotate(20deg)')
              document.querySelector('.before-break .egg').style.webkitTransform = 'rotate(20deg)'
            }
          }, 150)
          that.afterEggBreakAnimate(breakType)
          breakType === 1 ? that.oneTimeBreak = true : that.tenTimeBreak = true
          breakType === 1 ? that.tenTimeBreak = false : that.oneTimeBreak = false
        }, 1500)
      },
      afterEggBreakAnimate (breakType) { // 蛋壳打破
        var that = this
        that.afterTimer = setTimeout(function () {
          clearInterval(that.hammerTimer)
          that.showBeforeBreak = false
          var left = 12
          var top = 80
          var transY = 2
          var scale = 0.5
          that.hammerTimer = setInterval(function () {
            if (left <= 8) {
              clearInterval(that.hammerTimer)
              return
            }
            left -= 0.75
            breakType === 1 ? top += 6.5 : top += 5
            breakType === 1 ? transY -= 0.28 : transY -= 0.35
            breakType === 1 ? scale += 0.045 : scale += 0.08
            if (breakType === 1) {
              $('#reward-one').css('transform', 'translateY(' + transY + 'rem) scale(' + scale + ')')
              document.querySelector('#reward-one').style.webkitTransform = 'translateY(' + transY + 'rem) scale(' + scale + ')'
            } else {
              $('#priviledges').css('transform', 'translateY(' + transY + 'rem) scale(' + scale + ')')
              document.querySelector('#priviledges').style.webkitTransform = 'translateY(' + transY + 'rem) scale(' + scale + ')'
              $('#rate-coupons').css('transform', 'translateY(' + transY + 'rem) scale(' + scale + ')')
              document.querySelector('#rate-coupons').style.webkitTransform = 'translateY(' + transY + 'rem) scale(' + scale + ')'
            }
            $('.reward-break').css({'top': top + '%', 'left': left + '%'})
          }, 30)
          that.showAfterBreak = true
          that.busy = false
          breakType === 1 ? that.breakNumber -= 1 : that.breakNumber -= 10
          breakType === 1 ? audioPlayUtil.playOrPaused('one', 'true') : audioPlayUtil.playOrPaused('ten', 'true')
        }, 1500)
      }
    },
    components: {breakEggCalculator},
    destroyed () {
      clearTimeout(this.beforeTimer)
      clearTimeout(this.afterTimer)
      clearInterval(this.CalculatorTimer)
    }
  }
</script>
<style scoped>
  .height-5 {
    height: 5rem !important;
  }
  .margin-t-1 {
    margin-top: .5rem !important;
  }
  .margin-t-1p3 {
    margin-bottom: 1rem !important;
    width: 53%;
  }
  .padding-t-0p5 {
    margin-top: 0.5rem !important;
  }
  .margin-t-0p4 {
    margin-top: 1rem !important;
  }
  .padding-t-0p2 {
    padding-top: .2rem !important;
  }
  .close-mask {
    margin-top: 1.3rem;
  }
  .break-egg {
    background: #fa6654;
    padding-bottom: 1.1rem;
  }
  .mask-common.egg-mask {
    background-color: rgba(0,0,0,0.95);
  }
  .mask-common.egg-mask.calcu-mask {
    background-color: rgba(0,0,0,0.9);
  }
  .egg-header img.header {
    margin-top: -.45rem;
  }
  .activityTime {
    border-radius: .15rem;
    background-color: #f9da5b;
    border: solid 2px #740f0f;
    width: 82%;
    height: .55rem;
    line-height: .55rem;
    position: absolute;
    left: 8.5%;
    top: 26.6%;
    font-size: .23rem;
    color: #ff0014;
    text-align: center;
    padding-left: 0.3rem;
  }
  .activityTime.padding-l-0 {
    padding-left: 0 !important;
  }
  .activityTime img {
    position: absolute;
    left: -.34rem;
    top: -.3rem;
  }
  .activityTime .actEnd {
    text-align: center;
    display: inline-block;
    width: 100%;
  }
  .eggsBox {
    width: 85%;
    height: 4.1rem;
    border-radius: .16rem;
    background-color: #feee33;
    border: solid 2px #740f0f;
    margin: 0 auto;
    position: relative;
    margin-top: -.75rem;
  }
  .eggsBorder {
    width: 85%;
    height: .31rem;
    border-bottom-left-radius: .23rem;
    border-bottom-right-radius: .23rem;
    background-color: #fa331a;
    border: solid 2px #740f0f;
    border-top: none;
    margin: 0 auto;
    margin-top: -.11rem;
  }
  .breakBtns {
    width: 85%;
    margin: .3rem auto .6rem;
    overflow: hidden;
    clear: both;
  }
  .yellowBtn, .greyBtn {
    width: 45%;
  }
  .egg-info, .egg-rules {
    width: 95%;
    height: 7.5rem;
    border-radius: .2rem;
    background-color: #fffeff;
    border: solid 1px #740f0f;
    margin: 0 auto;
    position: relative;
    padding: .5rem .1rem;
    margin-bottom: .8rem;
  }
  .egg-rules {
    height: auto;
    font-size: .2rem;
    color: #751319;
    text-align: left;
    margin-bottom: .2rem;
    padding: .5rem .01rem;
  }
  .bottomMoney {
    width: 84%;
    position: absolute;
    bottom: -.1rem;
    left: 10%;
  }
  .cumulativeInvestAmount {
    border-radius: .15rem;
    background-color: #feee33;
    border: solid 2px #740f0f;
    width: 90%;
    height: .55rem;
    line-height: .55rem;
    position: absolute;
    left: 0.25rem;
    top: -.15rem;
    font-size: .24rem;
    color: #751319;
    text-align: left;
    padding: 0 .1rem;
    font-weight: bold;
    padding-left: 1.5rem;
  }
  .cumulativeInvestAmount img {
    position: absolute;
    left: -.25rem;
    top: -.36rem;
    width: 23.5%;
  }
  .rules {
    border-radius: .15rem;
    background-color: #feee33;
    border: solid 2px #740f0f;
    width: 50%;
    height: .55rem;
    line-height: .55rem;
    position: absolute;
    left: 25%;
    top: -.15rem;
    font-size: .24rem;
    color: #751319;
    text-align: center;
    padding: 0 .1rem;
    font-weight: bold;
    padding-left: .55rem;
  }
  .rules img {
    position: absolute;
    left: -.5rem;
    top: -.36rem;
    width: 43%;
  }
  .rewardDetail {
    font-size: .24rem;
    font-weight: bold;
    color: #fa331a;
  }
  .example {
    font-size: .24rem;
    line-height: 1.35;
    text-align: justify;
    color: #8b3424;
    padding: .2rem .25rem 0;
  }
  .privileged {
    overflow: hidden;
    clear: both;
    padding-top: .5rem;
  }
  .privileged li {
    background: rgba(252,110,96,.2);
    border-radius: 4rem;
    float: left;
    width: 1.8rem;
    height: 1.8rem;
  }
  .privileged li img {
    width: 80%;
  }
  .privileged li:nth-child(2) {
    margin: .45rem .22rem;
  }
  .rate li {
    width: 50%;
    float: left;
  }
  .rate li img {
    width: 80%;
  }
  .rule-num span {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    background: url('../../images/break-egg/icon-rule.png') no-repeat center center;
    background-size: contain;
    text-align: center;
    line-height: .5rem;
    padding-left: .14rem;
    margin-right: .1rem;
  }
  .rule-content {
    width: 86%;
    margin-left: 13%;
    margin-bottom: .3rem;
  }
  .iosTips {
    font-size: .2rem;
    text-align: center;
    color: rgba(254, 254, 254, 0.7);
  }
  .invest-fixed-btn {
    width: 100%;
    height: .9rem;
    border: none;
    line-height: .9rem;
    color: #751319;
    font-size: .28rem;
    font-weight: bold;
    background-color: #feee33;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: none;
  }
  .eggsBox .egg {
    margin-top: .4rem;
    position: relative;
    z-index: 2;
  }
  .hammer {
    width: 14%;
    position: absolute;
    top: .1rem;
  }
  .eggsBox .eggs {
    position: absolute;
    width: 96%;
    bottom: .1rem;
    left: 0.1rem;
  }
  .tipBox {
    width: 1.5rem;
    height: 1.1rem;
    background: url('../../images/break-egg/icon-tipBox.png') no-repeat center center;
    background-size: contain;
    padding: .2rem;
    line-height: 1.2;
    color: #8b3424;
    font-size: .24rem;
    position: absolute;
    top: 0.15rem;
    left: .15rem;
  }
  .tipBox.noEgg {
    padding: .1rem 0.1rem;
    width: 1.8rem;
    height: 1.28rem;
  }
  .eggsBox .egg.margin-l-pt8 {
    margin-left: .8rem;
  }
  .icon-calculator {
    width: 16%;
    height: 1.2rem;
    position: fixed;
    right: 0;
    top: 33%;
    background: url('../../images/break-egg/icon-calculator.png') no-repeat center center;
    background-size: contain;
  }
  .icon-calculator p {
    color: #624024;
    z-index: 9;
    padding-top: .65rem;
    transform: scale(.85);
  }
  .after-break .one-time-break .reward-break, .after-break .ten-time-break .reward-break {
    top: 60%;
    left: 12%;
  }
  /* 弹窗 */
  .before-break, .after-break {
    margin-top: 1rem;
    font-size: .5rem;
    letter-spacing: 1.5px;
    color: #ffffff;
    text-align: center;
    position: relative;
  }
  .after-break {
    margin-top: 0;
  }
  .one-time-break {
    margin-top: .8rem;
  }
  .ten-time-break {
    /* margin-top: .5rem; */
    margin-top: 1rem;
  }
  .before-break img, .ten-times-break img, .after-break .one-time-break img.position-ab, .after-break .ten-time-break img.position-ab {
    left: 25%;
    top: -.1rem;
  }
  .after-break .one-time-break p.title, .after-break .ten-time-break p.title {
    margin-left: 1rem;
  }
  .ten-times-break img {
    left: 10%;
  }
  .before-break p {
    padding-left: .2rem;
  }
  .before-break .ten-times-break img.egg, .before-break .one-time-break img.egg {
    margin: .8rem 0 0 3%;
  }
  .one-time-break .receive, .ten-time-break .receive {
    width: 100%;
    margin: 0.5rem 0 1rem;
    height: 4rem;
    background: url('../../images/break-egg/reward-guang.png') no-repeat center center;
    background-size: 150% 115%;
    position: relative;
  }
  .one-time-break .receive #reward-one {
    transform: translateY(2rem) scale(.5)
  }
  .receive .receive-msg {
    font-size: .26rem;
    letter-spacing: 0.8px;
    margin-top: .3rem;
  }
  .receive .priviledges, .receive .rate-coupons {
    transform: translateY(2rem) scale(.5)
  }
  .receive .priviledges span, .receive .rate-coupons span {
    position: relative;
    top: -.8rem;
  }
  .receive .rate-coupons span {
    top: -.47rem;
  }
  .priviledges div {
    width: 32%;
    display:inline-block;
    text-align: left;
  }
  .priviledges div span{
    display:inline-block;
    width:6%;
  }
  .rate-coupons div {
    width: 48%;
    display:inline-block;
    text-align: left;
  }
  .rate-coupons div span {
    display:inline-block;
    width:24%;
  }
</style>
