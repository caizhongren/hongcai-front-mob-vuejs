<template>
  <div class="about">
    <div class="wrapper">
      <div>
        <img src="../../images/disclosure/record.png" alt="" height="100%" @click="preview()">
      </div>
    </div>
    <p>公安机关网站备案号：京ICP备15025477号-1</p>
  </div>
</template>
<script>
  import {bridgeUtil} from '../../service/Utils'
  export default {
    name: 'About',
    data () {
      return {

      }
    },
    methods: {
      preview () {
        bridgeUtil.webConnectNative('HCNative_ImgSrc', null, {'imgSrc': 'http://note.youdao.com/yws/api/personal/file/WEB18903db9e85459edcaf48d29c76a3e52?method=download&shareKey=64145b43d807078f4c40ce2753179538'}, function (response) {
          alert(response)
        }, function (data) {})
      }
    }
  }
</script>
<style scoped>
  ::-webkit-scrollbar {display:none}
  p {
    color: #666666;
    font-size: .26rem;
  }
  img {
    border-radius: 12.5px;
  }
  .wrapper {
    margin: 0.35rem auto .55rem;
    height: 4rem;
    box-shadow: 0 0 2px 0 rgba(255, 77, 0, 0.69);
    border-radius: 12.5px;
    width: 90%;
    overflow-x: hidden;
    -webkit-transform: rotate(0deg);
  }
  .wrapper div {
    overflow-y: hidden;
    overflow-x: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
</style>
