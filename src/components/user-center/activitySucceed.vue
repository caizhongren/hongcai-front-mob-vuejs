<template>
  <div class="wandu-success" v-auto-height>
    <div>
      <span>966元现金券</span>
      <span><strong>18888元</strong>特权本金（邀请专属)</span>
      <p class="upload-btn" onclick="javascript:window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'">前往查看奖励</p>
    </div>
  </div>
</template>
<style scoped>
  .wandu-success {
    font-weight: 500;
    padding-top: .2rem;
    height: 10rem;
    background: url(../../images/invite/login-succeed.png) no-repeat;
    background-size: 100%;
    background-color: #060547;
  }
  .upload-btn {
    width: 80%;
    height: .9rem;
    line-height: .95rem;
    font-size: .3rem;
    color: #fbe756;
    margin: 0 auto .2rem;
	  border-radius: .1rem;
    background-color: #feec1c;
    box-shadow: 3.2px 2.4px 0 0 #29599d;
    background-image: linear-gradient(130deg, #2923ab, #75306c);
    border: solid 2px #ffca61;
    position: absolute;
    bottom: 1rem;
    left: 10%;
  }
  .wandu-success span:first-child {
    position: absolute;
    top: 4.66rem;
    left: .48rem;
    text-align: justify;
    color: #060547;
  }
  .wandu-success span:nth-child(2) {
    position: absolute;
    top: 3.3rem;
    right: .54rem;
    text-align: justify;
    color: #666666;
    width: 2rem;
    font-weight: normal;
  }
  .wandu-success span:nth-child(2) strong{
    font-size: .26rem;
    color: #060547; 
  }
   @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .upload-btn{
      bottom: 3.5rem;
    }
  }
</style>
