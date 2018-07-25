<template>
  <div class="about">
    <!-- 备案登记信息 -->
    <div class="bsuiness-info">
      <img src="../../images/disclosure/badjxx-01.png" alt="备案登记信息" class="bsuiness-title" width="42%">
      <div class="info">
        <ul v-for="(info, index) in businessInfo" v-bind:class="{'border-none': index === businessInfo.length-1}">
          <li v-bind:class="{'line-h': index === 9}">{{info.name}}</li> 
          <li>{{info.content}}</li>
        </ul>
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 电信业务经营许可信息 -->
    <div class="license-info">
      <img src="../../images/disclosure/dxywjyxkxx-02.png" alt="电信业务经营许可信息" class="license-title" width="49%">
      <div class="info">
        <p class="text-left">电信业务经营许可证号:</p>
        <p class="text-right">--</p>
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 资金存管信息 -->
    <div class="fund-info">
      <img src="../../images/disclosure/zjcgxx-03.png" alt="资金存管信息" class="fund-title" width="39%">
      <!-- <ul class="slide position-re">
        <li class="slide-banner text-center" @click="preview('https://www.hongcai.com/uploads/png/original/2017-10-19/image/9bcbea8d83f04b289b6b9c2cf8c3af9a-original.png')">
          <img src="../../images/disclosure/contract1.png"/>
        </li>
        <li class="slide-banner text-center" @click="preview('https://www.hongcai.com/uploads/png/original/2017-10-19/image/e8b1d7c10f354901a532a91c4fd7439a-original.png')">
          <img src="../../images/disclosure/contract2.png"/>
        </li>
      </ul> -->
      <!-- <p>资金存管银行全称：海口联合农村商业银行</p> -->
      <div class="info">
        <p class="text-center">资金存管银行全称:海口联合农村商业银行</p>
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 网站备案图标及编号 -->
    <div class="fund-info">
      <img src="../../images/disclosure/wzbatbjbh-04.png" alt="网站备案图标及编号" class="fund-title" width="38%">
      <div class="wrapper">
        <div>
          <img src="../../images/disclosure/record.png" alt="" height="100%" @click="preview('https://www.hongcai.com/uploads/png/original/2017-10-19/image/262d332a885e48849a59e9a4b73a9984-original.png')">
        </div>
      </div>
      <p>公安机关网站备案号：京ICP备15025477号-1</p>
    </div>
    <div class="parting-line"></div>
    <!-- 信息安全测评认证信息 -->
    <div class="security-info">
      <img src="../../images/disclosure/xxaqcprzxx-05.png" alt="信息安全测评认证信息" class="security-title" width="38%">
      <div class="wrapper">
        <div>
          <img src="../../images/disclosure/dengbao.png" alt="" height="100%" @click="preview('https://www.hongcai.com/uploads/png/original/2018-04-24/dengbao.png')">
        </div>
      </div>
      <p>信息系统安全等级保护备案证明</p>
    </div>
    <div class="parting-line"></div>
    <!-- 风险管理信息 -->
    <div class="risk-info">
      <img src="../../images/disclosure/fxglxx-06.png" alt="风险管理信息" class="risk-title" width="39%">
      <div class="part1">
        <p class="top-border"></p>
        <p class="title">风险管理架构</p>
        <img src="../../images/disclosure/jiagou.png" alt="风险管理架构" width="95%">
      </div>
      <div class="part2">
        <p class="top-border"></p>
        <p class="title">风险评估流程</p>
        <ul>
          <li v-for="risk in riskInfo">
            <p>{{risk.num}}</p>
            <p>{{risk.text}}</p>
          </li>
        </ul>
        <div class="content">通过对借款人的信息采集、甄别筛选、资信评估、审查分析、综合判断，完成风险评估流程后，宏财网作出最终审批意见。对于风险较高的项目，宏财网做出不予上标处理；对于存在欺诈风险的项目，根据情况加入黑名单。</div>
      </div>
      <div class="part3">
        <p class="top-border"></p>
        <p class="title">风险预警管理情况</p>
        <ul>
          <li>
            <img src="../../images/disclosure/record-num-01.png" alt="">
            <p> 日常预警管理</p>
          </li>
          <li>
            <img src="../../images/disclosure/record-num-02.png" alt="">
            <p> 特殊情况预警管理</p>
          </li>
        </ul>
        <div class="content">宏财网建立风险预警管理机制，贯穿于项目发标至全部还款完成整个过程。风险预警机制分为日常预警管理与特殊情况预警管理。日常预警管理是对项目情况进行日常监控，包括借款人、担保方及其他相关方，通过电话、大数据、新闻跟踪、信息检索等方式，监控是否有异常情况发生；特殊情况预警管理是对出现异常信息，包括借款到期前舆情监控异常、逾期等特殊情况，及时进行预警并采取针对性措施。</div>
      </div>
      <div class="part4">
        <p class="top-border"></p>
        <p class="title">催收方式</p>
        <ul>
          <li v-for="(collection, index) in collectionMethods">
            <p><span class="icon" v-bind:class="collection.iconClass"></span> <br>{{collection.title}}</p>
            <p>{{index + 1}}.{{collection.text}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'About',
    data () {
      return {
        businessInfo: [
          {
            name: '地方金融监管部门',
            content: '--'
          },
          {
            name: '备案登记时间',
            content: '--'
          },
          {
            name: '备案登记编号',
            content: '--'
          }
        ],
        riskInfo: [
          {
            num: '01',
            text: '项目受理'
          },
          {
            num: '02',
            text: '信息采集'
          },
          {
            num: '03',
            text: '数据处理'
          },
          {
            num: '04',
            text: '项目评估'
          },
          {
            num: '05',
            text: '项目审批'
          }
        ],
        collectionMethods: [
          {
            iconClass: 'collection1',
            title: '还款提醒',
            text: '还款日前3天，对借款人通过短信、邮件、电话等方式提醒还款'
          },
          {
            iconClass: 'collection2',
            title: '早期催收',
            text: '还款日当天通过短信、邮件、电话等方式再次提醒还款'
          },
          {
            iconClass: 'collection3',
            title: '中期催收',
            text: '对逾期未还的借款人通过短信、电话、邮件等方式进行催收'
          },
          {
            iconClass: 'collection4',
            title: '委外催收',
            text: '对逾期超过7天的借款人，通过上门催收、委外催收等多种方式不断催收'
          },
          {
            iconClass: 'collection5',
            title: '法律诉讼',
            text: '如以上方式均无效将进行法律诉讼'
          }
        ]
      }
    },
    methods: {
      preview (url) {
        bridgeUtil.webConnectNative('HCNative_ImgSrc', null, {'imgSrc': url}, function (response) {
        }, function (data) {
        })
      }
    }
  }
