import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import UserCenter from 'components/UserCenter'

Vue.use(Router)

export default new Router({
  routes: [
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
})
