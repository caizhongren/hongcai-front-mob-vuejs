<template>
  <div class="beanMall">
    <div class="banners position-re" id="wrapper">
        <ul class="poster-list">
          <li v-for="item in banners" @click="toDetail(item.link)">
            <img v-bind:src="item.src" alt="" width="100%">
          </li>
        </ul>
    </div>
    <ul class="tabs">
      <li class="fl" @click="toRouter(0)">
        <img src="../../images/beans/bean-icon.png" alt="" width="18%">
        <p>宏豆<span v-if="$parent.token && $parent.token !== ''"> {{bean}}</span></p>
      </li>
      <li class="fr" @click="toRouter(1)">
        <img src="../../images/beans/bean-record.png" alt="" width="17.5%">
        <p>兑换记录</p>
      </li>
    </ul>
    <div class="magn-top"></div>
    <div class="gifts">
      <div class="title"><span></span> <p>大家都在兑</p></div>
      <ul class="giftList">
        <li v-for="item in giftLists" @click="toRouter(2, item.id)">
          <div class="icon">
            <img v-bind:src="item.imgSrc" alt="" width="80%">
          </div>
          <p class="name">{{item.name}}</p>
          <div class="description">
            <span>{{item.bean}}</span>
            <img src="../../images/beans/bean-icon.png" alt="" width="9%">
            <p>{{item.label}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Carousel} from '../../service/mCarousel'
  import {bridgeUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        banners: [
          {
            link: 'https://app.hongcai.com',
            src: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png'
          },
          {
            link: 'https://app.hongcai.com',
            src: 'https://www.hongcai.com/uploads/png/original/2018-02-02/image/afb2684713c347db8769dfcd167e136f-original.png'
          },
          {
            link: 'https://app.hongcai.com',
            src: 'https://www.hongcai.com/uploads/png/original/2018-03-19/image/10b378cb80d74e47babf870fbdabc0fc-original.png'
          }
        ],
        Interval: null,
        giftLists: [
          {
            id: 0,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            name: '饿了么4-15元优惠券',
            label: '限时特惠',
            bean: 88
          },
          {
            id: 1,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            name: '饿了么4-15元优惠券',
            label: '限时特惠',
            bean: 88
          },
          {
            id: 2,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            name: '饿了么4-15元优惠券',
            label: '限时特惠',
            bean: 88
          },
          {
            id: 3,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            name: '饿了么4-15元优惠券',
            label: '限时特惠',
            bean: 88
          },
          {
            id: 4,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            name: '饿了么4-15元优惠券',
            label: '限时特惠',
            bean: 88
          },
          {
            id: 5,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            name: '饿了么4-15元优惠券',
            label: '限时特惠',
            bean: 88
          }
        ]
      }
    },
    props: ['token', 'bean'],
    watch: {
      '$parent.token': function (val) {
        bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
          // 1 需要显示 0 不需要显示
          isShow: 0
        }, function (res) {}, null)
        val && val !== '' ? this.getUserPoints() : null
      }
    },
    created () {
      bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
        // 1 需要显示 0 不需要显示
        isShow: 0
      }, function (res) {}, null)
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
      toLogin () {
        if (!this.$parent.token || this.$parent.token === '') {
          bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {}, null)
          return false
        }
        return true
      },
      toDetail (link) {
        if (this.toLogin()) {
          window.location.href = link
        }
      },
      toRouter (type, id) {
        if (this.toLogin()) {
          if (type === 0) {
            this.$router.push({name: 'BeanDetail'})
          } else if (type === 1) {
            this.$router.push({name: 'BeanRecord'})
          } else if (type === 2) {
            this.$router.push({name: 'BeanCommodity', params: {id: id}})
          }
        }
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
    padding: 0.1rem 5% .3rem;
    background: #fff;
  }
  .tabs li {
    width: 47.2%;
    height: 1rem;
    padding: .1rem 0;
    border-radius: 12.5px;
    background-color: #ffffff;
    box-shadow: 1px 2px 15px 0 rgba(151, 61, 7, 0.1);
  }
  .tabs li p {
    color: #666;
    font-size: .23rem;
  }
  .tabs li p span {
    color: #ff6000;
    font-size: .24rem;
  }
  .gifts .title {
    color: #666;
    font-size: .25rem;
    overflow: hidden;
    margin: .35rem 0 0 .35rem;
  }
  .gifts .title p {
    float: left;
    height: .34rem;
    line-height: .38rem;
    margin-left: .1rem;
  }
  .gifts .title span {
    float: left;
    width: .14rem;
    height: .34rem;
    border-radius: 3.5px;
    background-image: linear-gradient(to top, #fb9d1c, #ffc868);
  }
  .giftList {
    overflow: hidden;
    padding: .5rem .35rem;
  }
  .giftList li {
    width: 45%;
    margin-bottom: .5rem;
    box-shadow: -0.1px 1px 4px 0 rgba(73, 30, 5, 0.08);
    border-radius: 10px;
    padding-bottom: .05rem;
  }
  .giftList li:nth-child(odd) {
    float: left;
  }
  .giftList li:nth-child(even) {
    float: right;
  }
  .giftList li .icon {
    background: #f4f1f2;
    border-radius: 10px 10px 0 0;
    padding: .28rem .03rem .12rem;
  }
  .giftList li .name {
    color: #666;
    font-size: .23rem;
    margin: .2rem auto 0.1rem;
  }
  .giftList li .description span {
    color: #ff6000;
    font-size: .28rem;
    font-family: Arial;
    margin-right: .04rem;
  }
  .giftList li .description img {
    vertical-align: text-top;
  }
  .giftList li .description p {
    display: inline-block;
    color: #fff;
    font-size: .2rem;
    padding: .01rem .055rem 0rem;
    border-radius: 2px;
    background-color: #fd8f1d;
    transform: scale(.85);
    -webkit-transform: scale(.85) translateY(-3px);
  }
</style>
