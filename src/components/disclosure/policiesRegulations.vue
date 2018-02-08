<template>
  <div class="policiesList">
    <div class="commonBoxShadow" v-for="(item, index) in policiesList" @click="goText(index)">
      <span v-bind:class="{'border-6': index === 1 || index === 2 || index === 3 || index === 6}"></span>
      <p class="title">{{item.title}}</p>
      <img src="../../images/disclosure/icon-right.png" alt="" v-bind:class="{'margin-6': index === 0 || index === 4 || index === 5}">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        policiesList: [
          {
            title: '中华人民共和国电子签名法'
          },
          {
            title: '最高人民法院关于审理民间借贷案件适用法律若干问题的规定'
          },
          {
            title: '网络借贷信息中介机构业务活动管理暂行办法 '
          },
          {
            title: '中国人民银行等十部委发布《关于促进互联网金融健康发展的指导意见》'
          },
          {
            title: 'P2P网络借贷风险专项整治工作实施方案'
          },
          {
            title: '网络借贷资金存管业务指引'
          },
          {
            title: '网络借贷信息中介机构业务活动信息披露指引'
          }
        ]
      }
    },
    methods: {
      goText (id) {
        this.$router.push({name: 'Policies', params: { id: id }})
      }
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
  .commonBoxShadow span.border-6 {
    height: 1.2rem;
  }
  .commonBoxShadow img.margin-6 {
  	margin-top: .22rem;
  }
  .commonBoxShadow span {
    opacity: 0.6;
    background-image: linear-gradient(to top, #fd695b, #fc695b);
    box-shadow: 2px -0.4px 8px 0 rgba(252, 105, 91, 0.53);
    width: .12rem;
    display: inline-block;
    height: .8rem;
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
