<template>
  <div class="Membership">
    <div class="Membership-details">
      <div class="Membership-brief">
        <div class="title title1">
          <span></span>
          <p>会员等级介绍</p>
        </div>
        <div class="content">会员体系共包含6个会员等级，会员等级由账户待收本金决定。</div>
        <div class="level">
          <p class="Y-axis">待收本金(元)</p>
          <img src="../../images/membership/membership-level.png" alt="">
          <ul class="levelName">
            <li>普通</li>
            <li>青铜</li>
            <li>白银</li>
            <li>黄金</li>
            <li>铂金</li>
            <li>钻石</li>
          </ul>
        </div>
      </div>
      <div class="Membership-brief">
        <div class="title title2">
          <span></span>
          <p>说明</p>
        </div>
        <ul class="explain">
          <li>
            <p class="header">1.待收本金：</p>
            <p class="txt">待收本金为您当前账户投资精选项目、尊贵项目及债权转让项目的待收本金总和（不含收益及可用余额）。</p>
          </li>
          <li>
            <p class="header">2.会员评级规则：</p>
            <p class="txt">
              用户在宏财网进行投资，且待收本金达到会员等级标准，即可拥有对应会员特权。<br>
              如因项目到期，待收本金下降导致的降级，会于次月1日根据待收本金重新计算级别。
            </p>
          </li>
        </ul>
      </div>
    </div>
    <button class="invest-fixed-btn" @click="toInvest()">立即投资</button>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'Membership',
    data () {
      return {
      }
    },
    methods: {
      toInvest () {
        bridgeUtil.webConnectNative('HCNative_GoInvestList', null, {}, function (response) {}, null)
      }
    }
  }
</script>
<style scoped>
  .Membership {
    margin-bottom: 1rem;
    font-family: PingFang-SC;
  }
  .Membership-details {
    background-color: #efeef4;
  }
  .Membership-details .Membership-brief {
    background-color: #fff;
    padding: .3rem .4rem;
    margin-bottom: .3rem;
  }
  .Membership-details .Membership-brief .title {
    color: #ff611d;
    font-size: .27rem;
    margin-bottom: .2rem;
    text-align: left;
    height: .37rem;
    border-bottom: 1px solid #ff611d;
    letter-spacing: 1.2px;
  }
  .Membership-details .Membership-brief .title1 {
    width: 2.15rem;
  }
  .Membership-details .Membership-brief .title2 {
    width: .95rem;
  }
  .Membership-details .Membership-brief .title span {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    border-radius: .5rem;
    background-color: #ff611d;
    vertical-align: sub;
    position: relative;
    left: -7px;
  }
  .Membership-details .Membership-brief .title p {
    display: inline-block;
    margin-left: -5px;
  }
  .Membership-details .Membership-brief .content {
    color: #666;
    font-size: .24rem;
    text-align: justify;
    line-height: 1.8;
  }
  .Membership-details .Membership-brief .level {
    position: relative;
  }
  .Membership-details .Membership-brief .level .Y-axis {
    position: absolute;
    top: .2rem;
    left: .2rem;
    font-size: .23rem;
	  color: #666666;
  }
  .Membership-details .Membership-brief .level img {
    width: 100%;
    margin-top: .2rem;
    display: block;
  }
  .levelName {
    margin-left: -.32rem;
    margin-top: -.15rem;
  }
  .levelName li {
    display: inline-block;
    width: 15%;
    font-size: .23rem;
    line-height: 0.75;
    letter-spacing: 0.8px;
    color: #666666;
  }
  .Membership-details .Membership-brief .content p span {
    display: inline-block;
    width: .12rem;
    height: .12rem;
    border-radius: 50%;
    background-color: #ff611d;
    margin: 1px .1rem 1px .1rem;
  }
  .explain {
    line-height: 1.8;
    color: #666;
    font-size: .24rem;
  }
  .explain .header {
    text-align: left;
    font-weight: bold;
  }
  .explain .header span {
    display: inline-block;
    width: .12rem;
    height: .12rem;
    border-radius: .5rem;
    background-color: #ff611d;
    vertical-align: middle;
    margin-top: -.05rem;
    margin-right: .08rem;
  }
  .explain .txt {
    text-align: justify;
  }
  .invest-fixed-btn {
    width: 100%;
    height: .9rem;
    border: none;
    line-height: .9rem;
    color: #fff;
    font-size: .28rem;
    background-color: #ff611d;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
</style>