</script>
<style scoped>
  .part4 .icon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 5px;
    position: relative;
    top: .05rem;
  }
  .part4 .collection1 {
    background: url('../../images/disclosure/record-icon-01.png') no-repeat 4px 3px, linear-gradient(to top, #44d4f4, #43cfec);
    background-size: 100% 100%;
  }
  .part4 .collection2 {
    background: url('../../images/disclosure/record-icon-02.png') no-repeat 4px 3px, linear-gradient(to top, #44d4f4, #43cfec);
    background-size: 100%;
  }
  .part4 .collection3 {
    background: url('../../images/disclosure/record-icon-03.png') no-repeat 4px 3px, linear-gradient(to top, #44d4f4, #43cfec);
    background-size: 100%;
  }
  .part4 .collection4 {
    background: url('../../images/disclosure/record-icon-04.png') no-repeat 3px 6px, linear-gradient(to top, #44d4f4, #43cfec);
    background-size: 100%;
  }
  .part4 .collection5 {
    background: url('../../images/disclosure/record-icon-05.png') no-repeat -.52rem 0px, linear-gradient(to top, #44d4f4, #43cfec);
    background-size: 165%;
  }
  .part4 ul {
    width: 100%;
    margin: .2rem 0;
  }
  .part4 ul li {
    width: 100%;
    height: 1.5rem;
    padding: .3rem 0 .2rem 0;
  }
  .part4 ul li:nth-child(odd) {
    background: #ffefe8;
  }
  .part4 ul li:nth-child(even) {
    background: #fff;
  }
  .part4 ul li p {
    float: left;
  }
  .part4 ul li p:nth-child(1) {
    width: 26%;
    font-size: .25rem;
    color: #595a67;
    margin-left: 2%;
  }
  .part4 ul li p:nth-child(2) {
    width: 64%;
    font-size: .24rem;
    text-align: justify;
    color: #666666;
    margin-top: .22rem;
  }
  .part4 ul li:nth-child(5) p:nth-child(2) {
    margin-top: .4rem;
  }
  .part3, .part4 {
    margin-top: .65rem;
  }
  .part3 ul {
    width: 90%;
    margin: 0.25rem 5%;
    clear: both;
    overflow: hidden;
  }
  .part3 ul li {
    float: left;
    width: 50%;
    position: relative;
    padding: .25rem 0;
  }
  .part3 ul li:nth-child(odd) {
    background: #fff;
  }
  .part3 ul li:nth-child(even) {
    background: #ffefe8;
  }
  .part3 ul li p {
    color: #666666;
    font-size: .26rem;
    position: relative;
  }
  .part3 ul li:nth-child(1) p {
    text-shadow: 0 0 27.5px rgba(255, 77, 0, 0.85);
    top: -.22rem;
    left: .1rem;
  }
  .part3 ul li:nth-child(2) p {
    top: -.18rem;
    left: .2rem;
  }
  .part3 ul li img {
    width: 43%;
    position: relative;
    left: -.5rem;
  }
  .part2 li:before{
    content: "";
    display: block;
    position: absolute;
    top: 34%;
    right: -30px;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent transparent #6c6;
    z-index: 1;
  }
  .part2 li:nth-child(odd):before {
    border-color: transparent transparent transparent #fff;
  }
  .part2 li:nth-child(even):before {
    border-color: transparent transparent transparent #ffefe8;
  }
  .part2 li:last-child:before {
    border-color: transparent transparent transparent transparent !important;
  }
  .part2 {
    margin-top: .5rem;
  }
  .part2 .content, .part3 .content {
    letter-spacing: 0.5px;
    text-align: justify;
    color: #666666;
    margin: 0 5%;
    font-size: .24rem;
  }
  .part2 ul {
    width: 90%;
    overflow: hidden;
    clear: both;
    margin: 0.3rem 5%;
  }
  .part2 li {
    float: left;
    width: 33.33%;
    padding: .1rem 0;
    position: relative;
  }
  .part2 li p:nth-child(1) {
    font-size: .6rem;
    color: rgba(102, 102, 102, 0.2);
    font-weight: bold;
  }
  .part2 li p:nth-child(2) {
    color: #666;
    font-size: .24rem;
    text-shadow: 0 0 23.5px rgba(255, 77, 0, 0.85);
  }
  .part2 li:nth-child(even) {
    background: #ffefe8;
  }
  .part2 li:nth-child(odd) {
    background: #fff;
  }
  .risk-info .top-border {
    width: 10%;
    height: 5px;
    background-color: #666666;
    margin: 0 auto .1rem;
  }
  .risk-info .title {
    letter-spacing: 0.6px;
    color: #666666;
    font-size: .25rem;
  }
  .security-info p {
    font-size: .22rem;
    color: #666;
    margin: .35rem auto;
  }
  .license-info .info, .fund-info .info {
    overflow: hidden;
    clear: both;
    height: 1.5rem;
    line-height: 1.56rem;
    padding: 0 .35rem;
  }
  .fund-info .info p {
    width: 100%;
  }
  .license-info .info p {
    float: left;
    width: 50%;
  }
  .license-info .info p:nth-child(2){
    font-size: .5rem;
  }
  .parting-line {
    width: 100%;
    height: .1rem;
    background: url('../../images/about/parting-line.png') no-repeat center center;
    background-size: contain;
    margin-top: .6rem;
  }
  .bsuiness-title, .license-title, .fund-title, .security-title, .risk-title {
    margin: .5rem 0 .35rem 0;
  }
  .info {
    background: #fff;
    border-radius: .2rem;
    width: 90%;
    margin: 0 auto;
    font-size: .24rem;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
    padding: .12rem 0;
    color: #666;
  }
  .info ul {
    height: .8rem;
    line-height: .85rem;
  }
  .info ul {
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    width: 90%;
    overflow: hidden;
    clear: both;
    margin: 0 auto;
  }
  .info li:nth-child(1) {
    width: 40%;
    float: left;
    text-align: left;
    border-right: 1px solid #eee;
    padding-left: .1rem;
  }
  .info li:nth-child(2) {
    width: 53%;
    float: left;
    text-align: right;
    font-size: .5rem;
  }
  ::-webkit-scrollbar {display:none}
  .about {
    background-color: #f9f4f3;
  }
  .wrapper {
    margin: 0 auto;
    height: 4rem;
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
  .slide-banner {
    margin: 0.1rem auto;
    height: auto;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 48%;
    overflow: hidden;
    float: left;
  }
  .slide{
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    width: 90%;
  }
  .slide li:first-child{
    margin-right: 3%;
    margin-left: 1px;
  }
  .slide li img{
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
