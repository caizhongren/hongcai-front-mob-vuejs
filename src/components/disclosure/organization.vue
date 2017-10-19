<template>
  <div class="organization">
    <!-- 工商信息 -->
    <div class="bsuiness-info">
      <img src="../../images/disclosure/organization-01.png" alt="" class="bsuiness-title">
      <table class="info">
        <div>
          <tr v-for="(info, index) in businessInfo" v-bind:class="{'border-none': index === businessInfo.length-1}">
            <td>{{info.name}}</td> 
            <td>{{info.content}}</td>
          </tr>
        </div>
      </table>
    </div>
    <div class="parting-line"></div>
    <!-- 股东信息 -->
    <div class="shareholder-info">
      <img src="../../images/disclosure/organization-02.png" alt="" class="shareholder-title">
      <div class="shareholder1">
        <div class="information">
          <p>刘刚 </br>持股比例86.7%</p>
        </div>
        <img src="../../images/disclosure/Shareholder-01.png" alt="">
      </div>
      <div class="shareholder2">
        <div class="information">
          <p>洛阳中小企业资产管理有限公司 </br>持股比例13.3%</p>
        </div>
        <img src="../../images/disclosure/Shareholder-02.png" alt="">
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 组织框架 -->
    <div class="framework-info">
      <img src="../../images/disclosure/organization-03.png" alt="" class="framework-title">
      <img src="../../images/disclosure/organization.png" alt="" width="98%">
    </div>
    <div class="parting-line"></div>
    <!-- 从业人员概况 -->
    <div class="employees-profiles">
      <img src="../../images/disclosure/organization-04.png" alt="" class="employees-title">
      <div class="profiles">
        <ul class="profiles-tab">
          <li :class="{active: profilesTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab.profilesName}}</li>
        </ul>
        <div class="profiles-cont" v-show="profilesTab === 0">
          <img src="../../images/disclosure/ages.png" class="agesImg" width="70%">
          <ul class="agesList">
            <li>
              <span>25岁-35岁</span>
              <span>10人</span>
            </li>
            <li>
              <span>25岁以下</span>
              <span>7人</span>
            </li>
            <li>
              <span>35岁以上</span>
              <span>6人</span>
            </li>
          </ul>
        </div>
        <div class="profiles-cont" v-show="profilesTab === 1">
          <img src="../../images/disclosure/education.png" alt="" width="90%">
          <ul class="education">
            <li>
              <span>本科</span>
              <span>13人</span>
            </li>
            <li>
              <span>大专</span>
              <span>4人</span>
            </li>
            <li>
              <span>硕士</span>
              <span>3人</span>
            </li>
            <li>
              <span>博士及以上</span>
              <span>3人</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="parting-line"></div>
    <!-- 渠道信息 -->
    <div class="channels-info">
      <img src="../../images/disclosure/organization-05.png" alt="" class="channels-title">
      <div class="channels">
        <div class="information">
          <p>官网域名：www.hongcai.com</p>
        </div>
        <img src="../../images/disclosure/channel-01.png" alt="">
      </div>
      <div class="channels">
        <div class="information">
          <p>IP地址：119.254.147.66</p>
        </div>
        <img src="../../images/disclosure/channel-02.png" alt="">
      </div>
      <div class="channels">
        <div class="information">
          <p>微信公众号: 宏财服务中心</p>
        </div>
        <img src="../../images/disclosure/channel-03.png" alt="">
      </div>
      <div class="channels">
        <div class="information">
          <p>APP：宏财网（iOS及Android）</p>
        </div>
        <img src="../../images/disclosure/channel-04.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Organization',
    data () {
      return {
        businessInfo: [
          {
            name: '公司名称',
            content: '北京竞财投资服务有限公司'
          },
          {
            name: '公司简称',
            content: '北京竞财；竞财'
          },
          {
            name: '统一社会信用代码',
            content: '91110107330246732H'
          },
          {
            name: '公司注册资本',
            content: '1000万'
          },
          {
            name: '公司实缴资本',
            content: '433万'
          },
          {
            name: '公司注册地',
            content: '北京市工商行政管理局石景山分局'
          },
          {
            name: '公司经营地',
            content: '北京市朝阳区天辰东路7号国家会议中心北区4层'
          },
          {
            name: '公司成立时间',
            content: '2015年01月23日'
          },
          {
            name: '公司经营期限',
            content: '至2035年01月22日'
          },
          {
            name: '公司经营状态',
            content: '开业'
          },
          {
            name: '公司法定代表人',
            content: '刘刚'
          },
          {
            name: '公司经营范围',
            content: '投资咨询；投资管理；资产管理；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出具相应的审计报告、验资报告、查账报告、评估报告等文字材料）；项目投资；企业管理咨询；公关策划；经济信息咨询；市场调查'
          }
        ],
        profilesTab: 0,
        tabs: [
          {
            profilesName: '年龄分布'
          },
          {
            profilesName: '学历分布'
          }
        ]
      }
    },
    methods: {
      switchTab: function (index) {
        if (this.profilesTab !== index) {
          this.profilesTab = index
        }
      }
    }
  }
