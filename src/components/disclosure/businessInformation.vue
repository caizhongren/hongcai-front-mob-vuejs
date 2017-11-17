<template>
  <div class="business">
    <!-- 累计交易总额 -->
    <div class="cumulativeTotal commonBoxShadow">
      <p class="title">累计交易总额</p>
      <p class="data">{{cumulative.amount}}元</p>
    </div>
    <!-- 累计交易笔数 -->
    <div class="cumulativeTotal commonBoxShadow">
      <p class="title">累计交易笔数</p>
      <p class="data">{{cumulative.numOfTransactions}}次</p>
    </div>
      <!-- 累计注册会员数 -->
    <div class="cumulativeTotal commonBoxShadow">
      <p class="title">累计注册会员数</p>
      <p class="data">{{cumulative.userCount}}人</p>
    </div>
    <ul class="otherList">
      <li class="commonBoxShadow">
        <p class="title">逾期金额及笔数</p><br>
        <span class="data fl">0</span>
        <img src="../../images/disclosure/business-icon2.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">逾期90天以上的金额及笔数</p>
        <span class="data fl">0</span>
        <img src="../../images/disclosure/business-icon2.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">待偿金额及笔数</p><br>
        <span class="data fl">0</span>
        <img src="../../images/disclosure/business-icon1.png" class="fr" width="22%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">前十大借款人待还金额占比</p>
        <span class="data fl">0</span>
        <img src="../../images/disclosure/business-icon4.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">最大单一借款人待还金额占比</p>
        <span class="data fl">0</span>
        <img src="../../images/disclosure/business-icon4.png" class="fr" width="20%">
      </li>
      <li class="commonBoxShadow">
        <p class="title">关联关系借款余额</p><br>
        <span class="data fl">0</span>
        <img src="../../images/disclosure/business-icon3.png" class="fr" width="22%">
      </li>
    </ul>
    <div class="creatTime">数据统计期限：平台成立至{{updateDate}}日24:00</div>
  </div>
</template>
<script>
  export default {
    name: 'BusinessInformation',
    data () {
      return {
        cumulative: {
          amount: 0,
          numOfTransactions: 0,
          userCount: 0
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
        this.updateDate = (newYear + '-' + newMonth + '-' + day)
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
  }
  .cumulativeTotal {
    width: 90%;
    height: 1.5rem;
    margin: 0.3rem auto;
    text-align: left;
  }
  .commonBoxShadow .title {
    font-size: .28rem;
    color: #666666;
    margin-bottom: .1rem;
    width: 105%;
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
</style>
