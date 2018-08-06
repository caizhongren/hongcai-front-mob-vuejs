<template>
  <div class="gold-record" v-auto-height>
    <div class="recordBox">
      <div class="recordList clearfix">
        <span class="form_head fr">年化出借记录<span class="fr">(活动期间)</span></span>
        <img src="../../images/gold-day/icon.png" alt="" width="10%" class="fr">
        <!-- 年化出借记录 -->
        <div class="investRecord">
          <ul class="investTitle">
            <li>日期</li>
            <li>项目期限</li>
            <li>出借金额</li>
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
    name: 'GoldRecord',
    data () {
      return {
        CreditRightVo: [],
        investPage: 1,
        pageSize: 10,
        investTotalPage: 1
      }
    },
    created () {
      this.activityType = this.$route.query.act || 45
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
      }
    }
  }
</script>
<style scoped>
  .gold-record {
    background: url('../../images/gold-day/record-bg.png') no-repeat 0 0;
    background-size: 100%;
    padding-top: 1.6rem;
    width: 100%;
    position: fixed;
    max-width: 7.2rem;
  }
  .recordList {
    width: 90%;
    margin-left: 5%;
    padding-top:.45rem;
    border-radius: .2rem;
    background-color: #ffffff;
    border: solid 2px #2b0676;
    margin-top: -.05rem;
    height: 7.6rem;
    color: #0a3816;
  }
  .recordList .form_head {
    display: inline-block;
    font-family: MicrosoftYaHei;
    font-size: .3rem;
    color: #9a540e;
    margin: .1rem 15% 0 .2rem;
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
    width: 100%;
    margin: 0 auto;
    font-size: .24rem;
  }
  .investRecord table tbody, .rewardRecord table tbody {
    font-family: ArialMT;
    color: #0a3816;
    height: .7rem;
    line-height: .7rem;
  }
  .investRecord table tbody tr:nth-child(even), .rewardRecord table tbody tr:nth-child(even) {
    background-color: #eefafe;
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
  .investRecord table tbody tr td:nth-child(1) {
    text-align: left;
    padding-left: 5%;
    box-sizing: border-box;
  }
  .investRecord table tbody tr.loadMore td {
    text-align: center;
    margin:  0 auto;
  }
  .noInvestRecord {
    margin: 2rem auto;
    font-size: .25rem;
    color: #0a3816;
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
    color: rgba(78, 2, 10, 0.5);
    background-color: #eefafe;
    height: .45rem;
    line-height: .45rem;
    width: 100%;
    margin: 0 auto;
    font-size: .26rem;
  }
  .investTitle li {
    float: left;
    padding-top: .03rem;
    width: 25%;
  }
  .investTitle li:nth-child(1) {
    text-align: left;
    padding-left: 5%;
    box-sizing: border-box;
   }
</style>
