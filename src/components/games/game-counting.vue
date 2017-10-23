<template>
    <div class="gameCounting">
      <div class="rewardMoney">
        <span>¥</span><span class="money">0</span>
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
  .gameCounting {
    background: #fbdc34;
    padding: 0.5rem 0;
    margin-top: 1rem; 
  }
  .rewardMoney {
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
    font-size: .32rem;
  }
  .rewardMoney span {
    display: inline-block;
    float: left;
  }
  .rewardMoney span:nth-child(1) {
    font-size: .24rem;
  }
  .box {
    background: #fbdc34;
    height: 7.15rem;
  }
  .moneyBox {
    position: fixed;
    bottom: -.4rem;
    left: 2.5%;
    width: 95%;
    height: 6.6rem;
    margin: 0 auto;
    background: url('../../images/singles-day/money-box.png') no-repeat center bottom;
    background-size: contain;
  }
</style>
