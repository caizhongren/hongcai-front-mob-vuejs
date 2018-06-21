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
              <img src="../../images/disclosure/operating-report2.png" alt="" width="90%"/>
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
              <div class="report-title">借款人数据</div>
              <div class="report-title report3_1_title">借款人主体性质分布</div>
              <div class="clear"></div>
              <img src="../../images/disclosure/report4-01.png" class="report4-content" width="90%">
              <div class="summary">2017年企业借款总额高达85.73％</div>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content report4_1-content">
              <div class="contentNum">04</div>
              <div class="report-title">借款人数据</div>
              <div class="report3_1_title report-title">借款期限分布</div>
              <img src="../../images/disclosure/report4-02.png" alt="" width="100%">
              <div class="clear"></div>
              <div class="summary text-left">平台项目中，短期借款占比较高主要分布在0-3个月，借款金额占比超过60％</div> <br>
              <div class="report3_1_title report-title">借款金额分布</div>
              <img src="../../images/disclosure/report4-03.png" alt="" width="100%">
              <div class="summary">20万-40万借款项目占比较高，达64.85％</div>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="contentNum">05</div>
              <div class="report-title">年度最宏粉</div>
              <div class="clear"></div>
              <div class="content5Box">
                <div class="c5item">
                  <div class="c5itemL">
                    <img src="../../images/disclosure/report5-01.png" alt="">
                    <p>13,682,400 元</p>
                    <p>年度出借总额最高</p>
                  </div>
                  <div class="c5itemR">
                    <img src="../../images/disclosure/report5-02.png" alt="">
                    <p>950,000 元</p>
                    <p>单笔出借金额最高</p>
                  </div>
                  <div class="clear"></div>
                </div>
                <div class="c5item">
                  <div class="c5itemL">
                    <img src="../../images/disclosure/report5-03.png" alt="">
                    <p>280 笔</p>
                    <p>出借笔数最多</p>
                  </div>
                  <div class="c5itemR">
                    <img src="../../images/disclosure/report5-04.png" alt="">
                    <p>271,827.87 元</p>
                    <p>赚取利息最多</p>
                  </div>
                  <div class="clear"></div>
                </div>
                <div class="c5item">
                  <div class="c5itemL">
                    <img src="../../images/disclosure/report5-05.png" alt="">
                    <p>114 人</p>
                    <p>邀请好友人数最多</p>
                  </div>
                  <div class="c5itemR">
                    <img src="../../images/disclosure/report5-06.png" alt="">
                    <p>15,014.28 元</p>
                    <p>获得邀请奖励最多</p>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </li>
          <li class="reportList position-re text-center">
            <div class="report-content">
              <div class="solid"></div>
              <div class="contentNum">06</div>
              <div class="report-title">宏财大事件</div>
              <div class="clear"></div>
              <div class="eventBox">
                <div class="events left" style="left:-.2rem;;top:1rem;">
                  <div class="node">
                    <span>2017.</span><span class="fontBig">6</span>
                    <div class="triangle"></div>
                    <div class="circle"></div>
                  </div>
                  <p>宏财网成功对接海口联合农商银行资金存管系统，标志着宏财网用户资金安全体系进一步完善</p>
                </div>
                <div class="events right" style="left:48%;top:0;">
                  <div class="node">
                    <span>2017.</span><span class="fontBig">3</span>
                    <div class="triangle"></div>
                    <div class="circle"></div>
                  </div>
                  <p>宏财网荣获3.15互联网诚信企业重点单位</p>
                </div>
                <div class="events left" style="left:-.2rem;top:3.2rem;">
                  <div class="node">
                    <span>2017.</span><span class="fontBig">9</span>
                    <div class="triangle"></div>
                    <div class="circle"></div>
                  </div>
                  <p>宏财网与知名电子合同在线签署服务平台 - 法大大建立合作，成功上线电子签章服务</p>
                  <p>宏财网获得由中国电子商务协会信用管理委员会颁发的理事单位证书，正式成为中国电子商务协会信用管理委员会第一届理事会理事单位</p>
                </div>
                <div class="events right" style="left:48%;top:2rem;">
                  <div class="node">
                    <span>2017.</span><span class="fontBig">7</span>
                    <div class="triangle"></div>
                    <div class="circle"></div>
                  </div>
                  <p>宏财网全程赞助2017年中国国际金融科技博览会</p>
                </div>
                <div class="events right" style="left:48%;top:4.7rem;">
                  <div class="node">
                    <span>2017.</span><span class="fontBig">12</span>
                    <div class="triangle"></div>
                    <div class="circle"></div>
                  </div>
                  <p>宏财网荣获2017年度中国互金行业诚信示范企业称号</p>
                  <p>宏财网获得中关村“金种子企业”认证，荣登第七批中关村“金种子企业”名单</p>
                </div>
              </div>
              <div class="report6Bottom"></div>
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
            type1: '年度出借人数',
            type2: '年度借款人数'
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
    background-color: #ef548c;
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
  	padding: .3rem .35rem;
    position: relative;
  }
  .contentNum{
  	width: .8rem;
  	height: .8rem;
    font-size: .4rem;
    font-weight: bold;
  	border-radius: 50%;
  	line-height: .82rem;
  	color: #FFFFFF;
    background-image: linear-gradient(45deg, #c08bdf, #f877b1);
    float: left;
  }
  .report-title {
    color: #ef548c;
    font-size: .32rem;
    font-weight: bold;
    height: .85rem;
    line-height: .85rem;
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
  /* 2017年度经营规模 */
  .report2-content img {
    margin: .12rem auto 0;
  }
  .report2-content .content {
    border-top: 1px dashed #f2c7b0;
    padding-top: .15rem;
  }
  .report2-content .content li {
    margin-bottom: .1rem;
  }
  .report2-content .content li p:nth-child(2) {
    margin-top: -.05rem;
    font-size: .22rem;
  }
  .report2-content .content li p:nth-child(1) span {
    font-size: .28rem;
  }
  /* 出借人数据 */
  .report3_1_title {
    margin: -.1rem 0 -.1rem -.15rem;
    font-size: .3rem;
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
  .report4-content {
    margin: .2rem auto;
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
  }
  /*05页面*/
  .content5Box{
    padding-top: .3rem;

  }
  .content5Box .c5item>div p:nth-child(2){
    color: #ef548c;
    font-family: PingFang-SC;
    font-size: .3rem;
    font-weight: 500;
  }
  .content5Box .c5item div p:nth-child(3){
    font-family: SourceHanSansCN;
    font-weight: 500;
    text-align: center;
    color: #e2bac2;
  }
  .c5item{
    border-bottom: dashed 1px #f2c7b0;
    padding-bottom: .1rem;
  }
  .c5item img{
    display: block;
    padding: .2rem .4rem;
    height: .8rem !important;
    margin: 0 auto;
  }
  .c5itemL{
    float: left;
    width: 40%;
  }
  .c5itemR{
    float: right;
    margin-right: .2rem;
  }
  /*06页面*/
  .events.left .node{
     margin-left: 1.13rem;
  }
  .events{
    max-width: 48%;
    float: left;
    position: absolute;
  }
  .events.right{
    margin-left: 4.1%;
  }
  .events .node{
    padding: 0rem .1rem;
    font-weight: 500;
    background-image: linear-gradient(to left, #ee5a8d, #ffd2e0);
    width: 1.3rem;
    color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: .1rem;
    position: relative;
  }
  .node .triangle{
    width: .1rem;
    height: .1rem;
    position: absolute;
    background-color: #ef6393;
    right: -.05rem;
    top: .2rem;
    transform: rotate(45deg);
  }
  .node .circle{
    position: absolute;
    width: .18rem;
    height: .18rem;
    border: solid 2px #ef548c;
    right: -.25rem;
    border-radius: 50%;
    top: .16rem;
  }
  .events.right .node .triangle{
    background: #ffd0de;
    width: .1rem;
    height: .1rem;
    position: absolute;
    background-color: #ffd2e0;
    left: -.05rem;
    top: .2rem;
    transform: rotate(45deg);
  }
  .events.right .node{
    margin-left: -.08rem;
  }
  .events.right .node .circle{
    position: absolute;
    width: .18rem;
    height: .18rem;
    border: solid 2px #ef548c;
    left: -.26rem;
    border-radius: 50%;
    top: .16rem;
  }
  .events p{
    text-align: left !important;
    line-height: .3rem;
    margin-bottom: .2rem;
    font-size: .21rem;
    color: #666666;
  }
  .fontBig{
    font-size: .34rem;
  }
  .solid{
    position: absolute;
    left: 51%;
    top: 1.24rem;
    width: 1px;
    height: 6.5rem;
    background-color: #ef548c;
  }
  .eventBox{
    position: relative;
    top:-.25rem;
    left: .2rem;
  }
  .report6Bottom{
    width: 18%;
    height: 6.5px;
    border-radius: 3.3px;
    background-color: #f974b3;
    position: absolute;
    bottom: -.4rem;
    left: 42%;
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .report-content, .report1-content, .report2-content, .report3_1-content, .report3_2-content, .report3_3-content{
      height: 10rem;
    }
    .report1-content .content li {
      height: 1.1rem;
      padding: .25rem 0 .05rem;
    }
    .report1-content .content li div {
      margin-top: 2%;
    }
    .report1-content .content {
      margin-bottom: .4rem auto .3rem;
    }
    .report2-content .content {
      margin: .4rem auto .3rem;
      padding-top: .4rem;
    }
    .report2-content img {
      margin: .2rem auto 0;
    }
    .report3_1-content img {
      margin: .3rem auto .2rem;
    }
    .report3_1-content .proportion {
      margin: .1rem auto .35rem;
    }
    .report3_1-content .margin-2 {
      margin: .4rem auto;
    }
    .report3_1_title {
      margin: .12rem auto;
    }
    .report3_2-content img {
      margin: .4rem auto;
    }
    .report3_3-content .geographical {
      margin: .75rem auto .4rem;
    }
    .margin-t-1 {
      margin-top: .5rem;
    }
    .report4-content {
      margin: .3rem auto .4rem;
    }
    .report4_1-content .summary {
      margin: .3rem auto 0;
    }
    .content5Box {
      padding-top: .3rem;
    }
    .c5item {
      padding: .2rem 0 .25rem;
    }
    .eventBox {
      top: .25rem;
    }
    .solid {
      top: 1.71rem;
      height: 7.5rem;
    }
  }
</style>
