<template>
  <div id="app">
    <!--<ul id="footer">
      <router-link to="/">
        <li>
          <img src="./images/footer/answer1.png" alt="" width="22%">
          <div>问答</div>
        </li>
      </router-link>
      <router-link :to="{name: 'ProjectDetail',params: {number: 1}}">
        <li>
          <img src="./images/footer/article2.png" alt="" width="20%">
          <div>文章</div>
        </li>
      </router-link>
      <li>
        <router-link to="/user-center">
          <img src="./images/footer/me2.png" alt="" width="22%">
          <div>我</div>
        </router-link>
      </li>
    </ul>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
import * as custom from './filters/custom'
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
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
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 8px 0 3px;
    border-top: 1px solid #eee;
    z-index: 9999999;
  }
  ul#footer li {
    float: left;
    width: 33.33%;
  }
  
</style>
