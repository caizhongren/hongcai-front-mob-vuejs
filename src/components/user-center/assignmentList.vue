<template>
  <div class="assignmentList" v-auto-height>
    <ul class="list-title">
      <li>受让人</li>
      <li>转让本金(元)</li>
      <li>转让时间</li>
    </ul>
    <div class="no-record" v-if="assignmentOrder.length <= 0">
      <img src="../../images/project/no-record.png" width="35%" class="no-record">
      <p class="ft-grey4 margin-b-0 margin-t-1p5">暂无记录</p>
    </div>
    <ul class="list" v-else="assignmentOrder.length > 0">
      <li v-for="order in assignmentOrder">
        <span>{{order.userName}}</span>
        <span>{{order.orderAmount}}</span>
        <span>{{order.createTime | date}}</span>
      </li>
      <div class="loadMuch text-center" @click="loadMore">查看更多</p></div>
    </ul>
    <img class="common-bg" src="../../images/common-bg.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'assignmentList',
    data () {
      return {
        assignmentOrder: [
          // {userName: '1', orderAmount: 1, createTime: 1500007748123},
          // {userName: '2', orderAmount: 2, createTime: 1500007748123},
          // {userName: '3', orderAmount: 3, createTime: 1500007748123}
        ]
      }
    },
    created: function () {
      this.assignmentNumber = this.$route.params.number
      this.getAssignmentOrder()
    },
    methods: {
      getAssignmentOrder: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/assignments/' + that.assignmentNumber + '/orders?token=6261f5e1e9eb93e9479f8cf19c1b2e986ab535d7a0e01c51&page=1&pageSize=2'
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.assignmentOrder = res.data.data
            console.log(that.assignmentOrder)
          }
        })
      },
      loadMore: function () {
        alert(11)
      }
    },
    filters: {
      limit: function (arr, limit) {
        return arr.slice(0, parseInt(limit))
      }
    }
  }
</script>

<style>
  .assignmentList {
    position: relative;
    z-index: 2222;
  }
  .no-record img {
    padding: 2rem 0 .5rem;
  }
  .common-bg {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 222;
  }
  .loadMuch {
    color: #666;
    font-size: .24rem;
    padding: .2rem 0 .5rem;
    position: relative;
    z-index: 2222;
  }
  .list-title {
    overflow: hidden;
    clear: both;
  }
  .list-title li {
    float: left;
    width: 33.3%;
    height: 1.1rem;
    line-height: 1.1rem;
    background-color: #fff;
    font-size: .3rem;
    color: #fa6943;
    text-align: center;
    border-bottom: 1px solid #fa6943;
  }
  .list li {
    overflow: hidden;
    clear: both;
  }
  .list li span {
    float: left;
    width: 33.3%;
    height: .9rem;
    line-height: .9rem;
    font-size: .26rem;
    color: #666;
    text-align: center;
  }
</style>
