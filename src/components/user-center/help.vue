<template>
  <div class="help">
    <!-- 预计回款 -->
    <div v-if="type === '9'">
      <div class="content">
        <div class="column">
          <div class="fl">债权本金</div>
          <div class="fa-down txt-right fr">
          </div>
          <p class="fr">
             {{transferAmount || 0}}元
          </p>
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">本期待收收益</div>
          <div class="fa-down txt-right fr">
          </div>
          <p class="fr">
            {{profit | number}}元
          </p>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            本期代收利息是指该笔债权自本期计息日至今天说产生的待收利息：<br><br>
            债权本金*原项目年均回报率*本期计息天数/365天<br>
            {{transferAmount || 0}} * {{project.annualEarnings || 0}}% * {{profitDate || 0}} / 365 = {{profit | number}}元<br><br> 
            如果该数值为负数，表示本期利息已经提前还款给您，此时债权转让需要扣除今日至本期还款日所产生的利息
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">债权转让奖金</div>
          <div class="fa-down txt-right fr">
          </div>
          <p class="fr">
            {{transferReward | number}}元
          </p>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            债权转让奖金是指您为了尽快转出债权，自愿提高项目回报率而补贴给受让人的奖励金额：<br><br>
            债权本金 *（转让利率 - 原项目年均回报率）* 项目剩余天数/365天<br>
            {{transferAmount || 0}} *（{{transferAnnul || 0}}% - {{project.annualEarnings || 0}}%）* {{remainDay}} / 365 = {{transferReward | number}}元
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">现金券奖励扣款</div>
          <div class="fa-down txt-right fr">
          </div>
          <p class="fr">
            {{deduction | number}}元
          </p>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            现金券奖励扣款是指宏财网按照您成功转出的债权金额等比例扣除您该笔投资所获得的现金券奖励：<br><br>
            现金券奖励 * 债权本金 / 初始投资总额<br>
            {{couponVal || 0}} * {{transferAmount || 0}} / {{creditAmount || 0}} = {{deduction}}元
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">债权转让手续费</div>
          <div class="fa-down txt-right fr">
          </div>
          <p class="fr">
            {{counterFee | number}}元
          </p>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            债权转让手续费是宏财网为您和受让人提供信息匹配和交易撮合所收取的费用，<br><br>
            该笔债权持有时间 < 30天，手续费 = 转让本金 * 1%，<br>
            持有时间 ≥ 30天，手续费 = 转让本金 * 0.5%，手续费最低收取3元。<br>
            <span v-if="currentDate - creditCreateTime < rule.borderDay * 24 * 60 * 60 * 1000">{{transferAmount || 0}} * 1% = {{transferAmount / 100 | number}}元</span>
            <span v-if="currentDate - creditCreateTime >= rule.borderDay * 24 * 60 * 60 * 1000">{{transferAmount || 0}} * 0.5% = {{transferAmount * 0.5 / 100 | number}}元</span>
          </span>  
        </div>
      </div>
    </div>
    <!-- 理解宏财 -->
    <div v-if="type === '1'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.宏财网是谁？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">宏财网于2014年上线运营，2016年获得1亿元A轮国企战略投资，是业内鲜见的同时拥有国资背景和博士高管团队的互联网金融信息服务平台。凭借投资方广泛深耕的金融资源、博士团队的专业金融素养、严谨的风控模型和丰富的项目管理经验，为广大投资者精心提供优质投资项目。</span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.为什么说投资宏财网安全可靠？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1) 国资背景<br/>宏财网2016年获得国有企业-洛阳中小企业资产管理有限公司1亿元战略融资。<br>
            2) 资金存管<br/>宏财网已经正式接入海口联合农商银行资金存管系统，用户的资金安全更有保障。<br>
            3) 产品安全<br/>以中短期投资项目为主，同时具备良好的流动性和不错的回报率。所有项目均来源于十多年积累的金融生态圈优质资产，安全可靠。<br>
            4) 系统安全<br/>使用了SSL128位数据加密与两地三中心容灾备份体系，严密保障用户信息与数据安全,目前正在积极国家建设信息安全与等级保护三级系统。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.银行存管是什么？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">银行存管是指按照有关法律、法规的规定，客户交易结算资金统一交由独立于平台的第三方存管机构来存管。第三方存管机构是指具备第三方存管资格的商业银行。存管银行按照法律、法规的要求，负责客户资金的存取与资金交收，平台交易操作保持不变。</span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">4.如何保障宏财网用户的资金与交易安全？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">您的信息和资金由海口联合农商银行存管，平台不直接经手您的资金，也无权动用您在银行存管系统的资金。你通过银行存管账户投资成功后，资金将直接进入借款人账户。海口联合农商银行会对全交易流程进行核查，使借贷双方的债权关系清晰明确，保障您的资金安全。</span>  
        </div>
      </div>
    </div>
    <!-- 产品介绍 -->
    <div v-if="type === '2'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.收益如何计算？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            项目收益=(投资本金×期望年均回报率)/365*项目投资天数
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.宏财网有哪些产品？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            宏财精选系列：6个月以下中短期投资产品，极为灵活轻便，同时具有较高的回报水准。债权精选自小微产业金融、汽车金融及个人信用贷款等，安全可靠。<br>
            宏财尊贵系列：6-12月中长期投资产品，受到追求更高投资回报和更省心投资体验的高净值投资者的普遍青睐。债权来自信用状况极佳的小微产业金融、以汽车为主的消费金融及个人信用贷款等，安全可靠。<br>
            债权转让产品：为宏财网其他投资者转让的债权资产，投资当日即可计息，稳健可靠。
          </span>  
        </div>
      </div>
    </div>
    <!-- 投资相关 -->
    <div v-if="type === '3'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.投资有手续费吗？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            您在宏财网平台投资是不需要支付手续费的。目前除提现费用外，您在宏财网平台产生的费用均由宏财网承担并向第三方支付平台支付。将来如有规则变更，宏财网将会在官网及APP中公告。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.随时都能投资吗？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            宏财网的购买由我们债权的数量决定，您在宏财的每一份投资都对应一份真实债权，我们承诺不售卖任何一份虚假债权。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.投资标的后的计息日是什么时候开始的？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            成功在宏财网投资某企业的借款标后，计息日为标的借款企业募集满额并且成功放款给该标的借款企业的当日。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">4.什么是自动投标功能？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            平台为方便您投资而开发出的自动投标功能，用户可自定义可投标的利率、投资天数、投资金额等信息，如果平台发布的投资标中有满足用户自定义的标，系统会根据自动投标的排名，自动帮您进行投标，不用自己投标。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">5.项目到期后多久能收到回款？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            回款时间是在项目到期日24:00之前
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">6.债权转让的实际支付金额为什么大于认购金额？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            实际支付金额 = 转让金额 + 当期已产生的待偿利息 - 转让奖金。<br>
            转让奖金 = 转让金额 * ( 转让利率 - 原始利率 ) * 剩余期限 / 365
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">7.购买债权后，已收收益为什么是负值？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            您购买债权时需要先行垫付转让人当期已产生的利息，所以显示收益为负数，该笔利息会在下个还款日支付给您。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">8.什么样的债权可以进行转让？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1) 持有该笔债权大于10天；<br>
            2) 该笔债权距项目完结日大于3天； <br>
            3）该笔债权购买时未参与宏财网线下特定奖励活动。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">9.参加过奖励活动的债权，可以申请转让么？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            可以。使用奖金券的债权，会按转让金额等比例扣除已获奖金。使用加息券的债权，已获加息不扣除，受让人购买使用加息券的债权后，不再继续享有加息收益。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">10.债权转让的手续费是如何收取的？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            该笔债权持有时间 < 30天，手续费 = 转让本金 * 1%，持有时间 ≥ 30天，手续费 = 转让本金 * 0.5%，单笔转让的手续费最低为3元。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">11.宏财网对投资项目的金额有限制吗？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            宏财网项目目前是100起投，无上限。
          </span>  
        </div>
      </div>
    </div>
    <!-- 注册登录 -->
    <div v-if="type === '4'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.实名认证失败怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            以下情况可能会导致实名认证无法通过：<br>
            1) 名字是否有繁体字<br>
            2) 是否改过名字 <br>
            3) 身份证号和姓名不一致<br>
            4) 是否做过户籍变动<br>
            5) 是否是军人专业、复员换的身份证<br>
            如果您是现役军人、或者仅有护照号，则暂时无法完成开户。如在实名认证中遇到任何问题，可致电客服电话：400-900-7626
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.如何更换手机号？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            您好，更换手机号在“个人设置”中操作，输入手机号及验证码即可进行修改。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.登录时忘记密码怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            您若在登录过程中忘记密码，可点击右下方“忘记密码”，通过收取验证码，重置新密码后登陆。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">4.投资或提现时，忘记支付密码怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            点击投资或提现，在输入安全支付密码框下，点击“忘记密码”，输入绑定的银行卡号及手机验证码即可重置密码。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">5.如何修改支付密码或登录密码？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            登录宏财网--点击我的“账户信息”—“安全设置”，修改密码。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">6.注册或登录时收不到验证码怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            如果您在注册或登录过程中，点击“获取验证码”按钮后手机一直收不到验证码，建议等60秒，并查看是否被手机内安全软件拦截，或先重启下您的手机，排除手机自身原因后，再次获取验证码。如果依旧收不到验证码，您可以拨打宏财网客服电话：4009907626进行咨询。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">7.为什么要进行实名认证？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            实名认证是投资者在宏财网平台的重要凭证。为保障资金的安全性和合同的有效性，投资者在首次投资或提现时需要填写身份信息，完成实名认证。宏财网平台承诺对用户的所有身份信息保密。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">8.一个手机号可以注册几个账户吗？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            在宏财网平台，手机号，身份证号都具有唯一性，已注册的手机号，已实名认证的身份信息只能对应一个宏财网账户。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">9.账户登录不上、APP更新不了怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1）账户登录不上，建议您清除下手机缓存或者关机重启后，然后重新进入。<br>
            2）app更新，需要把之前的版本卸载，然后再应用商城重新安装即可
          </span>  
        </div>
      </div>
    </div>
    <!-- 账户管理 -->
    <div v-if="type === '5'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.什么是“同卡进出”？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            为保障用户资金安全，使用银行卡支付的用户需遵循同卡进出的规则。同卡进出是指使用银行卡支付的用户，充值的本金提现时将返回到原卡。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.如何更换我已绑定的银行卡？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            需要您先申请解绑当前银行卡，再绑定您本人名下新的银行卡。为保证资金安全，需确认是本人操作，请发送以下材料到我们的客服邮箱hckf@hongcai.com申请人工解绑，客服会在1-2个工作日内处理。<br>
            1）提供身份证正反面、新银行卡以及原银行卡的照片（或交易流水）；<br>
            2）提供本人与身份证、新银行卡的合照；<br>
            3）商户需要审核：合照上的本人照片与身份证上的照片是否一致、原银行卡和新银行卡与持卡人提供的资料是否一致；<br>
            4）若是因原银行卡丢失而换卡，需提供原银行卡的挂失证明或原银行卡的交易流水；<br>
            5）备注您的姓名及电话，如有问题方便我们联系您。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.宏财网目前支持哪些银行？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            宏财网目前支持的银行有：<br>
            农业银行、中国银行、中信银行、招商银行、交通银行、光大银行、、兴业银行、广发银行、华夏银行、北京银行、工商银行、民生银行、建设银行、邮政银行、浦发银行、平安银行。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">4.如何绑定银行卡？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            用户首次投资，需要先绑定银行卡。银行卡的开户身份证必须与在宏财网账户完成实名认证的身份证保持一致。您可在首页点击“立即投资”或通过“银行卡管理”进行操作。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">5.绑定银行卡遇到的问题怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1）您好，如果您在支付过程中看到提示信息“卡信息或手机号不一致”，您需要确认您在绑定银行卡的流程中输入的手机号信息。预留手机号是您在银行开卡时已校验通过的手机号:<br>
            a.如果您不确定手机号码，需要您联系开卡行进行确认。<br>
            b.如果您已确认预留手机号码，需要您重新绑定银行卡。<br>
            2) 名字中含有生僻字、繁体字，改过名字、做过户籍变更、复原换的身份证，这些因素也可能会失败 ，如果您是现役军人、或者仅有护照号，则暂时无法完成开户。<br>
            3) 收不到短信验证码<br>
            请先检查以下情况排除自身原因，如果依旧收不到验证码，您可以拨打宏财网客服电话： 4009907626进行咨询<br>
            a.是否安装短信拦截或者过滤软件<br>
            b.是否能够正常接收短信（信号问题，欠费停机，关机等<br>
            c.短信收发过程中可能会存在延迟，请耐心等待，短信在30分钟内均有效
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">6.可以绑定几张银行卡？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            目前宏财网一个账户只能绑定一张银行卡，如需换卡需要发邮件人工进行解绑银行卡，再绑定新的银行卡。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">7.账户余额内的资金会产生收益吗？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            账户余额的资金暂时没有对接相应资产，所以未计息，建议您开通自动投标功能，以避免资金闲置。
          </span>  
        </div>
      </div>
    </div>
    <!-- 充值提现 -->
    <div v-if="type === '6'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.一般什么原因导致充值支付失败？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1) 银行卡问题<br>
            绑定银行卡时，银行卡与实名认证姓名不一致；输入的银行卡预留手机号有误；银行卡余额不足；超过银行充值限额；超过用户自己设置的支付限额；没有开通网上支付功能；银行卡的状态异常；输入的银行卡信息有误；您可以确认绑卡信息或咨询发卡行后再进行操作。<br>
            2) 限额问题<br>
            您支付的金额超过了银行限额，您可以降低支付金额，或选择其他银行账户进行支付完成支付。您自己设置的银行卡支付限额过低也会影响充值，可以拨打开卡行客服电话提高支付限额。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.提现什么时候能到账？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            一般一个工作日即可到账（节假日除外），根据不同银行的处理速度，最晚第二个工作日到账。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.提现有手续费吗？提现次数和金额有什么限制？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1）目前提现是有手续费的哦，由第三方支付机构按每笔2元收取；<br>
            2）体现次数不限，单笔无上线，每人每天提现上线为1000W；
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">4.一般什么原因导致提现失败？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            以下原因导致提现失败：<br>
            1）银行卡所属银行的服务出现问题，若您提现的银行卡挂失，注销等状态异常，会造成提现失败。<br>
            2）第三方支付服务出现问题；<br>
            如遇到以上情况，我们会在收到银行转账失败的通知后解除提现资金冻结状态，并在两个工作日内将资金回到您的账户余额，请不必担心资金安全，同时也可以拨打宏财网客服电话：400-9907626进行解决。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">5.如何查看我的历史交易记录？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            您好，可以点击 我的账户-资金流水，查看历史的【投资】、【充值】、【提现】、【回款】、【奖金】、【提现手续费】记录。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">6.提现对银行卡有什么要求？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            1）提现银行卡的开户身份证必须和您在宏财网账户完成实名认证的身份证保持一致。我们会在提现请求发出后验证，如发现两者存在不一致，提现将不会通过。<br>
            2）您提现时，银行卡需处于正常使用状态。若您提现的银行卡挂失，注销等状态异常，会造成提现失败。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">7.银行卡已扣款，但充值未到账，怎么办？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            因不同银行操作划账时间不同，可能导致实际到账时间有延迟。如果没有到账，建议用户过半个小时再查看余额；如果仍未到账，请您联系我们，提供订单号或手机号，为您查询对应的支付请求流水号，并为您核实原因。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">8.各银行对网上交易单笔、单日及单月限额？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            以下是宏财网支持银行的相关限额规定：
            <br>
          </span>
          <div class="banklimit-list">
            <ul class="display-bl margin-auto border-grey">
              <li>
                <div><p class="margin-b-0 display-inb bank-name">支持银行</p><p class="display-inb limit">单笔/单日/单月</p></div>
              </li>
              <li class="clearfix margin-b-0 padding-r-1 border-t-dashed" :class="{'border-none': index === bankLimit.length - 1}" v-for="(card, index) in bankLimit">
                <div><p class="margin-b-0 display-inb bank-name">{{card.bankName}}</p><p class="display-inb limit">{{card.singleLimit < 0 ? '不限': card.singleLimit % 10000 === 0 ? card.singleLimit / 10000 + 'w' : card.singleLimit}}/{{card.dayLimit < 0 ? '不限': card.dayLimit % 10000 === 0 ? card.dayLimit / 10000 + 'w' : card.dayLimit}}/{{card.monthLimit < 0 ? '不限': card.monthLimit % 10000 === 0 ? card.monthLimit / 10000 + 'w' : card.monthLimit}}</p></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户福利 -->
    <div v-if="type === '7'">
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">1.什么是特权本金？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            特权本金是平台奖励给用户的虚拟本金，不可提现或用于投资；其产生的收益按8%年均回报率每日计息、次日显示昨日收益；特权本金产生的收益进入用户账户余额，可用于投资或提现。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">2.什么是加息券？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            加息券是一种奖励优惠券，可针对券面标明的指定产品进行加息。点击使用后，将在原有产品收益率的基础上进行加息，产生的额外收益，于对应产品付息日返还到用户账户中。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.什么是现金券？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            现金券是一种奖励优惠券。用户可根据券面标明的指定产品进行投资，投资后可直接获得等额的现金奖励。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">4.每日抽奖可以抽到哪些奖励？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            转盘内含有当日加息、随机返现、特权本金、现金券、加息券，奖品丰富，保证您每天惊喜连连。
          </span>  
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">5.如何进入宏财网VIP群？进群后享受哪些特权？</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            只要您单笔投资宏财精选或尊贵项目满五万元，即可被邀请入群<br>
            进入宏财网VIP群的用户享有以下特权：<br>
            1）平台最新活动预告<br>
            2）全天候为您答疑解惑，一对一优质贴心服务！<br>
            3）公司发展动态即时播报，第一时间获悉重磅消息！<br>
            4）针对VIP客户量身定制专属现金券、加息券、赚足每一分钱<br>
            5）参与产品调研、设计让我们一起把宏财做得更好<br>
            6）尾单包圆特权本金奖励
          </span>  
        </div>
      </div>
    </div>
    <!-- 客户服务 -->
    <div v-if="type === '8'">
      <div class="content">
        <div class="column">
          <div class="fl">1.客服电话：400-9907626</div>
        </div>
      </div>
      <div class="content">
        <div class="column">
          <div class="fl">2.客服邮箱：hckf@hongcai.com</div>
        </div>
      </div>
      <div class="content">
        <div class="column" @click="showOrHide($event)">
          <div class="fl">3.服务时间：工作日9:00-18:00</div>
          <div class="fa-down txt-right fr">
          </div>
        </div>
        <div class="submenu">
          <span class="padding-l-1 ft-grey7 display-inb padding-b-1p2">
            服务时间以外，如需咨询可发送邮件，我们将在第一时间给予反馈。
          </span>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var submenu = document.getElementsByClassName('submenu')
  import {dateUtil} from '../../service/Utils'
  export default {
    name: 'help',
    data () {
      return {
        type: '1',
        titles: ['了解宏财', '产品介绍', '投资相关', '注册登录', '账户管理', '充值提现', '用户福利', '客户服务', '预计回款'],
        bankLimit: [],
        number: '',
        projectNum: '',
        project: {},
        rule: {},
        orderAmount: 0,
        transferAmount: 0,
        profit: 0,
        currentDate: 0,
        profitDate: 0,
        transferReward: 0,
        remainDay: 0,
        transferAnnul: 0,
        deduction: 0,
        creditAmount: 0,
        counterFee: 0,
        couponVal: 0,
        creditCreateTime: 0
      }
    },
    props: ['token'],
    watch: {
      token: function (val) {
        if (val && val !== '') {
          this.getAssignmentRule()
        }
      }
    },
    created: function () {
      this.type = this.$route.params.type.toString()
      this.number = this.$route.query.number
      this.transferAmount = Number(this.$route.query.amount)
      this.transferAnnul = Number(this.$route.query.annualEarnings)
      this.currentDate = new Date().getTime()
      document.title = this.titles[Number(this.type - 1)]
      if (this.type === '6') {
        this.getBankLimit()
      }
      if (this.type === '9') {
        if (this.token && this.token !== '') {
          this.getAssignmentRule()
        }
      }
    },
    methods: {
      showContent: function (e, content, submenu) {
        for (var i = 0; i < submenu.length; i++) {
          submenu[i].style.display = 'none'
          submenu[i].parentElement.classList.remove('open')
          if (this.type === '9') {
            submenu[i].previousElementSibling.lastChild.previousElementSibling.classList.remove('rotate')
          } else {
            submenu[i].previousElementSibling.lastChild.classList.remove('rotate')
          }
        }
        content.parentElement.lastChild.style.display = 'block'
        content.parentElement.className += ' open'
        if (this.type === '9') {
          content.lastChild.previousElementSibling.className += ' rotate'
        } else {
          content.lastChild.className += ' rotate'
        }
      },
      hideContent: function (e, content, submenu) {
        content.parentElement.lastChild.style.display = 'none'
        content.parentElement.classList.remove('open')
        if (this.type === '9') {
          content.lastChild.previousElementSibling.classList.remove('rotate')
        } else {
          content.lastChild.classList.remove('rotate')
        }
      },
      showOrHide: function (e) {
        var content = e.target
        console.log(e)
        if (content.className === 'content') {
          content = e.target.firstChild
        }
        if (content.className !== 'content' && content.className !== 'column') {
          content = e.target.parentElement
        }
        if (content.parentElement.lastChild.style.display !== 'block') {
          return this.showContent(e, content, submenu)
        } else {
          return this.hideContent(e, content, submenu)
        }
      },
      getBankLimit: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/bankcard/rechargeBankLimits'
        })
        .then(function (res) {
          that.bankLimit = res.data
        })
      },
      getAssignmentRule: function () {
        this.$http({
          url: '/hongcai/rest/assignments/assignmentRule' + '?token=' + this.token
        }).then((res) => {
          this.rule = res.data
          this.getCreditDetail()
        })
      },
      getCreditDetail: function () {
        this.$http({
          method: 'get',
          url: '/hongcai/rest/creditRights/' + this.number + '/creditDetail' + '?token=' + this.token
        }).then((response) => {
          this.project = response.data.project
          this.creditAmount = response.data.creditRight.amount
          this.creditCreateTime = response.data.creditRight.createTime
          // 待收利息天数
          this.profitDate = dateUtil.intervalDays(this.currentDate, response.data.projectBill.lastRepaymentTime) * (this.currentDate > response.data.projectBill.lastRepaymentTime ? 1 : -1)
          // 剩余期限
          this.remainDay = dateUtil.intervalDays(this.project.repaymentDate, this.currentDate)
          // 待收未收利息
          this.profit = this.transferAmount * this.project.annualEarnings * this.profitDate / 36500
          // 转让奖金
          this.transferReward = this.transferAmount * (this.transferAnnul - this.project.annualEarnings) * this.remainDay / 36500
          // 现金券金额
          this.couponVal = response.increaseRateCoupon && response.increaseRateCoupon.type === 2 ? response.increaseRateCoupon.value : 0
          // 现金券奖励扣款
          this.deduction = this.couponVal * (this.transferAmount / this.creditAmount)
          // 手续费
          if (dateUtil.intervalDays(this.currentDate, this.creditCreateTime) < this.rule.borderDay * 24 * 60 * 60 * 1000) {
            this.counterFee = this.transferAmount * this.rule.lessThanOrEqualBorderDayFee / 100 * this.rule.discountFeeRate > this.rule.minFee ? this.transferAmount * this.rule.lessThanOrEqualBorderDayFee / 100 * this.rule.discountFeeRate : this.rule.minFee
          } else {
            this.counterFee = this.transferAmount * this.rule.greaterThanBorderDayFee / 100 * this.rule.discountFeeRate > this.rule.minFee ? this.transferAmount * this.rule.greaterThanBorderDayFee / 100 * this.rule.discountFeeRate : this.rule.minFee
          }
        })
      }
    }
  }
