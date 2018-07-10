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
      <img :src="'data:image/png;base64,' + orderDetails.imgUrl" alt="" width="10%">
  	  <p>{{orderDetails.goodsName}}</p>
  	  <p>{{orderDetails.gradeName}}</p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="identifier">
  	  <p><span class="vertical-line"></span>支付金额：<span class="orange-font">{{orderDetails.beans}}宏豆</span></p>
  	  <p>订单编号：<span class="grey-font">{{orderDetails.orderNumber}}</span></p>
  	  <p>下单时间：<span class="grey-font">{{orderDetails.orderTime}}</span></p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="prize-detail">
  	  <p class="title"><span class="vertical-line"></span>商品详情</p>
  	  <div data-v-5d6963f4="" class="content" v-html="orderDetails.goodsDesc"></div>
  	</div>
  	<div class="gotoUse" @click="toHCNative(orderDetails.goodsType)" v-if="orderDetails.useStatus == 2 && orderDetails.orderStatus == 1">马上使用</div>
    <a href="tel:400-990-7626" v-if="orderDetails.orderStatus == 2"><div class="gotoUse">联系客服</div></a>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default{
    name: 'BeanExchange',
    data () {
      return {
        orderDetails: ''
      }
    },
    props: ['token'],
    created: function () {
      this.$parent.token ? this.getExchangeStatus() : null
      this.status = this.$route.params.status
      this.status === '0' ? document.title = '兑换失败' : document.title = '兑换成功'
    },
    methods: {
      toHCNative (type) {
        if (type === 3) {
          console.log('tixian')
          bridgeUtil.webConnectNative('HCNative_GoWithdraw', undefined, {}, function (res) {}, null)
        } else if (type === 1 || type === 2) {
          console.log('touzi')
          bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
        }
      },
      getExchangeStatus () {
        var that = this
        that.$http.post('/hongcai/rest/activitys/points/order/status', {
          orderNumber: this.orderNumber
        }).then(function (res) {
          that.orderDetails = res.data
        })
        that.orderDetails = {
          imgUrl: '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',
          goodsName: '免费体现券',
          gradeName: '档位',
          orderTime: '2018-05-29 15:27:27',
          orderNumber: '86868989688',
          beans: '88',
          goodsDesc: '<p class="p1">亲爱的宏财网用户：</p><p class="p1"><span class="Apple-converted-space">&nbsp;&nbsp; &nbsp; &nbsp; </span>现接到存管银行通知，为进一步提升用户体验，海口联合农商银行资金存管系统将于<strong><span style="color: rgb(255, 0, 0);">2018年5月11日22:00～5月12日8:00期间</span></strong>进行支付系统优化升级。<strong>届时您在电脑端、App端及微信端的提现操作将会受到影响，升级完成后立即恢复正常</strong>，请您提前做好资金安排。 因系统升级给您造成不便，敬请谅解。</p><p class="p2"><br></p><p class="p1" style="text-align: right;">宏财网</p><p class="p1" style="text-align: right;">2018年5月7日</p>',
          goodsType: 3, // 加息券：1，现金券：2，提现券：3
          useStatus: 2, // 使用状态：已使用：1，未使用：2
          orderStatus: 1 // 1：成功，2: 失败
        }
      }
    }
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
  	background: #f3f3f3;
    height: .28rem;
  }
  .prize-brief{
  	height: 1.5rem;
  	padding: .2rem 0 0 .4rem;
  }
  .prize-brief p:nth-child(2){
  	padding-left: 1.4rem;
  	color: #333333;
  	font-size: .25rem;
  	text-align: left;
  	padding-top: .2rem;
  	font-weight: bold;
  }
  .prize-brief p:last-child{
  	padding-left: 1.4rem;
  	color: #666666;
  	font-size: .23rem;
  	text-align: left;
  }
  .prize-brief img{
  	float: left;
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
  	width: .1rem;
  	height: .3rem;
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
</style>
