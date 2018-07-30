<template>
  <div class="goldDays">
    <audio preload="preload" id="reward"><source src="../../assets/reward.mp3"></audio>
    <!-- 计算器弹窗 -->
    <Gold-Calculator v-show="showCalculator"></Gold-Calculator>
  </div>
</template>
<script>
  import GoldCalculator from './goldCalculator'
  export default {
    data () {
      return {
        showCalculator: true
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
