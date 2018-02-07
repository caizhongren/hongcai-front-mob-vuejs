<template>
  <div class="policiesList">
    <div class="commonBoxShadow" v-for="item in policiesList">
      <span></span>
      <p class="title">{{item.title}}</p>
      <img src="../../images/disclosure/icon-right.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        policiesList: [
          {
            title: '网络借贷信息中介机构业务活动管理暂行办法'
          },
          {
            title: '中国银监会办公厅关于印发网络借贷资金存管业务指引的通知'
          },
          {
            title: '中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知'
          },
          {
            title: '网络借贷信息中介机构业务活动管理暂行办法'
          },
          {
            title: '网络借贷信息中介机构业务活动管理暂行办法'
          },
          {
            title: '中国银监会办公厅关于印发网络借贷资金存管业务指引的通知'
          },
          {
            title: '中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知'
          },
          {
            title: '网络借贷信息中介机构业务活动管理暂行办法'
          }
        ]
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>
<style scoped>
  .policiesList {
    background: #f9f4f3;
    padding-bottom: .2rem;
  }
  .commonBoxShadow {
    border-radius: 9.5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 8px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    margin: 0.3rem auto;
    text-align: left;
    overflow: hidden;
    padding-right: .2rem;
  }
  .commonBoxShadow span {
    opacity: 0.6;
    background-image: linear-gradient(to top, #fd695b, #fc695b);
    box-shadow: 2px -0.4px 8px 0 rgba(252, 105, 91, 0.53);
    width: .12rem;
    display: inline-block;
    height: 1.2rem;
    float: left;
  }
  .commonBoxShadow .title {
    width: 90%;
    float: left;
    font-size: .26rem;
    font-weight: bold;
    line-height: 1.47;
    color: #333333;
    padding: .2rem 0 0 .2rem;
  }
  .commonBoxShadow img {
    width: 3.5%;
    float: right;
    margin-top: .4rem;
  }
</style>
