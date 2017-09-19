<template>
  <div class="wandu-success" v-auto-height>
    <div>
      <img src="../../images/register/top-logo.png" alt="" width="60%" class="margin-auto">
      <img src="../../images/register/wandu-success.png" alt="" width="70%">
      <div class="red-bag">
        <p class="text">恭喜您获得</p>
        <p>
          18888元特权本金<br>
          +<br>
          966元现金红包<br>
        </p>
      </div>
      <p class="upload-btn" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">下载App查看奖励</p>
      <p class="tip">*如注册日起30天内还未开通银行存管，则奖励将自动失效，请注意及时开通。</p>
    </div>
  </div>
</template>
<style scoped>
  .wandu-success {
    font-weight: 500;
    padding-top: .2rem;
    background-image: linear-gradient(to top, #6c2cd8, #dc30a5);
    background-image: -webkit-linear-gradient(to top, #6c2cd8, #dc30a5);
    background-color: #6c2cd8;
  }
  .wandu-success .margin-t-3 {
    margin-top: 0rem;
  }
  .red-bag {
    height: 4.8rem;
    background: url('../../images/register/red-bag2.png') no-repeat center center;
    background-size: 80%;
  }
  .red-bag p:first-child {
    font-size: 20px;
    margin-top: -.35rem;
    color: #fefeff;
  }
  .red-bag p:last-child {
    margin-top: 2.3rem;
    line-height: 1.4;
    font-size: .26rem;
    font-weight: bold;
    color: #feef1d;
  }
  .upload-btn {
    width: 80%;
    height: .9rem;
    line-height: .95rem;
    font-size: .3rem;
    color: #e71e59;
    margin: 0 auto .2rem;
	  border-radius: .1rem;
    background-color: #feec1c;
  }
  .tip  {
    width: 80%;
    margin: 0 auto;
    color: #fff;
    font-size: .21rem;
    text-align: justify;
    color: #fefeff;
  }
</style>
