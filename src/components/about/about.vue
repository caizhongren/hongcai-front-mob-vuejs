<template>
  <div class="about">
    <div class="bg-White overflow-hid tab">
      <ul class="about-tab1 columns ten offset-by-one aboutorange clearfix">
        <li class="column text-center ft-1p4" :class="{active: activeTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab.tab}}</li>
      </ul>
    </div>
    <div class="class1" v-if="activeTab === headImgs[activeTab].index">
       <img v-bind:src="headImgs[activeTab].imgSrc" alt="headImgs[activeTab].text" class="display-bl margin-auto" width="100%"> 
      <div class="mask">
        <span class="line1 display-inbl"></span><span>{{headImgs[activeTab].text}}</span><span class="line2 display-inbl"></span>
      </div>
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
            name: 'ContactUs'
          }
        ],
        headImgs: [
          {
            index: 0,
            imgSrc: '.../../../static/images/introduce.png',
            text: '宏财简介'
          },
          {
            index: 1,
            imgSrc: '.../../../static/images/management.png',
            text: '高管团队'
          },
          {
            index: 2,
            imgSrc: '.../../../static/images/strategic-partner.png',
            text: '战略伙伴'
          },
          {
            index: 3,
            imgSrc: '.../../../static/images/contact.png',
            text: '联系我们'
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
    font-size: .28rem;
  }
  .about .aboutorange li {
    color: #757575;
    height: 1rem;
    line-height: 1rem;
  }
  .about .aboutorange li.active {
    color: #f5762f;
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
    font-size: .46rem;
  }
</style> 
