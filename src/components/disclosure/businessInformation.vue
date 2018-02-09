<template>
  <div class="business">
    <!-- 累计交易总额 -->
    <div class="commonBoxShadow">
      <p class="title">累计交易总额</p>
      <p class="data">{{cumulative.amount}}元</p>
    </div>
    <!-- 累计交易笔数 -->
    <div class="commonBoxShadow">
      <p class="title fl">累计交易笔数</p>
      <p class="data fr">{{cumulative.numOfTransactions}}次</p>
    </div>
    <!-- 借贷余额 -->
    <div class="commonBoxShadow">
      <p class="title fl">借贷余额</p>
      <p class="data fr">{{cumulative.investingTotalLoanAmount}}元</p>
    </div>
    <!-- 待还借款笔数 -->
    <div class="commonBoxShadow">
      <p class="title fl">待还借款笔数</p>
      <p class="data fr">{{cumulative.investingNumOfTransactions}}笔</p>
    </div>
      <!-- 累计注册会员数 -->
    <div class="commonBoxShadow">
      <p class="title fl">累计注册会员数</p>
      <p class="data fr">{{cumulative.userCount}}人</p>
    </div>
    <!-- 累计借款人数 -->
    <div class="commonBoxShadow">
      <p class="title fl">累计借款人数</p>
      <p class="data fr">{{cumulative.numOfBorrows}}人</p>
    </div>
    <!-- 累计出借人数 -->
    <div class="commonBoxShadow">
      <p class="title fl">累计出借人数</p>
      <p class="data fr">{{cumulative.numOfLends}}人</p>
    </div>
    <!-- 当前借款人数 -->
    <div class="commonBoxShadow">
      <p class="title fl">当前借款人数</p>
      <p class="data fr">{{cumulative.currentNumOfBorrows}}人</p>
    </div>
    <!-- 当前出借人数 -->
    <div class="commonBoxShadow">
      <p class="title fl">当前出借人数</p>
      <p class="data fr">{{cumulative.currentNumOfLends}}人</p>
    </div>
    <ul class="otherList">
      <li class="commonBoxShadow">
        <p class="title">逾期金额及笔数</p><br>
        <span class="data fl">0元,0笔</span>
        <img src="../../images/disclosure/business-icon2.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">逾期90天以上的金额及笔数</p>
        <span class="data fl">0元,0笔</span>
        <img src="../../images/disclosure/business-icon2.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">待偿金额及笔数</p><br>
        <span class="data fl">0元,0笔</span>
        <img src="../../images/disclosure/business-icon1.png" class="fr" width="22%">
      </li>
      <li class="commonBoxShadow">
        <p class="title width-105">上月前十大借款人待还金额占比</p>
        <span class="data fl">{{cumulative.sumTenTopLoanBalance/cumulative.lastMonthTotalLoanAmount*100 | number}}%</span>
        <img src="../../images/disclosure/business-icon4.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title width-105">上月最大单一借款人待还金额占比</p>
        <span class="data fl">{{cumulative.topLoanBalance/cumulative.lastMonthTotalLoanAmount*100 | number}}%</span>
        <img src="../../images/disclosure/business-icon4.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title width-105">关联关系借款余额</p><br>
        <span class="data fl">0元</span>
        <img src="../../images/disclosure/business-icon3.png" class="fr" width="22%">
      </li>
    </ul>
    <!-- 平台向借款人收取服务费的标准 -->
    <div class="commonBoxShadow">
      <p class="title">平台向借款人收取服务费的标准</p>
      <p class="data ft-2p8">按借款类型、期限、风险等级执行不通费率标准。平台服务费=借款金额*服务费率*借款期限/365。</p>
    </div>
    <!-- 平台重大风险信息 -->
    <div class="commonBoxShadow">
      <p class="title fl">平台重大风险信息</p>
      <p class="data fr">无</p>
    </div>
    <div class="creatTime">数据统计：截至{{updateDate}}</div>
  </div>
</template>
<script>
  export default {
    name: 'BusinessInformation',
    data () {
      return {
        cumulative: {
          amount: 0, // 累计交易总额
          numOfTransactions: 0, // 累计交易笔数
          userCount: 0, // 累计注册会员数
          investingTotalLoanAmount: 0, // 借贷余额
          investingNumOfTransactions: 0, // 待还借款笔数
          numOfLends: 0, // 累计出借人数
          numOfBorrows: 0, // 累计借款人数
          currentNumOfLends: 0, // 当前出借人数
          currentNumOfBorrows: 0, // 当前借款人数
          lastMonthTotalLoanAmount: 0, // 上个月借贷余额
          sumTenTopLoanBalance: 0, // 上个月前十大借款人待还金额
          topLoanBalance: 0 // 上月最大单一借款人待还金额
        },
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        updateDate: '2017-11-9'
      }
    },
    created () {
      this.getPlatformData()
      this.getUpdateDate(this.year, this.month)
    },
    methods: {
      // 占比保留两位小数
      getPlatformData () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/systems/dataStat'
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.cumulative = res.data
          } else {
            alert(res.data.msg)
          }
        })
      },
      getUpdateDate (year, month) {
        var newYear = year // 取当前的年份
        var newMonth = month - 1 // 取上一个月的第一天，方便计算（最后一天不固定
        if (month <= 1) {
          newMonth += 12 // 月份增
          newYear -= 1 // 年份减
        }
        var newDate = new Date(newYear, newMonth, 1) // 取当年当月中的第一天
        var day = (new Date(newDate.getTime() - 1000 * 60 * 60 * 24)).getDate() // 获取当月最后一天日期
        this.updateDate = (newYear + '-' + (newMonth < 10 ? '0' + newMonth : newMonth) + '-' + day)
      }
    }
  }
</script>
<style scoped>
  .creatTime {
    color: #666;
    font-size: .2rem;
    text-align: center;
  }
  .business {
    color: #666;    
    padding-bottom: 1rem;
    background: #f9f4f3;
    font-family: PingFang-SC;
  }
  .commonBoxShadow {
    padding: .3rem;
    border-radius: 9.5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 8px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    margin: 0.3rem auto;
    text-align: left;
    overflow: hidden;
  }
  .commonBoxShadow .title {
    font-size: .28rem;
    color: #666666;
    margin-bottom: .1rem;
  }
  .commonBoxShadow .data {
    font-size: .32rem;
    font-weight: bold;
    color: #333333;
  }
  .otherList {
    overflow: hidden;
    clear: both;
    width: 90%;
    margin: 0 auto;
  }
  .otherList li {
    padding-top: .2rem;
    float: right;
    height: .9rem;
    margin-bottom: .3rem;
    width: 37.8%;
    text-align: justify;
    line-height: 1.2;
  }
  .otherList li:nth-child(odd) {
    float: left;
  }
  .otherList li:nth-child(1) img, .otherList li:nth-child(2) img {
    margin-top: -.14rem;
  }
  .otherList li:nth-child(4) img, .otherList li:nth-child(5) img {
    margin-top: -.1rem;
  }
  .otherList li:nth-child(3) img {
    margin-top: -.05rem;
  }
  .width-105 {
    width: 105%;
  }
  .ft-2p8 {
    font-size: .28rem !important;
    text-align: justify;
  }
</style>
