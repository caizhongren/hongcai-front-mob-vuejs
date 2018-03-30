<template>
  <div class="foolsDayApp">
    <div class="header">
      <div class="activityTime">活动时间：{{activityInfo.startYear}}.{{activityInfo.startMonth}}.{{activityInfo.startDate}}-{{activityInfo.endYear}}.{{activityInfo.endMonth}}.{{activityInfo.endDate}}</div>
      <img src="../../images/foolsApp/header_01.png" alt="" width="100%">
      <img src="../../images/foolsApp/header_02.png" alt="" width="100%">
      <img src="../../images/foolsApp/header_03.png" alt="" width="100%">
      <img src="../../images/foolsApp/header_04.png" alt="" width="100%">
    </div>
    <div class="part">
      <img src="../../images/foolsApp/part1_01.png" alt="" width="90%">
      <img src="../../images/foolsApp/part1_02.png" alt="" width="90%">
      <img src="../../images/foolsApp/part1_03.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2_01.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2_02.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2_03.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2_04.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2-05.png" alt="" width="100%">
      <img src="../../images/foolsApp/part3-01.png" alt="" width="100%">
      <img src="../../images/foolsApp/part3-02.png" alt="" width="90%">
      <img src="../../images/foolsApp/part4_01.png" alt="" width="100%">
      <img src="../../images/foolsApp/part4_02.png" alt="" width="100%">
      <img src="../../images/foolsApp/part4_03.png" alt="" width="100%">
      <img src="../../images/foolsApp/part4_04.png" alt="" width="100%">
      <img src="../../images/foolsApp/part4_05.png" alt="" width="100%">
    </div>
  </div>
</template>
<style>
  .foolsDayApp {
    background: #f9a14b;
  }
  .foolsDayApp img {
    vertical-align: top;
  }
  .foolsDayApp .header {
    position: relative;
  }
  .activityTime {
    position: absolute;
    bottom: 17%;
    left: 22%;
    color: #fff;
    font-size: .28rem;
    font-weight: bold;
  }
</style>
<script>
  export default {
    data () {
      return {
        activityInfo: {
          startYear: 2018,
          startMonth: 4,
          startDate: 1,
          endYear: 2018,
          endMonth: 4,
          endDate: 5,
          act: this.$route.query.act || '43'
        }
      }
    },
    created () {
      this.act = this.$route.query.act || '43'
      this.getActivityStatus()
    },
    methods: {
      getActivityStatus () { // 活动信息查询
        var that = this
        that.$http('/hongcai/rest/activitys/' + that.act).then(function (res) {
          that.activityStatus = res.data.status
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
      }
    }
  }
</script>
