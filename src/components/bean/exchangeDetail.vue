<template>
  <div class="exchange-detail">
  	<img src="../../images/arbor-day/arbor-header.png" alt="" class="prize-banner">
  	<div class="prize-brief">
  	  <p>免费体现券</p>
  	  <p><span class="presentPrice">207</span><i></i><span class="originalPrice">308</span><i></i></p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="prize-detail border-grey">
  	  <p class="title"><span class="vertical-line"></span>商品详情</p>
  	  <p>商提示提示提示提示提示提示提示介绍商品介绍商品介绍商品介绍提示提示</p>
  	</div>
  	<div class="prize-detail">
  	  <p class="title"><span class="vertical-line"></span>温馨提示：</p>
  	  <p>商提示提示提示提示提示提示提示介绍商品介绍商品介绍商品介绍提示提示</p>
  	</div>
  	<div class="selectGear" ng-class="" >选择档位</div>
  </div>
</template>
<script>

</script>
<style scoped>
  .exchange-detail{
  	height: 100%;
  	text-align: left;
  }
  .prize-banner{
  	height: 3.5rem;
  	width: 100%;
  	display: block;
  }
  .prize-brief{
  	height: 1.4rem;
  	padding: .2rem .4rem;
  }
  .prize-brief p:first-child{
	font-size: .28rem;
	font-weight: bold;
	letter-spacing: 0.4px;
	color: #333333;
	margin-bottom: .15rem;
  }
  .prize-brief p span{
  	display: block;
  	float: left;
  }
  .prize-brief p i{
  	display: block;
  	float: left;
  }
  .presentPrice{
  	color: #ff6000;
  	font-size: .35rem;
  }
  .originalPrice{
  	color: #999999;
  	position: relative;
  	font-size: .3rem;
  	margin-top: .04rem;
  }
  .originalPrice:after{
  	content: "";
    width: 1rem;
    height: 1px;
    background: #999999;
    position: absolute;
    left: 0;
    top: 50%;
  }
  .presentPrice+i{
  	width: .35rem;
  	height: .35rem;
  	display: inline-block;
  	background: url(../../images/beans/bean-icon_1.png) no-repeat;
  	background-size: 100% 100%;
  	margin-left: .1rem;
    margin-right: .2rem;
    margin-top: .06rem;
  }
  .originalPrice+i{
  	width: .3rem;
  	height: .3rem;
  	display: inline-block;
  	background: url(../../images/beans/bean_icon_2.png) no-repeat;
  	background-size: 100% 100%;
  	margin-left: .06rem;
    margin-right: .2rem;
    margin-top: .1rem;
  }
  .magn-top{
  	background: #f3f3f3;
    height: .28rem;
  }
  .prize-detail{
  	padding: .2rem .6rem;
  }
  .prize-detail .title{
  	position: relative;
  	color: #666666;
  	line-height: .5rem;
  	font-size: .26rem;
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
  .border-grey{
  	border-bottom: 1px solid #f3f3f3;
  }
  .selectGear{
	background: #ff611d;
    height: .8rem;
    line-height: .8rem;
    font-size: .26rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-weight: bold;
    text-align: center;
  }
</style>
