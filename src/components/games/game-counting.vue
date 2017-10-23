<template>
  <div class="gameCounting">
    <div class="rewardTitle">
      <div class="rewardMoney">
        <span>¥</span><span class="money">0</span>
      </div>
    </div>
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
    </div>
    <div class="box">
      <div class="moneyBox">
        <img src="../../images/singles-day/money-100.png" width="57%">
      </div>
    </div>
  </div>
</template>
<script>
  // import GoldenAddress from './golden-adress.vue'
  export default {
    name: 'gameCounting',
    data () {
      return {
        warningText: 3,
        showWarning: true,
        showMask: true
      }
    },
    watch: {
    },
    props: ['token'],
    created () {
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
            that.showMask = false
          }, 1000)
        }
      }, 1000)
    },
    components: {
    },
    methods: {
      getRecordList () {}
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
  /* @-moz-keyframes gyrate {
    0% {
      transform: translateY(0.3rem);
    }
    100% {
      transform: translateY(-0.7rem);
    }
  }
  @-webkit-keyframes gyrate
  {
    0% {
      transform: translateY(0.3rem);
    }
    100% {
      transform: translateY(-0.7rem);
    }
  }
  @-o-keyframes gyrate
  {
    0% {
      transform: translateY(0.3rem);
    }
    100% {
      transform: translateY(-0.7rem);
    }
  } */
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
    margin-top: 1rem;
    overflow: hidden;
  }
  .rewardTitle {
    background: url('../../images/singles-day/reward-box.png') no-repeat center center;
    background-size: contain;
    width: 80%;
    height: 2.2rem;
    margin: 0 auto;
    color: #4f0709;
    padding: .3rem;
  }
  .money {
    font-family: ArialMT;
    font-size: .36rem;
  }
  .rewardMoney {
    overflow: hidden;
    height: .7rem;
    line-height: 1rem;
  }
  .rewardMoney span {
    float: left;
    font-weight: bold;
  }
  .rewardMoney span:nth-child(1) {
    font-size: .28rem;
    width: 1rem;
    text-align: left;
  }
  .box {
    background: #fbdc34;
    height: 7.15rem;
  }
  .moneyBox {
    position: fixed;
    /* z-index: 2; */
    bottom: -.4rem;
    left: 2.5%;
    width: 95%;
    height: 6.6rem;
    margin: 0 auto;
    background: url('../../images/singles-day/money-box.png') no-repeat center bottom;
    background-size: contain;
  }
</style>
