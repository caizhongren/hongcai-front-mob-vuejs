<template>
  <div class="home">
      <!-- 轮播banner图 -->
      <div id="slideBanner" class="slide-banner position-re overflow-hid" >
        <div class="slide position-re">
          <ul>
            <li class="position-re text-center">
              <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
            </li>
            <li class="position-re text-center">
              <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
            </li>
            <li class="position-re text-center">
              <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
            </li>
            <li class="position-re text-center">
              <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
            </li>
          </ul>
          <div class="dot">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <!--常见问题-->
      <div class="symptom bg-white">
        <div class="title symptom-title bd-t-eee bd-b-eee pad-40">
          <p class="display-inb ft-444 text-left ft-30"><span class="line display-inb bg-blue"></span>孩子的常见问题</p><p class="display-inb ft-999 text-right ft-24">更多</p>
        </div>
        <div class="symptom-list bd-b-eee">
          <ul>
            <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
            <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
            <li class="margin-r-0 display-inb"><img src="../images/home/symptom11.png" alt=""></li>
            <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
            <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
            <li class="margin-r-0 display-inb"><img src="../images/home/symptom11.png" alt=""></li>
          </ul>
        </div>
      </div>
      <!--专家推荐-->
      <div class="expert bg-white">
        <div class="title expert-title bd-t-eee bd-b-eee pad-40">
          <p class="display-inb ft-444 text-left ft-30"><span class="line display-inb bg-blue"></span>专家推荐</p><p class="display-inb ft-999 text-right ft-24">更多</p>
        </div>
        <ul>
          <li class="pad-40 bd-b-eee">
            <!--<div class="portrait display-inb"></div>-->
            <div class="portrait display-inb"><div class="portrait-inner"><img src="../images/home/boy.png" alt="" class="header" width="100%"></div></div>
            <div class="info display-inb">
              <div class="name"><p class="ft-28 ft-444 display-inb text-left">叶问</p><p class="ft-red ft-28 display-inb text-right ft-Arial">50</p></div>
              <p class="ft-24 ft-999"><span>北京大学心理学教授</span><span>儿童教育学专家</span></p> 
              <p class="ft-24 ft-999">擅长：儿童心理问题诊断治疗，帮助建立良好复</p>     
            </div>
          </li>
          <li class="pad-40 bd-b-eee">
            <!--<div class="portrait display-inb"></div>-->
            <div class="portrait display-inb"><div class="portrait-inner"><img src="../images/home/boy.png" alt="" class="header" width="100%"></div></div>
            <div class="info display-inb">
              <div class="name"><p class="ft-28 ft-444 display-inb text-left">叶问</p><p class="ft-red ft-28 display-inb text-right ft-Arial">50</p></div>
              <p class="ft-24 ft-999"><span>北京大学心理学教授</span><span>儿童教育学专家</span></p> 
              <p class="ft-24 ft-999">擅长：儿童心理问题诊断治疗，帮助建立良好复</p>     
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  // import '../js/swipeSlide.js'
  export default {
    name: 'home',
    data () {
      return {
        msg: '你好你好你哈哈的护肤环节'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pad-40 {
    padding-left: .4rem;
    padding-right: .4rem;
  }
  .bd-t-eee {
    border-top: 1px solid #eee;
  }
  .bd-b-eee {
    border-bottom: 1px solid #eee;
  }
  /*常见问题*/
  .symptom .title, .expert .title {
    padding-top: .23rem;
    padding-bottom: .22rem;
    display: table;
    width: 100%;
  }
  .title p {
    width: 50%;
    display: table-cell;
  }
  .title .line {
    height: .28rem;
    width: .05rem;
    background-color: #31cfff;
    margin-right: .06rem;
  }
  .symptom-list {
    padding: .2rem .4rem;
  }
  .symptom-list ul li img{
    /*width: 27.5%;*/
    /*margin-right: .022rem;*/
    /*height: 1.95rem;*/
    display: block;
    background-color: pink;
  }
  /*推荐专家*/

  .expert .portrait .portrait-inner {
    width: .98rem;
    height: .98rem;
    border-radius: 50%;
    text-align: left;
  }
  .expert ul li {
    padding-top: .4rem;
    padding-bottom: .4rem;
  }
  .expert .portrait {
    width: 20%;
  }
  .expert .info {
    width: 78%;
    text-align: justify;
  }
  .expert .info .name p {
    width: 50%;
  }
  /*投资页轮播*/
  .slide-banner {
    margin: 0 auto;
  }
  .bd{
    z-index:0;
  }
  .bd li a img {
    vertical-align:top;
    width:100%;
  }
  .home {
    background-color: #f8f5f5;
    width: 100%; 
    background-color: #f8f5f5; 
    margin-bottom: 0.8rem;
  }
  .slide-banner, .modules {
    margin-bottom: 0.3rem; 
  }
  .slide{
      position: relative;
      /*max-width: 640px;*/
      overflow: hidden;
      margin: 0 auto;
  }
  .slide:after{
      content: '';
      display: block;
      width: 100%;
      padding-top: 50%;
  }
  .slide ul{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
  }
  .slide li{
      list-style: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
  }
  /* 解决js阻塞页面显示首屏 */
  .slide li:first-child{
      z-index: 1;
  }
  .slide li img{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: none;
  }
  .slide .dot{
      position: absolute;
      right: 40%;
      bottom: 10px;
      z-index: 5;
      font-size: 0;
  }
  .slide .dot span{
      display: inline-block;
      width: .22rem;
      height: .22rem;
      margin-left: .12rem;
      background-color: #f8f5f5;
      border-radius: 50%;
  }
  .slide .dot .cur{
      background-color: #fff;
      border: 0.02rem solid #42b9ff;
  }
</style>
