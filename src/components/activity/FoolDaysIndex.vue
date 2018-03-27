<template>
  <!-- 活动主页面 -->
  <div class="fools-day" v-client-height>
    <img src="../../images/foolsDay/clown1.png" alt="小丑" class="clown1">
    <img src="../../images/foolsDay/question-txt.png" alt="文案" class="txt">
    <div class="setQuestion" @click="setQuestion">
      <img src="../../images/foolsDay/play-txt.png" alt="立即出招" width="75%">
    </div>
    <div class="ruleIcon" @click="showRules = true">
      <img src="../../images/foolsDay/rule-txt.png" alt="活动规则" width="75%">
    </div>
    <Fool-Rules :closeRules="closeRules" :showRules="showRules" v-show="showRules"></Fool-Rules>
  </div>
</template>
<script>
  import FoolRules from './FoolRules.vue'
  export default {
    data () {
      return {
        showRules: false,
        questionStatus: 'NOT_SET'
      }
    },
    props: [],
    watch: {},
    mounted () {},
    created () {
      var that = this
      that.axios({
        method: 'get',
        url: '/hongcai/rest/activitys/foolsDay/takeRecordStatus'
      }).then((response) => {
        if (response.data && response.data.ret !== -1) {
          that.questionStatus = (response.data.status === -1) ? 'NOT_SET' : 'SETTED'
        }
      })
    },
    methods: {
      setQuestion () {
        var that = this
        if (that.questionStatus === 'NOT_SET') {
          this.$router.replace({name: 'FoolQuestion'})
        } else if (that.questionStatus === 'SETTED') {
          this.$router.replace({name: 'FoolResult'})
        }
      },
      closeRules () {
        this.showRules = false
      }
    },
    components: {FoolRules},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-day {
    background: url('../../images/foolsDay/bg-1.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }
  .fools-day .clown1 {
    position: absolute;
    right: -22%;
    bottom: 13%;
    width: 75%;
    pointer-events: none
  }
  .fools-day .txt {
    position: absolute;
    left: 5%;
    top: 37%;
    width: 65%;
    pointer-events: none
  }
  .fools-day .setQuestion {
    width: 38%;
    height: 1.2rem;
    line-height: 1.5rem;
    background: url(../../images/foolsDay/comm-btn.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    bottom: 28%;
    left: 14%;
    text-align: center;
    padding-left: 5px;
  }
  .fools-day .ruleIcon {
    width: 23%;
    height: .8rem;
    line-height: 1rem;
    background: url(../../images/foolsDay/rule-btn.png) no-repeat 0 0;
    background-size: 100% 100%;
    position: absolute;
    bottom: 19.5%;
    left: 14%;
    text-align: center;
    padding-left: 5px;
  }
</style>
