<template>
  <div class="business">
    <div class="sumolume">
      <div class="sumTitle">累计交易总额(元)</div>
      <span>96007800元</span>
      <p>累计交易14685 笔</p>

    </div>
    <table class="info">
        <div>
        <tr>
            <td>借贷余额</td> 
            <td>{{cumulative.investingTotalLoanAmount}}元</td>
          </tr>
        <tr>
            <td>借贷余额笔数</td> 
            <td></td>
          </tr>
          <tr>
            <td>利息余额</td> 
            <td></td>
          </tr>
          <tr>
            <td>累计注册会员数</td>
            <td></td>
          </tr>
          <tr>
            <td>累计借款人数</td> 
            <td></td>
          </tr>
          <tr>
            <td>累计出借人数</td> 
            <td></td>
          </tr>
          <tr>
            <td>当前借款人数</td> 
            <td></td>
          </tr>
          <tr>
            <td>当前出借人数</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">前十大借款人<br>待还金额占比</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">最大单一借款人<br>待还金额占比</td> 
            <td></td>
          </tr>
          <tr>
            <td>关联关系借款余额</td> 
            <td></td>
          </tr>
          <tr>
            <td>关联关系借款笔数</td> 
            <td></td>
          </tr>
          <tr>
            <td>逾期金额</td> 
            <td></td>
          </tr>
          <tr>
            <td>逾期笔数</td> 
            <td></td>
          </tr>
          <tr>
            <td>逾期90天以上的金额</td> 
            <td></td>
          </tr>
          <tr>
            <td>逾期90天以上的笔数</td> 
            <td></td>
          </tr>
          <tr>
            <td>代偿金额</td> 
            <td></td>
          </tr>
          <tr>
            <td>代偿笔数</td> 
            <td></td>
          </tr>
          <tr>
            <td>项目逾期率</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">项目分级逾期率<br>(逾期90天内)</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">项目分级逾期率<br>(逾期90天以上至180天)</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">项目分级逾期率<br>(逾期180天以上）</td> 
            <td></td>
          </tr>
          <tr>
            <td>金额逾期率</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">金额分级逾期率<br>(逾期90天内)</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">金额分级逾期率<br>(逾期90天以上至180天)</td> 
            <td></td>
          </tr>
          <tr>
            <td class="line-h">金额分级逾期率<br>(逾期180天以上)</td>
            <td></td>
          </tr>
          <tr>
            <td>人均累计借款金额</td>
            <td></td>
          </tr>
          <tr>
            <td>人均累计出借金额</td>
            <td></td>
          </tr>
          <tr>
            <td>最大单户出借余额占比</td>
            <td></td>
          </tr>
          <tr>
            <td>最大十户出借余额占比</td>
            <td></td>
          </tr>
          <tr class="border-none">
            <td class="line-h" style="padding:.6rem 0;">平台向借款人收取<br>服务费的标准</td>
            <td style="text-align:left;">平台服务费=借款金额*年化服务费率*借款期限/365 （年化服务费率在1.8%-5.2%）。</td>
          </tr>
        </div>
      </table>
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

  table.info {
    background: #fff;
    border-radius: .2rem;
    width: 90%;
    margin: 0 auto;
    font-size: .2rem;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
  }
  table.info div {
    padding: .1rem .15rem;
  }
  table.info tr {
    height: .6rem;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
  }
  table.info td:nth-child(1){
    width: 48%;
    text-align: left;
    border-right: 1px solid #eee;
    line-height: .7rem;
    padding-left: .1rem;
    vertical-align: middle;
  }
  table.info td:nth-child(2) {
    width: 57%;
    text-align: right;
    line-height: 1.6;
    padding-left: .2rem;
  }
  .line-h {
    line-height: 1.5 !important;
    padding: .12rem 0;
  }
  .organization {
    color: #666;    
    padding-bottom: 1rem;
    background: #f9f4f3;
  }
  .parting-line {
    width: 100%;
    height: .1rem;
    background: url('../../images/about/parting-line.png') no-repeat center center;
    background-size: contain;
    margin-top: .6rem;
  }
  .bsuiness-title {
    margin: .35rem 0 .5rem 0;
    width: 27%;
  }
  .sumolume{
    width: 90%;
    margin: 0.4rem auto;
    position: relative;
    height: 2.26rem;
    background: url(../../images/disclosure/header.png) no-repeat;
    background-size: cover;
  }

  .sumolume .sumTitle{
    color: #fff;
    text-align: center;
    padding-top: .3rem;
  }
  .sumolume span{
    width: 80%;
    font-size: .5rem;
    color: #fff;
    text-align: center;
    margin: .1rem 0;
    border-bottom: 1px solid #FFF;
    margin: 0 auto;
    display: block;
    font-family: PingFang-SC;
    font-weight: bold;
  }
  .sumolume p{
    color: #fff;
    font-size: .3rem;
    text-align: center;
    margin-top: .1rem;
  }
  .border-none {
    border: none !important;
  }
  .creatTime{
    margin-top: .35rem;
  }
</style>
