<template>
  <div class="operatingReport">
    <div class="slide-banner position-re overflow-hid" v-auto-height>
      <div id="slideBanner" class="slide position-re">
        <ul>
          <!-- 出借人数据 -->
          <li class="reportList position-re text-center">
            <div class="report3_1-content">
              <ul class="header overflow-hid">
                <li class="contentNum">03</li>
                <li class="report-title">出借人数据</li>
              </ul>
              <div class="report-title report3_1_title lightY">年龄分布</div>
              <div class="ageScatter clearfix">
                <ul style="margin-top:-.2rem;">
                  <li>
                    <span class="fl">年龄段</span>
                    <span class="fr">人数占比</span>
                  </li>
                  <li v-for="item in platformData.ageScatter">
                    <span class="fl">{{item.msg1}}</span>
                    <span class="fr">{{item.msg2}}</span>
                  </li>
                </ul>
              </div>
              <img src="../../images/disclosure/report16-3.png" alt="" width="95%">
              <div class="bottomTip">出借金额占比</div>
            </div>
          </li>
          <!-- 年度最宏粉 -->
          <li class="reportList position-re text-center">
            <div class="report3_2-content">
              <ul class="header overflow-hid">
                <li class="contentNum">05</li>
                <li class="report-title">年度最宏粉</li>
              </ul>
              <div class="report5-content_2">
                <ul class="overflow-hid">
                  <li>
                    <div class="report5ImgItem margin-auto">
                    </div>
                    <p>3,730,300 元</p>
                    <p>年度出借总额最高</p>
                  </li>
                  <li class="fl">
                    <div class="report5ImgItem margin-auto"></div>
                    <p>422,000 元</p>
                    <p>单笔出借金额最高</p>
                  </li>
                  <li class="fr">
                    <div class="report5ImgItem margin-auto"></div>
                    <p>91笔</p>
                    <p>出借笔数最多</p>
                  </li>
                  <li class="fl">
                    <div class="report5ImgItem margin-auto"></div>
                    <p>63,500.46 元</p>
                    <p>赚取收益最多</p>
                  </li>
                  <li class="fr">
                    <div class="report5ImgItem margin-auto"></div>
                    <p>169 人</p>
                    <p>邀请好友人数最多</p>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!-- 宏财大事件 -->
          <li class="reportList position-re text-center">
            <div class="report3_2-content">
              <ul class="header overflow-hid">
                <li class="contentNum">06</li>
                <li class="report-title">宏财大事件</li>
              </ul>
              <div class="report6_16">
                <ul class="fr">
                  <li>
                    <div class="padding-t05-l2"><span>2016.</span><span>7</span></div>
                    <div class="padding-t2-l2">
                      <p>宏财网正式成为北京市网贷行业协会（现北京市互联网金融行业协会）观察员</p>
                    </div>
                  </li>
                  <li>
                    <div class="padding-t05-l2"><span>2016.</span><span>10</span></div>
                    <div class="padding-t2-l2">
                      <p>接入北京网贷风险监控及资金存管系统，用户资金由中信银行资金存管专用账户保管</p>
                    </div>
                  </li>
                  <li>
                    <div class="padding-t05-l2"><span>2016.</span><span>7</span></div>
                    <div class="padding-t2-l2">
                      <p style="margin-bottom: .2rem;">宏财网荣获2016年度中国互联网金融行业优秀示范企业</p>
                      <p>宏财网荣获2016年度中国互联网金融行业优秀示范企业放心网站</p>
                    </div>
                  </li>
                </ul>
                <div class="frame fl">
                  <span class="display-bl"></span>
                  <span class="display-bl"></span>
                  <span class="display-bl"></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="dot">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {swiper} from '../../service/swipeSlide'
  export default {
    name: 'operatingReport',
    data () {
      return {
        platformData: {
          ageScatter: [
            {
              msg1: '90后',
              msg2: '24.84%'
            },
            {
              msg1: '80后',
              msg2: '36.63%'
            },
            {
              msg1: '70后',
              msg2: '16.84%'
            },
            {
              msg1: '60后',
              msg2: '11.58%'
            },
            {
              msg1: '60前',
              msg2: '10.11%'
            }
          ]
        }
      }
    },
    mounted () {
      swiper.init({
        autoSwipe: false,
        axisX: false,
        speed: 2000,
        transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        firstCallback: function (i, sum) {
          $('#slideBanner').find('.dot').children().first().addClass('cur')
        },
        callback: function (i, sum) {
          i === 8 ? $('.arrow').hide() : $('.arrow').show()
          $('#slideBanner').find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
        }
      })
    }
  }
