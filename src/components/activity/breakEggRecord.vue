<template>
    <div class="break-egg-record" v-auto-height>
      <ul class="recordTitle">
        <li :class="{active: activeTab == 0}" @click="switchTab(0)">我的奖励</li>
        <li :class="{active: activeTab == 1}" @click="switchTab(1)">年化投资记录<span>(活动期间)</span></li>
      </ul>
      <div class="recordBox">
        <div class="boxHeader"></div>
        <div class="recordList">
          <!-- 年化投资记录 -->
          <div class="investRecord" v-if="activeTab === 1">
            <ul class="investTitle">
              <li>日期</li>
              <li>投资金额</li>
              <li>项目期限</li>
              <li>折合年化</li>
            </ul>
            <div class="scrollBox">
              <table v-if="CreditRightVo.length > 0">
                <tbody>
                  <tr v-for="item in CreditRightVo">
                    <td>{{item.createTime | date}}</td>
                    <td>{{item.amount}}</td>
                    <td>{{item.projectDays}}天</td>
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
          <!-- 我的奖励 -->
          <div class="rewardRecord" v-if="activeTab === 0">
            <ul class="rewardTitle">
              <li>日期</li>
              <li>彩蛋奖励</li>
              <li>数量</li>
            </ul>
            <div class="scrollBox">
              <table v-if="rewardList.length > 0">
                <tbody>
                  <tr v-for="item in rewardList">
                    <td>{{item.createTime | date}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.count}}</td>
                  </tr>
                  <tr v-if="rewardTotalPage > rewardPage" class="loadMore" @click="loadMore(rewardPage)"><td colspan="3">查看更多</td></tr>
                </tbody>
              </table>
              <div v-if="rewardList.length <= 0" class="noInvestRecord">
                <img src="../../images/singles-day/icon-01.png">
                暂无数据！
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import breakEggCalculator from './breakEggCalculator.vue'
  import {Utils} from '../../service/Utils'
  export default {
    name: 'BreakEggRecord',
    data () {
      return {
        showRulesMask: false,
        activeTab: 0,
        CreditRightVo: [],
        rewardList: [],
        investPage: 1,
        rewardPage: 1,
        pageSize: 10,
        investTotalPage: 1,
        rewardTotalPage: 1,
        IS_ANDROID: Utils.isAndroid(),
        showMask: false,
        showCalculator: false
      }
    },
    watch: {
    },
    props: ['token'],
    created () {
      this.activityType = this.$route.query.act
      this.getInvestRecords(this.investPage, this.pageSize)
      this.getRewardRecords(this.rewardPage, this.pageSize)
    },
    mounted () {
      this.IS_ANDROID ? document.querySelector('.recordTitle').style.paddingTop = '0.45rem' : null
    },
    components: {breakEggCalculator},
    methods: {
      switchTab: function (index) {
        if (this.activeTab !== index) {
          this.activeTab = index
          if (index === 1) {
            this.CreditRightVo = []
            this.investPage = 1
            this.getInvestRecords(this.investPage, this.pageSize)
          } else {
            this.rewardList = []
            this.rewardPage = 1
            this.getRewardRecords(this.rewardPage, this.pageSize)
          }
        }
      },
      closeCalculator () {
        this.showMask = false
        this.showCalculator = false
      },
      getInvestRecords (page, pageSize) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activity/breakEggs/0/investRecords?token=' + that.token + '&activityType=' + that.activityType + '&page=' + page + '&pageSize=' + pageSize
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
          url: '/hongcai/rest/activity/breakEggs/0/breakEggRecords?token=' + that.token + '&activityType=' + that.activityType + '&page=' + page + '&pageSize=' + pageSize
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            var rewardList = res.data.data
            that.rewardTotalPage = res.data.totalPage
            for (var i = 0; i < rewardList.length; i++) {
              that.rewardList.push(rewardList[i])
            }
          } else {
            console.log(res.data.msg)
          }
        })
      },
      loadMore (index) {
        var page = (index + 1)
        if (this.activeTab === 1) {
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
  .break-egg-record {
    background: #fa6654;
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
    background-color: #feee33;
    border: solid .05rem #740e0b;
	  color: #4f0709;
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
  ul.recordTitle li:nth-child(2).active {
    line-height: 1.2;
    padding-top: .2rem;
  }
  ul.recordTitle li:nth-child(1).active {
    line-height: 2.2;
    padding-top: .2rem;
  }
  ul.recordTitle li:nth-child(1) {
    left: 0;
  }
  ul.recordTitle li:nth-child(2) {
    left: 31%;
    width: 30%;
    line-height: 1.75;
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
  .investRecord table, .rewardRecord table {
    width: 99%;
    margin: 0 auto;
    font-size: .24rem;
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
  .rewardRecord table tbody tr td {
    width: 33%;
  }
  .rewardRecord table tbody tr td:nth-child(2) {
    width: 40%;
  }
  .investRecord table tbody tr td {
    width: 25%;
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
    height: 7.48rem;
    overflow: scroll;
  }
  .investTitle, .rewardTitle {
    overflow: hidden;
    clear: both;
    color: rgba(79, 7, 9, 0.5);
    background-color: #fbf6ed;
    height: .5rem;
    line-height: .5rem;
    width: 99%;
  }
  .investTitle li {
    float: left;
    width: 25%;
  }
  .rewardTitle li {
    float: left;
    width: 33.333%;
  }
  .rewardTitle li:nth-child(2) {
    width: 40%;
  }
  .rewardTitle li:nth-child(3) {
    width: 26.3%;
  }
</style>

