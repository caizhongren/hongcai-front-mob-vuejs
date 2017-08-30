<template>
  <div>
    <div class="mg-promotion">
        <!-- <form action="" name="registerForm">
          <input type="mobile" name="mobile" placeholder="请输入手机号" required>
          <input type="text" name="" placeholder="请输入图形验证码" required>
          <input type="text" placeholder="请输入短信验证码" required>
        </form> -->
        <header>
          <img class="header" src="../../images/mangguo/header.png" alt="" width="100%">
          <p>携手宏财网&nbsp;&nbsp;&nbsp;开启新视野</p>
        </header>
        <div class="gift">
          <p class="title">0元变身VIP，追星看剧更华丽</p>
          <div>
            <img src="../../images/mangguo/gift01.png" alt="" class="vip-img">
            <div class="content">
              <p>现在注册认证宏财网，即可免费获得<span class="ft-important">芒果TV会员</span>1个月</p>
              <p>*每个账号限领一次</p>
              <span class="take-btn">立即变身VIP</span>
            </div>
          </div>
          <div class="success" v-show="false">
            <img src="../../images/mangguo/success-msg.png" width="60%" alt="">
            <p>您已获得芒果TV会员1个月奖励资格<br>下载宏财网App，登录首页开通存管即可获取</p>
            <!-- <p>下载宏财网App，登录首页开通存管即可获取</p> -->
            <span class="take-btn">立即变身VIP</span>
          </div>
        </div>
        <div class="gift gift2">
          <p class="title">首投VIP再升级，季卡年卡送给你</p>
          <ul class="card-list">
            <li class="vip-card">
              <p>3个月VIP</p>
              <p>首笔投资满1000元</p>
            </li>
            <li class="vip-card">
              <p>半年VIP</p>
              <p>首笔投资满2000元</p>
            </li>
            <li class="vip-card">
              <p>年度VIP</p>
              <p>首笔投资满5000元</p>
            </li>
            <li class="vip-card">
              <p>年度全屏VIP</p>
              <p>首笔投资满10000元</p>
            </li>
          </ul>
          <p class="tip">
            *温馨提示:<br>
            活动首投仅限宏财精选、宏财尊贵项目有效，债权转让项目不参与本次活动。<br>
            奖励剩余数量每分钟更新一次。
          </p>
        </div>
        <div class="about">
          <img src="../../images/mangguo/about.png" alt="" width="60%" class="margin-auto">
          <ul class="about-list">
            <li>
              <div class="title">
                国资背景
              </div>
              <div class="words">
                <p>2016年获国有企业一亿元A轮战略投资</p>
                <p>新三板金控第一股入主</p>
                <p>拥有博士高管团队的互联网金融平台</p>
              </div>
            </li>
            <li>
              <div class="title">
                银行存管
              </div>
              <div class="words">
                <p>2016年加入网贷行业协会，首批接入北京存管通平台，所有投资信息实时上传北京金融局等监管部门</p>
                <p>2017年6月正式上线海口农商银行资金存管，实现银行级资金安全保障</p>
              </div>
            </li>
            <li>
              <div class="title">
                风控安全
              </div>
              <div class="words">
                <p>十多年金融生态圈，积累优质资产</p>
                <p>银行级存管确保用户投资资金万无一失</p>
                <p>所有项目借款方知根知底，铸造闭环征信体系</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="statement">
          该活动与设备生产商Apple Inc.公司无关
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mgPromotion',
    data () {
      return {

      }
    }
  }
