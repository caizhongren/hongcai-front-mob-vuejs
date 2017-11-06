<template>
  <div class="break-egg">
    <div class="egg-header">
      <img src="../../images/break-egg/hander.png" class="header" width="100%">
      <div class="activityTime">
        <img src="../../images/break-egg/icon-head.png" width="14%">
        活动时间:2017年xx月xx日至2017年xx月xx日
      </div>
    </div>
    <!-- 砸蛋框 -->
    <div class="eggsBox">
      <div class="tipBox">
        <p v-show="token !== '' && activityStatus === 1">
          <span v-show="breakNumber >0">剩余彩蛋{{breakNumber}}枚</span>
          <span v-show="breakNumber <=0">窝里空空如也...</span>
        </p>
        <p v-show="!token">马上登录砸彩蛋</p>
        <p v-show="token !== '' &&  activityStatus === 2">活动结束了</p>
      </div>
      <div v-show="!token || (token!== '' && activityStatus === 1 && breakNumber >0)">
        <img v-bind:src="eggImgSrc" class="egg" width="50%">
        <img src="../../images/break-egg/hammer.png" class="hammer">
        <img src="../../images/break-egg/eggs.png" class="eggs">
      </div>
      <img v-show="token !== '' && (activityStatus === 2 || breakNumber <=0)" src="../../images/break-egg/icon-head3.png" class="egg margin-auto" width="56%">
    </div>
    <div class="eggsBorder"></div>
    <!-- 砸蛋按钮 -->
    <div class="breakBtns">
      <div v-if="token !== '' && activityStatus === 1">
        <!-- 可砸蛋按钮 -->
        <div v-if="breakNumber >0">
          <img src="../../images/break-egg/btn-yellow-1.png" class="yellowBtn fl" @click="breakEgg(1)">
          <img src="../../images/break-egg/btn-yellow-10.png" class="yellowBtn fr" v-show="breakNumber >=10" @click="breakEgg(2)">
          <img src="../../images/break-egg/btn-grey-10.png" class="greyBtn fr" v-show="breakNumber <10">
        </div>
        <!-- 没有砸蛋次数按钮 -->
        <img v-if="breakNumber <=0" src="../../images/break-egg/btn-invest.png" class="margin-auto" width="48%" @click="toInvest()">
      </div>
      <!-- 未登录按钮 -->
      <img v-if="!token" src="../../images/break-egg/btn-login.png" class="margin-auto" width="48%" @click="toLogin">
      <!-- 活动已结束按钮 -->
      <img v-if="token !== '' &&  activityStatus === 2" src="../../images/break-egg/btn-activiiyEnd.png" class="margin-auto" width="45%">
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
        <li><img src="../../images/break-egg/privileged-1w.png" alt=""></li>
        <li><img src="../../images/break-egg/privileged-5w.png" alt=""></li>
        <li><img src="../../images/break-egg/privileged-10w.png" alt=""></li>
      </ul>
      <ul class="rate">
        <li><img src="../../images/break-egg/rate-2.png" alt=""></li>
        <li><img src="../../images/break-egg/rate-5.png" alt=""></li>
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
        <p class="rule-content">本次活动仅限于2017年xx月xx日至2017年xx月xx日内参与有效，活动期间，可随时砸蛋领取奖励，如活动结束后3个工作日内仍未砸蛋领奖，将视为自动放弃奖励；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>2</span>参与方式</p>
        <p class="rule-content">活动期间，用户新增年化投资金额每满1000元(本活动仅针对投资宏财精选及宏财尊贵项目，不含债权转让项目)，即可获得一枚奖励彩蛋，砸彩蛋可获得特权本金奖励或无条件加息券奖励；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>3</span>关于无条件加息优惠券</p>
        <p class="rule-content">无条件加息券可在投资宏财精选及宏财尊贵项目时使用，无起投金额限制，每笔投资仅可使用一张优惠券(优惠券包含加息券及现金券)，使用有效期至2017年xx月xx日，过期作废，如此超稀有奖励可别忘记及时使用哟;</p>
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
    <img src="../../images/break-egg/icon-calculator.png" class="icon-calculator" @click="showMask = !showMask;showCalculator = !showCalculator">
    <!-- 弹窗 -->
    <div class="mask-common" v-show="showMask">
      <break-Egg-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></break-Egg-Calculator>
      <div class="before-break" v-show="showBeforeBreak">
        <div class="one-time-break" v-show="oneTimeBreak">
          <img src="../../images/break-egg/icon-head2.png" alt="" width="11%" class="position-ab">
          <p>猜一猜<br>&nbsp;&nbsp;我会孵出什么奖励？</p>
          <img v-bind:src="eggImgSrc" alt="" width="40%" class="egg">
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
            <img src="../../images/break-egg/privileged-1w.png" alt="" class="display-bl margin-auto" width="25%">
            <img v-bind:src="brokenEggSrc" alt="" class="display-bl margin-auto" width="49%">
            <img src="../../images/break-egg/reward-egg3.png" alt="" class="position-ab reward-break" width="24%">
            <p class="receive-msg">{{receiveMsg(oneTimeMsgs)}}</p>
          </div>
        </div>
        <div class="ten-time-break" v-show="tenTimeBreak">
          <img src="../../images/break-egg/icon-head2.png" alt="" width="11%" class="position-ab">
          <p class="title">恭喜您获得</p>
          <div class="receive">
            <div class="priviledges">
              <div v-for="reward in rewardList" v-show="reward.type === 1"><img src="../../images/break-egg/privileged-1w.png" width="66%"><span>x{{reward.num}}</span></div>
            </div>
            <div class="rate-coupons">
              <div v-for="reward in rewardList" v-show="reward.type === 2"><img src="../../images/break-egg/reward-rate-2.png" width="70%"><span>x{{reward.num}}</span></div>
            </div>
            <img v-bind:src="brokenEggSrc" alt="" class="display-bl margin-auto" width="55%">
            <img src="../../images/break-egg/reward-egg3.png" alt="" class="position-ab reward-break" width="24%">
            <p class="receive-msg">{{receiveMsg(tenTimesMsgs)}}</p>
          </div>
        </div>
        <img src="../../images/break-egg/icon-close.png" alt="" width="10%" class="close-mask" @click="closeMask">
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil, Utils, ModalHelper} from '../../service/Utils'
  import breakEggCalculator from './breakEggCalculator.vue'
  import $ from 'zepto'
  export default {
    name: 'breakEgg',
    data () {
      return {
        eggImgSrc: '',
        brokenEggSrc: '',
        eggImgNumber: Math.floor(Math.random() * 5 + 1),
        breakNumber: 10,
        activityStatus: 1, // 1 正常 2 结束
        cumulativeInvestAmount: 0,
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
            description: 'hhhh',
            num: 1
          },
          {
            type: 1,
            description: 'hhhh',
            num: 2
          },
          {
            type: 1,
            description: 'hhhh',
            num: 3
          },
          {
            type: 2,
            description: 'hhhh',
            num: 4
          },
          {
            type: 2,
            description: 'hhhh',
            num: 5
          }
        ],
        breakCount: 0 // 剩余砸蛋次数
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        val && val !== '' ? this.getActivityStatus() : null
      },
      showMask (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
        val ? $('.hammer').removeClass('hammerRotate') : null
      }
    },
    created () {
      this.token && this.token !== '' ? this.getActivityStatus() : null
      this.token && this.token !== '' ? this.getUserBreakInfo() : null
      this.eggImgSrc = '../../../static/images/egg' + this.eggImgNumber + '.png'
      this.brokenEggSrc = '../../../static/images/brokenEgg' + this.eggImgNumber + '.png'
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
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/34').then(function (res) {
          console.log(res.data)
        })
      },
      getUserBreakInfo () { // 用户参与活动信息查询 剩余砸蛋次数 = value - useedCount
        var that = this
        that.$http({
          url: '/hongcai/rest/activity/breakEggs/0/info?token=' + that.token
        }).then(function (res) {
          console.log(res.data)
        }).catch(function (err) {
          console.log(err)
        })
      },
      toInvest () {
        var that = this
        that.busy = true
        setTimeout(function () {
          that.busy = false
        }, 2000)
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
      },
      toRecord () {
        this.$router.push({name: 'BreakEggRecord'})
      },
      toLogin () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {}, null)
      },
      breakEgg (breakCounts) {
        // breakCounts // 砸蛋 1次 10次
        var that = this
        // this.$http.get('/hongcai/rest/activity/breakEggs/0/break', {
        //   token: that.token,
        //   type: breakCounts
        // }).then(function (res) {
        //   if (!res.data || res.data.ret === -1) {
        //     return
        //   }
        //   that.rewardList = res.data
        // })
        $('.hammer').addClass('hammerRotate')
        that.beforeEggBreakAnimate(breakCounts)
      },
      beforeEggBreakAnimate (breakCounts) { // 蛋壳打破之前
        var that = this
        setTimeout(function () {
          that.showMask = true
          $('.hammer').addClass('hammerRotate')
          that.showBeforeBreak = true
          $('.before-break').find('.egg').addClass('eggRotate')
          that.afterEggBreakAnimate()
          breakCounts === 1 ? that.oneTimeBreak = true : that.tenTimeBreak = true
          breakCounts === 1 ? that.tenTimeBreak = false : that.oneTimeBreak = false
        }, 1000)
      },
      afterEggBreakAnimate () { // 蛋壳打破
        var that = this
        setTimeout(function () {
          $('.before-break').find('.egg').removeClass('eggRotate')
          that.showBeforeBreak = false
          $('.reward-break').addClass('breakAnimate')
          that.showAfterBreak = true
        }, 1000)
      }
    },
    components: {breakEggCalculator}
  }
