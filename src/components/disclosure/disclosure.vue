<template>
  <div class="discolsure" v-auto-height>
    <div class="class1">
      <img src="../../images/disclosure/comm-header.png" class="display-bl margin-auto" width="100%"> 
      <img src="../../images/disclosure/discolsure.png" width="35%" class="discolsure-title">
      <div class="tab" id="discolsure-tab1">
        <ul class="discolsure-tab1 columns discolsureorange">
          <li class="column text-center ft-1p4" :class="{active: activeTab == index}" v-for="(tab, index) in tabs" @click="switchTab(index)">{{tab.tab}}</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import $ from 'zepto'
  export default {
    name: 'Disclosure',
    data () {
      return {
        tabs: [
          {
            tab: '承诺函',
            name: 'CommitmentLetter'
          },
          {
            tab: '备案信息',
            name: 'RecordInformation'
          },
          {
            tab: '组织信息',
            name: 'Organization'
          },
          {
            tab: '审核信息',
            name: 'AuditInformation'
          },
          {
            tab: '经营信息',
            name: 'BusinessInformation'
          },
          {
            tab: '其他信息',
            name: 'PoliciesRegulations'
          }
        ],
        activeTab: 0
      }
    },
    props: ['showErrMsg'],
    methods: {
      switchTab: function (index) {
        if (this.activeTab !== index) {
          this.activeTab = index
          this.$router.replace({name: this.tabs[index].name})
          window.scrollTo(0, 0)
        }
        // if (this.activeTab === 3) {
        //   $('.columns').addClass('transition-left')
        // }
        // if (this.activeTab === 1) {
        //   $('.columns').removeClass('transition-left')
        // }
        // if (this.activeTab === 2) {
        //   $('.columns').hasClass('transition-left') ? $('.columns').removeClass('transition-left') : $('.columns').addClass('transition-left')
        // }
      }
    },
    mounted () {
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (t >= 130) {
          $('.tab').addClass('fixed')
        } else {
          $('.tab').removeClass('fixed')
        }
      }
      location.pathname === '/disclosure/policies-regulations' ? (this.activeTab = 5, document.getElementById('discolsure-tab1').scrollLeft = 200) : null
      location.pathname === '/disclosure/audit-information' ? (this.activeTab = 3, document.getElementById('discolsure-tab1').scrollLeft = 200) : null
    }
  }
</script>
 <style scoped>
   ::-webkit-scrollbar {display:none}
  .discolsure {
    background: #f9f4f3;
  }
  .discolsure .column {
    float: left;
  }
  .discolsure .tab.fixed {
    position: fixed;
    top: 0;
    z-index: 22222;
  }
  .discolsure .tab {
    /* overflow: auto; */
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 5%;
    border: 1px solid #fff;
    border-radius: .2rem;
    background: #fff;
    box-shadow: 0.8px 1.3px 3.5px 0 rgba(80, 77, 75, 0.2);
    width: 90%;
    height: 1rem;
    overflow-x: scroll;
  }
  .discolsure .discolsure-tab1 {
    width: 164%;
    height: 1rem;
    overflow-x: scroll;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    transform: translateX(0);
    -webkit-transition:all .4s ease-in-out;
    -moz-transition:all .4s ease-in-out;
    -o-transition:all .4s ease-in-out;
    -ms-transition:all .4s ease-in-out;    
    transition:all .4s ease-in-out;
  }
  .discolsure .discolsure-tab1.transition-left {
    transform: translateX(-40%);
  }
  .discolsure .discolsure-tab1.transition-right {
    transform: translateX(0%);
  }
  .discolsure .discolsure-tab1 li {
    width: 12.4%;
    margin-left: 2%;
    margin-right: 2%;
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
