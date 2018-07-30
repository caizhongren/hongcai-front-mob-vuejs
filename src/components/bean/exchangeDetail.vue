<template>
  <div class="exchangeDetail" :class="{'marign-b-8': orderDetail.goodsType !== 3}">
    <div class="top">
      <div class="banner">
        <img src="../../images/beans/img_nor.png" alt="" width="100%" v-if="!showImg">
        <img v-bind:src="orderDetail.imgUrl" alt="" width="100%" v-if="showImg">
        <div class="header">
          <p class="title">{{orderDetail.goodsName}}<span v-if="orderDetail.gradeName">-{{orderDetail.gradeName}}</span></p>
          <p class="validity" v-if="orderDetail.usefulTime">有效期至：{{orderDetail.usefulTime | date('-')}}</p>
          <span class="left"></span>
          <span class="right"></span>
        </div>
        <div class="description">
          <div class="title"><span></span> <p>商品详情</p></div>
          <div v-html="orderDetail.goodsDesc" class="content"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title"><span></span><p> 支付金额：<a>{{orderDetail.beans}}宏豆</a></p></div>
      <div class="orderNumber">订单编号：<span>{{orderDetail.orderNumber}}</span></div>
      <div class="orderTime">下单时间：<span>{{orderDetail.orderTime | dateTime}}</span></div>
    </div>
    <Bean-Update :showUpdate="showUpdate" v-show="showUpdate"></Bean-Update>
    <div class="fixedBtn" :class="{'greyBtn': orderDetail.useStatus !== 2}" @click="goInvestList(orderDetail.goodsType)" v-if="orderDetail.goodsType !== 3">{{orderDetail.useStatus === 2 ? '马上使用' : '已使用'}}</div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  import BeanUpdate from './alertWrap.vue'
  export default {
    data () {
      return {
        orderDetail: {
          imgUrl: '',
          goodsName: '',
          gradeName: '',
          usefulTime: 0,
          goodsDesc: '',
          orderNumber: 0,
          orderTime: 0,
          beans: 0,
          useStatus: 2, // 使用状态：已使用：1，未使用：2
          goodsType: 3 // 加息券：1，现金券：2，提现券：3
        },
        showImg: false,
        showUpdate: false,
        version: ''
      }
    },
    props: ['token', 'showErrMsg', 'baseFileUrl'],
    watch: {
      'orderDetail.imgUrl': function (val) {
        val ? this.showImg = true : this.showImg = false
      }
    },
    created () {
      this.$parent.token ? (this.getVersion(), this.getOrderDetail(this.$route.params.number)) : null
    },
    mounted () {
      document.getElementById('app').offsetHeight < document.documentElement.clientHeight ? document.querySelector('.exchangeDetail').style.minHeight = document.documentElement.clientHeight + 'px' : null
    },
    methods: {
      getVersion () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/users/0/version?token=' + that.$parent.token
        }).then(function (response) {
          that.version = response.data.replace(/\./g, '')
        })
      },
      goInvestList (goodsType) {
        var that = this
        if (parseInt(that.version) < 340) {
          that.showUpdate = true
          return
        }
        if (that.orderDetail.useStatus !== 2) {
          return
        }
        if (goodsType !== 3) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
        }
      },
      getOrderDetail (orderNumber) {
        var that = this
        that.$http('/hongcai/rest/activitys/points/order/' + orderNumber).then(function (res) {
          if (res && res.ret !== -1) {
            that.orderDetail = res.data
            that.orderDetail.imgUrl = that.baseFileUrl + that.orderDetail.imgUrl
          }
        })
      }
    },
    components: {BeanUpdate}
  }
</script>
<style scoped>
  .marign-b-8 {
    margin-bottom: .8rem;
  }
  .exchangeDetail {
    background: #ecebf1;
    width: 100%;
    padding: .3rem 0 .5rem;
  }
  .exchangeDetail .top, .exchangeDetail .bottom {
    background: #fff;
    border-radius: 10px;
    margin: 0 .3rem;
  }
  .exchangeDetail .top .banner {
    text-align: left;
  }
  .exchangeDetail .top .banner .header {
    padding: .25rem .3rem .3rem;
    border-bottom: 1px solid #eee;
    position: relative;
  }
  .exchangeDetail .top .header .title {
    font-weight: bold;
    letter-spacing: 0.4px;
    color: #333333;
    font-size: .26rem;
  }
  .exchangeDetail .top .header .validity {
    color: #666666;
    font-size: .23rem;
  }
  .exchangeDetail .top .header .left, .exchangeDetail .top .header .right {
    background: #ecebf1;
    display: block;
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    bottom: -.15rem;
    position: absolute;
  }
  .exchangeDetail .top .header .left {
    left: -.15rem;
  }
  .exchangeDetail .top .header .right {
    right: -.15rem;
  }
  .exchangeDetail .top .banner img {
    border-radius: 10px 10px 0 0;
  }
  .description .title {
    color: #666;
    font-size: .25rem;
    overflow: hidden;
    margin: .3rem 0 0 .3rem;
  }
  .description .title p {
    float: left;
    height: .28rem;
    line-height: .31rem;
    letter-spacing: 0.4px;
    margin-left: .1rem;
    font-weight: bold;
  }
  .description .title span {
    float: left;
    display: block;
    width: .115rem;
    height: .265rem;
    border-radius: 3.5px;
    background-image: linear-gradient(to top, #fb9d1c, #ffc868);
  }
  .description .content {
    padding: .15rem .3rem;
  }
  .exchangeDetail .bottom {
    margin: .3rem;
    text-align: left;
    padding: .32rem .3rem .001rem;
    color: #666;
    font-size: .25rem;
    font-weight: bold;
  }
  .exchangeDetail .bottom span {
    letter-spacing: 0.4px;
    color: rgba(102, 102, 102, 0.88);
  }
  .exchangeDetail .bottom div {
    margin-bottom: .3rem;
  }
  .exchangeDetail .bottom .title {
    line-height: .3rem;
  }
  .exchangeDetail .bottom .title span {
    float: left;
    display: block;
    width: .115rem;
    height: .265rem;
    border-radius: 3.5px;
    background-image: linear-gradient(to top, #fb9d1c, #ffc868);
  }
  .exchangeDetail .bottom .title p {
    margin-left: .2rem;
  }
  .exchangeDetail .bottom .title a {
    color: rgba(255, 97, 29, 0.88);
  }
  .orderNumber, .orderTime {
    padding-left: .2rem;
  }
  .fixedBtn {
    background-color: #ff611d;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .8rem;
    line-height: .9rem;
    color: #fff;
    font-size: .25rem;
    font-weight: bold;
    letter-spacing: 0.4px;
    max-width: 7.2rem;
  }
  .greyBtn {
    background-color: #999;
  }
</style>
