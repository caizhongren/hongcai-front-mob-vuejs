<template>
  <div class="FenTian">
    <div class="header">
      焚天游戏
    </div>
    <div class="contents">
    </div>
  </div>
</template>
<script>
  // import {Carousel} from '../../service/mCarousel'
  // import {bridgeUtil} from '../../service/Utils'
  // import $ from 'zepto'
  export default {
    data () {
      return {
        activityInfo: {
          startYear: 1,
          startMonth: 1,
          startDate: 1,
          endYear: 1,
          endMonth: 1,
          endDate: 1
        }
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
        that.$http('/hongcai/rest/activitys/' + that.$route.query.act).then(function (res) {
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
    },
    destroyed () {
    }
  }
</script>
<style scoped>
  .FenTian {
    
  }
</style>
