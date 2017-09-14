<template>
  <!-- 宏财网服务协议-直投、宏财网服务协议-债转、老项目合同区分 contractType：1——直投，2——债转，4——老合同，3——债权转让协议 ，5——降息换物渠道项目合同 -->
  <div>
    <div class="agreement-area row" v-show="contractType === 1 || contractType === 4">
      <p class="text-title">宏财网服务协议</p>
      <p class="text-right" v-if="!contracts.total">合同编号：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
      <p class="text-right" v-else="contracts">合同编号：{{contracts.contractNumber}}</p>
      <div class="row">
        <p><strong class="agree-mg text-justify">为了维护您的权益，请在签署本协议前，仔细阅读、充分理解本协议各条款（特别是加重、免除或限制协议一方责任条款），关注您在协议中的权利、义务。请您审慎阅读并选择接受或不接受本协议。您一经选择接受即视为对本协议全部条款已充分理解并完全接受。</strong></p>
        <p v-if="!contracts.total"><strong class="agree-mg">本协议由以下双方于【&nbsp&nbsp&nbsp】年【&nbsp&nbsp&nbsp】月【&nbsp&nbsp 】日在中华人民共和国（以下简称“中国”）北京签订。</strong></p>
        <p v-else="contracts"><strong class="agree-mg">本协议由以下双方于【{{contracts.year}}】年【{{contracts.month}}】月【{{contracts.day}}】日在中华人民共和国（以下简称“中国”）北京签订。</strong></p>
        <br>
        <p><strong class="agree-mg">协议各方：</strong></p>
        <p v-show="contractType === 1"><strong class="agree-mg">甲方（出借人）：</strong>{{contracts.total ? '详见附件1' : ' '}}</p>
        <div v-show="contractType === 4">
          <p><strong class="agree-mg">甲方（出借人）：</strong>{{contracts.userRealName}}</p>
          <p><strong class="agree-mg">宏财网用户/会员名：</strong>{{contracts.userName}}</p>
        </div>
        <br>
        <p><strong class="agree-mg">乙方（借款人）：</strong>{{contracts.enterpriseName}}
        <p>企业法人营业执照注册号：{{contracts.entRegistrationNo}}</p> 直投 + 老合同
        <p>身份证号码：</p> 借款方个人
        </p>
        <br>
        <p><strong class="agree-mg">丙方（居间人）：北京竞财投资服务有限公司</strong></p>
        <p>企业法人营业执照注册号：110107018557568</p>  直投 + 老合同
        <p>统一社会信用代码：91110107330246732H</p>  借款方个人 + 借款方企业
        <br>
        <p class="agree-tx">本协议中，甲方、乙方、丙方单称“一方”，合称“各方”。</p>
        <br>
        <p><strong class="agree-mg">鉴于：</strong></p>
        <p class="agree-tx">1、甲方（出借人）系符合中华人民共和国法律（以下简称“中国法律”）（仅为本协议之目的，不包括香港特别行政区、澳门特别行政区和台湾省的法律法规）规定,具有完全民事权利能力和民事行为能力，能够独立承担本协议项下权利义务的自然人。在特定情况下，借款转让后的甲方或出借人可能是符合中国法律规定的企业法人或其他机构。</p>
        <p class="agree-tx">2、乙方（借款人）系符合中国法律规定,具有完全民事权利能力和民事行为能力，能够独立行使和承担本协议项下权利义务的自然人、法人或其他组织。</p>
        <p class="agree-tx">3、丙方是依法成立并运营的网络借贷信息中介机构（域名：www.hongcai.com，以下简称“宏财网”）。甲方通过宏财网向乙方提供借款，丙方为本协议项下借款提供居间服务。</p>
        <p class="agree-tx">为此，根据国家有关法律法规，甲、乙、丙三方本着平等自愿、诚实守信、互惠互利的原则，立此协议，共同遵守。</p>
        <br>
        <p><strong class="agree-mg">借款</strong></p>
        <p><strong class="agree-mg">第一条 &nbsp&nbsp借款</strong></p>
        <p class="agree-tx">1.1  借款基本信息</p>
        <div class="col-md-10 col-md-offset-2 tbl">
          <table border="1">
            <tr >
              <td width="120" align="center">借款用途</td>
              <td width="400" align="center" v-html="contracts.financingPurpose"></td>
            </tr>
            <tr >
              <td width="120" align="center">借款金额</td>
              <td width="400" align="center" v-if="!contracts.total">人民币（大写）<u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp整</u>（小写）RMB<u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp元</u><br></td>
              <td width="400" align="center" v-else="contracts">人民币（大写）<u>{{contracts.Total}}</u>（小写）RMB<u>{{contracts.total}}元</u><br></td>
            </tr>
            <tr>
              <td width="120" align="center">借款利率</td>
              <td width="400" align="center"><u>{{contracts.annualEarnings}}%</u></td>
            </tr>
            <tr>
              <td width="120" align="center">借款期限</td>
              <td width="400" align="center"><u>{{contracts.cycle}} ( 月 )</u></td>
            </tr>
            <tr>
              <td width="120" align="center">每月还款本息数额及还款日</td>
              <td width="400" align="center" v-show="contractType === 4">详情见附件1《还款计划表》</td>
              <td width="400" align="center" v-show="contractType === 1">详情见附件2《还款计划表》</td>
            </tr>
            <tr>
              <td width="120" align="center">借款放款日</td>
              <td width="400" align="center" v-if="!contracts.total"><u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u></td>
              <td width="400" align="center" v-else="contracts"><u>{{contracts.loanTime}}</u></td>
            </tr>
            <tr>
              <td width="120" align="center">借款最终到期日</td>
              <td width="400" align="center" v-if="!contracts.total"><u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u></td>
              <td width="400" align="center" v-else="contracts"><u>{{contracts.repaymentDate}}</u></td>
            </tr>
          </table>
        </div>
          <p class="agree-tx">除非文意另有所指或另有约定，下列词语具有以下含义：</p>
          <p class="agree-tx">1.2 借款金额是指本协议第1.1条中列明的借款本金金额。借款币种为人民币。</p>
          <p class="agree-tx">1.3 借款用途是指本协议第1.1条中列明的借款用途。</p>
          <p class="agree-tx">1.4 借款期限是指自借款放款日起至最终到期日（全部借款到期日）止的期间。</p>
          <p class="agree-tx">1.5 借款利率是指本协议第1.1条中列明的借款利率，以年化利率的方式表示。月利率=年化利率/12，日利率=年化利率/365。</p>
          <p class="agree-tx">1.6 借款放款日是指本协议第1.1条中列明的借款放款日，为甲方之借款成功发放之日。</p>
          <p class="agree-tx">1.7 还款日是指本协议第1.1条中列明的还款日，为借款人每月还本付息的日期；如当月无该日期，则以当月的最后一日为还款日。最后一期的还款日为借款的最终到期日。</p>
          <p class="agree-tx">1.8 工作日是指中华人民共和国法律规定的工作日。</p>
        <br>
        <p><strong class="agree-mg">第二条 &nbsp&nbsp出借资金冻结与发放</strong></p>
        <p class="agree-tx">2.1 乙方或其受托人通过宏财网勾选“同意《宏财网服务协议》”并点击【确认】按钮后，视为签订本协议。</p>
        <p class="agree-tx">2.2 甲方通过宏财网对乙方发布的借款需求勾选“同意《宏财网服务协议》”并点击【立即投资】按钮及完成相应支付时，视为甲方签订本协议，并不可撤销地授权第三方资金存管机构冻结甲方确认向乙方出借的金额{{ contractType === 1 ? '，出借金额详见附件1。' : '等同于本协议第1.1条中列明的“借款金额”的资金。'}}</p>
        <p class="agree-tx">2.3 协议成立：乙方在宏财网上发布借款需求，丙方、甲方在宏财网上依照约定进行相关操作完成本协议的签订后，本协议成立。</p>
        <p class="agree-tx">2.4 协议生效：出借资金累计等于乙方借款金额时本协议即时生效。</p>
        <p class="agree-tx">2.5 协议成立：乙方在宏财网上发布借款需求，丙方出具签署协议书面确认书，丁方、甲方在宏财网上依照约定进行相关操作完成本协议的签订后，本协议成立。</p>
        <p class="agree-tx">2.6 放款日为丙方在宏财网上点击【确认放款】按钮时日。</p>
        <p class="agree-tx">2.7 自乙方在宏财网上发布借款需求信息之日起（ {{contracts.release}}）日，宏财网上出借人同意向乙方出借的资金金额累计仍未满足乙方本次在宏财网上发布的借款需求时，则于（ {{contracts.releaseEndTime}}）日24：00起终止发布借款需求信息，甲方存管账户中的出借资金自动解冻。</p>
        <p class="agree-tx">2.8 协议生效后，凡因乙方原因导致甲方出借资金未能成功发放的，均视为乙方放弃借款，乙方应承担相应责任，按丙方收费规则及有关协议支付提前终止借款费，甲方按确认出借金额的0.4%从上述提前终止借款费中收取，甲乙双方不可撤销地授权丙方从乙方存管账户中直接扣收或代收。</p>
        <br>
        <p><strong class="agree-mg">第三条 &nbsp&nbsp还款</strong></p>
        <p class="agree-tx">3.1 乙方按照以下第（  {{contracts.total ? '3.1.2' : ''}} ）种方式还本付息：</p>
        <p class="agree-tx">3.1.1 实行利随本清方式还款，到期一次性归还借款本息。</p>
        <p class="agree-tx">3.1.2 按月结息，到期还本。结息日为每月的（ {{contracts.accountDay}} ）日。乙方须于每一结息日结息。如借款本金的最后一次偿还日不在结息日，则未付利息应利随本清。</p>
        <p class="agree-tx">3.1.3 按月等额本息还款法按每个月还款，还款日为每期末月的<u> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </u>（20日/借款发放日对应日）。如无借款发放日对应日，以所在期末月的最后一日为还款日。计算公式如下：</p>
        <img src="../images/agreement.png" width="100%">
        <p class="agree-tx">3.2 乙方不可撤销地授权第三方存管机构,按还款计划将金额等同于甲方当期应收金额的资金（即乙方当期应偿还的借款本金或利息）由乙方存管账户划转至甲方存管账户中，划转完毕即视为本期还款成功。</p>
        <p class="agree-tx">3.3 乙方应于每期还款日（如遇国家法定节假日，则借款还本付息日顺延至节后第一个工作日）下午3点前履行还款义务。为保证还款成功，乙方至少应于每期还款日前三日，将足以偿还当期借款本金或利息的款项转入（包括但不限于充值等方式）乙方存管账户。若乙方存管账户中资金不足以清偿当期借款本金或利息，导致还款不成功，乙方承担补足义务。乙方应于乙方不可撤销地授权第三方存管机构将相应款项由乙方存管账户划转至甲方存管账户。</p>
        <br>
        <p><strong class="agree-mg">第四条 &nbsp&nbsp债权转让</strong></p>
        <p class="agree-tx">借款期限内，一定条件下，甲方对乙方的债权可进行转让，具体细则另行规定。</p>
        <br>
        <p><strong class="agree-mg">各方权利与义务</strong></p>
        <p><strong class="agree-mg">第五条 &nbsp&nbsp甲方权利和义务</strong></p>
        <p class="agree-tx">5.1 依据本协议约定按时足额向借款人发放借款，并保证资金来源合法。</p>
        <p class="agree-tx">5.2 有权依照本协议约定收回本金及收取利息。</p>
        <p class="agree-tx">5.3 乙方违约时，授权丙方向乙方主张权利，包括但不限于追偿借款本金及利息、罚息、违约金、损害赔偿金以及诉讼（仲裁）费、律师费等实现债权、担保权的费用等。</p>
        <p class="agree-tx">5.4.有权了解借款人基本情况、借款使用情况、担保人及担保物情况。</p>
        借款方个人 + 借款方企业
        <p class="agree-tx">5.5 应当对借款人信息予以保密，不得非法收集、使用、加工、传输借款人信息，不得非法买卖、提供或者公开借款人个人信息。</p>
        <br>
        <p><strong class="agree-mg">第六条 &nbsp&nbsp乙方权利和义务</strong></p>
        <p class="agree-tx">6.1 按照本协议的约定取得和使用借款。</p>
        <p class="agree-tx">6.2 按丙方要求如实提供与本协议项下借款有关的资料（包括但不限于文件、资料和单据等），并对其真实性、准确性、完整性和有效性负责。</p>
        <p class="agree-tx">6.3 按时足额还本付息。</p>
        <p class="agree-tx">6.4 住所、通信地址、联系方式等发生变动时，应在前述变动发生之日起2个工作日内书面通知丙方并提供相应的证明文件。</p>
        <p class="agree-tx">6.5 出现以下重大不利情形时，应在该等情形发生之日起两日内书面通知丙方，必要时需提供有效担保或采取其他补救措施。</p>
        <p class="agree-tx">该等重大不利情形包括但不限于：涉及重大诉讼；已全部或者部分丧失还款能力；财务状况恶化或者因其他原因导致还款能力明显下降；担保物（如有）价值减少、毁损、灭失、被征用、被征收以及因附合、混合、加工使担保物所有权归属第三人或者出现权属争议等影响甲方实现担保物权；与金融机构或非金融机构签订的借款合同或担保合同项下发生任何违约事项；乙方或其下属公司牵连重大违纪、违法或被索赔事件，出严重困难或财务状况恶化，发生重大债权债务纠纷引起诉讼、仲裁等事件；其他影响还款能力的事项等。</p>
        <p class="agree-tx">6.6 乙方应配合甲方或丙方的要求，出具相关文件；并不可撤销地授权甲方或丙方，可向中国人民银行征信系统或其他数据信息系统，或有关单位、部门或个人，查询其信用状况，查询、打印和保存其信息和信用报告；可按照有关规定向中国人民银行征信系统或其他数据信息系统提供借款人基本信息和其他相关信息。</p>
        <br>
        <p><strong class="agree-mg">第七条 &nbsp&nbsp丙方权利义务</strong></p>
        <p class="agree-tx">7.1 为本协议项下借款提供信息交互平台居间服务。</p>
        <p class="agree-tx">7.2 有权向有关方收取信息服务费用，具体协议另行签订。</p>
        <p class="agree-tx">7.3 如乙方违约时，代理甲方向有关各方主张权利，包括但不限于追偿借款本金及利息、罚息、违约金、损害赔偿金以及诉讼（仲裁）费、律师费等实现债权、担保权的费用等。</p>
        <p class="agree-tx">7.4 乙方未履行还款义务，有权就乙方的违约行为进行公开披露，包括但不限于：</p>
        <p class="agree-tx">7.4.1 将乙方的有关基本资料或其他相关信息通过宏财网公布，向有关媒体披露或公告催收；</p>
        <p class="agree-tx">7.4.2 将乙方的有关基本资料及其他相关信息备案在“违约信息记录”，按照有关规定提供向中国人民银行征信系统或其他数据信息系统等。</p>
        <br>
        <p><strong class="agree-mg">违 约 责 任</strong></p>
        <p><strong class="agree-mg">第八条  &nbsp&nbsp违约责任</strong></p>
        <p class="agree-tx">8.1 发生下列情形之一者，乙方应承担相应违约责任：</p>
        <p class="agree-tx">8.1.1 乙方未按约定期限按时足额偿还款本息的，承担逾期还款违约责任。各方同意并确认，丙方有权要求乙方按逾期部分每日万分之五计收向甲方支付罚息；</p>
        <p class="agree-tx">8.1.2 乙方未按约定提供用途证明，或提供虚假用途证明，或未按本协议约定用途使用借款的，足以严重影响乙方还款能力的，丙方有权要求乙方自违约使用借款之日起，按违约部分金额的每日万分之五计向甲方支付罚息。</p>
        <p class="agree-tx">8.1.3 乙方不配合甲方、丙方核查贷款用途或违约使用之日无法查明的，足以严重影响乙方还款能力的，丙方有权要求乙方从借款之日起，按借款总额每日万分之五向甲方支付罚息。</p>
        <p class="agree-tx">8.1.4 乙方发生本协议6.5中重大不利之情形，足以影响乙方还款能力，乙方未能向甲方提供有效担保或及时采取其他补救措施的，丙方有权宣布本协议项下借款全部到期，要求乙方立即向甲方偿还所欠借款本息，并要求其按借款总额或尚未履行部分金额的百分之三十向甲方支付违约金。</p>
        <br>
        <p><strong class="agree-mg">其  他</strong></p>
        <p><strong class="agree-mg">第九条 &nbsp&nbsp承诺及保证</strong></p>
        <p class="agree-tx">9.1各方在此确认其为具有完全民事权利能力和完全民事行为能力的自然人或为按照中国法律合法设立并有效存续的企业法人或其他机构，有权签订并履行本协议。并甲、乙保证：其为宏财网注册用户并在本协议有效期内保持宏财网注册用户身份；</p>
        <p class="agree-tx">9.2 各方承诺并保证，各方已采取一切所需行动，以及（除本协议另有明确规定外）取得签订本协议所需的一切同意书、批文、授权和许可。本协议的签订，不会违反（包括但不限于）(i)各方的公司章程，(ii)各方的其它任何协议或义务，或(iii)任何中国或其它有关的地域的现行法律、法规或法令。其在本协议上签字的代表已被授予全权签署本协议。</p>
        <p class="agree-tx">9.3 甲方承诺并保证其向乙方提供的资金来源合法。 乙方承诺并保证其向甲方、丙方提供的所有信息均为真实、准确、完整和有效。</p>
        <p class="agree-tx">9.4 各方承诺并保证，不会利用丙方或宏财网进行信用卡套现、洗钱、非法集资或其他不正当交易行为，否则应依法独立承担相应法律责任。</p>
        <p class="agree-tx">9.5 各方确认，甲、乙授权或委托丙方根据本协议所采取的全部行动和措施的法律后果均归属于甲、乙方；在任何情形下，丙方或宏财网不是本协议项下任何借款或债务的债务人或需要以其自有资金偿还本协议项下的任何借款或债务，丙方或宏财网亦不是本协议项下担保的担保人或需要以其自有资金承担本协议项下的担保责任。</p>
        <p class="agree-tx">9.6 各方同意并承诺，本协议项下甲、乙方相互之间提供信息时均应同时提供或抄送给丙方。</p>
        <p class="agree-tx">9.7 各方同意并确认，各方委托丙方保管所有与本协议有关的书面文件及电子信息。若各方出示的书面文件或电子信息不一致，以丙方提供的书面文件或电子信息为准（其中书面文件与电子信息不同的，以书面文件为准）。</p>
        <br>
        <p><strong class="agree-mg">第十条 &nbsp&nbsp通知</strong></p>
        <p class="agree-tx">10.1 本协议任何一方根据本协议约定做出的通知和/或文件均应以书面形式做出，包括但不限于由专人送达、挂号邮递、特快专递或通过宏财网发布（包括但不限于公告、站内消息等）等方式送达。</p>
        <p class="agree-tx">10.2 通知在下列日期视为送达：</p>
        <p class="agree-tx">10.2.1 专人递送的通知，在专人递送之交付日为有效送达；</p>
        <p class="agree-tx">10.2.2 以挂号信（付清邮资）发出的通知，在寄出（以邮戳为凭）后的五个工作日内为有效送达；</p>
        <p class="agree-tx">10.2.3 以特快专递（付清邮资）发出的通知，在寄出（以邮戳为凭）后的三个工作日内为有效送达；</p>
        <p class="agree-tx">10.2.4 以电子邮件发出的通知，在电子信息反馈为送达后一个工作日内为有效送达；</p>
        <p class="agree-tx">10.2.5 通过宏财网发布的方式（包括但不限于公告、站内消息等方式）通知的，在宏财网发布之日为有效送达。</p>
        <br>
        <p><strong class="agree-mg">第十一条 &nbsp&nbsp保密条款</strong></p>
        <p class="agree-tx">11.1 本协议的任何一方在本协议履行过程中，或为履行本协议的需要，从其他各方所获得的有关商业秘密，未经其他各方同意，不得向任何第三方披露。但是各方聘请的律师、会计师、审计师、评估师或根据法律法规规定及有权部门要求提供的除外。</p>
        <p class="agree-tx">11.2 本协议任何一方应采取所有其他必要、适当和可采取的措施，以确保保密信息的保密性。</p>
        <br>
        <p><strong class="agree-mg">第十二条 &nbsp&nbsp费用承担</strong></p>
        <p class="agree-tx">与本协议有关的公证、登记、评估、鉴定、见证、运输、保管等费用由乙方承担。</p>
        <br>
        <p><strong class="agree-mg">第十三条 &nbsp&nbsp不可抗力</strong></p>
        <p class="agree-tx">除非文意另有所指或另有规定,不可抗力是指受影响一方不能合理控制的、无法预料或即使可预料到也不可避免且无法克服，并于本协议签订日之后出现的，使该方对本协议全部或部分的履行在客观上成为不可能或不实际(包括但不限于花费合理金额仍无法履行)的任何事件。此等事件包括但不限于任何政府机构行为（无论有效或无效）、火灾、水灾、风暴、暴乱、爆炸、自然灾害、战争、破坏活动、劳工问题（包括停工、罢工和怠工）以及法院禁令或裁定。</p>
        <p class="agree-tx">不可抗力发生时，各方应立即通过友好协商决定如何执行本协议。不可抗力或其影响终止或消除后，各方双方须立即恢复履行各自在本协议项下的各项义务。</p>
        <br>
        <p><strong class="agree-mg">第十四条 &nbsp&nbsp法律适用及争议解决</strong></p>
        <p class="agree-tx">本协议的签订、履行、终止、解释均适用中国法律。各方同意，因本协议所产生的或与本协议有关的一切争议，各方应协商解决；协商无法达成一致的，各方一致同意将争议提交中国国际经济贸易仲裁委员会，在北京按照申请时该会现行有效的仲裁规则进行仲裁。仲裁裁决是终局的，对各方均有约束力。</p>
        <br>
        <div v-show="contractType === 1">
          <p><strong class="agree-mg">第十五条 &nbsp&nbsp风险提示 </strong></p>
          <p class="agree-tx">15.1 政策风险 国家因宏观政策、财政政策、货币政策、行业政策、地区发展、法律法规等因素引起的政策风险。</p>
          <p class="agree-tx">15.2 信用风险 当乙方发生资金状况的风险，或者乙方的还款意愿发生变化时，甲方的出借资金可能无法按时收回，但乙方需严格按照本协议承担违约责任。 </p>
          <p class="agree-tx">15.3 不可抗力 由于战争、动乱、自然灾害等不可抗力因素的出现而可能导致甲方资产损失的风险。</p>
          <p><strong class="agree-mg">第十六条 &nbsp&nbsp其他事项 </strong></p>
          <p class="agree-tx">16.1 本协议所称担保物（如有）包括抵押物、质物和出质权利。</p>
          <p class="agree-tx">16.2 各方同意并确认，委托丙方对本协议项下的任何金额进行计算；在无明显错误的情况下，平台对本协议项下任何金额的任何证明或确定，应作为该金额有关事项的终局证明。</p>
          <p class="agree-tx">16.3 本协议各条款之标题仅为方便查阅而设，不具法律效力或影响本协议的解释。</p>
          <p class="agree-tx">16.4 本协议中部分条款根据相关法律法规等的规定为无效，或部分无效时，该等无效不影响本协议项下其他条款的效力，各方仍应履行其在本协议项下的义务。</p>
          <p class="agree-tx">16.5 本协议项下的附件和补充协议构成本协议不可分割的一部分。</p>
          <p class="agree-tx">16.6 本协议未尽事宜，遵照有关法律法规和执行。</p>
        </div>
        <div v-show="contractType === 4">
          <p><strong class="agree-mg">第十五条 &nbsp&nbsp其他事项 </strong></p>
          <p class="agree-tx">15.1 本协议所称担保物（如有）包括抵押物、质物和出质权利。</p>
          <p class="agree-tx">15.2 各方同意并确认，委托丙方对本协议项下的任何金额进行计算；在无明显错误的情况下，平台对本协议项下任何金额的任何证明或确定，应作为该金额有关事项的终局证明。</p>
          <p class="agree-tx">15.3 本协议各条款之标题仅为方便查阅而设，不具法律效力或影响本协议的解释。</p>
          <p class="agree-tx">15.4 本协议中部分条款根据相关法律法规等的规定为无效，或部分无效时，该等无效不影响本协议项下其他条款的效力，各方仍应履行其在本协议项下的义务。</p>
          <p class="agree-tx">15.5 本协议项下的附件和补充协议构成本协议不可分割的一部分。</p>
          <p class="agree-tx">15.6 本协议未尽事宜，遵照有关法律法规和执行。</p>
        </div>
        <p><strong class="agree-mg">（以下无正文) </strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p><strong class="agree-mg">（本页无正文，为签字页）</strong></p>
        <div v-show="contractType === 1">
          <p><strong class="agree-mg">各方签章：</strong></p>
          <p><strong class="agree-mg">甲方：<span v-for="(item, index) in LenderNames">{{item}}{{LenderNames.length === index + 1 ? '' : '、'}}</span></strong></p>
          <br>
          <br>
          <br>
          <br>
          <br>
          <p><strong class="agree-mg">乙方：{{contracts.enterpriseName}}</strong></p>
          <br>
          <br>
          <br>
          <br>
          <br>
          <p><strong class="agree-mg">丙方：北京竞财投资服务有限公司</strong></p>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
      <div class="annex1">
        <p class="text-left">附件1</p>
        <br>
        <table v-if="contracts.total" v-show="contractType === 1">
          <thead>
            <td>甲方姓名 </td>
            <td>身份证号</td>
            <td>出借金额</td>
            <td>债权编号</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in contracts.orderList">
              <td>{{item.name}}</td>
              <td>{{item.idNo}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.number}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="contractType === 1">
        <br>
        <br>
        <br>
        <br>
      </div>
      <div class="annex">
        <p class="text-left" v-show="contractType === 1">附件2</p>
        <br>
        <p class="text-center" v-if="preRepaymentList.length >0 && isLoan !== 0">还款计划（单位：元、月/日）</p>
        <table v-if="preRepaymentList.length >0 && isLoan !== 0">
          <thead>
            <td>序号</td>
            <td>还款日</td>
            <td>还款金额</td>
            <td>还款类型</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in preRepaymentList">
              <td>{{index + 1}}</td>
              <td>{{item.repaymentTime | date}}</td>
              <td>{{item.repaymentAmount | number}}</td>
              <td>{{item.type === 1 ? '利息' : '本息'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="agreement-area row" v-show="contractType === 2">
      <p class="text-title">宏财网服务协议</p>
      <p class="text-right" v-if="!contracts.total">合同编号：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>    
      <p class="text-right" v-else="contracts">合同编号：{{contracts.contractNumber}}</p>
      <div class="row">
        <p><strong class="agree-mg text-justify">为了维护您的权益，请在签署本协议前，仔细阅读、充分理解本协议各条款（特别是加重、免除或限制协议一方责任条款），关注您在协议中的权利、义务。请您审慎阅读并选择接受或不接受本协议。您一经选择接受即视为对本协议全部条款已充分理解并完全接受。</strong></p>
        <p v-if="!contracts.total"><strong class="agree-mg">本协议由以下双方于【&nbsp&nbsp&nbsp】年【&nbsp&nbsp&nbsp】月【&nbsp&nbsp 】日在中华人民共和国（以下简称“中国”）北京签订。</strong></p>
        <p v-else="contracts"><strong class="agree-mg">本协议由以下双方于【{{contracts.year}}】年【{{contracts.month}}】月【{{contracts.day}}】日在中华人民共和国（以下简称“中国”）北京签订。</strong></p>
        <br>
        <p><strong class="agree-mg">协议各方：</strong></p>
        <p><strong class="agree-mg">甲方（受让方/投资人）：</strong>{{contracts.total ? '详见附件1' : ' '}}</p>
        <br>
        <p><strong class="agree-mg">乙方（转让方/原债权人）：</strong>{{contracts.enterpriseName}}
        <p>身份证号码：{{contracts.entRegistrationNo}}</p>原债转 + 债转方-个人
        <p>统一社会信用代码：</p> 债转方-企业
        </p>
        <br>
        <p><strong class="agree-mg">丙方（居间人）：北京竞财投资服务有限公司</strong></p>
        <div>原债转
          <p>企业法人营业执照注册号：110107018557568</p>
          <p>组织机构代码：33024673-2</p>
        </div>
        <p>统一社会信用代码：91110107330246732H</p>  债转方-个人 + 债转方-企业
        <br>
        <p class="agree-tx">本协议中，甲方、乙方、丙方单称“一方”，合称“各方”。</p>
        <br>
        <p><strong class="agree-mg">鉴于：</strong></p>
        <p class="agree-tx">1、甲方（受让方）系符合中华人民共和国法律（以下简称“中国法律”）（仅为本协议之目的，不包括香港特别行政区、澳门特别行政区和台湾省的法律法规）规定的具有完全民事权利能力和民事行为能力，独立承担本协议项下权利义务的自然人。在特定情况下，债权转让后的甲方或受让方可能是符合中国法律规定的企业法人或其他机构。</p>
        <p class="agree-tx">2、乙方（转让方）系符合中国法律规定的具有完全民事权利能力和民事行为能力，独立行使和承担本协议项下权利义务的自然人、法人或其他组织。</p>
        <p class="agree-tx">3、丙方是依法成立并运营的网络借贷信息中介机构（域名：www.hongcai.com，以下简称“宏财网”）。甲方通过宏财网受让乙方原债权，丙方为本协议项下债权转让提供居间服务。</p>
        <p class="agree-tx">4、原债务人是指原《借款协议》中的借款人。</p>
        <p class="agree-tx">为此，根据国家有关法律法规，甲、乙、丙三方本着平等自愿、诚实守信、互惠互利的原则，立此协议，共同遵守。</p>
        <br>
        <p><strong class="agree-mg">债 权 转 让 条 款</strong></p>
        <p><strong class="agree-mg">第一条 &nbsp&nbsp债权转让信息</strong></p>
        <div class="col-md-10 col-md-offset-2 tbl">
          <table border="1">
            <tr >
              <td width="120" align="center">原债权用途</td>
              <td width="400" align="center" v-html="contracts.financingPurpose"></td>
            </tr>
            <tr >
              <td width="120" align="center">债权金额</td>
              <td width="400" align="center" v-if="!contracts.total">人民币（大写）<u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp整</u>（小写）RMB<u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp元</u></td>
              <td width="400" align="center" v-if="contracts.total">人民币（大写）<u>{{contracts.Total}}</u>（小写）RMB<u>{{contracts.total}}元</u></td>
            </tr>
            <tr>
              <td width="120" align="center">债权年化利率</td>
              <td width="400" align="center"><u>{{contracts.annualEarnings}}%</u></td>
            </tr>
            <tr>
              <td width="120" align="center">转让后债权期限</td>
              <td width="400" align="center"><u>{{contracts.cycle}}（月）</u></td>
            </tr>
            <tr>
              <td width="120" align="center">每月还款本息数额及还款日</td>
              <td width="400" align="center">详情见附件2《还款计划表》</td>
            </tr>
            <tr>
              <td width="120" align="center">转让后债权起始日</td>
              <td width="400" align="center" v-if="!contracts.total"><u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u></td>
              <td width="400" align="center" v-else="contracts"><u>{{contracts.loanTime}}</u></td>
            </tr>
            <tr>
              <td width="120" align="center">转让后债权到期日</td>
              <td width="400" align="center" v-if="!contracts.total"><u>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</u></td>
              <td width="400" align="center" v-else="contracts"><u>{{contracts.repaymentDate}}</u></td>
            </tr>
          </table>
        </div>
          <p class="agree-tx">除非文意另有所指或另有约定，下列词语具有以下含义：</p>
          <p class="agree-tx">1.1 债权币种为人民币。</p>
          <p class="agree-tx">1.2 原债权用途是指原《借款协议》中约定的借款人/原债务人借款用途。</p>
          <p class="agree-tx">1.3 债权年化利率是以年化利率的方式表示。月利率=年化利率/12，日利率=年化利率/365。</p>
          <p class="agree-tx">1.4 工作日是指中华人民共和国法律规定的工作日。</p>
        <br>
        <p><strong class="agree-mg">第二条 &nbsp&nbsp出借资金冻结与发放</strong></p>
        <p class="agree-tx">2.1 乙方或其受托人通过宏财网勾选“同意《宏财网服务协议》”并点击【确认】按钮后，视为签订本协议。</p>
        <p class="agree-tx">2.2 甲方通过宏财网对乙方发布的借款需求勾选“同意《宏财网服务协议》”并点击【立即投资】按钮及完成相应支付时，视为甲方签订本协议，并不可撤销地授权第三方资金存管机构冻结甲方确认向乙方支付的金额，出借金额详见附件1。</p>
        <p class="agree-tx">2.3 协议成立：乙方在宏财网上发布债权转让需求，丙方、甲方在宏财网上依照约定进行相关操作完成本协议的签订后，本协议成立。</p>
        <p class="agree-tx">2.4 协议生效：出借资金累计等于乙方债权金额时本协议即时生效。</p>
        <p class="agree-tx">2.5 出借资金或借款发放：本协议生效的同时，甲方即不可撤销地授权第三方资金存管机构在下列放款日将上述冻结资金划转至乙方或乙方委托存管账户（以下统称乙方存管账户）中，划转完毕即视为债权转让成功。</p>
        <p class="agree-tx">2.6 转让后债权起始日为丙方在宏财网上点击【确认放款】按钮时日。</p>
        <p class="agree-tx">2.7 自乙方在宏财网上发布债权转让需求信息之日起（  {{contracts.release}}  ）日，宏财网上出借人同意向乙方支付的资金金额累计仍未满足乙方本次在宏财网上发布的债权需求时，则于（ {{contracts.releaseEndTime}} ）日24：00起终止发布借款需求信息，甲方存管账户中的出借资金自动解冻。</p>
        <p class="agree-tx">2.8 协议生效后，凡因乙方原因导致甲方出借资金未能成功发放的，均视为乙方放弃债权转让，乙方应承担相应责任，按丙方收费规则及有关协议支付提前终止债权转让费，乙方不可撤销地授权丙方从乙方存管账户中直接扣收或代收。</p>
        <br>
        <p><strong class="agree-mg">第三条 &nbsp&nbsp还款</strong></p>
        <p class="agree-tx">3.1 乙方按照以下第（  {{contracts.total ? '3.1.2' : ''}}）种方式还本付息：</p>
        <p class="agree-tx">3.1.1 实行利随本清方式还款，到期一次性归还借款本息。</p>
        <p class="agree-tx">3.1.2 月结息，到期还本。结息日为每月的（ {{contracts.accountDay}} ）日。乙方须于每一结息日结息。如债权本金的最后一次偿还日不在结息日，则未付利息应利随本清。</p>
        <p class="agree-tx">3.1.3 按月等额本息还款法按每个月还款，还款日为每期末月的<u> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </u>（20日/借款发放日对应日）。如无借款发放日对应日，以所在期末月的最后一日为还款日。计算公式如下：</p>
        <img src="../images/agreement.png" width="100%">
        <p class="agree-tx">3.2 乙方不可撤销地授权第三方存管机构，按还款计划将金额等同于甲方当期应收金额的资金（即乙方当期应偿还的本金或利息）由乙方存管账户划转至甲方存管账户中，划转完毕即视为本期还款成功。</p>
        <p class="agree-tx">3.3 乙方应于每期还款日（如遇国家法定节假日，则借款还本付息日顺延至节后第一个工作日）下午3点前履行还款义务。为保证还款成功，乙方至少应于每期还款日前三日，将足以偿还当期本金或利息的款项转入（包括但不限于充值等方式）乙方存管账户。若乙方存管账户中资金不足以清偿当期借款本金或利息，导致还款不成功，乙方承担补足义务。乙方不可撤销地授权第三方资金存管机构将相应款项由乙方存管账户划转至甲方存管账户。</p>
        <br>
        <p><strong class="agree-mg">第四条 &nbsp&nbsp债权转让</strong></p>
        <p class="agree-tx">借款期限内，一定条件下，甲方对乙方的债权可进行再转让，具体细则另行规定。</p>
        <br>
        <p><strong class="agree-mg">各方权利与义务</strong></p>
        <p><strong class="agree-mg">第五条 &nbsp&nbsp甲方权利和义务</strong></p>
        <p class="agree-tx">5.1 依据本协议约定按时足额向原债权人支付债权受让价款，并保证资金来源合法。</p>
        <p class="agree-tx">5.2 授权乙方依照《借款协议》的约定向原债务人收取本金和利息，有权要求乙方依照本协议约定向其支付乙方代收的本金及利息。</p>
        <p class="agree-tx">5.3 乙方违约时，授权丙方向乙方主张权利，包括但不限于追偿债权本金及利息、罚息、违约金、损害赔偿金以及诉讼（仲裁）费、律师费等实现债权、担保权的费用等。</p>
        <p class="agree-tx">5.4 有权了解乙方以及债务人基本情况、借款使用情况、担保人及担保物情况。</p>
        债转方-个人 + 债转方-企业
        <p class="agree-tx">5.5 应当对借款人信息予以保密，不得非法收集、使用、加工、传输借款人信息，不得非法买卖、提供或者公开借款人个人信息。</p>
        <br>
        <p><strong class="agree-mg">第六条 &nbsp&nbsp乙方权利和义务</strong></p>
        <p class="agree-tx">6.1 按照本协议的约定取得债权转让款。</p>
        <p class="agree-tx">6.2 按丙方要求如实提供与本协议项下债权有关的资料（包括但不限于文件、资料和单据等），并对其真实性、准确性、完整性和有效性负责。</p>
        <p class="agree-tx">6.3 按照甲方的授权向原债务人收取债权本金和利息。</p>
        <p class="agree-tx">6.4 按照本协议第一条的约定，在还款日向甲方支付债权本金和利息。</p>
        <p class="agree-tx">6.5 住所、通信地址、联系方式等发生变动时，应在前述变动发生之日起2个工作日内书面通知丙方并提供相应的证明文件。</p>
        <p class="agree-tx">6.6 原债务人或乙方出现以下重大不利情形时，应在该等情形发生之日起两日内书面通知丙方，必要时需提供有效担保或采取其他补救措施。</p>
        <p class="agree-tx">该等重大不利情形包括但不限于：涉及重大诉讼；已全部或者部分丧失还款能力；财务状况恶化或者因其他原因导致还款能力明显下降；担保物（如有）价值减少、毁损、灭失、被征用、被征收以及因附合、混合、加工使担保物所有权归属第三人或者出现权属争议等影响甲方实现担保物权；与金融机构或非金融机构签订的借款合同或担保合同项下发生任何违约事项；乙方或其下属公司牵连重大违纪、违法或被索赔事件，出严重困难或财务状况恶化，发生重大债权债务纠纷引起诉讼、仲裁等事件；其他影响还款能力的事项等。</p>
        <p class="agree-tx">6.7 乙方应配合甲方或丙方的要求，出具相关文件；并不可撤销地授权甲方或丙方，可向中国人民银行征信系统或其他数据信息系统，或有关单位、部门或个人，查询其信用状况，查询、打印和保存其信息和信用报告；可按照有关规定向中国人民银行征信系统或其他数据信息系统提供借款人基本信息和其他相关信息。</p>
        <br>
        <p><strong class="agree-mg">第七条 &nbsp&nbsp丙方权利义务</strong></p>
        <p class="agree-tx">7.1 为本协议项下债权转让提供信息交互平台居间服务。</p>
        <p class="agree-tx">7.2 有权向有关方收取信息服务费用，具体协议另行签订。</p>
        <p class="agree-tx">7.3 如乙方违约时，代理甲方向有关各方主张权利，包括但不限于追偿借款本金及利息、罚息、违约金、损害赔偿金以及诉讼（仲裁）费、律师费等实现债权、担保权的费用等。</p>
        <p class="agree-tx">7.4 乙方未履行本协议约定义务，有权就乙方的违约行为进行公开披露，包括但不限于追偿借款本金及利息、罚息、违约金、损害赔偿金以及诉讼（仲裁）费、律师费等实现债权、担保权的费用等。</p>
        <p class="agree-tx">7.4.1 将乙方的有关基本资料或其他相关信息通过宏财网公布，向有关媒体披露或公告催收；</p>
        <p class="agree-tx">7.4.2 将乙方的有关基本资料及其他相关信息备案在“违约信息记录”，按照有关规定提供向中国人民银行征信系统或其他数据信息系统等。</p>
        <br>
        <p><strong class="agree-mg">违 约 责 任</strong></p>
        <p><strong class="agree-mg">第八条  &nbsp&nbsp违约责任</strong></p>
        <p class="agree-tx">8.1 发生下列情形之一者，乙方应承担相应违约责任：</p>
        <p class="agree-tx">8.1.1 乙方未按约定期限按时足额偿还款本息的，承担逾期还款违约责任。各方同意并确认，丙方有权要求乙方按逾期部分每日万分之五计收罚息；</p>
        <p class="agree-tx">8.1.2 乙方未按约定提供原始借款用途证明，或提供虚假用途证明，或未按本协议约定用途使用借款的，足以严重影响还款能力的，丙方有权要求乙方自违约之日起，按违约部分金额的每日万分之五计向甲方支付罚息。</p>
        <p class="agree-tx">8.1.3 乙方不配合甲方、丙方核查贷款用途或违约使用之日无法查明的，足以严重影响还款能力的，丙方有权要求乙方从债权转让之日起，按债权总额每日万分之五向甲方支付罚息。</p>
        <p class="agree-tx">8.1.4 乙方发生本协议6.5中重大不利之情形，足以影响还款能力，乙方未能向甲方提供有效担保或及时采取其他补救措施的，丙方有权宣布本协议项下所有债权全部到期，要求乙方立即向甲方偿还所欠债权本息，并要求其按债权总额或尚未履行部分金额的百分之二十向甲方支付违约金。</p>
        <br>
        <p><strong class="agree-mg">其  他</strong></p>
        <p><strong class="agree-mg">第九条 &nbsp&nbsp承诺及保证</strong></p>
        <p class="agree-tx">9.1 各方在此确认其为具有完全民事权利能力和完全民事行为能力的自然人或为按照中国法律合法设立并有效存续的企业法人或其他机构，有权签订并履行本协议。并甲、乙保证：其为宏财网注册用户并在本协议有效期内保持宏财网注册用户身份；</p>
        <p class="agree-tx">9.2 各方承诺并保证，各方已采取一切所需行动，以及（除本协议另有明确规定外）取得签订本协议所需的一切同意书、批文、授权和许可。本协议的签订，不会违反（包括但不限于）(i)各方的公司章程，(ii)各方的其它任何协议或义务，或(iii)任何中国或其它有关的地域的现行法律、法规或法令。其在本协议上签字的代表已被授予全权签署本协议。</p>
        <p class="agree-tx">9.3 甲方承诺并保证其向乙方提供的资金来源合法。 乙方承诺并保证其向甲方、丙方提供的所有信息均为真实、准确、完整和有效。</p>
        <p class="agree-tx">9.4 各方承诺并保证，不会利用丙方或宏财网进行信用卡套现、洗钱、非法集资或其他不正当交易行为，否则应依法独立承担相应法律责任。</p>
        <p class="agree-tx">9.5 各方确认，甲、乙授权或委托丙方根据本协议所采取的全部行动和措施的法律后果均归属于甲、乙方；在任何情形下，丙方或宏财网不是本协议项下任何借款或债务的债务人或需要以其自有资金偿还本协议项下的任何借款或债务，丙方或宏财网亦不是本协议项下担保的担保人或需要以其自有资金承担本协议项下的担保责任。</p>
        <p class="agree-tx">9.6 各方同意并承诺，本协议项下甲、乙方相互之间提供信息时均应同时提供或抄送给丙方。</p>
        <p class="agree-tx">9.7 各方同意并确认，各方委托丙方保管所有与本协议有关的书面文件及电子信息。若各方出示的书面文件或电子信息不一致，以丙方提供的书面文件或电子信息为准（其中书面文件与电子信息不同的，以书面文件为准）。</p>
        <br>
        <p><strong class="agree-mg">第十条 &nbsp&nbsp通知</strong></p>
        <p class="agree-tx">10.1 本协议任何一方根据本协议约定做出的通知和/或文件均应以书面形式做出，包括但不限于由专人送达、挂号邮递、特快专递或通过宏财网发布（包括但不限于公告、站内消息等）等方式送达。</p>
        <p class="agree-tx">10.2 通知在下列日期视为送达：</p>
        <p class="agree-tx">10.2.1 专人递送的通知，在专人递送之交付日为有效送达；</p>
        <p class="agree-tx">10.2.2 以挂号信（付清邮资）发出的通知，在寄出（以邮戳为凭）后的五个工作日内为有效送达；</p>
        <p class="agree-tx">10.2.3 以特快专递（付清邮资）发出的通知，在寄出（以邮戳为凭）后的三个工作日内为有效送达；</p>
        <p class="agree-tx">10.2.4 以电子邮件发出的通知，在电子信息反馈为送达后一个工作日内为有效送达；</p>
        <p class="agree-tx">10.2.5 通过宏财网发布的方式（包括但不限于公告、站内消息等方式）通知的，在宏财网发布之日为有效送达。</p>
        <br>
        <p><strong class="agree-mg">第十一条 &nbsp&nbsp保密条款</strong></p>
        <p class="agree-tx">11.1 本协议的任何一方在本协议履行过程中，或为履行本协议的需要，从其他各方所获得的有关商业秘密，未经其他各方同意，不得向任何第三方披露。但是各方聘请的律师、会计师、审计师、评估师或根据法律法规规定及有权部门要求提供的除外。</p>
        <p class="agree-tx">11.2 本协议任何一方应采取所有其他必要、适当和可采取的措施，以确保保密信息的保密性。</p>
        <br>
        <p><strong class="agree-mg">第十二条 &nbsp&nbsp费用承担</strong></p>
        <p class="agree-tx">与本协议有关的公证、登记、评估、鉴定、见证、运输、保管等费用由乙方承担。</p>
        <br>
        <p><strong class="agree-mg">第十三条 &nbsp&nbsp不可抗力</strong></p>
        <p class="agree-tx">除非文意另有所指或另有规定，不可抗力是指受影响一方不能合理控制的、无法预料或即使可预料到也不可避免且无法克服，并于本协议签订日之后出现的，使该方对本协议全部或部分的履行在客观上成为不可能或不实际(包括但不限于花费合理金额仍无法履行)的任何事件。此等事件包括但不限于任何政府机构行为（无论有效或无效）、火灾、水灾、风暴、暴乱、爆炸、自然灾害、战争、破坏活动、劳工问题（包括停工、罢工和怠工）以及法院禁令或裁定。</p>
        <p class="agree-tx">不可抗力发生时，各方应立即通过友好协商决定如何执行本协议。不可抗力或其影响终止或消除后，各方双方须立即恢复履行各自在本协议项下的各项义务。</p>
        <br>
        <p><strong class="agree-mg">第十四条 &nbsp&nbsp法律适用及争议解决</strong></p>
        <p class="agree-tx">本协议的签订、履行、终止、解释均适用中国法律。各方同意，因本协议所产生的或与本协议有关的一切争议，各方应协商解决；协商无法达成一致的，各方一致同意将争议提交中国国际经济贸易仲裁委员会，在北京按照申请时该会现行有效的仲裁规则进行仲裁。仲裁裁决是终局的，对各方均有约束力。</p>
        <br>
        <p><strong class="agree-mg">第十五条 &nbsp&nbsp风险提示 </strong></p>
        <p class="agree-tx">15.1 政策风险 国家因宏观政策、财政政策、货币政策、行业政策、地区发展、法律法规等因素引起的政策风险。</p>
        <p class="agree-tx">15.2 信用风险 当乙方发生资金状况的风险，或者乙方的还款意愿发生变化时，甲方的出借资金可能无法按时收回，但乙方需严格按照本协议承担违约责任。</p>
        <p class="agree-tx">15.3 不可抗力 由于战争、动乱、自然灾害等不可抗力因素的出现而可能导致甲方资产损失的风险。</p>
        <p><strong class="agree-mg">第十六条 &nbsp&nbsp其他事项 </strong></p>
        <p class="agree-tx">16.1  本协议所称担保物（如有）包括抵押物、质物和出质权利。</p>
        <p class="agree-tx">16.2 各方同意并确认，委托丙方对本协议项下的任何金额进行计算；在无明显错误的情况下，平台对本协议项下任何金额的任何证明或确定，应作为该金额有关事项的终局证明。</p>
        <p class="agree-tx">16.3 本协议各条款之标题仅为方便查阅而设，不具法律效力或影响本协议的解释。</p>
        <p class="agree-tx">16.4 本协议中部分条款根据相关法律法规等的规定为无效，或部分无效时，该等无效不影响本协议项下其他条款的效力，各方仍应履行其在本协议项下的义务。</p>
        <p class="agree-tx">16.5 本协议项下的附件和补充协议构成本协议不可分割的一部分。</p>
        <p class="agree-tx">16.6 本协议未尽事宜，遵照有关法律法规和执行。</p>
        <p><strong class="agree-mg">（以下无正文) </strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p><strong class="agree-mg">（本页无正文，为签字页）</strong></p>
        <br>
        <p><strong class="agree-mg">各方签章：</strong></p>
        <br>
        <p><strong class="agree-mg">甲方：<span v-for="(item, index) in LenderNames">{{item}}{{LenderNames.length === index + 1 ? '' : '、'}}</span></strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p><strong class="agree-mg">乙方：{{contracts.enterpriseName}}</strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p><strong class="agree-mg">丙方：北京竞财投资服务有限公司</strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
      </div>
      <div class="annex">
        <p class="text-left">附件1</p>
        <br>
        <table v-if="contracts.total">
          <thead>
            <td>甲方姓名</td>
            <td>身份证号</td>
            <td>出借金额</td>
            <td>债权编号</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in contracts.orderList">
              <td>{{item.name}}</td>
              <td>{{item.idNo}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.number}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
        <br>
        <br>
        <br>
      <div class="annex">
        <p class="text-left">附件2</p>
        <br>
        <p class="text-center" v-if="preRepaymentList.length >0 && isLoan !== 0">还款计划（单位：元、月/日）</p>
        <table v-if="preRepaymentList.length >0 && isLoan !== 0">
          <thead>
            <td>序号</td>
            <td>还款日</td>
            <td>还款金额</td>
            <td>还款类型</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in preRepaymentList">
              <td>{{index + 1}}</td>
              <td>{{item.repaymentTime | date}}</td>
              <td>{{item.repaymentAmount | number}}</td>
              <td>{{item.type === 1 ? '利息' : '本息'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="agreement-area row" v-show="creditNum === '0' || cutRateType === 5">
      <hr>
      <br>
      <br>
      <p class="text-title">宏财网服务协议补充协议</p>
      <p class="text-right" v-if="!cutContracts.contractNumber">合同编号：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
      <p class="text-right" v-else="cutContracts">合同编号：{{cutContracts.projectContractNumber}}</p>
      <div class="row">
        <p><strong class="agree-mg text-justify">为了维护您的权益，请在签署本协议前，仔细阅读、充分理解本协议各条款（特别是加重、免除或限制协议一方责任条款），关注您在协议中的权利、义务。请您审慎阅读并选择接受或不接受本协议。您一经选择接受即视为对本协议全部条款已充分理解并完全接受。</strong></p>
        <p v-if="!cutContracts.contractNumber"><strong class="agree-mg">本协议由以下双方于【&nbsp&nbsp&nbsp】年【&nbsp&nbsp&nbsp】月【&nbsp&nbsp 】日在中华人民共和国（以下简称“中国”）北京签订。</strong></p>
        <p v-else="cutContracts"><strong class="agree-mg">本协议由以下双方于【{{cutContracts.year}}】年【{{cutContracts.month}}】月【{{cutContracts.month}}】日在中华人民共和国（以下简称“中国”）北京签订。</strong></p>
        <br>
        <p><strong class="agree-mg">协议双方：</strong></p>
        <p><strong class="agree-mg">甲方（出借人）：</strong>{{cutContracts.userRealName}}</p>
        <p><strong class="agree-mg">宏财网会员号：</strong>{{cutContracts.userName}}</p>
        <br>
        <p><strong class="agree-mg">乙方（居间人）：北京竞财投资服务有限公司</strong></p>
        <p>企业法人营业执照注册号：110107018557568</p>
        <br>
        <p class="agree-tx">本协议中，甲方、乙方单称“一方”，合称“双方”。</p>
        <br>
        <p><strong class="agree-mg">鉴于：</strong></p>
        <p class="agree-tx">1、甲方（出借人）系符合中国法律规定的具有完全民事权利能力和民事行为能力，独立行使和承担本协议项下权利义务的自然人、法人或其他组织。</p>
        <p class="agree-tx">2、乙方是依法成立并运营的网络借贷信息中介机构（域名：www.hongcai.com，以下简称“宏财网”）。甲方通过宏财网向借款人提供借款，乙方为本协议项下借款提供居间服务。</p>
        <p class="agree-tx" v-if="!cutContracts.contractNumber">3、甲、乙双方已经于【&nbsp&nbsp&nbsp】年【&nbsp&nbsp&nbsp】月【&nbsp&nbsp&nbsp】日签订了协议编号为【&nbsp&nbsp&nbsp】《宏财网服务协议》。</p>
        <p class="agree-tx" v-else="cutContracts">3、甲、乙双方已经于【{{cutContracts.year}}】年【{{cutContracts.month}}】月【{{cutContracts.month}}】日签订了协议编号为【{{cutContracts.contractNumber}}】《宏财网服务协议》。</p>
        <p class="agree-tx">4、甲方自主选择参与宏财网活动，接受活动各项条款。</p>
        <p class="agree-tx">为此，根据国家有关法律法规，甲、乙双方本着平等自愿、诚实守信、互惠互利的原则，立此补充协议，共同遵守。</p>
        <br>
        <p class="text-center"><strong class="agree-mg">协议条款</strong></p>
        <p><strong class="agree-mg">第一条 &nbsp&nbsp双方的权利和义务</strong></p>
        <p class="agree-tx">1.1 甲方签署本协议，即表示其已经知悉并接受所参与活动的各项条款。</p>
        <p class="agree-tx" v-if="!cutContracts.contractNumber">1.2 甲方明确知悉参与本活动，其在宏财网的协议编号为【&nbsp&nbsp&nbsp】投资，期望年均回报率由【&nbsp&nbsp&nbsp】降为【&nbsp&nbsp&nbsp】，多余部分作为宏财网的服务费，由宏财网在借款人每期还款时自动扣取。</p>
        <p class="agree-tx" v-else="cutContracts">1.2 甲方明确知悉参与本活动，其在宏财网的协议编号为【{{cutContracts.contractNumber}}】投资，期望年均回报率由【{{cutContracts.oldRate}}%】降为【{{cutContracts.newRate}}%】，多余部分作为宏财网的服务费，由宏财网在借款人每期还款时自动扣取。</p>
        <p class="agree-tx">1.3 乙方应将活动条款，在其网站或App的相关页面做全面、清晰的展示。</p>
        <p class="agree-tx">1.4 乙方按活动条款及时兑付甲方获得的奖品，具体奖品以乙方最终发放为准。</p>
        <p><strong class="agree-mg">第二条 &nbsp&nbsp其他事项</strong></p>
        <p class="agree-tx">2.1 本协议中部分条款根据相关法律法规等的规定为无效，或部分无效时，该等无效不影响本协议项下其他条款的效力，各方仍应履行其在本协议项下的义务。</p>
        <p class="agree-tx">2.2 本协议是《宏财网服务协议》不可分割的一部分，未约定事宜以《宏财网服务协议》为准。</p>
        <p class="agree-tx">2.3 本协议未尽事宜，遵照有关法律法规和执行。</p>
        <p><strong class="agree-mg">（以下无正文) </strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p><strong class="agree-mg">各方签章：</strong></p>
        <br>
        <br>
        <p><strong class="agree-mg">甲方：{{cutContracts.userRealName}}</strong></p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p><strong class="agree-mg">乙方：北京竞财投资服务有限公司</strong></p>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['token'],
    data () {
      return {
        projectNumber: '',
        preRepaymentList: [],
        projectId: '',
        creditNum: '',
        contracts: {},
        LenderNames: Array,
        contractType: Number,
        status: String,
        isLoan: 0,
        cutRateType: Number,
        cutContracts: {}
      }
    },
    created: function () {
      this.projectNumber = this.$route.params.number
      this.creditNum = this.$route.query.creditNum
      this.status = this.$route.params.status
      this.getProjectBill()
      this.contractTemplate()
      this.getProject()
      this.creditNum !== '0' ? this.extraContracts() : null
    },
    watch: {
      'token': function (val) {
        if (val !== '') {
          this.getProjectBill()
          this.contractTemplate()
        }
      },
      'projectId': function (val) {
        if (this.token !== '' && val !== '') {
          this.getContracts()
        }
      }
    },
    methods: {
      getProject: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/projects/' + that.projectNumber
        }).then((response) => {
          if (response.data && response.data.ret !== -1) {
            var status = response.data.status
            if (status === 9 || status === 10) {
              that.isLoan = 1
              that.projectId = response.data.id
            }
          }
        })
      },
      contractTemplate: function () {
        var that = this
        this.$http({
          method: 'get',
          url: '/hongcai/rest/contracts/' + that.projectNumber + '/contractTemplate'
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.contractType = res.data.type
          } else {
            that.contractType = 4
          }
        })
      },
      getProjectBill: function () {
        var that = this
        this.$http({
          method: 'get',
          url: '/hongcai/rest/projects/' + that.projectNumber + '/projectBills'
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.preRepaymentList = res.data
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      getContracts: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/contracts/0/' + that.projectId + '/?token=' + that.token
        }).then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.contracts = res.data
            var orderList = that.contracts.orderList
            var name = []
            for (var i = 0; i < orderList.length; i++) {
              name.push(orderList[i].name)
            }
            var LenderNames = Array.from(new Set(name))
            that.LenderNames = LenderNames
          }
        })
      },
      extraContracts: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/contracts/' + that.creditNum + '/contractTemplate/cutInterestRate'
        }).then(function (response) {
          if (response.data && response.data.ret !== -1) {
            that.cutRateType = response.data.type
            that.cutRateType === 5 && that.isLoan === 1 ? that.cutRateContracts() : null
          } else {
          }
        })
      },
      cutRateContracts: function () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/contracts/' + that.creditNum + '/cutInterestRate/?token=' + that.token
        }).then(function (response) {
          if (response.data && response.data.ret !== -1) {
            that.cutContracts = response.data
          }
        })
      }
    }
  }
</script>
<style scoped>
  .agreement-area {
    text-align: left;
    padding: .5rem .3rem;
    color: #222;
    font-weight: 400;
    font-size: .22rem;
  }
  .agreement-area .text-title {
  	text-align: center;
  	font-size: .3rem;
  }
  .agreement-area ul {
    border: 1px solid #ddd;
  }
  .agreement-area ul li {
    width: 49.8%;
    border-bottom: 1px solid #ddd;
    float: left;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    margin-bottom: 0;
  }
  .agreement-area ul li:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
  .agreement-area p {
    margin-bottom: .1rem;
  }
  .header p {
    margin-bottom: .05rem;
  }
  .agreement-area i {
    padding-top: .3rem;
  }
  table {
    width: 100%;
  }
  td {
    width: 25%;
  }
  .annex table, .annex1 table{
    margin-top: .3rem;
    text-align: center;
  }
  .annex table thead, .annex1 table thead {
    margin-bottom: .2rem;
  }
  .annex table td:first-child {
    width: 18%;
  }
  .annex1 table td:nth-child(2) {
    width: 30%;
  }
  .annex1 table td:nth-child(3) {
    width: 20%;
  }
</style>
