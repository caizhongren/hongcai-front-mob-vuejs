<template>
  <div class="goldenRecord" v-auto-height>
    <div class="addAdress" v-if="!hasAdress" @click="addAdress()">
      <p class="tip display-inb">提示：兑换实物奖品需要先设置收货地址，请点击此处添加</p>
      <img src="../../images/golden-fall/add.png" alt="" width="5%">
    </div>
    <div class="record-header">
      <img src="../../images/golden-fall/header-bg1.jpg" alt="" width="100%" class="display-bl">
    </div>
    <div class="record-wrapper">
      <div class="fall-record position-re">
        <img src="../../images/golden-fall/crab1.png" alt="" width="7%" class="crab position-ab">
        <p class="title">兑换记录</p>
        <div class="table-wrap">
          <table v-if="exchange.length > 0">
            <thead>
              <tr>
                <td>日期</td>
                <td>奖品</td>
                <td>消耗积分</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in exchange" v-bind:class="{'border-none': index === exchange.length-1}">
                <td>{{item.date | monthDay}}</td> 
                <td> {{item.prize}}</td>
                <td>{{item.score}}分</td>
              </tr>
            </tbody>
          </table>
          <div class="no-record" v-if="exchange.length <= 0">
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
        <div class="adress">{{user.adress}}</div>
      </div>
      <div class="adress-tip">*如遇特殊原因需要更改地址，请于活动结束前联系客服</div>
    </div>
    <!-- 收货地址弹窗 -->
    <div class="dialog mask-common" v-if="AdressMask">
      <div class="adressBg">
        <!-- 表单填写 -->
        <div class="formAdress" v-if="PreAdress">
          <div class="adress-title">
            <span>收</span><span>货</span><span>地</span><span>址</span>
          </div>
          <form action="">
            <input type="text" placeholder="请输入您的收件人姓名" v-model="user.name" maxlength="4">
            <input type="tel" placeholder="请输入联系电话" v-model="user.mobile" maxlength="11">
            <textarea id="adress" type="text" placeholder="请在此处输入您的详细收货地址\n(建议包含省/市、区级、详细街道名称)" v-model="user.adress"></textarea>
          </form>
          <div class="btns">
            <div class="mask-btn IKnowBtn fl" @click="closeAdress">稍后填写</div>
            <div class="mask-btn toMessage fr" @click="PreAdressForm(user)">确认</div>
          </div>
        </div>
        <!-- 表单提交 -->
        <div class="formAdress" v-if="PutAdress">
          <div class="adress-title">
            <span>收</span><span>货</span><span>地</span><span>址</span>
          </div>
          <div class="formContent">
            <div class="account">
              <p>{{user.name}}</p>
              <p>{{user.mobile}}</p>
            </div>
            <div class="adress">{{user.adress}}</div>
          </div>
          <div class="adressTips">*设置后将不可自行修改，请准确核实后再提交</div>
          <div class="btns">
            <div class="mask-btn IKnowBtn fl" @click="toPreAdress">修改</div>
            <div class="mask-btn toMessage fr" @click="PreAdressForm(user)">提交</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'goldenRecord',
    data () {
      return {
        hasAdress: false,
        AdressMask: false,
        PreAdress: false,
        PutAdress: false,
        exchange: [
          {
            date: 10000000,
            prize: '35000特权本金 x 5',
            score: 300
          },
          {
            date: 10000000,
            prize: '35000特权本金 x 10',
            score: 300
          },
          {
            date: 10000000,
            prize: '35000特权本金',
            score: 300
          },
          {
            date: 10000000,
            prize: '498大闸蟹礼券',
            score: 300
          },
          {
            date: 10000000,
            prize: '100元京东卡',
            score: 300
          }
        ],
        user: {
          name: '营业员',
          mobile: '1888888888',
          adress: '吉林省同呼吸通化县快大茂镇茂盛家园1111111你就能看见你'
        }
      }
    },
    mounted () {
    },
    prop: ['token'],
    created () {
    },
    methods: {
      addAdress () {
        this.AdressMask = true
        this.PreAdress = true
      },
      closeAdress () {
        this.AdressMask = false
        this.PreAdress = false
      },
      PreAdressForm (user) {
        if (!user.name || !user.mobile || !user.adress) {
          return
        }
        this.PreAdress = false
        this.PutAdress = true
      },
      toPreAdress () {
        this.PreAdress = true
        this.PutAdress = false
      }
    }
  }
</script>
<style scoped>
  @import '../../css/golden-mask.css';
  .goldenRecord {
    font-family: PingFang-SC;
    overflow: hidden;
    position: fixed;
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
    overflow: hidden;
    clear: both;
    margin-bottom: .05rem;
  }
  .adress-content .account p {
    float: left;
    text-align: left;
  }
  .adress-content .account p:nth-child(1) {
    width: 25%;
    margin-right: .5rem;
  }
  .adress-content .account p:nth-child(2) {
    width: 60%;
  }
  .adress-content .adress {
    text-align: justify;
    height: .75rem;
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
    height: 6.78rem;
    background: url('../../images/golden-fall/bg-header.png') no-repeat 60% top, url('../../images/golden-fall/list-box.png') no-repeat center bottom;
    background-size: 76%, 100%;
  }
  .fall-record .crab {
    top: 16%;
    right: 28%;
  }
  .fall-record .leaf {
    top: 21%;
    left: 3%;
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
    height: 4.45rem;
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
