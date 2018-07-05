<template>
  <div class="beans">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['token', 'showErrMsg', 'transitionName']
  }
</script>
