<template>
  <div class="introduction">
    <div class="company-profile">
      <img src="../../images/about/company-profile.png" alt="" class="profile-title">
    </div>
  </div>
</template>
<style scoped>
  .introduction {
    width: 100%;
  }
  .header {
    width: 100%;
    position: relative;
    line-height: 2.08rem;
  }
  .header img {
    display: block;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,.6);
    z-index: 999;
  }
  .line1, .line2 {
    display: inline-block;
    width: 20%;
    height: 1px;
    background-color: #fff;
    margin-bottom: 0.08rem;
  }
  .title {
    width: 93px;
    height: 22.5px;
    font-family: PingFang-SC;
    padding: 0 .3rem;
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    color: #ffffff;
  }
  .profile-title {
    width: 113.5px;
    height: 77px;
    object-fit: contain;
    margin: 18px 0;
  }
</style>
