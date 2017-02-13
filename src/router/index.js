import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Login from 'components/Login'
import Page from 'components/Page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', component: Hello
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/page',
      component: Page
    }
  ]
})
