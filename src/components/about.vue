<template>
  <div class="about">
    <div class="bg-White overflow-hid">
      <ul class="about-tab1 columns ten offset-by-one aboutorange clearfix">
        <li class="column text-center ft-1p4" :class="{active: activeTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab}}</li>
      </ul>
    </div>
  <!-- 要展示的内容如下 -->
    <div class="tab-content columns twelve bg-White overflow-hid">
      <section v-if="activeTab === 2" class="partner margin-b-7 bg-White">
        <div class="partner-units padding-t-1">
          <ul>
            <li class="margin-0 padding-t-1p5">
              <img src="../images/about/01.png" height="25px" class="display-bl margin-auto margin-b-1">
              <p class="margin-auto margin-t-1p5 ft-1p4">
                宏财网项目推荐方为鑫融基金控股份有限公司（以下简称鑫融基，证券代码：832379）。鑫融基注册资本16.39亿元，是2006年由政府出资发起，多家地方企业共同参与成立的金融机构。是新三板金控第一股和首家民间全牌照金融服务机构，股本总额位居全国第四。
              </p>
              <div class="line position-re"><p class="margin-auto position-ab"></p></div>
            </li>
            <li class="margin-0">
              <img src="../images/about/hklogo.png" height="25px" class="display-bl margin-auto margin-b-1">
              <p class="margin-auto margin-t-1p5 ft-1p4">
                宏财网已正式对接海口联合农商银行资金存管系统（简称银行资金存管系统）。标的、资金信息同步上传北京市网贷协会，最大限度保护出借者利益。
              </p>
              <div class="line position-re"><p class="margin-auto position-ab"></p></div>
            </li>
            <li class="margin-0">
              <img src="../images/about/yblogo.png" height="25px" class="display-bl margin-auto margin-b-1">
              <p class="margin-auto margin-t-1p5 ft-1p4">
                易宝支付（YeePay.com)成立于2003年8月成立，总部位于北京，在全国设有30家分公司，是中国行业支付的开创者和领导者。自公司成立以来，秉承成就客户、极致服务、开放分享的核心价值观，致力成为世界一流的交易服务平台，领跑电子支付、移动互联和互联网金融。
              </p>
              <div class="line position-re"><p class="margin-auto position-ab"></p></div>
            </li>
            <li class="margin-0">
              <img src="../images/about/05.png" height="25px" class="display-bl margin-auto margin-b-1">
              <p class="margin-auto margin-t-1p5 ft-1p4">
                深圳市嘉得投资基金管理有限公司注册资本2亿元，主营业务为资产管理业务、股权和证券投资业务、管理咨询服务等。公司成立至今，资产管理规模从人民币1000万发展到人民币数十亿元左右，平均回报率超过50%，投研人员平均从业经验10年以上。
              </p>
              <div class="line position-re"><p class="margin-auto position-ab"></p></div>
            </li>
            <li class="margin-0">
              <img src="../images/about/06.png" height="25px" class="display-bl margin-auto margin-b-1">
              <p class="margin-auto margin-t-1p5 ft-1p4">
                宏财网与工信部下设中国中小企业信息网（www.sme.gov.cn）达成战略合作协议。成为首个与中小企业信息网合作的互联网金融平台。
              </p>
              <div class="line position-re"><p class="margin-auto position-ab"></p></div>
            </li>
          </ul>
        </div>
      </section>
      <section class="introduce margin-b-7" v-if="activeTab === 0">
        <div>
          <img src="../images/about/introduce.png" width="100%">
        </div>
        <div class="unit1 padding-l-1 padding-r-1 padding-t-2">
          <div class="title margin-auto text-center margin-b-1">
            <p class="margin-b-0 ft-white">公司简介</p>
          </div>
          <div>
            <img src="../images/about/unit1-img.png" width="75%" class="display-bl margin-auto margin-b-2">
          </div class="content">
          <p class="ft-1p2 margin-b-0 content">宏财网 2014年上线运营，2016年获得1亿元A轮融资，凭借股东广泛的金融资源、博士团队的专业能力和严谨的风控模型与项目管理流程,在项目方十多年积累的金融资源生态圈中，为广大出借者筛选优质的出借项目。</p>
        </div>
        <div class="unit2 padding-l-1 padding-r-1 padding-t-2 margin-b-2">
          <div class="title margin-auto text-center margin-b-1">
            <p class="margin-b-0 ft-white">股东介绍</p>
          </div>
          <div>
            <img src="../images/about/unit2-img.png" width="53%" class="display-bl margin-auto margin-b-1">
          </div class="content">
          <p class="ft-1p2 margin-b-0 content text-center">专注于中小企业资产管理的国有金融机构</p>
        </div>
        <div class="unit3 padding-l-1 padding-r-1 padding-t-2 margin-b-2">
          <div class="title margin-auto text-center margin-b-1">
            <p class="margin-b-0 ft-white">产品介绍:</p>
          </div>
          <div class="content">
            <ul>
              <li class="ft-1p2">
                <p class="margin-b-0p5 ft-1p3">项目来源:</p></br>
                项目来源于股东和项目方十多年积累的金融资源生态圈，信息对称、知根知底，安全性极高；
              </li>
              <li class="ft-1p2">
                <p class="margin-b-0p5 ft-1p3">项目优势:</p></br>
                固定资产足值抵押的小微企业和个人借贷项目；
              </li>
              <li class="ft-1p2 margin-b-0">
                <p class="margin-b-0p5 ft-1p3">产品特点:</p></br>
                3-12月中短期项目为主，流动性好。
              </li>
            </ul>
          </div>
        </div>
        <div class="unit3 padding-l-1 padding-r-1 padding-t-2 margin-b-2">
          <div class="title margin-auto text-center margin-b-1">
            <p class="margin-b-0 ft-white">组织架构</p>
          </div>
          <img src="../images/about/framework.png" width="93%" class="display-bl margin-auto margin-b-2">
        </div>
      </section>
      <section v-if="activeTab === 1" class="topTeam margin-b-7">
        <!-- 刘刚 -->
        <div class="part1">
          <!-- 标题 -->
          <div class="top_title">
            <p class="margin-l--8">刘刚 董事长兼CEO</p>
          </div>
          <!-- 内容 -->
          <div class="content position-re">
            <div class="lf_text clear">
              <i class="fa fa-circle circle fl display-inb" aria-hidden="true"></i>
              <span class="text fl display-inb">
                中国人民大学管理学博士。曾在国务院国资委下属的中国企业联合会担任管理创新处处长，参与国务院国资委发起的中央企业管理提升工作，非常熟悉国内企业管理状况，执笔起草的多份企业管理方面的报告获政治局常委等中央领导的重要批示。2014年辞职下海创业。现担任宏财网董事长兼CEO，同时担任首都企业改革研究会常务理事、首都经济贸易大学MBA导师（金融学方向）。2015年成为《当代经理人》杂志封面人物。
              </span>
            </div>
            <img class="img" src="../images/about/liugang.png" alt="" width="92%">
          </div>
        </div>
        <!-- 李青 -->
        <div class="part1">
          <!-- 标题 -->
          <div class="top_title1">
            <p class="margin-l-16">李青 <span class="t_title">执行董事兼风控委员会首席风控官</span></p>
          </div>
          <!-- 内容 -->
          <div class="position-re">
            <div class="content position-re overflow-hid">
              <div class="lf_text clear fr">
                <i class="fa fa-circle circle fl display-inb" aria-hidden="true"></i>
                <span class="text fl display-inb">
                  厦门大学金融学博士。曾在深圳创投、正道及大型金融控股集团任职，擅长行业状况分析，精通价格出借，长期负责企业上市及并购重组事宜，在创新创投项目工作方面具有深刻的见解与丰富的实战经验，擅长消费金融、小微金融产品设计和全流程风险管理。
                </span>
              </div>
            </div>
            <img class="img1" src="../images/about/liqing.png" alt="" width="92%">
          </div>
        </div>
        <!-- 席升阳 -->
        <div class="part1">
          <!-- 标题 -->
          <div class="top_title2">
            <p class="margin-l--8">席升阳 <span>金融产品研发首席研究员</span></p>
          </div>
          <!-- 内容 -->
          <div class="position-re">
            <div class="content position-re overflow-hid">
              <div class="lf_text clear">
                <i class="fa fa-circle circle fl display-inb" aria-hidden="true"></i>
                <span class="text fl display-inb">
                  华中科技大学博士，曾担任大学院长等职务，长期担任政府金融部门顾问，金融专家委员会成员，为各级政府、企事业单位作专题金融讲座上百次，曾先后担任洛玻等多家国有上市公司、民营企业独立董事，民间金融互联网化、阳光化倡导者，在证券、出借、网贷、供应链金融产品创新等多领域具有深刻认识与丰富经验，带领团队设计并落地实施多项金融产品。
                </span>
              </div>
            </div>
            <img class="img" src="../images/about/xishengyang.png" alt="" width="92%">
          </div>
        </div>
        <!-- 刘松 -->
        <div class="part1">
          <!-- 标题 -->
          <div class="top_title3">
            <p>刘松 技术负责人</p>
          </div>
          <!-- 内容 -->
          <div class="position-re">
            <img class="img2" src="../images/about/liusong.png" alt="" width="92%">
            <div class="content position-re overflow-hid">
              <div class="lf_text clear fr">
                <i class="fa fa-circle circle fl display-inb" aria-hidden="true"></i>
                <span class="text fl display-inb">
                  北京大学硕士。十年以上互联网从业经验，在电商、互联网金融等领域从事技术研究、产品研发、团队管理等方面的工作，在网站架构、移动互联网、大数据等方面具有丰富的项目经验。曾作为早期团队成员跟随前 MSN 副总裁陈啸先生创办优众网，跟随华为荣耀前总裁刘江峰先生创办 Dmall（多点）。
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="activeTab === 3" class="callMe margin-b-7">
        <!-- 客服电话 -->
        <div class="content overflow-hid">
          <div class="icon fl">
            <i class="fa fa-tty" aria-hidden="true"></i>
          </div>
          <div class="text fl">
            客服电话：<br>
            400-990-7626（工作时间：09:00-18:00）
          </div>
        </div>
        <!-- 邮件反馈 -->
        <div class="content overflow-hid">
          <div class="icon fl">
            <i class="fa fa-envelope" aria-hidden="true"></i>
          </div>
          <div class="text fl">
            客服邮箱：<br>
            hckf@hongcai.com
          </div>
        </div>
        <!-- 商务合作QQ -->
        <div class="content overflow-hid">
          <div class="icon fl">
            <i class="fa fa-qq" aria-hidden="true"></i>
          </div>
          <div class="text fl">
            商务合作QQ：<br>
            2880787006
          </div>
        </div>
        <!-- 网址 -->
        <div class="content overflow-hid">
          <div class="icon fl">
            <i class="fa fa-internet-explorer" aria-hidden="true"></i>
          </div>
          <div class="text fl">
            网址：<br>
            www.hongcai.com
          </div>
        </div>
        <!-- 地址 -->
        <div class="content overflow-hid">
          <div class="icon fl">
            <i class="fa fa-home" aria-hidden="true"></i>
          </div>
          <div class="text fl">
            地址：<br>
            北京市朝阳区天辰东路7号国家会议中心4层
          </div>
        </div>
        <!-- 微信ID -->
        <div class="content overflow-hid">
          <div class="icon fl">
            <i class="fa fa-weixin" aria-hidden="true"></i>
          </div>
          <div class="text fl border-none">
            扫描关注宏财网公众号 <br>
            <img src="../images/about/weixin.png" alt="" width="45%" class="margin-t-0p5">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActivityReward',
    data () {
      return {
        tabs: ['宏财简介', '高管团队', '战略伙伴', '联系我们'],
        activeTab: 0
      }
    },
    created: function () {
    },
    methods: {
      switchTab: function (index) {
        this.activeTab = index
      }
    }
  }
