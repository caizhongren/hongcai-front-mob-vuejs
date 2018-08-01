<template>
  <div class="goldDays" :class="{'padding-bottom-9' : activityStatus === 1 && showBtn }">
    <audio preload="preload" id="reward"><source src="../../assets/reward.mp3"></audio>
    <div class="activity_time">{{activityInfo.createTime | dateCharacter}}至{{activityInfo.endTime | dateCharacter}}</div>
    <div class="top_two">
      <p><img src="../../images/gold-day/received.png" alt=""><span>已收获特权本金</span><span id="harvested">{{userActivityInfo.harvestAmount | floor}}</span><span>元</span></p>
      <p><img src="../../images/gold-day/speed.png" alt=""><span>当前产出速度</span><span>{{userActivityInfo.speed}}元特权本金/小时</span></p>
    </div>
    <div class="harvest">
      <div class="crystal_ball no-start" v-if="activityStatus === 0"></div>
      <div class="crystal_ball" v-if="activityStatus > 0">
        <span>{{userActivityInfo.amount | floor}}元</span>
      </div>
      <button v-if="!token && activityStatus !== 0" @click="toNative('HCNative_Login')">登录查看奖励</button>
      <button v-if="(activityStatus === 1 || activityStatus === 2) && token" @click="collectProfit(); (activityStatus === 2 ? isTips= 2 : isTips= 1);" :class="{'notEnough' : userActivityInfo.amount < 100}" :disable="busy">立即收获</button>
      <p class="tips">*为保证收益，特权本金产量需满100元才可点击收获哟～</p>
    </div>
    <div class="explain">
      <div class="describe">
        <p>活动期间，用户出借宏财精选、尊贵项目累计年化出借金额至少达到3000元，即可根据当前特权本金产出速度获得特权本金奖励(截至活动结束时不再产生奖励)。累计年化出借金额达到指定额度还可提升当前特权本金产出速度，获得更多特权本金奖励哟～</p>
        <p>例如</p>
        <p>小财在活动期间累计年化出借达到10000元，截至活动结束前，根据奖励产出速度，每小时可产生450元特权本金奖励，如中途小财追加出借，累计年化出借达到50000元，则后续奖励产出速度提升至每小时可产生2700元特权本金奖励。</p>
      </div>
    </div>
    <div class="check_details">
      <span>我的累计年化出借金额：{{investAmount}}元</span>
      <router-link tag="span" :to="'/activity/gold-record'" >查看<br>详情</router-link>
    </div>
    <div class="speed_rule">
      <ul>
        <li>
          <p><img src="../../images/gold-day/principal.png" alt=""><span>累计年化出借金额(元)</span></p>
          <p>产出速度<br>(特权本金/小时)</p>
        </li>
        <li><p>3000</p><p>90</p></li>
        <li><p>5000</p><p>180</p></li>
        <li><p>10000</p><p>450</p></li>
        <li><p>20000</p><p>990</p></li>
        <li><p>50000</p><p>2700</p></li>
        <li><p>100000</p><p>6120</p></li>
      </ul>
      <p class="formula"><img src="../../images/gold-day/calculator_s.png" alt=""><span>年化出借金额=出借金额x项目期限/365天</span></p>
    </div>
    <!-- 活动规则 -->
    <div class="activity_rule">
      <div class="rules">
        <img src="../../images/gold-day/rule_title.png">
      </div>
      <div class="">
        <p class="rule-num"><span>1</span>活动时间</p>
        <p class="rule-content">本次活动仅限于{{activityInfo.createTime | dateCharacter}}至{{activityInfo.endTime | dateCharacter}}内参与有效；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>2</span>参与方式</p>
        <p class="rule-content">活动期间，用户出借宏财精选、尊贵项目累计年化出借金额至少达到3000元，即可根据当前特权本金产出速度获得特权本金奖励(截至活动结束时不再产生奖励)。累计年化出借金额达到指定额度还可提升当前特权本金产出速度，获得更多特权本金奖励哟～</p>
      </div>
      <div class="">
        <p class="rule-num"><span>3</span>奖励发放</p>
        <p class="rule-content">用户点击“立即收获”按钮即可收获已产出的特权本金奖励，为保证特权本金收益，产量需达到100元特权本金方可点击收获；<br>如活动结束后3天内仍未领取奖励，将视为自动放弃奖励；</p>
      </div>
      <div class="">
        <p class="rule-num"><span>4</span>关于特权本金</p>
        <p class="rule-content">特权本金是平台向用户提供的一种虚拟资金，其本身不可提现或用于出借，但享受8%期望年均回报率。特权本金次日即可产生收益，并直接发放至用户可用余额，可用于出借或提现；</p>
      </div>
      <div>
        <p class="rule-num"><span>5</span></p>
        <p class="rule-content" style="margin-top: -.34rem;">在法律规定范围内，宏财网保留本活动最终解释权。</p>
      </div>
    </div>
    <div v-if="isIos" class="iosTips">该活动与设备生产商Apple Inc.公司无关</div>
    <button v-if="activityStatus === 1 && showBtn" class="invest-fixed-btn" @click="toInvest()" >{{token ? '立即出借' : '立即登录'}}</button>
    <!-- 计算器入口 -->
    <div class="icon-calculator" @click="showMask = true;isCalculator = true; isTips= 0;"></div>
    <!-- 计算器弹窗 -->
    <Gold-Calculator v-show="showMask" :isCalculator="isCalculator" :isTips="isTips"></Gold-Calculator>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {bridgeUtil, Utils, audioPlayUtil, scrollHalfPage, commonAnimation} from '../../service/Utils'
  import GoldCalculator from './goldCalculator'
  export default {
    name: 'goldDays',
    data () {
      return {
        showBtn: false, // 是否显示底部按钮
        activityStatus: 2, // 0 活动未开始，1 活动进行中，2 活动结束3天内，3 活动结束3天后
        showMask: false, // 弹窗蒙层
        isCalculator: false, // 年化出借计算器
        isTips: 2, // 0 不显示提示 1 温馨提示 2 活动已结束
        isIos: Utils.isIos(),
        activityInfo: {
          createTime: '',
          endTime: ''
        },
        activityType: this.$route.query.act || 45,
        amount: 0,
        showReminder: false,
        investAmount: 0,
        userActivityInfo: {
          speed: 0,
          amount: 0,
          harvestAmount: 0
        },
        timer: null,
        serverTime: 4000,
        busy: false
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val && val !== '' ? (this.goldDayInfo(), this.getAnnualInvestAmount()) : null
      }
    },
    mounted () {
      scrollHalfPage(status => {
        this.showBtn = status
      })
    },
    created () {
      this.token ? (this.goldDayInfo(), this.getAnnualInvestAmount()) : null
      this.getActivityStatus()
    },
    computed: {
      computeNumber () {
        var that = this
        clearInterval(that.timer)
        that.timer = setInterval(function () {
          if (that.serverTime <= 0) {
            clearInterval(that.timer)
            return
          } else {
            that.serverTime = that.serverTime - 1000
            that.userActivityInfo.amount = that.userActivityInfo.amount + that.userActivityInfo.speed / 60 / 60
          }
        }, 1000)
      }
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http({ // 获取服务器时间
          method: 'get',
          url: '/hongcai/rest/systems/serverTime'
        }).then((response) => {
          that.serverTime = response.data.time
          that.$http('/hongcai/rest/activitys/' + that.activityType).then(function (res) {
            if (that.serverTime - res.data.endTime > 3 * 24 * 60 * 60 * 1000) {
              that.activityStatus = 3 // 活动结束3天后
              that.showMask = true
              that.isTips = 0
            } else if (that.serverTime < res.data.createTime) {
              that.activityStatus = 0 // 预热状态
            } else {
              that.activityStatus = res.data.status
              if (that.activityStatus === 2 && that.investAmount === 0) {
                that.showMask = true
                that.isTips = 0
              }
            }
            // 获取活动开始、结束时间
            that.activityInfo = res.data
          })
          that.computeNumber()
        })
      },
      toInvest () {
        var that = this
        if (that.token) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
        } else {
          bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (res) {}, null)
        }
      },
      collectProfit () {
        var that = this
        that.isCalculator = false
        if (that.userActivityInfo.amount < 100 && that.activityStatus === 1) {
          that.showMask = true
          that.isTips = 1
        } else if (that.userActivityInfo.amount < 100 && that.activityStatus !== 1) {
          that.showMask = true
          that.isTips = 2
        } else {
          that.showMask = false
          that.$http.post('/hongcai/rest/activitys/invest/transition/userSpeed/privilegedCapital', {
            token: that.token
          }).then((response) => {
            if (that.busy) {
              return
            }
            that.busy = true
            setTimeout(function () {
              that.busy = false
            }, 800)
            if (response.data) {
              audioPlayUtil.playOrPaused('reward', 'true')
              commonAnimation.countToNumber($('#harvested'), that.userActivityInfo.harvestAmount + that.userActivityInfo.amount, that.userActivityInfo.harvestAmount, 800, 0)
              that.goldDayInfo()
            }
          })
        }
      },
      toNative (HCNative) {
        bridgeUtil.webConnectNative(HCNative, undefined, {}, function (response) {
        }, null)
      },
      goldDayInfo () { // 获取用户活动期间产出速度，待收和已收特权本金
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/userSpeed?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.userActivityInfo = res.data
          }
        })
      },
      getAnnualInvestAmount () {
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/annualInvestAmount?token=' + that.token + '&activityType=' + that.activityType)
        .then(function (res) { // 获取累计年化投资金额
          if (!res || res.ret === -1) {
            return
          }
          that.investAmount = res.data.annualInvest || 0
        })
      }
    },
    components: {
      GoldCalculator
    },
    destroyed () {
    },
    filters: {
      floor (value) {
        return Math.floor(value)
      }
    }
  }
