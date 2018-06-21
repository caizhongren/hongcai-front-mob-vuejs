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
                <li v-for="(data, index) in platformData">
                  <span v-bind:class="data.iconClass"></span>
                  <div>
                    <p>{{data.amount}}</p>
                    <p>{{data.title}}</p>
                  </div>
                </li>
              </ul>
              <div class="tip">*数据统计截至2016年12月31日</div>
            </div>
          </li>
          <!-- 2016年度经营规模 -->
          <li class="reportList position-re text-center">
            <div class="report2-content">
              <ul class="header overflow-hid">
                <li class="contentNum">02</li>
                <li class="report-title">2016年度经营规模</li>
              </ul>
              <p class="table-title">2016年季度成交金额（万元）</p>
              <img src="../../images/disclosure/operating16-02.png" alt="" width="100%"/>
              <ul class="content">
                <li v-for="data in report2Datas">
                  <p class="ft-666 overflow-hid">
                    <span class="fl">{{data.count1}}</span>
                    <span class="fr">{{data.count2}}</span>
                  </p>
                  <p class="ft-999 overflow-hid">
                    <span class="fl">{{data.type1}}</span>
                    <span class="fr">{{data.type2}}</span>
                  </p>
                </li>
              </ul>
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
            <img src="../../images//disclosure//operating16-03_1.png" alt="" width="95%">
            <div class="proportion overflow-hid">
              <ul class="fl text-right">
                <li>人数比例</li>
                <li class="ft-666">
                  女 <span class="ft-red0">42.74%</span>
                </li>
                <li class="ft-666">
                  男 <span class="ft-red0">57.26%</span>
                </li>
              </ul>
              <ul class="fr">
                <li>人均出借金额</li>
                <li class="ft-red0">58,300.74 元</li>
                <li class="ft-red0">27,103.68 元</li>
              </ul>
            </div>
            </div>
          </li>
          <!-- 出借人数据 -->
          <li class="reportList position-re text-center">
            <div class="report3_1-content">
              <ul class="header overflow-hid">
                <li class="contentNum">03</li>
                <li class="report-title">出借人数据</li>
              </ul>
              <div class="report-title report3_1_title lightY">年龄分布</div>
              <div class="ageScatter clearfix">
                <ul>
                  <li>
                    <span class="fl">年龄段</span>
                    <span class="fr">人数占比</span>
                  </li>
                  <li v-for="item in ageScatter">
                    <span class="fl">{{item.msg1}}</span>
                    <span class="fr">{{item.msg2}}</span>
                  </li>
                </ul>
              </div>
              <img src="../../images/disclosure/report16-3.png" class="margin-2" width="95%">
              <div class="bottomTip">出借金额占比</div>
            </div>
          </li>
          <!-- 出借人数据 -->
          <li class="reportList position-re text-center">
            <div class="report3_3-content">
              <div class="contentNum">03</div>
              <div class="report-title">出借人数据</div>
              <div class="report-title report3_1_title">地域分布</div>
              <img src="../../images/disclosure/operating16-03_3.png" alt="" width="100%">
              <div class="geographical">
                <ul v-for="item in geographicaData">
                  <li>{{item.province}}</li>
                  <li>{{item.percent}}</li>
                </ul>
              </div>
              <p class="table-title">人数占比</p>
            </div>
          </li>
          <!-- 借款人数据 -->
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="contentNum">04</div>
              <div class="report-title">借款数据</div>
              <div class="report3_1_title report-title">借款期限分布</div>
              <ul class="termOfLoan">
                <li v-for="item in termOfLoan">
                  <p class="padding-r-1">{{item.time}}</p>
                  <div class="percent">
                    <div v-bind:style="{width: item.percent, height: '100%', float: 'left'}"></div>
                    <p class="text-left position-ab" v-bind:style="{left: (parseInt(item.percent) + 2.5) + '%'}">{{item.percent}}</p>
                  </div>
                  <p>{{item.amount}}</p>
                </li>
              </ul>
              <div class="clear"></div>
              <div class="report3_1_title report-title margin-t-1">借款金额分布</div>
              <ul class="termOfLoan">
                <li v-for="item in loanAmount">
                  <p>{{item.money}}</p>
                  <div class="percent">
                    <div v-bind:style="{width: item.percent, height: '100%', float: 'left'}"></div>
                    <p class="text-left position-ab" v-bind:style="{left: (parseInt(item.percent) + 2.5) + '%'}">{{item.percent}}</p>
                  </div>
                  <p>{{item.amount}}</p>
                </li>
              </ul>
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
                    <p>赚取利息最多</p>
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
                    <div class="padding-t05-l2"><span>2016.</span><span>12</span></div>
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
        ],
        loanAmount: [
          {
            money: '0-20万',
            percent: '1.82%',
            amount: '700,000 元'
          },
          {
            money: '20万-40万',
            percent: '66.55%',
            amount: '25,564,500元'
          },
          {
            money: '40万-60万',
            percent: '25.64%',
            amount: '9,850,000元'
          },
          {
            money: '60-80万',
            percent: '0.00%',
            amount: '0元'
          },
          {
            money: '80万-100万',
            percent: '5.99%',
            amount: '2,300,000元'
          }
        ],
        termOfLoan: [
          {
            time: '0- 3月',
            percent: '71.31%',
            amount: '27,394,500元'
          },
          {
            time: '4- 6月',
            percent: '28.69%',
            amount: '11,020,000元'
          },
          {
            time: '7-9月',
            percent: '0.00%',
            amount: '0元'
          },
          {
            time: '10- 12月',
            percent: '0.00%',
            amount: '0元'
          }
        ],
        platformData: [
          {
            iconClass: 'collection1',
            amount: '53,414,500 元',
            title: '累计成交金额'
          },
          {
            iconClass: 'collection2',
            amount: '2,838 笔',
            title: '累计交易笔数'
          },
          {
            iconClass: 'collection3',
            amount: '1,096,903.72 元',
            title: '累计为用户赚取'
          },
          {
            iconClass: 'collection4',
            amount: '175 个',
            title: '累计成交项目数'
          },
          {
            iconClass: 'collection5',
            amount: '50,822.55 元',
            title: '累计人均出借金额'
          },
          {
            iconClass: 'collection6',
            amount: '144,373 人',
            title: '累计注册会员人数'
          },
          {
            iconClass: 'collection7',
            amount: '1,051 人',
            title: '累计出借人数'
          }
        ],
        report2Datas: [
          {
            count1: '2,514笔',
            count2: '572,508.35元',
            type1: '年度交易笔数',
            type2: '年度为用户赚取'
          },
          {
            count1: '139个',
            count2: '40,436.32元',
            type1: '年度成交项目数',
            type2: '年度人均出借金额'
          },
          {
            count1: '950人',
            count2: '71,432人',
            type1: '年度出借人数',
            type2: '年度注册会员人数'
          }
        ],
        geographicaData: [
          {
            province: '山东省',
            percent: '10.00%'
          },
          {
            province: '安徽省',
            percent: '9.37%'
          },
          {
            province: '江苏省',
            percent: '9.05%'
          },
          {
            province: '河南省',
            percent: '7.37%'
          },
          {
            province: '广东省',
            percent: '7.16%'
          }
        ],
        c5itemList: [
          {
            imgUrl: '../../../static/images/report5-01.png',
            content1: '13,682,400 元',
            content2: '年度出借总额最高'
          },
          {
            imgUrl: '../../../static/images/report5-02.png',
            content1: '950,000 元',
            content2: '单笔出借金额最高'
          },
          {
            imgUrl: '../../../static/images/report5-03.png',
            content1: '280 笔',
            content2: '出借笔数最多'
          },
          {
            imgUrl: '../../../static/images/report5-04.png',
            content1: '271,827.87 元',
            content2: '赚取利息最多'
          },
          {
            imgUrl: '../../../static/images/report5-05.png',
            content1: '114 人',
            content2: '邀请好友人数最多'
          },
          {
            imgUrl: '../../../static/images/report5-06.png',
            content1: '15,014.28 元',
            content2: '获得邀请奖励最多'
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
          i === 7 ? $('.arrow').hide() : $('.arrow').show()
          $('#slideBanner').find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
        }
      })
    }
  }
