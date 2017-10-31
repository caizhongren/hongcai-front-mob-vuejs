<template>
  <div class="golden-fall">
    <div class="fall-header">
      <img src="../../images/golden-fall/title-words.png" alt="" width="72%">
      <p>活动时间：{{activityInfo.activityStartTime | date}} 00:00—{{activityInfo.activityEndTime | date}} 24:00</p>
      <p v-if="activityInfo.activityStatus === 2">（活动已结束）</p>
    </div>
    <div class="fall-score-wrapper">
      <div class="fall-score position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="position-ab">
        <p class="title">
          我的金秋积分
        </p>
        <div class="content" v-if="token">
          <img src="../../images/golden-fall/crab2.png" alt="" width="12%" class="display-inb">
          <span class="display-inb">{{userScores || 0}}</span>
        </div>
        <div class="content" v-if="!token">
          <p>登录后可查看您的金秋积分</p>
          <p @click="toLogin">去登录</p>
        </div>
        <div class="btns" v-if="token">
          <router-link :to="{ name: 'GoldenDetail'}"><span>积分明细</span></router-link>
          <router-link :to="{ name: 'GoldenRecord'}"><span>兑换记录</span></router-link>
          <!-- <span @click="toRecord">兑换记录</span> -->
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
          <li v-for="coupon in cashCoupons">
            <p class="coupon-left">现金券</p>
            <div class="coupon-right">
              <p class="value"><span>¥</span>{{coupon.value}}</p>
              <p class="take-btn" @click="getCashCoupons(coupon.level)">立即领取</p>
              <p class="premise">投资项目:{{coupon.type === 1 ? '精选' : '尊贵'}}<br>起投金额:{{coupon.premiseValue}}</p>
            </div>
          </li>
        </ul>
      </div>
      <p class="gift1-tip">*每人每天限领取10次，现金券当日领取当日有效，还请您及时使用。</p>
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
          <div class="crab-coupon position-re">
            <p>大闸蟹</p>
            <p>礼<br>券</p>
            <img src="../../images/golden-fall/circle.png" alt="" class="position-ab">
            <img src="../../images/golden-fall/crab-bag.png" alt="" class="crab-bag" width="56%">
            <img src="../../images/golden-fall/circle.png" alt="" class="position-ab">
          </div>
          <div class="crab-list">
            <ul>
              <li v-for="(crab, index) in crabs" v-bind:class="{'border-none' : index === 2}">
                <p><img src="../../images/golden-fall/crab2.png" alt="" width="18%">{{crab.integral}}积分</p>
                <p>公蟹{{crab.count1}}两/只</p>
                <p>母蟹{{crab.count2}}两/只</p>
                <p>4对共8只</p>
                <p>市场价：{{crab.price}}元</p>
                <p class="exchange-btn" :class="{'disable-btn': !activityInfo.exchangeStatus}" @click="toExchange(1, crab.score, 1, crab.level)">立即兑换</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="coupon-tip">
          *收到礼券后，即可预约送货，现捕现发，保证鲜活
        </div>
        <div class="jd-card-list">
          <ul>
            <li>
              <img src="../../images/golden-fall/jd01.png" alt="" width="95%" height="51%" class="display-bl">
              <p class="first"><img src="../../images/golden-fall/crab2.png" alt="" width="14%"> 50积分</p>
              <p>50元京东卡</p>
              <p class="exchange-btn margin-auto" :class="{'disable-btn': !activityInfo.exchangeStatus}" @click="toExchange(1, 50, 1, 4)">立即兑换</p>
            </li>
            <li class="border-none">
              <img src="../../images/golden-fall/jd02.png" alt="" width="95%" height="51%" class="display-bl">
              <p class="first"><img src="../../images/golden-fall/crab2.png" alt="" width="14%"> 85积分</p>
              <p class="text">100元京东卡</p>
              <p class="exchange-btn margin-auto" :class="{'disable-btn': !activityInfo.exchangeStatus}" @click="toExchange(1, 85, 1, 5)">立即兑换</p>
            </li>
          </ul>
        </div>
        <img src="../../images/golden-fall/bottom-bg.png" alt="" width="98%" height="1.5%" class="margin-t--1">
        <div class="exchange-priviledge">
          <div class="priviledge-coupon border-none position-re">
            <p class="position-ab left1">特权本金</p>
            <p class="position-ab left2">收益一天</p>
            <div class="right">
              <p>30000元</p>
              <p><img src="../../images/golden-fall/crab2.png" alt="" width="10.5%"> 10积分</p>
            </div>
          </div>
          <div class="btns">
            <span class="exchange-btn" :class="{'disable-btn': !activityInfo.exchangeStatus}" @click="toExchange(2, 10, 1, 6)">兑换1次</span>
            <span class="exchange-btn" :class="{'disable-btn': !activityInfo.exchangeStatus}" @click="toExchange(2, 10, 5, 7)">连续兑换5次</span>
            <span class="exchange-btn" :class="{'disable-btn': !activityInfo.exchangeStatus}" @click="toExchange(2, 10, 10, 8)">连续兑换10次</span>
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
          本次活动仅限于<span>{{activityInfo.statrYear || 2017}}年{{activityInfo.startMonth || 10}}月{{activityInfo.startDate || 1}}日0时至{{activityInfo.endYear|| 2017}}年{{activityInfo.endMonth || 10}}月{{activityInfo.endDate || 1}}日24时</span>内参与有效；
        </div>
        <div>
          2.参与方式<br>
          活动期间，根据不同项目类型，用户新增投资金额每满1000元，均可获得金秋积分，金秋积分可用于兑换虚拟或实物奖励；
        </div>
        <div>
          3.关于现金券<br>
          现金券仅限活动期间领取，<span>每天每人限领10次</span>，现金券当日领取<span>当日有效</span>，还请您及时使用;
        </div>
        <div>
          4.奖励兑换<br>
          活动期间，可随时兑换所需奖励，如<span>活动结束后3个工作日内</span>仍未兑换奖励，将视为自动放弃奖励；
        </div>
        <div>
          5.奖励发放<br>
          >>您兑换的特权本金奖励将<span>直接发放</span>至您的账户中，请注意及时查收；<br>
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
    <!-- 领取成功弹窗 -->
    <div class="dialog mask-common" v-if="PrizeMask">
      <golden-address :exchange="exchange" :exchangeInfo="exchangeInfo" :AdressMask="AdressMask" :closeMask="closeMask" :token="token" :isFall="isFall" v-if="AdressMask"></golden-address>    
      <div class="successBg" v-if="CashReceive || CashUpperLimit">
        <!-- 现金券领取 -->
        <div class="cashPrize">
          <div class="receive" v-if="CashReceive">
            <p class="mask-title">领取成功！</p>
            <p class="mask-title">可前往我的优惠券查看～</p>
          </div>
          <div class="UpperLimit" v-if="CashUpperLimit">
            <p class="mask-title">您已经领取10次啦!</p>
            <p class="mask-title">明天再来哦～</p>
          </div>
          <div class="mask-btn IKnowBtn margin-auto" @click="closeMask()">我知道了</div>
        </div>
      </div>
      <!-- 活动已结束 -->
      <div class="successBg" v-if="activityEnd">
        <div class="activityEnd">
          <p class="mask-title">活动已结束</p>
          <p class="mask-title">去每日抽奖试试手气吧～</p>
          <div class="mask-btn IKnowBtn margin-auto" @click="closeMask()">我知道了</div>
        </div>
      </div>
      <!-- 积分不足 -->
      <div class="successBg" v-if="NoIntegral">
        <div class="NoIntegral">
          <p class="mask-title">啊哦，积分不足哎...</p>
          <p class="mask-content" v-if="activityInfo.activityStatus === 1">您当前积分不足，快去投资赚取积分吧！</p>
          <p class="mask-content" v-if="activityInfo.activityStatus === 2">您当前积分不足，不能兑换该奖励。</p>
          <div class="mask-btn IKnowBtn" :class="{'fl': activityInfo.activityStatus === 1, 'margin-auto': activityInfo.activityStatus === 2}" @click="closeMask()">我知道了</div>
          <div class="mask-btn toInvest fr" @click="toProjectList" v-if="activityInfo.activityStatus === 1">去投资</div>
        </div>
      </div>
      <!-- 确认是否兑换 -->
      <div class="successBg" v-if="isExchange">
        <div>
          <p class="mask-title">哇！奖励即将到手</p>
          <p class="mask-content">兑换该奖励将消耗您【{{exchangeInfo.score * exchangeInfo.num}}】积分，是否确认兑换？</p>
          <div class="mask-btn IKnowBtn fl" @click="closeMask()">再看看</div>
          <div class="mask-btn toExchange fr" @click="confirmExchange(exchangeInfo)">确认兑换</div>
        </div>
      </div>
      <!-- 特权本金兑换成功-->
      <div class="successBg" v-if="virtualPrizes">
        <div>
          <p class="mask-title">恭喜您兑换成功！</p>
          <p class="mask-content">前往【我的】页面点击特权本金，即可查看咯!</p>
          <div class="mask-btn IKnowBtn fl" @click="closeMask()">我知道了</div>
          <div class="mask-btn toMessage fr" @click="toPriviledge">去查看</div>
        </div>
      </div>
      <!-- 实物奖品兑换成功-->
      <div class="successBg" v-if="materialPrize">
        <div>
          <p class="mask-title">恭喜您兑换成功！</p>
          <p class="mask-content">您已成功兑换【{{awardDesc}}】！奖品将在活动结束后7个工作日内寄出，请注意接听客服电话核对收货地址哟～</p>
          <div class="mask-btn IKnowBtn margin-auto" @click="closeMask()">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '../../css/golden-fall.css';
  @import '../../css/golden-mask.css';
