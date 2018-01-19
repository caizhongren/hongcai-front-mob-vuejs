<template>
  <div class="laba-spring">
    <div class="header">
      <img src="../../images/laba-festival/laba-header_01.png" alt="">
      <img src="../../images/laba-festival/laba-header_02.png" alt="">
      <img src="../../images/laba-festival/laba-header_03.png" alt="">
      <img src="../../images/laba-festival/laba-header_04.png" alt="">
      <img src="../../images/laba-festival/laba-header_05.png" alt="">
      <div class="activityTime">活动时间：{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日-{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日</div>
    </div>
    <div v-bind:class="{'padding-b-1':token && activityStatus === 1}" class="contents">
      <div class="describe">活动期间，新增投资<span class="ft-red">宏财精选、宏财尊贵</span>项目(不含债权转让项目)，累计年化投资金额达到指定额度，活动结束后，即可获得<span class="ft-red">累计新增年化投资金额x相应倍数的特权本金奖励</span>(不同阶段特权本金奖励有效期不同哟)。</div>
      <div class="reward">
        <img src="../../images/laba-festival/box-header.png" alt="">
        <ul class="tables">
          <li>
            <p>累计年化<br> 投资金额</p>
            <p>特权本金<br> 奖励倍数</p>
            <p>特权本金<br> 有效期</p>
          </li>
          <li>
            <p>5000元</p>
            <p>2倍</p>
            <p>5天</p>
          </li>
          <li>
            <p>10000元</p>
            <p>3倍</p>
            <p>5天</p>
          </li>
          <li>
            <p>30000元</p>
            <p>5倍</p>
            <p>5天</p>
          </li>
          <li>
            <p>50000元</p>
            <p>6倍</p>
            <p>6天</p>
          </li>
          <li>
            <p>100000元</p>
            <p>8倍</p>
            <p>6天</p>
          </li>
        </ul>
      </div>
      <div class="investment">
        <p class="investText">新增年化投资金额</p>
        <div class="time"><img src="../../images/laba-festival/icon.png" alt=""><span v-show="activityStatus ===2">活动已结束</span><span v-show="activityStatus ===1">({{activityInfo.startYear}}.{{activityInfo.startMonth}}.{{activityInfo.startDate}}至{{activityInfo.endYear}}.{{activityInfo.endMonth}}.{{activityInfo.endDate}}活动期间)</span></div>
        <div v-if="activityStatus === 2 && (!token || investAmount <=0)" class="activityEnd">
          <img src="../../images/laba-festival/icon.png" alt="">
          <img src="../../images/laba-festival/text-activityEnd.png" alt="">
        </div>
        <div v-else>
          <div v-if="token">
            <div class="investAmount">{{investAmount}}元</div>
            <div class="investBtn" v-if="investAmount <=0" @click="toHCNative('HCNative_GoInvestList')">我要投资</div>
            <p class="record" v-if="investAmount > 0" @click="toRecord">查看详情>></p>
            <div class="tips">
              <div v-if="investAmount >=5000">预计获得特权本金<span>{{privilegedCapital}}元</span>(有效期{{validityTime}}天） <br>约合收益 ≈<span>{{profit}}元</span></div> 
              <p :class="{'single':investAmount > 0 && investAmount < 5000, 'zero':investAmount <= 0}">*实际获得奖励以{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日24:00时累计新增金额及对应达标奖励倍数为准。</p>
            </div>
          </div>
          <div v-if="!token">
            <p class="login1">登录后，即可查看哟 ～</p>
            <p class="login2">腊八粥到了,8倍特权本金还会远吗！</p>
            <div class="investBtn" @click="toHCNative('HCNative_Login')">立即登录</div>
          </div>
        </div>
      </div>
      <div class="ruleBox">
        <img src="../../images/laba-festival/box-header.png" alt="">
        <div class="rules">
          <div class="ruleBg">
            <div class="rule-title">活动规则</div>
            <div class="rule">
              <img src="../../images/laba-festival/rule-icon.png" alt="" class="rule-icon">
              <p>活动时间<br> 本次活动仅限于{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日至{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}内参与有效;</p>
            </div>
            <div class="rule">
              <img src="../../images/laba-festival/rule-icon.png" alt="" class="rule-icon">
              <p>参与方式<br> 活动期间，用户新增投资宏财精选及宏财尊贵项目(不含债权转让项目)，累计年化投资金额达到指定额度，即可按照活动规则获得相应特权本金本金奖励;</p>
            </div>
            <div class="rule">
              <img src="../../images/laba-festival/rule-icon.png" alt="" class="rule-icon">
              <p>奖励发放<br> 特权本金奖励将于活动结束后3个工作日内发放至您的账户中，届时可前往【我的】>>【特权本金】查看;</p>
            </div>
            <div class="rule">
              <img src="../../images/laba-festival/rule-icon.png" alt="" class="rule-icon">
              <p>关于特权本金奖励<br> 特权本金是平台向用户提供的一种虚拟资金，其本身不可提现或用于投资，但享受8%年化收益率。根据活动规则，特权本金享有不同的计息时长，每日自动产生的收益，并直接发放至您的账户>>可用余额中，可用于提现或投资;</p>
            </div>
            <div class="rule">
              <img src="../../images/laba-festival/rule-icon.png" alt="" class="rule-icon">
              <p>在法律规定范围内，宏财网保留本活动最终解释权。<br></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="../../images/laba-festival/calcul.png" alt="" class="calcu-icon" @click="showCalculator = !showCalculator">
    <button v-if="token && activityStatus === 1" class="invest-fixed-btn" @click="toHCNative('HCNative_GoInvestList')">立即投资</button>
    <laba-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></laba-Calculator>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  import labaCalculator from './labaCalculator.vue'
  import $ from 'zepto'
  export default {
    name: 'LabaSpring',
    data () {
      return {
        investAmount: 0,
        privilegedCapital: 0,
        profit: 0,
        validityTime: 0,
        activityStatus: 1, // 1 正常 2 结束
        activityInfo: {
          startYear: 0,
          startMonth: 0,
          startDate: 0,
          endYear: 0,
          endMonth: 0,
          endDate: 0
        },
        showCalculator: false
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        val && val !== '' ? (this.getAnnualInvestAmount(), this.getAwardPredict()) : null
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
      this.token ? (this.getAnnualInvestAmount(), this.getAwardPredict()) : null
    },
    methods: {
      closeCalculator () {
        this.showCalculator = false
      },
      toRecord () {
        this.$router.push({name: 'LabaRecord', query: {act: this.$route.query.act}})
      },
      toHCNative (nativeName) {
        bridgeUtil.webConnectNative(nativeName, undefined, {}, function (response) {}, null)
      },
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
          that.activityStatus = res.data.status
          var startTime = res.data.startTime
          var endTime = res.data.endTime
          that.activityInfo = {
            startYear: new Date(startTime).getFullYear(),
            startMonth: new Date(startTime).getMonth() + 1,
            startDate: new Date(startTime).getDate(),
            endYear: new Date(endTime).getFullYear(),
            endMonth: new Date(endTime).getMonth() + 1,
            endDate: new Date(endTime).getDate()
          }
        })
      },
      getAnnualInvestAmount () {
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/annualInvestAmount?token=' + that.token + '&activityType=' + that.$route.query.act).then(function (res) {
          if (res && res.ret !== -1) {
            that.investAmount = res.data.annualInvest || 0
          }
        })
      },
      getAwardPredict () {
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/awardPredict?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.privilegedCapital = res.data.awardAmount
            that.validityTime = res.data.day
            that.profit = (res.data.awardAmount * 8 / 36500 * res.data.day).toFixed(2)
          }
        })
      }
    },
    components: {labaCalculator}
  }
