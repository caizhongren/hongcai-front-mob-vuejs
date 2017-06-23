<template>
  <div class="user-center">
    <!-- 我的账户 -->
    <div class="info">
        <div class="text-center">
            <div class="margin-t-1p3 text-left margin-l-1 fl setting-icon" ui-sref="root.userCenter.setting"><img src="../../images/user-center/setting.png" class="display-inb margin-t-0p6" width="45%"></div>
            <div class="display-inb text-center">
                <div class="display-inb clearfix">
                    <div class="border-pull margin-r-1 fl"><img src="../../images/user-center/boy.png" alt="" class="border-pull avatar"></div>
                    <div class="user-name"><span class="display-inb ft-444">鱼儿</span></div>
                </div>
            </div>
            <div class="fr margin-r-1 margin-t-1p3 text-right">
                <div class="message-icon"><img src="../../images/user-center/envelope.png" width="40%" class="margin-t-0p2 display-inb"></i></div>
            </div>
        </div>
        <div><span>北京大学心理教授 儿童教育研究者</span></div>
    </div>
    <!--我的-->
    <ul class="info_list">
        <li>
            <div class="homepage fl ft-444">我的主页</div>
            <!--<div class="fr">
                <div class="right-arrow1"></div><div class="right-arrow2"></div>
            </div>-->
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="release-column fl ft-444">发布专栏</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="my-income fl ft-444">我的收入</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="my-question fl ft-444">我的提问</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="my-expert fl ft-444">我的专家</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="my-collection fl ft-444">我的收藏</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="my-application fl ft-444">申请成为专家</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
        <li>
            <div class="my-help fl ft-444">帮助</div>
            <i class="display-inb fr fa fa-angle-right" aria-hidden="true"></i>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'userCenter',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
    .user-center {
        background: #f8f5f5;
        margin-bottom: 2rem;
    }
    .info {
        padding: .3rem .4rem;
        background: #fff;
        margin-bottom: .3rem;
    }
    .border-pull {
        width: 1.3rem;
        height: 1.3rem;
        /*border-radius: 50%;*/
    }
    .user-name>span{
        margin-top: .15rem; 
    }
    ul.info_list {
        background: #fff;
        position: relative;
    }
    .info_list li {
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
        height: 1rem;
        line-height: 1rem;
    }
    .homepage, .release-column, .my-income, .my-question, .my-expert, .my-collection, .my-application, .my-help {
        text-align: left;
        display: inline-block;
        padding-left: 1rem;
    }
    .homepage {
        background: url('../../images/user-center/homepage.png') no-repeat .4rem 15px;
        background-size: 22%;
    }
    .release-column {
        background: url('../../images/user-center/release-colum.png') no-repeat .4rem 15px;
        background-size: 22%;
    }
    .my-income {
        background: url('../../images/user-center/my-income.png') no-repeat .4rem 15px;
        background-size: 18%;
    }
    .my-question {
        background: url('../../images/user-center/my-question.png') no-repeat .4rem 15px;
        background-size: 22%;
    }
    .my-expert {
        background: url('../../images/user-center/my-expert.png') no-repeat .4rem 15px;
        background-size: 22%;
    }
    .my-collection {
        background: url('../../images/user-center/my-collection.png') no-repeat .4rem 15px;
        background-size: 22%;
    }
    .my-application {
        background: url('../../images/user-center/my-application.png') no-repeat .4rem 15px;
        background-size: 18%;  
    }
    .my-help {
        background: url('../../images/user-center/my-help.png') no-repeat .4rem 15px;
        background-size: 22%;  
    }
    /*右箭头*/
    .right-arrow1,.right-arrow2{
        position:absolute;
        top:19px;
        left: 0;
        border-top:10px transparent dashed;
        border-right:10px transparent dashed;
        border-bottom:10px transparent dashed;
        border-left:10px white solid;
    }
    .right-arrow1{
        left:1px;/*重要*/
        border-left:10px blue solid;
    }
    .right-arrow2{
        border-left:10px white solid;
    }
</style>
