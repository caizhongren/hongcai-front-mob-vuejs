<template>
  <div class="management">
    <div class="management-carousel">
      <!-- 高管轮播  -->
      <div class="btns position-re">
        <img class="prev position-ab" src="../../images/about/prev.png" alt="" width="5%">
        <img class="next position-ab" src="../../images/about/next.png" alt="" width="5%">
      </div>
      <div class="position-re carousel-mask">
        <div id="wrapper">
          <ul class="poster-list">
            <li class=""><img class="poster-item" src="../../images/about/lg.png" alt="" width="80%"></li>
            <!-- <li class=""><img class="poster-item" src="../../images/about/lq.png" alt="" width="80%"></li> -->
            <li class=""><img class="poster-item" src="../../images/about/wb.png" alt="" width="80%"></li>
            <li class=""><img class="poster-item" src="../../images/about/zf.png" alt="" width="80%"></li>
          </ul>
        </div>
      </div>
      <!-- 高管介绍  -->
      <div class="management-introduction" v-for="(people, index) in managements">
        <div class="title">
          <span class="line1"></span>
          <span class="line2"></span>
          <div>
            <span class="fl vertical-line"></span>
            <p>{{people.name}} <span class="position">{{people.position}}</span></p>
          </div>
          <span class="circle"></span>
          <span class="line3"></span>
        </div>
        <div class="content">
          {{people.description}}
        </div>
      </div>
    </div>
    <img src="../../images/about/parting-line.png" alt="" class="display-bl margin-auto" width="99%">
    <!-- 我们想要对您说  -->
    <div class="want-to-say">
      <div class="head">
        <span class="us-circle">
        </span>
        <p class="head-text">
          <span class="font-w">我们</span>想要对您说
          <p class="talk">WE WANT TO TALK TO YOU</p>
        </p>
      </div>
      <div class="content clearfix">
        <ul>
           <li class="people">
            <img src="../../images/about/wwt.png" alt="" width="100%" height="100%">
            <p>产品经理</p>
          </li>
          <li class="people">
            <img src="../../images/about/triangle4.png" alt="">
            <p>我们用最严谨的态度做金融，只为您更放心地用产品。</p>
          </li>
          <li class="people">
            <img src="../../images/about/fs.png" alt="" width="100%" height="100%">
            <p>产品经理</p>
          </li>
          <li class="people">
            <img src="../../images/about/triangle2.png" alt="">
            <p>三年的上千次迭代，只为等待你的到来。</p>
          </li>
          <li class="people">
            <img src="../../images/about/lj.png" alt="" width="100%" height="100%">
            <p>技术经理</p>
          </li>
          <li class="people">
            <img src="../../images/about/triangle5.png" alt="">
            <p>每个细节的优化，都是为了带给您更好的体验。</p>
          </li>
          <li class="people">
            <img src="../../images/about/yxy.png" alt="" width="100%" height="100%">
            <p>运营经理</p>
          </li>
          <li class="people">
            <img src="../../images/about/triangle3.png" alt="">
             <p>汇金融财，尽在宏财！</p>
          </li>
          <li class="people">
            <img src="../../images/about/ywb.png" alt="" width="100%" height="100%">
            <p>运营经理</p>
          </li>
          <li class="people">
            <img src="../../images/about/triangle5.png" alt="">
             <p>想做那个比你更了解你自己的人</p>
          </li>
          <li class="people">
            <img src="../../images/about/wxt.png" alt="" width="100%" height="100%">
            <p>公关经理</p>
          </li>
          <li class="people">
            <img src="../../images/about/triangle2.png" alt="">
             <p>让宏财开启你的“睡”后收入。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {Carousel} from '../../service/mCarousel.js'
  export default {
    name: 'managementTeam',
    data () {
      return {
        managements: [
          {
            name: '刘刚',
            position: '董事长',
            description: '中国人民大学管理学博士。曾在国务院国资委下属的中国企业联合会担任管理创新处处长，参与国务院国资委发起的中央企业管理提升工作，非常熟悉国内企业管理状况，执笔起草的多份企业管理方面的报告获中央领导的重要批示。现担任宏财网董事长兼CEO，同时担任首都企业改革研究会常务理事、首都经济贸易大学MBA导师（金融学方向）、芜湖市镜湖区人力资源和社会保障局创业导师。2015年成为《当代经理人》杂志封面人物。'
          },
          // {
          //   name: '李青',
          //   position: '执行董事兼风控委员会首席风控官 ',
          //   description: '厦门大学金融学博士。曾在深圳创投、正道及大型金融控股集团任职，擅长行业状况分析，精通价格投资，长期负责企业上市及并购重组事宜，在创新创投项目工作方面具有深刻的见解与丰富的实战经验，擅长消费金融、小微金融产品设计和全流程风险管理。'
          // },
          {
            name: '王斌',
            position: 'CEO',
            description: '安徽大学金融专业毕业。2000年进入互联网行业，曾于搜狐、TOM网、猫扑、人人网、超图软件等公司长期负责品牌营销、市场公关。2014年进入互联网金融领域，作为市场合伙人加入金蛋理财，负责市场、运营。后任麦子金服旗下财神爷爷COO。曾为央视财经频道编著《对话》一书。任『CMO训练营』认证讲师。'
          },
          {
            name: '张枫',
            position: '技术总监',
            description: '北京航空航天大学硕士，拥有多年互联网金融领域技术研究、产品研发、团队管理等方面的经验，具备丰富的网站架构设计、并发设计以及互联网金融相关技术经验。'
          }
        ]
      }
    },
    created () {
    },
    mounted () {
      var peopleList = $('.people')
      var firstPeople = $('.people')[0]
      var h = $(firstPeople).width() * 0.884
      for (let i = 0; i < peopleList.length; i++) {
        peopleList[i].style.height = h + 'px'
      }
      var that = this
      var wrapper = document.getElementById('wrapper')
      Carousel.mCarousel(wrapper, {
        index: 0,
        active: 'active',
        scale: 0.6,
        duration: 300,
        locked: true,
        before: function () {
          that.carouselId = this.index
          console.log('切换开始')
        },
        after: function () {
          that.carouselId = this.index
          console.log('切换结束')
        }
      })
      document.querySelector('.next').onclick = function () {
        Carousel.next()
      }
      document.querySelector('.prev').onclick = function () {
        Carousel.prev()
      }
    }
  }
