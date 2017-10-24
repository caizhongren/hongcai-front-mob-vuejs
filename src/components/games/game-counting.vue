<template>
  <div class="gameCounting" v-auto-height>
    <div class="rewardTitle">
      <div class="rewardMoney">
        <span>¥</span><span class="money">{{rewardMoney}}</span>
      </div>
      <div class="countTimes">
        <div class="countDown fl">
          <img src="../../images/singles-day/clock.png" class="clock">
          {{countTimer}}S
        </div>
        <div class="gameCounts fr">剩余次数：{{gameCounts}}次</div> 
      </div>
    </div>
    <!-- <div class="box"> -->
      <div class="moneyBox">
        <img src="../../images/singles-day/money-100.png" width="57%">
      </div>
    <!-- </div> -->
    <div class="mask-common first-mask" v-show="showMask">
      <!-- 首次游戏引导蒙层 -->
      <div v-show="false">
        <p class="mask-title">抢到多少，就送多少</p>
        <div class="mask-content">
          <img src="../../images/singles-day/top-hand.png" alt="" width="8%">
          上滑抢钞票
          <img src="../../images/singles-day/icon-01.png" alt="" width="8%">
          不止给你100块！<br>
          有机会出现面值500元和10000元的钞票哦！
        </div>
      </div>
      <!-- 高能预警 -->
      <div class="start-mask" v-show="showWarning">
        <div class="warning">
          <img src="../../images/singles-day/emoji-02.png" alt="" width="28%">
          <span>高能预警</span>
        </div>
        <div class="count-down">{{warningText}}</div>
      </div>
      <!-- 获得奖励 -->
      <div class="reward-mask" v-show="showReward">
        <div class="rewardBox" v-if="rewardMoney >0">
          <p v-if="gameType === 1">恭喜您获得</p>
          <p v-if="gameType === 2">恭喜您数出</p>
          <div class="rewardBg">
            <P>特权本金</P>
            <P>￥<span>{{rewardMoney}}</span></P>
            <p>有效期1天</p>
          </div>
          <div v-if="gameType === 2" class="demo">试玩将不会获得奖励，练好手速就去正式玩一局吧！</div>
          <ul class="rewardBtns">
            <li v-if="gameType === 1" @click="toPriviledge">查看特权本金</li>
            <li v-if="gameType === 2" @click="goBack">返回</li>
            <li @click="startAgin()">再玩一次</li>
          </ul>
        </div>
        <div class="NoReward" v-if="rewardMoney <=0">
          <img src="../../images/singles-day/emoji-04.png" width="25%">
          100块都没数到...
          <div class="startAginBtn" @click="startAgin()">再玩一次</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  // import GoldenAddress from './golden-adress.vue'
  export default {
    name: 'gameCounting',
    data () {
      return {
        warningText: 3,
        showWarning: false,
        showMask: false,
        showReward: false,
        rewardMoney: 550,
        countTimer: 15,
        gameCounts: 5,
        gameType: Number(this.$route.params.gameType)
      }
    },
    watch: {
    },
    props: ['token'],
    created () {
      this.gameType = Number(this.$route.params.gameType)
    },
    mounted () {
      var that = this
      var warningTimer = setInterval(function () {
        that.warningText -= 1
        if (that.warningText === 0) {
          that.warningText = (that.warningText.toString() + '开始').slice(-2)
          clearInterval(warningTimer)
          setInterval(function () {
            that.showWarning = false
            // that.showMask = false
          }, 1000)
        }
      }, 1000)
    },
    components: {
    },
    methods: {
      toPriviledge () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_GoPrivilegedCapital', undefined, {}, function (res) {
          that.closeMask()
        }, null)
      },
      startAgin () {
        var that = this
        if (that.gameType === 1 && that.gameCounts <= 0) {
          that.$router.push({name: 'gameOver'})
        } else {
          that.showMask = false
          that.showReward = false
        }
      },
      goBack () {
        this.$router.push({name: 'gameStart'})
      }
    }
  }
