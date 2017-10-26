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
        bridgeUtil.webConnectNative('HCNative_ImgSrc', null, {'imgSrc': 'https://www.hongcai.com/uploads/png/original/2017-10-19/image/262d332a885e48849a59e9a4b73a9984-original.png'}, function (response) {
        }, function (data) {
        })
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
