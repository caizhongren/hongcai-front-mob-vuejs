<template>
  <div class="fen-success" v-auto-height>
    <div class="header">
      <div class="logo">
        <img src="../../images/fentian/logo-hongcai.png" alt="">
        <img src="../../images/fentian/logo-fen.png" alt="" width="8.5%">
      </div>
      <img src="../../images/fentian/register-success-text.png" alt="" class="title">
      <p class="RMB">价值 <span class="ft-yellow">RMB410</span></p>
      <ul class="gifts">
        <li>
          <img src="../../images/fentian/gift0-1.png" alt="">
          <p class="num">x 1</p>
        </li>
        <li>
          <img src="../../images/fentian/gift0-2.png" alt="">
          <p class="num">x 1</p>
        </li>
        <li>
          <img src="../../images/fentian/gift0-3.png" alt="">
          <p class="num">x 2</p>
        </li>
      </ul>
    </div>
    <div class="contents">
      <p class="text">
        <span class="ft-yellow ft-p24">时装兑换令牌x1、圣器印记礼包x1、魔气结晶x2</span> <br>
        下载宏财网App进入活动页面完成认证即可获得奖励兑换码，还有宏财网<span class="ft-yellow ft-p24">966元现金红包+超值加息券</span>已发放至您的账户中，请及时查收哟～
      </p>
      <div class="box">
        <p class="title">更多礼包等你兑换！神装坐骑 碾压全服！</p>
        <div class="imgs">
          <img src="../../images/fentian/gift1-2.png" width="7%">
          <img src="../../images/fentian/gift1-3.png" width="8.5%">
          <img src="../../images/fentian/gift1-4.png" width="8%">
          <img src="../../images/fentian/gift1-1.png" width="7%">
          <img src="../../images/fentian/gift0-2.png" width="8%">
          <img src="../../images/fentian/gift2-2.png" width="7%">
          <img src="../../images/fentian/gift2-1.png" width="7%">
          <img src="../../images/fentian/gift2-3.png" width="7%">
        </div>
        <p class="gifts-text">金宠随机包 、随机神能宝箱、坐骑兑换缰绳、典籍经典宝箱、神器印记礼包、 高级天机卷、9级宝石 、金钥匙</p>
      </div>
    </div>
    <div class="download" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">立即下载App获取礼包</div>
  </div>
</template>
<style scoped>
  .fen-success {
    background-image: linear-gradient(to top, #3b0f42, #130c04);
    background: #130c04;
  }
  .contents {
    padding-bottom: 1rem;    
    background-image: linear-gradient(to top, #3b0f42, #130c04);
    background-color: #130c04;
  }
  .download {
    font-size: .33rem;
    font-weight: bold;
    text-align: center;
    color: #d0262a;
    background-color: #fdbf2c;
    height: .85rem;
    line-height: .9rem;
    position: fixed;
    width: 100%;
    max-width: 7.2rem;
    bottom: 0;
  }
  p.text {
    padding-top: .8rem;
    line-height: 1.96;
    letter-spacing: 0.3px;
    color: #fff;
    text-align: justify;
    margin: 0 5%;
    font-size: .22rem;
  }
  .box {
    border-radius: 10px;
    background-color: #4a0346;
    width: 90%;
    margin: 0.3rem auto 0;
    padding: .08rem 0;
  }
  .box .title {
    line-height: 1.96;
    letter-spacing: 0.3px;
    text-align: center;
    color: #ffc00d;
    font-size: .24rem;
    font-weight: bold;
  }
  .imgs {
    background: #65305e;
  }
  .imgs img {
    margin: .08rem .1rem .06rem;
    vertical-align: middle;
  }
  .gifts-text {
    line-height: 1.54;
    letter-spacing: 0.3px;
    text-align: center;
    color: #ffffff;
    font-size: .22rem;
    margin: .2rem .55rem 0;
  }
  .ft-p24 {
    font-size: .24rem;
    font-weight: bold;
  }
  .ft-yellow {
    color: #f6ff00;
  }
  .fen-success .header {
    background: url('../../images/fentian/register-header.png') no-repeat left top;
    background-size: cover;
    width: 100%;
    height: 3.772rem;
  }
  .fen-success .header .logo {
    text-align: left;
    padding-top: .12rem;
  }
  .fen-success .header .title {
    width: 69%;
    margin: .3rem 0 .3rem .18rem;
    float: left;
  }
  .fen-success .header .logo img:nth-child(1) {
    width: 17%;
    margin: 0rem .12rem 0.05rem .7rem;
  }
  .header .RMB {
    background: url('../../images/fentian/RMB.png') no-repeat right center;
    background-size: contain;
    width: 2.75rem;
    height: .5rem;
    line-height: .55rem;
    clear: both;
    color: #ffffff;
    font-size: .3rem;
    padding-left: .25rem;
	  letter-spacing: 0.2px;
  }
  .gifts {
    overflow: hidden;
    margin: 0 .5rem;
  }
  .gifts li {
    float: left;
    width: 14.8%;
    position: relative;
    background: #fff;
    border-radius: .12rem;
    padding: .25rem .2rem .09rem;
    margin: .35rem 0.3rem .12rem;
    overflow: hidden;
  }
  .gifts li img:nth-child(1) {
    width: 91%;
  }
  .gifts li .num {
    position: absolute;
    left: -.28rem;
    top: .14rem;
    color: #fff;
    transform: rotate(-45deg);
    background: #ff6000;
    height: .23rem;
    line-height: .25rem;
    width: 1.06rem;
    font-size: .2rem;
  }
  @media (min-height: 724px){
    .fen-success .header {
      height: 4.3rem;
    }
    .box {
      margin-top: .6rem;
    }
  }
</style>
