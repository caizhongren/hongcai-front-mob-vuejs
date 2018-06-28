<template>
  <div class="help-center">
    <router-link :to="{name: 'Help',params: {type: 1}}">
      <div class="class1">
        <img src="../../images/user-center/ljhc.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>了解宏财</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 2}}">
      <div class="class1">
        <img src="../../images/user-center/cpjs.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>项目介绍</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 3}}">
      <div class="class1">
        <img src="../../images/user-center/tzxg.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>出借相关</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 4}}">
      <div class="class1">
        <img src="../../images/user-center/dlzc.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>注册认证</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 5}}">
      <div class="class1">
        <img src="../../images/user-center/zhgl.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>账户管理</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 6}}">
      <div class="class1">
        <img src="../../images/user-center/cztx.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>充值提现</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 7}}">
      <div class="class1">
        <img src="../../images/user-center/uhfl.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>用户福利</span><span class="line2 display-inbl"></span>
        </div>
      </div>
    </router-link>
    <router-link :to="{name: 'Help',params: {type: 8}}">
      <div class="class1">
        <img src="../../images/user-center/khfw.png" alt="" class="display-bl margin-auto" width="100%">
        <div class="mask">
          <span class="line1 display-inbl"></span><span>客户服务</span><span class="line2 display-inbl"></span>
        </div>
      </div>
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
  .help-center {
    background-color: #fff;
    font-size: .26rem;
    padding: .4rem;
  }
  img {
    border-radius: .2rem;
  }
  .class1, .class2, .class3, .class4, .class5, .class6, .class7, .class8 {
    margin-bottom: .3rem; 
    width: 100%;
    position: relative;
    line-height: 2.2rem;
    color: #fff;
  }
  .line1, .line2 {
    display: inline-block;
    width: 20%;
    height: 1px;
    background-color: #fff;
    margin-bottom: 0.08rem;
  }
  .line1 {
    margin-right: .2rem;
  }
  .line2 {
    margin-left: .2rem;
  }
  .class8 {
    margin-bottom: .5rem;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    border-radius: .2rem;
    z-index: 999;
  }
</style> 
