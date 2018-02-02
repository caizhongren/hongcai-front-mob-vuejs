<template>
  <div class="contact-us">
    <div class="contact-way">
      <div class="icon-l">
        <img src="../../images/about/customer.png" width="100%" alt="客服电话" class="display-bl margin-0p8">
      </div>
      <div class="text-r">
        <p class="font-666">客服电话</p>
        <p class="font-666">400-990-7626</p>
        <p class="font-999">(工作时间：工作日9:00 - 18:00)</p>
      </div>
    </div>
    <div class="contact-way">
      <div class="icon-l">
        <img src="../../images/about/mail.png" width="100%" alt="客服邮箱" class="display-bl">
      </div>
      <div class="text-r">
        <p class="font-666">客服邮箱</p>
        <p class="font-666">hckf@hongcai.com</p>
      </div>
    </div>
    <div class="contact-way">
      <div class="icon-l">
        <img src="../../images/about/qq.png" width="100%" alt="商务合作QQ" class="display-bl">
      </div>
      <div class="text-r">
        <p class="font-666">商务合作QQ</p>
        <p class="font-666"> 2880865201</p>
      </div>
    </div>
    <div class="contact-way">
      <div class="icon-l">
        <img src="../../images/about/internet.png" width="100%" alt="网址" class="display-bl">
      </div>
      <div class="text-r">
        <p class="font-666">网址</p>
        <p class="font-666">www.hongcai.com</p>
      </div>
    </div>
    <div class="contact-way">
      <div class="icon-l">
        <img src="../../images/about/adress.png" width="100%" alt="地址" class="display-bl margin-0p8">
      </div>
      <div class="text-r">
        <p class="font-666">地址</p>
        <p class="font-666">北京市海淀区中关村南二条1号</p>
        <p class="font-666">中科院空间中心九章大厦B栋一层</p>
      </div>
    </div>
    <div class="code">
      <img src="../../images/about/code.png" width="50%" alt="公众号" class="display-bl">
      <div class="class1">
        <span class="line1 display-inbl"></span><span>扫描关注宏财网公众号</span><span class="line2 display-inbl"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ContactUs',
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  .contact-us {
    padding-bottom: .5rem;
  }
  .contact-us .font-666 {
    font-size: .26rem;
    color: #666;
  }
  .contact-us .font-999 {
    font-size: .26rem;
    color: #999;
    margin-top: -0.05rem;
  }
  .contact-way, .code {
    width: 90%;
    margin: .32rem auto;
    border: 1px solid #faad8c;
    box-shadow: 0 0 4px 0 rgba(250, 173, 140, 0.3);
  }
  .contact-way {
    height: 1.6rem;
    margin-bottom: 0;
    padding-left: 15.3px;
    text-align: left;
  }
  .contact-way .icon-l {
    display: inline-block;
    width: 15%;
    /* padding-right: 26px; */
    padding-top: .35rem;
  }
  .contact-way .icon-l img {
    margin-bottom: -.1rem;
  }
  .contact-way .icon-l img.margin-0p8 {
    margin-bottom: -.08rem;
  }
  .contact-way .text-r {
    display: inline-block;
    text-align: left;
    padding-left: 0.4rem;
  }
  .contact-way:nth-child(1) .icon-l img, .contact-way:nth-child(5) .icon-l img {
    margin-bottom: .12rem;
  }
  .code {
    text-align: center;
    font-size: .26rem;
    padding-bottom: .25rem;
  }
  .code img {
    margin: .1rem auto .21rem;
  }
  .line1, .line2 {
    display: inline-block;
    width: 18%;
    height: 1px;
    background-color: rgba(255, 77, 0, 0.69);
    margin-bottom: 0.08rem;
  }
  .line1 {
    margin-right: .2rem;
  }
  .line2 {
    margin-left: .2rem;
  }
</style>
