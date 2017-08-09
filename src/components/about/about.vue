<template>
  <div class="about">
    <div class="bg-White overflow-hid">
      <ul class="about-tab1 columns ten offset-by-one aboutorange clearfix">
        <li class="column text-center ft-1p4" :class="{active: activeTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab}}</li>
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
        tabs: ['宏财简介', '高管团队', '战略伙伴', '联系我们'],
        activeTab: 0
      }
    },
    created: function () {
    },
    methods: {
      switchTab: function (index) {
        this.activeTab = index
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
</style> 