</script>
<style scoped>
  .management {
    padding: .3rem 0 0;
    overflow-x: hidden;
  }
  #wrapper {
    height: 4.6rem;
    width: 120%;
    left: -10%;
    margin: 0 auto;
  }
   #wrapper ul {
    overflow-x: hidden;
    height: 100%;
  } 
   #wrapper .btns {
     width: 100%;
  }
   .management-carousel .carousel-mask {
    overflow-x: hidden;
    width: 78%;
    left: 11%;
  } 
  .btns img:first-child {
    left: 0.25rem;
    top: 1.7rem;
    z-index: 90;
  }
  .btns img:last-child {
    right: 0.25rem;
    top: 1.7rem;
    z-index: 90;
  }
  .font-w {
    color: #fff !important;
  }
  .management-introduction {
    padding: 0 .3rem;
    color: #666;
  }
  .management-introduction .title {
    border-bottom: 1px solid #ff611d;
    box-shadow: 0 2px 0 0 rgba(250, 173, 140, 0.3);
    text-align: left;
    position: relative;
  }
  .line1, .line2, .line3 {
    width: 1px;
    background-color: #ff611d;
    transform: rotateZ(40deg);
    position: absolute;
  }
  .line1 {
    height: .65rem;
    left: 23%;
    top: -1rem;
  }
  .line2, .line3 {
    height: 0.3rem;
  }
  .line2 {
    left: 14%;
    bottom: 0.9rem;
  }
  .line3 {
    left: -.2rem;
    bottom: -0.9rem;
  }
  .title div {
    display: inline-block;
    min-width: 46%;
    line-height: 2.1;
    height: .65rem;
    box-shadow: 0 0.5px 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 5px;
  }
  .title div .fl {
    width: .08rem;
    height: .53rem;
    margin-top: .06rem;
    margin-left: -0.04rem;
    background-color: #ff611d;
    border-radius: 2px;
    box-shadow: 0 1px 3px 0 rgba(255, 77, 0, 0.51);
  }
  .title div p{
    margin-left: .2rem;
    font-size: .4rem;
  }
  .title div p span {
    margin: 0 .2rem;
    color: #ff611d;
    font-size: .28rem;
  }
  .title .circle {
    width: .32rem;
    height: .32rem;
    border-radius: 50%;
    background-color: #ff611d;
    position: absolute;
    left: -0.14rem;
    bottom: -.45rem;
  }
  .management-introduction .content {
    padding: .5rem 0 .5rem .1rem;
    text-align: justify;
    font-size: .26rem;
  }
  .head {
    background: url('../../images/about/triangle.png') no-repeat 34% 0.9rem;
    text-align: center;
    margin: .4rem 0;
  }
  .head .us-circle {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background-color: #ff611d;
    position: absolute;
    left: 18%;
    z-index: 1;
  }
  .head .head-text {
    position: relative;
    color: #666;
    letter-spacing: 5px;
    font-size: .45rem;
    line-height: 1.26rem;
    z-index: 22;
  }
  p.talk {
    font-size: .15rem;
	  letter-spacing: 1.3px;
    position: relative;
    left: 8%;
    bottom: .4rem;
  }
  .want-to-say .content {
    overflow-y: hidden;
  }
  .want-to-say .content ul {
    width: 100%;
  }
  .want-to-say .content ul li {
    float: left;
    display: block;
    width: 33.3%;
    position: relative;
    font-size: .24rem;
    color: #fff;
  }
  .want-to-say .content ul li:nth-child(2n-1) p{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    line-height: 0.6rem;
    opacity: 0.6;
	  background-color: #000000;
  }
  .want-to-say .content ul li:nth-child(2n){
    text-align: justify;
    color: #ffffff;
  }
  .want-to-say .content ul li:nth-child(2n) img {
    position: absolute;
  }
  .want-to-say .content ul li:nth-child(2n) p{
    width: 90%;
    margin: auto auto;
  }
  .want-to-say .content ul li:nth-child(2) {
    background-color: #fd8855;
  }
  .want-to-say .content ul li:nth-child(2) img {
    top: 10%;
    left: -7%;
  }
  .want-to-say .content ul li:nth-child(4) img {
    top: 10%;
    right: -7%;
    z-index: 2;
  }
  .want-to-say .content ul li:nth-child(6) img {
    top: -7%;
    right: 10%;
  }
  .want-to-say .content ul li:nth-child(8) img {
    top: 10%;
    right: -7%;
    z-index: 2;
  }
  .want-to-say .content ul li:nth-child(10) img {
    left: 10%;
    top: -7%;
    z-index: 2;
  }
  .want-to-say .content ul li:nth-child(12) img {
    top: 10%;
    left: -7%;
    z-index: 2;
     transform: rotateZ(180deg); 
  }
  .want-to-say .content ul li:nth-child(2) p, .want-to-say .content ul li:nth-child(4) p, .want-to-say .content ul li:nth-child(6) p {
    margin-top: .3rem;
  }
  .want-to-say .content ul li:nth-child(8) p, .want-to-say .content ul li:nth-child(10) p, .want-to-say .content ul li:nth-child(12) p {
    margin-top: .6rem;
  }
  .want-to-say .content ul li:nth-child(4), .want-to-say .content ul li:nth-child(12) {
    background-color: #646464;
  }
  .want-to-say .content ul li:nth-child(6), .want-to-say .content ul li:nth-child(10) {
    background-color: #fdaa7d;
  }
  .want-to-say .content ul li:nth-child(8) {
    background-color: #fd6202;
  }
</style>