</script>
<style scoped>
  .about hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }
  .about .column {
    float: left;
  }
  .margin-l--8 {
    margin-left: -8%;
  }
  .margin-l-10 {
    margin-left: 10%;
  }
  .margin-l-16 {
    margin-left: 15%;
    width: 88%;
  }
  .border-none {
    border: none !important;
  }
  .about .about-tab1 li {
    width: 20%;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
  .about .half {
    width: 48%;
  }
  .about .base-background {
    background-color: #F5F5F5;
  }
  .about .aboutorange li {
    color: #757575;
    height: .8rem;
    line-height: .8rem;
  }
  .about .aboutorange li.active {
    color: #f5762f;
  }
  .about .introduce .content {
    width: 96%;
    margin: 0 auto;
    line-height: 0.4rem;
    text-align: justify;
    font-size: .2rem;
    margin-top: .3rem;
    color: #5a5959;
  }
  .about .introduce .title {
    background: url('../images/about/bg_title.png') 0 0 no-repeat;
    background-size: 100% 100%;
    width: 68%;
    height: .6rem;
    color: #fff;
    line-height: .48rem;
    margin-bottom: .2rem;
  }
  .about .introduce .unit1 {
    width: 94%;
    height: 4.5rem;
    position: relative;
    top: -.3rem;
    margin-left: 3%;
    background: url("../images/about/unit1-bg.png") 0 0 no-repeat;
    padding: .45rem .2rem .2rem;
    background-size: 100% 100%;
  }
  .about .introduce .unit2,
  .about .introduce .unit3,
  .about .introduce .unit4 {
    width: 94%;
    margin-left: 3%;
    border: 2px solid #fff4d5;
    box-sizing: border-box;
    background-color: #fffdf7;
    padding: .4rem .2rem .2rem;
    margin-bottom: .3rem;
  }
  .about .introduce .unit2 {
    padding-bottom: 0.2rem !important;
  }
  .about .introduce .unit2 p {
    text-align: center;
  }
  .about .introduce .unit3 .content ul > li {
    padding-left: .3rem;
    margin-bottom: .15rem;
  }
  .about .introduce .unit3 .content ul > li p {
    display: inline-block;
    padding: 0rem .3rem;
    background-color: #e6e6e6;
    border-radius: .8rem;
    text-align: center;
    margin-left: -0.2rem;
  }
  /*高管团队*/
  .about .topTeam {
    margin: 0rem .2rem .4rem;
    border: 2px solid #fff4d5;
    background-color: #fffdf7;
  }
  .about .topTeam .part1 .top_title,
  .about .topTeam .part1 .top_title1,
  .about .topTeam .part1 .top_title2,
  .about .topTeam .part1 .top_title3 {
    background: url('../images/about/bg_title.png') no-repeat;
    background-size: 77% 100%;
    height: .6rem;
    text-align: center;
    margin: .2rem 0 0 .2rem;
  }
  .about .topTeam .part1 .top_title p,
  .about .topTeam .part1 .top_title1 p,
  .about .topTeam .part1 .top_title2 p,
  .about .topTeam .part1 .top_title3 p {
    width: 93%;
    margin-bottom: 0;
    color: #fff;
    text-align: center;
    line-height: .5rem;
  }
  .about .topTeam .part1 .top_title p .t_title,
  .about .topTeam .part1 .top_title1 p .t_title,
  .about .topTeam .part1 .top_title2 p .t_title,
  .about .topTeam .part1 .top_title3 p .t_title {
    font-size: .2rem;
  }
  .about .topTeam .part1 .top_title1 {
    background-position: right;
  }
  .about .topTeam .part1 .top_title1 p {
    margin-bottom: 0;
    color: #fff;
    text-align: center;
    line-height: .55rem;
  }
  .about .topTeam .part1 .top_title3 {
    background-position: right;
  }
  .about .topTeam .part1 .top_title3 p {
    width: 79%;
    text-align: right;
  }
  .about .topTeam .part1 .content {
    margin-bottom: .5rem;
  }
  .about .topTeam .part1 .content .lf_text {
    width: 64%;
    overflow: hidden;
    margin-top: .3rem;
    text-align: justify;
  }
  .about .topTeam .part1 .content .lf_text .circle {
    width: 8%;
    color: #fcb165;
    font-size: .22rem;
    margin-top: 3px;
  }
  .about .topTeam .part1 .content .lf_text .text {
    width: 85%;
    font-size: .22rem;
    padding-bottom: .5rem;
    color: #5a5959;
  }
  .about .topTeam .part1 .img,
  .about .topTeam .part1 .img1,
  .about .topTeam .part1 .img2 {
    position: absolute;
    bottom: 0;
  }
  .about .topTeam .part1 .img {
    right: -0.2rem;
  }
  .about .topTeam .part1 .img1,
  .about .topTeam .part1 .img2  {
    left: 0rem;
  }
  .about .callMe {
    margin: 0rem .2rem .4rem;
    border: 2px solid #fff4d5;
    background-color: #fffdf7;
    text-align: left;
  }
  .about .callMe .content {
    margin: .3rem 0 0 .2rem;
  }
  .about .callMe .content .icon {
    width: 8%;
    color: #fcb165;
  }
  .about .callMe .content .text {
    width: 85%;
    color: #757575;
    border-bottom: 1px solid #fcbc7e;
    padding-bottom: .2rem;
  }
  .about .partner .partner-units {
    padding: 0 .2rem .4rem;
  }
  .about .partner .partner-units ul {
    display: block;
    background-color: #fffdf7;
    border: 2px solid #fff4d5;
    padding: .4rem 0;
  }
  .about .partner .partner-units ul li p {
    width: 85%;
    margin: 0.2rem auto 0;
    color: #5a5959;
    text-align: justify;
  }
  .about .partner .partner-units ul li .line {
    border-bottom: 1px solid #fff4d5;
    width: 86%;
    margin: .3rem auto;
  }
  .about .partner .partner-units ul li .line p {
    width: .2rem;
    height: .2rem;
    background-color: #fff4d5;
    right: 0;
    top: -0.4rem;
  }
</style>
