<template>
  <div class="lottery-record" v-auto-height>
    <div class="lottery-list-wrap">
      <div class="lottery-list-header">(最近两周内)</div>
      <!-- prizeType：1, "当日加息"" ; 2, "现金奖励 ; 3, "加息券 ; 4, "现金券" ; 5, "特权本金" -->
      <ul v-show="showRecord">
        <li v-for="record in userLotteryRecord " class="text-left">
          <span v-if="record.prizeType === 1"><img src="../../images/lottery/one-day-rate-icon.png" width="100%"></span>
          <span v-if="record.prizeType === 2"><img src="../../images/lottery/cash-icon.png" width="100%"></span>
          <span v-if="record.prizeType === 3"><img src="../../images/lottery/rate-coupon-icon.png" width="100%"></span>
          <span v-if="record.prizeType === 4"><img src="../../images/lottery/cash-coupon-icon.png" width="100%"></span>
          <span v-if="record.prizeType === 5"><img src="../../images/lottery/privilege-icon.png" width="100%"></span>
          <span v-if="record.prizeType === 1">当日加息</span>
          <span v-if="record.prizeType === 2">现金奖励</span>
          <span v-if="record.prizeType === 3">加息券</span>
          <span v-if="record.prizeType === 4">现金券</span>
          <span v-if="record.prizeType === 5">特权本金</span>
          <span v-if="record.prizeType === 3 || record.prizeType === 1">{{record.value}}%</span>
          <span v-if="record.prizeType === 2">{{record.value}}元</span>
            <span v-if="token && record.prizeType === 5 || record.prizeType === 4">{{record.value.slice(0,-3)}}元</span>
          <span class="ft-1p2 fr">{{record.time | dateTime }}</span>
        </li>
        <li class="text-center ft-grey999 border-none" v-show="userLotteryRecord.length > 0 && userLotteryRecord[0].value">已无更多记录</li>
      </ul>
      <div class="no-data" v-show="token && !showRecord">
        <img src="../../images/lottery/no-data.png" width="60%" class="margin-auto display-bl">
        <img src="../../images/lottery/hc-baby.png" width="26%" class="margin-auto display-bl">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lotteryRecord',
    data () {
      return {
        record: {
          prizeType: 4
        },
        userLotteryRecord: [],
        showRecord: false
      }
    },
    created: function () {
      this.token ? this.getLotteryRecord() : null
    },
    props: ['token'],
    watch: {
      'token': function (val) {
        val && val !== '' ? this.getLotteryRecord() : null
      },
      userLotteryRecord: function (val) {
        val.length > 0 ? this.showRecord = true : this.showRecord = false
      }
    },
    methods: {
      getLotteryRecord: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/lotteries/rewards?token=' + that.token
        })
        .then(function (res) {
          that.userLotteryRecord = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .margin-auto {
    margin: 0 auto;
  }
  .border-none {
    border: none !important;
  }
  /*我的奖励*/
  .lottery-record {
    padding-top: .7rem;
    background: url('../../images/lottery/record-bg.jpg') 0 0 no-repeat;
    background-size: 100% 100%;
    width: 100%;
    overflow: hidden;
    position: fixed;
    padding-bottom: 3rem;
    color: #222;
  }
  .lottery-record .lottery-list-wrap {
    width: 92%;
    height: 128%;
    margin: 0 auto;
    background: url('../../images/lottery/record-list-bg.png') 0 0 no-repeat;
    background-size: 100% 100%;
    -webkit-overflow-scrolling: touch;
  }
  @media(max-height: 480px) {
    .lottery-record .lottery-list-wrap {
      height: 150%;
    }
  }
  .lottery-record .lottery-list-wrap .lottery-list-header {
    width: 93%;
    margin: 0 auto;
    color: #fc7371;
    text-align: center;
    height: 2rem;
    line-height: 3rem;
    border-bottom: 1px solid #ddd;
  }
  .lottery-record .lottery-list-wrap .no-data {
    padding-top: 19%;
  }
  .lottery-record .lottery-list-wrap .no-data img:first-child{
    margin-bottom: 10%;
  }
  .lottery-record .lottery-list-wrap ul {
    width: 90%;
    height: 72%;
    display: block;
    margin: 0 auto;
    overflow-y: auto;
  }
  .lottery-record .lottery-list-wrap ul li {
    margin-bottom: 0;
    /* width: 100%; */
    border-bottom: 1px solid #ddd;
    padding: 0 0.1rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: .22rem;
  }
  .lottery-record .lottery-list-wrap ul li span {
    display: inline-block;
  }
  .lottery-record .lottery-list-wrap ul li span:first-child {
    width: 7%;
    margin-bottom: -.1rem;
    vertical-align: middle;
  }
  .lottery-record .lottery-list-wrap ul li span:nth-child(2) {
    width: 21%;
    text-align: left;
  }
  .lottery-record .lottery-list-wrap ul li span:nth-child(3) {
    /*width: 11%;*/
    width: 23%;
    text-align: center;
  }
</style>
