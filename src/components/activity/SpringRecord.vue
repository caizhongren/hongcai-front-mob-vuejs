<template>
  <div class="Spring_record" v-auto-height>
    <div class="recordBox">
      <div class="boxHeader">
        <img class="top" src="../../images/spring-festival/detail-head.png" width="100%" alt="">
        <img src="../../images/spring-festival/detail-bag.png" alt="" width="45" class="left1">
        <img src="../../images/spring-festival/detail-bag.png" alt="" width="35" class="left2">
        <img src="../../images/spring-festival/detail-bag.png" alt="" width="35" class="right1">
        <img src="../../images/spring-festival/detail-bag.png" alt="" width="45" class="right2">
      </div>
      <div class="recordList clearfix">
        <span class="form_head fr">年化投资记录<span class="fr">(活动期间)</span></span>
        <img src="../../images/spring-festival/coin.png" alt="" width="10%" class="fr">
        <!-- 年化投资记录 -->
        <div class="investRecord">
          <ul class="investTitle">
            <li>日期</li>
            <li>项目期限</li>
            <li>投资金额</li>
            <li>折合年化</li>
          </ul>
          <div class="scrollBox">
            <table v-if="CreditRightVo.length > 0">
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SpringRecord',
    data () {
      return {
        CreditRightVo: [],
        investPage: 1,
        pageSize: 10,
        investTotalPage: 1,
        showCalculator: true
      }
    },
    created () {
      this.activityType = this.$route.query.act
      this.getInvestRecords(this.investPage, this.pageSize)
    },
    props: ['token'],
    methods: {
      getInvestRecords (page, pageSize) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/invest/transition/0/investRecords?token=' + that.token + '&activityType=' + that.activityType + '&page=' + page + '&pageSize=' + pageSize
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
      loadMore (page) {
        this.investPage += 1
        this.getInvestRecords(this.investPage, this.pageSize)
      },
      closeCalculator () {
        this.showCalculator = false
      }
    }
  }
</script>
<style scoped>
  .Spring_record {
    background: url('../../images/spring-festival/detail-header.png') no-repeat 0 0;
    background-color: #ef1622;
    background-size: 100%;
    padding-top: 2rem;
    width: 100%;
  }
  .boxHeader img {
    position: absolute;
  }
  .boxHeader img.top{
    display: block;
    margin-top: -1rem;
  }
  .boxHeader .left1 {
    top: 6%;
    left: 20%;
    transform: rotate(-40deg);
  }
  .boxHeader .left2 {
    top: 8%;
    left: 26%;
    transform: rotate(-30deg);
  }
  .boxHeader .right2 {
    top: 6%;
    right: 20%;
    transform: rotate(10deg);
  }
  .boxHeader .right1 {
    top: 8%;
    right: 26%;
    z-index: 1;
  }
  .recordList {
    width: 94%;
    margin: 0 auto;
    padding-top:.35rem;
    border-radius: .1rem;
    border-top-left-radius: 0rem;
    background-color: #ffffff;
    border: solid 1.5px #830b08;
    margin-top: -.05rem;
    height: 7.4rem;
    color: #4f0709;
  }
  .recordList .form_head {
    margin-left: .1rem;
    display: inline-block;
    font-family: MicrosoftYaHei;
    font-size: .3rem;
    color: #4f0709;
    margin-right: 18%;
    margin-top: .05rem;
    font-weight: bold;
  }
  .recordList .form_head span {
    margin-left: .1rem;
    font-size: .25rem;
    margin-top: .03rem;
    margin-bottom: .3rem;
    font-weight: normal;
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
    margin: 2rem auto;
    font-size: .25rem;
	  color: #4f0709;
  }
  .noInvestRecord img {
    width: 10%;
    vertical-align: sub;
    margin-right: .1rem;
  }
  .scrollBox {
    height: 5.6rem;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .investTitle {
    overflow: hidden;
    clear: both;
    color: rgba(79, 7, 9, 0.5);
    background-color: #fbf6ed;
    height: .5rem;
    line-height: .5rem;
    width: 99%;
    margin: 0 auto;
  }
  .investTitle li {
    float: left;
    padding-top: .03rem;
    width: 25%;
  }
</style>
