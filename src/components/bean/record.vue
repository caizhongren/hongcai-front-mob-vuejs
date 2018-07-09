<template>
  <div class="beanExchange">
    <ul class="exchangeLists" v-if="exchangeLists.length > 0">
      <li v-for="item in exchangeLists" @click="toDetail(item.number)">
        <img v-bind:src="item.imgSrc" alt="" width="10%">
        <div class="description">
          <p class="title">{{item.title}}</p>
          <p class="time">{{item.time | dateTime}} <span>查看详情 ></span></p>
        </div>
      </li>
    </ul>
    <div class="padding-t-1" v-else>
      <img src="../../images/project/no-record.png" width="35%" class="no-record">
      <p class="ft-grey4 margin-b-0 margin-t-1p5">暂无记录</p>
    </div>
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
      document.getElementById('app').offsetHeight < document.documentElement.clientHeight ? document.querySelector('.beanExchange').style.height = document.documentElement.clientHeight + 'px' : null
    },
    methods: {
      toDetail (number) {
        this.$router.push({name: 'exchangeDetail', params: {number: number}})
      }
    }
  }
</script>
<style scoped>
  .padding-t-1 {
    padding-top: 1rem;
  }
  .beanExchange {
    background: #ecebf1;
    width: 100%;
  }
  .exchangeLists li {
    background: #fff;
    border-bottom: 1px solid #eee;
    height: .8rem;
    padding: .32rem .4rem .32rem;
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
    margin: -.01rem 0 .25rem;
  }
  .exchangeLists li .description .time {
    color: #999;
    font-size: .22rem;
  }
  .time span {
    color: #ff6000;
    float: right;
  }
</style>
