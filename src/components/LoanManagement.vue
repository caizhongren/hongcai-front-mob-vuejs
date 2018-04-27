<template>
  <div class="LoanManagement">
      贷后管理信息
  </div>
</template>
<script>
  export default {
    name: 'LoanManagement',
    data () {
      return {
        info: {}
      }
    },
    created: function () {
      this.getInfo()
    },
    methods: {
      getInfo () {}
    }
  }
</script>
<style scoped>

</style>
