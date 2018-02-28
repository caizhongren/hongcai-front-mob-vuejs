<template>
  <div class="arborDays">
    <audio preload="preload" id="reward"><source src="../../assets/reward.mp3"></audio>
    <div class="header">
      <img src="../../images/arbor-day/arbor-header.png" alt="" width="100%">
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
          <div class="tree tree1"></div>
          <img src="../../images/arbor-day/tree-di.png" alt="" class="tree-di">
          <div class="circle animate" :id="index" v-for="(item, index) in privilegedCapitals" v-bind:style="{ top: item.top + '%', left: item.left + '%' }" @click="takeReward(index, item.level, item.rewardMoney)">
            {{item.rewardMoney}}元
          </div>
        </div>
        <!-- 进度图按钮 -->
        <div class="info-text">
          <img v-if="investAmount >= 300000 && privilegedCapitals.length <= 0" src="../../images/arbor-day/text2.png" alt="" width="47%" class="level">
          <img v-else src="../../images/arbor-day/text1.png" alt="" width="27%" class="level">
          <p class="investText">
            <img src="../../images/arbor-day/coin-icon.png" alt="">
            <span>累计年化投资金额(元)</span>
          </p>
          <div class="progress">
            <p class="percent"><span class="ft-red">{{investAmount}}</span> / {{nextLevelAmount}}</p>
            <div class="line" :class="{'percent100': investAmount/nextLevelAmount === 1}" v-bind:style="{width: investAmount/nextLevelAmount*100 >20 ? investAmount/nextLevelAmount*100 - 2 + '%' : investAmount/nextLevelAmount*100 + '%'}"></div>
          </div>
          <p class="tips">还差<span class="ft-red">{{nextLevelAmount - investAmount}}元</span>即可将<span class="ft-red">{{gettingRewardMoney}}元</span>特权本金收入囊中咯！</p>
          <ul class="btns">
            <li  @click="toRecord()">活动期间投资记录</li>
            <li @click="showCalculator = true">年化投资计算器</li>
          </ul>
        </div>
      </div>
      <div class="needLogin" v-if="!token">
        <img src="../../images/arbor-day/needLogin.png" alt="" width="100%">
        <p class="login" @click="toHCNative('HCNative_Login')">快去播撒财富的种子吧！</p>
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
    <button v-if="token && activityStatus === 1 && investAmount < 300000" class="fixed-btn" @click="toHCNative('HCNative_GoInvestList')">立即投资</button>
    <button v-if="!token" class="fixed-btn" @click="toHCNative('HCNative_Login')">立即登录</button>
    <arbor-calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></arbor-calculator>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {bridgeUtil, commonAnimation, audioPlayUtil} from '../../service/Utils'
  import ArborCalculator from './ArborCalculator.vue'
  export default {
    data () {
      return {
        privilegedCapitals: [],
        canTakeCount: 1,
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
        busy: false, // 防止多次点击领取
        levelList: [
          {
            amount: 1000,
            reward: 10000
          },
          {
            amount: 10000,
            reward: 12000
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
        ]
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val && val !== '' ? (this.getUnTakeRewards(), this.arborDayInfo(), this.getAnnualInvestAmount()) : null
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
      this.token && this.canTakeCount > 0 ? this.circleAnimate(this.canTakeCount) : null
    },
    created () {
      this.token ? (this.getUnTakeRewards(), this.arborDayInfo(), this.getAnnualInvestAmount()) : null
      this.getActivityStatus()
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http({ // 获取服务器时间
          method: 'get',
          url: '/hongcai/rest/systems/serverTime'
        }).then((response) => {
          var serverTime = response.data.time
          that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
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
          that.calculator(that.investAmount)
        })
      },
      getUnTakeRewards () { // 未领取的特权本金奖励
        var that = this
        that.$http('/hongcai/rest/activitys/arborDay/unTakeRewards?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            var unTakeRewardsList = res.data
            that.canTakeCount = res.data.length
            that.canTakeCount > 0 ? that.setProportion(that.canTakeCount, unTakeRewardsList) : null
          }
        })
      },
      arborDayInfo () { // 获取已收获特权本金金额
        var that = this
        that.$http('/hongcai/rest/activitys/arborDay/arborDayInfo?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.takedPrivileged = res.data.receiveReward
          }
        })
      },
      takeReward (eleId, level, rewardMoney) { // 领取特权本金奖励
        $('#' + eleId).remove()
        this.canTakeCount -= 1
        this.canTakeCount <= 0 ? clearInterval(this.timer) : this.circleAnimate(this.canTakeCount)
        commonAnimation.countToNumber($('#takedPrivileged'), rewardMoney, 0, 800, 0)
        audioPlayUtil.playOrPaused('reward', 'true')
        // if (this.busy) {
        //   return
        // }
        // this.busy = true
        // var that = this
        // that.$http.post('/hongcai/rest/activitys/arborDay/takeReward', {
        //   token: this.token,
        //   level: level
        // }).then((response) => {
        //   that.busy = false
        //   if (response.data !== 'success') {
        //     return
        //   }
        // })
      },
      toNative (HCNative) {
        bridgeUtil.webConnectNative(HCNative, undefined, {}, function (response) {
        }, null)
      },
      closeCalculator () {
        this.showCalculator = false
      },
      toRecord () {
        this.$router.push({name: 'ArborRecord', query: {act: this.$route.query.act}})
      },
      calculator (investAmount) { // 计算提示 下一档金额及特权本金金额
        if (investAmount < 1000) {
          this.gettingRewardMoney = 10000
          this.nextLevelAmount = 1000
        } else if (investAmount < 10000) {
          this.gettingRewardMoney = 12000
          this.nextLevelAmount = 10000
        } else if (investAmount < 30000) {
          this.gettingRewardMoney = 390000
          this.nextLevelAmount = 30000
        } else if (investAmount < 50000) {
          this.gettingRewardMoney = 500000
          this.nextLevelAmount = 50000
        } else if (investAmount < 100000) {
          this.gettingRewardMoney = 1180000
          this.nextLevelAmount = 100000
        } else if (investAmount < 300000) {
          this.gettingRewardMoney = 5800000
          this.nextLevelAmount = 300000
        }
      },
      circleAnimate (canTakeCount) { // 金币上下跳动动画
        var a = 0
        this.timer = setInterval(function () {
          if (a % 2 === 0) {
            for (let i = 0; i < canTakeCount; i++) {
              document.getElementById(i).style.top = parseInt(document.getElementById(i).style.top) + 2 + '%'
            }
          } else {
            for (let i = 0; i < canTakeCount; i++) {
              document.getElementById(i).style.top = parseInt(document.getElementById(i).style.top) - 2 + '%'
            }
          }
          a += 1
        }, 1000)
      },
      setProportion (canTakeCount, unTakeRewardsList) {
        // 初始化布局数组
        var position = []
        for (let i = 0; i < 100; i++) {
          position[i] = []
          for (let j = 0; j < 100; j++) {
            position[i][j] = {radius: 0, isPlanted: 0}
          }
        }
        // 随机种植树木
        while (this.privilegedCapitals.length < canTakeCount) {
          var i = 0
          // 随机选择一个位置来种植一棵树
          let minTreeX = 8
          let minTreeY = 8
          let maxTreeX = 80
          let maxTreeY = 40
          let treeX = Math.floor(Math.random() * (maxTreeX - minTreeX)) + minTreeX
          let treeY = Math.floor(Math.random() * (maxTreeY - minTreeY)) + minTreeY
          // console.log('(' + treeX + ',' + treeY + ')')
          // 不种植的区域排除掉 上半截树斜对角坐标 （vacantStartX, vacantStartY）,(vacantEndX, vacantEndY)
          let vacantStartX = 20
          let vacantEndX = 76
          let vacantStartY = 12
          let vacantEndY = 72
          if (treeX >= vacantStartX && treeX <= vacantEndX && treeY >= vacantStartY && treeY <= vacantEndY) {
            // 如果在不种植区则跳过后续操作
            continue
          }
          if (position[treeX][treeY].isPlanted === 1) {
            // 如果该位置已经植入树木则跳过后续操作
            continue
          }
          // 树木直径随机
          let treeRadius = 8
          // 初始设定为可以种植
          position[treeX][treeY].isPlanted = 1
          // 计算检测框范围
          let checkStartX = Math.max(treeX - 2 * treeRadius, minTreeX)
          let checkStartY = Math.max(treeY - 2 * treeRadius, minTreeY)
          let checkEndX = Math.min(treeX + 2 * treeRadius, maxTreeX)
          let checkEndY = Math.min(treeY + 2 * treeRadius, maxTreeX)
          for (let x = checkStartX; x <= checkEndX; x++) {
            for (let y = checkStartY; y <= checkEndY; y++) {
              // 除了当前位置 和框定范围内已经植入的树木比较距离
              if (!(treeX === x && treeY === y) && (position[x][y].isPlanted === 1)) {
                // 比较两点间距离和两点半径和的大小 判断是否重叠
                let treeDistanceSquared = (treeX - x) * (treeX - x) + (treeY - y) * (treeY - y)
                let radiusSumSquared = (2 * treeRadius) * (2 * treeRadius)
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
            this.privilegedCapitals.push({left: treeX, top: treeY, rewardMoney: unTakeRewardsList[i].reward, level: unTakeRewardsList[i].level})
            i += 1
          }
        }
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
    padding-bottom: 1rem;
    position: relative;
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
    bottom: -6%;
    left: 0;
  }
  .tree {
    width: 40%;
    height: 2.5rem;
    margin: 0 auto;
    background: url('../../images/arbor-day/tree1.png') no-repeat center center;
    background-size: 60% 60%;
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
  }
  .tree6 {
    background: url('../../images/arbor-day/tree6.png') no-repeat center center;
    background-size: 100% 100%;
    width: 55%;
    height: 3.2rem;
  }
  .tree1 + .tree-di {
    bottom: -2%;
  }
  .animate {
    -webkit-transition:all 1s linear;
    -moz-transition:all 1s linear;
    -o-transition:all 1s linear;
    -ms-transition:all 1s linear;    
    transition:all 1s linear;
  }
  .circle {
    position: absolute;
    top: 20%;
    left: 30%;
    width: 15.5%;
    height: 22%;
    background: url('../../images/arbor-day/icon1.png') no-repeat top center;
    background-size: 70% 70%;
    border-radius: 1rem;
    font-size: .22rem;
    font-weight: bold;
    line-height: 1.7rem;
    letter-spacing: -1px;
    color: #634d25;
  }
  .info-text {
    color: #634d25;
  }
  .investText {
    text-align: left;
    margin-left: 8%;
  }
  .investText img {
    width: 5%;
    vertical-align: text-bottom;
  }
  .percent100 {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
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
    background-image: linear-gradient(to bottom, #fbdf00 0%, #fac500 50%, #f5a600 100%);
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
    padding: .1rem 0;
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
    height: 11rem;
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
    bottom: 0rem;
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
</style>
