<template>
  <div class="SpringFestival">
    <div class="header">
      <img src="../../images/spring-festival/header-min_01.png" alt="" width="100%">
      <img src="../../images/spring-festival/header-min_02.png" alt="" width="100%">
      <img src="../../images/spring-festival/header-min_03.png" alt="" width="100%">
      <img src="../../images/spring-festival/header-min_04.png" alt="" width="100%">
      <div class="header_tip">累计最高可领<span class="ft-red">1888</span>元现金</div>
    </div>
    <div class="contents">
      <!-- 累计年化投资金额 -->
      <div class="part1">
        <img src="../../images/spring-festival/bg-title-min.png" alt="" width="30%" class="top">
        <div class="box">
          <!-- 活动结束 -->
          <div v-if="(activityStatus === 3 && investAmount <= 0) || (activityStatus === 2 && investAmount <= 0)" class="activityEnd">
            <img src="../../images/spring-festival/activityEnd.png" alt="">
            <img src="../../images/spring-festival/activityEndText.png" alt="" class="activityEndText">
          </div>
          <!-- 活动未结束 -->
          <div v-else>
            <p class="description">活动期间，新增投资宏财精选、宏财尊贵项目(不含债权转让项目)，累计年化投资金额达到指定额度，即可领取相应现金红包奖励喔！</p>
            <div v-if="token" class="isLogin">
              <p class="investText">我的累计年化投资金额<span class="detail" @click="toRecord()" v-show="investAmount > 0">查看详情</span></p>
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
            <img src="../../images/spring-festival/bottom-left-min.png" alt="" class="bottom-left">
            <img src="../../images/spring-festival/bottom-right-min.png" alt="" class="bottom-right">
          </div>
        </div>
      </div>
      <!-- 红包 -->
      <div class="calcu-tip clearfix">
        <img src="../../images/spring-festival/jsq.png" width="10%" class="fl" alt="">
        <div><p>年化投资金额=投资金额x项目期限/365天</p></div>
      </div>
      <div class="chat-tip" v-if="token && activityStatus === 1 || token && activityStatus === 2 && investAmount > 0">左右滑动<br>领取红包</div>
      <div class="part2" v-if="token">
        <div class="position-re carousel-mask" v-if="activityStatus === 1 || activityStatus === 2 && investAmount > 0">
          <div id="wrapper">
            <ul class="poster-list clearfix clear">
              <li v-for="(item, index) in packetList">
                <div class="red_bag_bg" :class="{'ed' : item.status === 1}">
                  <img src="../../images/spring-festival/wdb.png" width="40%" class="chai display-bl" alt="" v-if="investAmount < item.limitAmount && item.status === 0">
                  <img src="../../images/spring-festival/chai.png" width="40%" class="chai display-bl" alt="" v-if="investAmount >= item.limitAmount && item.status === 0" @click="takeReward(index + 1, levelStatus[index], item.amount)">
                  <img :src="'../../static/images/' + item.amount + '.png'" alt="" :width="item.imgWidth" class="value" v-if="item.status !== 1">
                  <img src="../../images/spring-festival/yuan.png" alt="" width="11%" v-if="item.status !== 1">
                  <p class="condition" v-if="item.status !== 1">≥{{item.limitAmount}}元可拆红包</p>
                  <div class="chaied" v-if="item.status === 1">
                    <span class="circle">元</span>
                    <img :src="'../../static/images/d' + packetList[index].amount + '.png'" :width="packetList[index].imgedWidth" class="text">
                    <div class="congratulate">恭喜您获得</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="activityStatus === 3 || activityStatus === 2 && investAmount <= 0" class="packet-end">
          <img src="../../images/spring-festival/text-end-min.png" alt="" width="38%" class="display-bl margin-auto">
        </div>
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
              领取的现金红包奖励，将直接发放至您的账户>>可用余额中，可用于投资或提现；
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
<style scoped>
  .packet-mask {
    background-color: rgba(0,0,0,0.95);
    overflow: hidden;
    padding-top: .5rem;
  }
  .position {
    width: 100%;
    height: 6rem;
    position: absolute;
    opacity: .7;
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
    top: 7%;
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
    margin-top: -.2rem;
  }
  .margin-b-1 {
    margin-bottom: .3rem;
  }
  .header {
    position: relative;
    background: #f60b11;
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
    background-color: #faf1d0;
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
    text-align: center;
    padding-left: .48rem;
    color: #e60027;
    font-size: .56rem;
    background: url('../../images/spring-festival/investBox.png') no-repeat center center;
    background-size: contain;
    width: 4rem;
    height: .8rem;
    line-height: .87rem;
    margin: 0 auto;
    font-family: initial;
  }
  .part1 .investBtn, .loginBtn {
    width: 3rem;
    height: .8rem;
    line-height: .85rem;
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
    top: 15%;
    width: 10%;
    border-radius: 5px;
    background-color: #ffeead;
    border: solid 1.5px #830b08;
    padding: .05rem;
    z-index: 2;
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
    font-size: .23rem;
  }
  .part3 {
    padding-bottom: .75rem;
  }
  .part2 {
    margin-top: -0.1rem;
    margin-bottom: .3rem;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .chat-tip {
    padding-top: .155rem;
    margin-left: 7%;
    width: 1.35rem;
    height: 1rem;
    background: url('../../images/spring-festival/chat-tip.png') no-repeat center center;
    background-size: contain;
    color: #ffd93f;
    font-size: .23rem;
    line-height: 1.2;
  }
  .part2 .packet-end {
    width: 54%;
    height: 3.6rem;
    margin: 0.4rem auto;
    padding: .56rem 0 0 0;
    background: url('../../images/spring-festival/chaied.png') no-repeat center center;
    background-size: 100% 100%;
  }
  #wrapper {
    height: 3.6rem;
    width: 100%;
  }
  .poster-list li {
    width: 72%;
    /* margin: 0 auto; */
    height: 100%;
  }
  .carousel-mask {
    width: 78%;
    height: 4rem;
    margin: 0 auto;
    background: url('../../images/spring-festival/indexBottom-min.png') no-repeat center bottom;
    background-size: contain;
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
    padding-top: .65rem;
  }
  .red_bag_bg .chaied .circle {
    display: block;
    text-align: center;
    position: absolute;
    right: 22%;
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
    margin-top: 35%;
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
    line-height: .45rem;
    margin: .0rem auto 0.15rem;
    background-size: 100% 100%;
    background-color: #fffb47;
    border: solid 1px #62422e;
    border-radius: .1rem;
    color: #642a1a;
  }
  .calcu-tip img {
    margin-top: -0.04rem;
    margin-left: -0.022rem;
  }
  .calcu-tip div {
    height: 93%;
    width: 99.2%;
    margin: 0.33% auto;
    border: solid 1px #62422e;
    border-radius: .1rem;
    background-color: #ffeead;
  }
