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
        window.location.href = 'http://192.168.80.76:8080/games/game-counting-start'
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
