<template>
  <div class="break-egg">
    {{showCalculator}}
    <div class="egg-header" @click="showCalculator = true;showMask = true">
      <img src="../../images/break-egg/hander.png" alt="" width="100%">
    </div>
    <div class="mask-common" v-show="showMask">
      <break-Egg-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></break-Egg-Calculator>
    </div>
  </div>
</template>
<script>
  import breakEggCalculator from './breakEggCalculator.vue'

  export default {
    name: 'breakEgg',
    data () {
      return {
        showCalculator: false,
        showMask: false
      }
    },
    methods: {
      closeCalculator () {
        this.showMask = false
        this.showCalculator = false
      }
    },
    components: {breakEggCalculator}
  }
</script>
<style scoped>
  .break-egg {
    background: #fa6654;
  }
  .egg-header {

  }
</style>
