<template>
  <div class="Mango" v-bind:class="{ 'padding-b-5': !isIos }">
    <div class="head-img">
      <div class="head-txt">携手宏财网 &nbsp;&nbsp;&nbsp; 开启新视界</div>
    </div>
    <div class="boxes">
      <div class="courtesy1">
        <p class="courtesy-title">0元变身VIP，追星看剧更华丽</p>
      </div>
      <div class="courtesy1-content comm-bg">
        <div class="courtesy1-lf">
          <div class="pic"></div>
          <div class="stock"><p>剩余：500份</p></div>
        </div>
        <div class="courtesy1-rt">
          <div class="txt" v-if="userAuth.active === true">您的<span class="ft-org">芒果TV会员1个月</span>奖励兑换码已自动发送至您的站内信提醒</div>
          <div class="txt" v-if="userAuth.active === false">您已获得<span class="ft-org">芒果TV会员1个月</span>奖励资格，开通银行存管后，兑换码将自动发送至您的站内信提醒</div>
          <div class="InvestBtn" @click="toMessage">{{userAuth.active === false ? '立即开通' : '查看兑换码'}}</div>
        </div>
      </div>
      <div class="courtesy2">
        <p class="courtesy-title">首投VIP再升级，季卡年卡送给你</p>
      </div>
      <div class="courtesy2-content comm-bg">
        <ul class="courtesy2-card">
          <li v-for="card in Member">
            <div class="card">
              <p class="card-level">{{card.level}}</p>
              <p class="card-limit">{{card.investLimit}}</p>
            </div>
            <p class="stock" v-show="!actEnding">{{card.amount < 0 ? '补货中' : '剩余：' + card.amount + '份'}}</p>
          </li>
          <img src="../../images/mangoTV/act-ending.png" alt="" class="actEnd" v-show="actEnding">
        </ul>
        <div class="reward" v-show="!actEnding">
          <img src="../../images/mangoTV/act-reward.png" alt="" width="65%">
          <div class="noInvest" v-show="noInvest">
            您还未进行过投资呢！<br>
            快去挑选好想要的奖励，
            <p class="tips-red">投资达标再来活动页兑换吧～</p>
          </div>
          <div class="noInvest" v-show="InvestLimit">
            <p>您首次投资金额未满足以上奖励兑换条件，前往首页，还有更多精彩活动等您参与～</p>
          </div>
          <div class="notExchange" v-show="notExchange">
            年度VIP
            <img src="../../images/mangoTV/act-exchange.png" alt="" class="exchange" v-show="hasExchange">
          </div>
          <div class="InvestBtn">{{noInvest || InvestLimit ? '立即投资' : notExchange ? '立即兑换' : '查看兑换码'}}</div>
        </div>
        <div class="hot-tips">
          *温馨提示: <br>
          活动首投仅限宏财精选、宏财尊贵项目有效，债权转让项目不参与本次活动。<br>
          奖励剩余数量每分钟更新一次。
        </div>
      </div>
    </div>
    <div>
      <div class="rule-head"></div>
      <div class="ruleBox comm-bg">
        <div class="rule">
          <span class="rule-no">1.</span>
          <span class="rule-txt">活动奖励数量有限，先到先得，兑完即止，如活动结束后7天内还未兑换，则奖励实效；</span>
        </div>
        <div class="rule">
          <span class="rule-no">2.</span>
          <span class="rule-txt">您的芒果TV会员兑换码领取兑换后，将发送至站内信提醒中，前往【我的】页面，点击右上角<img src="../../images/mangoTV/act-msg.png" title="站内信" width="6%"/>，进入站内信【提醒】即可查看；</span>
        </div>
        <div class="rule">
          <span class="rule-no">3.</span>
          <span class="rule-txt">礼遇一与礼遇二奖励可叠加获得，但礼遇二奖励仅可兑换一次，一定选好再兑换哟；</span>
        </div>
        <div class="rule">
          <span class="rule-no">4.</span>
          <span class="rule-txt">如发现用户活动中涉及造假、作弊等嫌疑，平台有权利取消其获奖资格并冻结账号；</span>
        </div>
        <div class="rule">
          <span class="rule-no">5.</span>
          <span class="rule-txt">在法律规定范围内，平台保留本活动最终解释权；</span>
        </div>
      </div>
    </div>
    <div class="iosTip" v-show="isIos">该活动与设备生产商Apple Inc.公司无关</div>
    <!-- 领取成功弹窗 -->
    <div class="dialog mask-common" v-if="false">
      <div class="successBg">
        <div v-if="false">
          <img src="../../images/mangoTV/act-upperLimit.png" alt="" class="receive-title">
          <p class="receive-cont">前往【我的】页面点击右上角，进入站内信【提醒】即可查看咯！</p>
          <div class="IKnowBtn margin-t-1" @click="ShowReceive">我知道了</div>
        </div>
        <div class="receive" v-if="true">
          <img src="../../images/mangoTV/act-receive.png" alt="" class="receive-title">
          <p class="receive-cont">前往【我的】页面点击右上角，进入站内信【提醒】即可查看咯！</p>
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
  import {Utils, bridgeUtil} from '../../service/Utils'
  export default {
    name: 'Mango',
    data () {
      return {
        Member: [
          {
            level: '3个月VIP',
            investLimit: '首笔投资满1000元',
            amount: -1
          }, {
            level: '半年VIP',
            investLimit: '首笔投资满2000元',
            amount: 500
          }, {
            level: '年度VIP',
            investLimit: '首笔投资满5000元',
            amount: 5555
          }, {
            level: '年度全屏VIP',
            investLimit: '首笔投资满10000元',
            amount: 500
          }
        ],
        isIos: Utils.isIos(),
        userAuth: {
          active: false,
          authStatus: Number
        },
        noInvest: false,
        notExchange: true,
        InvestLimit: false,
        hasExchange: true,
        actEnding: false
      }
    },
    created: function () {
    },
    props: ['token'],
    methods: {
      getUserAuth: function () {
        this.$http({
          methods: 'get',
          url: '/hongcai/rest/users/0/userAuth?token=' + this.token
        }).then((response) => {
          this.userAuth = response.data
          console.log(this.userAuth.active)
          console.log(this.userAuth.authStatus)
        })
      },
      toMessage: function () {
        bridgeUtil.webConnectNative('HCNative_CheckUserAuth', '', {}, function (response) {}, null)
      }
    }
  }
