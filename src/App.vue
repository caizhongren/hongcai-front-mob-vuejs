<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import thirdJs from 'js/jquery.min.js';
// import $ from 'jquery'
export default {
  name: 'app'
}
</script>

<style lang="css">
  @import 'css/common.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 16px;
  }

</style>
