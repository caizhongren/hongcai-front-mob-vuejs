<template>
  <div class="help-center">
    <router-link :to="{name: 'Help',params: {type: 1}}">
      <div>了解宏财</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 2}}">
      <div>产品介绍</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 3}}">
      <div>投资相关</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 4}}">
      <div>注册登录</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 5}}">
      <div>账户管理</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 6}}">
      <div>充值提现</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 7}}">
      <div>用户福利</div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 8}}">
      <div>客户服务</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'help',
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .help-center .content {
    overflow: hidden;
    padding: 0 .36rem;
    background-color: #fff;
  }
  .help-center .content.open {
    background-color: #f8f9fd !important;
    box-sizing: border-box;
  }
  .help-center .content.open .column {
    background-color: #f8f9fd !important;
    border: none!important;
  }
  .help-center .content .column {
    border-bottom: 1px solid #eee;
    padding: .2rem 0rem;
    background-color: #fff;
    margin-left: 0;
    width: 100%;
    float: left;
    color: #666;
  }
  .column .rotate {
    transform: rotateZ(90deg);
  }
  .submenu {
    display: none;
    text-align: justify;
    padding-left: .2rem;
    padding-bottom: .25rem;
    color: #999;
  }
</style> 
