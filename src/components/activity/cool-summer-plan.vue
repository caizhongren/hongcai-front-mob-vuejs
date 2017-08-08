<template>
  <div class="CoolSummerPlan">
    <div class="header">
      <div class="imgs">
        <img src="../../images/summer-plan/header1.png" alt="">
        <img src="../../images/summer-plan/header2.png" alt="">
        <img src="../../images/summer-plan/header3.png" alt="">
        <img src="../../images/summer-plan/header4.png" alt="">
        <img src="../../images/summer-plan/header5.png" alt="">
      </div>
      <div class="time">
        活动时间：2017.8.8—2017.8.31
      </div>
    </div>
    <div class="High-temperature-subsidies">
      <img src="../../images/summer-plan/gwbt.png" alt="" width="60%">
    </div>
    <ul class="cashCoupons">
      <li v-for="cashCoupon in cashCoupons">
        <div class="amount">
          <span>元</span>
          <img v-bind:src="cashCoupon.imgSrc" alt="" v-bind:style="{ width: cashCoupon.imgWidth + '%' }"> 
        </div>
        <div class="conditions">
          <p>投资项目 &nbsp;&nbsp;&nbsp; {{cashCoupon.type === '5' ? '精选' : '尊贵'}}</p>
          <p>起投金额 &nbsp;&nbsp;&nbsp; {{cashCoupon.minInvestAmount/1000 <10 ? cashCoupon.minInvestAmount/1000 +' 千' : cashCoupon.minInvestAmount/10000 >=1 ? cashCoupon.minInvestAmount/10000 +' 万' : ''}}</p>
        </div>
        <div class="getCoupon" @click="getCoolCoupons(cashCoupon.level)" :disabled="busy">点击领取</div>
      </li>
    </ul>
    <div class="RankingList">
      <div class="title">
        <img src="../../images/summer-plan/qlphb.png" alt="" width="60%">
      </div>
      <div class="text">
        活动期间，新增投资<span class="yell-ft ft-bold">精选项目</span>每满1000元，可获得<span class="yell-ft ft-bold">1清凉积分</span>
        <br>新增投资<span class="yell-ft ft-bold">尊贵项目</span>每满1000元，可获得<span class="yell-ft ft-bold">5清凉积分</span>
        <br><br>活动结束后，根据所获积分名次，可以获得<span class="yell-ft ft-bold">所获清凉积分 x 1000 x 相应倍数的特权本金奖励</span>(有效期1天)
      </div>
    </div>
    <div class="RankingTable">
      <div class="mask"></div>
      <ul class="table">
        <li>
          <p>名次</p>
          <p>可获特权本金奖励</p>
        </li>
        <li>
          <p>第1名</p>
          <p>5倍</p>
        </li>
        <li>
          <p>第2～5名</p>
          <p>3倍</p>
        </li>
        <li>
          <p>第6～10名</p>
          <p>2倍</p>
        </li>
        <li>
          <p>第11～50名</p>
          <p>1.5倍</p>
        </li>
        <li>
          <p>第50名外</p>
          <p>1倍</p>
        </li>
      </ul>
    </div>
    <div class="expro">
      <img src="../../images/summer-plan/expro.png" alt="" width="20%">
      <div class="expro-txt">
        假如用户小财活动期间新增投资精选项目50000元、尊贵项目125000元
        <br>则他的清凉积分为50x1+125x5=675分
        <br><br>活动结束后，如正好排名为第5名
        <br>则可获得675x1000x3倍=2025000元特权本金奖励！(有效期1天)
      </div>
      <div class="gotoRanking" @click="toCoolRank">查看排行榜</div>
    </div>
    <div class="integral">
      <div class="title">
        <img src="../../images/summer-plan/wdqljf.png" alt="" width="60%">
      </div>
      <div class="RankingTable">
        <div class="mask-integral"></div>
         <ul class="table" v-if="token !== ''">
          <li>
            <p>我当前的积分</p>
            <p>我的清凉排名</p>
          </li>
          <li>
            <p>
              <span class="IntegralDetail">{{userScores.score}}</span>
              <br><u @click="toIntegralDetail">查看详情&gt;&gt;</u>
            </p>
            <p v-if="userScores.score > 0">第{{userScores.top}}名</p>
            <p v-else="userScores.score <= 0">暂无</p>
          </li>
        </ul> 
        <div class="needLogin" v-if="token === ''">
          <p>登录后即可查看您的清凉积分及清凉排名</p>
          <div class="gotoLogin" @click="toLogin">立即登录</div>
        </div>
      </div>
      <div class="updata">数据每5分钟更新一次，如出现积分相同情况时，根据投资时间先后进行排名.</div>
    </div>
    <div class="iosTip" v-if="isIOS">该活动与设备生产商Apple Inc.公司无关</div>
    <img class="rule-btn" src="../../images/summer-plan/rule-btn.png" alt="" width="22%" @click="ruleSelect">
    <!-- 活动规则弹窗 -->
    <div class="dialog mask-common" v-if="showRule" v-auto-height>
      <img src="../../images/summer-plan/close.png" alt="" width="8%" class="closeRule"  @click="ruleSelect">
      <div class="ruleBox">
        <img src="../../images/summer-plan/close.png" alt="" width="8%" class="closeRule"  @click="ruleSelect">
        <div class="rule">
          1.活动时间
          <br>本次活动仅限于2017年8月8日至2017年8月31日内参与有效；
        </div>
        <div class="rule">
          2.参与方式
          <br>活动期间，根据不同项目类型，用户新增投资金额每满1000元，均可获得清凉积分，活动结束后，将根据积分排名，获得相应倍数的特权本金奖励(有效期1天)；
        </div>
        <div class="rule">
          3.关于现金券
          <br>高温补贴现金券仅限活动期间领取，每天每人限领10次，现金券当日领取当日有效，过期作废，还请您及时使用；
        </div>
        <div class="rule">
          4.奖励发放
          <br>特权本金奖励将于活动结束后3个工作日内进行核对并发放到账，到账次日即可产生收益；
        </div>
        <div class="rule">
          5.奖励说明
          <br>特权本金是平台向用户提供的一种虚拟资金，用于回馈奖励等活动。其本身不可提现或用于投资，但享受8%年化收益率。根据不同的活动规则，特权本金具有不同的计息时长，每日计息产生的收益直接发放至用户可用余额，可用于提现或投资；
        </div>
      </div>
    </div>
    <!-- 领取成功弹窗 -->
    <div class="dialog mask-common" v-if="receiveBG">
      <div class="successBg">
        <div v-if="token !== ''">
          <div class="receive" v-if="receiveSuccess">
            <img src="../../images/summer-plan/receive.png" alt="" width="50%">
            <p>可前往我的优惠券查看</p>
          </div>
          <div class="UpperLimit" v-if="UpperLimit">
            您已经领取<span>10次</span>啦! <br>明天再来哦～
          </div>
          <div class="activityEnd" v-if="activityEnd">
            活动结束啦，下次早点来哦～
          </div>
          <div class="IKnowBtn" @click="ShowReceive">我知道了</div>
        </div>
        <div class="Login" v-if="token === ''">
          <p>登录后才可以领取哦～</p> 
          <div class="cancel fl" @click="ShowReceive">取消</div>
          <div class="toLogin fr" @click="toLogin">去登录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Utils, bridgeUtil, ModalHelper} from '../../service/Utils'
  export default {
    name: 'CoolSummerPlan',
    props: ['token'],
    data () {
      return {
        showRule: false,
        isIOS: Utils.isIos(),
        receiveBG: false,
        receiveSuccess: false,
        UpperLimit: false,
        activityEnd: false,
        cashCoupons: [
          {
            value: 8,
            type: '5',
            minInvestAmount: 5000,
            imgSrc: '../../../static/images/8.png',
            imgWidth: 13,
            level: 1
          }, {
            value: 18,
            type: '6',
            minInvestAmount: 3000,
            imgSrc: '../../../static/images/18-2.png',
            imgWidth: 18,
            level: 4
          }, {
            value: 18,
            type: '5',
            minInvestAmount: 10000,
            imgSrc: '../../../static/images/18-1.png',
            imgWidth: 18,
            level: 2
          }, {
            value: 78,
            type: '6',
            minInvestAmount: 10000,
            imgSrc: '../../../static/images/78.png',
            imgWidth: 26,
            level: 5
          }, {
            value: 58,
            type: '5',
            minInvestAmount: 30000,
            imgSrc: '../../../static/images/58.png',
            imgWidth: 26,
            level: 3
          }, {
            value: 158,
            type: '6',
            minInvestAmount: 20000,
            imgSrc: '../../../static/images/158.png',
            imgWidth: 31,
            level: 6
          }
        ],
        userScores: {
          score: 0,
          top: 0
        },
        busy: false
      }
    },
    watch: {
      token: function (val) {
        if (val && val !== '') {
          this.getUserScores()
        }
      }
    },
    created: function () {
      this.getUserScores()
    },
    methods: {
      ruleSelect: function () {
        this.showRule = !this.showRule
        if (this.showRule) {
          ModalHelper.afterOpen()
        } else {
          ModalHelper.beforeClose()
        }
      },
      ShowReceive: function () {
        this.receiveBG = !this.receiveBG
        if (this.receiveBG) {
          ModalHelper.afterOpen()
        } else {
          ModalHelper.beforeClose()
        }
      },
      getUserScores: function () {
        var that = this
        that.$http({
          method: 'GET',
          url: '/hongcai/rest/activitys/summer/scores/0?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.userScores = res.data
          }
        })
      },
      getCoolCoupons: function (level) {
        var that = this
        if (that.busy) {
          return
        }
        if (that.token === '') {
          that.ShowReceive()
          return
        }
        that.busy = true
        setTimeout(function () {
          that.busy = false
        }, 300)
        that.$http.post('/hongcai/rest/users/0/coupons/takeCoolCoupons', {
          token: that.token,
          level: level
        }).then((response) => {
          that.receiveSuccess = false
          that.UpperLimit = false
          that.activityEnd = false
          if (response.data && response.data.ret === 1) {
            that.receiveSuccess = true
          } else if (response.data.ret === -1 && response.data.code === -1304) {
            that.UpperLimit = true
          } else if (response.data.ret === -1 && response.data.code === -1041) {
            that.activityEnd = true
          }
          that.ShowReceive()
        })
      },
      toCoolRank: function () {
        this.$router.push({name: 'CoolRanking'})
      },
      toIntegralDetail: function () {
        this.$router.push({name: 'IntegralDetail'})
      },
      toLogin: function () {
        bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, null)
        this.receiveBG = false
        ModalHelper.beforeClose()
      }
    }
  }
