<template>
  <div class="SpringFestival">
    <div class="header">
      <img src="../../images/spring-festival/header-min.png" alt="" width="100%">
      <div class="header_tip">累计最高可领<span class="ft-red">1888</span>元现金</div>
    </div>
    <div class="contents">
      <!-- 累计年化投资金额 -->
      <div class="part1">
        <img src="../../images/spring-festival/bg-title-min.png" alt="" width="30%" class="top">
        <div class="box">
          <!-- 活动结束 -->
          <div v-if="(activityStatus === 2 && token && investAmount <= 0) || (activityEnd === 2 && !token)" class="activityEnd">
            <img src="../../images/spring-festival/activityEnd.png" alt="">
            <img src="../../images/spring-festival/activityEndText.png" alt="" class="activityEndText">
          </div>
          <!-- 活动未结束 -->
          <div v-else>
            <p class="description">活动期间，新增投资宏财精选、宏财尊贵项目(不含债权转让项目)，累计年化投资金额达到指定额度，即可领取相应现金红包奖励喔！</p>
            <div v-if="token" class="isLogin">
              <p class="investText">我的累计年化投资金额<span class="detail" @click="toRecord()" v-show="investAmount >0">查看详情</span></p>
              <div class="investAmount">{{investAmount}}元</div>
              <div class="investBtn" @click="toNative('HCNative_GoInvestList')" v-show="activityStatus === 1">立即投资</div>
              <div class="tips" v-show="activityStatus === 1 && investAmount < 300000">累计年化投资金额还差<span class="ft-red">{{shortAmount}}元</span>，即可领取<span class="ft-red">{{gettingRedPacket}}元</span>现金红包！</div>
              <div class="totalPacket" v-show="totalPacket >0"><img class="packet" src="../../images/spring-festival/envelope-1-min.png" /> 已领取到红包共计：<span class="ft-red">{{totalPacket}}元</span></div>
            </div>
            <div v-if="!token" class="margin-b-1">
              <div class="bgYellow">
                <img src="../../images/spring-festival/hongbao-min.png" alt="">
                <p class="maxPacket">累计最高可领 <br>  <span class="ft-red">1888元</span>现金红包哟！</p>
              </div>
              <p class="loginTip">登录即可查看<img src="../../images/spring-festival/coin.png" alt=""> 当前累计年化投资金额</p>
              <div class="loginBtn" @click="toNative('HCNative_Login')">前往登陆</div>
            </div>
          </div>
          <!-- 底部所有定位 -->
          <div class="bottoms">
            <img src="../../images/spring-festival/border.png" alt="" class="border">
            <img src="../../images/spring-festival/lantern.png" alt="" class="lantern">
            <img src="../../images/spring-festival/bottom-left-min.png" alt="" class="bottom-left">
            <img src="../../images/spring-festival/bottom-right-min.png" alt="" class="bottom-right">
          </div>
        </div>
      </div>
      <!-- 红包 -->
      <div class="part2" v-if="token">
        红包<br>
        <div @click="getPacket(1)">领取红包</div>
      </div>
      <!-- 活动规则 -->
      <div class="part3">
        <img src="../../images/spring-festival/rule-title-min.png" alt="" width="30%" class="top">
        <div class="box rules">
          <div class="rule">
            <img src="../../images/spring-festival/lantern.png" alt="" class="num">
            <div class="content">
              活动时间 <br>
              本次活动仅限于{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日至{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日内参与有效，活动期间，可随时拆红包领现金，如活动结束后3个工作日内仍未领取奖励，将视为自动放弃奖励；
            </div>
          </div>
          <div class="rule">
            <img src="../../images/spring-festival/lantern.png" alt="" class="num">
            <div class="content">
              参与方式 <br>
              活动期间，用户新增投资宏财精选及宏财尊贵项目(不含债权转让项目)，累计年化投资金额达到指定额度，即可获得相应金额现金红包，每个现金红包限领一次；
            </div>
          </div>
          <div class="rule">
            <img src="../../images/spring-festival/lantern.png" alt="" class="num">
            <div class="content">
              关于现金红包 <br>
              领取的现金红包奖励，将直接发放至您的账户>>可用余额中，可用于投资或提现;
            </div>
          </div>
          <div class="rule">
            <img src="../../images/spring-festival/lantern.png" alt="" class="num">
            <div class="content">
              在法律规定范围内，宏财网保留本活动最终解释权。 <br>
            </div>
          </div>
          <!-- 底部所有定位 -->
          <div class="bottoms">
            <img src="../../images/spring-festival/border.png" alt="" class="border">
            <img src="../../images/spring-festival/lantern.png" alt="" class="lantern">
            <img src="../../images/spring-festival/bottom-left-min.png" alt="" class="bottom-left">
            <img src="../../images/spring-festival/bottom-right-min.png" alt="" class="bottom-right">
          </div>
        </div>
      </div>
    </div>
    <spring-calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></spring-calculator>
    <!-- 弹窗 -->
    <div class="mask-common packet-mask" v-show="showMask">
      <div class="guang3 Rotation position"></div>
      <div class="guang2 Rotation2 position"></div>
      <div class="guang1 position"></div>
      <div class="packet-ban">
        <div class="ban"><img v-bind:src="rewardSrc" alt="" v-bind:style="{width:rewardImgSize[rewardMoney]}"><span class="yuan">元</span></div>
        <div class="packet-di">恭喜您获得</div>
      </div>
      <img src="../../images/break-egg/icon-close.png" width="12%" alt="" @click="showMask = false" style="margin-top: 3.6rem;">
    </div>
    <img src="../../images/spring-festival/jsq.png" alt="" class="jxq" @click="showCalculator = true">
  </div>
</template>
<script>
  import {bridgeUtil, ModalHelper} from '../../service/Utils'
  import $ from 'zepto'
  import SpringCalculator from './SpringCalculator.vue'
  export default {
    props: ['token'],
    data () {
      return {
        investAmount: 0, // 累计年化投资金额
        shortAmount: 0, // 累计年化投资还差多少钱
        gettingRedPacket: 0, // 即可领取的红包金额
        totalPacket: 0, // 一共领取的红包金额
        activityStatus: 1, // 1 正常 2 结束
        activityEnd: 1, // 1 -活动结束3个工作日内 2 —活动结束3个工作日后
        expirationDate: 1519747200000, // 活动结束三个工作日期固定 比如 2018-2-27 24:00:00
        // expirationDate: 1515254400000, // 测试使用 2018-1-10 00:00:00 new Date().getTime() + 1000 * 60 * 60 * 24 * 3
        packetList: [
          {
            status: 0, // 0 未达标 1 可拆 2 已领取
            amount: 5,
            limitAmount: 1000
          },
          {
            status: 0,
            amount: 35,
            limitAmount: 10000
          },
          {
            status: 0,
            amount: 90,
            limitAmount: 30000
          },
          {
            status: 0,
            amount: 120,
            limitAmount: 50000
          },
          {
            status: 0,
            amount: 350,
            limitAmount: 100000
          },
          {
            status: 0,
            amount: 1288,
            limitAmount: 300000
          }
        ],
        showMask: false,
        rewardSrc: '',
        rewardMoney: 5,
        rewardImgSize: {'5': '28%', '35': '50%', '90': '50%', '120': '65%', '350': '60%', '1288': '65%'},
        hammerTimer: null,
        hammerTimer2: null,
        hammerTimer3: null,
        showCalculator: false,
        activityInfo: {
          startYear: 0,
          startMonth: 0,
          startDate: 0,
          endYear: 0,
          endMonth: 0,
          endDate: 0
        }
      }
    },
    created () {
      this.getActivityStatus()
      this.getLevelStatus()
      this.getAnnualInvestAmount()
      this.getServeTime()
    },
    watch: {
      showMask (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
        val ? (this.hammerTimer = null, this.hammerTimer2 = null, this.hammerTimer3 = null) : null
      }
    },
    methods: {
      getServeTime () { // 获取服务器时间
        var that = this
        that.$http('/hongcai/rest/systems/serverTime').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            var currentDate = res.data.time
            currentDate < that.expirationDate ? that.activityEnd = 1 : that.activityEnd = 2
          }
        })
      },
      getLevelStatus () { // 获取等级领取状态
        var that = this
        that.$http('/hongcai/rest/activitys/newYear/levelStatus?token=' + that.token).then(function (res) {
          var arr = res.data.status
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] === 1) { // 已领取
              that.totalPacket += that.packetList[i].amount
            }
          }
        })
      },
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
          that.activityStatus = res.data.status
          // that.activityStatus = 2
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
      getAnnualInvestAmount () { // 获取累计年化投资金额
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/annualInvestAmount?token=' + that.token + '&activityType=' + that.$route.query.act).then(function (res) {
          if (res && res.ret !== -1) {
            that.investAmount = res.data.annualInvest || 0
            that.calculator()
          }
        })
      },
      getPacket (level) { // 拆红包领取奖励
        var that = this
        that.showMask = true
        that.rewardMoney = that.packetList[level - 1].amount
        that.rewardSrc = '../../../static/images/spring-' + that.rewardMoney + '.png'
        that.GuangRotation()
        that.$http.post('/hongcai/rest/activitys/newYear/takeReward', {
          level: level,
          token: that.token
        }).then(function (res) {
        }).catch(function () {
          console.log('接口报错')
        })
      },
      GuangRotation () { // 拆红包后动画
        var that = this
        var transY = 1.8
        var scale = 0.5
        // 获得奖励的动画
        that.hammerTimer = setInterval(function () {
          if (transY < -0.5) {
            clearInterval(that.hammerTimer)
            return
          }
          transY -= 0.5
          scale += 0.1
          $('.packet-ban .ban').css('transform', 'translateY(' + transY + 'rem) scale(' + scale + ')')
          document.querySelector('.packet-ban .ban').style.webkitTransform = 'translateY(' + transY + 'rem) scale(' + scale + ')'
        }, 40)
        var rotate = 0
        // 背景光的动画
        that.hammerTimer2 = setInterval(function () {
          if (rotate > 180) {
            clearInterval(that.hammerTimer2)
            return
          }
          rotate += 5
          $('.Rotation').css('transform', 'rotate(' + rotate + 'deg')
          document.querySelector('.Rotation').style.webkitTransform = 'rotate(' + rotate + 'deg'
        }, 40)
        var rotate2 = 0
        that.hammerTimer3 = setInterval(function () {
          if (rotate2 < -180) {
            clearInterval(that.hammerTimer3)
            return
          }
          rotate2 -= 5
          $('.Rotation2').css('transform', 'rotate(' + rotate2 + 'deg')
          document.querySelector('.Rotation2').style.webkitTransform = 'rotate(' + rotate2 + 'deg'
        }, 40)
      },
      calculator () { // 计算提示 金额及红包金额
        if (this.investAmount < 1000) {
          this.shortAmount = 1000 - this.investAmount
          this.gettingRedPacket = 5
        } else if (this.investAmount < 10000) {
          this.shortAmount = 10000 - this.investAmount
          this.gettingRedPacket = 35
        } else if (this.investAmount < 30000) {
          this.shortAmount = 30000 - this.investAmount
          this.gettingRedPacket = 90
        } else if (this.investAmount < 50000) {
          this.shortAmount = 50000 - this.investAmount
          this.gettingRedPacket = 120
        } else if (this.investAmount < 100000) {
          this.shortAmount = 100000 - this.investAmount
          this.gettingRedPacket = 350
        } else if (this.investAmount < 300000) {
          this.shortAmount = 300000 - this.investAmount
          this.gettingRedPacket = 1288
        }
      },
      toRecord () {
        this.$router.push({name: 'SpringRecord'})
      },
      toNative (HCNative) {
        bridgeUtil.webConnectNative(HCNative, undefined, {}, function (response) {
        }, null)
      },
      closeCalculator () {
        this.showCalculator = false
      }
    },
    components: {SpringCalculator},
    destroyed () {
      clearTimeout(this.hammerTimer)
      clearTimeout(this.hammerTimer2)
      clearInterval(this.hammerTimer3)
    }
  }
