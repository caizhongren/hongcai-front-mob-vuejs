<template>
  <div class="login">
    <h1>{{ msg }}{{count}}</h1>
    <div v-if="isMask">地方hi偶的是否还弄了的农村率欧迪芬年率</div>
    <div v-on:click="count++;">jiayi</div>
    <p v-on:click="fetchData">qwe</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '请先登录',
      isMask: true,
      count: 0
    }
  },
  methods: {
    fetchData () {
      this.msg = null
      this.isMask = !this.isMask
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
