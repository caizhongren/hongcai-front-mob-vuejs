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
    name: 'About',
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
            name: 'Partner'
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
    methods: {
      switchTab: function (index) {
        if (this.activeTab !== index) {
          this.activeTab = index
          this.$router.replace({name: this.tabs[index].name})
          window.scrollTo(0, 0)
        }
      }
    }
  }
</script>
 <style scoped>
  .about .column {
    float: left;
  }
  .about .about-tab1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9999;
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
  .class1 {
    margin-top: 1rem;
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
    margin-bottom: 0.1rem;
  }
  .line1 {
    margin-right: .2rem;
  }
  .line2 {
    margin-left: .2rem;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 9;
    font-size: .3rem;
  }
</style> 
