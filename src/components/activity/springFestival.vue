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
          <!-- 活动未结束 -->
          <div v-if="activityEnd !== 2">
            <p class="description">活动期间，新增投资宏财精选、宏财尊贵项目(不含债权转让项目)，累计年化投资金额达到指定额度，即可领取相应现金红包奖励喔！</p>
            <div v-if="token" class="isLogin">
              <p class="investText">我的累计年化投资金额<span class="detail" @click="toRecord()" v-show="investAmount >0">查看详情</span></p>
              <div class="investAmount">{{investAmount}}元</div>
              <div class="investBtn" @click="toProjectList()" v-show="activityStatus === 1">立即投资</div>
              <div class="tips" v-show="activityStatus === 1 && investAmount < 300000">累计年化投资金额还差<span class="ft-red">{{shortAmount}}元</span>，即可领取<span class="ft-red">{{gettingRedPacket}}元</span>现金红包！</div>
              <div class="totalPacket" v-show="totalPacket >0"><img class="packet" src="../../images/spring-festival/envelope-1-min.png" /> 已领取到红包共计：<span class="ft-red">{{totalPacket}}元</span></div>
            </div>
            <div v-if="!token" class="margin-b-1">
              <div class="bgYellow">
                <img src="../../images/spring-festival/hongbao-min.png" alt="">
                <p class="maxPacket">累计最高可领 <br>  <span class="ft-red">1888元</span>现金红包哟！</p>
              </div>
              <p class="loginTip">登录即可查看<img src="../../images/spring-festival/coin.png" alt=""> 当前累计年化投资金额</p>
              <div class="loginBtn" @click="toLogin()">前往登陆</div>
            </div>
          </div>
          <!-- 活动结束 -->
          <div v-if="activityEnd === 2" class="activityEnd">
            <img src="../../images/spring-festival/activityEnd.png" alt="">
            <img src="../../images/spring-festival/activityEndText.png" alt="" class="activityEndText">
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
      <div class="chat-tip">左右滑动<br>领取红包</div>
      <div class="part2" v-if="token">
        <div class="position-re carousel-mask">
          <div id="wrapper">
            <ul class="poster-list clearfix clear">
              <li v-for="(item,index) in levelStatus">
                <div class="red_bag_bg" :class="{'ed' : item === 1}">
                  <img src="../../images/spring-festival/wdb.png" width="40%" class="chai display-bl" alt="" v-if="investAmount < conditions[index] && item === 0" @click="takeReward(index = 1)">
                  <img src="../../images/spring-festival/chai.png" width="40%" class="chai display-bl" alt="" v-if="investAmount >= conditions[index] && item === 0" @click="takeReward(index + 1)">
                  <img :src="'../../static/images/' + packets[index] + '.png'" alt="" :width="imgWidths[index]" class="value" v-if="item !== 1">
                  <img src="../../images/spring-festival/yuan.png" alt="" width="13%" v-if="item !== 1">
                  <p class="condition" v-if="item !== 1">≥{{conditions[index]}}元可拆红包</p>
                  <div class="chaied" v-if="item === 1">
                    <span class="circle">元</span>
                    <img :src="'../../static/images/d' + packets[index] + '.png'" width="17%" class="text">
                    <div class="congratulate">恭喜您获得</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="calcu-tip clearfix">
        <!-- <img src="../../images/spring-festival/jsq.png" width="12%" class="fl" alt=""> -->
        <!-- 年化投资金额=投资金额x项目期限/365天 -->
        红包<br>
        <div @click="getPacket(5)">领取红包</div>
      </div>
      <!-- 活动规则 -->
      <div class="part3">
        <img src="../../images/spring-festival/rule-title-min.png" alt="" width="30%" class="top">
        <div class="box rules">
          <div class="rule">
            <img src="../../images/spring-festival/lantern.png" alt="" class="num">
            <div class="content">
              活动时间 <br>
              本次活动仅限于2017年xx月xx日至2017年xx月xx日内参与有效，活动期间，可随时拆红包领现金，如活动结束后3个工作日内仍未领取奖励，将视为自动放弃奖励；
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
        <div class="ban"><img v-bind:src="rewardSrc" alt="" v-bind:style="{width:imgSize[rewardMoney]}"><span class="yuan">元</span></div>
        <div class="packet-di">恭喜您获得</div>
    </div>
      <img src="../../images/break-egg/icon-close.png" width="12%" alt="" @click="showMask = false" style="margin-top: 3.6rem;">
    </div>
    <img src="../../images/spring-festival/jsq.png" alt="" class="jxq" @click="showCalculator = true">
  </div>
