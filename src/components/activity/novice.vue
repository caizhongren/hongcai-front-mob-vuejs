<template>
  <div class="novice">
    <div class="header">
      <img src="../../images/novice/header-01.png" alt="">
      <img src="../../images/novice/header-02.png" alt="">
      <img src="../../images/novice/header-03.png" alt="">
      <img src="../../images/novice/header-04.png" alt="">
      <img src="../../images/novice/header-05.png" alt="">
      <img src="../../images/novice/header-06.png" alt="">
      <img src="../../images/novice/header-07.png" alt="">
      <img src="../../images/novice/header-08.png" alt="">
      <img src="../../images/novice/header-09.png" alt="">
      <img src="../../images/novice/header-10.png" alt="">
      <img src="../../images/novice/header-11.png" alt="">
      <img src="../../images/novice/header-12.png" alt="">
      <img src="../../images/novice/header-13.png" alt="">
      <img src="../../images/novice/header-14.png" alt="">
      <img src="../../images/novice/header-15.png" alt="">
    </div>
    <div class="cashCoupon">
        <div class="bigBox">
          <div class="smallBox">
            <img class="cashTip" src="../../images/novice/cashCoupon-tip.png" alt="">
            <div class="cashs">
              <img class="cash782 fl" src="../../images/novice/782.png" alt="">
              <img class="add" src="../../images/novice/add.png" alt="">
              <img class="cash182 fr" src="../../images/novice/182.png" alt="">
            </div>
            <img class="loadMore" src="../../images/novice/btn-loadMore.png" alt="" @click="loadMore">
            <div class="cashCouponList">
              <img class="detail" src="../../images/novice/cashCoupon-detail.png" alt="">
              <img src="../../images/novice/cashCoupon-428.png" alt="">
              <img src="../../images/novice/cashCoupon-238.png" alt="">
              <img src="../../images/novice/cashCoupon-78.png" alt="">
              <img src="../../images/novice/cashCoupon-38.png" alt="">
              <img src="../../images/novice/cashCoupon-98.png" alt="">
              <img src="../../images/novice/cashCoupon-58.png" alt="">
              <img src="../../images/novice/cashCoupon-18.png" alt="">
              <img src="../../images/novice/cashCoupon-8.png" alt="">
              <img class="IKnow" src="../../images/novice/btn-IKnow.png" alt="" @click="slideUp">
            </div>
          </div>
        </div>
    </div>
    <div class="rules" v-bind:class="{'rules-bottom' : !isIos}">
      <img src="../../images/novice/rule-01.png" alt="">
      <img src="../../images/novice/rule-02.png" alt="">
      <img src="../../images/novice/rule-03.png" alt="">
      <img src="../../images/novice/rule-04.png" alt="">
      <img src="../../images/novice/rule-05.png" alt="">
      <img src="../../images/novice/rule-06.png" alt="">
      <img src="../../images/novice/rule-07.png" alt="">
      <img src="../../images/novice/rule-08.png" alt="">
      <img src="../../images/novice/rule-09.png" alt="">
      <img src="../../images/novice/rule-10.png" alt="">
    </div>
    <div class="iosTips" v-show="isIos">
      该活动与设备生产商APPLE INC.公司无关
    </div>
    <div class="btns" @click="toHCNative">{{(!userAuth.active && userAuth.authStatus === 2) || userAuth.authStatus === 0 ? '立即开通银行存管' : '立即投资'}}</div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {Utils, bridgeUtil} from '../../service/Utils'
  export default {
    name: 'Novice',
    data () {
      return {
        isIos: Utils.isIos(),
        userAuth: {
          active: Boolean,
          authStatus: Number
        },
        token: String
      }
    },
    created: function () {
      this.token = this.$route.params.token
      bridgeUtil.setupWebViewJavascriptBridge()
      this.token ? this.getUserAuth() : ''
    },
    methods: {
      loadMore: function () {
        $('.cashCouponList').slideToggle()
        // $('.cashCouponList').show()
        $('.loadMore').hide()
      },
      slideUp: function () {
        $('.cashCouponList').slideToggle('fast')
        // $('.cashCouponList').hide()
        $('.loadMore').show()
      },
      getUserAuth: function () {
        this.$http({
          methods: 'get',
          url: '/hongcai/rest/users/0/userAuth?token=' + this.token
        }).then((response) => {
          this.userAuth = response.data
        })
      },
      toHCNative: function () {
        if ((!this.userAuth.active && this.userAuth.authStatus === 2) || this.userAuth.authStatus === 0) {
          bridgeUtil.webConnectNative('HCNative_CgtActive', null, {}, function (response) {}, null)
        } else {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', null, {}, function (response) {}, null)
        }
      }
    }
  }
</script>

<style scoped>
  .novice {
    margin-bottom: 1rem;
    background-color: #fccf00;
  }
  .header img {
    vertical-align: top;
    width: 100%;
  } 
  .rules img {
    vertical-align: bottom;
    width: 100%;
  }
  .cashCoupon {
    padding: .2rem .4rem;
  }
  .bigBox {
    padding: .065rem;
    background-color: #f98c0b;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: .15rem;
    box-shadow: 0px 0px .65rem #f98c0b;
  }
  .smallBox {
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: .2rem;
    /*height: 10rem;*/
    box-shadow: 0px 0px .2rem 0 #d87d11;
    padding: .68rem .18rem .36rem;
  }
  .btns {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    color: #ffffff;
    background-color: #fe7201;
    font-size: .32rem;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    max-width: 720px;
    margin: 0 auto;
  }
  .rules-bottom {
    padding-bottom: .3rem;
  }
  .iosTips {
    text-align: center;
    color: #4a5a5a;
    font-size: .2rem;
    padding-bottom: .3rem;
  }
  .cashTip {
    width: 90%;
  }
  .cashs {
    clear: both;
    overflow: hidden;
    position: relative;
  }
  .cash782, .cash182{
    width: 57%;
  }
  .cash782 {
    margin-left: -.4rem;
  }
  .cash182 {
    margin-right: -.4rem;
  }
  .add {
    width: 30%;
    top: 20%;
    position: absolute;
    left: 35.2%;
  }
  .loadMore {
    width: 51%;
  }
  .cashCouponList {
    display: none;
  }
  .cashCouponList img {
    width: 100%;
  }
  .cashCouponList .detail {
    width: 40%;
  }
  .cashCouponList .IKnow {
    width: 51%;
    margin-top: .3rem;
  }
</style>
