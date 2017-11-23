<template>
  <div class="anniversary">
    <div class="header">
      <p v-if="activityInfo.status !== 2">活动时间:{{activityInfo.startTime | dateCharacter}}～{{activityInfo.endTime | dateCharacter}}</p>
      <p v-if="activityInfo.status === 2">活动已结束</p>
    </div>
    <div class="gift1">
      <div class="guang"></div>
      <div class="title">
        周年回馈  全民加息
      </div>
      <div class="content">
        <div class="explain">
          {{activityInfo.startTime | dateCharacter}}宏财网成立3周年当天，所有用户<span class="ft-o">待收本金总金额</span>(不含债权转让部分)都将享受额外3%当日加息奖励！
        </div>
        <div class="content-box position-re">
          <div class="mask position-ab" v-show="serverTime < activityInfo.startTime || activityInfo.status === 2">
            <div v-show="serverTime < activityInfo.startTime && activityInfo.status === 1">
              <img src="../../images/anniversary/lock.png" alt="" width="20%">
              <p>敬请期待...</p>
            </div>
            <p v-show="activityInfo.status === 2">活动已结束...</p>
          </div>
          <ul class="clearfix">
            <li></li>
            <li></li>
            <li>待收本金总金额</li>
            <li></li>
            <li></li>
          </ul>
          <p class="first-p">（不含债权转让部分）</p>
          <p class="second-p" v-if="token">{{totalPrincipal}}元</p>
          <p class="login-btn" v-if="!token" @click="toLogin()">我要登录</p>
          <p class="third-p">持仓越多,回馈越高,请继续保持哟！</p>
          <p class="last-p" v-if="token && totalPrincipal > 0">预计获得<span class="ft-o">{{oneDayProfit}}</span>元当日加息收益</p>
          <p class="invest-btn" v-if="token && totalPrincipal <= 0 && serverTime < PrincipalTime" @click="toProjectList()">我要投资</p>
        </div>
        <p class="tip">*实际获得奖励以{{activityInfo.startTime | dateCharacter}}24:00时的待收本金总金额为准</p>
      </div>
    </div>
    <div class="th3">
      <img src="../../images/anniversary/3th.png" alt="" width="20%" style="opacity:.2;">
    </div>
    <div class="gift2">
      <div class="guang"></div>
      <div class="title">
        投资有道  息上加息
      </div>
      <div class="content">
        <div class="explain">
          凡在{{activityInfo.startTime | dateCharacter}}至{{activityInfo.endTime | dateCharacter}}周年庆期间，<span class="ft-o">新增投资</span>的宏财精选、宏财尊贵项目都将享受额外3%连续加息3天的奖励！
        </div>
        <div class="content-box position-re">
          <div class="mask position-ab" v-show="serverTime < activityInfo.startTime || activityInfo.status === 2">
            <div v-show="serverTime < activityInfo.startTime && activityInfo.status === 1">
              <img src="../../images/anniversary/lock.png" alt="" width="20%">
              <p>敬请期待...</p>
            </div>
            <p v-show="activityInfo.status === 2">活动已结束...</p>
          </div>
          <ul class="clearfix">
            <li></li>
            <li></li>
            <li>新增投资金额</li>
            <li></li>
            <li></li>
          </ul>
          <p class="first-p">({{activityInfo.startTime | dateCharacter}}至{{activityInfo.endTime | dateCharacter}}活动期间)</p>
          <p class="second-p" v-if="token">{{AddInvestmentAmount}}元</p>
          <p class="login-btn" v-if="!token" @click="toLogin()">我要登录</p>
          <p class="third-p">新增投资,加息更多哟！</p>
          <p class="last-p" v-if="token && AddInvestmentAmount > 0">预计共获得<span class="ft-o">{{threeDayProfit}}</span>元加息收益</p>
          <p class="invest-btn" v-if="token && AddInvestmentAmount <= 0" @click="toProjectList()">我要投资</p>
        </div>
        <p class="tip">*不含债权转让部分</p>
      </div>
    </div>
    <div class="th3-1">
      <img src="../../images/anniversary/3th.png" alt="" width="20%" style="opacity:.2;">
    </div>
    <div class="act-rule">
      <div class="guang"></div>
      <div class="title">活动规则</div>
      <div class="rule-content clearfix">
        <div class="first-rule clearfix">
          <span>1</span>
          <div>
            活动时间</br>
            本次活动仅限于{{activityInfo.startTime | dateCharacter}}0时至{{activityInfo.endTime | dateCharacter}}24时内参与有效；
          </div>
        </div>
        <div class="first-rule clearfix">
          <span>2</span>
          <div>
            参与方式</br>
            {{activityInfo.startTime | dateCharacter}}三周年当天，用户待收本金(不含债权转让部分)均可享受3%当日加息奖励，待收本金总金额以当日24:00为准；</br>
            活动期间，用户新增投资宏财精选及宏财尊贵项目(不含债权转让项目)，新增投资部分均可享受额外3%连续加息3天的奖励；
          </div>
        </div>
        <div class="first-rule clearfix">
          <span>3</span>
          <div>
            奖励发放</br>
            三周年当天待收本金加息奖励将在次日上午7:00前发放到账，活动期间投资加息奖励将在活动结束次日上午7:00前，累计加息总收益一次性发放到账，您可前往【我的】页面>>【资金流水】中查看活动奖励获得的收益详情哟；
          </div>
        </div>
        <div class="first-rule clearfix">
          <span>4</span>
          <div>
            在法律规定范围内，宏财网保留本活动最终解释权。
          </div>
        </div>
      </div>
    </div>
    <p class="statement" v-if="isIos">该活动与设备生产商Apple Inc.公司无关</p>
  </div>
