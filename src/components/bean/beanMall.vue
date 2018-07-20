<template>
  <div class="beanMall">
    <div class="banners position-re" id="wrapper">
        <ul class="poster-list">
          <li v-for="item in banners" @click="toDetail(item.linkUrl)">
            <img v-bind:src="item.imageUrl" alt="" width="100%">
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
        <li v-for="item in giftLists" @click="toRouter(2, item.goodsNumber)">
          <div class="icon">
            <img v-bind:src="baseFileUrl + item.imgUrl" alt="" width="85%">
          </div>
          <p class="name">{{item.goodsName}}</p>
          <div class="description">
            <span>{{item.beans}}</span>
            <img src="../../images/beans/bean-icon.png" alt="" width="9%">
            <p v-if="item.tag">{{item.tag}}</p>
          </div>
        </li>
        <div class="clearfix ft-666" @click="loadMore()" v-if="page < totalPage">查看更多</div>
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
        banners: [],
        Interval: null,
        page: 1,
        pageSize: 10,
        totalPage: 1,
        giftLists: [],
        baseBanner: [
          {
            imageUrl: 'http://test321.hongcai.com/uploads/png/original/2018-07-13/image/4f9b31ae1d424b129901bb8b6ffc7bea-original.png',
            linkUrl: ''
          }
        ]
      }
    },
    props: ['token', 'bean', 'baseFileUrl'],
    watch: {
      '$parent.token': function (val) {
        bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
          // 1 需要显示 0 不需要显示
          isShow: 0
        }, function (res) {}, null)
      },
      'banners': function (val) {
        var that = this
        if (val.length > 0) {
          setTimeout(function () {
            that.setCarousel()
          }, 10)
          if (val.length === 1) {
            return
          }
          that.Interval = setInterval(function () {
            Carousel.next()
          }, 3000)
        }
      }
    },
    created () {
      this.getBanners()
      this.getGoods(this.page)
      bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
        // 1 需要显示 0 不需要显示
        isShow: 0
      }, function (res) {}, null)
    },
    mounted () {
    },
    methods: {
      loadMore () {
        this.page = this.page + 1
        this.getGoods(this.page)
      },
      getGoods (page) {
        var that = this
        that.$http('/hongcai/rest/activitys/points/goods?page=' + page + '&pageSize=' + that.pageSize).then(function (res) {
          if (res && res.data) {
            that.totalPage = res.data.totalPage
            var giftLists = res.data.data
            for (var i = 0; i < giftLists.length; i++) {
              that.giftLists.push(giftLists[i])
            }
          }
        }).catch(function (error) {
          console.log(error.toString())
        })
      },
      getBanners () {
        var that = this
        that.$http('/hongcai/rest/banners/activity?type=3&isShow=1&locale=10&count=10').then(function (res) {
          if (res && res.ret !== -1) {
            that.banners = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
          that.banners = that.baseBanner
        })
      },
      setCarousel () { // 礼包布局配置
        var wrapper = document.getElementById('wrapper')
        Carousel.mCarousel(wrapper, {
          index: 0,
          active: 'active',
          scale: 0.68,
          duration: 300,
          locked: true,
          diff: 0.403
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
        if (this.toLogin() && link) {
          window.location.href = link + '?token=' + this.$parent.token
        }
      },
      toRouter (type, goodsNumber) {
        if (this.toLogin()) {
          if (type === 0) {
            this.$router.push({name: 'BeanDetail', query: {dbnewopen: 1}})
          } else if (type === 1) {
            this.$router.push({name: 'BeanRecord', query: {dbnewopen: 1}})
          } else if (type === 2) {
            this.$router.push({name: 'BeanCommodity', params: {goodsNumber: goodsNumber}, query: {dbnewopen: 1}})
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
    background: #efeef4;
    height: .28rem;
  }
  .banners {
    overflow: hidden;
    width: 100%;
    height: 2.72rem;
    padding: .3rem 0;
  }
  .poster-list li {
    width: 85%;
    height: 2.2rem;
    border-radius: 10px;
    background-color: #fff9f9;
    overflow: hidden;
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
    font-size: .25rem;
  }
  .tabs li p span {
    color: #ff6000;
    font-size: .26rem;
  }
  .gifts .title {
    color: #666;
    font-size: .25rem;
    overflow: hidden;
    margin: .35rem 0 0 .35rem;
  }
  .gifts .title p {
    float: left;
    height: .28rem;
    line-height: .31rem;
    margin-left: .1rem;
  }
  .gifts .title span {
    float: left;
    width: .12rem;
    height: .265rem;
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
    min-height: 2.67rem;
  }
  .giftList li:nth-child(odd) {
    float: left;
  }
  .giftList li:nth-child(even) {
    float: right;
  }
  .giftList li .icon {
    background-color: #f4f1f2;
    border-radius: 10px 10px 0 0;
    padding: .2rem .03rem .1rem;
  }
  .giftList li .name {
    color: #666;
    font-size: .23rem;
    margin: .2rem auto 0rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .giftList li .description {
    white-space: nowrap;
    overflow: hidden;
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
    max-width: 1.2rem;
  }
</style>
