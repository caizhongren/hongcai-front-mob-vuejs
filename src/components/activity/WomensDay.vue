<template>
  <div class="women-day" v-auto-height>
    <!-- <img src="../../images/women/women-header.png" width="100%" class="display-bl position-re" alt=""> -->
    <img src="../../images/women/flower.png" width="96%" class="header display-bl position-re" alt="">
    <div class="rule">
      截止2018年3月8日0点之前，凡在宏财网<span class="ft-y">在投总资产≥100元</span>的<span class="ft-y">女性投资用户</span>均可于妇女节当天获得宏财网提供的<span class="ft-y">【女王红包】18888元</span>特权本金奖励(有效期1天)
    </div>
    <div class="women-legend">
      <div class="calculate clearfix">
        <div class="item">
          <img src="../../images/women/text1.png" alt="" class="display-bl margin-auto" width="38%">
        </div>
        <span>
          +
        </span>
        <div class="item">
          <img src="../../images/women/text2.png" alt="" class="display-bl margin-auto" width="38%">
        </div>
        <span>
          +
        </span>
        <div class="item">
          <img src="../../images/women/text3.png" alt="" class="display-bl margin-auto" width="38%">
        </div>
        <span>
          ≥
        </span>
        <img src="../../images/women/100.png" alt="" class="display-bl amount" width="18%">
      </div>
      <div class="legend">
        <div></div>
        <div></div>
        <p>*以实名认证信息为准</p>
        <p>(有效期1天)</p>
      </div>
    </div>
  </div>
</template>
<style>
  .women-day {
    background-color: #fddcde;
    overflow: hidden;
  }
  .header {
    margin-left: 4%;
  }
  .rule {
    padding: .35rem .4rem .25rem;
    height: 20%;
    width: 90%;
    margin: -0.28rem auto 1rem;
    background: url('../../images/women/pink-bg.png') no-repeat top center;
    background-size: 100% 100%;
    font-size: .22rem;
    line-height: 1.7;
    text-align: justify;
    color: #a2185a;
  }
  @media (min-height: 736px) and (max-height: 800px) {
    .rule {
      height: 22%;
      padding: .35rem .4rem .25rem;
      font-size: .24rem;
      line-height: 1.8;
    }
  }
  @media (min-height: 800px) {
    .rule {
      height: 23%;
      padding: .5rem .4rem .2rem;
      font-size: .26rem;
      line-height: 2;
      background: url('../../images/women/pink-bg.png') no-repeat top center;
      background-size: 100% 100%;
    }
  }
  @media (min-height: 1024px) {
    .rule {
      line-height: 1.6;
    }
  }
  span.ft-y {
    font-weight: bold;
	  color: #fff52c;
  }
  .women-legend {
    width: 90%;
    margin: 0 auto;
    height: 30%;
    background: url('../../images/women/orange-bg.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .item img {
    margin: .22rem 0rem 0 32.5%;
  }
  @media (min-height: 1024px) {
    .item img {
      margin-left: 36%;
    }
  }
  .calculate {
    position: relative;
    top: -0.5rem;
  }
  .calculate .item {
    float: left;
    height: 1rem;
    width: 22%;
    background: url('../../images/women/flower-bg.png') no-repeat center right;
    background-size: cover;
  }
  .calculate img.amount {
    margin-top: 0.3rem;
  }
  .calculate span {
    color: #d5478c;
    font-size: .4rem;
    float: left;
    margin: .15rem 0;
    text-align: center;
  }
  .legend {
    position: relative;
    top: -0.2rem;
  }
  .legend div {
    width: 49%;
    height: 1.6rem;
    background: url('../../images/women/women-icon.png') no-repeat top center;
    background-size: contain;
    display: inline-block;
  }
  .legend div:nth-child(2) {
    background: url('../../images/women/gift-icon.png') no-repeat top center;
    background-size: contain;
  }
  .legend p {
    display: inline-block;
    width: 49%;
    color: #ae3d73;
    font-size: .2rem;
    transform: scale(0.9);
  }
  
</style>
