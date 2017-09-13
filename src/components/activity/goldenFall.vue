<template>
  <div class="golden-fall">
    <div class="fall-header">
      <img src="../../images/golden-fall/title-words.jpg" alt="" width="72%">
      <p>活动时间：2017.9.17——2017.9.17</p>
      <p v-if="false">（活动已结束）</p>
    </div>
    <div class="fall-score-wrapper">
      <div class="fall-score position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="8%" class="position-ab">
        <p class="title">
          我的金秋积分
        </p>
        <div class="content">
          <img src="../../images/golden-fall/crab2.png" alt="" width="12%" class="display-inb">
          <span class="display-inb">13145</span>
        </div>
        <div class="btns">
          <span>积分明细</span>
          <span>兑换记录</span>
        </div>
      </div>
      <p class="score-tip">*积分数据更新可能存在网络延迟现象，稍等一会就好了哟～</p>
    </div>
    <div class="gift1-wrapper">
      <div class="gift1">
        <p class="title">
          我的金秋积分
        </p>
        <ul>
          <li>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
  @import '../../css/golden-fall.css';
</style>
<script>
  export default {
    name: 'goldenFall',
    data () {
      return {
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  /* header */
  .fall-header {
    height: 5rem;
    background: url('../../images/golden-fall/header-bg2.jpg') no-repeat 0 0;
    background-size: 100%;
  }
  .fall-header img {
    margin: .6rem auto 0;
  }
  .fall-header p {
    font-size: .24rem;
    font-weight: 500;
    color: #eb4234;
    line-height: .3;
    margin-bottom: .2rem;
  }
  /* 我的积分 */
  .fall-score-header {
    height: 2rem;
    background: url('../../images/golden-fall/bg-header.png')
  }
  .fall-score-wrapper .score-tip {
    font-size: .2rem;
    font-weight: 500;
    line-height: 2.5;
    letter-spacing: -0.4px;
    color: #ffffff;
    margin-bottom: .5rem;
  }
  .fall-score, .gift1 {
    width: 96%;
    margin-left: 2%;
    margin-top: -.7rem;
    height: 4.3rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/score-bg.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .fall-score img {
    top: 28%;
    right: 24%;
  }
  .title {
    font-size: .31rem;
    font-weight: bold;
    height: 2.2rem;
    line-height: 8;
    letter-spacing: -0.5px;
    color: #ec812c;
  }
  .fall-score .content span.display-inb {
    font-size: .66rem;
    font-weight: bold;
    line-height: 1.86;
    letter-spacing: -1px;
    text-align: justify;
    color: #ec812c;
  }
  .fall-score .btns span {
    display: inline-block;
    width: 32%;
    margin: 1.5% 3%;
    height: .6rem;
    line-height: .65rem;
    font-size: .3rem;
    font-weight: 500;
    letter-spacing: -0.4px;
    color: #fed771;
    border-radius: .2rem;
    background-color: #fc4239;
  }
  /* 第一道大礼 */
  .gift1 {
    padding: 0 .35rem;
    height: 9.4rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/gift-bg1.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .gift1 .title {
    height: 2.46rem;
    line-height: 8.2;
  }
  .gift1 ul li {
    float: left;
    width: 49%;
    height: 2.1rem;
  }
  .gift1 ul li:nth-child(odd) {
    background: url('../../images/golden-fall/coupon-bg2.png') no-repeat 0 0;
    background-size: 100%;
    margin-right: 1%;
  }
  .gift1 ul li:nth-child(even) {
    background: url('../../images/golden-fall/coupon-bg2.png') no-repeat 0 0;
    background-size: 100%;
  }
</style>