</script>
<style scoped>
  .organization {
    color: #666;    
    padding-bottom: 1rem;
    background: #f9f4f3;
  }
  .parting-line {
    width: 100%;
    height: .1rem;
    background: url('../../images/about/parting-line.png') no-repeat center center;
    background-size: contain;
    margin-top: .6rem;
  }
  .bsuiness-title {
    margin: .35rem 0 .5rem 0;
    width: 29%;
  }
  table.info {
    background: #fff;
    border-radius: .2rem;
    width: 90%;
    margin: 0 auto;
    font-size: .2rem;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
  }
  table.info div {
    padding: .1rem .15rem;
  }
  table.info tr {
    height: .6rem;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
  }
  table.info td:nth-child(1) {
    width: 43%;
    text-align: left;
    border-right: 1px solid #eee;
    line-height: .7rem;
    padding-left: .1rem;
  }
  table.info td:nth-child(2) {
    width: 57%;
    text-align: left;
    line-height: 1.6;
    padding-left: .2rem;
  }
  table.info li p {
    font-size: .22rem;
    font-weight: 500;
    line-height: 1.25;
    text-align: center;
  }
  .shareholder-title {
    width: 34.5%;
    margin: .5rem auto .5rem;
  }
  .shareholder1, .shareholder2 {
    border-radius: 12.5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    height: 1.5rem;
    margin: 0 auto;
    position: relative;
    font-size: .28rem;
  }
  .shareholder1 {
    margin-bottom: .75rem;
  }
  .shareholder1 img, .shareholder2 img {
    position: absolute;
    width: 28%;
    top: -.6rem;
  }
  .shareholder1 img {
    left: 0;
  }
  .shareholder2 img {
    right: 0;
  }
  .shareholder1 .information {
    text-align: left;
    padding: .35rem 0 0 2.2rem;
  }
  .shareholder2 .information {
    text-align: left;
    padding: .35rem 0 0 0.2rem;
  }
  .framework-title {
    width: 36.5%;
    margin: .5rem auto .2rem;
  }
  .employees-title {
    width: 25%;
    margin: .5rem auto;
  }
  .profiles-tab {
    height: .55rem;
    line-height: .55rem;
    font-size: .24rem;
    margin-left: 5%;
  }
  .profiles-tab li {
    width: 30%;
    float: left;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    background-color: #f9f4f3 ;
    box-shadow: 0.8px -1.3px 3.5px 0 rgba(80, 77, 75, 0.2);
  }
  .profiles-tab li.active {
    background-color: #ffffff;
    box-shadow: 0.8px -1.3px 3.5px 0 rgba(80, 77, 75, 0.2);
  }
  .profiles-tab li:nth-child(1) {
    margin-right: .05rem;
  }
  .profiles-cont {
    width: 90%;
    margin: 0 auto;
    background: #fff;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    border-top-right-radius: .2rem;
    box-shadow: 0.8px 1.3px 3.5px 0 rgba(80, 77, 75, 0.2);
    padding: .35rem 0 0rem;
    height: 6.2rem;
  }
  .agesList, .education {
    overflow: hidden;
    clear: both;
    margin-top: .3rem;
  }
  .agesImg {
    margin-top: .3rem;
  }
  .agesList li, .education li {
    width: 34%;
    border-radius: .1rem;
    height: .55rem;
    line-height: .56rem;
    float: left;
    font-size: .2rem;
    color: #666;
    margin: 0 7% .2rem;
  }
  .agesList li span:nth-child(2), .education li span:nth-child(2) {
    display: inline-block;
    height: .55rem;
    line-height: .56rem;
    float: right;
    width: 30%;
    color: #fff;
  }
  .agesList li:nth-child(1) {
    border: 1px solid #fdab51;
  }
  .agesList li:nth-child(1) span:nth-child(2) {
    background: #fdab51;
  }
  .agesList li:nth-child(2) {
    border: 1px solid #6a649c;
  }
  .agesList li:nth-child(2) span:nth-child(2) {
    background: #6a649c;
  }
  .agesList li:nth-child(3) {
    border: 1px solid #fc7177;
  }
  .agesList li:nth-child(3) span:nth-child(2) {
    background: #fc7177;
  }
  .education li:nth-child(1) {
    border: 1px solid #a2dcfd;
  }
  .education li:nth-child(1) span:nth-child(2) {
    background: #a2dcfd;
  }
  .education li:nth-child(2) {
    border: 1px solid #7dc4ec;
  }
  .education li:nth-child(2) span:nth-child(2) {
    background: #7dc4ec;
  }
  .education li:nth-child(3) {
    border: 1px solid #388ec5;
  }
  .education li:nth-child(3) span:nth-child(2) {
    background: #388ec5;
  }
  .education li:nth-child(4) {
    border: 1px solid #2873b3;
  }
  .education li:nth-child(4) span:nth-child(2) {
    background: #2873b3;
  }
  .channels-title {
    width: 17.5%;
    margin: .5rem auto .5rem;
  }
  .channels {
    border-radius: 12.5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    height: 1rem;
    margin: 0 auto;
    position: relative;
    font-size: .28rem;
    margin-bottom: .5rem;
    color: #666;
  }
  .channels img {
    position: absolute;
    width: 22%;
    top: -.4rem;
    left: -3px;
  }
  .channels .information {
    text-align: left;
    padding: 0.285rem 0 0 1.4rem;
  }
</style>
