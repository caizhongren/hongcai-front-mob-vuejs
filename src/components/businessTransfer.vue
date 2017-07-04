<template>
</template>

<script>
  import {bridgeUtil} from '../service/Utils.js'
  export default {
    name: 'businessTransfer',
    data () {
      return {
        page: '0',
        amount: 0,
        coupon: {
          type: 1,
          value: 2
        },
        business: '',
        token: ''
      }
    },
    created: function () {
    },
    methods: {
      toNative: function (nativeFnName) {
        bridgeUtil.webConnectNative(nativeFnName, '', {}, function (response) {}, function (response) {})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
