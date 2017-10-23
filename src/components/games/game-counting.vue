<template>
    <div class="gameCounting">
      <div class="mask-common">
        <p class="mask-title">抢到多少，就送多少</p>
        <div class="mask-content">
          <img src="../../images/singles-day/top-hand.png" alt="" width="8%">
          上滑抢钞票
          <img src="../../images/singles-day/icon-01.png" alt="" width="8%">
          不止给你100块！<br>
          有机会出现面值500元和10000元的钞票哦！
        </div>
      </div>
    </div>
</template>
<script>
  // import GoldenAddress from './golden-adress.vue'
  export default {
    name: 'gameCounting',
    data () {
      return {
      }
    },
    watch: {
    },
    props: ['token'],
    created () {
    },
    components: {
    },
    methods: {
      getRecordList () {}
    }
  }
</script>
<style scoped>
  .mask-title {
    padding-top: 2rem;
    font-size: .36rem;
    font-weight: bold;
    color: #ffffff;
  }
  .mask-content {
    color: #fff;
    text-align: center;
    line-height: 1.8;
  }
  .mask-content img {
    display: inline-block;
  }
</style>
