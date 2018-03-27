<template>
  <!-- 中途退出弹窗 -->
  <div class="fools-quit mask-common" v-client-height v-if="showQuit || true">
    <div class="tipBox">
      <div class="quitHeader">
        <img src="../../images/foolsDay/back.png" alt="半途而废" width="120%">
      </div>
      <div class="quitContent">
        <p>题目还未{{isAnswer ? '答' : '出'}}完，<br> 确认退出该页面？</p>
        <ul class="btns">
          <li @click="closeQuit(1)"><img src="../../images/foolsDay/quxiao.png" alt="取消"/></li>
          <li @click="closeQuit(2)"><img src="../../images/foolsDay/sure-red-txt.png" alt="确认"/></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {ModalHelper} from '../../service/Utils'
  export default {
    name: 'FoolQuit',
    data () {
      return {
      }
    },
    props: ['showQuit', 'closeQuit', 'isAnswer'],
    watch: {
      'showQuit': function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted () {},
    created () {
      this.showQuit ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
    },
    methods: {
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .fools-quit {
    width: 100%;
    padding-top: 1.5rem;
  }
  .tipBox {
    width: 70%;
    height: 4.8rem;
    background: url('../../images/foolsDay/box-bg.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: .12rem;
  }
  .quitHeader {
    width: 67%;
    height: 1.7rem;
    background: url('../../images/foolsDay/cloud.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: .75rem .8rem;
  }
  .quitContent {
    overflow: auto;
    height: 5rem;
  }
  .quitContent p {
    color: #51171b;
    margin: .3rem 0 .4rem 30%;
    text-align: justify;
    width: 55%;
    font-weight: bold;
    font-size: .26rem;
  }
  .btns {
    clear: both;
    overflow: hidden;
    width: 80%;
    margin: .3rem auto;
  }
  .btns li {
    float: left;
    width: 44%;
    height: .86rem;
    line-height: 1.1rem;
  }
  .btns li:nth-child(2) {
    float: right;
    background: url('../../images/foolsDay/sure-bg.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .btns li:nth-child(1) {
    background: url('../../images/foolsDay/clanel.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .btns li img {
    width: 50%;
  }
</style>
