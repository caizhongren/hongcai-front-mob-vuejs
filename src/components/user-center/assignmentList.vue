<template>
  <div class="assignmentList" v-auto-height>
    <ul class="list-title">
      <li>受让人</li>
      <li>转让本金(元)</li>
      <li>转让时间</li>
    </ul>
    <ul class="list" v-show="showOrder">
      <li v-for="order in assignmentOrder">
        <span>{{order.userName}}</span>
        <span>{{order.orderAmount}}</span>
        <span>{{order.createTime | date}}</span>
      </li>
      <div class="loadMuch text-center" @click="loadMore(limit)" v-if="assignmentOrderList.length > limit">查看更多</p></div>
    </ul>
    <div class="no-record" v-show="!showOrder">
      <img src="../../images/project/no-record.png" width="35%" class="no-record">
      <p class="ft-grey4 margin-b-0 margin-t-1p5">暂无记录</p>
    </div>
    <img class="common-bg" src="../../images/common-bg.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'assignmentList',
    data () {
      return {
        assignmentOrderList: [],
        assignmentOrder: [],
        limit: 10,
        showOrder: false
      }
    },
    created: function () {
      this.assignmentNumber = this.$route.params.number
      this.token ? this.getAssignmentOrder(this.limit) : null
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val && val !== '' ? this.getAssignmentOrder(this.limit) : null
      },
      assignmentOrder: function (val) {
        val.length > 0 ? this.showOrder = true : this.showOrder = false
      }
    },
    methods: {
      getAssignmentOrder: function (limit) {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/assignments/' + that.assignmentNumber + '/orders?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.assignmentOrderList = res.data.data
            that.assignmentOrder = that.assignmentOrderList.slice(0, limit)
            // console.log(that.assignmentOrder)
          }
        })
      },
      loadMore: function (limit) {
        this.limit = limit + 1
        this.assignmentOrder = this.assignmentOrderList.slice(0, this.limit)
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
    height: .9rem;
    line-height: .9rem;
    background-color: #fff;
    font-size: .28rem;
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
    font-size: .24rem;
    color: #666;
    text-align: center;
  }
</style>
