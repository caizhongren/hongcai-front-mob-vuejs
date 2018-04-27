<template>
  <div class="policiesList">
    <!-- 重大事件 -->
    <div class="events">
      <img src="../../images/disclosure/other-icon-01.png" alt="重大事件" class="events-title" width="20%">
      <div class="info">
        <ul v-for="(item, index) in events" v-bind:class="{'border-none': index === events.length-1}">
          <li>{{item.event}}</li>
          <li>{{item.status}}</li>
        </ul>
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 政策法规 -->
    <div class="policies">
      <img src="../../images/disclosure/other-icon-02.png" alt="政策法规" class="policies-title" width="34%">
      <div class="commonBoxShadow" v-for="(item, index) in policiesList" @click="goText(index)">
        <p class="title" v-bind:class="{'margin-t': index === 3 || index === 4}">{{item.title}}</p>
        <img src="../../images/disclosure/icon-right.png" alt="">
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 运营报告 -->
    <div class="operation-report">
      <img src="../../images/disclosure/other-icon-03.png" alt="运营报告" class="report-title" width="25.5%">
      <ul class="slide position-re">
        <li class="slide-banner text-center" @click="goToOperating('2017')">
          <img src="../../images/disclosure/operating-2017.png"/>
        </li>
        <li class="slide-banner text-center" @click="goToOperating('2016')">
          <img src="../../images/disclosure/operating-2016.png"/>
        </li>
      </ul>
      <ul class="operation-title">
        <li>宏财网2017年年度运营报告</li>
        <li>宏财网2016年年度运营报告</li>
      </ul>
    </div>
    <div class="parting-line"></div>
    <!-- 收费标准 -->
    <div class="charge-standard">
      <img src="../../images/disclosure/other-icon-04.png" alt="收费标准" class="charge-title" width="32%">
      <div class="info">
        <ul v-for="(item, index) in charge" v-bind:class="{'border-none': index === charge.length-1}">
          <li v-bind:class="{'line-h': index === 4, 'ft-333': index === 0}">{{item.type}}</li>
          <li>{{item.standard}}</li>
        </ul>
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 咨询投诉 -->
    <div class="consult-complaint">
      <img src="../../images/disclosure/other-icon-05.png" alt="咨询投诉" class="consult-title" width="30%">
      <div class="consult">
        <div class="information">
          <p>电话：400-990-7626 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（工作时间：9:00-18:00）</p>
        </div>
        <img src="../../images/disclosure/kf.png" alt="">
      </div>
      <div class="consult">
        <div class="information">
          <p>邮箱：hckf@hongcai.com</p>
        </div>
        <img src="../../images/disclosure/yx.png" alt="">
      </div>
      <div class="consult">
        <div class="information">
          <p>地址：北京市海淀区中关村南二条一号 <br>
              中科院国家空间中心九章大厦B座</p>
        </div>
        <img src="../../images/disclosure/dz.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        policiesList: [
          {
            title: '中华人民共和国电子签名法'
          },
          {
            title: '中华人民共和国网络安全法'
          },
          {
            title: '中华人民共和国反洗钱法'
          },
          {
            title: '最高人民法院关于审理民间借贷案件适用法律若干问题的规定 '
          },
          {
            title: '中国人民银行等十部委发布《关于促进互联网金融健康发展的指导意见》'
          },
          {
            title: '网络借贷信息中介机构业务活动管理暂行办法'
          },
          {
            title: 'P2P网络借贷风险专项整治工作实施方案'
          },
          {
            title: '网络借贷信息中介机构备案登记管理指引'
          },
          {
            title: '网络借贷资金存管业务指引'
          },
          {
            title: '网络借贷信息中介机构业务活动信息披露指引'
          }
        ],
        events: [
          {
            event: '公司减资、合并、分立、解散或申请破产',
            status: '无'
          },
          {
            event: '公司依法进入破产程序',
            status: '无'
          },
          {
            event: '公司被责令停业、整顿、关闭',
            status: '无'
          },
          {
            event: '公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚',
            status: '无'
          },
          {
            event: '公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施',
            status: '无'
          },
          {
            event: '公司主要或者全部业务陷入停顿',
            status: '无'
          },
          {
            event: '存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项',
            status: '无'
          }
        ],
        charge: [
          {
            type: '业务类型',
            standard: '收费标准'
          },
          {
            type: '会员注册',
            standard: '免费'
          },
          {
            type: '开通存管账户',
            standard: '免费'
          },
          {
            type: '投标（出借）',
            standard: '免费'
          },
          {
            type: '债权转让',
            standard: '转让手续费=转让金额*1%，最低3元'
          },
          {
            type: '充值',
            standard: '免费'
          },
          {
            type: '提现',
            standard: '2元/笔'
          }
        ]
      }
    },
    methods: {
      goText (id) {
        this.$router.push({name: 'Policies', params: { id: id }})
      },
      goToOperating (year) {
        year === '2017' ? this.$router.push({name: 'operatingReport2017'}) : this.$router.push({name: 'operatingReport2016'})
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
  .ft-333 {
    color: #333 !important;
  }
  .consult {
    border-radius: 12.5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    min-height: 1rem;
    margin: 0 auto;
    position: relative;
    font-size: .26rem;
    margin-bottom: .5rem;
    color: #666;
    padding-bottom: .2rem;
  }
  .consult img {
    position: absolute;
    width: 18%;
    top: -.35rem;
    left: -.12rem;
  }
  .consult .information {
    text-align: left;
    padding: 0.285rem 0 0 1rem;
  }
  .charge-standard .line-h {
    line-height: .63rem;
  }
  .charge-standard .info ul li:nth-child(1) {
    width: 33%;
    color: #666;
    border-right: 1px solid transparent;
  }
  .charge-standard .info ul li:nth-child(2) {
    width: 56.9%;
    color: #ff611d;
    text-align: center;
    border-left: 1px solid #eee;
    padding: .12rem;
  }
  .operation-report {
    overflow: hidden;
  }
  .operation-report .operation-title {
    overflow: hidden;
    clear: both;
    width: 100%;
    font-size: .22rem;
  }
  .operation-title li {
    width: 50%;
    float: left;
    color: #666;
  }
  .slide-banner {
    margin: 1px auto 0.25rem;
    height: auto;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 48%;
    overflow: hidden;
    float: left;
  }
  .slide-banner:nth-child(1) {
    float: left;
    margin-left: 1px;
  }
  .slide-banner:nth-child(2) {
    float: right;
    margin-right: 1px;
  }
  .slide{
    position: relative;
    margin: 0 5%;
    overflow: hidden;
    width: 90%;
  }
  .slide li:first-child{
    margin-right: 3%;
  }
  .slide li img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .parting-line {
    width: 100%;
    height: .1rem;
    background: url('../../images/about/parting-line.png') no-repeat center center;
    background-size: contain;
    margin-top: .6rem;
  }
  .events-title, .policies-title, .report-title, .charge-title, .consult-title {
    margin: .5rem auto .35rem;
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
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    width: 90%;
    overflow: hidden;
    clear: both;
    margin: 0 auto;
  }
  .events .info ul:nth-child(1) li:nth-child(2) {
    line-height: .95rem;
  }
  .events .info ul:nth-child(5) li:nth-child(2) {
    line-height: 2.4rem;
  }
  .events .info ul:nth-child(2) li:nth-child(2), .events .info ul:nth-child(3) li:nth-child(2), .events .info ul:nth-child(6) li:nth-child(2) {
    line-height: .63rem;
  }
  .events .info ul:nth-child(4) li:nth-child(2), .events .info ul:nth-child(7) li:nth-child(2) {
    line-height: 1.35rem;
  }
  .info li:nth-child(1) {
    width: 75%;
    float: left;
    text-align: left;
    border-right: 1px solid #eee;
    padding-left: .1rem;
    padding: .12rem;
  }
  .info li:nth-child(2) {
    width: 14%;
    float: left;
    text-align: right;
    color: #333;
  }
  .policiesList {
    background: #f9f4f3;
    padding-bottom: .2rem;
  }
  .commonBoxShadow {
    width: 100%;
    margin: 0rem auto;
    text-align: left;
    overflow: hidden;
    height: 1.1rem;
    line-height: 1.1rem;
    padding: 0 .35rem;
  }
  .commonBoxShadow:nth-child(even) {
    background: #ffefe8;
  }
  .commonBoxShadow:nth-child(odd) {
    background: #fff;
  }
  .commonBoxShadow .title {
    width: 90%;
    float: left;
    font-size: .24rem;
    color: #666;
  }
  .commonBoxShadow .title.margin-t {
    line-height: .4rem;
    margin-top: .15rem;
  }
  .commonBoxShadow img {
    width: 3.2%;
    float: right;
    margin-top: .4rem;
  }
</style>
