<template>
  <div class="BeanDetail">
    <div class="header">
      <img src="../../images/common-bg.png" alt="" class="header-bg">
      <p class="beans">{{userPoints}}</p>
      <p class="title"><img src="../../images/user-center/bean.png" alt="">当前宏豆</p>
    </div>
    <div class="details">
      <li v-for="item in pointsRecords" v-if="pointsRecords.length > 0">
        <div class="left">
          <p>{{item.description}}</p>
          <p>{{item.createTime | dateDotTime}}</p>
        </div>
        <div class="right"><img src="../../images/user-center/bean.png" alt="" width="22%"><span>{{item.points > 0 ? '+' : ''}}{{item.points}}</span></div>
      </li>
      <div v-if="pointsRecords.length > 0 && totalPage > page" class="loadMore" @click="loadMore(page)">查看更多</div>
      <div v-if="pointsRecords.length <= 0" class="noInvestRecord">
        <img src="../../images/project/no-record.png" alt="">
        暂无记录
      </div>
    </div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'BeanDetail',
    data () {
      return {
        page: 1,
        pageSize: 10,
        pointsRecords: [],
        totalPage: 1,
        userPoints: 0
      }
    },
    props: ['token'],
    watch: {
      token (val) {
        bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
          // 1 需要显示 0 不需要显示
          isShow: 1
        }, function (res) {}, null)
        val && val !== '' ? (this.getPointsRecords(this.page, this.pageSize), this.getUserPoints()) : null
      }
    },
    created () {
      this.token ? (this.getPointsRecords(this.page, this.pageSize), this.getUserPoints()) : null
      bridgeUtil.webConnectNative('HCNative_BeanDetail', null, {
        // 1 需要显示 0 不需要显示
        isShow: 1
      }, function (res) {}, null)
    },
    methods: {
      getPointsRecords (page, pageSize) {
        var that = this
        that.$http('/hongcai/rest/activitys/points/pointsRecords?page=' + page + '&pageSize=' + pageSize + '&token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            var pointsRecords = res.data.data
            that.totalPage = res.data.totalPage
            for (var i = 0; i < pointsRecords.length; i++) {
              that.pointsRecords.push(pointsRecords[i])
            }
          } else {
            console.log(res.data.msg)
          }
        })
      },
      loadMore (page) {
        this.page += 1
        this.getPointsRecords(this.page, this.pageSize)
      },
      getUserPoints () {
        var that = this
        that.$http('/hongcai/rest/users/0/account?token=' + that.token).then(function (res) {
          if (res && res.ret !== -1) {
            that.userPoints = res.data.points
          } else {
            console.log(res.data.msg)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .BeanDetail {
    background: #efeef4;
  }
  .header {
    height: 2rem;
    position: relative;
    text-align: center;
    color: #ff611d;
    background: #fff;
    margin-bottom: .3rem;
  }
  .header-bg {
    width: 84%;
    height: 85%;
    position: absolute;
    left: 8%;
    bottom: 0;
  }
  .header .beans {
    font-family: Arial;
    font-size: .6rem;
    letter-spacing: 0.4px;
    padding-top: .4rem;
    line-height: 1.5;
  }
  .header .title {
    font-size: .24rem;
  }
  .header .title img {
    width: 5%;
    vertical-align: -webkit-baseline-middle;
    margin-top: -.2rem;
    margin-right: .1rem;
  }
  .details {
    background: #fff;
    height: 7.9rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .details li {
    overflow: hidden;
    clear: both;
    padding: .2rem .3rem .15rem;
    border-bottom: 1px solid #eee;
  }
  li .left {
    float: left;
    width: 65%;
    text-align: justify;
  }
  li .left p:nth-child(1) {
    color: #666;
    font-size: .25rem;
  }
  li .left p:nth-child(2) {
    color: #999;
    font-size: .22rem;
  }
  li .right {
    padding-top: .15rem;
    float: right;
    color: #ff611d;
    font-size: .26rem;
    font-weight: bold;
    text-align: right;
    width: 30%;
  }
  li .right img {
    margin-right: .15rem;
  }
  li .right span {
    position: relative;
    top: -.1rem;
  }
  .loadMore {
    text-align: center;
    margin:  0 auto;
    height: 1rem;
    line-height: 1rem;
  }
  .noInvestRecord {
    margin: 1.5rem auto;
    font-size: .25rem;
	  color: #666;
  }
  .noInvestRecord img {
    width: 40%;
    display: block;
    margin: .5rem auto;
  }
</style>
