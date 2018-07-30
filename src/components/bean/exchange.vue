<template>
  <div class="bean-exchange">
  	<div class="exchange-tip border-grey" v-if="status == 1">
  	  <img src="../../images/beans/exchange-success.png" width="30%" alt="">
  	  <span>恭喜，兑换成功了！</span>
  	</div>
  	<div class="exchange-tip border-grey" v-if="status == 0">
  	  <img src="../../images/beans/exchange-fail.png" width="30%" alt="">
  	  <span>兑换失败了。。</span>
  	</div>
  	<div class="prize-brief">
      <img :src="orderDetails.iconImgUrl" alt="">
      <div class="goods-title" v-if="orderDetails.gradeName">
        <p class="goods-name">{{orderDetails.goodsName}}</p>
        <p class="grade-name">{{orderDetails.gradeName}}</p>
      </div>
      <div class="goods-title" v-if="!orderDetails.gradeName">
        <p class="goods-name-center">{{orderDetails.goodsName}}</p>
      </div>
  	</div>
  	<div class="magn-top" v-if="status == 1"></div>
  	<div class="identifier" v-if="status == 1">
  	  <p><span class="vertical-line"></span>支付金额：<span class="orange-font">{{orderDetails.beans}}宏豆</span></p>
  	  <p>订单编号：<span class="grey-font">{{orderDetails.orderNumber}}</span></p>
  	  <p>下单时间：<span class="grey-font">{{orderDetails.orderTime | dateTime}}</span></p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="prize-detail">
  	  <p class="title"><span class="vertical-line"></span>商品详情</p>
  	  <div class="content" v-html="orderDetails.goodsDesc"></div>
  	</div>
  	<div class="gotoUse" @click="toHCNative(orderDetails.goodsType)" v-if="orderDetails.useStatus == 2 && status == 1">马上使用</div>
    <div class="gotoUse grey-btn" v-if="orderDetails.useStatus == 1 && status == 1">已使用</div>
    <a href="tel:400-990-7626" v-if="status == 0"><div class="gotoUse">联系客服</div></a>
    <Bean-Update :showUpdate="showUpdate" v-show="showUpdate"></Bean-Update>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  import BeanUpdate from './alertWrap.vue'
  export default {
    name: 'BeanExchange',
    data () {
      return {
        orderDetails: {
          iconImgUrl: '',
          goodsName: '',
          orderNumber: '',
          gradeName: '',
          beans: '',
          orderTime: '',
          goodsDesc: '',
          goodsType: '',
          useStatus: ''
        },
        orderNumber: this.$route.query.orderNumber,
        status: this.$route.params.status,
        goodsNumber: this.$route.query.goodsNumber,
        version: '',
        showUpdate: false
      }
    },
    props: ['token', 'baseFileUrl', 'showErrMsg'],
    created: function () {
      this.status === '0' ? (document.title = '兑换失败') : document.title = '兑换成功'
      this.$parent.token ? (this.getVersion(), this.getExchangeStatus()) : null
      document.body.scrollTop = 0
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
      toHCNative (type) {
        var that = this
        if (parseInt(that.version) < 340) {
          that.showUpdate = true
          return
        } else {
          if (type === 3) { // 提现券
            bridgeUtil.webConnectNative('HCNative_GoWithdraw', undefined, {}, function (res) {}, null)
          } else if (type === 1 || type === 2) { // 1.加息券 2.现金券
            bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
          }
        }
      },
      getExchangeStatus () {
        var that = this
        if (that.goodsNumber) {
          that.$http.get('/hongcai/rest/activitys/points/goods/' + that.goodsNumber).then(function (response) {
            that.orderDetails = response.data
            that.orderDetails.iconImgUrl = that.baseFileUrl + that.orderDetails.iconImgUrl
          })
        } else {
          that.$http.get('/hongcai/rest/activitys/points/order/status?orderNumber=' + that.orderNumber).then(function (res) {
            that.orderDetails = res.data
            that.orderDetails.iconImgUrl = that.baseFileUrl + that.orderDetails.iconImgUrl
          }).catch(function (res) {
            console.log(res.toString())
          })
        }
      }
    },
    components: {BeanUpdate}
  }
</script>
<style scoped>
  p{
  	text-align: left;
  }
  .bean-exchange{
  	height: 100%;
    margin: 0 auto;
  }
  .exchange-tip{
  	height: 2.2rem;
  	padding: .4rem 0rem 0rem .8rem;
  }
  .exchange-tip span{
  	float: left;
  	font-size: .3rem;
  	color: #666666;
  	margin-top: .6rem;
    margin-left: .6rem;
  }
  .exchange-tip img{
  	float: left;
  }
  .magn-top{
  	background: #efeef4;
    height: .28rem;
  }
  .prize-brief{
  	height: 1.5rem;
  	padding: 0 0 0 .4rem;
  }
  .prize-brief p.goods-name{
  	color: #333333;
  	font-size: .25rem;
  	text-align: left;
  	padding-top: .25rem;
  	font-weight: bold;
  }
  .prize-brief p.grade-name{
  	color: #666666;
  	font-size: .23rem;
  	text-align: left;
    padding-top: .2rem;
  }
  .prize-brief p.goods-name-center{
    color: #333333;
    font-size: .25rem;
    text-align: left;
    padding-top: .2rem;
    font-weight: bold;
    line-height: 1rem;
  }
  .goods-title{
    float: left; 
  }
  .prize-brief img{
  	float: left;
    margin-top: .2rem;
    margin-right: .3rem;
    width: 1rem;
    height: 1rem;
  }
  .identifier{
  	height: 2rem;
  	padding: .2rem .6rem;
  }
  .identifier p{
  	line-height: .5rem;
  	color: #666666;
  	position: relative;
    font-weight: bold;
  }
  .vertical-line{
  	width: .12rem;
  	height: .265rem;
  	border-radius: 3px;
  	background-image: linear-gradient(to top, #fb9d1c, #ffc868);
  	position: absolute;
  	left: -.2rem;
  	top: .08rem;	
  }
  .orange-font{
  	color: rgba(255, 97, 29, 0.88);
  }
  .grey-font{
  	color: rgba(102, 102, 102, 0.88);
  }
  .prize-detail{
  	padding: .2rem .6rem 1rem .6rem;
    min-height: 6.2rem;
  }
  .prize-detail .content{
    padding: .15rem 0rem;
    text-align: left;
  }
  .prize-detail .title{
  	position: relative;
  	color: #666666;
  	line-height: .5rem;
    font-weight: bold;
  }
  .gotoUse{
	  background: #ff611d;
    height: .8rem;
    line-height: .8rem;
    font-size: .26rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-weight: bold;
    max-width: 7.2rem;
  }
  .border-grey{
  	border-bottom: 1px solid #f3f3f3;
  }
  .grey-btn{
    background-color: #999;
  }
</style>