</script>
<style scoped>
  .arrow {
    position: absolute;
    left: 50%;
    bottom: .1rem;
    width: 1rem;
    height: .8rem;
    margin-left: -16px;
    background: url('../../images/disclosure/arrow.png') no-repeat;
    background-size: 33px auto;
    -webkit-animation: swipeMoveTop 1.5s 0s ease infinite;
  }
  @keyframes swipeMoveTop {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -10px, 0);
    }
    70% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, 10px, 0);
    }
  }
  ::-webkit-scrollbar {display:none}
  .slide-banner {
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    -webkit-transform:rotate(0deg);
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
  .slide>ul{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide li.reportList{
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
    /* z-index: 1; */
  }
  /*.slide li img{
    width: 100%;
  }*/
  .slide .dot{
    position: absolute;
    right: 0;
    top: 21%;
    z-index: 5;
    width: 5%;
    font-size: 0;
  }
  .slide .dot span{
    display: block;
    width: .18rem;
    height: .18rem;
    background-color: #fff;
    border-radius: 50%;
    margin: .4rem auto;
  }
  .slide .dot .cur{
    background-color: #e80103;
  }
  .reportList{
  	background-color: #ffd4b8;
  	background-size: cover;
  	padding: 1rem 0 .5rem 0;
  }
  .report-content, .report1-content, .report2-content, .report3_1-content, .report3_2-content, .report3_3-content{
  	width: 90%;
  	background: #FFFFFF;
  	height: 8.5rem;
  	border-radius:10px;
  	margin: 0 auto;
  	padding: .4rem .35rem;
    position: relative;
  }
  .contentNum{
  	width: 1rem;
  	height: 1rem;
  	font-family: SourceHanSansCN;
    font-size: .4rem;
    font-weight: bold;
  	border-radius: 50%;
  	line-height: 1rem;
  	color: #FFFFFF;
    background-color: #eb0507;
    float: left;
  }
  .report-title {
    color: #eb0507;
    font-size: .32rem;
    font-weight: bold;
    height: 1rem;
    line-height: 1rem;
    width: 75%;
    float: left;
    text-align: left;
    padding-left: .25rem;
  }
  .report-title.lightY{
    color: #f44c38;
  }
  .ft-pink0 {
    color: #ef548c;
  }
  .ft-pink1 {
    color: #e2bac2;
  }
  /* 平台数据总览 */
  .report1-content .content {
    padding: 0 .12rem;
    margin-bottom: .4rem;
  }
  .report1-content .content li {
    border-bottom: 1px dashed #f2c7b0;
    text-align: left;
    height: .85rem;
    padding: .15rem 0;
  }
  .report1-content .content li p {
    overflow: hidden;
    clear: both;
    width: 100%;
  }
  .report1-content .content li p:nth-child(1) {
    font-size: .32rem;
  }
  .report1-content .content li p:nth-child(2) {
    font-size: .24rem;
  }
  .report1-content .content li:nth-child(1) {
    height: .9rem;
    padding-bottom: .2rem;
  }
  .report1-content .content li:nth-child(1) p:nth-child(1) {
    font-size: .45rem;
    color: #ef548c;
  }
  .report1-content .content li:nth-child(1) p:nth-child(2) {
    font-size: .24rem;
    color: #e2bac2;
    margin-top: -.11rem;
  }
  .report1-content .time {
    text-align: center;
    color: #a99899;
    font-size: .22rem;
    margin-top: .35rem;
  }
  /* 出借人数据 */
  .report3_1_title {
    margin: -.1rem 0 -.1rem -.15rem;
  }
  .report1-content .tip, .report2-content .tip, .report3_1-content .tip, .report3_2-content .tip, .report3_3-content .tip {
    color: #999;
    font-size: .2rem;
    clear: both;
    margin-top: .15rem;
  }
  .report2-content .tip {
    width: 115%;
    margin: .1rem 0 0 -7%;
  }
  .report3_2-content .tip {
    margin-top: .05rem;
  }
  .report3_1-content .proportion ul {
    width: 45%;
    color: #fff;
  }
  .report3_1-content .proportion ul li {
    padding: 0 .2rem;
    height: .6rem;
    line-height: .65rem;
  }
  .report3_1-content .proportion ul li p:nth-child(1) {
    float: left;
  }
  .report3_1-content .proportion ul li p:nth-child(2) {
    float: right;
  }
  .report3_1-content .proportion ul li:nth-child(2) {
    overflow: hidden;
    background: #ef6494;
  }
  .report3_1-content .proportion ul li:nth-child(3) {
    overflow: hidden;
    background: #4f96ff;
  }
  .report3_1-content .proportion ul:nth-child(1) li:nth-child(3) {
    border-bottom-left-radius: .2rem;
  }
  .report3_1-content .proportion ul:nth-child(1) li:nth-child(2) {
    border-top-left-radius: .2rem;
  }
  .report3_1-content .proportion ul:nth-child(2) li:nth-child(3) {
    border-bottom-right-radius: .2rem;
  }
  .report3_1-content .proportion ul:nth-child(2) li:nth-child(2) {
    border-top-right-radius: .2rem;
  }
  .report3_2-content .icon, .report3_2-content .icon1 {
    display: inline-block;
    width: .25rem;
    height: .255rem;
    border-radius: 5px;
    background-image: linear-gradient(to top, #ee5a8d, #ffd2e0);
  }
  .report3_2-content .icon1 {
    background-image: linear-gradient(to top, #4f94ff, #58bcfd);
  }
  .report3_2-content .statistics {
    vertical-align: text-bottom;
    color: #666666;
    font-size: .23rem;
  }
  .report3_2_title {
    overflow: hidden;
    width: 100%;
    margin-bottom: .12rem;
  }
  .report3_3-content .geographical {
    overflow: hidden;
    width: 100%;
    border: 1px solid #fedada;
    border-radius: .2rem;
    margin: .2rem auto;
  }
  .report3_3-content .geographical ul {
    float: left;
    width: 20%;
    color: #1e050c;
  }
  .report3_3-content .geographical ul li {
    height: .65rem;
    line-height: .7rem;
    font-size: .23rem;
  }
  .report3_3-content .geographical ul li:nth-child(2) {
    background: #fedada;
  }
  .fontBold{
    font-size: .36rem;
    color: #ef548c;
    font-family: SourceHanSansCN-Bold;
    font-weight: bold;
    line-height: 1rem;
  }
  .fontBold.titleF{
    float: left;
    margin-left: .36rem;
  }
  .clear{
    clear: both;
  }
  .fontBold.titleO{
    text-align: left !important;
  }
  .summary{
    color: #999999;
    font-size: .2rem;
    font-family: PingFang-SC;
    margin-top: .1rem;
  }
  .ageScatter{
    width: 85%;
    color: #666666;
    line-height: .4rem;
    margin: 0 auto;
    margin-bottom: .2rem;
  }
  .ageScatter ul li{
    padding: 0 .3rem;
    overflow: hidden;
    border:1px solid #f44c38;
    border-top: none;
  }
  .ageScatter ul li:nth-child(1){
    background: #f44c38;
    color: #FFFFFF;
    font-weight: bold;
    line-height: .6rem;
  }
  .bottomTip{
    color: #666666;
  }
  /*年度最宏粉*/
  .report5-content_2 li{
    border-bottom: 1px dashed #f2c7b0;
    padding: .3rem 0;
    width: 50%;
  }
  .report5-content_2 img{
    max-height: 1rem;
  }
  .report5-content_2 li p:nth-child(2){
    color: #f44c38;
    font-weight: 500;
    line-height: .6rem;
    font-size: .3rem;
  }
  .report5-content_2 li p:nth-child(3){
    color: #999999;
    line-height: .3rem;
    font-size: .24rem;
  }
  .report5-content_2 li:nth-child(1){
    width: 100%;
  }
  .report5ImgItem {
    width: .8rem;
    height: .8rem;
  }
  .report5-content_2 ul li:nth-child(1) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder1.png) no-repeat center bottom;
    background-size: 100%;
  }
  .report5-content_2 ul li:nth-child(2) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder2.png) no-repeat center bottom;
    background-size: 80%;
  }
  .report5-content_2 ul li:nth-child(3) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder3.png) no-repeat center bottom;
    background-size: 80%;
  }
  .report5-content_2 ul li:nth-child(4) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder4.png) no-repeat center bottom;
    background-size: 80%;
  }
  .report5-content_2 ul li:nth-child(5) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder5.png) no-repeat center bottom;
    background-size: 80%;
  }
  /*宏财大事件*/
  .padding-t05-l2{
    padding: .05rem .2rem;
    background: #f44c38;
    width: 1.6rem;
    text-align: center;
    color: #FFFFFF;
    font-weight: 500;
    font-size: .24rem;
  }
  .padding-t05-l2 span:nth-child(2){
    font-size: .34rem;
  }
  .padding-t2-l2{
    padding: .2rem .2rem;
    background: #fcddd9;
  }
  .padding-t2-l2 p{
    text-align: left;
  }
  .report6_16 li{
    padding: .1rem 0;
  }
  .report6_16 ul{
    width: 100%;
    margin-right: -.2rem;
  }
  .frame{
    width: 1px;
    background-color: #f44c38;
    height: 4rem;
    margin: .36rem .1rem;
    margin-left: -.1rem;
    position: relative;
  }
  .frame.fl span{
    width: .2rem;
    height: .2rem;
    background: #f44c38;
    transform: rotate(45deg);
    position: absolute;
  }
  .frame.fl span:nth-child(1){
    left: -.09rem;
    top: 2rem;
  }
  .frame.fl span:nth-child(2){
    left: -.09rem;
    top: 0rem;
  }
  .frame.fl span:nth-child(3){
    left: -.09rem;
    top: 4rem;
  }
</style>
