<template>
  <!-- 答题主页面 -->
  <div class="fools-answer" v-client-height>
    <div class="portrait">
      <img v-bind:src="userInfo.headImgUrl" alt="">
    </div>
    <img src="../../images/foolsDay/answer-txt.png" alt="文案" width="74%">
    <div class="startAnswer" @click="startAnswer">
      <img src="../../images/foolsDay/answer-btn-txt.png" alt="立即出招" width="80%">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['userInfo'],
    watch: {},
    mounted () {},
    created () {
    },
    methods: {
      startAnswer () {
        this.$router.replace({name: 'FoolAnswerPage', params: {number: this.$route.params.number}})
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-answer {
    background: url('../../images/foolsDay/bg-1.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }
  .fools-answer .startAnswer {
    width: 53%;
    height: 1.2rem;
    line-height: 1.5rem;
    background: url('../../images/foolsDay/answer-btn.png') no-repeat 0 0;
    background-size: 100% 100%;
    text-align: center;
    padding-left: 5px;
    margin: 0 auto;
  }
  .portrait {
    width: 35%;
    height: 3rem;
    background: url('../../images/foolsDay/answer-icon.png') no-repeat 0 0;
    background-size: 100% 100%;
    position: relative;
    margin: 3.1rem auto 0.3rem;
  }
  .portrait img {
    width: 81%;
    position: absolute;
    bottom: 5%;
    left: 9.6%;
    border-radius: 50%;
  }
</style>
