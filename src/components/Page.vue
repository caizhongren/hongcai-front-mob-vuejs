<template>
  <div class="page" v-if="!loading">
    PAGE1{{ $route.path }}
    <p>{{ol}}</p>
    <p>{{error}}</p>
    <p v-for="item in todos">{{item.text}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      ol: 'yy',
      error: [],
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  font-weight: normal;
  font-size: 32px;
  color: red;
}
</style>
