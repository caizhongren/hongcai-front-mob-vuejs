<template>
  <div class="business">
    <div class="overflow-hid">
      <input type="month" class="form-control" min="2018-03" v-bind:max="dataTime" v-on:input="selectDate($event);" v-model="date" step="1"/>
      <img src="../../images/disclosure/search.png" alt="查询" class="search" @click="search" />
    </div>
    <div class="sumolume">
      <div class="sumTitle">累计交易总额(元)</div>
      <span>{{cumulative.totalTransactionAmount | amount}}元</span>
      <p>累计交易{{cumulative.totalTransactionCount | amount}} 笔</p>
    </div>
    <table class="info">
      <div>
        <tr>
            <td>借贷余额</td> 
            <td>{{cumulative.loanBalance | amount}}元</td>
          </tr>
        <tr>
          <td>借贷余额笔数</td> 
          <td>{{cumulative.loanBalanceCreditRightCount | amount}}笔</td>
        </tr>
        <tr>
          <td>利息余额</td> 
          <td>{{cumulative.loanInterestBalance | amount}}元</td>
        </tr>
        <tr>
          <td>累计注册会员数</td>
          <td>{{cumulative.userCount | amount}}人</td>
        </tr>
        <tr>
          <td>累计借款人数</td> 
          <td>{{cumulative.numOfBorrows | amount}}人</td>
        </tr>
        <tr>
          <td>累计出借人数</td> 
          <td>{{cumulative.numOfLends | amount}}人</td>
        </tr>
        <tr>
          <td>当前借款人数</td> 
          <td>{{cumulative.currentNumOfBorrows | amount}}人</td>
        </tr>
        <tr>
          <td>当前出借人数</td> 
          <td>{{cumulative.currentNumOfLends | amount}}人</td>
        </tr>
        <tr>
          <td class="line-h">前十大借款人<br>待还金额占比</td> 
          <td>{{cumulative.topTenBorrowerRemainPrincipalPercent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">最大单一借款人<br>待还金额占比</td> 
          <td>{{cumulative.topOneBorrowerRemainPrincipalPercent | amount}}%</td>
        </tr>
        <tr>
          <td>关联关系借款余额</td> 
          <td>{{cumulative.relationshipLoanBalance | amount}}元</td>
        </tr>
        <tr>
          <td>关联关系借款笔数</td> 
          <td>{{cumulative.relationshipLoanCount | amount}}笔</td>
        </tr>
        <tr>
          <td>逾期金额</td> 
          <td>{{cumulative.overdueAmount | amount}}元</td>
        </tr>
        <tr>
          <td>逾期笔数</td> 
          <td>{{cumulative.overdueCount | amount}}笔</td>
        </tr>
        <tr>
          <td>逾期90天以上的金额</td> 
          <td>{{cumulative.overdue90Amount | amount}}元</td>
        </tr>
        <tr>
          <td>逾期90天以上的笔数</td> 
          <td>{{cumulative.overdue90Count | amount}}笔</td>
        </tr>
        <tr>
          <td>代偿金额</td> 
          <td>{{cumulative.compensatoryAmount | amount}}元</td>
        </tr>
        <tr>
          <td>代偿笔数</td> 
          <td>{{cumulative.compensatoryCount | amount}}笔</td>
        </tr>
        <tr>
          <td>项目逾期率</td> 
          <td>{{cumulative.projectOverduePercent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">项目分级逾期率<br>(逾期90天内)</td> 
          <td>{{cumulative.projectOverdueIn90Percent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">项目分级逾期率<br>(逾期90天以上至180天)</td> 
          <td>{{cumulative.projectOverdueIn180Percent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">项目分级逾期率<br>(逾期180天以上）</td> 
          <td>{{cumulative.projectOverdue180Percent | amount}}%</td>
        </tr>
        <tr>
          <td>金额逾期率</td> 
          <td>{{cumulative.overdueAmountPercent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">金额分级逾期率<br>(逾期90天内)</td> 
          <td>{{cumulative.overdueIn90AmountPercent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">金额分级逾期率<br>(逾期90天以上至180天)</td> 
          <td>{{cumulative.overdueIn180AmountPercent | amount}}%</td>
        </tr>
        <tr>
          <td class="line-h">金额分级逾期率<br>(逾期180天以上)</td>
          <td>{{cumulative.overdue180AmountPercent | amount}}%</td>
        </tr>
        <tr>
          <td>人均累计借款金额</td>
          <td>{{cumulative.borrowerTotalAmountPerCapital | amount}}元</td>
        </tr>
        <tr>
          <td>人均累计出借金额</td>
          <td>{{cumulative.lenderTotalAmountPerCapital | amount}}元</td>
        </tr>
        <tr>
          <td>最大单户出借余额占比</td>
          <td>{{cumulative.topOneLendAmountPercent | amount}}%</td>
        </tr>
        <tr>
          <td>最大十户出借余额占比</td>
          <td>{{cumulative.topTenLendAmountPercent | amount}}%</td>
        </tr>
        <tr class="border-none">
          <td class="line-h">平台向借款人收取<br>服务费的标准</td>
          <td style="text-align:left;">{{cumulative.loanServiceFeeStandard}}</td>
        </tr>
      </div>
    </table>
    <div class="creatTime">数据统计：截至{{updateDate | date}}</div>
  </div>
</template>
<script>
  export default {
    name: 'BusinessInformation',
    data () {
      return {
        cumulative: {
          totalTransactionAmount: 0, // 累计交易总额
          totalTransactionCount: 0, // 累计交易笔数
          userCount: 0, // 累计注册会员数
          loanBalance: 0, // 借贷余额
          loanBalanceCreditRightCount: 0, // 借贷余额笔数
          loanInterestBalance: 0, // 利息余额
          numOfLends: 0, // 累计出借人数
          numOfBorrows: 0, // 累计借款人数
          currentNumOfLends: 0, // 当前出借人数
          currentNumOfBorrows: 0, // 当前借款人数
          topTenBorrowerRemainPrincipalPercent: 0, // 前十大借款人待还金额占比
          topOneBorrowerRemainPrincipalPercent: 0, // 最大单一借款人待还金额占比
          relationshipLoanBalance: 0, // 关联关系借款余额
          relationshipLoanCount: 0, // 关联关系借款笔数
          overdueAmount: 0, // 逾期金额
          overdueCount: 0, // 逾期笔数
          overdue90Amount: 0, // 逾期90天以上的金额
          overdue90Count: 0, // 逾期90天以上的笔数
          compensatoryAmount: 0, // 代偿金额
          compensatoryCount: 0, // 代偿笔数
          projectOverduePercent: 0, // 项目逾期率
          projectOverdueIn90Percent: 0, // 项目分级逾期率（逾期90天内）
          projectOverdueIn180Percent: 0, // 项目分级逾期率（逾期90天以上至180天）
          projectOverdue180Percent: 0, // 项目分级逾期率（逾期180天以上
          overdueAmountPercent: 0, // 金额逾期率
          overdueIn90AmountPercent: 0, // 金额分级逾期率（逾期90天内）
          overdueIn180AmountPercent: 0, // 金额分级逾期率（逾期90天以上至180天）
          overdue180AmountPercent: 0, // 金额分级逾期率（逾期180天以上）
          borrowerTotalAmountPerCapital: 0, // 人均累计借款金额
          lenderTotalAmountPerCapital: 0, // 人均累计出借金额
          topOneLendAmountPercent: 0, // 最大单户出借余额占比
          topTenLendAmountPercent: 0, // 最大十户出借余额占比
          loanServiceFeeStandard: ''
        },
        updateDate: '1522511999999',
        date: '',
        dataTime: '',
        currentYear: Number,
        currentMonth: Number
      }
    },
    created () {
      this.getPlatformData()
    },
    methods: {
      search () {
        if (this.date === '') {
          this.$parent.showErrMsg('查询时间为2018年4月至' + this.dataTime, false, {top: '5rem'})
          return
        }
        this.getPlatformData(this.date)
      },
      selectDate (e) {
        var that = this
        let year = new Date(e.target.value).getFullYear()
        let month = new Date(e.target.value).getMonth() + 1
        if (year < 2018 || year === 2018 && month < 4 || year > that.currentYear || year === that.currentYear && month > that.currentMonth) {
          that.$parent.showErrMsg('查询时间为2018-04至' + that.dataTime, false, {top: '5rem'})
          that.date = ''
          return
        }
      },
      // 占比保留两位小数
      getPlatformData (dataTime) {
        let url = ''
        dataTime ? url = '/hongcai/rest/disclosureInfo/newest?dataTime=' + dataTime : url = '/hongcai/rest/disclosureInfo/newest'
        var that = this
        that.$http({
          method: 'get',
          url: url
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.cumulative = res.data.disclosureInformationDetail
            that.updateDate = res.data.systemDataTime
            !dataTime ? (that.dataTime = res.data.dataTime, that.currentYear = new Date(res.data.systemDataTime).getFullYear(), that.currentMonth = new Date(res.data.systemDataTime).getMonth() + 1) : null
            that.date = res.data.dataTime
          } else {
            console.log(res.data.msg)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .form-control {
    width: 65%;
    padding: 0 .3rem;
    height: 0.8rem;
    line-height: .8rem;
    background: #eee;
    border-radius: .5rem;
    border: none;
    color: #666;
    font-size: .24rem;
    text-align: left;
    margin: 0.5rem .05rem .0rem .3rem;
    float: left;
  }
  .search {
    float: left;
    width: 17%;
    margin-top: .35rem;
  }
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
    font-size: .24rem;
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
