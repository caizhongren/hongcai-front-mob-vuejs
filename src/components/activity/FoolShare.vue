<template>
  <!-- 活动分享页面 -->
  <div class="fools-share mask-common" v-client-height v-if="showShare" @click="closeShare">
    <div class="contents">
      <img src="../../images/foolsDay/share.png" alt="" width="100%">
    </div>
  </div>
</template>
<script>
  import {ModalHelper} from '../../service/Utils'
  export default {
    name: 'FoolShare',
    data () {
      return {
      }
    },
    props: ['showShare', 'closeShare'],
    watch: {
      'showShare': function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted () {},
    created () {},
    methods: {
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-share {
    width: 100%;
    padding-bottom: .5rem;
  }
  .contents {
    position: relative;
    border-radius: .3rem;
    width: 80%;
    height: auto;
    margin: .5rem auto .3rem;
  }

</style>
