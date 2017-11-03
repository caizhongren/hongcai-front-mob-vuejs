<template>
  <div class="goldenRecord">
    <div class="addAdress" v-if="!hasAdress" @click="AdressMask = true">
      <p class="tip display-inb">提示：兑换实物奖品需要先设置收货地址，请点击此处添加</p>
      <img src="../../images/golden-fall/add.png" alt="" width="5%">
    </div>
    <div class="record-header">
      <img src="../../images/golden-fall/header-bg1.jpg" alt="" width="100%" class="display-bl">
    </div>
    <div class="record-wrapper">
      <div class="fall-record position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="crab position-ab">
        <img src="../../images/golden-fall/leaf.png" alt="" width="17%" class="leaf position-ab">
        <p class="title">兑换记录</p>
        <div class="table-wrap">
          <table v-if="showRecord">
            <thead>
              <tr>
                <td>日期</td>
                <td>奖品</td>
                <td>消耗积分</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in recordList" v-bind:class="{'border-none': index === recordList.length-1 && index >= 3}">
                <td>{{item.exchangeTime | monthDay}}</td> 
                <td> {{item.awardDesc}}</td>
                <td>{{item.exchangeScore}}分</td>
              </tr>
            </tbody>
          </table>
          <div class="no-record" v-if="!showRecord">
            这里空空如也～ <br>快去挑选心仪的奖励进行兑换吧
          </div>
        </div>
      </div>
    </div>
    <div class="hasAdress formAdress" v-if="hasAdress">
      <div class="adress-title">
        <span>收</span><span>货</span><span>地</span><span>址</span>
      </div>
      <div class="adress-content">
        <div class="account">
          <p>{{user.name}}</p>
          <p>{{user.mobile}}</p>
        </div>
        <div class="adress">{{user.address}}</div>
      </div>
      <div class="adress-tip">*如遇特殊原因需要更改地址，请于活动结束前联系客服</div>
    </div>
    <div class="dialog mask-common" v-if="AdressMask">
      <golden-address :AdressMask="AdressMask" :closeMask="closeMask" :token="token" :getAddress="getAddress"></golden-address>
    </div>
  </div>
</template>
<script>
  import GoldenAddress from './golden-adress.vue'
  export default {
    name: 'goldenRecord',
    data () {
      return {
        hasAdress: false,
        recordList: [],
        user: [
          {
            name: '',
            mobile: '',
            address: ''
          }
        ],
        showRecord: false,
        AdressMask: false
      }
    },
    watch: {
      recordList: function (val) {
        val.length > 0 ? this.showRecord = true : this.showRecord = false
      }
    },
    props: ['token'],
    created () {
      this.getRecordList()
      this.getAddress()
    },
    components: {
      GoldenAddress
    },
    methods: {
      getRecordList () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/socreExchange/record?token=' + that.token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.recordList = res.data.data
          } else {
            console.log(res.data.msg)
          }
        })
      },
      getAddress () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/addresses?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.user = res.data
            that.hasAdress = true
          } else {
            that.hasAdress = false
          }
        })
      },
      closeMask () {
        this.AdressMask = false
      }
    },
    destroyed () {
      // alert(3)
    },
    deactivated () {
      // alert(11)
      // this.$destory()
    }
  }
</script>
<style scoped>
  .goldenRecord {
    font-family: PingFang-SC;
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
  .record-header {
    height: 4.2rem;
  }
  .addAdress {
    color: #c82d00;
    width: 100%;
    height: .6rem;
    line-height: .65rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 .15rem;
    background: #ffde69;
    font-size: .2rem;
    font-weight: 500;
    text-align: left;
    z-index: 9999999;
  }
  .addAdress img {
    vertical-align: text-bottom;
    position: relative;
    top: .04rem;
    left: .05rem;
  }
  .hasAdress {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2.5rem;
    background: url('../../images/golden-fall/6.png') no-repeat 60% top, #faf1ca;
    background-size: 100%;
  }
  .hasAdress .adress-title {
    padding: .2rem .3rem 0rem;
  }
  .adress-content {
    padding: 0 .5rem;
    font-size: .22rem;
    color: #666;
  }
  .adress-content .account {
    overflow: auto;
    clear: both;
    margin-bottom: .05rem;
    height: .4rem;
  }
  .adress-content .account p {
    float: left;
    text-align: left;
  }
  .adress-content .account p:nth-child(1) {
    width: 50%;
  }
  .adress-content .account p:nth-child(2) {
    width: 50%;
  }
  .adress-content .adress {
    text-align: justify;
    height: .72rem;
    overflow-y: auto;
  }
  .adress::-webkit-scrollbar {display:none}
  .adress-tip {
    color: #ff0000;
    font-size: .2rem;
    text-align: left;
    padding: 0 .5rem;
  }
  .record-wrapper {
    background: #e98c28;
    height: 13rem;
  }
  .fall-record {
    width: 92%;
    margin-left: 2%;
    margin: -3.8rem auto 0;
    height: 6.8rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/list-box.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .fall-record .crab {
    top: 16%;
    right: 28%;
  }
  .fall-record .leaf {
    top: 46%;
    left: -12%;
  }
  .fall-record .title {
    height: 1.88rem;
    font-size: .31rem;
    font-weight: bold;
    line-height: 7.5;
    letter-spacing: -0.5px;
    color: #ec812c;
  }
  .no-record {
    color: #ff4030;
    font-size: .28rem;
    margin-top: 1.6rem;
  }
  .fall-record .table-wrap {
    width: 90%;
    margin: 0 auto;
    height: 4.46rem;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table-wrap::-webkit-scrollbar {display:none}
  .table-wrap {
    position: relative;
    border-radius: .1rem;
    padding: 0 1.5%;
  }
  .table-wrap table {
    width: 100%;
  }
  thead td{
    height: .85rem;
    line-height: .85rem;
  }
  thead tr, tbody tr {
    border-bottom: 1px solid #e78827;
  }
  thead tr td:first-child, thead tr td:first-child + td, tbody tr td:first-child, tbody tr td:first-child + td{
    border-right: 1px solid #e78827;
  }
  tbody td {
    height: .9rem;
    line-height: .9rem;
    color: #666;
    font-size: .27rem;
  }
  thead td:last-child {
    width: 27%;
  }
  thead td:first-child {
    width: 22%;
  }
  thead td {
    color: #ff4030;
    font-size: .28rem;
    font-weight: bold;
    text-align: center;
  }
  @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px) 
    and (orientation : portrait) { 
    .fall-record {
      height: 7.92rem;
    }
    .fall-record .title {
      height: 2.23rem;
      line-height: 9;
    }
    .fall-record .table-wrap {
      height: 4.75rem;
    }
    .goldenRecord {
      overflow: auto;
    }
  }
</style>
