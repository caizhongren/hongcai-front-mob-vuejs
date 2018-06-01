<template>
  <div class="TimeLimitRebate">
    <div class="header">
      <img src="../../images/timeLimitRebate/header.png" alt="" width="100%">
      <div class="activityTime"> &nbsp;活动时间：{{activityInfo.startYear}}年{{activityInfo.startMonth}}月{{activityInfo.startDate}}日～{{activityInfo.endYear}}年{{activityInfo.endMonth}}月{{activityInfo.endDate}}日</div>
    </div>
    <div class="content">
      <div class="text-box">
        活动期间，用户每日成功出借任意金额宏财<span>精选项目</span>，即可于<span>次日</span>获得<span>出借金额x200%</span>的特权本金返利(奖励有效期1天，并于<span>中午12:00前</span>进行统计并发放到账)
      </div>
      <div class="project-info">
        <img src="../../images/timeLimitRebate/project-info.png" alt="" width="90%">
        <ul class="desr">
          <li>当日出借成功</li>
          <li>次日获得奖励</li>
        </ul>
      </div>
    </div>
    <div class="investBtn" @click="toInvest()">立即出借</div>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        activityInfo: {
          startYear: 0,
          startMonth: 0,
          startDate: 0,
          endYear: 0,
          endMonth: 0,
          endDate: 0
        },
        activityType: this.$route.query.act || 45
      }
    },
    props: ['token'],
    watch: {
    },
    created () {
      this.getActivityStatus()
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.activityType).then(function (res) {
          // 获取活动开始、结束时间
          var startTime = res.data.startTime
          var endTime = res.data.endTime
          that.activityInfo = {
            startYear: new Date(startTime).getFullYear(),
            startMonth: new Date(startTime).getMonth() + 1,
            startDate: new Date(startTime).getDate(),
            endYear: new Date(endTime).getFullYear(),
            endMonth: new Date(endTime).getMonth() + 1,
            endDate: new Date(endTime).getDate()
          }
        })
      },
      toInvest () {
        if (this.token) {
          bridgeUtil.webConnectNative('HCNative_GoInvestList', undefined, {}, function (response) {
          }, null)
        } else {
          bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {
          }, null)
        }
      }
    }
  }
</script>
<style>
  .TimeLimitRebate {
    background: #ec433a;
    padding-bottom: 1.2rem;
  }
  .header {
    position: relative;
  }
  .header .activityTime {
    position: absolute;
    bottom: 3.8%;
    left: 7.5%;
    font-size: 0.22rem;
    line-height: .85rem;
    text-align: center;
    color: #3f1115;
    background: url('../../images/timeLimitRebate/time-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 85%;
    height: 1rem;
  }
  .text-box {
    color: #3f1115;
    font-size: .24rem;
    background: url('../../images/timeLimitRebate/content-box.png') no-repeat center center;
    background-size: 100% 100%;
    width: 90%;
    margin: 0 auto;
    padding: .3rem;
    text-align: justify;
    height: 2.2rem;
  }
  .text-box span {
    color: #ec433a;
    font-weight: bold;
  }
  .project-info  .desr {
    overflow: hidden;
    clear: both;
    color: #ffef00;
    font-weight: bold;
    text-align: center;
  }
  .project-info .desr li {
    float: left;
    width: 50%;
  }
  .investBtn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .9rem;
    line-height: .9rem;
    color: #3f1115;
    font-size: .28rem;
    background: #f9ec17;
    text-align: center;
  }
</style>
