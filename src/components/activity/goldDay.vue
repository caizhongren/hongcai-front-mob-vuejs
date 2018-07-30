<template>
  <div class="goldDays">
    <audio preload="preload" id="reward"><source src="../../assets/reward.mp3"></audio>
    <div class="activity_time">2018年xx月xx日x时-xx月xx日x时</div>
    <div class="top_two">
      <p><img src="../../images/gold-day/received.png" alt=""><span>已收获特权本金</span><span>xxxx元</span></p>
      <p><img src="../../images/gold-day/speed.png" alt=""><span>当前产出速度</span><span>xxx元特权本金/小时</span></p>
    </div>
    <div class="harvest">
      <div class="crystal_ball">
        <span>1447元</span>
      </div>
      <button>立即收获</button>
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
      <span>我的累计年化出借金额：xxxxx元</span>
      <span>查看<br>详情</span>
    </div>
    <!-- 计算器入口 -->
    <div class="icon-calculator"></div>
    <!-- 计算器弹窗 -->
    <Gold-Calculator v-show="showCalculator" :isCalculator="isCalculator" :isTips="isTips"></Gold-Calculator>
  </div>
</template>
<script>
  import GoldCalculator from './goldCalculator'
  export default {
    data () {
      return {
        showCalculator: false,
        isCalculator: false, // 年化出借计算器
        isTips: 0 // 0 不显示提示 1 温馨提示 2 活动已结束
      }
    },
    props: [],
    mounted () {
    },
    created () {
    },
    methods: {
    },
    components: {
      GoldCalculator
    },
    destroyed () {
    }
  }
</script>

<style scoped>
  .goldDays {
    height: 20rem;
    background: url(../../images/gold-day/gold_day_bg.png) no-repeat;
    background-color: #3aeaea;
    background-size: 100%;
  }
  .activity_time{
    padding-top: 2.78rem;
    text-indent: 1.3rem;
    font-size: .23rem;
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
  .top_two p span:last-child{
    font-size: .25rem;
  }
  .harvest{
    padding: 0 .3rem;
  }
  .harvest .crystal_ball{
    height: 4.5rem;
    background: url(../../images/gold-day/crystal_ball.png) no-repeat center;
    background-position-y: -.4rem;
    background-size: 85% 100%;
  }
  .harvest .crystal_ball span{
    display: block;
    padding-top: 1.2rem;
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
  }
  .check_details{
    height: .9rem;
    font-size: .3rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding-right: .28rem;
    color: #9a540e;
  }
  .check_details span:first-child{
    line-height: .9rem;
    background-color: #ffcc02;
    position: relative;
    z-index: 2;   
  }
  .check_details span:first-child:after{
    content: '';
    width: .9rem;
    height: .9rem;
    position: absolute;
    right: -.45rem;
    border-radius: 50%;
    background-color: #ffcc02;
    z-index: -5;
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
</style>
