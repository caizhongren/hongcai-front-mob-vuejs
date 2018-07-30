<template>
  <div class="beanExchange" v-show="showPage">
    <ul class="exchangeLists" v-if="exchangeLists.length > 0">
      <li v-for="item in exchangeLists" @click="toDetail(item.orderNumber)">
        <img v-bind:src="baseFileUrl + item.imgUrl" alt="" width="10%">
        <div class="description">
          <p class="title">{{item.goodsName}}<span v-if="item.gradeName">-{{item.gradeName}}</span></p>
          <p class="time">{{item.orderTime | dateTime}} <span>查看详情 ></span></p>
        </div>
      </li>
      <div class="loadMore clearfix" @click="loadMore()" v-if="page < totalPage">查看更多</div>
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
        page: 1,
        pageSize: 10,
        totalPage: 1,
        exchangeLists: [],
        showPage: false
      }
    },
    props: ['token', 'baseFileUrl'],
    watch: {
    },
    created () {
      this.$parent.token ? this.getRecord(this.page) : null
    },
    mounted () {
      document.getElementById('app').offsetHeight < document.documentElement.clientHeight ? document.querySelector('.beanExchange').style.minHeight = document.documentElement.clientHeight + 'px' : null
    },
    methods: {
      loadMore () {
        this.page = this.page + 1
        this.getRecord(this.page)
      },
      toDetail (number) {
        this.$router.push({name: 'exchangeDetail', params: {number: number}, query: {dbnewopen: 1}})
      },
      getRecord (page) {
        var that = this
        that.$http('/hongcai/rest/activitys/points/orders?token=' + that.$parent.token + '&page=' + page + '&pageSize=' + that.pageSize).then(function (res) {
          that.showPage = true
          if (res && res.data) {
            that.totalPage = res.data.totalPage
            var exchangeLists = res.data.data
            for (var i = 0; i < exchangeLists.length; i++) {
              that.exchangeLists.push(exchangeLists[i])
            }
          }
        }).catch(function (error) {
          console.log(error.toString())
        })
      }
    }
  }
</script>
<style scoped>
  .loadMore {
    padding: .35rem;
    color: #666;
  }
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
    padding: .32rem;
  }
  .exchangeLists li img {
    float: left;
    width: 15%;
  }
  .exchangeLists li .description {
    float: left;
    width: 85%;
    text-align: left;
    padding-left: .2rem;
  }
  .exchangeLists li .description .title {
    line-height: 1.33;
    color: #666;
    font-size: .25rem;
    margin: .03rem 0 .2rem;
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
