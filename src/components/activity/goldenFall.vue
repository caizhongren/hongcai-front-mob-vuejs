<template>
  <div class="golden-fall">
    <div class="fall-header">
      <img src="../../images/golden-fall/title-words.jpg" alt="" width="72%">
      <p>活动时间：2017.9.17——2017.9.17</p>
      <p v-if="false">（活动已结束）</p>
    </div>
    <div class="fall-score-wrapper">
      <div class="fall-score position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="position-ab">
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
      <div class="gift1 position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="position-ab crab">
        <p class="title">
          第一道大礼
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
      <p class="gift1-tip">*每人每天限领取10次，现金券当日领取当日有效，过期作废，还请您及时使用。</p>
    </div>
    <div class="gift2-wrapper">
      <div class="gift2 position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="position-ab crab">
        <p class="title">
          第二道大礼
        </p>
        <div class="gift2-rule">
            活动期间，新增投资<span>精选项目</span>每满1000元，可获得<span>1金秋积分</span>，新增投资<span>尊贵项目</span>每满1000元，可获得<span>4金秋积分</span>。金秋积分可用于兑换虚拟或实物奖励。
        </div>
        <div class="crab-gift">
          <div class="crab-coupon">

          </div>
          <div class="crab-list">
            <ul>
              <li></li>
              <li></li>
              <li class="border-none"></li>
            </ul>
          </div>
        </div>
        <div class="coupon-tip">
          *收到礼券后，扫码即可预约送货，24～48小时内送达，现捕现发，保证鲜活
        </div>
        <div class="jd-card-list">
          <ul>
            <li>
              <img src="../../images/golden-fall/jd01.png" alt="" width="100%">
            </li>
            <li class="border-none">
                <img src="../../images/golden-fall/jd02.png" alt="" width="100%">
            </li>
          </ul>
        </div>
        <img src="../../images/golden-fall/bottom-bg.png" alt="" width="98%">
        <div class="exchange-priviledge">
          <div class="priviledge-coupon border-none">

          </div>
          <div class="btns">

          </div>
        </div>
      </div>
      <p class="gift2-tip">*积分充足的情况下，相同奖励可多次兑换哟！</p>
    </div>
    <div class="rules-wrapper">
      <div class="rules position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="position-ab crab">
        <p class="title">
          活动规则            
        </p>
        <div>
          1.活动时间<br>
          本次活动仅限于<span>年9月xx日至2017年10月xx日</span>内参与有效；
        </div>
        <div>
          2.参与方式<br>
          活动期间，根据不同项目类型，用户新增投资金额每满1000元，均可获得金秋积分，金秋积分可用于兑换虚拟或实物奖励；
        </div>
        <div>
          3.关于现金券<br>
          现金券仅限活动期间领取，<span>每天每人限领10次</span>，现金券当日领取<span>当日有效</span>，过期作废，还请您及时使用;
        </div>
        <div>
          4.奖励兑换<br>
          活动期间，可随时兑换所需奖励，如<span>活动结束后3个工作日内</span>仍未兑换奖励，将视为自动放弃奖励；
        </div>
        <div>
          5.奖励发放<br>
          >>您兑换的特权本金奖励将<span>直接发放</span>至您的账户中，请注意及时查收；
          >>您兑换的实物奖励将在<span>活动结束后7个工作日内寄出</span>，届时将会有短信通知物流信息，活动结束后会有客服致电核实地址信息，请务必保持电话通畅，注意接听，如因信息输入错误、电话无人接听等原因导致邮寄失败，视为自动放弃奖励；
        </div>
        <div>
          6.在法律规定范围内，宏财网保留本活动最终解释权。
        </div>
      </div>
    </div>
    <p class="statement" v-if="isIos">
      该活动与设备生产商Apple Inc.公司无关
    </p>
  </div>
</template>
<style>
  @import '../../css/golden-fall.css';
