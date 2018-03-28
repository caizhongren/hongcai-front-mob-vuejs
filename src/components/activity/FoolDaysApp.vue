<template>
  <div class="foolsDayApp">
    <div class="header">
      <div class="activityTime">活动时间：{{activityInfo.startYear}}.{{activityInfo.startMonth}}.{{activityInfo.startDate}}-{{activityInfo.endYear}}.{{activityInfo.endMonth}}.{{activityInfo.endDate}}</div>
      <img src="../../images/foolsApp/header.png" alt="" width="100%">
    </div>
    <div class="part">
      <img src="../../images/foolsApp/part1.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2-01.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2-02.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2-03.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2-04.png" alt="" width="90%">
      <img src="../../images/foolsApp/part2-05.png" alt="" width="100%">
      <img src="../../images/foolsApp/part3-01.png" alt="" width="100%">
      <img src="../../images/foolsApp/part3-02.png" alt="" width="90%">
      <img src="../../images/foolsApp/part4.png" alt="" width="100%">
    </div>
  </div>
</template>
<style>
  .foolsDayApp {
    background: #f9a14b;
  }
  .part {
    margin-top: 1rem;
  }
  .part img {
    vertical-align: top;
  }
  .foolsDayApp .header {
    position: relative;
  }
  .activityTime {
    position: absolute;
    bottom: 0;
    left: 25%;
    color: #fff;
    font-size: .25rem;
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
          endDate: 5
        }
      }
    }
  }
</script>
