<template>
  <div class="operatingReport">
    <div class="slide-banner position-re overflow-hid">
      <div id="slideBanner" class="slide position-re">
        <ul>
          <li class="position-re text-center">
            <div class="reportList">
		      <div class="report-content">
		      	<div class="contentNum">04</div>
		      </div>
		    </div>
          </li>
          <li class="position-re text-center">
           	<div class="reportList">
		      <div class="report-content">
		      	<div class="contentNum">04</div>
		      </div>
		    </div>
          </li>
      </ul>
      <div class="dot">
      	<span></span>
      	<span></span>
      </div>
      </div>
    </div>
    
  </div>
</template>
<script>
  import $ from 'zepto'
  import {swiper} from '../../service/swipeSlide'
  export default {
    name: 'operatingReport',
    mounted () {
      swiper.init({
        autoSwipe: false,
        axisX: false,
        continuousScroll: true,
        speed: 2000,
        transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        firstCallback: function (i, sum) {
          $('#slideBanner').find('.dot').children().first().addClass('cur')
        },
        callback: function (i, sum) {
          $('#slideBanner').find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
        }
      })
    }
  }
</script>
<style scoped>
  ::-webkit-scrollbar {display:none}
  .about {
    background-color: #f9f4f3;
  }
  p {
    color: #666666;
    font-size: .26rem;
    padding: .5rem 0 .6rem;
  }
  .wrapper {
    margin: 0.35rem auto;
    height: 5.9rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow-x: hidden;
    -webkit-transform: rotate(0deg);
  }
  .wrapper div {
    overflow-y: hidden;
    overflow-x: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .wrapper img {
    border-radius: 12.5px;
  }
  .bd{
    z-index:0;
  }
  .bd li a img {
    vertical-align:top;
    width:100%;
  }
  .slide-banner {
    margin: .35rem auto 0;
    height: 4rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow: hidden;
    -webkit-transform:rotate(0deg)
  }
  .slide{
    height: 100%;
    position: relative;
    margin: 0 auto;
  }
  .slide:after{
    content: '';
    display: block;
    width: 100%;
    padding-top: 50%;
  }
  .slide ul{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide li{
    overflow: hidden;
    list-style: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  /* 解决js阻塞页面显示首屏 */
  .slide li:first-child{
    z-index: 1;
  }
  .slide li img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  .slide .dot{
    position: absolute;
    right: 0;
    bottom: 10px;
    z-index: 5;
    width: 100%;
    font-size: 0;
  }
  .slide .dot span{
    display: inline-block;
    width: .2rem;
    height: .2rem;
    margin-left: .18rem;
    background-color: #ddd;
    border-radius: 50%;
  }
  .slide .dot .cur{
    background-color: #ff611d;
  }
  .reportList{
  	background: url(../../images/disclosure/report.png) no-repeat;
  	background-size: cover;
  	padding: 1rem 0 .5rem 0;
  }
  .report-content{
  	width: 90%;
  	background: #FFFFFF;
  	height: 10rem;
  	border-radius:10px;
  	margin: 0 auto;
  	padding: .5rem .2rem;
  }
  .contentNum{
  	width: 1rem;
  	height: 1rem;
  	font-family: SourceHanSansCN;
    font-size: .3rem;
    font-weight: bold;
  	border-radius: 50%;
  	line-height: 1rem;
  	color: #FFFFFF;
  	background-image: linear-gradient(45deg, #c08bdf, #f877b1);
  }
</style>
