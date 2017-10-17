<template>
  <div class="about">
    <div class="slide-banner position-re overflow-hid" >
      <div class="slide position-re" id="slideBanner">
        <ul>
          <li class="position-re text-center">
            <a class="pic display-bl" @click="preview('http://note.youdao.com/yws/api/personal/file/WEB18903db9e85459edcaf48d29c76a3e52?method=download&shareKey=64145b43d807078f4c40ce2753179538')"><img src="../../images/disclosure/contract1.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl" @click="preview('http://note.youdao.com/yws/api/personal/file/WEBcb594dff25b72a9ed99303b7022fa0cc?method=download&shareKey=0fe424fd2e14df1283ec482bef305885')"><img src="../../images/disclosure/contract2.png" /></a>
          </li>
        </ul>
        <div class="dot">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <p>宏财网已正式接入银行资金存管系统</p>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {swiper} from '../../service/swipeSlide'
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'About',
    data () {
      return {
      }
    },
    methods: {
      preview: function (url) {
        bridgeUtil.webConnectNative('HCNative_ImgSrc', null, {'imgSrc': url}, function (response) {}, function (data) {
          alert(1)
        })
      }
    },
    mounted () {
      swiper.init({
        autoSwipe: true,
        axisX: true,
        continuousScroll: true,
        speed: 2000,
        transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        firstCallback: function (i, sum) {
          $('#slideBanner').find('.dot').children().first().addClass('cur')
        },
        callback: function (i, sum) {
          console.log(sum)
          $('#slideBanner').find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
        }
      })
    }
  }
</script>
<style scoped>
  p {
    color: #666666;
    font-size: .26rem;
  }
  .bd{
    z-index:0;
  }
  .bd li a img {
    vertical-align:top;
    width:100%;
  }
  .slide-banner {
    margin: 0.35rem auto .55rem;
    height: 4rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow: hidden;
    -webkit-transform:rotate(0deg)
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
  .slide ul{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide li{
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
    right: 0;
    bottom: 10px;
    z-index: 5;
    width: 100%;
    font-size: 0;
  }
  .slide .dot span{
    display: inline-block;
    width: .2rem;
    height: .2rem;
    margin-left: .18rem;
    background-color: #ddd;
    border-radius: 50%;
  }
  .slide .dot .cur{
    background-color: #ff611d;
  }
</style>
