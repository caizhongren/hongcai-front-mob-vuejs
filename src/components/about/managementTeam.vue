<template>
  <div class="management">
    <div class="class1">
      <!-- <img src="../../images/about/management.png" alt="" class="display-bl margin-auto" width="100%"> -->
      <div class="mask">
        <span class="line1 display-inbl"></span><span>高管团队</span><span class="line2 display-inbl"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'managementTeam',
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
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
    font-size: .46rem;
  }
</style>