</style>
<script>
  import {Utils, bridgeUtil, ModalHelper} from '../../service/Utils'
  import GoldenAddress from './golden-adress.vue'
  export default {
    name: 'goldenFall',
    data () {
      return {
        isIos: Utils.isIos(),
        cashCoupons: [
          {
            value: 5,
            premiseValue: '5千',
            type: 1,
            level: 1
          },
          {
            value: 38,
            premiseValue: '5千',
            type: 2,
            level: 4
          },
          {
            value: 12,
            premiseValue: '1万',
            type: 1,
            level: 2
          },
          {
            value: 78,
            premiseValue: '1万',
            type: 2,
            level: 5
          },
          {
            value: 28,
            premiseValue: '2万',
            type: 1,
            level: 3
          },
          {
            value: 238,
            premiseValue: '3万',
            type: 2,
            level: 6
          }
        ],
        crabs: [
          {
            integral: ' 125',
            score: 125,
            count1: 3,
            count2: 2,
            price: 168,
            level: 1
          },
          {
            integral: ' 200',
            score: 200,
            count1: 4,
            count2: 3,
            price: 268,
            level: 2
          },
          {
            integral: ' 300',
            score: 300,
            count1: 4.5,
            count2: 3.5,
            price: 498,
            level: 3
          }
        ],
        busy: false,
        AdressMask: false,
        PrizeMask: false,
        activityEnd: false,
        CashReceive: false,
        CashUpperLimit: false,
        NoIntegral: false,
        virtualPrizes: false,
        materialPrize: false,
        isExchange: false,
        userScores: 0,
        activityInfo: {},
        exchangeInfo: { // 兑换信息
          type: 1,
          score: 0,
          num: 1,
          level: 0
        },
        isFall: true,
        awardDesc: ''
      }
    },
    props: ['token'],
    watch: {
      PrizeMask: function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      token (val) {
        val && val !== '' ? this.getUserScores() : null
      }
    },
    created () {
      this.token && this.token !== '' ? this.getUserScores() : null
      this.getActivityInfo()
    },
    components: {GoldenAddress},
    methods: {
      toRecord () {
        this.$router.push({name: 'GoldenRecord'})
      },
      toLogin () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {
          that.closeMask()
        }, null)
      },
      closeMask () {
        this.PrizeMask = false
        this.AdressMask = false
        this.activityEnd = false
        this.CashReceive = false
        this.CashUpperLimit = false
        this.NoIntegral = false
        this.virtualPrizes = false
        this.materialPrize = false
        this.isExchange = false
      },
      toProjectList (exchangeInfo) {
        var that = this
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {
          that.closeMask()
        }, null)
      },
      toPriviledge () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_GoPrivilegedCapital', undefined, {}, function (res) {
          that.closeMask()
        }, null)
      },
      getUserScores () {
        var that = this
        that.$http({
          url: '/hongcai/rest/activitys/summer/scores/0?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.userScores = res.data.usableScore
          }
        })
      },
      getActivityInfo () {
        var that = this
        that.$http({
          url: '/hongcai/rest/activitys/socreExchange/info'
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.activityInfo = res.data
            that.activityInfo.startYear = new Date(res.data.activityStartTime).getFullYear()
            that.activityInfo.startMonth = new Date(res.data.activityStartTime).getMonth() + 1
            that.activityInfo.startDate = new Date(res.data.activityStartTime).getDate()
            that.activityInfo.endYear = new Date(res.data.activityEndTime).getFullYear()
            that.activityInfo.endMonth = new Date(res.data.activityEndTime).getMonth() + 1
            that.activityInfo.endDate = new Date(res.data.activityEndTime).getDate()
          }
        })
      },
      getCashCoupons (level) {
        var that = this
        if (that.busy) {
          return
        }
        if (that.token === '') {
          that.toLogin()
          return
        }
        if (that.activityInfo.activityStatus === 2) { // 活动结束
          that.PrizeMask = true
          that.activityEnd = true
          return
        }
        that.busy = true
        setTimeout(function () {
          that.busy = false
        }, 300)
        that.$http.post('/hongcai/rest/users/0/coupons/takeCashCoupons', {
          token: that.token,
          level: level
        }).then((response) => {
          that.PrizeMask = true
          if (response.data && response.data.ret === 1) {
            that.CashReceive = true
          } else if (response.data.ret === -1 && response.data.code === -1304) {
            that.CashUpperLimit = true
          } else if (response.data.ret === -1 && response.data.code === -1041) {
            that.activityEnd = true
          } else {
            alert(response.data.msg)
          }
        })
      },
      exchange (exchangeInfo) {
        var that = this
        if (that.busy) { return }
        that.busy = true
        that.$http.post('/hongcai/rest/activitys/socreExchange/0/exchange', {
          token: that.token,
          level: exchangeInfo.level
        })
        .then(function (res) {
          setTimeout(function () {
            that.busy = false
          }, 1000)
          if (res.data && res.data.ret !== -1) {
            var awardDesc = res.data.awardDesc
            that.getUserScores()
            that.showExchangeSuccess(exchangeInfo, awardDesc)
          } else {
            alert(res.data.msg)
          }
        })
      },
      showExchangeSuccess (exchangeInfo, awardDesc) {
        this.AdressMask = false
        this.PrizeMask = true
        if (exchangeInfo.type === 2) {
          this.virtualPrizes = true
        } else {
          this.materialPrize = true
          this.awardDesc = awardDesc
        }
      },
      // exchange (exchangeInfo) {
      //   // todo 移到app里
      //   // this.userScores -= exchangeInfo.score * exchangeInfo.num
      //   this.showExchangeSuccess(exchangeInfo)
      //   // this.$refs.GoldenFall.showExchangeSuccess()
      // },
      toExchange (type, score, num, level) { // type: 1 大闸蟹、京东券; 2 特权本金, num:兑换次数
        this.exchangeInfo = {
          type: type,
          score: score,
          num: num,
          level: level
        }
        if (!this.token) {
          this.toLogin()
          return
        }
        // 是否可兑换
        if (!this.activityInfo.exchangeStatus) {
          return
        }
        this.PrizeMask = true
        this.userScores < score * num ? this.NoIntegral = true : this.isExchange = true
      },
      confirmExchange (exchangeInfo) { // 确认兑换
        var that = this
        that.isExchange = false
        if (exchangeInfo.type !== 2) {
          that.$http({
            url: '/hongcai/rest/addresses?token=' + that.token
          }).then(function (res) {
            res.data && res.data.address ? that.exchange(exchangeInfo) : that.AdressMask = true
          })
        } else { // todo 调用app的方法
          that.exchange(exchangeInfo)
        }
      }
    }
  }
