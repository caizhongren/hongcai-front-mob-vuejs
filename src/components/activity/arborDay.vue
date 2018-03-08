<template>
  <div class="arborDays">
    <audio preload="preload" id="reward"><source src="../../assets/reward.mp3"></audio>
    <div class="header">
      <img src="../../images/arbor-day/arbor-header.png" alt="" width="100%">
      <div class="activityTime">活动时间：{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日-{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日</div>
    </div>
    <div class="contents">
      <div v-if="token">
        <!-- 已获特权本金 -->
        <div class="takedPrivileged">
          <img src="../../images/arbor-day/coin-icon.png" alt="">
          <span>已收获特权本金：<span id="takedPrivileged">{{takedPrivileged}}</span>元</span>
        </div>
        <!-- 摇钱树 -->
        <div class="treeBox">
          <img v-if="activityStatus === 1 && investAmount < 300000" src="../../images/arbor-day/invest-icon.png" alt="" class="investBtn" @click="toNative('HCNative_GoInvestList')">
          <div class="tree0" :class="{'tree6': investAmount >= 300000}"></div>
          <img src="../../images/arbor-day/tree-di.png" alt="" class="tree-di">
          <div class="circle animate" :id="index" v-for="(item, index) in privilegedCapitals" v-bind:style="{ top: item.top + '%', left: item.left + '%' }" @click="takeReward(index, item.level, item.rewardMoney)">
            {{item.rewardMoney}}元
          </div>
        </div>
        <!-- 进度图按钮 -->
        <div class="info-text">
          <img v-show="investAmount >= 300000 && privilegedCapitals.length <= 0" src="../../images/arbor-day/text2.png" alt="" width="47%" class="level">
          <img v-show="activityStatus === 1 && investAmount < 300000" src="../../images/arbor-day/text1.png" alt="" width="30%" class="level">
          <p class="investText">
            <img src="../../images/arbor-day/coin-icon.png" alt="">
            <span>累计年化投资金额(元)<span v-show="activityStatus === 1 && investAmount >= 300000 || activityStatus === 2">：{{investAmount}}</span></span>
          </p>
          <div v-show="activityStatus === 1 && investAmount < 300000">
            <div class="progress">
              <p class="percent"><span class="ft-red">{{investAmount}}</span> / {{nextLevelAmount}}</p>
              <div class="line" :class="{'percent100': investAmount/nextLevelAmount*100 > 96}" v-bind:style="{width: investAmount/nextLevelAmount*100 >20 ? investAmount/nextLevelAmount*100 - 2 + '%' : investAmount/nextLevelAmount*100 + '%'}"></div>
            </div>
            <p class="tips">还差<span class="ft-red">{{nextLevelAmount - investAmount}}元</span>即可将<span class="ft-red">{{gettingRewardMoney}}元</span>特权本金收入囊中咯！</p>
          </div>
          <ul class="btns">
            <li  @click="toRecord()">活动期间投资记录</li>
            <li @click="showCalculator = true">年化投资计算器</li>
          </ul>
        </div>
      </div>
      <div class="needLogin" v-if="!token">
        <img src="../../images/arbor-day/needLogin.png" alt="" width="100%">
        <p class="login" @click="toNative('HCNative_Login')">{{activityStatus === 1 ? '快去播撒财富的种子吧！' : '立即登录'}}</p>
      </div>
      <div class="info-rules">
        <p class="explain">活动期间，用户投资宏财精选、尊贵项目即可为摇钱树浇水，<span class="ft-red">累计年化投资金额</span>达到指定额度，摇钱树成长即可收获相应特权本金奖励！(特权本金有效期1天)</p>
        <div class="rule-table">
          <img src="../../images/arbor-day/leaf-left.png" alt="" class="leaf-left">
          <ul class="table">
            <li>
              <p>累计年化投资金额(元)</p>
              <p>可收获特权本金(元)</p>
            </li>
            <li v-for="item in levelList">
              <p>{{item.amount}}</p>
              <p>{{item.reward}}</p>
            </li>
          </ul>
          <p class="calcul">年化投资金额=投资金额x项目期限/365天</p>
        </div>
        <div class="rule-txt">
          <div class="rule">
            <span class="num">1</span>
            <div class="content">
              活动时间 <br>
              本次活动仅限于{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日至{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日内参与有效；
            </div>
          </div>
          <div class="rule">
            <span class="num">2</span>
            <div class="content">
              参与方式 <br>
              活动期间，用户累计新增年化投资金额达到指定额度，即可获得摇钱树结出的特权本金奖励，每阶段奖励限收取一次，最高可获得800万特权本金奖励；
            </div>
          </div>
          <div class="rule">
            <span class="num">3</span>
            <div class="content">
              奖励发放 <br>
              达标领取条件后，点击摇钱树结出的金币，即可收获相应金额的特权本金奖励，并直接发放至您的账户中；如活动结束后3个工作日内仍未领取奖励，将视为自动放弃奖励；
            </div>
          </div>
          <div class="rule">
            <span class="num">4</span>
            <div class="content">
              关于特权本金 <br>
              特权本金是平台向用户提供的一种虚拟资金，其本身不可提现或用于投资，但享受8%预期年化回报率。特权本金次日即可产生收益，并直接发放至用户可用余额，可用于投资或提现；
            </div>
          </div>
          <div class="rule">
            <span class="num">5</span>
            <div class="content">
              在法律规定范围内，宏财网保留本活动最终解释权。 <br>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="../../images/arbor-day/leaf-right.png" alt="" class="leaf-right">
    <button v-if="token && activityStatus === 1 && investAmount < 300000" class="fixed-btn" @click="toNative('HCNative_GoInvestList')">立即投资</button>
    <button v-if="!token" class="fixed-btn" @click="toNative('HCNative_Login')">立即登录</button>
    <button v-if="token && activityStatus !== 1" class="fixed-btn">活动已结束</button>
    <!-- 计算器弹窗 -->
    <Arbor-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></Arbor-Calculator>
    <!-- 领取弹窗和活动结束弹窗 -->
    <div class="mask-common arbor-mask" v-if="showMask">
      <div class="take-success" v-if="takeRewardMask">
        <button @click="IKnow">我知道了</button>
        <button @click="toPriviledge">立即查看</button>
      </div>
    </div>
    <div class="mask-common arbor-mask" v-if="activityEnd">
      <img src="../../images/arbor-day/activityEnd.png" alt="" width="74%" class="activity-end">
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {bridgeUtil, commonAnimation, audioPlayUtil, ModalHelper} from '../../service/Utils'
  import ArborCalculator from './arborCalculator.vue'
  export default {
    data () {
      return {
        privilegedCapitals: [],
        canTakeCount: 0,
        timer: null,
        takedPrivileged: 0, // 已收特权本金金额
        investAmount: 0,
        nextLevelAmount: 0, // 下一档累计年化投资金额
        gettingRewardMoney: 0, // 即可领取的特权本金金额
        showCalculator: false,
        activityInfo: {
          startYear: 0,
          startMonth: 0,
          startDate: 0,
          endYear: 0,
          endMonth: 0,
          endDate: 0
        },
        activityStatus: 1, // 1 正常 2 结束
        showMask: false,
        takeRewardMask: false,
        busy: false, // 防止多次点击领取
        levelList: [
          {
            amount: 1000,
            reward: 10000
          },
          {
            amount: 10000,
            reward: 120000
          },
          {
            amount: 30000,
            reward: 390000
          },
          {
            amount: 50000,
            reward: 500000
          },
          {
            amount: 100000,
            reward: 1180000
          },
          {
            amount: 300000,
            reward: 5800000
          }
        ],
        activityType: this.$route.query.act || 42,
        unTakeRewardsList: [],
        activityEnd: false
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val && val !== '' ? (this.getUnTakeRewards(), this.arborDayInfo(), this.getAnnualInvestAmount()) : null
      },
      showMask: function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      canTakeCount: function (val) {
        val && val > 0 ? (this.setProportion(val, this.unTakeRewardsList), this.circleAnimate(val)) : this.privilegedCapitals = []
      },
      investAmount: function (val) {
        val && val <= 0 && this.activityStatus === 2 || this.activityStatus === 3 ? (this.activityEnd = true, ModalHelper.afterOpen()) : ModalHelper.beforeClose()
      },
      activityStatus: function (val) {
        val === 2 && this.token && this.investAmount <= 0 || val === 3 ? (this.activityEnd = true, ModalHelper.afterOpen()) : ModalHelper.beforeClose()
      }
    },
    mounted () {
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (t >= window.innerHeight + 50) {
          $('.fixed-btn').show().addClass('fixed')
        } else {
          $('.fixed-btn').hide().removeClass('fixed')
        }
      }
    },
    created () {
      this.token ? (this.getUnTakeRewards(), this.arborDayInfo(), this.getAnnualInvestAmount()) : null
      this.getActivityStatus()
    },
    methods: {
      circleAnimate (canTakeCount) { // 金币上下跳动动画
        if (canTakeCount <= 0 || this.canTakeCount <= 0) {
          return
        }
        var a = 0
        this.timer = setInterval(function () {
          if (a % 2 === 0) {
            for (let i = 0; i < 6; i++) {
              document.getElementById(i) ? document.getElementById(i).style.webkitTransform = 'translateY(0.2rem)' : null
            }
          } else {
            for (let i = 0; i < 6; i++) {
              document.getElementById(i) ? document.getElementById(i).style.webkitTransform = 'translateY(0.0rem)' : null
            }
          }
          a += 1
        }, 1000)
      },
      setProportion (canTakeCount, unTakeRewardsList) {
        // 初始化布局数组
        var position = []
        var treeId = 0
        for (let i = 0; i < 100; i++) {
          position[i] = []
          for (let j = 0; j < 100; j++) {
            position[i][j] = {radius: 0, isPlanted: 0}
          }
        }
        // 随机种植树木
        while (this.privilegedCapitals.length < canTakeCount) {
          // 随机选择一个位置来种植一棵树
          let minTreeX = 0
          let minTreeY = 3
          let maxTreeX = 84
          let maxTreeY = 70
          let treeX = Math.floor(Math.random() * (maxTreeX - minTreeX)) + minTreeX
          let treeY = Math.floor(Math.random() * (maxTreeY - minTreeY)) + minTreeY
          // console.log('(' + treeX + ',' + treeY + ')')
          // 不种植的区域排除掉 上半截树斜对角坐标 （vacantStartX, vacantStartY）,(vacantEndX, vacantEndY)
          let vacantStartX = 15
          let vacantEndX = 75
          let vacantStartY = 20
          let vacantEndY = 72
          if ((treeX >= vacantStartX && treeX <= vacantEndX && treeY >= vacantStartY && treeY <= vacantEndY) || (treeX >= 63 && treeY <= 20)) {
            // 如果在不种植区则跳过后续操作
            continue
          }
          if (position[treeX][treeY].isPlanted === 1) {
            // 如果该位置已经植入树木则跳过后续操作
            continue
          }
          // 树木直径随机
          // let treeRadius = 7.8
          let maxTreeRadius = 10
          // 初始设定为可以种植
          position[treeX][treeY].isPlanted = 1
          // 计算检测框范围
          let checkStartX = Math.max(treeX - 2 * maxTreeRadius, minTreeX)
          let checkStartY = Math.max(treeY - 2 * maxTreeRadius, minTreeY)
          let checkEndX = Math.min(treeX + 2 * maxTreeRadius, maxTreeX)
          let checkEndY = Math.min(treeY + 2 * maxTreeRadius, maxTreeX)
          for (let x = checkStartX; x <= checkEndX; x++) {
            for (let y = checkStartY; y <= checkEndY; y++) {
              // 除了当前位置 和框定范围内已经植入的树木比较距离
              if (!(treeX === x && treeY === y) && (position[x][y].isPlanted === 1)) {
                // 比较两点间距离和两点半径和的大小 判断是否重叠
                let treeDistanceSquared = (treeX - x) * (treeX - x) + (treeY - y) * (treeY - y)
                let radiusSumSquared = (2 * maxTreeRadius) * (2 * maxTreeRadius)
                if (treeDistanceSquared < radiusSumSquared) {
                  // 发生碰撞则标记不可种
                  position[treeX][treeY].radius = 0
                  position[treeX][treeY].isPlanted = 0
                }
              }
            }
          }
          if (position[treeX][treeY].isPlanted === 1) {
            // 显示结果图形
            this.privilegedCapitals.push({id: treeId, left: treeX, top: treeY, rewardMoney: unTakeRewardsList[treeId].reward, level: unTakeRewardsList[treeId].level})
            treeId += 1
          }
        }
      },
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http({ // 获取服务器时间
          method: 'get',
          url: '/hongcai/rest/systems/serverTime'
        }).then((response) => {
          var serverTime = response.data.time
          that.$http('/hongcai/rest/activitys/' + that.activityType).then(function (res) {
            if (serverTime - res.data.endTime > 3 * 24 * 60 * 60 * 1000) {
              that.activityStatus = 3 // 活动结束3天后
            } else {
              that.activityStatus = res.data.status
            }
            // 获取活动开始、结束时间
            var startTime = res.data.startTime
            var endTime = res.data.endTime
            that.activityInfo = {
              startYear: new Date(startTime).getFullYear(),
              startMonth: new Date(startTime).getMonth() + 1,
              startDate: new Date(startTime).getDate(),
              endYear: new Date(endTime).getFullYear(),
              endMonth: new Date(endTime).getMonth() + 1,
              endDate: new Date(endTime).getDate()
            }
          })
        })
      },
      getAnnualInvestAmount () {
        var that = this
        that.$http('/hongcai/rest/activitys/invest/transition/0/annualInvestAmount?token=' + that.token + '&activityType=' + that.$route.query.act)
        .then(function (res) { // 获取累计年化投资金额
          if (!res || res.ret === -1) {
            return
          }
          that.investAmount = res.data.annualInvest || 0
        })
      },
      getUnTakeRewards () { // 未领取的特权本金奖励
        var that = this
        that.$http('/hongcai/rest/activitys/arborDay/unTakeRewards?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.unTakeRewardsList = res.data
            that.canTakeCount = res.data.length
          }
        })
      },
      arborDayInfo () { // 获取已收获特权本金金额
        var that = this
        that.$http('/hongcai/rest/activitys/arborDay/arborDayInfo?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.takedPrivileged = res.data.receiveReward
            that.nextLevelAmount = res.data.nextReward.amount
            that.gettingRewardMoney = res.data.nextReward.reward
            $('.tree0').addClass('tree' + (res.data.nextReward.level))
          }
        })
      },
      takeReward (eleId, level, rewardMoney) { // 领取特权本金奖励
        var that = this
        if (that.busy) {
          return
        }
        that.busy = true
        that.$http.post('/hongcai/rest/activitys/arborDay/takeReward', {
          token: that.token,
          level: level
        }).then((response) => {
          that.busy = false
          if (response.data !== 'success') {
            return
          }
          clearInterval(that.timer)
          that.timer = null
          $('#' + eleId).remove()
          audioPlayUtil.playOrPaused('reward', 'true')
          that.showMask = true
          that.takeRewardMask = true
          that.TotalRewardMoney = that.takedPrivileged + rewardMoney
        })
      },
      IKnow () {
        this.takedPrivileged = this.TotalRewardMoney
        this.canTakeCount -= 1
        this.closeMask()
        commonAnimation.countToNumber($('#takedPrivileged'), this.TotalRewardMoney, 0, 800, 0)
      },
      toNative (HCNative) {
        bridgeUtil.webConnectNative(HCNative, undefined, {}, function (response) {
        }, null)
      },
      toRecord () {
        this.$router.push({name: 'ArborRecord', query: {act: this.activityType}})
      },
      toPriviledge () {
        this.closeMask()
        this.toNative('HCNative_GoPrivilegedCapital')
      },
      closeCalculator () {
        this.showCalculator = false
      },
      closeMask () {
        this.showMask = false
      }
    },
    components: {ArborCalculator},
    desrtoyed () {
      clearInterval(this.timer)
    }
  }
