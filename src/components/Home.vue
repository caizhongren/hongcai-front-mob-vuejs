<template>
  <div class="home" v-auto-height @click="test">
      路径错了哦 
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    methods: {
      test () {
        this.$router.replace({name: 'gameCounting', params: { gameType: 2 }})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    background-color: #fff;
  }
</style>