</template>
<script>
  import {Utils, bridgeUtil} from '../../service/Utils.js'
  export default {
    data () {
      return {
        isIos: Utils.isIos(),
        activityInfo: {
          startTime: 1513267200000,
          endTime: 1513440000000,
          status: 1 // 1 2 正常 结束
        },
        serverTime: 1513353600000, // serverTime < startTime 未开始
        PrincipalTime: new Date('2017/12/16').setHours(0, 0, 0, 0), // 1513353600000 2017.12.16 00:00:00
        totalPrincipal: 0, // 待收本金总金额
        AddInvestmentAmount: 0, // 新增投资总金额
        oneDayProfit: 0, // 当日加息总收益
        threeDayProfit: 0 // 三日加息总收益
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        val && val !== '' ? this.getTotalPrincipal() : null
        val && val !== '' ? this.getAddInvestment() : null
      }
    },
    created () {
      this.getActivityStatus()
      this.getServeTime()
      this.token ? this.getTotalPrincipal() : null
      this.token ? this.getAddInvestment() : null
    },
    methods: {
      toLogin () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {}, null)
      },
      toProjectList () {
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
      },
      getServeTime () {
        var that = this
        that.$http('/hongcai/rest/systems/serverTime').then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.serverTime = res.data.time
          }
        })
      },
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
          if (!res.data || res.data.ret === -1) {
            return
          }
          that.activityInfo = {
            startTime: res.data.startTime,
            endTime: res.data.endTime,
            status: res.data.status
          }
          that.PrincipalTime = new Date(new Date(that.activityInfo.startTime).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
        })
      },
      getTotalPrincipal () {
        var that = this
        that.$http({
          url: '/hongcai/rest/activity/thirdAnniversaries/0/investmentAmount?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.totalPrincipal = res.data.amount
            that.oneDayProfit = res.data.profit
          }
        })
      },
      getAddInvestment () {
        var that = this
        that.$http({
          url: '/hongcai/rest/activity/thirdAnniversaries/0/newInvestmentAmount?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.AddInvestmentAmount = res.data.amount
            that.threeDayProfit = res.data.profit
          }
        })
      }
    }
  }
