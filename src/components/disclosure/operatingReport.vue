<template>
  <div class="operatingReport">
    <div class="slide-banner position-re overflow-hid" v-auto-height>
      <div id="slideBanner" class="slide position-re">
        <ul>
          <!-- 平台数据总览 -->
          <li class="reportList position-re text-center">
            <div class="report1-content">
              <ul class="header overflow-hid">
                <li class="contentNum">01</li>
                <li class="report-title">平台数据总览</li>
              </ul>
              <ul class="content">
                <li>
                  <p>{{platformData.totalAmount.amount}}</p>
                  <p>{{platformData.totalAmount.title}}</p>
                </li>
                <li v-for="data in platformData.listDatas">
                  <p class="ft-pink0">
                    <span class="fl">{{data.count1}}</span>
                    <span class="fr">{{data.count2}}</span>
                  </p>
                  <p class="ft-pink1">
                    <span class="fl">{{data.type1}}</span>
                    <span class="fr">{{data.type2}}</span>
                  </p>
                </li>
              </ul>
              <div class="tip">*数据统计截至2017年12月31日</div>
            </div>
          </li>
          <!-- 2017年度经营规模 -->
          <li class="reportList position-re text-center">
            <div class="report2-content">
              <ul class="header overflow-hid">
                <li class="contentNum">02</li>
                <li class="report-title">2017年度经营规模</li>
              </ul>
              <img src="../../images/disclosure/operating-report2.png" alt="" width="100%"/>
              <ul class="content">
                <li v-for="data in report2Datas">
                  <p class="ft-pink0 overflow-hid">
                    <span class="fl">{{data.count1}}</span>
                    <span class="fr">{{data.count2}}</span>
                  </p>
                  <p class="ft-pink1 overflow-hid">
                    <span class="fl">{{data.type1}}</span>
                    <span class="fr">{{data.type2}}</span>
                  </p>
                </li>
              </ul>
              <div class="tip">2017年成交额同比增长357.27%，成交笔数同比增长253.54%</div>
            </div>
          </li>
          <!-- 出借人数据 -->
          <li class="reportList position-re text-center">
            <div class="report3_1-content">
              <ul class="header overflow-hid">
                <li class="contentNum">03</li>
                <li class="report-title">出借人数据</li>
              </ul>
              <div class="report-title report3_1_title">性别分布</div>
              <img src="../../images//disclosure//operating-report3_1.png" alt="" width="95%">
              <div class="proportion overflow-hid">
                <ul class="fl">
                  <li class="ft-pink1">人数比例</li>
                  <li>
                    <p>女</p>
                    <p>46.56%</p>
                  </li>
                  <li>
                    <p>男</p>
                    <p>53.44%</p>
                  </li>
                </ul>
                <ul class="fr">
                  <li class="ft-pink1">人均出借金额</li>
                  <li>
                    <p>女</p>
                    <p>86,197.22元</p>
                  </li>
                  <li>
                    <p>男</p>
                    <p>28,589.43元</p>
                  </li>
                </ul>
              </div>
              <p class="tip">男性的人数占优，女性的人均出借金额更高一筹</p>
            </div>
          </li>
          <!-- 出借人数据 -->
          <li class="reportList position-re text-center">
            <div class="report3_2-content">
              <ul class="header overflow-hid">
                <li class="contentNum">03</li>
                <li class="report-title">出借人数据</li>
              </ul>
              <div class="report-title report3_1_title">年龄分布</div>
              <div class="report3_2_title">
                <p class="ft-pink1 fl">2017年季度成交金额（万元）</p>
                <div class="fr">
                  <p class="text-left">
                    <span class="icon"></span>
                    <span class="statistics">人数占比</span>
                  </p>
                  <p class="text-left">
                    <span class="icon icon1"></span>
                    <span class="statistics">出借金额占比</span>
                  </p>
                </div>
              </div>
              <img src="../../images/disclosure/operating-report3_2.png" alt="" width="100%">
              <p class="tip text-justify">平台出借人数的主力军为80后和90后，占比高达62.18％;出借金额最多的为80后和70后，占比高达70.22％</p>
            </div>
          </li>
          <!-- 出借人数据 -->
          <li class="reportList position-re text-center">
            <div class="report3_3-content">
              <ul class="header overflow-hid">
                <li class="contentNum">03</li>
                <li class="report-title">出借人数据</li>
              </ul>
              <div class="report-title report3_1_title">地域分布</div>
              <img src="../../images/disclosure/operating-report3_3.png" alt="" width="100%">
              <div class="geographical">
                <ul v-for="item in geographicaData">
                  <li>{{item.province}}</li>
                  <li>{{item.percent}}</li>
                </ul>
              </div>
              <p class="tip">2017年安徽、江苏、广东地区的出借人数位列前三</p>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="contentNum">04</div>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="contentNum">05</div>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="contentNum">04</div>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="contentNum">05</div>
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
          totalAmount: {
            amount: '229,072,110元',
            title: '累计成交金额'
          },
          listDatas: [
            {
              count1: '11,726笔',
              count2: '5,227,725.03元',
              type1: '累计交易笔数',
              type2: '累计为用户赚取'
            },
            {
              count1: '815个',
              count2: '55,966.80元',
              type1: '累计成交项目数',
              type2: '累计人均出借金额'
            },
            {
              count1: '650,773.01元',
              count2: '165,351人',
              type1: '累计人均借款金额',
              type2: '累计注册会员人数'
            },
            {
              count1: '352人',
              count2: '4,093人',
              type1: '累计借款人数',
              type2: '累计出借人数'
            }
          ]
        },
        report2Datas: [
          {
            count1: '8,888笔',
            count2: '4,130,821.31元',
            type1: '年度交易笔数',
            type2: '年度为用户赚取'
          },
          {
            count1: '640个',
            count2: '55,412.49元',
            type1: '年度成交项目数',
            type2: '年度人均出借金额'
          },
          {
            count1: '530,687.61元',
            count2: '20,978人',
            type1: '年度人均借款金额',
            type2: '年度注册会员人数'
          },
          {
            count1: '3,170人',
            count2: '331人',
            type1: '年度借款人数',
            type2: '年度出借人数'
          }
        ],
        geographicaData: [
          {
            province: '安徽省',
            percent: '8.96%'
          },
          {
            province: '江苏省',
            percent: '8.83%'
          },
          {
            province: '广东省',
            percent: '7.60%'
          },
          {
            province: '山东省',
            percent: '7.03%'
          },
          {
            province: '湖北省',
            percent: '6.25%'
          }
        ]
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
  .slide .dot{
    position: absolute;
    right: -1%;
    top: 21%;
    z-index: 5;
    width: 7%;
    font-size: 0;
  }
  .slide .dot span{
    display: block;
    width: .2rem;
    height: .21rem;
    background-color: #fff;
    border-radius: 50%;
    margin: .4rem auto;
  }
  .slide .dot .cur{
    background-color: #ef6494;
  }
  .reportList{
  	background: url(../../images/disclosure/report.png) no-repeat;
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
    background-image: linear-gradient(45deg, #c08bdf, #f877b1);
    float: left;
  }
  .report-title {
    color: #ef548c;
    font-size: .32rem;
    font-weight: bold;
    height: 1rem;
    line-height: 1rem;
    width: 75%;
    float: left;
    text-align: left;
    padding-left: .25rem;
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
    font-size: .25rem;
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
    font-size: .25rem;
    color: #e2bac2;
    margin-top: -.11rem;
  }
  .report1-content .time {
    text-align: center;
    color: #a99899;
    font-size: .22rem;
    margin-top: .35rem;
  }
  /* 2017年度经营规模 */
  .report2-content img {
    margin: .12rem auto 0;
  }
  .report2-content .tip {
    font-size: .2rem;
    color: #999;
    width: 115%;
    margin: .1rem 0 0 -7%;
  }
  .report2-content .content {
    border-top: 1px dashed #f2c7b0;
    padding-top: .12rem;
    font-size: .22rem;
  }
  .report2-content .content li {
    margin-bottom: .1rem;
  }
  .report2-content .content li p:nth-child(2) {
    margin-top: -.05rem;
  }
  /* 出借人数据 */
  .report3_1_title {
    margin: -.1rem 0 -.1rem -.15rem;
  }
  .report1-content .tip, .report3_1-content .tip, .report3_2-content .tip, .report3_3-content .tip {
    color: #999;
    font-size: .2rem;
    clear: both;
    margin-top: .15rem;
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
</style>
