<template>
  <div class="beanExchange">
    <ul class="exchangeLists">
      <li v-for="item in exchangeLists">
        <img v-bind:src="item.imgSrc" alt="" width="10%">
        <div class="description">
          <p class="title">{{item.title}}</p>
          <p class="time">{{item.time | dateTime}} <span @click="toDetail(item.number)">查看详情 ></span></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        exchangeLists: [
          {
            number: 0,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            title: '饿了么4-15元优惠券',
            time: 8811111111
          },
          {
            number: 1,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            title: '饿了么4-15元优惠券',
            time: 1111111111
          },
          {
            number: 2,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            title: '饿了么4-15元优惠券',
            time: 1111111111
          },
          {
            number: 3,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            title: '饿了么4-15元优惠券',
            time: 1111111111
          },
          {
            number: 4,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            title: '饿了么4-15元优惠券',
            time: 1111111111
          },
          {
            number: 5,
            imgSrc: 'https://www.hongcai.com/uploads/png/original/2018-02-11/image/e5c9965aa4554b7baf25f10186f829a2-original.png',
            title: '饿了么4-15元优惠券',
            time: 1111111111
          }
        ]
      }
    },
    props: ['token'],
    watch: {
    },
    created () {
    },
    mounted () {
      document.getElementById('app').offsetHeight < document.documentElement.clientHeight ? document.querySelector('.beanExchange').style.height = window.innerHeight + 'px' : null
    },
    methods: {
      toDetail (number) {
        this.$router.push({name: 'exchangeDetail', params: {number: number}})
      }
    }
  }
</script>
<style scoped>
  .beanExchange {
    background: #ecebf1;
    width: 100%;
  }
  .exchangeLists li {
    background: #fff;
    border-bottom: 1px solid #eee;
    height: .8rem;
    padding: .45rem .4rem .3rem;
  }
  .exchangeLists li img {
    float: left;
    width: 15%;
  }
  .exchangeLists li .description {
    float: left;
    width: 85%;
    text-align: left;
    padding-left: .35rem;
  }
  .exchangeLists li .description .title {
    line-height: 1.33;
    color: #666;
    font-size: .25rem;
    margin-bottom: .25rem;
  }
  .exchangeLists li .description .time {
    color: #999;
    font-size: .2rem;
  }
  .time span {
    color: #ff6000;
    float: right;
  }
</style>
