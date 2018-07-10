<template>
  <div class="exchange-detail">
    <img :src="goodsDetail.imgUrl" alt="" class="prize-banner">
  	<div class="prize-brief">
  	  <p>{{goodsDetail.goodsName}}</p>
  	  <p><span class="presentPrice">{{goodsDetail.beans}}</span><i></i><span class="originalPrice">{{goodsDetail.marketBeans}}</span><i></i></p>
  	</div>
  	<div class="magn-top"></div>
  	<div class="prize-detail">
  	  <p class="title"><span class="vertical-line"></span>商品详情</p>
  	  <div class="content" v-html="goodsDetail.goodsDesc"></div>
  	</div>
    <div></div>
    <button class="selectGear dissatisfaction font-w" :class="" v-if="goodsDetail.goodsStock == 0">已兑完</button>
    <div class="selectGear" :class="" v-if="goodsDetail.goodsStock != 0 && gearAmount == 1">
      <p class="gear-one"><span class="presentPrice">{{goodsDetail.beans}}</span><i></i></p>
      <button class="gear-one-btn bg-orange" v-if="bean >= goodsDetail.beans" @click="toConfirm()">确认兑换</button>
      <button class="gear-one-btn dissatisfaction" v-if="bean < goodsDetail.beans">宏豆不足</button>
    </div>
  	<button class="selectGear font-w bg-orange" :class="" v-if="goodsDetail.goodsStock != 0 && gearAmount > 1" @click="modalappear()">选择档位</button>
    <div class="choose-modal" v-if="modalShow" @click="modalisappear()"></div>
    <transition name="animate">
      <div class="gear-container" v-if="animateStaus">
        <p class="prize-name"><i @click="modalisappear()"></i>{{goodsDetail.goodsName}}</p>
        <p class="gear-tip">选择档位:</p>
        <ul class="gear-list">
          <li class="gear-project" @click="selectedTab = index" v-for="(item,index) in goodsDetail.gearList" :class="{'gear-selected': selectedTab == index}">{{item}}</li>
        </ul>
        <div class="selectGear fixed-to-absolute" :class="">
          <p class="gear-one"><span class="presentPrice">{{goodsDetail.beans}}</span><i></i></p>
          <button class="gear-one-btn bg-orange" v-if="bean >= goodsDetail.beans" @click="toConfirm()">确认兑换</button>
          <button class="gear-one-btn dissatisfaction" v-if="bean < goodsDetail.beans">宏豆不足</button>
        </div>
      </div>
    </transition>
    <div class="mask-common mask1" v-if="confirmExchange">
      <div class="alert-wrap">
        <div class="text">是否确认消耗<span class="orange-ft">{{goodsDetail.beans}}</span>宏豆兑换该商品？</div>
        <div class="i-know">
        <div class="" @click="afterConfirm()">取消</div>
        <div class="" @click="exchangeReward(goodsNumber,selectedTab)">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil, ModalHelper} from '../../service/Utils'
  export default {
    name: 'exchangeDetail',
    data () {
      return {
        goodsDetail: {
          imgUrl: '/static/img/arbor-header.617861c.png',
          beans: 1000,
          marketBeans: 308,
          goodsDesc: '<p class="p1">亲爱的宏财网用户：</p><p class="p1"><span class="Apple-converted-space">&nbsp;&nbsp; &nbsp; &nbsp; </span>现接到存管银行通知，为进一步提升用户体验，海口联合农商银行资金存管系统将于<strong><span style="color: rgb(255, 0, 0);">2018年5月11日22:00～5月12日8:00期间</span></strong>进行支付系统优化升级。<strong>届时您在电脑端、App端及微信端的提现操作将会受到影响，升级完成后立即恢复正常</strong>，请您提前做好资金安排。 因系统升级给您造成不便，敬请谅解。</p><p class="p2"><br></p><p class="p1" style="text-align: right;">宏财网</p><p class="p1" style="text-align: right;">2018年5月7日</p>',
          gearList: ['10000起投', '20000起投', '30000起投', '40000起投'],
          goodsStock: 1000,
          goodsName: '免费体现券'
        },
        animateStaus: false,
        modalShow: false,
        selectedTab: 0,
        confirmExchange: false,
        goodsStatus: ''
      }
    },
    props: ['showErrMsg', 'token', 'bean'],
    watch: {
      modalShow (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      confirmExchange (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    created: function () {
      this.goodsNumber = this.$route.params.id
      this.gearAmount = this.goodsDetail.gearList.length
      this.getGoodsDetail()
    },
    methods: {
      toInvest () {
        bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (res) {}, null)
      },
      modalappear () {
        this.modalShow = true
        this.animateStaus = true
      },
      modalisappear () {
        this.modalShow = false
        this.animateStaus = false
      },
      selectGear (index) {
        this.selectedTab = index
      },
      getGoodsDetail () {
        var that = this
        document.title = that.goodsDetail.goodsName
        that.$http.get('/hongcai/rest/activitys/points/goods/info/' + this.goodsNumber, function (response) {
          that.goodsDetail = response.data
          document.title = that.goodsDetail.goodsName
        })
      },
      exchangeReward (goodsNumber, gradeNumber) {
        var that = this
        that.afterConfirm()
        that.$http.post('/hongcai/rest/activitys/points/order', {
          goodsNumber: parseInt(goodsNumber),
          gradeNumber: gradeNumber
        }).then(function (res) {
          that.goodsStatus = res.data
          that.$router.push({name: 'BeanExchange', params: {status: that.goodsStatus}})
        })
      },
      toConfirm () {
        this.confirmExchange = true
        this.animateStaus = false
        this.modalShow = false
      },
      afterConfirm () {
        this.confirmExchange = false
      }
    }
  }
</script>
<style scoped>
  button{
    border: none;
  }
  .exchange-detail{
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
  	padding: .2rem .6rem 1rem .6rem;
    min-height: 6.2rem;
  }
  .prize-detail .title{
  	position: relative;
  	color: #666666;
  	line-height: .5rem;
  	font-size: .26rem;
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
  .border-grey{
  	border-bottom: 1px solid #f3f3f3;
  }
  .selectGear{
	  background: #fff;
    height: .8rem;
    line-height: .8rem;
    font-size: .26rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    max-width: 7.2rem;
  }
  .dissatisfaction{
    background: #999999;
  }
  .bg-orange{
    background: #ff611d;
  }
  .orange-ft{
    color: #ff611d;
  }
  .gear-one{
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    width: 60%;
    float: left;
    text-align: left;
    padding-left: .6rem;
  }
  .gear-one span{
    float: left;
  }
  .gear-one i{
    float: left;
    margin-top: .17rem;
  }
  .font-w{
    font-weight: bold;
  }
  .gear-one-btn{
    width: 40%;
    height: 100%;
    font-size: .28rem;
    font-weight: bold;
    color: #fff;
    border: none;
  }
/*选择档位模态框*/
  .choose-modal{
    width: 100%;
    background: rgba(0,0,0,0.4);
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .gear-container{
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    height: 6rem;
    width: 100%;
    z-index: 1000;
  }
  .prize-name{
    text-align: center;
    color: #333333;
    font-weight: bold;
    font-size: .3rem;
    line-height: .8rem;
  }
  .prize-name i{
    width: 0.2rem;
    height: .38rem;
    position: absolute;
    left: 0.4rem;
    top: .18rem;
    background: url(../../images/beans/go-back.png) no-repeat;
    background-size: 100% 100%;
  }
  .gear-tip{
    font-size: .28rem;
    line-height: .6rem;
    color: #666666;
    padding-left: .4rem;
    margin-top: .16rem;
  }
  .gear-list{
    clear: both;
    padding-left: .2rem;
  }
  .gear-project{
    float: left;
    width: 25%;
    margin: 3.8%;
    border-radius: 5px;
    background-color: rgba(221,221,221,0.5);
    border: solid 0.5px #dddddd;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
  }
  .gear-selected{
    background-color: rgba(255,96,0,0.5);
    border: solid 0.5px #ff6000;
    color: #ff611d;
  }
  .animate-enter-active, .animate-leave-active{
    transition: all .3s ease;
  }
  .animate-enter, .animate-leave-to{
    transform: translateY(6rem);
  }
  .fixed-to-absolute{
    position: absolute;
  }
  .mask-common{
    text-align: center;
    background-color: rgba(0,0,0,0.9) !important;
  }
  .i-know{
    display: flex;
  }
  .i-know div{
    flex: 1;
  }
  .i-know div:first-child{
    color: #666666;
    border-right: 1px solid #ddd;
  }
  .i-know div:last-child{
    color: #ff611d;
  }
  .mask1 .alert-wrap .text{
    font-size: .26rem;
    font-weight: bold;
    height: 1.6rem;
  }
  .mask1 .alert-wrap{
    width: 76%;
  }
  .prize-detail .content{
    padding: .15rem 0rem;
  }
</style>
