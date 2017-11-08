<template>
    <div class="gameRecord" v-auto-height>
      <audio preload="preload" id="click"><source src="../../assets/click.mp3"></audio>
      <ul class="recordTitle">
        <li :class="{active: activeTab == 0}" @click="switchTab(0)">投资记录<span>(活动期间)</span></li>
        <li :class="{active: activeTab == 1}" @click="switchTab(1)">获奖记录</li>
      </ul>
      <div class="recordBox">
        <div class="boxHeader"></div>
        <div class="recordList">
          <!-- 投资记录 -->
          <div class="investRecord" v-if="activeTab === 0">
            <div class="totalInvest" v-if="CreditRightVo.length > 0">
              <img src="../../images/singles-day/icon-01.png" class="icon-money">
              <span>累计年化投资金额 : {{totalInvestAmount}}元</span>
              <img src="../../images/singles-day/question.png" class="icon-question" @click="showRulesMask = !showRulesMask">
            </div>
            <div class="scrollBox">
              <table v-if="CreditRightVo.length > 0">
                <thead>
                  <tr>
                    <td>日期</td>
                    <td>项目期限</td>
                    <td>投资金额</td>
                    <td>年化金额</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in CreditRightVo">
                    <td>{{item.createTime | monthDotDay}}</td>
                    <td>{{item.projectDays}}天</td>
                    <td>{{item.amount}}</td>
                    <td>{{item.annualAmount}}</td>
                  </tr>
                  <tr v-if="investTotalPage > investPage" class="loadMore" @click="loadMore(investPage)"><td colspan="4">查看更多</td></tr>
                </tbody>
              </table>
              <div v-if="CreditRightVo.length <= 0" class="noInvestRecord">
                <img src="../../images/singles-day/icon-01.png">
                暂无数据！
              </div>
            </div>
          </div>
          <!-- 获奖记录 -->
          <div class="rewardRecord" v-if="activeTab === 1">
            <div class="totalInvest" v-if="PrivilegedCapitailDetail.length > 0">
              <img src="../../images/singles-day/icon-01.png" class="icon-money">
              <span>累计获得特权本金 : {{totalPrivilegedCapital}}元</span>
            </div>
            <div class="scrollBox">
              <table v-if="PrivilegedCapitailDetail.length > 0">
                <thead>
                  <tr>
                    <td>日期</td>
                    <td>特权本金</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in PrivilegedCapitailDetail">
                    <td>{{item.createTime | monthDotDay}}</td>
                    <td>{{item.amount}}</td>
                  </tr>
                  <tr v-if="rewardTotalPage > rewardPage" class="loadMore" @click="loadMore(rewardPage)"><td colspan="2">查看更多</td></tr>
                </tbody>
              </table>
              <div v-if="PrivilegedCapitailDetail.length <= 0" class="noInvestRecord">
                <img src="../../images/singles-day/icon-01.png">
                暂无数据！
              </div>
            </div>
          </div>
        </div>
      </div>
      <game-rules :showRulesMask="showRulesMask" :closeRules='closeRules'></game-rules>
    </div>
</template>
<script>
  import gameRules from './game-rules.vue'
  import {audioPlayUtil, Utils} from '../../service/Utils'
  export default {
    name: 'gameRecord',
    data () {
      return {
        showRulesMask: false,
        activeTab: 0,
        totalInvestAmount: 0,
        totalPrivilegedCapital: 0,
        CreditRightVo: [],
        PrivilegedCapitailDetail: [],
        investPage: 1,
        rewardPage: 1,
        pageSize: 10,
        investTotalPage: 1,
        rewardTotalPage: 1,
        isPlay: this.$route.query.isPlay,
        IS_ANDROID: Utils.isAndroid()
      }
    },
    watch: {
    },
    props: ['token'],
    created () {
      this.activityType = this.$route.query.act
      this.getInvestRecords(1, 10)
      this.getRewardRecords(1, 10)
      this.getCumulativeInvestAmount()
      this.getPrivilegedCapital()
    },
    mounted () {
      this.IS_ANDROID ? document.querySelector('.recordTitle').style.paddingTop = '0.45rem' : null
    },
    components: {
      gameRules
    },
    methods: {
      switchTab: function (index) {
        audioPlayUtil.playOrPaused('click', this.isPlay)
        if (this.activeTab !== index) {
          this.activeTab = index
          this.CreditRightVo = []
          this.PrivilegedCapitailDetail = []
          this.investPage = 1
          this.rewardPage = 1
          index === 0 ? this.getInvestRecords(1, 10) : this.getRewardRecords(1, 10)
        }
      },
      getCumulativeInvestAmount () {
        var that = this
        that.$http({
          method: 'post',
          url: '/hongcai/rest/activity/countingKings/0/handSpeed?token=' + that.token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.totalInvestAmount = res.data.cumulativeInvestAmount
          } else {
            console.log(res.data.msg)
          }
        })
      },
      getPrivilegedCapital () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activity/countingKings/0/privilegedCapital?token=' + that.token + '&activityType=' + that.activityType
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.totalPrivilegedCapital = res.data.privilegedCapital
          } else {
            console.log(res.data.msg)
          }
        })
      },
      getInvestRecords (page, pageSize) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activity/countingKings/0/investRecords?token=' + that.token + '&activityType=' + that.activityType + '&page=' + page + '&pageSize=' + pageSize
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            var CreditRightVo = res.data.data
            that.investTotalPage = res.data.totalPage
            for (var i = 0; i < CreditRightVo.length; i++) {
              that.CreditRightVo.push(CreditRightVo[i])
            }
          } else {
            console.log(res.data.msg)
          }
        })
      },
      getRewardRecords (page, pageSize) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activity/countingKings/0/takeRewardRecords?token=' + that.token + '&activityType=' + that.activityType + '&page=' + page + '&pageSize=' + pageSize
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            var PrivilegedCapitailDetail = res.data.data
            that.rewardTotalPage = res.data.totalPage
            for (var i = 0; i < PrivilegedCapitailDetail.length; i++) {
              that.PrivilegedCapitailDetail.push(PrivilegedCapitailDetail[i])
            }
          } else {
            console.log(res.data.msg)
          }
        })
      },
      loadMore (index) {
        var page = (index + 1)
        if (this.activeTab === 0) {
          this.getInvestRecords(page, this.pageSize)
          this.investPage = page
        } else {
          this.getRewardRecords(page, this.pageSize)
          this.rewardPage = page
        }
      },
      closeRules () {
        this.showRulesMask = false
      }
    }
  }
