<template>
  <div class="inviteRebateList" v-auto-height>
    <div class="invite-rebate-list">
      <div class="list-header">
        <ul class="list-title bg-white">
          <li>好友</li>
          <li>出借状态</li>
        </ul>
        <div class="circle">
          <span class="right-c"></span>
          <span class="left-c"></span>
        </div>
      </div>
      <div class="rebate-list">
        <ul v-show="showList">
          <li v-for="item in inviteList">
            <p class="ft-Arail">{{item.user.mobile}}</p>
            <p v-bind:class="{'ft-orange': item.investAmount > 0}">{{ item.investAmount <= 0 ? '未出借' : '已出借'}}</p>
          </li>
        </ul>
        <div class="noList" v-show="!showList">
          <img src="../../images/user-center/invite-rebate-no.png" alt="">
          <div class="textTip">您暂时还没有邀请到好友哦～</div>
          <!-- <div class="InviteBtn" @click="toInvite">立即邀请</div> -->
        </div>
        <div class="loadMuch text-center" @click="loadMuch();" v-show="page < loadMoreData">查看更多</p>
        </div>
      </div>
      <img class="invite-rebate-bg" src="../../images/common-bg.png" alt="">
    </div>
  </div>
</template>

<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'inviteRebateList',
    data () {
      return {
        totalPage: 1,
        total: 1,
        loadMoreData: 1,
        inviteList: [],
        page: 1,
        pageSize: 10,
        showList: false
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        val && val !== '' ? this.getInviteList() : null
        bridgeUtil.webConnectNative('HCNative_NeedInviteList', null, {
          // 1 需要显示 0 不需要显示
          isShow: 0
        }, function (res) {}, null)
      },
      inviteList: function (val) {
        val.length > 0 ? this.showList = true : this.showList = false
      }
    },
    created: function () {
      this.token ? this.getInviteList() : null
      this.inviteList.length > 0 ? this.showList = true : this.showList = false
      bridgeUtil.webConnectNative('HCNative_NeedInviteList', null, {
        // 1 需要显示 0 不需要显示
        isShow: 0
      }, function (res) {}, null)
    },
    methods: {
      getInviteList: function () {
        if (this.page > this.loadMoreData) {
          return
        }
        this.$http({
          method: 'get',
          url: '/hongcai/rest/users/0/inviteList?page=' + this.page + '&pageSize=' + this.pageSize + '&token=' + this.token
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            this.totalPage = response.data.totalPage
            this.total = response.data.total
            var inviteList = response.data.data
            this.loadMoreData = Math.ceil(this.total / this.pageSize)
            for (var i = 0; i < inviteList.length; i++) {
              this.inviteList.push(inviteList[i])
            }
          }
        })
      },
      loadMuch: function () {
        this.page = this.page + 1
        this.getInviteList(this.page)
      },
      toInvite: function () {
        this.$router.push({name: 'Invite'})
      }
    }
  }
</script>

<style scoped>
  .noList img {
    width: 60%;
    display: block;
    margin: .68rem auto .3rem;
  }
  .noList .textTip {
    color: #666;
    font-size: .26rem;
    text-align: center;
  }
  .noList .InviteBtn {
    border-radius: 1rem;
    width: 90%;
    height: .85rem;
    line-height: .85rem;
    background: #ff611d;
    color: #fff;
    font-size: .26rem;
    text-align: center;
    margin: .8rem auto .3rem;
    position: relative;
    z-index: 2222;
  }
  .ft-orange {
    color: #ff611d !important;
  }
  .inviteRebateList {
    padding: .3rem .5rem .8rem;
    background-image: -webkit-linear-gradient(to bottom, #ff611d 0%, #f6363f 100%);
    background-image: linear-gradient(to bottom, #ff611d 0%, #f6363f 100%);
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    width: 100%;
  }
  .invite-rebate-list {
    background-color: #fff;
    border-radius: .3rem;
    overflow: hidden;
    height: 98%;
    -webkit-overflow-scrolling: touch;
  }
  .rebate-list {
    padding: .5rem 0 .2rem;
    overflow-y: auto;
    position: relative;
    z-index: 2222;
    height: 80%;
    -webkit-overflow-scrolling: touch;
  }
  .rebate-list ul li {
    width: 100%;
    margin-bottom: .3rem;
  }
  .rebate-list ul li p {
    font-size: .26rem;
    display: inline-block;
    color: #666;
  }
  .rebate-list ul li p:first-child {
    width: 47.5%;
    text-align: left;
  }
  .rebate-list ul li p:last-child {
    width: 24%;
    text-align: right;
  }
  .list-header {
    position: relative;
  }
  .circle .right-c, .circle .left-c {
    display: inline-block;
    width: 15px;
    height: 30px;
    background-color: #ff611e;
    background-image: -webkit-linear-gradient(to bottom, #ff5c21 0%, #ff5a22 100%);
    background-image: linear-gradient(to bottom, #ff5c21 0%, #ff5a22 100%);
    position: absolute;
    bottom: -14px;
  }
  .circle .right-c {
    border-radius: 0 100px 100px 0;
    left: -1px;
  }
  .circle .left-c {
    border-radius: 100px 0 0 100px;
    right: -1px;
  }
  .list-title {
    padding: .65rem 0 .3rem;
    box-sizing: border-box;
    clear: both;
    overflow: hidden;
    height: 1.32rem;
    color: #fa6943;
    font-size: .3rem;
    margin: 0 .4rem;
    border-bottom: 1px solid #fa6943;
  }
  .list-title li {
    float: left;
  }
  .list-title li:nth-child(1) {
    width: 30%;
    padding-left: .74rem;
    text-align: left;
  }
  .list-title li:nth-child(2) {
    width: 50%;
    padding-right: .18rem;
    text-align: right;
  }
  .invite-rebate-bg {
    width: 84%;
    position: fixed;
    bottom: .85rem;
    left: 8%;
    z-index: 222;
  }
  .loadMuch {
    color: #666;
    font-size: .24rem;
    padding: .1rem 0;
    position: relative;
    z-index: 2222;
  }
  @media(max-height: 480px) {
    .noList img {
      margin: .5rem auto .3rem;
    }
    .noList .InviteBtn {
      margin: .5rem auto .3rem;
    }
  }
</style>
