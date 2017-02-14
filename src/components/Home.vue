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
  </div>
</template>

<script>
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
  .hd {
    top: 83%;
    left: 38%;
  }
  .hd li {
    display:inline-block;
    width:8px;
    height:8px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    background-color: black;
    opacity: .25;
    text-indent:-9999px;
    overflow:hidden;
    margin:0 6px;
  }
  .hd li.on {
    background:#fff;
    opacity: .75;
  }
  .main {
    background-color: #f8f5f5;
    width: 100%; 
    background-color: #f8f5f5; 
    margin-bottom: 0.8rem;
  }
  .slide-banner, .modules {
    margin-bottom: 0.3rem; 
  }
  .topic-list .newlist {
    padding: 0.2rem 0.4rem;
    border-top: 1px solid #eeeeee; 
    border-bottom: 1px solid #cccccc; 
  }
  .list-title {
    font-size: .256rem;
    margin-bottom: 0.3rem;
  }
  .list-lf {
    display: inline-block;
    width: 2.6rem;
    height: 0.9rem;
    background-color: #42b9ff;
    border-radius: 100px;
    padding-right: 0.5rem;
    margin-right: 0.22rem;
    position: relative
  }
  .portrait {
    border-radius: 50%; 
    position: absolute;
    width: .9rem;
    height: .89rem;
    left: 0;
    top: 0;
    box-shadow: 1px 1px 3px #033b5f;
  }
  .portraitUrl {
    border-radius: 50%;
    float: left;
    width: .9rem;
    height: .89rem;
    margin-left: -1px;
  }
  .horn {
    vertical-align: top;
    margin-top: 0.26rem; 
  }
  .list-rt .names {
    margin-bottom: 0.1rem;
  }
  .list-rt .names .name {
    font-size: 0.26rem;
    color: #444;
    margin-right: 0.3rem;
  }
  .list-rt .names .child {
    font-size: 0.24rem;
    color: #666;
  }
  .list-rt .honner {
    font-size: 0.24rem;
    color: #999;
  }
  .rewards {
    padding: 0.1rem 0.5rem;
    border-bottom: 1px solid #eee;
  }
  .rewards li {
    /*color: #ffa914;*/
    color: #999;
    font-size: 0.26rem;
    font-family: Arial;
    width: 31%;
    float: left;
    text-align: center;
  }
  .rewards li img {
    vertical-align: middle;
    margin-right: 0.1rem;
    width: 16%;
  }
  .rewards li span {
    vertical-align: middle;
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
