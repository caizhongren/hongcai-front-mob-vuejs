<template>
  <div>
    <div id="qrcode"></div>
    <div class='change' @click="change">切换二维码</div>
  </div>
</template>

<script>
  import {QRCode} from '../service/qrcode.js'
  export default {
    name: 'QRcode',
    data () {
      return {
        url: '',
        qrcode: Object
      }
    },
    watch: {
      url: function (val) {
        if (val !== '') {
        }
      }
    },
    mounted () {
      var that = this
      that.qrcode = new QRCode(document.getElementById('qrcode'), {
        text: that.url,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff'
      })
    },
    created () {
      this.change()
    },
    methods: {
      change () {
        this.getQrcodeUrl()
      },
      getQrcodeUrl () {
        var that = this
        that.$http({
          methods: 'get',
          url: 'hongcai/rest/users/offline/code'
        }).then(function (response) {
          if (response && response.data.ret !== -1) {
            that.url = process.env.vue_domain + '/activity/register?act=33&code=' + response.data.code
            that.qrcode.makeCode(that.url + Math.random())
          }
        })
      }
    }
  }
</script>
<style scoped>
  #qrcode {
    margin: 1.5rem auto;
    padding: 0rem 1.4rem;
  }
  .change {
    width: 30%;
    margin: 0 auto;
    background: orange;
    height: .6rem;
    line-height: .65rem;
    border-radius: .5rem;
    color: #fff;
    font-size: .3rem;
  }
</style>
