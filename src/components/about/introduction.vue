<template>
  <div class="introduction">
    <div class="company-profile">
      <img src="../../images/about/company-profile.png" alt="" class="profile-title">
      <ul class="companys">
        <li>
          <img src="../../images/about/profile-1.png" alt="">
          <p>国有企业<br>A轮亿元融资</p>
        </li>
        <li>
          <img src="../../images/about/profile-2.png" alt="">
          <p>北京网贷行业协会<br>观察员单位</p>
        </li>
        <li>
          <img src="../../images/about/profile-3.png" alt="">
          <p>海口银行<br>资金存管</p>
        </li>
      </ul>
      <div class="profiles">
        宏财网是国内领先的专注于中小微企业贷款需求的P2B互联网金融信息服务平台，2016年获得国有企业A轮战略投资1亿元，是国内极少数由上市金融集团提供专业安全金融资产的平台之一。自2014年成立以来，宏财网始终秉承“安全、透明、稳健、高效”的经营理念，不断为融投双方提供便利的互联网金融服务。
      </div>
    </div>
    <div class="parting-line"></div>
    <div class="shareholder">
      <img src="../../images/about/shareholder.png" alt="" class="shareholder-title">
      <div class="shareholder-img"></div>
      <p class="text-center">专注于中小企业资产管理的国有金融机构</p>
    </div>
    <div class="parting-line"></div>
    <div class="project-info">
      <img src="../../images/about/project-info.png" alt="" class="project-title">
      <ul class="info">
        <li>
          <p class="title"><span>项</span>目来源</p>
          <p>宏财网凭借股东广泛的金融资源，及项目方十多年积累的优质资源，打造了一个相对封闭的金融生态圈，资产方信息透明、知根知底，安全性极高。</p>
        </li>
        <li>
          <p class="title"><span>项</span>目类型</p>
          <p>目前宏财网以55天和180天的汽车金融和小微产业金融项目为主，流动性好，年均回报率在业内属于中高水准。</p>
        </li>
      </ul>
    </div>
    <div class="parting-line"></div>
    <div class="organizing">
      <img src="../../images/about/organizing.png" alt="" class="organizing-title">
      <!-- <img src="../../images/disclosure/organization.png" alt="" width="96%"> -->
    </div>
  </div>
</template>
<style scoped>
  .parting-line {
    width: 100%;
    height: .1rem;
    background: url('../../images/about/parting-line.png') no-repeat center center;
    background-size: contain;
  }
  .introduction {
    width: 100%;
    font-family: PingFang-SC;
    color: #666666;
  }
  .profile-title {
    margin-bottom: .3rem;
    width: 25%;
  }
  ul.companys {
    overflow: hidden;
    clear: both;
  }
  ul.companys li {
    float: left;
    width: 33.333%;
  }
  ul.companys li img {
    width: 64%;
  }
  ul.companys li p {
    font-size: .22rem;
    font-weight: 500;
    line-height: 1.25;
    text-align: center;
  }
  .profiles {
    font-size: .26rem;
    font-weight: 500;
    text-align: justify;
    padding: .5rem .4rem .4rem;
  }
  .shareholder p {
    font-size: .28rem;
    padding: .2rem 0 .4rem;
  }
  .shareholder-title {
    margin-top: .3rem;
    width: 36%;
  }
  .shareholder-img {
    height: 4.5rem;
    background: url('../../images/about/shareholder-img.png') no-repeat center center;
    background-size: contain;
  }
  .project-title {
    margin-top: .3rem;
    width: 30%;
  }
  .info {
    text-align: justify;
    padding: .3rem .4rem 0;
  }
  .info .title{
    font-size: .28rem;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 2.7px;
    margin-bottom: .2rem;
  }
  .info .title span {
    width: .32rem;
	  height: .35rem;
    border-radius: 50%;
    background-color: #ff611d;
    box-shadow: 0 0.5px 12px 0 rgba(255, 77, 0, 0.69);
    color: #fff;
    text-align: center;
    line-height: .38rem;
    display: inline-block;
    padding-left: .03rem;
  }
  .info li p {
    font-size: .26rem;
    margin-bottom: .5rem;
  }
  .info li p:nth-child(2) {
    margin-bottom: .4rem;
  }
  .organizing {
    padding-bottom: 1rem;
  }
  .organizing-title {
    margin-top: .3rem;
    width: 26.5%;
  }
</style>