</script>
<style scoped>
  .ft-red {
    color: #c6421f;
  }
  .arborDays {
    background-color: #9ce9ca;
    padding-bottom: 2rem;
    position: relative;
  }
  .header {
    position: relative;
  }
  .header .activityTime {
    position: absolute;
    top: 68%;
    left: 1.22rem;
    font-size: .22rem;
    font-weight: bold;
    line-height: 3.21;
    text-align: center;
    color: #1b865e;
  }
  .takedPrivileged {
    width: 74%;
    background: #cdf4e5;
    border-radius: 1rem;
    color: #c6421f;
    font-size: .25rem;
    font-weight: bold;
    margin: 0 auto;
    padding: .22rem 0;
    margin-top: -.5rem;
    z-index: 1;
    position: relative;
  }
  .takedPrivileged img {
    width: 8%;
    vertical-align: text-bottom;
  }
  .treeBox {
    padding: 2rem 0 0;
    position: relative;
    width: 100%;
    /* height: 6rem; */
    margin-bottom: .25rem;
  }
  .treeBox .investBtn {
    position: absolute;
    right: 0;
    top: 0;
    width: 25%;
  }
  .treeBox .tree-di {
    width: 100%;
    position: absolute;
    left: 0;
  }
  .tree0 {
    width: 40%;
    height: 2.5rem;
    margin: 0 auto;
    background: url('../../images/arbor-day/tree1.png') no-repeat center center;
    background-size: 60% 60%;
    margin-bottom: .4rem;
  }
  .tree1 {
    background: url('../../images/arbor-day/tree1.png') no-repeat center center;
    background-size: 60% 60%;
  }
  .tree2 {
    background: url('../../images/arbor-day/tree2.png') no-repeat center center;
    background-size: 60% 75%;
  }
  .tree3 {
    background: url('../../images/arbor-day/tree3.png') no-repeat center center;
    background-size: 36% 80%;
  }
  .tree4 {
    background: url('../../images/arbor-day/tree4.png') no-repeat center center;
    background-size: 63% 83%;
  }
  .tree5 {
    background: url('../../images/arbor-day/tree5.png') no-repeat center center;
    background-size: 85% 95%;
    height: 3rem;
    margin-bottom: .5rem;
  }
  .tree6 {
    background: url('../../images/arbor-day/tree6.png') no-repeat center center;
    background-size: 100% 100%;
    width: 55%;
    height: 3.5rem;
    margin-bottom: .35rem;
    margin-bottom: .6rem;
  }
  .tree0 + .tree-di {
    bottom: -2%;
  }
  .tree2 + .tree-di, .tree3 + .tree-di, .tree4 + .tree-di, .tree5 + .tree-di {
    bottom: -6.4%;
  }
  .tree6 + .tree-di {
    bottom: -7.4%;
  }
  .arbor-mask {
    padding-top: 30%;
  }
  .arbor-mask .take-success {
    height: 5rem;
    width: 74%;
    background: url('../../images/arbor-day/take-suceess.png') no-repeat center center;
    background-size: 100%;
    margin: 0 auto;
  }
  .take-success button {
    width: 40%;
    font-size: .26rem;
    height: .6rem;
    line-height: .6rem;
    border-radius: .3rem;
    margin-top: 84%;
    border: none;
	  text-shadow: 0.2px 0.5px 0 rgba(111, 73, 0, 0.28);
  }
  .take-success button:first-child {
    margin-right: 6%;
    background-color: #2cc075;
    color: #ffffff;
  }
  .take-success button:last-child {
	  background-color: #fddf68;
    color: #c6421f;
  }
  .activity-end {
    margin-top: .6rem;
  }
  .animate {
    -webkit-transition:all 1s ease-in-out;
    -moz-transition:all 1s ease-in-out;
    -o-transition:all 1s ease-in-out;
    -ms-transition:all 1s ease-in-out;    
    transition:all 1s ease-in-out;
  }
  .circle {
    position: absolute;
    top: 20%;
    left: 30%;
    width: 15.6%;
    height: 21.6%;
    background: url('../../images/arbor-day/icon1.png') no-repeat top center;
    background-size: 70% 70%;
    border-radius: 1rem;
    font-size: .22rem;
    font-weight: bold;
    line-height: 1.7rem;
    letter-spacing: -1px;
    color: #634d25;
  }
  .tree5 + .tree-di ~ .circle {
    height: 20.5% !important;
  }
  .tree6 + .tree-di ~ .circle {
    height: 18.5% !important;
  }
  .info-text {
    color: #634d25;
  }
  .investText {
    text-align: left;
    margin-left: 8%;
    padding-top: .15rem;
  }
  .investText img {
    width: 5%;
    vertical-align: text-bottom;
  }
  .percent100 {
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }
  .progress {
    width: 86%;
    height: .48rem;
    line-height: .5rem;
    margin: .1rem auto;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: inset 1.1px 1.1px 3.5px 0 rgba(3, 0, 0, 0.35);
    position: relative;
    z-index: 1;
  }
  .progress .line {
    background-color: #facc2e;
    background-image: linear-gradient(to bottom, #fbdf00 0%, #fac500 30%, #f5a600 100%);
    width: 0%;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
    height: .4rem;
    position: absolute;
    top: .045rem;
    left: 1%;
    z-index: 0;
  }
  .progress .percent {
    position: relative;
    z-index: 2;
  }
  .tips {
    font-size: .2rem;
    width: 88%;
  }
  .btns {
    overflow: hidden;
    clear: both;
    margin: .3rem 3%;
    width: 94%;
  }
  ul.btns li {
    float: left;
    width: 47%;
    height: .75rem;
    line-height: .72rem;
    margin: 0 1.5%;
    background: url('../../images/arbor-day/btn-green.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: .265rem;
    color: #fff;
  }
  ul.btns li:nth-child(2) {
    background: url('../../images/arbor-day/btn-yellow.png') no-repeat center center;
    background-size: 100% 100%;
	  color: #c6421f;
  }
  .level {
    letter-spacing: -1.6px;
    text-align: center;
    color: #634d25;
    font-size: .3rem;
    font-weight: bold;
  }
  .explain {
    color: #634d25;
    width: 90%;
    margin: 0 auto;
    text-align: justify;
    line-height: 1.46;
    font-size: .22rem;
  }
  .info-rules {
    overflow: hidden;
  }
  .rule-txt {
    width: 97%;
    height: 11.3rem;
    background: url('../../images/arbor-day/rule-bg.png') no-repeat center center;
    background-size: 100% 100%;
    float: right;
    padding: 1.8rem .3rem .6rem .2rem;
  }
  .rule-txt .rule {
    overflow: hidden;
    margin-bottom: .45rem;
    color: #fff;
  }
  .rule-txt .rule .num {
    font-weight: bold;
    color: #e36048;
    border-radius: .5rem;
    width: .35rem;
    height: .35rem;
    float: left;
    background-color: #f4fdfc;
	  box-shadow: 1.4px 2.1px 0.5px 0 rgba(162, 8, 8, 0.18);
  }
  .rule-txt .rule .content {
    width: 90%;
    float: right;
    line-height: 1.7;
    text-align: justify;
    font-size: .23rem;
    letter-spacing: -0.5px;
  }
  .rule-table {
    width: 97%;
    height: 8rem;
    background: url('../../images/arbor-day/rule-bg2.png') no-repeat center center;
    background-size: 100% 100%;
    float: right;
    position: relative;
    margin: .2rem 0 .5rem;
    padding: 1.5rem .45rem .5rem .3rem;
  }
  .rule-table .table {
    background: #2e9e86; 
    overflow: hidden; 
    clear: both; 
  }
  .rule-table ul.table li p {
    float: left;
    height: .7rem;
    line-height: .72rem;
    font-size: .24rem;
    text-align: center;
    font-weight: bold;
  }
  .rule-table ul.table li p:nth-child(1) {
    width: 45%;
    border-right: 1px solid #92ccc2;
  }
  .rule-table ul.table li p:nth-child(2) {
    width: 55%;
  }
  .rule-table ul.table li {
    border-bottom: 1px solid #92ccc2;
    overflow: hidden;
    clear: both;
  }
  .rule-table ul.table li:last-child {
    border-bottom: 0;
  }
  .rule-table ul.table li:first-child p {
    height: .75rem;
    line-height: .77rem;
  }
  .rule-table ul.table li p:first-child {
    color: #ffffff;
  }
  .rule-table ul.table li p:last-child {
    color: #ffe400;
  }
  .rule-table .calcul {
    font-weight: bold;
    color: #ffffff;
    font-size: .22rem;
    margin-top: .45rem;
  }
  .leaf-right {
    position: absolute;
    right: 0;
    bottom: .9rem;
    width: 20%;
  }
  .leaf-left {
    position: absolute;
    left: -.2rem;
    bottom: -1.6rem;
    width: 20%;
  }
  .login {
    width: 60%;
    height: .95rem;
    line-height: .92rem;
    background: url('../../images/arbor-day/btn-yellow.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: .25rem;
    color: #c6421f;
    margin: 0.2rem auto .5rem;
  }
  .fixed-btn {
    width: 100%;
    height: .9rem;
    border: none;
    line-height: .9rem;
    color: #c6421f;
    font-size: .28rem;
    font-weight: bold;
    background-color: #fddf68;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: none;
  }
  @media (max-width: 320px) {
    .rule-txt {
      height: 12.5rem;
    }
  }
</style>
