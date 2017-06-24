import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import UserCenter from '../components/user-center/UserCenter.vue'
import ProjectDetail from '../components/ProjectDetail.vue'
import Invite from '../components/activity/invite.vue'
import ActivityReward from '../components/activity/reward.vue'
import HelpCenter from '../components/HelpCenter.vue'
import Questionnaire from '../components/Questionnaire.vue'
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
  },
  {
    path: '/project/:number',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/activity/invite/:isLogged',
    name: 'Invite',
    component: Invite
  },
  {
    path: '/activity/reward/:userId',
    name: 'ActivityReward',
    component: ActivityReward
  },
  {
    path: '/user-center/help-center',
    name: 'HelpCenter',
    component: HelpCenter
  },
  {
    path: '/user-center/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire
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
