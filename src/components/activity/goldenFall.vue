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
    <!-- 领取成功弹窗 -->
    <div class="dialog mask-common" v-if="PrizeMask">
      <div class="successBg">
        <!-- 现金券领取 -->
        <div v-if="CashReceive || CashUpperLimit" class="cashPrize">
          <div class="receive" v-if="CashReceive">
            <p class="mask-title">领取成功！</p>
            <p class="mask-title">可前往我的优惠券查看～</p>
          </div>
          <div class="UpperLimit" v-if="CashUpperLimit">
            <p class="mask-title">您已经领取10次啦!</p>
            <p class="mask-title">明天再来哦～</p>
          </div>
          <div class="mask-btn IKnowBtn margin-auto">我知道了</div>
        </div>
        <!-- 活动已结束 -->
        <div class="activityEnd" v-if="activityEnd">
          <p class="mask-title">活动已结束</p>
          <p class="mask-title">去每日抽奖试试手气吧～</p>
          <div class="mask-btn IKnowBtn margin-auto">我知道了</div>
        </div>
        <!-- 积分不足 -->
        <div v-if="NoIntegral" class="NoIntegral">
          <p class="mask-title">啊哦，积分不足哎...</p>
          <p class="mask-content">您当前积分不足，快去投资赚取积分吧！</p>
          <div class="mask-btn IKnowBtn fl">我知道了</div>
          <div class="mask-btn toInvest fr">去投资</div>
        </div>
        <!-- 确认是否兑换 -->
        <div v-if="isExchange">
          <p class="mask-title">哇！奖励即将到手</p>
          <p class="mask-content">兑换该奖励将消耗您【xx】积分，是否确认兑换？</p>
          <div class="mask-btn IKnowBtn fl">再看看</div>
          <div class="mask-btn toExchange fr">确认兑换</div>
        </div>
        <!-- 特权本金兑换成功-->
        <div v-if="virtualPrizes">
          <p class="mask-title">恭喜您兑换成功！</p>
          <p class="mask-content">前往【我的】页面点击特权本金，即可查看咯!</p>
          <div class="mask-btn IKnowBtn fl">我知道了</div>
          <div class="mask-btn toMessage fr">去查看</div>
        </div>
        <!-- 实物奖品兑换成功-->
        <div v-if="materialPrize">
          <p class="mask-title">恭喜您兑换成功！</p>
          <p class="mask-content">你已成功兑换【168大闸蟹礼券】！奖品将在活动结束后7个工作日内寄出，请注意接听客服电话核对收货地址哟～</p>
          <div class="mask-btn IKnowBtn margin-auto">我知道了</div>
        </div>
      </div>
    </div>
    <!-- 收货地址弹窗 -->
    <div class="dialog mask-common" v-if="AdressMask">
      <div class="adressBg">
        <!-- 表单填写 -->
        <div class="formAdress">
          <div class="adress-title">
            <span>收</span><span>货</span><span>地</span><span>址</span>
          </div>
          <form action="">
            <input type="text" placeholder="请输入您的收件人姓名" v-model="user.name">
            <input type="tel" placeholder="请输入联系电话" v-model="user.mobile">
            <textarea id="adress" type="text" placeholder="请在此处输入您的详细收货地址\n(建议包含省/市、区级、详细街道名称)" v-model="user.adress"></textarea>
          </form>
          <div class="btns">
            <div class="mask-btn IKnowBtn fl">稍后填写</div>
            <div class="mask-btn toMessage fr">确认</div>
          </div>
        </div>
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
        PrizeMask: false,
        activityEnd: false,
        CashReceive: false,
        CashUpperLimit: false,
        NoIntegral: false,
        virtualPrizes: false,
        materialPrize: true,
        isExchange: false,
        AdressMask: true,
        user: {
          name: '',
          mobile: '',
          adress: ''
        }
      }
    },
    mounted () {
      var textAreas = document.getElementsByTagName('textarea')
      Array.prototype.forEach.call(textAreas, function (elem) {
        elem.placeholder = elem.placeholder.replace(/\\n/g, '\n')
      })
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
  


  /* 弹窗 */
  .adressBg {
    background: url('../../images/golden-fall/adress.png') no-repeat center center;
    background-size: contain;
    padding: .8rem .6rem .3rem;
  }
  .successBg {
    background: url('../../images/golden-fall/exchange-bg.png') no-repeat center center;
    background-size: contain;
    padding: 1.8rem .6rem;
  }
  .adressBg, .successBg {
    margin: 1.5rem auto;
    text-align: center;
    width: 5.72rem;
    height: 6rem;
    font-family: PingFang-SC;
  }
  .mask-title {
    font-size: .33rem;
    font-weight: bold;
    line-height: 1.06;
    letter-spacing: -0.5px;
    text-align: center;
    color: #ee8118;
    margin: .35rem auto .3rem;
  }
  .mask-content {
    font-size: .25rem;
	  color: #666666;
    margin: .3rem auto;
    text-align: justify;
    line-height: 1.25;
  }
  .mask-btn {
    width: 1.8rem;
    height: .6rem;
    line-height: .65rem;
    border-radius: .2rem;
    background-color: #ff4030;
    font-size: .31rem;
    font-weight: bold;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffd869;
  }
  .cashPrize .mask-btn, .activityEnd .mask-btn {
    margin-top: .5rem; 
  }
  .NoIntegral .mask-content{
    margin-bottom: .5rem !important;
  }
  .formAdress .adress-title {
    text-align: left;
    margin-bottom: .1rem;
  }
  .formAdress .adress-title span {
    display: inline-block;
    width: .31rem;
    height: .63rem;
    line-height: .65rem;
    background-color: #faf1ca;
    border: solid 2px #dfb986;
    font-size: .32rem;
    font-weight: bold;
    letter-spacing: 24px;
    text-align: center;
    color: #dfb986;
    padding: 0 .17rem;
    margin-right: .2rem;
  }
  .formAdress form {
    background: #faf1ca;
  }
  .formAdress form input, textarea {
    margin-bottom: 0;
    width: 100%;
    border: none;
    font-family: "微软雅黑";
    border-bottom: 1px solid #e78826;
    border-radius: 0;
    height: .9rem;
    background-color: #faf1ca;
    color: #666666;
  }
  .formAdress form textarea {
    resize: none;
    height: .8rem;
    padding-top: .2rem;
  }
  .formAdress .btns {
    margin-top: .3rem;
  }
</style>
