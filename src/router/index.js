import Vue from 'vue'
import Router from 'vue-router'
import Promise from 'es6-promise'
import VueCookie from 'vue-cookie'
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
const MangoPromotion = r => require.ensure([], () => r(require('../components/activity/mangoPromotion.vue')), 'MangoTV')
const MangoTV = r => require.ensure([], () => r(require('../components/activity/MangoTV.vue')), 'MangoTV')
const GoldenFall = r => require.ensure([], () => r(require('../components/activity/goldenFall.vue')), 'GoldenFall')
const GoldenDetail = r => require.ensure([], () => r(require('../components/activity/goldenDetail.vue')), 'GoldenDetail')
const GoldenRecord = r => require.ensure([], () => r(require('../components/activity/goldenRecord.vue')), 'GoldenRecord')
const gameStart = r => require.ensure([], () => r(require('../components/games/game-counting-start.vue')), 'gameStart')
const gameCounting = r => require.ensure([], () => r(require('../components/games/game-counting.vue')), 'gameCounting')
const gameOver = r => require.ensure([], () => r(require('../components/games/game-counting-over.vue')), 'gameOver')
const gameRecord = r => require.ensure([], () => r(require('../components/games/game-counting-record.vue')), 'gameRecord')
const About = r => require.ensure([], () => r(require('../components/about/about.vue')), 'About')
const ManagementTeam = r => require.ensure([], () => r(require('../components/about/managementTeam.vue')), 'About')
const Introduction = r => require.ensure([], () => r(require('../components/about/introduction.vue')), 'About')
const ContactUs = r => require.ensure([], () => r(require('../components/about/contactUs.vue')), 'About')
const Partner = r => require.ensure([], () => r(require('../components/about/partner.vue')), 'About')
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
const Membership = r => require.ensure([], () => r(require('../components/user-center/Membership.vue')), 'Membership')
const AssignmentQuestion = r => require.ensure([], () => r(require('../components/assignmentQuestion.vue')), 'Question')
const RegisterAgree = r => require.ensure([], () => r(require('../components/registerAgree.vue')), 'RegisterAgree')
const AssignmentAgree = r => require.ensure([], () => r(require('../components/assignmentAgree.vue')), 'AssignmentAgree')
const ServiceAgree = r => require.ensure([], () => r(require('../components/serviceAgree.vue')), 'ServiceAgree')
const BusinessSuccess = r => require.ensure([], () => r(require('../components/businessSuccess.vue')), 'BusinessSuccess')
const BankCustody = r => require.ensure([], () => r(require('../components/bankCustody.vue')), 'BankCustody')
const BindWechat = r => require.ensure([], () => r(require('../components/bindWechat.vue')), 'BindWechat')
const News = r => require.ensure([], () => r(require('../components/news/news.vue')), 'News')
const Report1 = r => require.ensure([], () => r(require('../components/news/report1.vue')), 'News')
const Report2 = r => require.ensure([], () => r(require('../components/news/report2.vue')), 'News')
const Report3 = r => require.ensure([], () => r(require('../components/news/report3.vue')), 'News')
const Events = r => require.ensure([], () => r(require('../components/events.vue')), 'Events')
const RiskEducation = r => require.ensure([], () => r(require('../components/riskEducation.vue')), 'RiskEducation')
const Register = r => require.ensure([], () => r(require('../components/activity/oldPeople.vue')), 'Register')
const RegisterSuccess = r => require.ensure([], () => r(require('../components/activity/registerSuccess.vue')), 'Register')
const WanduRegister = r => require.ensure([], () => r(require('../components/activity/wandu-register.vue')), 'WanduRegister')
const WanduSuccess = r => require.ensure([], () => r(require('../components/activity/wandu-success.vue')), 'WanduRegister')
const QRcode = r => require.ensure([], () => r(require('../components/QRcode.vue')), 'QRcode')
const Updates = r => require.ensure([], () => r(require('../components/recommendUpdates.vue')), 'Updates')
const Disclosure = r => require.ensure([], () => r(require('../components/disclosure/disclosure.vue')), 'Disclosure')
const BankDisclosure = r => require.ensure([], () => r(require('../components/disclosure/bankDisclosure.vue')), 'Disclosure')
const RecordInformation = r => require.ensure([], () => r(require('../components/disclosure/recordInformation.vue')), 'Disclosure')
const RiskManagement = r => require.ensure([], () => r(require('../components/disclosure/riskManagement.vue')), 'Disclosure')
const Organization = r => require.ensure([], () => r(require('../components/disclosure/organization.vue')), 'Disclosure')
const BusinessInformation = r => require.ensure([], () => r(require('../components/disclosure/businessInformation.vue')), 'Disclosure')
const Rouse = r => require.ensure([], () => r(require('../components/Rouse.vue')), 'Rouse')
const BreakEgg = r => require.ensure([], () => r(require('../components/activity/breakEgg.vue')), 'BreakEgg')
const BreakEggRecord = r => require.ensure([], () => r(require('../components/activity/breakEggRecord.vue')), 'BreakEggRecord')
const Anniversary = r => require.ensure([], () => r(require('../components/activity/anniversary.vue')), 'Anniversary')
const HappyBirthday = r => require.ensure([], () => r(require('../components/activity/happyBirthday.vue')), 'HappyBirthday')
const SpringFestival = r => require.ensure([], () => r(require('../components/activity/springFestival.vue')), 'SpringFestival')
const SpringRecord = r => require.ensure([], () => r(require('../components/activity/SpringRecord.vue')), 'SpringRecord')

