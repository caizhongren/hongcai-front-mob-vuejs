<template>
  <div>
    正在跳转
  </div>
</template>
<script>
  export default {
    name: 'OverPage',
    data () {
      return {
      }
    },
    created () {
      this.gotoApp()
      console.log(location.pathname + location.search)
    },
    methods: {
      gotoApp () {
        window.location = 'hongcai://' + location.pathname + location.search // 打开某手机上的某个app应用
        setTimeout(function () {
          window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai' // 如果超时就跳转到app下载页
        }, 3000)
      }
    }
  }
</script>
