<template>
  <div class="news">
    <router-view></router-view>
  </div>
</template>
<style>
  .news {
    padding: .3rem;
  }
  .news .title {
    margin-bottom: .4rem;
  }
  .news .content {
    text-indent: 2em;
    text-align: justify;
    font-size: 0.26rem;
    margin-bottom: .2rem;
  }
  .news .img {
    width: 100%;
    display: block;
    margin: .2rem auto;
  }
  .news .line-page {
    text-indent: initial;
    color: red;
    font-size: .3rem;
  }
</style>
