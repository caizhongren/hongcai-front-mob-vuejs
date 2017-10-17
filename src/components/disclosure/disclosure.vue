<template>
  <div class="discolsure">
    <div class="class1">
      <img src="../../images/disclosure/comm-header.png" class="display-bl margin-auto" width="100%"> 
      <img src="../../images/disclosure/discolsure.png" width="35%" class="discolsure-title">
    </div>
    <div class="bg-White overflow-hid tab">
      <ul class="discolsure-tab1 columns ten offset-by-one discolsureorange clearfix">
        <li class="column text-center ft-1p4" :class="{active: activeTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab.tab}}</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'Disclosure',
    data () {
      return {
        tabs: [
          {
            tab: '银行存管',
            name: 'BankDisclosure'
          },
          {
            tab: '备案信息',
            name: 'RecordInformation'
          },
          {
            tab: '风险管理',
            name: 'RiskManagement'
          },
          {
            tab: '组织信息',
            name: 'Organization'
          },
          {
            tab: '经营信息',
            name: 'BusinessInformation'
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
  .discolsure {
    background: #f9f4f3;
  }
  .discolsure .column {
    float: left;
  }
  .discolsure .discolsure-tab1 {
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9999;
    background: #fff;
    border: 1px solid #fff;
    border-radius: .2rem;
  }
  .discolsure .discolsure-tab1 li {
    width: 20%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    font-size: .28rem;
  }
  .discolsure .discolsureorange li {
    color: #757575;
    height: 1rem;
    line-height: 1rem;
  }
  .discolsure .discolsureorange li.active {
    color: #f5762f;
  }
  .class1 {
    /* margin-top: 1rem; */
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
  .discolsure-title {
    position: absolute;
    top: 1.1rem;
    left: 0.5rem;
    z-index: 9;
  }
</style> 