</script>
<style scoped>
  .statement {
    margin-top: .8rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #333;
    font-size: .24rem;
    background-color: #fab281;
  }
  .mg-promotion {
    background: url('../../images/mangguo/bg.png') no-repeat 0 0;
    background-size: 100% 100%;
    overflow: hidden;
    font-family: PingFang-SC;
  }
  p {
    color: #fff;
    font-size: .28rem;
  }
  header {
    position: relative;
    width: 100%;
    margin-top: -1.2rem;
  }
  header p {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 24.5%;
  }
  input {
    height: 1rem;
    width: 60%;
    margin: .3rem 0;
  }
  .ft-important {
    color: #fd6200 !important;
  }
  .gift {
    height: 4.4rem;
    width: 96%;
    margin-left: 0.5%;
    margin-top: -1rem;
    background: url('../../images/mangguo/gift01.png') no-repeat center top;
    background-size: 100% 100%;
  }
  .gift .title {
    color: #fff;
    padding-top: 1.05rem;
    margin-left: 31%;
    font-size: .28rem;
    text-align: left;
  }
  .gift .success img{
    margin: .3rem 0 .05rem;
  }
  .gift .success p {
    font-size: .24rem;
    padding: 0 8%;
    margin-bottom: .15rem;
    line-height: 1.3;
    color: #333;
  }
  .gift .success .take-btn {
    width: 44%;
    margin: 0 auto;
  }
  .gift .vip-img {
    width: 36%;
    height: 2rem;
    border-radius: 5px;
    float: left;
    margin: .3rem .4rem 0 .4rem;
     /* background-color: #5ba4f1; */
  }
  .gift .content {
    float: left;
    width: 2.8rem;
    text-align: justify;
  }
  .content p {
    color: #333;
    font-size: .25rem;
  }
  .content p:first-child {
    line-height: 1.29;
    margin-top: .33rem;
  }
  .content p:first-child + p {
    color: #666;
    margin-top: .03rem;
  }
  .gift .take-btn {
    background: url('../../images/mangguo/change-btn.png') no-repeat 0 0;
    margin-top: .05rem;
    height: .93rem;
    line-height: .95rem;
    width: 100%;
    background-size: 100% 100%;
    font-size: .32rem;
    text-align: center;
    color: #fd6200;
    display: block;
  }
  .gift2 {
    margin-top: .1rem;
    margin-bottom: .8rem;
    height: 8rem;
    background: url('../../images/mangguo/gift02.png') no-repeat center top;
    background-size: 100% 100%;
  }
  .gift2 p.tip {
    color: #ff4b64;
    font-size: .2rem;
    text-align: justify;
    line-height: 1.5;
    padding: 0 8.5%;
  }
  .gift2 .card-list {
    padding: .55rem 0.1rem 0 0rem;
  }
  .gift2 .card-list li {
    width: 43%;
    height: 1.8rem;
    box-sizing: content-box;
    display: inline-block;
    border-radius: .1rem;
    border: solid 1px #ffee5d;
    margin-left: .32rem;
    margin-bottom: .35rem;
    box-shadow: 0 2px 3.5px 0 rgba(167, 76, 36, 0.74);
  }
  .vip-card p:first-child {
    width: 102%;
    margin-left: -1%;
    height: 50%;
    background-image: linear-gradient(to left, #ffde01, #ffba25);
    border-radius: .1rem .1rem 0 0;
    color: #fff;
    font-weight: bold;
    line-height: 2.8;
    text-align: center;
    letter-spacing: -0.6px;
    font-family: PingFang-SC;
    font-size: .34rem;
  }
  .gift2 li:first-child p:first-child, .gift2 li:nth-child(3) p:first-child {
    background-image: linear-gradient(to left, #ffba25, #ffde01);
  }
  .vip-card p:first-child + p {
    color: #666;
    font-size: .26rem;
    line-height: 3.8;
  }
  /* 关于我们 */
  .about .about-list li {
    width: 80%;
    margin: .35rem auto 0;
    color: #fff;
    font-size: .28rem;
    border-radius: .1rem;
	  box-shadow: 0 2.5px 0 0 rgba(4, 122, 87, 0.55);
    background-color: #fff;
    border-radius: .1rem;
  }
  .about .about-list li .words {
    padding: .3rem .5rem .3rem .2rem;
  }
  .about .about-list li .words p {
    color: rgba(51, 51, 51, 0.87);
    opacity: 0.87;
    font-size: .23rem;
    line-height: 1.8;
    text-align: justify;
    padding-left: .5rem;
    background: url('../../images/mangguo/yes-icon.png') no-repeat .1rem .1rem;
    background-size: 4%;
  }
  .about-list li .title {
    height: 53px;
    line-height: 53px;
    width: 102%;
    margin-left: -1%;
	  background-color: #45c7a9;
    background-image: url('../../images/mangguo/about-title-bg.png');
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center center;
  }
</style>
