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
  </div>
</template>
<script>
  export default {
    name: 'About',
    data () {
      return {

      }
    }
  }
</script>
<style scoped>

</style>
