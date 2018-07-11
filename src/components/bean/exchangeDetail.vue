<template>
  <div class="exchangeDetail">
    <div class="top">
      <div class="banner">
        <img v-bind:src="baseFileUrl + orderDetail.imgUrl" alt="" width="100%">
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
    <div class="fixedBtn" :class="{'greyBtn': orderDetail.useStatus !== 2}" @click="goWithdraw(orderDetail.goodsType)" v-if="orderDetail.goodsType !== 3">{{orderDetail.useStatus === 2 ? '马上使用' : '已使用'}}</div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        orderDetail: {
          imgUrl: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
          goodsName: '免费体现券',
          gradeName: '档位',
          usefulTime: 111111,
          goodsDesc: '<p class="p1">亲爱的宏财网用户：</p><p class="p1"><span class="Apple-converted-space">&nbsp;&nbsp; &nbsp; &nbsp; </span>现接到存管银行通知，为进一步提升用户体验，海口联合农商银行资金存管系统将于<strong><span style="color: rgb(255, 0, 0);">2018年5月11日22:00～5月12日8:00期间</span></strong>进行支付系统优化升级。<strong>届时您在电脑端、App端及微信端的提现操作将会受到影响，升级完成后立即恢复正常</strong>，请您提前做好资金安排。 因系统升级给您造成不便，敬请谅解。</p><p class="p2"><br/></p><p class="p1" style="text-align: right;">宏财网</p><p class="p1" style="text-align: right;">2018年5月7日</p>',
          orderNumber: 11111111,
          orderTime: 111111111,
          beans: 88,
          useStatus: 2, // 使用状态：已使用：1，未使用：2
          goodsType: 1 // 加息券：1，现金券：2，提现券：3
        },
        version: 310
      }
    },
    props: ['token', 'showErrMsg', 'baseFileUrl'],
    created () {
      this.$parent.token ? (this.getVersion(), this.getOrderDetail(this.$route.params.number)) : null
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
      goWithdraw (goodsType) {
        var that = this
        if (goodsType !== 3) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
        } else {
          if (that.version < 330) {
            that.$parent.showErrMsg('为了不影响您的正常使用，建议您更新到最新版本哦～')
            return
          }
          bridgeUtil.webConnectNative('HCNative_GoWithdraw', undefined, {}, function (res) {}, null)
        }
      },
      getOrderDetail (orderNumber) {
        var that = this
        that.$http('/hongcai/rest/activitys/points/order/' + orderNumber).then(function (res) {
          if (res && res.ret !== -1) {
            that.orderDetail = res.data
          }
        })
      }
    }
  }
</script>
<style scoped>
  .exchangeDetail {
    background: #ecebf1;
    width: 100%;
    padding: .3rem 0 .8rem;
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
    height: .34rem;
    line-height: .32rem;
    letter-spacing: 0.4px;
    margin-left: .1rem;
    font-weight: bold;
  }
  .description .title span {
    float: left;
    width: .12rem;
    height: .28rem;
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
    width: .12rem;
    height: .28rem;
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
