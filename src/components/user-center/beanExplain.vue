<template>
  <div class="bean-explain">
    <div class="part_what clearfix">
      <span class="num">1</span>
      <div class="content">
        <p>宏豆是什么？</p>
        宏豆是宏财网平台上的奖励积分，可在积分商城兑换物品。
      </div>
    </div>
    <div class="part_how clearfix">
      <span class="num">2</span>
      <div class="content">
        <p>如何获取及使用宏豆？</p>
        用户可通过注册、开通银行存管、成功出借、平台活动等方式获得宏豆，获得的宏豆可以在【发现】>>【积分商城】中兑换各类优惠奖励。
      </div>
    </div>
    <div class="part_detail clearfix">
      <span class="num">3</span>
      <div class="content">
        <p>宏豆的具体获得规则是什么？</p>
      </div>
      <ul>
        <li class="clearfix">
          <div class="content_l fl">
            <p>成功注册</p>(首次绑定手机号)
          </div>
          <span class="fr">+{{rules.registerPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p>成功认证</p>(首次绑定银行卡）
          </div>
          <span class="fr">+{{rules.realNameAuthPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p>首次出借成功</p>(仅限宏财精选或尊贵项目）
          </div>
          <span class="fr">+{{rules.firstInvestPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p class="single">首次完成出借人风险测评</p>
          </div>
          <span class="fr">+{{rules.doQuestionnairePoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p>每日登录</p>(手机App端)
          </div>
          <span class="fr">+{{rules.dailyAppCheckPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p>成功邀请好友注册</p>(每日最高奖励{{rules.inviteFriendDailyMax}}次)
          </div>
          <span class="fr">+{{rules.inviteFriendPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p class="single">被邀好友注册后7天内首次出借成功</p>
          </div>
          <span class="fr">+{{rules.inviteFriendFirstWeekInvestPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p>单笔出借金额每满{{rules.investThreshold}}元</p>(仅限宏财精选或尊贵项目，无上限）
          </div>
          <span class="fr">+{{rules.investPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
        <li class="clearfix">
          <div class="content_l fl">
            <p class="single">首次开通自动投标</p>
          </div>
          <span class="fr">+{{rules.autoTenderPoints}}</span>
          <img src="../../images/user-center/bean.png" alt="" width="7.4%" class="fr">
        </li>
      </ul>
      <div class="tip">
        <span class="color_orange fl">*</span>
        <div class="text position-re">还可在平台特定活动中获取<img src="../../images/user-center/bean.png" alt="" width="5%" class="position-ab"><br>
          提现会对应扣减<img src="../../images/user-center/bean.png" alt="" width="5%" class="position-ab">
        </div>
      </div>
    </div>
    <div class="part_date clearfix">
      <span class="num">4</span>
      <div class="content">
        <p>宏豆有效期多久？</p>
        宏豆有效期截至每年12月31日24时，次年重新累计。<br>
        <span class="color_orange">*</span>例如：系统于2018年12月31日24时整，自动清理用户在2017年1月1日至2017年12月31日所获得的所有累计宏豆。
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'beanExplain',
    data () {
      return {
        rules: {},
        act: 37
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
          // 1 需要显示 0 不需要显示
          isShow: 0
        }, function (res) {}, null)
      }
    },
    created () {
      bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
        // 1 需要显示 0 不需要显示
        isShow: 0
      }, function (res) {}, null)
      this.$http('/hongcai/rest/activitys/' + this.act).then((res) => {
        this.rules = JSON.parse(res.data.rules)
      })
    }
  }
</script>
<style scoped>
  .bean-explain {
    background: #efeef4;
    padding: .27rem;
  }
  .bean-explain .part_what, .bean-explain .part_how, .bean-explain .part_detail, .bean-explain .part_date {
    background: #fff;
    padding: .2rem .26rem;
    margin-bottom: .3rem;
    letter-spacing: 1.5px;
    line-height: 1.6;
    border-radius: .2rem;
    text-align: left;
  }
  .color_orange {
    color: #ff611d !important;
  }
  .num{
    margin-right: .1rem;
    margin-top: .035rem;
    float: left;
    width: .32rem;
    padding-left: .02rem;
    height: .34rem;
    line-height: .38rem;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    background-image: linear-gradient(to top, #f95008, #ff611d);
    box-shadow: 1px 1px 2px 1px rgba(251, 96, 27, 0.2);
  }
  .content {
    font-size: .24rem;
    float: left;
    width: 90%;
    color: #666666;
    text-align: justify;
  }
  .content p {
    margin-bottom: .04rem;
    font-family: 'PingFang-SC';
    font-size: .27rem;
    color: #444444;
  }
  .part_detail .content p {
    margin-bottom: .27rem;
  }
  ul li {
    padding: .16rem .4rem .12rem .2rem;
    font-size: .22rem;
    color: #999;
    line-height: 1.4;
	  letter-spacing: 0.3px;
  }
  ul li:nth-child(odd) {
    background-color: #feefe9;
  }
  .content_l p {
    font-size: .24rem;
	  color: #666;
  }
  .content_l p.single {
    padding: .15rem 0;
  }
  ul li img {
    margin-top: 0.12rem;
    margin-right: .15rem;
  }
  ul li span {
    padding-top: .11rem;
    margin-left: -.1rem;
    font-family: 'PingFang-SC';
    font-size: .25rem;
    letter-spacing: 0.3px;
    color:#ff611d;
  }
  .part_detail .tip .text {
    margin-top: .2rem;
    line-height: 1.5;
    font-size: .2rem;
    letter-spacing: 0.3px;
    text-align: left;
    color: #666666;
  }
  .tip .text img:first-child {
    top: 0%;
    margin-left: .05rem;
  }
  .tip .text img:last-child {
    top: 48%;
    margin-left: .05rem;
  }
</style>