</script>

<style scoped>
  p.fr {
    margin-right: .05rem;
    font-size: .28rem;
    color: #f6611d;
  }
  .help .content {
    overflow: hidden;
    padding: 0 .36rem;
    background-color: #fff;
  }
  .help .content.open {
    background-color: #f8f9fd !important;
    box-sizing: border-box;
  }
  .help .content.open .column {
    background-color: #f8f9fd !important;
    border: none!important;
  }
  .help .content .column {
    border-bottom: 1px solid #eee;
    /* padding: .2rem 0rem; */
    height: 1rem;
    line-height: 1rem;
    background-color: #fff;
    margin-left: 0;
    width: 100%;
    float: left;
    color: #666;
  }
  .help .content .column div.fl {
    font-size: .28rem;
  }
  .column .rotate {
    transform: rotateZ(0deg);
  }
  .submenu {
    display: none;
    text-align: justify;
    padding-left: .2rem;
    padding-bottom: .25rem;
    color: #999;
  }
  .banklimit-list ul {
    margin-top: .2rem;
    border: 1px solid #eee;
    padding: .2rem .3rem;
  }
  .banklimit-list li {
    height: 0.6rem;
    line-height: 0.6rem;
    border-bottom: 1px dashed #ddd;
  }
  .banklimit-list li .bank-name {
    width: 30%;
    text-align: center;
  }
  .banklimit-list li .limit {
    width: 70%;
    text-align: center;
  }
  .border-none {
    border-bottom: none !important;
  }
  .fa-down {
    background: url('../../images/user-center/angle-down.png') no-repeat center .4rem;
    background-size: contain;
    display: block;
    width: .2rem;
    height: 1rem;
    padding-top: .25rem;
    transform: rotateZ(-90deg);
    -webkit-transition: all .2s ease-in;
    -moz-transition: all .2s ease-in;
    transition: all .2s ease-in;
  }
</style> 