</script>
<style scoped>
  .close-mask {
    margin-top: 1.5rem;
  }
  .break-egg {
    background: #fa6654;
    padding-bottom: 1.1rem;
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
    top: 27%;
    font-size: .23rem;
    color: #ff0014;
    text-align: right;
    padding: 0 .1rem;
  }
  .activityTime img {
    position: absolute;
    left: -.34rem;
    top: -.3rem;
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
  .yellowBtn, .geryBtn {
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
  }
  .eggsBox .egg {
    margin-top: .4rem;
    position: relative;
    z-index: 2;
  }
  .hammer {
    transform: rotateY(180deg);
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
  .icon-calculator {
    width: 16%;
    position: fixed;
    right: 0;
    top: 33%;
  }
  /* animation */
  @keyframes hammerRotate {
    0% {
      transform: rotateY(180deg) rotate(0deg) translateX(0rem);
    }
    50% {
      transform: rotateY(180deg) rotate(20deg) translateX(0.2rem);
    }
    100% {
      transform: rotateY(180deg) rotate(45deg) translateX(0.5rem);
    }
  }
  .hammer.hammerRotate {
    animation: hammerRotate .3s 0s infinite alternate;
    -moz-animation: hammerRotate .3s 0s infinite alternate;
    -webkit-animation: hammerRotate .3s 0s infinite alternate;
    -o-animation: hammerRotate .3s 0s infinite alternate;
  }
  @keyframes gyrate {
    0% {
      transform: rotate(-20deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(20deg);
    }
  }
  .before-break .one-time-break .egg.eggRotate, .before-break .ten-times-break .egg.eggRotate {
    animation: gyrate .1s 0s infinite alternate;
    -moz-animation: gyrate .1s 0s infinite alternate;
    -webkit-animation: gyrate .1s 0s infinite alternate;
    -o-animation: gyrate .1s 0s infinite alternate;
  }
  @keyframes breakAnimate {
    0% {
      top: 60%;
      left: 12%;
    }
    100% {
      top: 105%;
      left: 8%;
    }
  }
  .after-break .one-time-break .reward-break.breakAnimate, .after-break .ten-time-break .reward-break.breakAnimate {
    animation: breakAnimate .2s 0s ease-in;
    -moz-animation: breakAnimate .2s 0s ease-in;
    -webkit-animation: breakAnimate .2s 0s ease-in;
    -o-animation: breakAnimate .2s 0s ease-in;
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
    margin-top: 1rem;
  }
  .ten-time-break {
    margin-top: .5rem;
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
  .ten-time-break .receive {
    height: 5rem;
  }
  .one-time-break .receive img:first-child, .ten-time-break .receive img:first-child {
    margin-bottom: .3rem;
  }
  .one-time-break .receive img.position-ab, .ten-time-break .receive img.position-ab {
    top: 105%;
    left: 8%;
  }
  .receive .receive-msg {
    font-size: .26rem;
    letter-spacing: 0.8px;
    margin-top: .5rem;
  }
  .receive .priviledges img, .receive .rate-coupons img {
    margin-bottom: .3rem;
  }
  .receive .priviledges span, .receive .rate-coupons span {
    position: relative;
    top: -.8rem;
  }
  .receive .rate-coupons span {
    top: -.56rem;
  }
  .priviledges div {
    width: 25%;
    display:inline-block;
    text-align: left;
  }
  .priviledges div span{
    display:inline-block;
    width:6%;
  }
  .rate-coupons div {
    width: 35%;
    display:inline-block;
    text-align: left;
  }
  .rate-coupons div span {
    display:inline-block;
    width:24%;
  }
</style>
