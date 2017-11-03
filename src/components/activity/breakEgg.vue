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
      
    </div>
    <div class="eggsBorder"></div>
    <!-- 砸蛋按钮 -->
    <div class="breakBtns">
      <div v-if="token !== '' && activityStatus === 1">
        <!-- 可砸蛋按钮 -->
        <div v-if="breakCounts >0">
          <img src="../../images/break-egg/btn-yellow-1.png" class="yellowBtn fl">
          <img src="../../images/break-egg/btn-yellow-10.png" class="yellowBtn fr" v-show="breakCounts >=10">
          <img src="../../images/break-egg/btn-grey-10.png" class="yellowBtn fr" v-show="breakCounts <10">
        </div>
        <!-- 没有砸蛋次数按钮 -->
        <img v-if="breakCounts <=0" src="../../images/break-egg/btn-invest.png" class="margin-auto" width="48%" @click="toInvest()">
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
        累计年化投资金额：{{cumulativeInvestAmount}}元
      </div>
      <div class="">
        <p class="rewardDetail" @click="toRecord">查看奖励详情>></p>
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
    <div class="mask-common" v-show="showMask">
      <break-Egg-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></break-Egg-Calculator>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil, Utils} from '../../service/Utils'
  import breakEggCalculator from './breakEggCalculator.vue'
  export default {
    name: 'breakEgg',
    data () {
      return {
        breakCounts: 2,
        activityStatus: 1, // 1 正常 2 结束
        cumulativeInvestAmount: 0,
        showCalculator: false,
        showMask: false,
        busy: false,
        isIos: Utils.isIos()
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        val && val !== '' ? this.getActivityStatus() : null
      }
    },
    created () {
      this.token && this.token !== '' ? this.getActivityStatus() : null
    },
    methods: {
      closeCalculator () {
        this.showMask = false
        this.showCalculator = false
      },
      getActivityStatus () {
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
      }
    },
    components: {breakEggCalculator}
  }
</script>
<style scoped>
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
    margin: .3rem auto .8rem;
    overflow: hidden;
    clear: both;
  }
  .yellowBtn {
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
    text-align: center;
    padding: 0 .1rem;
    font-weight: bold;
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
    padding: .06rem .25rem;
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
</style>
