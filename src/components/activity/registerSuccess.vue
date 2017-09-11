<template>
  <div class="success">
    <div class="head position-re">
      <img src="../../images/register/register-success.png" alt="注册成功" width="74%">
      <img src="../../images/register/vinda.png" alt="" class="position-ab" width="28%">
    </div>
    <div class="gifts">
      <ul class="clearfix">
        <li class=" position-re">
          <img src="../../images/register/gift-bg.png" alt="" width="100%">
          <p class="require position-ab">投500元送</p>
          <p class="gift position-ab">圣牧牛奶一箱</p>
        </li>
        <li>
          <img src="../../images/register/gift-1.png" alt="" width="100%">
        </li>
      </ul>
      <ul class="clearfix">
        <li class=" position-re">
          <img src="../../images/register/gift-bg.png" alt="" width="100%">
          <p class="require position-ab">投1万元送</p>
          <p class="gift position-ab">匈牙利贵腐酒</p>
        </li>
        <li>
          <img src="../../images/register/gift-2.png" alt="" width="100%">
        </li>
      </ul>
      <ul class="clearfix">
        <li class=" position-re">
          <img src="../../images/register/gift-bg.png" alt="" width="100%">
          <p class="require position-ab">投3万元送</p>
          <p class="gift position-ab">海尔除螨仪</p>
        </li>
        <li>
          <img src="../../images/register/gift-3.png" alt="" width="100%">
        </li>
      </ul>
      <ul class="clearfix">
        <li class=" position-re">
          <img src="../../images/register/gift-bg.png" alt="" width="100%">
          <p class="require position-ab">投5万元送</p>
          <p class="gift position-ab">美的养生壶</p>
        </li>
        <li>
          <img src="../../images/register/gift-4.png" alt="" width="100%">
        </li>
      </ul>
      <ul class="clearfix">
        <li class=" position-re">
          <img src="../../images/register/gift-bg.png" alt="" width="100%">
          <p class="require position-ab">投20万元送</p>
          <p class="gift position-ab">小米<br>空气净化器</p>
        </li>
        <li>
          <img src="../../images/register/gift-5.png" alt="" width="100%">
        </li>
      </ul>
    </div>
    <p class="tip">更多丰富礼品，请前往50佳生活馆询问宏财网工作人员！</p>
    <p class="button" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">下载宏财网App</p>
  </div>
</template>

<style scoped>
  .success {
    background-color: #ff8401;
    padding-bottom: 1.5rem;
  }
  .head {
    height: 5.6rem;
    width: 100%;
    background: url('../../images/register/header-bg.png') no-repeat 0 0;
    background-size: 100%;
  }
  .head img {
    margin: 1rem auto;
  }
  .head img.position-ab {
    bottom: .45rem;
    right: 0.3rem;
  }
  /* 礼品 */
  .gifts {
    padding: 0 .1rem;
    filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff8401,endcolorstr=#ffa62e,gradientType=0);
    -ms-filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff8401,endcolorstr=#ffa62e,gradientType=0);
    background: -moz-linear-gradient(to bottom, #ff8401 0%, #ffa62e 50%,#ff8401 100%);
    background: linear-gradient(to bottom, #ff8401 0%, #ffa62e 50%,#ff8401 100%);
    background: -webkit-linear-gradient(to bottom, #ff8401 0%, #ffa62e 50%,#ff8401 100%);
    background: -o-linear-gradient(to bottom, #ff8401 0%, #ffa62e 50%,#ff8401 100%);
    background: -ms-linear-gradient(to bottom, #ff8401 0%, #ffa62e 50%,#ff8401 100%);
  }
  .gifts ul {
    margin-bottom: .1rem;
    background: url('../../images/register/gift-bottom.png') no-repeat center 2.4rem;
    background-size: 98%;
  }
  .gifts ul li {
    float: left;
    width: 49.5%;
  }
  .gifts ul li:first-child {
    width: 50.5%;
    background-size: 100% 100%;
  }
  .gifts ul li .require, .gifts ul li .gift, .success .tip {
    width: 100%;
    font-size: .35rem;
    font-weight: bold;
  }
  .gifts ul li .require {
    top: .27rem;
    color: #fff;
  }
  .gifts ul:last-child li .gift {
    top: 1.2rem;
  }
  .gifts ul li .gift {
    color: #e54e26;
    top: 1.5rem;
  }
  .success .tip {
    width: 82%;
    margin-left: 10%;
    margin-top: .3rem;
    color: #fff;
    text-align: left;
  }
  /* 按钮 */
  .success .button {
    width: 99.4%;
    height: 1.3rem;
    line-height: 3;
    position: fixed;
    bottom: -.33rem;
    left: 0.3%;
    background: url('../../images/register/btn.png') no-repeat center center;
    padding: 0;
    border: 0;
    outline: none;
    color: #fff;
    font-size: .36rem;
  }
</style>
