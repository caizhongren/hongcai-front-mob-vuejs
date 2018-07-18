<template>
  <!-- 提示更新弹窗 -->
  <div class="mask-common mask1" v-client-height v-if="showUpdate || true">
    <div class="alert-wrap">
      <div class="text">为了不影响您的正常使用，<br>建议您更新到最新版本哦～</div>
      <div class="i-know">
      <div class="" @click="closeUpdate(0)">取消</div>
      <div class="" @click="closeUpdate(1)">更新</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {ModalHelper} from '../../service/Utils'
  export default {
    name: 'BeanUpdate',
    data () {
      return {
      }
    },
    props: ['showUpdate'],
    watch: {
      '$parent.showUpdate': function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted () {},
    created () {
      this.showUpdate ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
    },
    methods: {
      closeUpdate (type) {
        if (type === 0) {
          this.$parent.showUpdate = false
        } else {
          window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hoolai.hongcai'
        }
      }
    },
    components: {},
    desrtoyed () {}
  }
</script>
<style scoped>
  .mask-common{
    text-align: center;
    background-color: rgba(0,0,0,0.9) !important;
  }
  .i-know{
    display: flex;
  }
  .i-know div{
    flex: 1;
  }
  .i-know div:first-child{
    color: #666666;
    border-right: 1px solid #ddd;
  }
  .i-know div:last-child{
    color: #ff611d;
  }
  .mask1 .alert-wrap .text{
    font-size: .26rem;
    font-weight: bold;
    height: 1.6rem;
  }
  .mask1 .alert-wrap{
    width: 76%;
  }
</style>
