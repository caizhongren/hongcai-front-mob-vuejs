<!-- <template>
  <div>
    <div id="qrcode"></div>
    <div class='change'>切换</div>
  </div>
</template>

<script>
  import {QRCode} from '../service/QRcode.js'
  export default {
    name: 'managementTeam',
    mounted () {
      var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: 'http://jindo.dev.naver.com/collie',
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff'
      })
      qrcode.makeCode('http://m.test321.hongcai.com/activity/channel?act=22&f=oficeweb')
      document.querySelector('.change').onclick = function () {
        qrcode.makeCode('http://m.test321.hongcai.com/login')
      }
    }
  }
</script> -->
<style scoped>
  .change {
    margin: 1.5rem auto;
    padding: 0rem 1.4rem;
  }
</style>

<template>
  <div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
    <div class='change'>切换</div>
  </div>
</template>
<script>
  // import QrcodeVue from 'qrcode.vue'
  export default {
    data () {
      return {
        value: 'https://example.com',
        size: 200
      }
    },
    components: {
      // QrcodeVue
    }
  }
</script>
