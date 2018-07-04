<template>
  <div class="beanMall">
    <div class="banners position-re" id="wrapper">
        <ul class="poster-list">
          <li v-for="item in banners">
            <img v-bind:src="item.src" alt="" width="100%">
          </li>
        </ul>
    </div>
    <ul class="tabs">
      <li class="fl" @click="toBeanDeatil()">
        <img src="../../images/beans/bean-icon.png" alt="" width="18%">
        <p>宏豆<span> {{bean}}</span></p>
      </li>
      <li class="fr" @click="toBeanRecord()">
        <img src="../../images/beans/bean-record.png" alt="" width="17.5%">
        <p>兑换记录</p>
      </li>
    </ul>
    <div class="magn-top"></div>
  </div>
</template>
<script>
  import {Carousel} from '../../service/mCarousel'
  export default {
    data () {
      return {
        banners: [
          {
            src: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png'
          },
          {
            src: 'https://www.hongcai.com/uploads/png/original/2018-02-02/image/afb2684713c347db8769dfcd167e136f-original.png'
          },
          {
            src: 'https://www.hongcai.com/uploads/png/original/2018-03-19/image/10b378cb80d74e47babf870fbdabc0fc-original.png'
          }
        ],
        Interval: null,
        bean: 20020290
      }
    },
    props: ['token'],
    watch: {
    },
    created () {
      this.Interval = setInterval(function () {
        Carousel.next()
      }, 3000)
    },
    mounted () {
      this.setCarousel()
    },
    methods: {
      setCarousel () { // 礼包布局配置
        var wrapper = document.getElementById('wrapper')
        Carousel.mCarousel(wrapper, {
          index: 0,
          active: 'active',
          scale: 0.67,
          duration: 300,
          locked: true,
          diff: 0.445
        })
      },
      toBeanDeatil () {
      }
    },
    destroyed () {
      clearInterval(this.Interval)
    }
  }
</script>
<style scoped>
  .magn-top {
    background: #ecebf1;
    height: .35rem;
  }
  .banners {
    overflow: hidden;
    width: 100%;
    height: 2.9rem;
    padding: .3rem 0;
  }
  .poster-list li {
    width: 75.6%;
    height: 2.2rem;
    border-radius: 10px;
    background-color: #fff9f9;
  }
  .poster-list li img {
    border-radius: 10px;
  }
  .tabs {
    overflow: hidden;
    padding: 0 5% .3rem;
    background: #fff;
  }
  .tabs li {
    width: 47.2%;
    height: 1rem;
    padding: .1rem 0;
    border-radius: 12.5px;
    background-color: #ffffff;
    box-shadow: -0.1px 1px 15px 0 rgba(151, 61, 7, 0.1);
  }
  .tabs li p {
    color: #666;
    font-size: .23rem;
  }
  .tabs li p span {
    color: #ff6000;
    font-size: .24rem;
  }
</style>