</script>
<style scoped>
  .exchange-priviledge {
    color: #ff611d;
    height: 3.22rem;
    padding-top: .1rem;
  }
  .exchange-priviledge .btns span {
    display: inline-block;
    margin: 0 .07rem;
  }
  .exchange-priviledge .priviledge-coupon {
    height: 2.1rem;
    margin: .13rem 0 .13rem;
  }
  /* 第二道大礼 */
  .exchange-priviledge .priviledge-coupon .left1 {
    width: 5%;
    top: -27%;
    left: -4%;
    font-size: .32rem;
  }
  .exchange-priviledge .priviledge-coupon .left2 {
    width: 5%;
    top: -18%;
    left: 2.5%;
    font-size: .25rem;
    color: #ea973f;
  }
  .priviledge-coupon .right {
    padding-top: .3rem;
    text-align: left;
    width: 60%;
    margin-left: 39%;
  }
  .priviledge-coupon .right p:first-child {
    font-weight: bold;
    font-size: .66rem;
    font-weight: bold;
    line-height: 1.2;
    letter-spacing: -1.2px;
  }
  /* 第二道大礼 */
  .priviledge-coupon .right p:last-child {
    font-size: .25rem;
  }
  .disable-btn {
    background-color: #999 !important;
    color: #fff !important;
  }
</style>