</script>
<style scoped>
  @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(180deg);}
  }

  .Rotation{
    animation: rotation 1s linear;
  }
  @keyframes rotation2{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(-180deg);}
  }

  .Rotation2{
    animation: rotation2 1s linear;
  }
  .packet-mask {
    background-color: rgba(0,0,0,0.95);
  }
  .position {
    width: 100%;
    height: 7rem;
    position: absolute;
  }
  .guang3 {
    background: url('../../images/spring-festival/guang3.png') no-repeat center center;
    background-size: contain;
    
  }
  .guang2 {
    background: url('../../images/spring-festival/guang2.png') no-repeat center center;
    background-size: contain;
    
  }
  .guang1 {
    background: url('../../images/spring-festival/guang1.png') no-repeat center center;
    background-size: contain;
    
  }
  .packet-mask .packet-ban {
    background: url('../../images/spring-festival/packet-ban.png') no-repeat center center;
    background-size: contain;
    width: 60%;
    height: 4rem;
    margin: 0 auto;
    position: relative;
    top: 3rem;
  }
  .packet-mask .packet-di {
    background: url('../../images/spring-festival/packet-di.png') no-repeat center center;
    background-size: contain;
    width: 100%;
    height: 4.5rem;
    margin: 0 auto;
    position: relative;
    text-align: center;
    color: #fce5bf;
    font-size: .35rem;
    padding-top: 2.8rem;
  }
  .packet-ban .ban {
    background: url('../../images/spring-festival/ban-min.png') no-repeat center center;
    background-size: contain;
    width: 86%;
    height: 3.4rem;
    position: absolute;
    transform: translateY(1.8rem) scale(0);
    left: 7%;
    padding-top: .9rem;
  }
  .packet-ban img {
    width: 30%;
  }
  .packet-ban .yuan {
    color: #c82718;
    background: #fbf123;
    border: 1px solid #c82718;
    border-radius: 50%;
    width: .3rem;
    height: .3rem;
    line-height: .35rem;
    display: inline-block;
    font-weight: bold;
    vertical-align: top;
    position: absolute;
  }
  .margin-b-1 {
    margin-bottom: .3rem;
  }
  .SpringFestival {
    
  }
  .header {
    position: relative;
  }
  .header img {
    vertical-align: top;
  }
  .header_tip {
    position: absolute;
    right: .3rem;
    bottom: .55rem;
    background: url('../../images/spring-festival/header-tip-min.png') no-repeat center center;
    background-size: contain;
    width: 58%;
    height: .8rem;
    line-height: .91rem;
    color: #830b08;
    font-size: .23rem;
    text-align: center;
    padding-left: .55rem;
  }
  .ft-red {
    color: #f60b11;
  }
  .contents {
    background-color: #fffde8;
  }
  .part1 {
    margin-top: -.73rem;
    position: relative;
    padding-bottom: .75rem;
  }
  .part1 .top, .part3 .top {
    text-align: left;
    float: left;
    margin-left: 8%;
    vertical-align: top;
  }
  .part1 .box, .part3 .box {
    clear: both;
    border-radius: 10px;
    background-color: #ffd4ac;
    border: solid 5px #830b08;
    width: 90%;
    margin: 0 auto;
    position: relative;
    color: #830b08;
  }
  .isLogin {
    padding: 0 .2rem .3rem;
  }
  .part1 .description {
    line-height: 1.54;
    text-align: justify;
    font-size: .23rem;
    padding: .2rem .3rem 0 ;
  }
  .part1 .investText {
    text-align: center;
    margin: .2rem auto .1rem;
    font-weight: bold;
    position: relative;
    font-size: .26rem;
  }
  .part1 .investText .detail {
    position: absolute;
    width: 1.5rem;
    height: .5rem;
    line-height: .45rem;
    color: #fff;
    background: url('../../images/spring-festival/detail.png') no-repeat right center;
    background-size: contain;
    right: -.2rem;
    top: -.05rem;
    font-size: .21rem;
    text-align: right;
    padding-right: .1rem;
  }
  .part1 .investAmount {
    line-height: 0.94;
    text-align: center;
    padding-left: .48rem;
    color: #e60027;
    font-size: .56rem;
    background: url('../../images/spring-festival/investBox.png') no-repeat center center;
    background-size: contain;
    width: 4rem;
    height: .8rem;
    line-height: .8rem;
    margin: 0 auto;
    font-family: initial;
  }
  .part1 .investBtn, .loginBtn {
    width: 3rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    color: #fefefe;
    background: url('../../images/spring-festival/btnBox-min.png') no-repeat center center;
    background-size: contain;
    margin: .2rem auto .05rem;
    font-size: .26rem;
  }
  .part1 .tips {
    font-size: .2rem;
    text-align: center;
    width: 110%;
    margin-left: -.2rem;
  }
  .part1 .totalPacket {
    font-size: .23rem;
    text-align: center;
    margin-top: .1rem;
  }
  .part1 .totalPacket .packet {
    vertical-align: sub;
    margin-right: .1rem;
    width: 5%;
  }
  .part1 .bgYellow {
    background: #ffdb3f;
    padding: .15rem;
    margin: .4rem auto .2rem;
  }
  .bgYellow img {
    width: 20%;
    vertical-align: text-bottom;
  }
  .bgYellow p {
    display: inline-block;
    text-align: left;
    line-height: 1.4;
  }
  .loginTip {
    color: #642a1a;
    font-size: .22rem;
  }
  .loginTip img {
    width: 7%;
    vertical-align: sub;
  }
  .bottoms .border {
    width: 94%;
    position: absolute;
    left: 3%;
    bottom: -.32rem;
  }
  .bottoms .lantern {
    width: 10%;
    position: absolute;
    z-index: 1;
    bottom: -.8rem;
    right: .45rem;
  }
  .bottoms .bottom-left, .bottoms .bottom-right {
    position: absolute;
    bottom: 0;
    width: 7%;
  }
  .bottoms .bottom-left {
    left: 0;
  }
  .bottoms .bottom-right {
    right: 0;
  }
  .activityEnd {
    padding: .3rem;
    position: relative;
  }
  .activityEnd img:nth-child(1) {
    width: 15%;
    position: absolute;
    top: .3rem;
    left: .8rem;
  }
  .activityEnd img:nth-child(2) {
    width: 70%;
    margin: .35rem 0 0 .2rem;
  }
  .activityEnd p {
    display: inline-block;
    font-size: .35rem;
    text-align: center;
	  color: #642a1a;
  }
  .jxq {
    position: fixed;
    right: 0;
    top: 12%;
    width: 10%;
    border-radius: 5px;
    background-color: #ffeead;
    border: solid 1.5px #830b08;
    padding: .05rem;
  }
  .rules {
    padding: .3rem .2rem;
  }
  .rule {
    overflow: hidden;
    margin-bottom: .25rem;
  }
  .rules .num {
    width: 7%;
    float: left;
  }
  .rules .content {
    width: 90%;
    float: right;
    line-height: 1.15;
    text-align: justify;
    color: #830b08;
  }
  .part3 {
    padding-bottom: .75rem;
  }
</style>