</style>
<script>
  import {Utils} from '../../service/Utils'
  export default {
    name: 'goldenFall',
    data () {
      return {
        isIos: Utils.isIos()
      }
    },
    prop: ['token'],
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
    color: #eb4234;
    line-height: .3;
    margin-bottom: .2rem;
  }
  /* 我的积分 */
  .fall-score-header {
    height: 2rem;
    background: url('../../images/golden-fall/bg-header.png')
  }
  .fall-score-wrapper .score-tip, .gift1-wrapper .gift1-tip, .gift2 .coupon-tip, .gift2-wrapper .gift2-tip {
    font-size: .2rem;
    line-height: 2.5;
    letter-spacing: -0.4px;
    color: #ffffff;
    margin-bottom: .5rem;
  }
  .fall-score, .gift1, .gift2, .rules-wrapper .rules {
    width: 96%;
    margin-left: 2%;
    margin-top: -.7rem;
    height: 4.28rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/score-bg.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .fall-score img, .crab {
    top: 28%;
    right: 28%;
  }
  .title {
    height: 2.2rem;
    font-size: .31rem;
    font-weight: bold;
    line-height: 8;
    letter-spacing: -0.5px;
    color: #ec812c;
  }
  .fall-score .content span.display-inb {
    height: 1.1rem;
    line-height: 1.8;
    font-size: .66rem;
    font-weight: bold;
    letter-spacing: -1px;
    text-align: justify;
    color: #ec812c;
  }
  .fall-score .btns span {
    display: inline-block;
    width: 32%;
    margin: 1.5% 3%;
    height: .7rem;
    line-height: .75rem;
    font-size: .3rem;
    letter-spacing: -0.4px;
    color: #fed771;
    border-radius: .2rem;
    background-color: #fc4239;
  }
  /* 第一道大礼 */
  .gift1 {
    padding: 0 .35rem;
    height: 9.38rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/gift-bg1.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .gift1 .crab {
    top: 13%;
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
  .gift1-wrapper .gift1-tip {
    line-height: 1.3;
    width: 80%;
    text-align: justify;
    margin-left: 10%;
    margin-top: .12rem;
  }
  /* 第二道大礼 */
  .gift2 {
    /* padding: 0 .35rem; */
    height: 16.92rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/gift-bg2.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .gift2 .crab {
    top: 7%;
  }
  .gift2 .gift2-rule {
    height: 1.9rem;
    margin: 0 .35rem;
    padding: .3rem .25rem;
    margin-top: -.3rem;
    object-fit: contain;
    border-radius: .2rem;
    font-size: .26rem;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.38;
    letter-spacing: 0.7px;
    text-align: justify;
    color: #ec812c;
    background: url('../../images/golden-fall/border-bg.png') no-repeat 0 0;
    background-size: 100% 100%;
  }
  .gift2 .gift2-rule span {
    font-weight: bold;
    color: #ea4d24;
  }
  .gift2 .crab-gift, .gift2 .jd-card-list, .gift2 .exchange-priviledge {
    width: 97%;
    background-color: #fff;
    margin-left: 1.3%;
    margin-top: .15rem;
  }
  .gift2 .crab-gift .crab-coupon, .gift2 .exchange-priviledge .priviledge-coupon {
    padding: .2rem;
    height: 2.6rem;
    background: url('../../images/golden-fall/gift-coupon-bg.png') no-repeat center center;
    background-size: 93%;
    border-bottom: solid 1px rgba(249, 200, 153, 0.95);
    border-top: solid 1px rgba(249, 200, 153, 0.95);
  }
  .gift2 .crab-gift .crab-list {
    height: 2.6rem;
    border-bottom: solid 1px rgba(249, 200, 153, 0.95);
  }
  .gift2 .crab-gift .crab-list ul li {
    height: 2.6rem;
    float: left;
    width: 33%;
    border-right: solid 1px rgba(249, 200, 153, 0.95);
  }
  .gift2 .coupon-tip {
    width: 98%;
    padding: 2.8% 7.5%;
    margin-bottom: 0;
    margin-left: 1%;
    height: .9rem;
    font-size: .2rem;
    line-height: 1.1;
    letter-spacing: 0.6px;
    text-align: justify;
    /* background: url('../../images/golden-fall/bottom-bg.png') no-repeat 0 0; */
    background: url('../../images/golden-fall/tip-bg.png') no-repeat 0 0;
    background-size: 100%;
  }
  .gift2 .jd-card-list, .gift2 .exchange-priviledge {
    margin-top: 0;
    height: 3.04rem;
    background-color: #fff;
  }
  .gift2 .jd-card-list ul li {
    float: left;
    padding: .2rem .2rem .1rem .3rem;
    width: 41%;
    height: 2.74rem;
    border-right: solid 1px rgba(249, 200, 153, 0.95);
  }
  .gift2 .jd-card-list ul li:last-child {
    float: right;
    padding: .2rem .3rem .1rem .2rem;
  }
  .gift2 .exchange-priviledge {
    margin-top: -.1rem;
    border-radius: 0 0 .1rem .1rem;
  }
  .gift2 .exchange-priviledge .priviledge-coupon {

  }
  /* 活动规则 */
  .rules-wrapper {
    padding-bottom: .5rem;
  }
  .rules-wrapper .rules {
    height: 13.5rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/rules-bg.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .rules-wrapper .rules .crab {
    top: 8.5%;
  }
  .rules div {
    padding: 2% 10% 1%;
    font-size: .24rem;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: 0.6px;
    text-align: justify;
    color: #ec812c;
  }
  .rules div span {
    font-weight: 900;
	  color: #ff611d;
  }
</style>
