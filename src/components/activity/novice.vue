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
    </div>
    <div class="rateCoupon" v-if="false">
      <img src="../../images/novice/header-09.png" alt="">
      <div class="rateCouponTip">
        <img src="../../images/novice/RateCoupon.png" alt="">
      </div>
      <img src="../../images/novice/header-10.png" alt="">
      <img src="../../images/novice/header-11.png" alt="">
      <img src="../../images/novice/header-12.png" alt="">
      <img src="../../images/novice/header-13.png" alt="">
      <img src="../../images/novice/header-14.png" alt="">
    </div>
    <div class="rateCoupon2">
        <div class="bigBox">
          <div class="smallBox">
            <img class="cashTip" src="../../images/novice/RateCoupon.png" alt="">
            <img src="../../images/novice/rate-point-10.png" alt="" class="tqRate">
            <!-- <div class="rates">
              <img class="rate1 fl" src="../../images/novice/rate-point-16.png" alt="">
              <img class="rate2 fr" src="../../images/novice/rate-point-8.png" alt="">
            </div>
            <div class="rates">
              <img class="rate1 fl" src="../../images/novice/rate-point-12.png" alt="">
              <img class="rate2 fr" src="../../images/novice/rate-point-5.png" alt="">
            </div>
            <div class="rates">
              <img class="rate1 fl" src="../../images/novice/rate-point-81.png" alt="">
              <img class="rate2 fr" src="../../images/novice/rate-point-3.png" alt="">
            </div> -->
          </div>
        </div>
    </div>
    <img src="../../images/novice/header-15.png" alt="" width="100%">
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
    <div class="rules" v-bind:class="{'rules-bottom' : !isIos}" v-if="false">
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
    <div class="rules2" v-bind:class="{'rules-bottom' : !isIos}">
      <img src="../../images/novice/rule-11.png" alt="" class="img-header">
      <img src="../../images/novice/rule-12.png" alt="">
      <img src="../../images/novice/rule-13.png" alt="">
      <img src="../../images/novice/rule-14.png" alt="">
      <img src="../../images/novice/rule-15.png" alt="">
      <img src="../../images/novice/rule-16.png" alt="">
      <img src="../../images/novice/rule-17.png" alt="">
      <img src="../../images/novice/rule-18.png" alt="">
      <img src="../../images/novice/rule-19.png" alt="">
      <img src="../../images/novice/rule-20.png" alt="">
    </div>
    <div class="iosTips" v-show="isIos">
      该活动与设备生产商APPLE INC.公司无关
    </div>
    <div class="btns" @click="toHCNative">{{userAuth.active && userAuth.authStatus === 2 ? '立即出借' : '立即开通银行存管'}}</div>
  </div>
</template>

<script>
  import $ from 'zepto'
  import {Utils, bridgeUtil} from '../../service/Utils'
  export default {
    name: 'Novice',
    data () {
      return {
        isIos: Utils.isIos(),
        userAuth: {
          active: Boolean,
          authStatus: Number
        }
      }
    },
    created: function () {
      this.token ? this.getUserAuth() : ''
    },
    props: ['token'],
    watch: {
      token: function (val) {
        if (val && val !== '') {
          this.getUserAuth()
        }
      }
    },
    methods: {
      loadMore: function () {
        $('.cashCouponList').show()
        $('.loadMore').hide()
      },
      slideUp: function () {
        $('.cashCouponList').hide()
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
        if (this.userAuth.active && this.userAuth.authStatus === 2) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', null, {}, function (response) {}, null)
        } else {
          bridgeUtil.webConnectNative('HCNative_CheckUserAuth', null, {}, function (response) {}, null)
        }
      }
    }
  }
</script>

<style scoped>
  .tqRate {
    width: 104%;
    margin-left: -.5rem;
  }
  .novice {
    margin-bottom: .8rem;
    background-color: #fccf00;
    width: 100%;
  }
  .header img {
    vertical-align: top;
    width: 100%;
  }
  .rules2 .img-header {
    margin-top: .5rem;
  }
  .rules img, .rules2 img {
    vertical-align: bottom;
    width: 100%;
  }
  .cashCoupon, .rateCoupon2 {
    padding: .2rem .4rem;
  }
  .rateCoupon2 {
    margin: .2rem 0 .6rem;
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
    padding: .68rem .18rem 0rem;
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
    padding-bottom: .5rem;
  }
  .iosTips {
    text-align: center;
    color: #4a5a5a;
    font-size: .2rem;
    padding-bottom: .3rem;
  }
  .cashTip {
    width: 100%;
  }
  .cashs, .rates {
    clear: both;
    overflow: hidden;
    position: relative;
  }
  .rates {
    margin-top: -0.4rem;
  }
  .rate1, .rate2 {
    width: 50%;
  }
  .cash782, .cash182{
    width: 56%;
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
  .rateCoupon {
    position: relative;
  }
  .rateCoupon img {
    width: 100%;
    vertical-align: top;
  }
  .rateCouponTip {
    background-color: #fff;
    width: 84%;
    position: absolute;
    top: .5rem;
    left: 8%;
  }
  .rateCouponTip img {
    width: 96%;
    padding-top: .1rem;
  }
</style>