</script>
<style scoped>
  .termOfLoan {
    width: 112%;
    overflow: hidden;
    clear: both;
    margin-left: -6%;
    font-size: .23rem;
  }
  .termOfLoan li {
    overflow: hidden;
    clear: both;
    height: .45rem;
    line-height: .45rem;
    margin-bottom: .12rem;
    width: 100%;
  }
  .termOfLoan li p:nth-child(1) {
    float: left;
    color: #999;
    width: 19%;
    text-align: right;
    letter-spacing: -1px;
  }
  .padding-r-1 {
    padding-right: .15rem;
  }
  .termOfLoan .percent {
    float: left;
    width: 53%;
    height: .35rem;
    line-height: .4rem;
    background: #eee;
    margin-left: 1%;
    position: relative;
  }
  .termOfLoan .percent div {
    background: #f44c38;
  }
  .termOfLoan li p:nth-child(3) {
    float: right;
    width: 27%;
    text-align: right;
    color: #f44c38;
  }
  .termOfLoan .padding-l-1 {
    padding-left: .2rem;
  }
  .report1-content .collection1 {
    background: url('../../images/disclosure/operating16-01-icon-01.png') no-repeat left .18rem;
    background-size: 85%;
  }
  .report1-content .collection2 {
    background: url('../../images/disclosure/operating16-01-icon-02.png') no-repeat left .15rem;
    background-size: 85%;
  }
  .report1-content .collection3 {
    background: url('../../images/disclosure/operating16-01-icon-03.png') no-repeat left .15rem;
    background-size: 88%;
  }
  .report1-content .collection4 {
    background: url('../../images/disclosure/operating16-01-icon-04.png') no-repeat left .18rem;
    background-size: 90%;
  }
  .report1-content .collection5 {
    background: url('../../images/disclosure/operating16-01-icon-05.png') no-repeat left .1rem;
    background-size: 85%;
  }
  .report1-content .collection6 {
    background: url('../../images/disclosure/operating16-01-icon-06.png') no-repeat left .18rem;
    background-size: 90%;
  }
  .report1-content .collection7 {
    background: url('../../images/disclosure/operating16-01-icon-07.png') no-repeat left .18rem;
    background-size: 85%;
  }
  .arrow {
    position: absolute;
    left: 50%;
    bottom: .1rem;
    width: 1rem;
    height: .8rem;
    margin-left: -16px;
    background: url('../../images/disclosure/arrow-2016.png') no-repeat;
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
    top: 25%;
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
  	width: .8rem;
  	height: .8rem;
    font-size: .35rem;
    font-weight: bold;
  	border-radius: 50%;
  	line-height: .8rem;
  	color: #FFFFFF;
    background-color: #eb0507;
    float: left;
  }
  .report-title {
    color: #eb0507;
    font-size: .32rem;
    font-weight: bold;
    height: .85rem;
    line-height: .85rem;
    width: 75%;
    float: left;
    text-align: left;
    padding-left: .25rem;
  }
  .report-title.lightY{
    color: #f44c38;
  }
  .ft-red0 {
    color: #f44c38;
  }
  /* 平台数据总览 */
  .report1-content .content li span {
    width: 15%;
    height: .8rem;
    float: left;
  }
  .report1-content .content {
    padding: 0 .12rem;
  }
  .report1-content .content li {
    border-bottom: 1px dashed #f2c7b0;
    text-align: left;
    height: .85rem;
    padding: .02rem .2rem;
  }
  .report1-content .content li div {
    float: left;
    width: 85%;
    padding-left: 8%;
  }
  .report1-content .content li p {
    overflow: hidden;
    clear: both;
    width: 100%;
  }
  .report1-content .content li:nth-child(1) {
    height: .9rem;
    /* padding-bottom: .12rem; */
  }
  .report1-content .content li p:nth-child(1) {
    font-size: .35rem;
    color: #c92e2d;
  }
  .report1-content .content li p:nth-child(2) {
    font-size: .24rem;
    color: #999999;
    margin-top: -.11rem;
  }
  /* 2017年度经营规模 */
  .report2-content img {
    margin: .12rem auto 0;
  }
  .report2-content .table-title {
    color: #999;
    text-align: left;
    margin: .15rem auto;
    font-size: .254rem;
  }
  .report2-content .content {
    border-top: 1px dashed #f2c7b0;
  }
  .report2-content .content li {
    margin: .25rem auto;
    font-size: .25rem;
  }
  .report2-content .content li p:nth-child(2) {
    margin-top: -.05rem;
    font-size: .23rem;
  }
  .report2-content .content li p:nth-child(1) span {
    font-size: .3rem;
  }
  /* 出借人数据 */
  .report3_1_title {
    margin: -.1rem 0 -.1rem -.15rem;
    font-size: .3rem;
  }
  .report1-content .tip, .report2-content .tip, .report3_1-content .tip, .report3_2-content .tip, .report3_3-content .tip {
    color: #a99899;
    font-size: .2rem;
    clear: both;
    margin-top: .15rem;
  }
  .report3_1-content .proportion {
    border: 1px solid #f44c38;
    margin-top: .3rem;
  }
  .report3_1-content .proportion ul:nth-child(1) {
    width: 45%;
  }
  .report3_1-content .proportion ul:nth-child(2) {
    width: 55%;
  }
  .report3_1-content .proportion ul li {
    padding: 0 .2rem;
    height: .7rem;
    line-height: .75rem;
  }
  .report3_1-content .proportion ul li span {
    margin-left: .6rem;
  }
  .report3_1-content .proportion ul li:nth-child(1) {
    background: #f44c38;
    color: #fff;
  }
  .report3_1-content .proportion ul li:nth-child(2) {
    overflow: hidden;
    border-bottom: 1px solid #f44c38;
  }
  .report3_1-content .margin-2 {
    margin: .2rem auto .1rem;
  }
  .margin-t-1 {
    margin-top: .2rem;
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
    border: 1px solid #f44c38;
    margin: .3rem auto .2rem;
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
    background: #f44c38;
    color: #fff;
  }
  .report3_3-content .table-title {
    color: #666;
    font-size: .25rem;
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
    background-size: 88%;
  }
  .report5-content_2 ul li:nth-child(3) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder3.png) no-repeat center bottom;
    background-size: 70%;
  }
  .report5-content_2 ul li:nth-child(4) .report5ImgItem {
    background:url(../../images/disclosure/mostPowder4.png) no-repeat center bottom;
    background-size: 69%;
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
    padding: .1rem 0 .03rem;
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
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .report-content, .report1-content, .report2-content, .report3_1-content, .report3_2-content, .report3_3-content{
      height: 10rem;
    }
    .report1-content .content li {
      height: .9rem;
      padding: .05rem 0 .1rem;
    }
    .report1-content .content li div {
      margin-top: 2%;
    }
    .report1-content .content {
      margin-bottom: .2rem;
    }
    .report2-content .content {
      margin-top: .25rem;
      padding-top: .2rem;
    }
    .report2-content img {
      margin: .2rem auto 0;
    }
    .report3_1-content img {
      margin: .3rem auto .2rem;
    }
    .report3_1-content .margin-2 {
      margin: .4rem auto;
    }
    .report3_1_title {
      margin: .12rem auto;
    }
    .report3_3-content .geographical {
      margin-top: .7rem;
    }
    .margin-t-1 {
      margin-top: .5rem;
    }
    .report5-content_2 li:nth-child(1) {
      margin-top: .6rem;
    }
    .report6_16 ul {
      margin-top: .35rem;
    }
    .frame {
      margin-top: .65rem;
      height: 4.6rem;
    }
    .frame.fl span:nth-child(1) {
      top: 2.2rem;
    }
    .frame.fl span:nth-child(3) {
      top: 4.4rem;
    }
    .report6_16 li {
      margin-bottom: .2rem;
    }
  }
</style>
