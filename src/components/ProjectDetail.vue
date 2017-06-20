<template>
  <div class="project">
    <div class="fist-frame">
      <div class="project-detail-top bg-white">
        <p class="ft-Arial"><span>9.3</span>%</p>
        <p class="second">期望年均回报率</p>
        <div class="tip-list">
          <span class="tip-item tip-item1"><span class="font-Arial margin-0">100</span>元起投</span>
          <span class="tip-item tip-item2"><span class="font-Arial margin-0">180</span>天项目期</span>
        </div>
        <div class="project-process clearfix">
          <div class="start-circle fl">
            <div class="start-circle-center"></div>
          </div>
          <div class="process-bar fl">
            <div class="process-inner-bar fl"></div>
            <img src="../images/project/process-btn.png" class="fl">
            <div class="process-tip">50%</div>
          </div>
          <div class="end-circle fr">
            <div class="end-circle-center"></div>
          </div>
        </div>
        <p class="remain-amount">剩余可投<span>20,000</span>元</p>
        <p class="actual-amount">投资<span>20,000</span>元，预计收益<span>159.34</span>元</p>
      </div>
      <div class="project-detail-bottom bg-white">
        <div class="detail-item">
          <span>计息日期：</span>投资成功，当日计息
        </div>
        <div class="detail-item">
          <span>还款方式：</span>按月付息，到期还本
        </div>
        <div class="detail-item">
          <span>募集提示：</span>该项目将处于募集结束后，进入锁定期
        </div>
        <div class="detail-item">
          <span>项目状态：</span>融资中
        </div>
      </div>
      <div class="drop-load">
        向上滑动查看更多详情
      </div>
      <p class="invest-fixed-btn">立即投资</p>
    </div>
  </div>
</template>
<script>
  // import '../js/swipeSlide.js'
  export default {
    name: 'projectDetail',
    data () {
      return {
        msg: '你好你好你哈哈的护肤环节'
      }
    }
  }
</script>
<style scoped>
  .project {
    background-color: #efeef4;
  }
  .fist-frame {
    height: 11.3rem;
  }
  .invest-fixed-btn {
    height: .9rem;
    line-height: .9rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fff;
    font-size: .3rem;
    background-color: #ff611d;
  }
  .drop-load {
     font-size: .22rem;
     background-color: #efeef4;
     color: #999;
     padding: .45rem 0;
  }
  .project-detail-top {
    padding-top: 0.8rem;
    padding-bottom: 0.4rem;
    margin-bottom: .3rem;
  }
  .project-detail-top p.ft-Arial {
    color: #ff611d;
    font-size: 0.67rem;
    height: .96rem;
    line-height: .96rem;
    margin-bottom: .25rem;
  }
  .project-detail-top span {
    font-size: 1.2rem;
    margin-left: 7%;
  }
  .project-detail-top p.second {
    height: .2rem;
    line-height: .2rem;
    color: #fdb62b;
    font-size: .21rem;
    margin-bottom: .52rem;
  }
  .tip-list {
    color: #333;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
  }
  .tip-list span.tip-item {
    font-size: .29rem;
    margin-left: 0;
  }
  .tip-list span.tip-item span {
    font-size: .3rem;
    margin-left: 0;
  }
  .tip-list .tip-item1 {
    background: url('../images/project/icon01.png') no-repeat 0 2px;
    padding-left: .4rem;
    background-size: 18%;
  }
  .tip-list .tip-item2 {
    background: url('../images/project/icon02.png') no-repeat 0px 1px;
    padding-left: .42rem;
    background-size: 16%;
  }
  .project-process {
    width: 100%;
    padding: 0 .4rem;
    margin-top: .8rem;
    margin-bottom: .4rem;
  }
  .project-process .start-circle, .project-process .end-circle {
    width: .2rem;
    height: .2rem;
    background: #fff;
    position: relative;
    border-radius: 50%;
    margin-top: -0.1rem;
  }
  .project-process .start-circle {
    border: 1px solid #ff611d;
  }
  .project-process .end-circle {
    border: 1px solid #75c4f6;
  }
  .project-process .start-circle .start-circle-center, .project-process .end-circle .end-circle-center {
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 0.023rem;
  }
  .project-process .start-circle .start-circle-center, .process-inner-bar {
    background: #ff611d;
  }
  .project-process .end-circle .end-circle-center, .process-bar {
    background: #75c4f6;
  }
  .process-bar {
    width: 93%;
    height: 2px;
    margin-bottom: -2px;
    position: relative
  }
  .process-bar .process-inner-bar {
    position: absolute;
    width: 80%;
    height: 2px;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .process-bar img {
    position: absolute;
    left: 75%;
    top: -0.23rem;
    width: 10%;
  }
  .process-bar .process-tip {
    width: .7rem;
    height: .4rem;
    background: url('../images/project/process-tip.png') no-repeat 0 0;
    background-size: 100% 100%;
    color: #fff;
    font-size: .21rem;
    text-align: center;
    line-height: .36rem;
    position: absolute;
    left: 79%;
    top: -0.57rem;
  }
  .remain-amount, .actual-amount {
    padding: 0 .4rem;
    font-size: .24rem;
    color: #444;
    height: .26rem;
    line-height: .26rem;
    text-align: left;
  }
  .remain-amount {
    margin-bottom: .4rem;
  }
  .remain-amount span, .actual-amount span {
    color: #ff611d;
    font-size: .25rem;
    margin-left: 0;
  }
  .project-detail-bottom {
    padding: 0 .4rem;
    text-align: left;
    color: #666;
    font-size: .25rem;

  }
  .project-detail-bottom .detail-item {
    height: .83rem;
    line-height: .9rem;
  }
  .project-detail-bottom span {
    color: #999;
  }
</style>
