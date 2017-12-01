<template>
  <div class="birthday" v-auto-height>
    <audio preload="preload" loop="true" id="music"><source src="../../assets/get.mp3"></audio>
    <div class="header position-re">
      <img src="../../images/happy-birthday/bg-hander.png" class="bg-header">
      <div class="overflow-hid" @click="playOrpause">
        <img src="../../images/happy-birthday/play-audio.png" class="play-audio audioIcon" v-show="isPlay === 'true'">
        <img src="../../images/happy-birthday/pause-audio.png" class="pause-audio" v-show="isPlay === 'false'">
      </div>
      <img src="../../images/happy-birthday/acer.png" class="acer">
    </div>
    <div class="gift">
      <div class="priviledges" v-if="hasGift">
        <p class="money">{{user.priviledge}}元</p>
        <p class="time">有效期{{user.validityTime}}天</p>
        <p class="type">特权本金</p>
      </div>
      <div class="blessings" v-bind:class="{'noGift': !hasGift}">
        <img src="../../images/happy-birthday/lines.png" class="lines" v-bind:class="{'noGift': !hasGift}">
        <span class="dear"></span><span class="userName">{{user.name}}</span><span class="Gender userName" v-bind:class="{'lady': isLady, 'Sir': !isLady}"></span>
        <img src="../../images/happy-birthday/blessings-1.png" class="blessings-1" v-if="hasGift">
        <img src="../../images/happy-birthday/blessings-2.png" class="blessings-2" v-if="!hasGift">
        <div class="hongcaiwang"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import {audioPlayUtil} from '../../service/Utils'
  export default {
    data () {
      return {
        isPlay: 'true',
        user: {
          name: '于',
          priviledge: 8888,
          validityTime: 3,
          isLady: true
        },
        hasGift: true
      }
    },
    props: ['token'],
    watch: {
      token (val) {
      },
      isPlay (val) {
        val && val === 'true' ? audioPlayUtil.playOrPaused('music', this.isPlay) : null
      }
    },
    mounted () {
      audioPlayUtil.playOrPaused('music', this.isPlay)
    },
    created () {
      this.token && this.token !== '' ? this.getUserInfo() : alert('请先登录哦')
    },
    methods: {
      playOrpause () {
        this.isPlay === 'true' ? this.isPlay = 'false' : this.isPlay = 'true'
        this.isPlay === 'true' ? $('#music')[0].loop = true : $('#music')[0].loop = false
      },
      getUserInfo () {
        var that = this
        that.$http({
          method: 'get',
          url: '/hongcai/rest/activitys/' + that.activityType
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.user = res.data
          } else {
            console.log(res.data.msg)
          }
        })
      }
    },
    destroyed () {
      $('.play-audio').removeClass('audioIcon')
    }
  }
</script>
<style scoped>
  .birthday {
    background: #fcf9ed;
    overflow: hidden;
  }
  .header .bg-header {
    width: 100%;
    vertical-align: top;
  }
  .header .play-audio {
    position: absolute;
    top: .0rem;
    right: .0rem;
    width: 10%;
  }
  .header .pause-audio {
    position: absolute;
    top: .093rem;
    right: .12rem;
    width: 6.4%;
  }
  .acer {
    width: 12%;
    position: absolute;
    bottom: -.3rem;
    left: 7.6%;
    z-index: 2;
  }
  .gift {
    width: 100%;
    text-align: center;
  }
  .priviledges {
    width: 68%;
    height: 1.8rem;
    margin: 0 auto;
    background: url('../../images/happy-birthday/priviledges.png') no-repeat center center;
    background-size: contain;
    z-index: 2;
    position: relative;
    padding: .25rem 0 .0rem .35rem;
    text-align: left;
  }
  .priviledges .money {
    font-family: Arial;
    font-size: .7rem;
    text-align: left;
    color: #ffffff;
    height: 1rem;
  }
  .priviledges .time {
    font-family: PingFang-SC;
    font-size: .2rem;
    height: 0.35rem;
    line-height: .43rem;
    color: #ff5956;
    padding-left: .26rem;
  }
  .priviledges .type {
    font-size: .26rem;
    text-align: left;
    color: #ff5956;
    position: absolute;
    top: .43rem;
    right: .22rem;
  }
  .blessings {
    background: #fdf6dd;
    width: 82%;
    height: 8rem;
    margin: 0 auto;
    border-radius: 15px;
    margin-top: -1.2rem;
    padding: 1.2rem .3rem 0;
    z-index: 1;
    position: relative;
  }
  .lines {
    width: 94%;
    position: absolute;
    left: 3%;
    top: 1.9rem;
  }
  .dear {
    width: .86rem;
    height: .8rem;
    background: url('../../images/happy-birthday/dear.png') no-repeat center center;
    background-size: contain;
    float: left;
  }
  .hongcaiwang {
    width: .86rem;
    height: .8rem;
    background: url('../../images/happy-birthday/hongcaiwang.png') no-repeat center center;
    background-size: contain;
    float: right;
  }
  .userName {
    width: .8rem;
    height: .6rem;
    float: left;
    color: #ff4d00;
    font-size: .3rem;
    line-height: .86rem;
    float: left;
  }
  .Gender {
    width: 1rem;
    height: .8rem;
    float: left;
  }
  .lady {
    background: url('../../images/happy-birthday/lady.png') no-repeat center center; 
    background-size: contain;
  }
  .Sir {
    background: url('../../images/happy-birthday/sir.png') no-repeat center center; 
    background-size: contain;
  }
  .blessings-1, .blessings-2 {
    width: 100%;
    margin-top: .1rem;
  }
  .blessings.noGift {
    margin-top: 0rem;
    padding-top: 0.55rem;
  }
  .lines.noGift {
    top: 1.84rem;
    height: 32%;
  }
  @keyframes audioAnimation {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .audioIcon {
    animation: audioAnimation 1.5s 0s infinite linear;
    -moz-animation: audioAnimation 1.5s 0s infinite linear;
    -webkit-animation: audioAnimation 1.5s 0s infinite linear;
    -o-animation: audioAnimation 1.5s 0s infinite linear;

  }
</style>
