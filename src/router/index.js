import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import UserCenter from '../components/UserCenter.vue'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: UserCenter
  }
]
const router = new Router({
  hashbang: true, // 将路径格式化为#!开头
  history: true, // use history=false when testing
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'v-link-active',
  routes // （缩写）相当于 routes: routes
})
export default router