</script>
<style scoped>
  .gameRecord {
    background: #fbdc34;
    padding: 0 .2rem .5rem;
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
  ul.recordTitle {
    overflow: hidden;
    clear: both;
    width: 100%;
    font-size: .28rem;
    position: relative;
    height: 1rem;
    padding-top: .4rem;
    top: .245rem;
  }
  ul.recordTitle li span {
    font-size: .2rem;
    display: block;
    font-weight: normal;
    margin-top: -.15rem;
  }
  ul.recordTitle li {
    width: 28%;
    height: .8rem;
    line-height: .8rem;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    background-color: #fc2a42;
    border: solid .05rem #740e0b;
	  color: #ffffff;
    position: absolute;
    bottom: 0;
    font-weight: bold;
  }
  ul.recordTitle li.active {
    background-color: #fff;
    color: #4f0709;
    border-bottom: none;
  }
  ul.recordTitle li.active span {
    margin-top: 0;
  }
  ul.recordTitle li:nth-child(1).active {
    line-height: 1.2;
    padding-top: .2rem;
  }
  ul.recordTitle li:nth-child(2).active {
    line-height: 2.2;
    padding-top: .2rem;
  }
  ul.recordTitle li:nth-child(1) {
    left: 0;
    line-height: .5rem;
  }
  ul.recordTitle li:nth-child(2) {
    left: 31%;
  }
  .boxHeader {
    width: 100%;
    height: .25rem;
    background: #ff7377;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border: solid .05rem #740e0b;
    border-bottom: none;
  }
  .recordList {
    border-radius: .1rem;
    border-top-left-radius: 0rem;
    background-color: #ffffff;
    border: solid .05rem #740e0b;
    margin-top: -.05rem;
    height: 8.1rem;
  }
  .totalInvest {
    font-size: .28rem;
	  color: #4f0709;
    font-weight: bold;
    padding: .35rem 0 .2rem;
  }
  .icon-money{
    width: 8%;
    vertical-align: sub;
  }
  .icon-question {
    width: 5%;
    vertical-align: sub;
  }
  .investRecord table, .rewardRecord table {
    width: 99%;
    margin: 0 auto;
    font-size: .24rem;
  }
  .investRecord table thead, .rewardRecord table thead {
    color: rgba(79, 7, 9, 0.5);
    background-color: #fbf6ed;
    height: .5rem;
    line-height: .5rem;
  }
  .investRecord table tbody, .rewardRecord table tbody {
    font-family: ArialMT;
  	color: #4f0709;
    height: .75rem;
    line-height: .75rem;
  }
  .investRecord table tbody tr:nth-child(even), .rewardRecord table tbody tr:nth-child(even) {
    background-color: #fbf6ed;
  }
  .loadMore {
    text-align: center;
    margin:  0 auto;
  }
  .noInvestRecord {
    margin: 3rem auto;
    font-size: .25rem;
	  color: #4f0709;
  }
  .noInvestRecord img {
    width: 10%;
    vertical-align: sub;
    margin-right: .1rem;
  }
  .scrollBox {
    height: 7rem;
    overflow: scroll;
  }
</style>