</style>
<script>
  import {Carousel} from '../../service/mCarousel'
  import {bridgeUtil, ModalHelper} from '../../service/Utils'
  import $ from 'zepto'
  import SpringCalculator from './SpringCalculator.vue'
  export default {
    data () {
      return {
        investAmount: 0, // 累计年化投资金额
        shortAmount: 0, // 累计年化投资还差多少钱
        gettingRedPacket: 0, // 即可领取的红包金额
        totalPacket: 0, // 一共领取的红包金额
        activityStatus: 1, // 1 正常 2 结束
        current: 0, // 当前显示的红包index
        canGetAmount: 0, // 年化金额达到可领取的红包数量
        canTakePackets: [], // 达标并且可以领的红包
        takedPackets: [], // 领过的红包
        packetList: [
          {
            id: 0,
            status: 0, // 0 未拆 1 已拆
            amount: 5,
            limitAmount: 1000,
            imgWidth: '10%', // 红包文字图片宽度
            imgedWidth: '14%' // 拆过的文字图片宽
          },
          {
            id: 1,
            status: 0,
            amount: 35,
            limitAmount: 10000,
            imgWidth: '20%',
            imgedWidth: '28.6%'
          },
          {
            id: 2,
            status: 0,
            amount: 90,
            limitAmount: 30000,
            imgWidth: '20%',
            imgedWidth: '28.6%'
          },
          {
            id: 3,
            status: 0,
            amount: 120,
            limitAmount: 50000,
            imgWidth: '24%',
            imgedWidth: '40%'
          },
          {
            id: 4,
            status: 0,
            amount: 350,
            limitAmount: 100000,
            imgWidth: '26%',
            imgedWidth: '40%'
          },
          {
            id: 5,
            status: 0,
            amount: 1288,
            limitAmount: 300000,
            imgWidth: '30%',
            imgedWidth: '53%'
          }
        ],
        levelStatus: [],
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
        },
        canTake: true, // 红包切换过程中不可领取
        busy: false, // 防止多次点击领取
        serverTime: new Date().getTime()
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val ? this.getLevelStatus() : null
      },
      showMask (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
        val ? null : (clearInterval(this.hammerTimer), clearInterval(this.hammerTimer2), clearInterval(this.hammerTimer3))
      }
    },
    created () {
      this.getActivityStatus()
      this.token ? this.getLevelStatus() : null
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http({ // 获取服务器时间
          method: 'get',
          url: '/hongcai/rest/systems/serverTime'
        }).then((response) => {
          that.serverTime = response.data.time
          that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
            if (that.serverTime - res.data.endTime > 3 * 24 * 60 * 60 * 1000) {
              that.activityStatus = 3 // 活动结束3天后
            } else {
              that.activityStatus = res.data.status
            }
            // 获取活动开始、结束时间
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
        })
      },
      setCarousel (current) { // 红包布局配置
        var that = this
        var wrapper = document.getElementById('wrapper')
        if (that.activityStatus !== 3) {
          Carousel.mCarousel(wrapper, {
            index: current,
            active: 'active',
            scale: 0.67,
            duration: 300,
            locked: true,
            diff: 0.47,
            before: function () { // 动画执行中不可拆红包
              that.canTake = false
            },
            after: function () {
              that.canTake = true
            }
          })
        }
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
          rotate += 3
          $('.Rotation').css('transform', 'rotate(' + rotate + 'deg')
          document.querySelector('.Rotation').style.webkitTransform = 'rotate(' + rotate + 'deg'
        }, 100)
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
        this.$router.push({name: 'SpringRecord', query: {act: this.$route.query.act}})
      },
      toNative (HCNative) {
        bridgeUtil.webConnectNative(HCNative, undefined, {}, function (response) {
        }, null)
      },
      getLevelStatus () {
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/annualInvestAmount?token=' + that.token + '&activityType=' + that.$route.query.act)
        .then(function (res) { // 获取累计年化投资金额
          if (!res || res.ret === -1) {
            that.setCarousel(0)
            return
          }
          that.investAmount = res.data.annualInvest || 0
          that.calculator()
          that.$http({ // 获取各档位红包状态
            method: 'get',
            url: '/hongcai/rest/activitys/newYear/levelStatus?token=' + that.token
          }).then((response) => {
            if (!response.data || response.data.ret === -1) {
              that.setCarousel(0)
              return
            }
            that.levelStatus = response.data.status
            let canTakePackets = []
            let takedPackets = []
            let index = 0
            let len = 0
            for (let i = 0; i < response.data.status.length; i++) {
              that.packetList[i].status = response.data.status[i]
              if (response.data.status[i] === 0 && that.investAmount >= that.packetList[i].limitAmount) {
                canTakePackets[i] = that.packetList[i]
              } else if (response.data.status[i] === 1) {
                takedPackets[i] = that.packetList[i]
                that.totalPacket += that.packetList[i].amount
              }
            }
            // 判断是否已领过红包
            index = takedPackets.length === 0 ? 0 : takedPackets.length === 6 ? 5 : takedPackets[takedPackets.length - 1].id + 1
            len = canTakePackets.length - 1
            let current = canTakePackets.length > 0 ? canTakePackets[len].id : index
            that.setCarousel(current)
          }).catch((err) => {
            console.log(err)
            that.setCarousel(0)
          })
        }).catch((err) => {
          console.log(err)
          that.setCarousel(0)
        })
      },
      takeReward (level, status, rewardMoney) { // 领取红包
        if (this.busy || !this.canTake || Carousel.index !== (level - 1) || status !== 0) {
          return
        }
        this.busy = true
        var that = this
        that.$http.post('/hongcai/rest/activitys/newYear/takeReward', {
          token: this.token,
          level: level
        }).then((response) => {
          that.busy = false
          if (response.data !== 'success') {
            return
          }
          let key = level - 1
          that.packetList[key].status = 1 // 手动修改红包的领取状态为 1
          that.showMask = true
          that.rewardMoney = rewardMoney
          that.totalPacket += rewardMoney
          that.rewardSrc = '../../../static/images/spring-' + rewardMoney + '.png'
          that.GuangRotation()
        })
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
