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
    <!-- 组织框架 -->
    <div class="employees-profiles">
      <img src="../../images/disclosure/organization-04.png" alt="" class="employees-title">
      <div class="profiles">
        <ul class="profiles-tab">
          <li>年龄分布</li>
          <li>学历分布</li>
        </ul>
      </div>
    </div>
    <div class="parting-line"></div>
  </div>
</template>
<script>
  export default {
    name: 'About',
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
            name: '公司经营范围',
            content: '投资咨询；投资管理；资产管理；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出具相应的审计报告、验资报告、查账报告、评估报告等文字材料）；项目投资；企业管理咨询；公关策划；经济信息咨询；市场调查'
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .organization {
    color: #666;    
    padding-top: 1rem;
  }
  .parting-line {
    width: 100%;
    height: .1rem;
    background: url('../../images/about/parting-line.png') no-repeat center center;
    background-size: contain;
    margin-top: .6rem;
  }
  .bsuiness-title {
    margin: .5rem;
    width: 30%;
  }
  .bsuiness-info {

  }
  table.info {
    background: #fff;
    border-radius: .2rem;
    width: 90%;
    margin: 0 auto;
    font-size: .24rem;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
  }
  table.info div {
    padding: .1rem .25rem;
  }
  table.info tr {
    height: .65rem;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
  }
  table.info td:nth-child(1) {
    width: 43%;
    text-align: left;
    border-right: 1px solid #eee;
    line-height: .65rem;
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
    width: 37%;
    margin: .5rem auto .7rem;
  }
  .shareholder1, .shareholder2 {
    border-radius: 12.5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 3.5px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    height: 1.5rem;
    margin: 0 auto;
    position: relative;
    font-size: .24rem;
  }
  .shareholder1 {
    margin-bottom: .75rem;
  }
  .shareholder1 img, .shareholder2 img {
    position: absolute;
    width: 31%;
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
    padding: .4rem 0 0 2.2rem;
  }
  .shareholder2 .information {
    text-align: left;
    padding: .4rem 0 0 0.2rem;
  }
  .framework-title {
    width: 40%;
    margin: .5rem auto .2rem;
  }
  .employees-title {
    width: 30%;
    margin: .5rem auto;
  }
  .profiles-tab {
    background-color: #ffffff;
    box-shadow: 0.8px 1.3px 3.5px 0 rgba(80, 77, 75, 0.2);
    width: 30%;
    height: .55rem;
    line-height: .55rem;
    font-size: .24rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
  }
</style>
