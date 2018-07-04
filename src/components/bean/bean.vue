<template>
  <div class="beans">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['token']
  }
</script>