Vue.use(Router)
Vue.use(VueCookie)
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
    children: [
      {
        path: 'management-team',
        name: 'ManagementTeam',
        component: ManagementTeam,
        meta: {title: '走进宏财'}
      },
      {
        path: '',
        name: 'Introduction',
        component: Introduction,
        meta: {title: '走进宏财'}
      },
      {
        path: 'contact-us',
        name: 'ContactUs',
        component: ContactUs,
        meta: {title: '走进宏财'}
      },
      {
        path: 'partner',
        name: 'Partner',
        component: Partner,
        meta: {title: '走进宏财'}
      }
    ]
  },
  {
    path: '/disclosure',
    name: 'Disclosure',
    component: Disclosure,
    children: [
      {
        path: '',
        name: 'BankDisclosure',
        component: BankDisclosure,
        meta: {title: '信息披露'}
      },
      {
        path: 'record-information',
        name: 'RecordInformation',
        component: RecordInformation,
        meta: {title: '信息披露'}
      },
      {
        path: 'risk-management',
        name: 'RiskManagement',
        component: RiskManagement,
        meta: {title: '信息披露'}
      },
      {
        path: 'organization',
        name: 'Organization',
        component: Organization,
        meta: {title: '信息披露'}
      },
      {
        path: 'business-information',
        name: 'BusinessInformation',
        component: BusinessInformation,
        meta: {title: '信息披露'}
      }
    ]
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
    path: '/user-center/membership',
    name: 'Membership',
    component: Membership,
    meta: {title: '等级说明'}
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
    path: '/activity/cool-ranking',
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
    path: '/activity/mangoTV',
    name: 'MangoTV',
    component: MangoTV,
    meta: {title: '0元变身VIP'}
  },
  {
    path: '/activity/mango-push',
    name: 'MangoPromotion',
    component: MangoPromotion,
    meta: {title: '0元变身VIP'}
  },
  {
    path: '/activity/golden-fall',
    name: 'GoldenFall',
    component: GoldenFall,
    meta: {title: '蟹逅金秋'}
  },
  {
    path: '/activity/golden-detail',
    name: 'GoldenDetail',
    component: GoldenDetail,
    meta: {title: '积分明细'}
  },
  {
    path: '/activity/golden-record',
    name: 'GoldenRecord',
    component: GoldenRecord,
    meta: {title: '兑换记录'}
  },
  {
    path: '/games/game-counting-start',
    name: 'gameStart',
    component: gameStart,
    meta: {title: '拼手速抢红包'}
  },
  {
    path: '/games/game-counting/:gameType',
    name: 'gameCounting',
    component: gameCounting,
    meta: {title: '拼手速抢红包'}
  },
  {
    path: '/games/game-counting-record',
    name: 'gameRecord',
    component: gameRecord,
    meta: {title: '拼手速抢红包'}
  },
  {
    path: '/games/game-counting-over',
    name: 'gameOver',
    component: gameOver,
    meta: {title: '拼手速抢红包'}
  },
  {
    path: '/activity/break-egg',
    name: 'BreakEgg',
    component: BreakEgg,
    meta: {title: '诞旦有惊喜'}
  },
  {
    path: '/activity/break-egg-record',
    name: 'BreakEggRecord',
    component: BreakEggRecord,
    meta: {title: '诞旦有惊喜'}
  },
  {
    path: '/activity/anniversary',
    name: 'Anniversary',
    component: Anniversary,
    meta: {title: '三周年狂欢'}
  },
  {
    path: '/activity/happy-birthday',
    name: 'HappyBirthday',
    component: HappyBirthday,
    meta: {title: 'happy birthday'}
  },
  {
    path: '/activity/spring-festival',
    name: 'SpringFestival',
    component: SpringFestival,
    meta: {title: '新春红包'}
  },
  {
    path: '/activity/Spring-record',
    name: 'SpringRecord',
    component: SpringRecord,
    meta: {title: '查看详情'}
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
    path: '/news',
    name: 'News',
    component: News,
    children: [
      {
        path: 'report1',
        name: 'Report1',
        component: Report1,
        meta: {title: '宏财网合规经营练内功'}
      },
      {
        path: 'report2',
        name: 'Report2',
        component: Report2,
        meta: {title: '宏财网CEO王斌首谈经验'}
      },
      {
        path: 'report3',
        name: 'Report3',
        component: Report3,
        meta: {title: '媒体报道'}
      }
    ]
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
    path: '/activity/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/activity/register-success',
    name: 'RegisterSuccess',
    component: RegisterSuccess
  },
  {
    path: '/wandu-register',
    name: 'WanduRegister',
    component: WanduRegister
  },
  {
    path: '/wandu-success',
    name: 'WanduSuccess',
    component: WanduSuccess
  },
  {
    path: '/qrcode',
    name: 'QRcode',
    component: QRcode
  },
  {
    path: '/updates',
    name: 'Updates',
    component: Updates,
    meta: {title: '发现新版本'}
  },
  {
    path: '/:page',
    name: 'Rouse',
    component: Rouse,
    meta: {title: '宏财网'}
  },
  {
    path: '/:page/:type',
    name: 'Rouse',
    component: Rouse,
    meta: {title: '宏财网'}
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