</template>
<script>
  import {Carousel} from '../../service/mCarousel'
  import {bridgeUtil, ModalHelper} from '../../service/Utils'
  import $ from 'zepto'
  import SpringCalculator from './SpringCalculator.vue'
  export default {
    props: ['token'],
    data () {
      return {
        investAmount: 555, // 累计年化投资金额
        shortAmount: 2000, // 累计年化投资还差多少钱
        gettingRedPacket: 18, // 即可领取的红包金额
        totalPacket: 0, // 一共领取的红包金额
        activityStatus: 1, // 1 正常 2 结束
        activityEnd: 1, // 1 -活动结束3个工作日内 2 —活动结束3个工作日后
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
        levelStatus: [1, 1, 0, 0, 0, 0],
        packets: [5, 35, 90, 120, 350, 1288],
        imgWidths: ['10%', '20%', '20%', '24%', '26%', '30%'],
        conditions: [1000, 10000, 30000, 50000, 100000, 300000],
        showMask: false,
        rewardSrc: '',
        rewardMoney: 5,
        imgSize: {'5': '28%', '35': '50%', '90': '50%', '120': '65%', '350': '60%', '1288': '65%'},
        hammerTimer: null,
        showCalculator: false
      }
    },
    created () {
      this.calculator()
      this.getLevalStatus()
    },
    mounted () {
      var that = this
      var wrapper = document.getElementById('wrapper')
      Carousel.mCarousel(wrapper, {
        index: 2,
        active: 'active',
        scale: 0.67,
        duration: 300,
        locked: true,
        diff: 0.45,
        before: function () { // 动画执行中不可拆红包
          that.canOpen = false
        },
        after: function () {
          that.canOpen = true
        }
      })
    },
    watch: {
      token: function (val) {
        val ? this.getLevalStatus() : null
      },
      showMask (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    methods: {
      getPacket (rewardMoney) {
        var that = this
        that.showMask = true
        that.rewardMoney = rewardMoney
        that.rewardSrc = '../../../static/images/spring-' + rewardMoney + '.png'
        var transY = 1.8
        var scale = 0.5
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
      },
      calculator () {
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
      toLogin () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {
        }, null)
      },
      toProjectList () {
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {
        }, null)
      },
      getLevalStatus () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/newYear/levelStatus?token=' + this.token
        }).then((response) => {
          if (!response.data || response.data.ret === -1) {
            return
          }
          this.levelStatus = response.data.status
        })
      },
      takeReward (level) {
        this.$http.post('/hongcai/rest/activitys/newYear/takeReward', {
          token: this.token,
          level: level
        }).then((response) => {
          console.log(response.data === '')
          if (!response.data || response.data.ret === -1) {
            return
          }
        })
      },
      closeCalculator () {
        this.showCalculator = false
      }
    },
    components: {SpringCalculator}
  }
</script>
<style scoped>
  @keyframes rotation{
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
    padding-bottom: .5rem;
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
    padding: 0 .2rem .2rem;
  }
  .part1 .description {
    line-height: 1.54;
    text-align: justify;
    font-size: .23rem;
    padding: .2rem .2rem 0 ;
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
    padding: .3rem;
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
  .part2 {
    margin-top: -0.1rem;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .chat-tip {
    padding-top: .13rem;
    margin-left: 7%;
    width: 1.35rem;
    height: 1rem;
    background: url('../../images/spring-festival/chat-tip.png') no-repeat center center;
    background-size: contain;
    color: #ffd93f;
    font-size: .23rem;
    line-height: 1.2;
  }
  #wrapper {
    height: 3.6rem;
  }
  .poster-list li {
    width: 72%;
    margin: 0 auto;
    height: 100%;
  }
  .carousel-mask {
    width: 78%;
    margin: 0 auto;
  }
  .poster-list li .red_bag_bg {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: .24rem;
    background: url('../../images/spring-festival/hongbao-3-min.png') no-repeat center center;
    background-size: contain;
  }
  .poster-list li .red_bag_bg.ed {
    background: url('../../images/spring-festival/chaied.png') no-repeat center center;
    background-size: contain;
  }
  .red_bag_bg .chai {
    padding-top: 13%;
    margin: 0 auto;    
  }
  .red_bag_bg .chaied .text {
    font-size: 1rem;
    color: #fbf223;
    object-fit: contain;
    font-family: CTCuYuanSF;
    -webkit-text-stroke: 2px #c82718;
    padding-top: .6rem;
  }
  .red_bag_bg .chaied .circle {
    display: block;
    text-align: center;
    position: absolute;
    right: 20%;
    top: 7%;
    line-height: .35rem;
    height: .3rem;
    width: .3rem;
    border-radius: 50%;
    color: #c82718;
    background-color: #fbf123;
    border: solid 1px #e60027;
  }
  .red_bag_bg .chaied .congratulate {
    margin-top: 34%;
    font-size: .34rem;
    line-height: 0.87;
    text-align: center;
    color: #fce5bf;
  }
  .red_bag_bg .value  {
    margin: .03rem .1rem 0 0;
  }
  .red_bag_bg p {
    padding: .13rem 0 .07rem .3rem;
    width: 76%;
    margin: 0 auto;
    background: url('../../images/spring-festival/investBox.png') no-repeat center center;
    background-size: 100% 100%;
    color: #642a1a;
  }
  .calcu-tip {
    width: 83%;
    height: .5rem;
    margin: .3rem auto;
    /* background: url('../../images/spring-festival/header-tip-min.png') no-repeat 0 0; */
    background: url('../../images/spring-festival/cal-tip.png') no-repeat 0 0;
    background-size: 100% 100%;
  }
</style>