</script>

<style scoped>
  .goldDays {
    background: url(../../images/gold-day/gold_day_bg.png) no-repeat;
    background-color: #3aeaea;
    background-size: 100%;
  }
  .padding-bottom-9{
    padding-bottom: .9rem;
  }
  .activity_time{
    padding-top: 2.78rem;
    text-indent: 1.3rem;
    font-size: .21rem;
    color: #fff;
    margin-bottom: .7rem;
  }
  .icon-calculator{
    position: fixed;
    right: 0;
    top: 50%;
    width: .8rem;
    height: .8rem;
    background: url(../../images/gold-day/calculator_b.png) no-repeat;
    background-size: cover;
  }
  .top_two{
    padding: 0 .3rem;
  }
  .top_two p{
    margin-bottom: .2rem;
    border-radius: .5rem;
    line-height: .7rem;
    height: .7rem;
    margin-bottom: .2rem;
    display: flex;
    text-align: left;
    background: rgba(255,204,2,.7);
    color: #fff;
    font-weight: bold;
  }
  .top_two p:last-child{
    background: rgba(55,125,240,.5);
  }
  .top_two p img{
    width: .7rem;
    margin-right: .3rem;
  }
  .top_two p span:nth-child(2){
    font-size: .22rem;
    width: 1.8rem;
  }
  .top_two p span:nth-child(3){
    font-size: .25rem;
  }
  .top_two p span:last-child{
    font-size: .25rem;
  }
  .harvest{
    padding: 0 .3rem;
  }
  .harvest .crystal_ball{
    margin-top: -.2rem;
    height: 4.5rem;
    background: url(../../images/gold-day/crystal_ball.png) no-repeat center;
    background-size: contain;
    margin-bottom: .2rem;
  }
  .harvest .no-start{
    margin-top: -.2rem;
    height: 4.5rem;
    background: url(../../images/gold-day/crystal_ball_expect.png) no-repeat center;
    background-size: contain;
    margin-bottom: .2rem;
  }
  .harvest .crystal_ball span{
    display: block;
    padding-top: 1.5rem;
    color: #fa9800;
    font-size: .5rem;
    font-weight: bold;
  }
  .harvest button{
    display: block;
    width: 5rem;
    height: .9rem;
    border-radius: .4rem;
    background-color: #ffcc02;
    box-shadow: 0px 2px 2px 0 rgba(184, 130, 18, 0.94);
    margin: 0 auto;
    line-height: .9rem;
    color: #9a540e;
    font-size: .3rem;
    font-weight: bold;
    letter-spacing: .1rem;
    border: none;
  }
  .harvest .tips{
    color: #9a540e;
    font-size: .22rem;
    margin: .2rem 0;
  }
  .explain{
    padding: 0 .26rem;
  }
  .explain .describe{
    padding: .3rem;
    background-color: #3e7cd7;
    box-shadow: inset -0.9px -1.2px 3.5px 0 rgba(44, 40, 40, 0.35);
    border-radius: .2rem;
    color: #fff;
    text-align: justify;
    margin-bottom: .4rem;
  }
  .explain .describe p:nth-child(2){
    margin: .2rem 0 .1rem 0;
    line-height: .5rem;
    background: url(../../images/gold-day/example.png) no-repeat;
    height: .5rem;
    background-size: auto 100%;
    color: #9a540e;
    font-weight: bold;
    text-indent: .18rem;
    margin-left: -.3rem;
  }
  .check_details{
    height: .9rem;
    font-size: .28rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding-right: .28rem;
    color: #9a540e;
    margin-bottom: .35rem;
  }
  .check_details span:first-child{
    line-height: .9rem;
    background-color: #ffcc02;
    position: relative;
    z-index: 2;
    width: 5.7rem;
    text-align: left;
    border-radius: .8rem;
    padding-right: .28rem;
    margin-left: -0.8rem;
    text-indent: 1.1rem;  
  }
  .check_details span:last-child{
    width: .7rem;
    height: .7rem;
    background-color: #ffcc02;
    border-radius: 50%;
    padding: .1rem;
    line-height: .36rem;
    margin-left: .1rem;
    font-size: .26rem;    
  }
  .speed_rule{
    padding: 0 .26rem;
    margin-bottom: .66rem;
  }
  .speed_rule ul{
    border-radius: .18rem;
    overflow: hidden;
    box-shadow: inset -0.9px -1.2px 3.5px 0 rgba(44, 40, 40, 0.35);
    margin-bottom: .15rem;
  }
  .speed_rule ul li{
    height: .9rem;
    line-height: .9rem;
    display: flex;
  }
  .speed_rule ul li p{
    flex: 1;
    color: #fff;
    font-weight: bold;
    font-size: .27rem;
  }
  .speed_rule ul li p:last-child{
    color: #9ce9fc;
  }
  .speed_rule ul li:nth-child(even){
    background: #77aaf5;
  }
  .speed_rule ul li:nth-child(odd){
    background: #3b83e5;
  }
  .speed_rule ul li:first-child{
    height: 1.4rem;
    line-height: normal;
  }
  .speed_rule ul li:first-child img{
    width: .66rem;
    display: block;
    margin: 0 auto;
    margin-top: .16rem;
  }
  .speed_rule ul li:first-child p:last-child{
    padding-top: .42rem;
  }
  .speed_rule .formula{
    color: #008087;
    font-size: .22rem;
    display: flex;
    width: 87%;
    margin: 0 auto;
    line-height: .53rem;
    font-weight: 900;
  }
  .speed_rule .formula img{
    width: .53rem;
    height: .53rem;
    margin-right: .12rem;
  }
  /*活动规则*/
  .activity_rule {
    width: 95%;
    margin: 0 auto;
    position: relative;
    height: auto;
    font-size: .22rem;
    color: #008087;
    text-align: justify;
    padding: 0rem .01rem;
    font-weight: bold;
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
    text-align: center;
    margin-bottom: .3rem;
  }
  .rules img {
    height: .7rem;
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
    width: .33rem;
    height: .33rem;
    background: #ffcc02;
    text-align: center;
    line-height: .33rem;
    margin-left: .14rem;
    margin-right: .1rem;
    box-shadow: 1.4px 2.1px 0.5px 0px rgba(162, 0, 0, 0.18);
    border-radius: 50%;
    color: #fff;
    font-weight: bold;
    font-size: .26rem;
  }
  .rule-content {
    width: 86%;
    margin-left: 9.8%;
    margin-bottom: .3rem;
  }
  .iosTips {
    font-size: .2rem;
    text-align: center;
    margin-top: .3rem;
    background: rgb(18,160,165);
    color: rgb(58,234,234);
    height: .7rem;
    line-height: .7rem;
    font-weight: bold;
    font-size: .22rem;
  }
  .invest-fixed-btn {
    width: 100%;
    height: .9rem;
    border: none;
    line-height: .9rem;
    color: #9a540e;
    font-size: .28rem;
    font-weight: bold;
    background-color: #ffcc02;
    position: fixed;
    letter-spacing: .1rem;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .harvest .notEnough{
    object-fit: contain;
    background-color: #dddddd;
    box-shadow: 0px 2px 2px 0 rgba(87, 82, 78, 0.94);
  }
</style>
