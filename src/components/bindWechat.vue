<template>
  <div class="guide">
    <!-- 顶部header -->
    <div class="header-imgs">
      <img src="../images/guide/header-01.png" width="100%">
      <img src="../images/guide/header-02.png" width="100%">
      <img src="../images/guide/header-03.png" width="100%">
      <img src="../images/guide/header-04.png" width="100%">
      <img src="../images/guide/header-05.png" width="100%">
    </div>
    <div class="content">
      <!-- 第一步 -->
      <div class="step1">
        <div class="no"><span class="dot-lt"></span>1</div>
        <div class="text">点开微信, 在微信通讯录中, 点击右上角添加朋友。</div>
      </div>
      <div class="step-img">
        <img src="../images/guide/step-01.png" width="100%">
      </div>
      <!-- 第二步 -->
      <div class="step2">
        <div class="no"><span class="dot-rt"></span>2</div>
        <div class="text">选择公众号。</div>
      </div>
      <div class="step-img">
        <img src="../images/guide/step-21.png" width="100%">
        <img src="../images/guide/step-22.png" width="100%">
        <img src="../images/guide/step-23.png" width="100%">
        <img src="../images/guide/step-24.png" width="100%">
      </div>
      <!-- 第三步 -->
      <div class="step1">
        <div class="no"><span class="dot-lb"></span>3</div>
        <div class="text">输入<span class="ftorange">"宏财服务中心"</span>或者<span class="ftorange">HONGCAILICAI01</span>就能找到本宝宝了!</div>
      </div>
      <div class="step-img">
        <img src="../images/guide/step-03.png" width="100%">
      </div>
      <!-- 第四步 -->
      <div class="step1">
        <div class="no"><span class="dot-rb"></span>4</div>
        <div class="text">关注成功之后, 点这里就能领特权本金喽! !动起你的小手, 一起发宏财!</div>
      </div>
      <div class="step-img">
        <img src="../images/guide/step-04.png" width="100%">
      </div>
    </div>
    <!-- 提示 -->
    <div class="tips">
      <img src="../images/guide/dish.png" width="100%">
      <div class="tips-con">
        <div class="tip-header"><p>提 示</p><p>PROMPT</p></div>
        <div class="tips-li">
          <p><i></i><span>一个宏财账号限绑一个微信账号, 不可重复绑定, 钱钱都会有的!</span></p>
          <p><i></i><span>本活动解释权, 归宏财宝宝所有哦～</span></p>
        </div>
      </div>
    </div>
    <!-- 打开微信，立即关注 -->
    <div class="openWeixin" @click="openAndCopy();">
      打开微信, 立即关注
    </div>
  </div>
</template>

<script>
  import {bridgeUtil} from '../service/Utils'
  export default {
    name: 'BindWechat',
    data () {
      return {
      }
    },
    created: function () {
    },
    methods: {
      openAndCopy: function () {
        bridgeUtil.webConnectNative('HCNative_CopyToWechat', null, {
          copyText: 'hongcailicai01'
        }, function (response) {}, null)
      }
    }
  }
</script>

<style>
.guide {
  background-color: #faf8f9;
  padding-bottom: 1.8rem;
  overflow: hidden;
}
.guide .header-imgs img {
  vertical-align: middle;
}
.guide .content {
  padding: .5rem .5rem;
}
.guide .content .ftorange {
  color: #fe7200;
}
.guide .step1 .no, .guide .step2 .no {
  border: 1px solid #fe7200;
  position: relative;
  font-size: .34rem;
  width: .8rem;
  height: .8rem;
  text-align: center;
  line-height: .8rem;
  color: #fe7200;
  float: left;
  margin: 0 .2rem .1rem 0;
  font-weight: 500;
}
.guide .step1 .no .dot-lt, .guide .step2 .no .dot-rt, .guide .step1 .no .dot-lb, .guide .step1 .no .dot-rb {
  display: inline-block;
  width: .2rem;
  height: .2rem;
  background-color: #fe7200;
  position: absolute;
}
.guide .step1 .no .dot-lt {
  left: 0;
  top: 0;
}
.guide .step2 .no .dot-rt {
  right: 0;
  top: 0;
}
.guide .step1 .no .dot-lb {
  left: 0;
  bottom: 0;
}
.guide .step1 .no .dot-rb {
  right: 0;
  bottom: 0;
}
.guide .step1 .text, .guide .step2 .text {
  font-size: .27rem;
  color: #666;
  float: left;
  width: 75%;
  font-weight: 500;
}
.guide .step1 .text {
  line-height: .4rem;
  text-align: left;
}
.guide .step2 .text {
  line-height: .6rem;
  text-align: left;
}
.guide .content .step-img {
  padding-left: .7rem;
  float: right;
  margin-bottom: 1.2rem;
  margin-top: .5rem;
}
.guide .content .step-img img {
  vertical-align: bottom;
  width: 90%;
}
.guide .tips img{
  vertical-align: text-top;
}
.guide .tips .tips-con {
  padding: 0rem .5rem;
}
.guide .tips .tips-con .tip-header {
  border-left: 3px solid #fd8e34;
  position: relative;
  height: .8rem;
  width: 1.5rem;
}
.guide .tips .tips-con .tip-header p {
  margin-bottom: 0;
}
.guide .tips .tips-con .tip-header p:nth-child(1) {
  font-size: .36rem;
  color: #444;
  position: absolute;
  top: -3px;
  left: 4px;
  font-weight: 500;
}
.guide .tips .tips-con .tip-header p:nth-child(2) {
  font-size: .22rem;
  color: #999;
  position: absolute;
  bottom: -6px;
  left: -2px;
  transform: scale(.74);
  -webkit-transform: scale(.74);
}
.guide .tips .tips-con .tips-li {
  margin: .5rem 0 0 .4rem;
}
.guide .tips .tips-con .tips-li p {
  color: #666;
  font-size: .24rem;
  margin-bottom: .2rem;
  overflow: hidden;
}
.guide .tips .tips-con .tips-li p i {
  width: .15rem;
  height: .15rem;
  background-color: #fe7200;
  margin-right: .2rem;
  margin-top: .1rem;
  vertical-align: top;
  float: left;
}
.guide .tips .tips-con .tips-li p span {
  float: left;
  width: 90%;
  text-align: left;
}
.guide .openWeixin {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f78529;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .26rem;
  color: #fff;
  font-weight: 500;
}
</style>