</script>
<style scoped>
  .padding-b-5 {
    padding-bottom: .5rem;
  }
  .margin-t-1 {
    margin-top: .5rem !important;
  }
  .Mango {
    background: #ff4b64;
    
    font-family: PingFang-SC;
  }
  .boxes {
    padding: 0 .3rem 0 .15rem;
  }
  .head-img {
    width: 100%;
    height: 6.4rem;
    position: relative;
    margin-top: -1.2rem;
    background: url('../../images/mangoTV/act-head.png') no-repeat center center;
    background-size: contain;
  }
  .head-txt {
    position: absolute;
    bottom: 1.55rem;
    left: 30%;
    height: .3rem;
    line-height: .4rem;
    font-size: .25rem;
    font-weight: 500;
    letter-spacing: -1.2px;
    color: #ffffff;
    text-shadow: 0 1px 0 rgba(61, 66, 64, 0.38);
  }
  .courtesy1 {
    width: 100%;
    margin-top: -.8rem;
    padding-top: 1rem;
    padding-left: .1rem;
    height: 1.6rem;
    background: url('../../images/mangoTV/act-courtesy1.png') no-repeat center center;
    background-size: contain;
  }
  .courtesy2 {
    width: 100%;
    height: 1.6rem;
    padding-top: 1rem;
    background: url('../../images/mangoTV/act-courtesy2-head.png') no-repeat center center;
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
    margin: 0rem 0.02rem 0 .2rem;
    text-align: center;
  }
  .courtesy1-lf, .courtesy1-rt {
    float: left;
  }
  .courtesy1-lf {
    width: 45%;
        margin-left: .1rem;
  }
  .courtesy1-rt {
    width: 52%;
    float: right;
  }
  .courtesy1-lf .pic {
    width: 2rem;
    height: 1.5rem;
    border-radius: 5px;
    background-color: #5ba4f1;
    
  }
  .stock {
    width: 1.5rem;
    height: .4rem;
    border-radius: 9.2px;
    /* background-image: linear-gradient(277deg, #2af8b3, #fee97a); */
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(277deg, #2af8b3, #fee97a);
    border-image-slice: 1;
    font-size: .21rem;
    font-weight: bold;
    line-height: 1.64;
    letter-spacing: -0.3px;
    color: #8e8c8c;
    margin-top: .15rem;
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
    margin-bottom: .3rem;
  }
  .txt .ft-org {
    color: #ff5500;
  }
  .InvestBtn {
    width: 2.4rem;
    height: .7rem;
    line-height: .7rem;
    border-radius: 23.2px;
    background-color: #ffde01;
    border: solid 1px #b65803;
    font-size: .23rem;
    font-weight: bold;
    letter-spacing: 0.7px;
    text-align: center;
    color: #fd6200;
    margin: 0 auto;
  }
  .courtesy2-content {
    margin: 0 0.02rem 0 .17rem;
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
  .card-level {
    font-size: .35rem;
    font-weight: bold;
    line-height: 1.44;
    letter-spacing: -0.6px;
    color: #ffffff;
  }
  .courtesy2-card li:nth-child(odd) {
    float: left;
  }
  .courtesy2-card li:nth-child(even) {
    float: right;
  }
  .courtesy2-card li .card {
    background: #ffde01;
    border-radius: .2rem;
    padding: .3rem 0;
    margin-top: .35rem;
  }
  .reward {
    padding: 0.5rem .25rem;
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
    padding: .25rem .2rem;
    font-size: .24rem;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.4px;
    color: #666666;
  }
  .notExchange {
    width: 75%;
    height: 89.5px;
    background-color: #ffffff;
    box-shadow: 0 2px 3.5px 0 rgba(167, 76, 36, 0.74);
    border: solid 1px #ffee5d;
    margin: 0.2rem auto .5rem;
  }
  .exchange {
    width: 21%;
    position: absolute;
  }
  .tips-red {
    font-weight: bold;
	  color: #fd6a00;
  }
  .hot-tips {
    color: #ff4b64;
    text-align: justify;
    margin-top: .2rem;
  }
  .ruleBox {
    text-align: justify;
    color: rgba(51, 51, 51, 0.87);
    font-size: .24rem;
    margin: 0 .28rem .3rem .29rem;
    
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
    height: .8rem;
    line-height: .8rem;
	  background-color: #fab281;
  }
  .successBg {
    background: url('../../images/mangoTV/act-successBox.png') no-repeat center center;
    background-size: contain;
    margin: 1.5rem auto;
    text-align: center;
    padding: 2rem .6rem;
    width: 5.72rem;
    height: 6rem;
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
    margin: 0 auto;
  }
  .btns {
    overflow: hidden;
    clear: both;
    margin-top: .7rem;
  }
  .comm-bg {
    box-shadow: 0px 2.5px 0 0 rgba(4, 122, 87, 0.55);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: .3rem;
    background: #fff;
  }
</style>
