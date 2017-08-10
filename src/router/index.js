import Vue from 'vue'
import Router from 'vue-router'
import Promise from 'es6-promise'
window.Promise = Promise
const ProjectDetail = r => require.ensure([], () => r(require('../components/ProjectDetail.vue')), 'ProjectDetail')
const Invite = r => require.ensure([], () => r(require('../components/activity/invite.vue')), 'Invite')
const ActivityReward = r => require.ensure([], () => r(require('../components/activity/reward.vue')), 'Invite')
const Lottery = r => require.ensure([], () => r(require('../components/activity/lottery.vue')), 'Lottery')
const LotteryRecord = r => require.ensure([], () => r(require('../components/activity/lotteryRecord.vue')), 'Lottery')
const CoolRanking = r => require.ensure([], () => r(require('../components/activity/coolRanking.vue')), 'CoolSummerPlan')
const IntegralDetail = r => require.ensure([], () => r(require('../components/activity/integralDetail.vue')), 'CoolSummerPlan')
const CoolSummerPlan = r => require.ensure([], () => r(require('../components/activity/cool-summer-plan.vue')), 'CoolSummerPlan')
const Novice = r => require.ensure([], () => r(require('../components/activity/novice.vue')), 'Novice')
const About = r => require.ensure([], () => r(require('../components/about.vue')), 'About')
const Safe = r => require.ensure([], () => r(require('../components/safe.vue')), 'Safe')
const Home = r => require.ensure([], () => r(require('../components/Home.vue')), 'others')
const NoticeDetail = r => require.ensure([], () => r(require('../components/user-center/noticeDetail.vue')), 'others')
const bankCardLimit = r => require.ensure([], () => r(require('../components/user-center/bankCardLimit.vue')), 'others')
const AssignmentList = r => require.ensure([], () => r(require('../components/user-center/assignmentList.vue')), 'others')
const HelpCenter = r => require.ensure([], () => r(require('../components/user-center/helpCenter.vue')), 'userCenter')
const Help = r => require.ensure([], () => r(require('../components/user-center/help.vue')), 'userCenter')
const Question = r => require.ensure([], () => r(require('../components/user-center/question.vue')), 'Question')
const Feedback = r => require.ensure([], () => r(require('../components/user-center/feedback.vue')), 'Feedback')
const InviteRebate = r => require.ensure([], () => r(require('../components/user-center/inviteRebate.vue')), 'InviteRebate')
const inviteRebateList = r => require.ensure([], () => r(require('../components/user-center/inviteRebateList.vue')), 'InviteRebate')
const AssignmentQuestion = r => require.ensure([], () => r(require('../components/assignmentQuestion.vue')), 'Question')
const RegisterAgree = r => require.ensure([], () => r(require('../components/registerAgree.vue')), 'RegisterAgree')
const AssignmentAgree = r => require.ensure([], () => r(require('../components/assignmentAgree.vue')), 'AssignmentAgree')
const ServiceAgree = r => require.ensure([], () => r(require('../components/serviceAgree.vue')), 'ServiceAgree')
const BusinessSuccess = r => require.ensure([], () => r(require('../components/businessSuccess.vue')), 'BusinessSuccess')
const BankCustody = r => require.ensure([], () => r(require('../components/bankCustody.vue')), 'BankCustody')
const BindWechat = r => require.ensure([], () => r(require('../components/bindWechat.vue')), 'BindWechat')
const Report2 = r => require.ensure([], () => r(require('../components/news/report2.vue')), 'News')
const Report1 = r => require.ensure([], () => r(require('../components/news/report1.vue')), 'News')
const Events = r => require.ensure([], () => r(require('../components/events.vue')), 'Events')
const RiskEducation = r => require.ensure([], () => r(require('../components/riskEducation.vue')), 'RiskEducation')
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/businessSuccess',
    name: 'BusinessSuccess',
    component: BusinessSuccess
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {title: '走进宏财'}
  },
  {
    path: '/user-center/help-center',
    name: 'HelpCenter',
    component: HelpCenter,
    meta: {title: '帮助中心'}
  },
  {
    path: '/user-center/help/:type',
    name: 'Help',
    component: Help
  },
  {
    path: '/user-center/questionnaire',
    name: 'Question',
    component: Question,
    meta: {title: '风险测评'}
  },
  {
    path: '/user-center/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {title: '意见反馈'}
  },
  {
    path: '/user-center/invite-rebate',
    name: 'InviteRebate',
    component: InviteRebate,
    meta: {title: '我的邀请'}
  },
  {
    path: '/user-center/invite-rebate-list',
    name: 'inviteRebateList',
    component: inviteRebateList,
    meta: {title: '邀请列表'}
  },
  {
    path: '/project/:number',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/activity/invite',
    name: 'Invite',
    component: Invite,
    meta: {title: '邀请好友'}
  },
  {
    path: '/activity/reward',
    name: 'ActivityReward',
    component: ActivityReward,
    meta: {title: '我的奖励'}
  },
  {
    path: '/activity/lottery',
    name: 'Lottery',
    component: Lottery,
    meta: {title: '幸运大抽奖'}
  },
  {
    path: '/activity/user-lottery-record',
    name: 'LotteryRecord',
    component: LotteryRecord,
    meta: {title: '我的奖励'}
  },
  {
    path: '/user-center/bankcard-limit',
    name: 'bankCardLimit',
    component: bankCardLimit,
    meta: {title: '银行卡限额'}
  },
  {
    path: '/user-center/assignment-list/:number',
    name: 'AssignmentList',
    component: AssignmentList,
    meta: {title: '转让记录'}
  },
  {
    path: '/user-center/messages/:id',
    name: 'NoticeDetail',
    component: NoticeDetail,
    meta: {title: '公告详情'}
  },
  {
    path: '/activity/novice-landing',
    name: 'Novice',
    component: Novice,
    meta: {title: '新手大礼包'}
  },
  {
    path: '/activity/cool-summer-plan',
    name: 'CoolSummerPlan',
    component: CoolSummerPlan,
    meta: {title: '夏日清凉计划'}
  },
  {
    path: '/activity/cool-Ranking',
    name: 'CoolRanking',
    component: CoolRanking,
    meta: {title: '前十名排行榜'}
  },
  {
    path: '/activity/integral-detail',
    name: 'IntegralDetail',
    component: IntegralDetail,
    meta: {title: '清凉积分明细'}
  },
  {
    path: '/register-agree',
    name: 'RegisterAgree',
    component: RegisterAgree,
    meta: {title: '注册服务协议'}
  },
  {
    path: '/assignment-agree',
    name: 'AssignmentAgree',
    component: AssignmentAgree,
    meta: {title: '债权转让协议'}
  },
  {
    path: '/service-agree/:number/:status',
    name: 'ServiceAgree',
    component: ServiceAgree,
    meta: {title: '宏财网服务协议'}
  },
  {
    path: '/assignment-question',
    name: 'AssignmentQuestion',
    component: AssignmentQuestion,
    meta: {title: '常见问题'}
  },
  {
    path: '/bank-custody',
    name: 'BankCustody',
    component: BankCustody,
    meta: {title: '银行存管介绍'}
  },
  {
    path: '/safe',
    name: 'Safe',
    component: Safe,
    meta: {title: '安全保障'}
  },
  {
    path: '/bind-wechat',
    name: 'BindWechat',
    component: BindWechat,
    meta: {title: '绑定微信有钱领'}
  },
  {
    path: '/news/report2',
    name: 'Report2',
    component: Report2,
    meta: {title: '宏财网CEO王斌首谈经验'}
  },
  {
    path: '/news/report1',
    name: 'Report1',
    component: Report1,
    meta: {title: '宏财网合规经营练内功'}
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {title: '宏财大事件'}
  },
  {
    path: '/risk-education',
    name: 'RiskEducation',
    component: RiskEducation,
    meta: {title: '风险安全教育'}
  },
  {
    path: '*',
    redirect: {name: 'Home'}
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
router.beforeEach((to, from, next) => {
  if (to.meta.title === undefined) {
    document.title = '宏财网'
  } else {
    document.title = to.meta.title
  }
  next()
})
export default router

