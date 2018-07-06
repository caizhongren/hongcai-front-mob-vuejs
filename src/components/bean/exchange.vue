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
  	  <img src="../../images/beans/prize-icon.png" alt="" width="10%">
  	  <p>免费体现券</p>
  	  <p>档位</p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="identifier">
  	  <p><span class="vertical-line"></span>支付金额：<span class="orange-font">88宏豆</span></p>
  	  <p>订单编号：<span class="grey-font">86868989688</span></p>
  	  <p>下单时间：<span class="grey-font">2018-05-29 15:27:27</span></p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="prize-detail">
  	  <p class="title"><span class="vertical-line"></span>商品详情</p>
  	  <p>商提示提示提示提示提示提示提示介绍商品介绍商品介绍商品介绍提示提示</p>
  	</div>
  	<div class="gotoUse" @click="toHCNative(prizeType)" v-if="status == 1">马上使用</div>
    <a href="tel:400-990-7626" v-if="status == 0"><div class="gotoUse">联系客服</div></a>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  // import $ from 'zepto'
  export default{
    name: 'exchange',
    data () {
      return {
        status: '',
        prizeType: 2
      }
    },
    props: ['token'],
    created: function () {
      this.status = this.$route.params.status
      console.log(typeof (this.status))
      this.status === '0' ? document.title = '兑换失败' : document.title = '兑换成功'
    },
    methods: {
      toHCNative () {
        if (this.prizeType === 1) {
          bridgeUtil.webConnectNative('HCNative_GoWithdraw', undefined, {}, function (res) {}, null)
        } else if (this.prizeType === 2) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
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
  	padding: .2rem .6rem;
  }
  .prize-detail .title{
  	position: relative;
  	color: #666666;
  	line-height: .5rem;
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
  }
  .border-grey{
  	border-bottom: 1px solid #f3f3f3;
  }
</style>
