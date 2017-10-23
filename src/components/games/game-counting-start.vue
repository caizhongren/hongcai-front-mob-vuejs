<template>
    <div class="gameStart">
      <div class="game-title">
        <img src="../../images/singles-day/bg-01.png" alt="" width="100%">
        <img src="../../images/singles-day/bg-02.png" class="title2" width="100%">
        <div class="rule">
          <img src="../../images/singles-day/start-rule.png" class="ruleBg fl">
          <img src="../../images/singles-day/start-rule.png" class="ruleBg fr">
          <div class="ruleIcon">游戏规则</div>
        </div>
      </div>
      <ul class="startBtns">
        <li>试玩练习</li>
        <li>开始数钱</li>
      </ul>
      <div class="box">
        <div class="moneyBox">
          <img src="../../images/singles-day/money-100.png" width="57%">
        </div>
      </div>
      <div class="record">游戏<br>记录</div>
    </div>
</template>
<script>
  // import GoldenAddress from './golden-adress.vue'
  export default {
    name: 'gameStart',
    data () {
      return {
      }
    },
    watch: {
    },
    props: ['token'],
    created () {
    },
    components: {
    },
    methods: {
      getRecordList () {}
    }
  }
</script>
<style scoped>
  .gameStart {
    background: #fbdc34;
    margin-top: 1rem; 
  }
  .game-title {
    position: relative;
    height: 4.4rem;
  }
  .game-title .title2 {
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
  }
  .rule {
    position: absolute;
    top: -.05rem;
    right: 37%;
    width: 15%;
  }
  .ruleBg {
    height: .6rem;
  }
  .ruleIcon {
    height: .5rem;
    line-height: .5rem;
    border-radius: .15rem;
    background-color: #fc2a42;
    border: solid 1px #4b0d00;
    font-size: .2rem;
    clear: both;
    width: 140%;
    color: #fffbfc;
    margin: 0 auto;
    text-align: center;
    position: relative;
    top: -.05rem;
    left: -17%;
    font-weight: 500;
    animation: ruleShow 1s 0s alternate;
    -moz-animation: ruleShow 1s 0s alternate;
    -webkit-animation: ruleShow 1s 0s alternate;
    -o-animation: ruleShow 1s 0s alternate;
  }
  .startBtns {
    margin: 0 auto;
    text-align: center;
    padding: .5rem 0 .2rem;
  }
  .startBtns li {
    display: inline-block;
    width: 35%;
    font-size: .22rem;
    height: .8rem;
    line-height: .78rem;
  }
  .startBtns li:nth-child(1) {
    color: #4f0709;
    background: url('../../images/singles-day/btn-green.png') no-repeat center center;
    background-size: contain;
    margin-right: .5rem;
  }
  .startBtns li:nth-child(2) {
    color: #ffffff;
    background: url('../../images/singles-day/btn-red.png') no-repeat center center;
    background-size: contain;
  }
  .moneyBox {
    position: fixed;
    bottom: -.4rem;
    left: 2.5%;
    width: 95%;
    height: 4.5rem;
    margin: 0 auto;
    background: url('../../images/singles-day/money-box.png') no-repeat center bottom;
    background-size: contain;
  }
  .box {
    background: #fbdc34;
    height: 4.5rem;
  }
  .record {
    width: 1rem;
    height: .75rem;
    line-height: 1.2;
    background: url('../../images/singles-day/rule-icon.png') no-repeat center bottom;
    background-size: contain;
    position: fixed;
    right: 0;
    top: 40%;
    padding: .1rem 0 .1rem .15rem;
    color: #fff;
    font-size: .24rem;
  }
  @keyframes ruleShow {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @-moz-keyframes ruleShow {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @-webkit-keyframes ruleShow
  {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
  @-o-keyframes ruleShow
  {
    0% {
      top: -2.1rem;
    }
    50% {
      top: -.1rem;
    }
    100% {
      top: -.05rem;
    }
  }
</style>
