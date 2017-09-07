<template>
  <!-- activityStatus(1: 活动未结束，2: 活动结束), firstInvest: 是否首投, takeStatus: (1: 未领取, 2: 已领取, 3: 未达标), rewardType: (0: 无奖励, 2: 三个月VIP, 3: 半年VIP, 4: 全年VIP, 5: 全年全屏VIP) -->
  <div class="Mango">
    <div class="head-img">
      <div class="logo"></div>
      <div class="head-txt">携手宏财网 &nbsp;&nbsp;&nbsp; 开启新视界</div>
    </div>
    <!-- 礼遇1\2 -->
    <div class="courtesies">
      <!-- 礼遇1 -->
      <div class="courtesy1">
        <p class="courtesy-title">0元变身VIP，追星看剧更华丽</p>
      </div>
      <div class="courtesy1-content comm-bg">
        <div class="courtesy1-lf" v-bind:class="{ 'courtesy1-lf-end': activityStatus === 2 }">
          <div class="pic"></div>
          <div class="stock" v-show="activityStatus === 1"><p>{{activityStatus === 1 && monthCount <= 0 ? '补货中' : '剩余：' + monthCount + '份'}}</p></div>
        </div>
        <div class="courtesy1-rt" v-show="activityStatus === 1">
          <div class="txt margin-b-1" v-if="userAuth.active && userAuth.authStatus === 2">您的<span class="ft-org">芒果TV会员1个月</span>奖励兑换码已自动发送至您的站内信提醒</div>
          <div class="txt" v-if="!userAuth.active || userAuth.authStatus !== 2">您已获得<span class="ft-org">芒果TV会员1个月</span>奖励资格，开通银行存管后，兑换码将自动发送至您的站内信提醒</div>
          <div class="InvestBtn" @click="toCheckAuth">{{userAuth.active && userAuth.authStatus === 2 ? '查看兑换码' : '立即开通'}}</div>
        </div>
        <div class="courtesy1-end fr" v-show="activityStatus === 2">
          <img src="../../images/mangoTV/activityEnd.png" alt="">
        </div>
      </div>
      <!-- 礼遇2 -->
      <div class="courtesy2">
        <p class="courtesy-title">首投VIP再升级，季卡年卡送给你</p>
      </div>
      <div class="courtesy2-content comm-bg">
        <ul class="courtesy2-card">
          <li v-for="card in Member">
            <div class="card">
              <p class="card-limit">首笔投资满{{card.minInvestAmount}}元</p>
            </div>
            <p class="stock" v-show="activityStatus === 1">{{activityStatus === 1 && card.countNum <= 0 ? '补货中' : '剩余：' + card.countNum + '份'}}</p>
          </li>
          <img src="../../images/mangoTV/act-ending.png" alt="" class="actEnd" v-show="activityStatus === 2">
        </ul>
        <!-- 我的奖励 -->
        <div class="reward" v-show="showRewardHead">
          <img src="../../images/mangoTV/act-reward.png" alt="" width="70%">
          <!-- 未进行过投资 -->
          <div class="noInvest" v-show="activityStatus === 1 && !firstInvest">
            您还未进行过投资呢！<br>
            快去挑选好想要的奖励，
            <p class="tips-red">投资达标再来活动页兑换吧～</p>
          </div>
          <!-- 投资为满足兑换条件 -->
          <div class="noInvest" v-show="firstInvest && takeStatus === 3">
            <p>您首次投资金额未满足以上奖励兑换条件，前往首页，还有更多精彩活动等您参与～</p>
          </div>
          <!-- 获得奖励未兑换 -->
          <div class="notExchange" v-show="firstInvest && takeStatus !== 3" v-bind:class="{ 'reward-1': rewardType===2, 'reward-2': rewardType===3, 'reward-3': rewardType===4, 'reward-4': rewardType===5 }">
            <!-- 奖励已兑换 -->
            <img src="../../images/mangoTV/act-exchange.png" alt="" class="exchange" v-show="takeStatus === 2">
          </div>
          <div class="InvestBtn" @click="toMessage()" v-show="firstInvest && takeStatus === 2">查看兑换码</div>
          <div class="InvestBtn" @click="takeReward()" v-show="firstInvest && takeStatus === 1">立即兑换</div>
          <div class="InvestBtn" @click="toInvestList()" v-show="!firstInvest">立即投资</div>
        </div>
        <div class="hot-tips">
          *温馨提示: <br>
          活动首投仅限宏财精选、宏财尊贵项目有效，债权转让项目不参与本次活动。<br>
          奖励剩余数量每分钟更新一次。
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div>
      <div class="rule-head"></div>
      <div class="ruleBox comm-bg">
        <div class="rule">
          <span class="rule-no">1.</span>
          <span class="rule-txt">活动奖励数量有限，先到先得，兑完即止，如活动结束后7天内还未兑换，则奖励失效；</span>
        </div>
        <div class="rule">
          <span class="rule-no">2.</span>
          <span class="rule-txt">您的芒果TV会员兑换码领取兑换后，将发送至站内信提醒中，前往【我的】页面，点击右上角<img src="../../images/mangoTV/act-msg.png" title="站内信" width="6%"/>，进入站内信【提醒】即可查看；</span>
        </div>
        <div class="rule">
          <span class="rule-no">3.</span>
          <span class="rule-txt">礼遇一与礼遇二奖励可叠加获得，但礼遇二奖励仅可兑换一次，一定要看准兑换条件再进行投资哟；</span>
        </div>
        <div class="rule">
          <span class="rule-no">4.</span>
          <span class="rule-txt">如发现用户活动中涉及造假、作弊等嫌疑，平台有权利取消其获奖资格并冻结账号；</span>
        </div>
        <div class="rule margin-b-0">
          <span class="rule-no">5.</span>
          <span class="rule-txt">在法律规定范围内，平台保留本活动最终解释权；</span>
        </div>
      </div>
    </div>
    <div class="iosTip" v-show="isIos">该活动与设备生产商Apple Inc.公司无关</div>
    <!-- 领取成功弹窗 -->
    <div class="dialog mask-common" v-if="showMask">
      <div class="successBg">
        <!-- 补货中 -->
        <div v-if="upperLimit">
          <div class="upperLimit">
            <img src="../../images/mangoTV/act-upperLimit.png" alt="" class="receive-title">
            <p class="receive-cont">该奖励今日已兑完！正在火速补货中，明天再来试试吧！</p>
          </div>
          <div class="IKnowBtn" @click="ShowReceive">我知道了</div>
        </div>
        <!-- 查看兑换码 -->
        <div v-if="receiveBox">
          <div class="receive">
            <img src="../../images/mangoTV/act-receive.png" alt="" class="receive-title">
            <p class="receive-cont">前往【我的】页面点击右上角，进入站内信【提醒】即可查看咯！</p>
          </div>
          <div class="btns">
            <div class="IKnowBtn fl" @click="ShowReceive">我知道了</div>
            <div class="toMessage fr" @click="toMessage">查看兑换码</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Utils, bridgeUtil, ModalHelper} from '../../service/Utils'
  export default {
    name: 'Mango',
    data () {
      return {
        Member: [
          {
            minInvestAmount: 100,
            countNum: 100
          },
          {
            minInvestAmount: 100,
            countNum: 100
          },
          {
            minInvestAmount: 100,
            countNum: 100
          },
          {
            minInvestAmount: 100,
            countNum: 100
          }
        ],
        isIos: Utils.isIos(),
        userAuth: {
          active: false,
          authStatus: Number
        },
        monthCount: 0,
        showRewardHead: true,
        firstInvest: false,
        takeStatus: 3,
        activityStatus: 1,
        showMask: false,
        receiveBox: false,
        upperLimit: false,
        rewardType: 0,
        busy: false
      }
    },
    props: ['token'],
    watch: {
      token: function (value) {
        if (value && value !== '') {
          this.getUserAuth()
          this.getMyReward()
        }
      }
    },
    created: function () {
      this.getAllaward()
      this.token ? this.getUserAuth() : ''
      this.token ? this.getMyReward() : ''
    },
    methods: {
      ShowReceive: function () {
        this.receiveBox = false
        this.upperLimit = false
        this.showMask = !this.showMask
        this.showMask ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      getUserAuth: function () {
        var that = this
        that.$http({
          methods: 'get',
          url: '/hongcai/rest/users/0/userAuth?token=' + that.token
        }).then(function (response) {
          if (response.data && response.data.ret !== -1) {
            that.userAuth = response.data
          }
        })
      },
      getAllaward: function () {
        var that = this
        that.$http({
          methods: 'get',
          url: '/hongcai/rest/activitys/mango/award'
        }).then(function (response) {
          if (response.data && response.data.ret !== -1) {
            that.Member = response.data.list
            that.monthCount = response.data.monthCount
            that.activityStatus = response.data.activityStatus
          }
        })
      },
      getMyReward: function () {
        var that = this
        that.$http({
          methods: 'get',
          url: '/hongcai/rest/activitys/mango/0/myReward?token=' + that.token
        }).then(function (response) {
          if (response.data && response.data.ret !== -1) {
            that.firstInvest = response.data.firstInvest
            that.takeStatus = response.data.takeStatus
            that.rewardType = response.data.rewardType
            if (!that.firstInvest && that.activityStatus === 2) {
              that.showRewardHead = false
            } else {
              that.showRewardHead = true
            }
          }
        })
      },
      takeReward: function () {
        var that = this
        if (that.busy) {
          return
        }
        if (that.token === '') {
          return
        }
        that.busy = true
        setTimeout(function () {
          that.busy = false
        }, 300)
        that.$http.post('/hongcai/rest/activitys/mango/0/takeReward', {
          token: that.token
        }).then(function (response) {
          if (response.data && response.data.ret !== -1) {
            that.ShowReceive()
            response.data.success ? that.receiveBox = true : that.upperLimit = true
            that.getMyReward()
          } else {
            alert(response.data.msg)
          }
        })
      },
      toMessage: function () {
        this.showMask = false
        bridgeUtil.webConnectNative('HCNative_GoMessage', null, {}, function (response) {}, null)
      },
      toCheckAuth: function () {
        if (!this.token || this.token === '') {
          alert('您还未登录，请先登录！')
          return
        }
        if (this.userAuth.active && this.userAuth.authStatus === 2) {
          this.toMessage()
        } else {
          bridgeUtil.webConnectNative('HCNative_CheckUserAuth', null, {}, function (response) {}, null)
        }
      },
      toInvestList: function () {
        if (!this.token || this.token === '') {
          alert('您还未登录，请先登录！')
          return
        }
        bridgeUtil.webConnectNative('HCNative_GoInvestList', null, {}, function (response) {}, null)
      }
    }
  }
</script>
<style scoped>
  .margin-b-1 {
    margin-bottom: .35rem;
  }
  .margin-b-0 {
    margin-bottom: 0 !important;
  }
  .Mango {
    background: #ff4b64;
    background: url('../../images/mangoTV/bg.png') no-repeat 0 0;
    background-size: 100% 100%;
    overflow: hidden;
    font-family: PingFang-SC;
  }
  .courtesies {
    /* padding: 0 .29rem 0 .14rem; */
  }
  .logo {
    width: 100%;
    height: 0.65rem;
    position: absolute;
    top: .6rem;
    background: url('../../images/mangoTV/logo.png') no-repeat center center;
    background-size: contain;
  }
  .head-img {
    width: 100%;
    height: 6.4rem;
    position: relative;
    margin-top: -.6rem;
    background: url('../../images/mangoTV/act-head.png') no-repeat center center;
    background-size: contain;
  }
  .head-txt {
    position: absolute;
    bottom: 1.55rem;
    left: 30%;
    height: .3rem;
    line-height: .36rem;
    font-size: .25rem;
    font-weight: 500;
    letter-spacing: -1.2px;
    color: #ffffff;
    text-shadow: 0 1px 0 rgba(61, 66, 64, 0.38);
  }
  .courtesy1 {
    width: 100%;
    margin-top: -.8rem;
    padding-top: 1.02rem;
    height: 1.63rem;
    background: url('../../images/mangoTV/act-courtesy1.png') no-repeat .09rem 0;
    background-size: contain;
  }
  .courtesy2 {
    width: 100%;
    height: 1.63rem;
    padding-top: 1.02rem;
    background: url('../../images/mangoTV/act-courtesy2-head.png') no-repeat .098rem 0;
    background-size: contain;
    margin-top: .25rem;
  }
  .courtesy-title {
    font-size: .25rem;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-align: left;
    color: #ffffff;
    margin-left: 31%;
  }
  .courtesy1-content {
    overflow: hidden;
    clear: both;
    margin: -1px 4.4% 0 4.3%;
    text-align: center;
  }
  .courtesy1-lf, .courtesy1-rt {
    float: left;
  }
  .courtesy1-lf {
    width: 45%;
  }
  .courtesy1-rt {
    width: 50%;
    float: right;
  }
  .courtesy1-lf .pic {
    height: 1.5rem;
    border-radius: 5px;
    background-color: #5ba4f1;
    background: url('../../images/mangoTV/courtesy1-vip.png') no-repeat center center;
    background-size: contain;
  }
  .stock {
    width: 1.8rem;
    height: .4rem;
    border-radius: .5rem;
    /* background-image: linear-gradient(277deg, #2af8b3, #fee97a); */
    /* border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(277deg, #2af8b3, #fee97a);
    border-image-slice: 1; */
    border: 1px solid #2af8b3;
    font-size: .21rem;
    font-weight: bold;
    line-height: .4rem;
    letter-spacing: -0.3px;
    color: #8e8c8c;
    margin-top: .15rem;
  }
  .courtesy1-end {
    width: 40%;
  }
  .courtesy1-end img {
    width: 94%;
    margin-top: .7rem;
  }
  .courtesy1-lf.courtesy1-lf-end {
    width: 55%;
  }
  .courtesy1-lf.courtesy1-lf-end .pic {
    height: 1.8rem;
  }
  .courtesy1-rt .txt {
    font-size: .23rem;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: 0.7px;
    text-align: justify;
    color: #333333;
  }
  .txt .ft-org {
    color: #ff5500;
  }
  .InvestBtn {
    width: 100%;
    height: .93rem;
    line-height: .95rem;
    font-size: .3rem;
    font-weight: bold;
    letter-spacing: 0.7px;
    text-align: center;
    color: #fd6200;
    margin: 0 auto;
    background: url('../../images/mangoTV/change-btn.png') no-repeat center center;
    background-size: contain;
  }
  .courtesy2-content {
    margin: -1px 4.2% 0 4.2%;
    padding: 0 .25rem .2rem;
  }
  .courtesy2-card {
    overflow: hidden;
    clear: both;
    text-align: center;
    position: relative;
  }
  .courtesy2-card li {
    width: 48%;
    margin-bottom: .3rem;
  }
  .actEnd {
    position: absolute;
    width: 50%;
    left: 25%;
    top: 18%;
  }
  .card-limit {
    font-size: .24rem;
    font-weight: 500;
    line-height: 1.29;
    letter-spacing: -0.4px;
    color: #666666;
  }
  .courtesy2-card li:nth-child(odd) {
    float: left;
  }
  .courtesy2-card li:nth-child(even) {
    float: right;
  }
  .courtesy2-card li .card {
    border-radius: .2rem;
    padding-top: 1.33rem;
    height: 1.8rem;
  }
  .courtesy2-card li:nth-child(1) .card {
    background: url('../../images/mangoTV/vip1.png') no-repeat center center;
    background-size: contain;
  }
  .courtesy2-card li:nth-child(2) .card {
    background: url('../../images/mangoTV/vip2.png') no-repeat center center;
    background-size: contain;
  }
  .courtesy2-card li:nth-child(3) .card {
    background: url('../../images/mangoTV/vip3.png') no-repeat center center;
    background-size: contain;
  }
  .courtesy2-card li:nth-child(4) .card {
    background: url('../../images/mangoTV/vip4.png') no-repeat center center;
    background-size: contain;
  }
  .reward {
    padding: 0.3rem 0.1rem .25rem;
    text-align: center;
  }
  .noInvest {
    width: 75%;
    object-fit: contain;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 3.5px 0 rgba(167, 76, 36, 0.74);
    border: solid 1px #ffee5d;
    margin: 0.2rem auto .5rem;
    padding: .25rem .15rem;
    font-size: .24rem;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.4px;
    color: #666666;
  }
  .notExchange {
    height: 2.2rem;
    margin: 0.2rem auto;
    position: relative;
  }
  .reward-1 {
    background: url('../../images/mangoTV/reward-1.png') no-repeat center center;
    background-size: contain;
  }
  .reward-2 {
    background: url('../../images/mangoTV/reward-2.png') no-repeat center center;
    background-size: contain;
  }
  .reward-3 {
    background: url('../../images/mangoTV/reward-3.png') no-repeat center center;
    background-size: contain;
  }
  .reward-4 {
    background: url('../../images/mangoTV/reward-4.png') no-repeat center center;
    background-size: contain;
  }
  .exchange {
    width: 35%;
    position: absolute;
    right: -10%;
    top: -18%;
  }
  .tips-red {
    font-weight: bold;
	  color: #fd6a00;
  }
  .hot-tips {
    color: #ff4b64;
    text-align: justify;
    font-size: .2rem;
  }
  .ruleBox {
    text-align: justify;
    color: rgba(51, 51, 51, 0.87);
    font-size: .24rem;
    margin: -1px 4.31% .8rem 4.4%;
    
  }
  .rule-head {
    width: 100%;
    height: 1.96rem;
    background: url('../../images/mangoTV/act-rules.png') no-repeat center center;
    background-size: contain;
    margin-top: .3rem;
  }
  .rule {
    margin-bottom: .35rem;
    overflow: hidden;
    clear: both;
  }
  .rule-no {
    float: left;
    width: .25rem;
    font-family: initial;
    font-size: .24rem;
    letter-spacing: -0.4px;
    text-align: justify;
    color: #45c7a9;
  }
  .rule-txt {
    float: left;
    width: 90%;
  }
  .rule img {
    vertical-align: middle;
  }
  .iosTip {
    font-size: .21rem;
    color: #333333;
    height: .6rem;
    line-height: .62rem;
	  background-color: #fab281;
  }
  .successBg {
    background: url('../../images/mangoTV/mask-bg.png') no-repeat center center;
    background-size: contain;
    margin: 1.5rem auto;
    text-align: center;
    padding: 1.8rem .6rem;
    width: 5.72rem;
    height: 6rem;
  }
  .receive, .upperLimit {
    background: #fff;
    border-radius: .1rem;
    padding: .3rem 0;
  }
  .receive-title {
    width: 75%;
    padding: .0rem 0rem .3rem;
  }
  .receive-cont {
    font-family: MicrosoftYaHei;
    font-size: 15px;
    color: #666666;
    text-align: justify;
    padding: 0rem .4rem;
    height: 1.3rem;
  }
  .IKnowBtn, .toMessage {
    width: 1.6rem;
    height: .6rem;
    line-height: .6rem;
    object-fit: contain;
    border-radius: 1rem;
    background-color: #ffde01;
    border: solid 1px #b65803;
    font-size: .26rem;
    font-weight: bold;
    letter-spacing: -0.4px;
    text-align: center;
    color: #fd6200;
    margin: 0.3rem auto 0;
  }
  .btns {
    overflow: hidden;
    clear: both;
  }
  .comm-bg {
    box-shadow: 0px 2.5px 0 0 rgba(4, 122, 87, 0.55);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: .2rem;
    background: #fff;
  }
  @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) 
    and (orientation : portrait) { 
    /* STYLES */ 
    .courtesy1 {
      height: 1.838rem;
    }
    .courtesy2 {
      height: 1.838rem;
    }
    .rule-head {
      height: 2.2rem;
    }
    .ruleBox {
      margin: -1px .32rem .8rem .32rem;
    }
  }
</style>