</script>
<style scoped>
  .IntegralDetail {
    position: relative;
    top: -.2rem;
  }
  .CoolSummerPlan {
    width: 100%;
    background: url('../../images/summer-plan/bg-02-1.png') repeat-y center center;
    font-family: Arial;
  }
  .UpperLimit, .activityEnd {
    font-size: .36rem;
    color: #023532;
    padding: 1.18rem 0 .82rem;
  }
  .UpperLimit span {
    color: #dca665;
  }
  .Login p {
    font-size: .36rem;
    color: #023532;
    padding: 1.34rem 0 1.2rem;
    margin: 0 auto;
  }
  .Login .cancel {
    margin-left: .3rem;
    color: #dca665;
  }
  .Login .toLogin {
    margin-right: .3rem;
    color: #0b8979;
  }
  .successBg {
    width: 5.72rem;
    height: 4rem;
    background: url('../../images/summer-plan/receive-bg.png') no-repeat center center;
    background-size: contain;
    margin: 2rem auto;
    text-align: center;
    padding: 0 .3rem;
  }
  .receive img {
    margin: 1rem 0 .31rem;
  }
  .receive p {
    font-size: .26rem;
    color: #023532;
    margin-bottom: .76rem;
  }
  .IKnowBtn, .cancel, .toLogin {
    font-size: .32rem;
    color: #0b8979;
    width: 2rem;
    height: .65rem;
    line-height: .65rem;
    background: url('../../images/summer-plan/ckphb-btn.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .closeRule {
    position: absolute; 
    right: .8rem;
    top: 0.75rem;
  }
  .ruleBox {
    width: 5.72rem;
    height: 7.18rem;
    border: 1px solid #00ffe4;
    background: #1e9781;
    border-radius: .25rem;
    overflow-y: auto;
    padding: .56rem;
    color: #effffd;
    font-size: .26rem;
    text-align: justify;
    line-height: .4rem;
    margin: 1.8rem auto;
    -webkit-overflow-scrolling: touch;
  }
  @media(max-height: 480px) {
    .ruleBox {
      height: 5.18rem;
    }
  }
  .ruleBox .rule {
    margin-bottom: .2rem;
  }
  .header {
    position: relative;
  }
  .header .imgs img {
    width: 100%;
    vertical-align: top;
  }
  .time {
    position: absolute;
    bottom: .65rem;
    left: 1.7rem;
    color: #fff;
    background: #139066;
    padding: .026rem .2rem;
    text-align: center;
    font-size: .2rem;
    height: .34rem;
    line-height: .33rem;
    border-radius: .5rem;
    transform: scale(.85); 
  }
  .High-temperature-subsidies {
    padding: .42rem 0 0.5rem;
    margin: 0 auto;
  }
  .conditions {
    text-align: center;
    font-size: .22rem;
    color: #0f4c45;
  }
  .cashCoupons {
    overflow: hidden;
  }
  .cashCoupons li {
    width: 50%;
     height: 3.5rem;
    float: left;
    margin: 0 auto;
    margin-top: -.6rem;
  }
  .cashCoupons li:nth-child(even) {
    background: url('../../images/summer-plan/zg-bg.png') no-repeat -20px 0;
    background-size: cover;
  }
  .cashCoupons li:nth-child(odd) {
    background: url('../../images/summer-plan/jx-bg.png') no-repeat -20px 0;
    background-size: cover;
  }
  .cashCoupons .amount {
    padding-top: 1rem;
    padding-left: .15rem;
  }
  .cashCoupons .amount span {
    display: inline-block;
    width: .25rem;
    height: .25rem;
    line-height: .3rem;
    position: absolute;
    margin-left: -.35rem;
    font-size: .2rem;
    border-radius: 50%;
  }
  .cashCoupons li:nth-child(odd) .amount span {
    color: #14ab9d;
    border: 1px solid #14ab9d;
  }
  .cashCoupons li:nth-child(even) .amount span {
    color: #dca665;
    border: 1px solid #dca665;
  }
  .getCoupon {
    width: 1.31rem;
    height: .44rem;
    line-height: .44rem;
    color: #ffc703;
    text-align: center;
    font-size: .26rem;
    border: 1px solid #ffc703;
    border-radius: .5rem;
    background: transparent;
    margin: .18rem auto 0rem;
    position: relative;
    top: -.15rem;
  }
  .RankingList {
    color: #effffd;
    font-size: .26rem;
    text-align: justify;
  }
  .RankingList .title {
    text-align: center;
    padding: .8rem 0 .5rem;
  }
  .RankingList .text {
    padding: 0 .5rem .8rem;
    line-height: .38rem;
  }
  .yell-ft {
    color: #fcff00;
  }
  .RankingTable {
    background: #1dc9a3;
    margin: 0 .5rem;
    padding: .2rem;
    border-radius: .35rem;
  }
  .mask, .mask-integral {
    background: url('../../images/summer-plan/bg-02-1.png') repeat-y center center;
    border-radius: .15rem;
    width: 5rem;
    height: 6.1rem;
    position: absolute;
    z-index: 22;
  }
  .mask-integral {
    height: 2.5rem;
  }
  .RankingTable .table {
    background: rgba(4,90,57,.3); 
    border-radius: .15rem;
    overflow: hidden; 
    clear: both; 
    padding: .25rem 0;
    position: relative;
    z-index: 222;
  }
  .RankingTable ul.table li p {
    float: left;
    height: 1rem;
    line-height: 1rem;
    color: #effffd;
    font-size: .26rem;
    text-align: center;
  }
  .RankingTable ul.table li p:nth-child(1) {
    width: 45%;
    border-right: 1px solid #92ccc2;
  }
  .RankingTable ul.table li p:nth-child(2) {
    width: 55%;
  }
  .RankingTable ul.table li {
    border-bottom: 1px solid #92ccc2;
    overflow: hidden;
    clear: both;
  }
  .RankingTable ul.table li:last-child {
    border-bottom: 0;
  }
  .RankingTable ul.table li:first-child p {
    color: #eaff00;
    height: .75rem;
    line-height: .6rem;
  }
  .RankingTable ul.table li:last-child p {
    height: .75rem;
    line-height: 1rem;
  }
  .expro-txt {
    padding: .36rem .5rem 0rem;
    color: #effffd;
    text-align: justify;
    font-size: .26rem;
  }
  .gotoRanking, .gotoLogin {
    background: url('../../images/summer-plan/ckphb-btn.png') no-repeat center center; 
    background-size: contain;
    width: 50%;
    height: .8rem;
    line-height: .85rem;
    color: #0b8979;
    font-size: .3rem;
    margin: 0.3rem auto 0;
  }
  .integral .title {
    padding: 1.3rem 0 .5rem;
  }
  .integral .RankingTable ul.table li p:nth-child(1), .integral .RankingTable ul.table li p:nth-child(2) {
    width: 50%;
    height: .8rem;
    line-height: .6rem;
  }
  .integral .RankingTable ul.table li:nth-child(1) {
    font-size: .31rem;
  }
  .integral .RankingTable ul.table li:nth-child(2) p {
    height: 1.2rem;
    line-height: 1.4rem;
  }
  .integral .RankingTable ul.table li:nth-child(2) p:nth-child(1) u {
    color: #eaff00;
    position: relative;
    top: -1.1rem;
  }
  .RankingTable .needLogin {
    color: #effffd;
    text-align: center;
    padding: 0.2rem .3rem;
    font-size: .26rem;
    height: 2.5rem;
    position: relative;
    z-index: 222;
    background: rgba(4,90,57,.3);
    border-radius: .15rem;
  }
  .gotoLogin {
    width: 70%;
  }
  .updata {
    color: #effffd;
    font-size: .22rem;
    text-align: justify;
    padding: .4rem 0.5rem .72rem;
  }
  .iosTip {
    text-align: center;
    color: #effffd;
    font-size: .22rem;
    height: 1rem;
    line-height: 1rem;
    background: #0d6f52;
  }
  .rule-btn {
    position: fixed;
    top: 27.5%;
    right: 0;
    z-index: 999;
  }
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:5px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0.1);
    -webkit-box-shadow:rgba(0,0,0,0.5);
  }
</style>
