<template>
  <div class="arborDays">
    <div class="circle" :id="index" v-for="(item, index) in privilegedCapitals" v-bind:style="{ top: item.top + '%', left: item.left + '%' }">位置{{index}}</div>
    <!-- 计算器弹窗 -->
    <Arbor-Calculator :closeCalculator="closeCalculator" :showCalculator="showCalculator" v-show="showCalculator"></Arbor-Calculator>
    <!-- 领取弹窗和活动结束弹窗 -->
    <div class="mask-common arbor-mask" v-if="showMask">
      <div class="take-success" v-if="false">
        <button @click="closeMask">我知道了</button>
        <button @click="toPriviledge">立即查看</button>
      </div>
      <img src="../../images/arbor-day/activityEnd.png" alt="" width="74%" class="activity-end" v-if="true">
    </div>
  </div>
</template>
<script>
  import $ from 'zepto'
  import ArborCalculator from './arborCalculator.vue'
  import {bridgeUtil, ModalHelper} from '../../service/Utils'
  export default {
    data () {
      return {
        privilegedCapitals: [],
        canTakeCount: 4,
        timer: null,
        showCalculator: false,
        showMask: false
      }
    },
    mounted () {
      this.circleAnimate(this.canTakeCount)
    },
    watch: {
      showMask: function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    created () {
      this.setProportion()
    },
    methods: {
      circleAnimate (canTakeCount) {
        var a = 0
        $('.circle').addClass('animate')
        this.timer = setInterval(function () {
          if (a % 2 === 0) {
            for (let i = 0; i < canTakeCount; i++) {
              document.getElementById(i).style.top = parseInt(document.getElementById(i).style.top) + 2 + '%'
            }
          } else {
            for (let i = 0; i < canTakeCount; i++) {
              document.getElementById(i).style.top = parseInt(document.getElementById(i).style.top) - 2 + '%'
            }
          }
          a += 1
        }, 1000)
      },
      setProportion () {
        // 初始化布局数组
        var position = []
        for (let i = 0; i < 100; i++) {
          position[i] = []
          for (let j = 0; j < 100; j++) {
            position[i][j] = {radius: 0, isPlanted: 0}
          }
        }
        // 随机种植树木
        while (this.privilegedCapitals.length < this.canTakeCount) {
          // var i = 0
          // 随机选择一个位置来种植一棵树
          let minTreeX = 8
          let minTreeY = 8
          let maxTreeX = 80
          let maxTreeY = 40
          let treeX = Math.floor(Math.random() * (maxTreeX - minTreeX)) + minTreeX
          let treeY = Math.floor(Math.random() * (maxTreeY - minTreeY)) + minTreeY
          // console.log('(' + treeX + ',' + treeY + ')')
          // 不种植的区域排除掉 上半截树斜对角坐标 （vacantStartX, vacantStartY）,(vacantEndX, vacantEndY)
          let vacantStartX = 20
          let vacantEndX = 76
          let vacantStartY = 12
          let vacantEndY = 72
          if (treeX >= vacantStartX && treeX <= vacantEndX && treeY >= vacantStartY && treeY <= vacantEndY) {
            // 如果在不种植区则跳过后续操作
            continue
          }
          if (position[treeX][treeY].isPlanted === 1) {
            // 如果该位置已经植入树木则跳过后续操作
            continue
          }
          // 树木直径随机
          let treeRadius = 8
          // 初始设定为可以种植
          position[treeX][treeY].isPlanted = 1
          // 计算检测框范围
          let checkStartX = Math.max(treeX - 2 * treeRadius, minTreeX)
          let checkStartY = Math.max(treeY - 2 * treeRadius, minTreeY)
          let checkEndX = Math.min(treeX + 2 * treeRadius, maxTreeX)
          let checkEndY = Math.min(treeY + 2 * treeRadius, maxTreeX)
          for (let x = checkStartX; x <= checkEndX; x++) {
            for (let y = checkStartY; y <= checkEndY; y++) {
              // 除了当前位置 和框定范围内已经植入的树木比较距离
              if (!(treeX === x && treeY === y) && (position[x][y].isPlanted === 1)) {
                // 比较两点间距离和两点半径和的大小 判断是否重叠
                let treeDistanceSquared = (treeX - x) * (treeX - x) + (treeY - y) * (treeY - y)
                let radiusSumSquared = (2 * treeRadius) * (2 * treeRadius)
                if (treeDistanceSquared < radiusSumSquared) {
                  // 发生碰撞则标记不可种
                  position[treeX][treeY].radius = 0
                  position[treeX][treeY].isPlanted = 0
                }
              }
            }
          }
          if (position[treeX][treeY].isPlanted === 1) {
            // i += 1
            // 显示结果图形
            this.privilegedCapitals.push({left: treeX, top: treeY})
          }
        }
      },
      toPriviledge () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_GoPrivilegedCapital', undefined, {}, function (res) {
          that.closeMask()
        }, null)
      },
      closeCalculator () {
        this.showCalculator = false
      },
      closeMask () {
        this.showMask = false
      }
    },
    components: {ArborCalculator},
    desrtoyed () {
      clearInterval(this.timer)
    }
  }
</script>
<style scoped>
  .arbor-mask {
    padding-top: 30%;
  }
  .arbor-mask .take-success {
    height: 5rem;
    width: 74%;
    background: url('../../images/arbor-day/take-suceess.png') no-repeat center center;
    background-size: 100%;
    margin: 0 auto;
  }
  .take-success button {
    width: 40%;
    font-size: .26rem;
    height: .6rem;
    line-height: .6rem;
    border-radius: .3rem;
    margin-top: 84%;
    border: none;
  }
  .take-success button:first-child {
    margin-right: 6%;
    background-color: #2cc075;
    color: #ffffff;
	  text-shadow: 0.2px 0.5px 0 rgba(111, 73, 0, 0.28);
  }
  .take-success button:last-child {
	  background-color: #fddf68;
    color: #c6421f;
	  text-shadow: 0.2px 0.5px 0 rgba(111, 73, 0, 0.28);
  }
  .activity-end {
    margin-top: .6rem;
  }
  .animate {
    -webkit-transition:all 1s linear;
    -moz-transition:all 1s linear;
    -o-transition:all 1s linear;
    -ms-transition:all 1s linear;    
    transition:all 1s linear;
  }
  .arborDays {
    position: fixed;
    background-color: red;
    width: 90%;
    height: 5.7rem;
    left: 5%;
    top: 30%;
  }
  .circle {
    position: absolute;
    top: 20%;
    left: 30%;background-color: greenyellow;
    width: 16%;
    height: 16%;
    line-height: .9rem;
    border-radius: 1rem;
    font-size: .2rem;
    opacity: .7;
  }
</style>