</script>
<style scoped>
  .ft-o {
    color: #ea581e !important;
    font-weight: bold;
  }
  .anniversary {
    background-color: #110313;
    padding-bottom: .5rem;
  }
  .header {
    height: 7.2rem;
    padding-top: 3.53rem;
    background: url('../../images/anniversary/header.png') no-repeat center center;
    background-size: 100%;
  }
  .header p {
    color: #fff;
    padding: .15rem;
    background: url('../../images/anniversary/title-bg2.png') no-repeat center center;
    background-size: cover;
    position: relative;
    font-size: .23rem;
  }
  .gift1 {
    margin-top: -1.8rem;
  }
  .gift1 .guang, .gift2 .guang, .act-rule .guang {
    height: 1.5rem;
    background: url('../../images/anniversary/guang1.png') no-repeat center center;
    background-size: 100%;
    margin-top: -1rem;
  }
  .gift1 .guang {
    margin-top: -3.5rem;
  }
  .act-rule .guang {
    margin-top: -2rem;
  }
  .gift1 .title, .gift2 .title, .act-rule .title {
    height: 1rem;
    width: 74%;
    margin-left: 13%;
    background: url('../../images/anniversary/title.png') no-repeat top center;
    background-size: 100%;
    line-height: .75rem;
    color: #230629;
    font-weight: bold;
    font-size: .34rem;
    position: relative;
  }
  .act-rule .title {
    height: .7rem;
    width: 60%;
    margin-left: 20%;
    background: url('../../images/anniversary/title1.png') no-repeat top center;
    background-size: 100% 100%;
  }
  .gift1 .content, .gift2 .content {
    width: 90%;
    margin: -.6rem 0 0 5%;
    border-radius: .15rem;
    background-color: #fbecd5;
    padding: .44rem .24rem .3rem;
  }
  .gift2 .content {
    padding-bottom: .1rem;
  }
  .gift1 .content .explain, .gift2 .content .explain {
    text-align: justify;
    font-size: .255rem;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: justify;
    color: #221b2d;
  }
  .gift1 .content .content-box, .gift2 .content .content-box {
    margin-left: 1%;
    margin-top: .3rem;
    margin-bottom: .1rem;
    padding: .23rem 0 .4rem 0;
    background: url('../../images/anniversary/13.png') no-repeat center center;
    background-size: 100% 100%;
    background-color: #342a42;
    width: 98%;
    border-radius: .15rem;
    border: solid 1px #bd974c;
  }
  .gift2 .content .content-box {
    background-color: #4d2c16;
  }
  .content-box ul li {
    float: left;
    width: .16rem;
    border-radius: .12rem;
    background-color: rgba(84, 79, 92, .7);
    margin-right: .08rem;
  }
  .gift2 .content .content-box ul li {
    background-color: rgba(99, 81, 68, .7);
  }
  .content-box ul li:nth-child(1), .content-box ul li:nth-child(5) {
    height: .3rem;
    margin-top: .15rem;
  }
  .content-box ul li:nth-child(1) {
    margin-left: 18.6%;
  }
  .content-box ul li:nth-child(2), .content-box ul li:nth-child(4) {
    height: .4rem;
    margin-top: .1rem;
  }
  .content-box ul li:nth-child(3) {
    height: .6rem;
    width: 45%;
    text-align: center;
    line-height: .64rem;
	  color: #dcc1a8 !important;
    font-size: .29rem;
  }
  .content-box .first-p {
    color: #fff;
    font-size: .2rem;
    /* transform: scale(.9); */
  }
  .content-box .second-p {
    width: 80%;
    margin-left: 10%;
    margin-top: .3rem;
    background: url('../../images/anniversary/title-bg1.png') no-repeat center center;
    background-size: 100% 100%;
    padding: .07rem 0 .05rem;
    font-size: .4rem;
    font-weight: bold;
    color: #ea581e;
    line-height: 1.6;
  }
  .content-box .third-p {
    margin: .2rem 0 .07rem;
    color: #dcc1a8;
    font-size: .21rem;
  }
  .content-box .last-p {
    color: #bd974c;
    font-size: .21rem;
  }
  .content-box .invest-btn, .content-box .login-btn {
    height: .85rem;
    line-height: .87rem;
    text-align: center;
    font-size: .29rem;
    width: 55%;
    margin-left: 22.5%;
    border-radius: .45rem;
    background-image: linear-gradient(to top, #865834, #faa065);
    box-shadow: 0 2px 10px 0 rgba(255, 190, 122, 0.75);
    color: #fff;
  }
  .content-box .login-btn {
    margin-top: .4rem;
  }
  .content-box .last-p span.ft-o {
    font-size: .3rem;
  }
  .content-box .mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .9);
    border-radius: .15rem;
    border: solid 1px #bd974c;
    padding-top: 14%;
    font-size: .55rem;
    color: #ffffff;
  }
  @media (max-height: 505px) {
    .content-box .mask {
      padding-top: 8%;
    }
  }
  .content-box .mask>p:last-child {
    margin-top: 15%;
  }
  .content .tip {
    font-size: .2rem;
    line-height: 1.2;
    padding: 0 .1rem;
    text-align: justify;
    color: #bd974c;
  }
  .th3, .th3-1{
    position: relative;
    height: 2rem;
    background: url('../../images/anniversary/bg2.png') no-repeat bottom center ;
    background-size: 100%;
    margin-bottom: -2rem;
  }
  .th3-1 {
    background: url('../../images/anniversary/bg1.png') no-repeat bottom center;
    background-size: 100%;
  }
  .th3 img {
    margin-left: -65%;
    z-index: 10;
  }
  .th3-1 img {
    margin-left: 65%;
    z-index: 10;
  }
  .act-rule .title {
    font-size: .32rem;
  }
  .act-rule .rule-content {
    width: 90%;
    margin-left: 5%;
    background: url('../../images/anniversary/rule-bg.png') no-repeat center center;
    background-size: 100% 100%;
    border-radius: .15rem;
    color: #f3e6bd;
    text-align: justify;
    margin-top: -.35rem;
    padding: .65rem 0 0.3rem .4rem;
  }
  .act-rule .rule-content span {
    float: left;
    width: .4rem;
    height: .4rem;
    background: url('../../images/anniversary/dot.png') no-repeat 0 0;
    background-size: 100%;
    color: #795a30;
    text-align: center;
    line-height: .45rem;
    font-size: .32rem;
    margin-top: -.04rem;
    margin-right: .13rem;
  }
  .first-rule {
    margin-bottom: .2rem;
  }
  .first-rule div {
    float: left;
    width: 82%;
    font-size: .23rem;
    line-height: 1.4;
  }
  .statement {
    margin-top: .4rem;
    font-size: .2rem;
    color: #a69d83;
  }
</style>
