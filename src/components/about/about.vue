<template>
  <div class="about">
    <div class="bg-White overflow-hid">
      <ul class="about-tab1 columns ten offset-by-one aboutorange clearfix">
        <li class="column text-center ft-1p4" :class="{active: activeTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab.tab}}</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'ActivityReward',
    data () {
      return {
        tabs: [
          {
            tab: '宏财介绍',
            name: 'Introduction'
          },
          {
            tab: '高管团队',
            name: 'ManagementTeam'
          },
          {
            tab: '战略伙伴',
            name: 'Introduction'
          },
          {
            tab: '联系我们',
            name: 'Introduction'
          }
        ],
        activeTab: 0
      }
    },
    created: function () {
    },
    methods: {
      switchTab: function (index) {
        this.activeTab = index
        this.$router.push({name: this.tabs[index].name})
      }
    }
  }
</script>
 <style scoped>
  .about .column {
    float: left;
  }
  .about .about-tab1 li {
    width: 20%;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
  .about .aboutorange li {
    color: #757575;
    height: .8rem;
    line-height: .8rem;
  }
  .about .aboutorange li.active {
    color: #f5762f;
  }
  .about .introduce .content {
    width: 96%;
    margin: 0 auto;
    line-height: 0.4rem;
    text-align: justify;
    font-size: .2rem;
    margin-top: .3rem;
    color: #5a5959;
  }
  .about .introduce .unit2,
  .about .introduce .unit3,
  .about .introduce .unit4 {
    width: 94%;
    margin-left: 3%;
    border: 2px solid #fff4d5;
    box-sizing: border-box;
    background-color: #fffdf7;
    padding: .4rem .2rem .2rem;
    margin-bottom: .3rem;
  }
  .about .introduce .unit2 {
    padding-bottom: 0.2rem !important;
  }
  .about .introduce .unit2 p {
    text-align: center;
  }
  .about .introduce .unit3 .content ul > li {
    padding-left: .3rem;
    margin-bottom: .15rem;
  }
  .about .introduce .unit3 .content ul > li p {
    display: inline-block;
    padding: 0rem .3rem;
    background-color: #e6e6e6;
    border-radius: .8rem;
    text-align: center;
    margin-left: -0.2rem;
  }
  /*高管团队*/
  .about .topTeam {
    margin: 0rem .2rem .4rem;
    border: 2px solid #fff4d5;
    background-color: #fffdf7;
  }
  .about .topTeam .part1 .top_title p,
  .about .topTeam .part1 .top_title1 p,
  .about .topTeam .part1 .top_title2 p,
  .about .topTeam .part1 .top_title3 p {
    width: 93%;
    margin-bottom: 0;
    color: #fff;
    text-align: center;
    line-height: .5rem;
  }
  .about .topTeam .part1 .top_title p .t_title,
  .about .topTeam .part1 .top_title1 p .t_title,
  .about .topTeam .part1 .top_title2 p .t_title,
  .about .topTeam .part1 .top_title3 p .t_title {
    font-size: .2rem;
  }
  .about .topTeam .part1 .top_title1 {
    background-position: right;
  }
  .about .topTeam .part1 .top_title1 p {
    margin-bottom: 0;
    color: #fff;
    text-align: center;
    line-height: .55rem;
  }
  .about .topTeam .part1 .top_title3 {
    background-position: right;
  }
  .about .topTeam .part1 .top_title3 p {
    width: 79%;
    text-align: right;
  }
  .about .topTeam .part1 .content {
    margin-bottom: .5rem;
  }
  .about .topTeam .part1 .content .lf_text {
    width: 64%;
    overflow: hidden;
    margin-top: .3rem;
    text-align: justify;
  }
  .about .topTeam .part1 .content .lf_text .circle {
    width: 8%;
    color: #fcb165;
    font-size: .22rem;
    margin-top: 3px;
  }
  .about .topTeam .part1 .content .lf_text .text {
    width: 85%;
    font-size: .22rem;
    padding-bottom: .5rem;
    color: #5a5959;
  }
  .about .topTeam .part1 .img,
  .about .topTeam .part1 .img1,
  .about .topTeam .part1 .img2 {
    position: absolute;
    bottom: 0;
  }
  .about .topTeam .part1 .img {
    right: -0.2rem;
  }
  .about .topTeam .part1 .img1,
  .about .topTeam .part1 .img2  {
    left: 0rem;
  }
  .about .callMe {
    margin: 0rem .2rem .4rem;
    border: 2px solid #fff4d5;
    background-color: #fffdf7;
    text-align: left;
  }
  .about .callMe .content {
    margin: .3rem 0 0 .2rem;
  }
  .about .callMe .content .icon {
    width: 8%;
    color: #fcb165;
  }
  .about .callMe .content .text {
    width: 85%;
    color: #757575;
    border-bottom: 1px solid #fcbc7e;
    padding-bottom: .2rem;
  }
  .about .partner .partner-units {
    padding: 0 .2rem .4rem;
  }
  .about .partner .partner-units ul {
    display: block;
    background-color: #fffdf7;
    border: 2px solid #fff4d5;
    padding: .4rem 0;
  }
  .about .partner .partner-units ul li p {
    width: 85%;
    margin: 0.2rem auto 0;
    color: #5a5959;
    text-align: justify;
  }
  .about .partner .partner-units ul li .line {
    border-bottom: 1px solid #fff4d5;
    width: 86%;
    margin: .3rem auto;
  }
  .about .partner .partner-units ul li .line p {
    width: .2rem;
    height: .2rem;
    background-color: #fff4d5;
    right: 0;
    top: -0.4rem;
  }
</style> 