</script>
<style scoped>
  .ft-red {
    color: #fc0802;
  }
  .header {
    position: relative;
  }
  .header img {
    width: 100%;
    vertical-align: top;
  }
  .header .activityTime {
    position: absolute;
    top: 52%;
    left: 1.22rem;
    font-size: .22rem;
    font-weight: bold;
    line-height: 3.21;
    text-align: center;
    color: #f4f1f0;
  }
  .padding-b-1 {
    padding-bottom: 1rem !important;
  }
  .contents {
    background: #fbeac8;
    padding: 0 .25rem;
  }
  .contents .describe {
    font-size: .24rem;
    line-height: 1.69;
    text-align: justify;
    color: #53281f;
  }
  .reward {
    padding: .3rem 0 .5rem;
  }
  .reward img, .ruleBox>img {
    width: 100%;
    vertical-align: bottom;
    position: relative;
    top: .13rem;
  }
  .reward .tables, .ruleBox .rules {
    border: 1px solid #ff9f01;
    border-radius: .2rem;
    padding: .1rem;
    overflow: hidden;
  }
  .reward .tables li {
    width: 100%;
    overflow: hidden;
    height: .8rem;
    line-height: .8rem;
    color: #effffd;
  }
  .reward .tables li p {
    width: 33.333%;
    float: left;
    text-align: center;
  }
  .reward .tables li:nth-child(odd) {
    background: #f33a22;
  }
  .reward .tables li:nth-child(even) {
    background: #ff5a54;
    color: #effffd;
  }
  .reward .tables li:nth-child(1) {
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    color: #fac047;
  }
  .reward .tables li:nth-child(1) p {
    line-height: 1.4;
    padding-top: .1rem;
  }
  .reward .tables li:nth-child(6) {
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }
  .ruleBox {
    padding: 0.3rem 0 .5rem;
  }
  .ruleBox .ruleBg {
    background: #f33a22;
    border-radius: .2rem;
    color: #fcf5c7;
    padding: .3rem 0.2rem 0;
  }
  .ruleBox .rules .rule-title {
    background: url('../../images/laba-festival/rule-title.png') no-repeat center center;
    background-size: contain;
    width: 80%;
    height: .6rem;
    margin: 0 auto;
    font-size: .3rem;
    line-height: .65rem;
    font-weight: bold;
    color: #ffdaa3;
    font-family: 'FZZCHJW-GB1-0';
  }
  .rules .rule {
    overflow: hidden;
    padding-bottom: .3rem;
  }
  .rules .rule img {
    float: left;
    width: 8%;
  }
  .rules .rule p {
    float: right;
    width: 90%;
    text-align: left;
    color: #fcf5c7;
    font-size: .22rem;
    padding-top: .15rem;
  }
  .calcu-icon {
    position: fixed;
    top: 36%;
    right: 0;
    width: 8%;
    background: #b30104;
    border: 1px solid #810e0f;
    padding: .1rem;
    border-radius: .1rem;
  }
  .investment {
    width: 100%;
    height: 5rem;
    background: url('../../images/laba-festival/invest-box.png') no-repeat center center;
    background-size: contain;
    padding: .7rem 0.2rem 0;
  }
  .investment .investText {
    font-size: .3rem;
    line-height: .65rem;
    height: .6rem;
    font-weight: bold;
    color: #ffdaa3;
    font-family: 'FZZCHJW-GB1-0';
  }
  .investment .time {
    color: #fbeec8;
    font-size: .22rem;
  }
  .investment .time img {
    width: 8%;
    vertical-align: bottom;
  }
  .investment .investAmount {
    border-radius: 25.5px;
    background-color: #b30104;
    width: 85%;
    height: .85rem;
    line-height: .9rem;
    margin: 0.15rem auto .15rem;
    color: #feef00;
    font-size: 0.6rem;
  }
  .investment .record {
    color: #fffee3;
    font-size: .22rem;
  }
  .investment .tips {
    color: #fefefe;
    text-align: justify;
    font-size: .22rem;
    margin: 0.15rem 6% 0;
    line-height: 1.3;
  }
  .investment .tips span {
    color: #feef00;
  }
  .tips p {
    color: #ffea98;
    margin-top: .08rem;
    transform: scale(.93);
    margin-left: -.15rem;
  }
  .tips p.single {
    margin-top: .32rem;
  }
  .tips p.zero {
    margin-top: .2rem;
  }
  .investBtn {
    background: url('../../images/laba-festival/btn-box.png') no-repeat center center;
    background-size: contain;
    width: 60%;
    height: .8rem;
    line-height: .85rem;
    color: #b30104;
    margin: 0 auto;
    font-size: .3rem;
  }
  .login1 {
    color: #fce800;
    font-size: .3rem;
    margin: .2rem auto .1rem;
  }
  .login2 {
    color: #ffea98;
    margin: 0 auto .4rem;
  }
  .activityEnd {
    clear: both;
    overflow: hidden;
    margin-left: 20%;
  }
  .activityEnd img:nth-child(1) {
    width: 26%;
    float: left;
    margin-top: .3rem;
  }
  .activityEnd img:nth-child(2) {
    width: 85%;
    float: left;
    margin-top: -.4rem;
    margin-left: .1rem;
  }
  .invest-fixed-btn {
    width: 100%;
    height: .9rem;
    border: none;
    line-height: .9rem;
    color: #fcf5c7;
    font-size: .28rem;
    font-weight: bold;
    background-color: #f33a22;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: none;
  }
</style>