</script>
<style scoped>
  /* 首次引导弹窗 */
  .mask-common.first-mask {
    z-index: 1;
  }
  .mask-title {
    padding-top: 1rem;
    font-size: .36rem;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
  }
  .mask-content {
    color: #fff;
    text-align: center;
    line-height: 1.8;
    margin: 0;
  }
  .mask-content img {
    display: inline-block;
  }
  /* 高能预警 */
  .start-mask {
    z-index: 3;
  }
  .start-mask .warning {
    padding-top: 2.4rem;
    font-size: .5rem;
    letter-spacing: 1.5px;
    color: #ffffff;
    width: 49%;
    margin: 0 auto;
  }
  .warning img {
    float: left;
    margin-top: -.2rem;
  }
  .start-mask .count-down {
    margin-top: 1.4rem;
    font-family: ArialMT;
    font-size: 1rem;
    letter-spacing: 2.9px;
    color: #ffffff;
  }
  /* animation */
  @keyframes gyrate {
    0% {
      transform: translateY(0.3rem);
    }
    100% {
      transform: translateY(-0.7rem);
    }
  }
  .moneyBox img.example {
    transform: translateY(.3rem);
    animation: gyrate .8s 0s infinite alternate;
    -moz-animation: gyrate .8s 0s infinite alternate;
    -webkit-animation: gyrate .8s 0s infinite alternate;
    -o-animation: gyrate .8s 0s infinite alternate;
  }
  .gameCounting {
    background: #fbdc34;
    padding: 0.5rem 0;
    overflow: hidden;
  }
  .rewardTitle {
    background: url('../../images/singles-day/reward-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 80%;
    height: 2rem;
    margin: 0 auto;
    color: #4f0709;
    padding: .3rem;
    margin-top: .5rem;
  }
  .money {
    font-family: ArialMT;
    font-size: .48rem;
    text-align: center;
    width: 65%;
  }
  .rewardMoney {
    overflow: hidden;
    height: .7rem;
    line-height: .8rem;
  }
  .rewardMoney span {
    float: left;
    font-weight: bold;
  }
  .rewardMoney span:nth-child(1) {
    font-size: .4rem;
    width: 15%;
    text-align: left;
    margin-left: .1rem;
  }
  .moneyBox {
    position: fixed;
    /* z-index: 2; */
    bottom: -.8rem;
    left: 2.5%;
    width: 95%;
    height: 7.2rem;
    margin: 0 auto;
    background: url('../../images/singles-day/money-box.png') no-repeat center 91%;
    background-size: contain;
  }
  .countTimes {
    overflow: hidden;
    clear: both;
    font-size: .28rem;
    text-align: left;
    margin-top: .3rem;
    font-weight: bold;
  }
  .clock {
    width: 22%;
    vertical-align: text-top;
    margin-right: .15rem;
  }
  .rewardBtns {
    margin: 0 auto;
    text-align: center;
    padding: .8rem 0 .2rem;
  }
  .rewardBtns li {
    display: inline-block;
    width: 35%;
    font-size: .22rem;
    height: .8rem;
    line-height: .85rem;
  }
  .rewardBtns li:nth-child(1) {
    color: #4f0709;
    background: url('../../images/singles-day/btn-green.png') no-repeat center center;
    background-size: contain;
    margin-right: .5rem;
  }
  .rewardBtns li:nth-child(2) {
    color: #ffffff;
    background: url('../../images/singles-day/btn-red.png') no-repeat center center;
    background-size: contain;
  } 
  .startAginBtn {
    color: #ffffff;
    background: url('../../images/singles-day/btn-red-long.png') no-repeat center center;
    background-size: contain;
    width: 90%;
    font-size: .24rem;
    height: .8rem;
    line-height: .85rem;
    text-align: center;
    margin: 1rem auto 0;
  }
  .rewardBox {
    padding: 2.5rem .5rem 0;
    font-family: MicrosoftYaHei;
  }
  .rewardBox>p:nth-child(1) {
    font-size: .38rem;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    margin-left: .6rem;
  }
  .rewardBg {
    width: 90%;
    margin: 0 auto;
    background: url('../../images/singles-day/reward.png') no-repeat center center;
    background-size: 100% 100%;
    height: 2.5rem;
    padding-top: .8rem;
  }
  .rewardBg p {
    line-height: 1.21;
    text-align: center;
    color: #4b0d00;
  }
  .rewardBg p:nth-child(1) {
    font-size: .45rem;
  }
  .rewardBg p:nth-child(2) {
    font-size: .3rem;
    padding: .035rem 0;
  }
  .rewardBg p:nth-child(2) span {
    font-family: fantasy;
    font-size: .45rem;
    color: #fc2a42;
  }
  .rewardBg p:nth-child(3) {
    font-size: .21rem;
    margin-top: .1rem;
  }
  .rewardBox .demo {
    font-size: .2rem;
    text-align: justify;
    color: #ffffff;
    width: 85%;
    margin: .2rem auto 0;
  }
  .NoReward {
    padding: 2.5rem 1rem 0;
    font-size: .38rem;
    font-weight: bold;
    text-align: justify;
    color: #ffffff;
    vertical-align: middle;
  }
</style>
