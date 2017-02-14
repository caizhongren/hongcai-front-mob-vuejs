<template>
  <div id="app">
    <ul id="footer">
      <li>
        <img src="./images/footer/answer1.png" alt="" width="22%">
        <div>问答</div>
      </li>
      <li>
        <img src="./images/footer/article2.png" alt="" width="20%">
        <div>文章</div>
      </li>
      <li>
        <img src="./images/footer/me2.png" alt="" width="22%">
        <div>我</div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
// import thirdJs from 'js/jquery.min.js';

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
  #footer {
    height: 53px;
    background: #000;
    opacity: .75;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 8px 0 3px;
  }
  ul#footer li {
    float: left;
    width: 33.33%;
  }
  
</style>
