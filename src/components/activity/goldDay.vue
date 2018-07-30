<template>
  <div class="goldDays">
    <audio preload="preload" id="reward"><source src="../../assets/reward.mp3"></audio>
    <!-- 计算器弹窗 -->
    <Gold-Calculator v-show="showCalculator" :isCalculator="isCalculator" :isTips="isTips"></Gold-Calculator>
  </div>
</template>
<script>
  import GoldCalculator from './goldCalculator'
  export default {
    data () {
      return {
        showCalculator: false,
        isCalculator: false, // 年化出借计算器
        isTips: 0 // 0 不显示提示 1 温馨提示 2 活动已结束
      }
    },
    props: [],
    mounted () {
    },
    created () {
    },
    methods: {
    },
    components: {
      GoldCalculator
    },
    destroyed () {
    }
  }
</script>

<style scoped>
  .goldDays {

  }
</style>
