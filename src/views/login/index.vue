<!--
 * @Author: yanding.li David.Jackson.Lyd@gmail.com
 * @Date: 2023-02-03 20:38:53
 * @LastEditors: yanding.li David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-02-04 04:00:36
 * @FilePath: \maze\src\views\login\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div>
    <div class="maze">
    <div class="map" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }">
      <div class="row" v-for="(row, x) in rows" :key="x">
        <square :x="x" :y="y" @selectMap="change" v-for="(col, y) in cols" :key="y"/>
      </div>
    </div>
    <div class="keys">
      <div class="controls">
        <div class="buttons">
          <button class="btn" id="bu" @click="up"><div class="chevron">↑</div></button>
          <button class="btn" id="bd" @click="down"><div class="chevron">↓</div></button>
          <button class="btn" id="bl" @click="left"><div class="chevron">←</div></button>
          <button class="btn" id="br" @click="right"><div class="chevron">→</div></button>
        </div>
      </div>
    </div>
    <div class="run">
      <el-button type="success" size="medium" @click="run">开始游戏</el-button>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Square from '../../components/square/index.vue'

export default Vue.extend({
  name: 'login',
  components: {
    Square
  },
  data () {
    return {
      rows: 8,
      cols: 8,
      /**
       * 可以在这里配置数据地图信息
       * defaultActiveRole 当前活跃的角色
       * defaultRoles 所有角色列表
       * defaultEasterEgg 彩蛋列表
       * defaultWall 墙体列表
       */
      // 当前活跃的角色
      defaultActiveRole: {
        name: 'A',
        index: 0,
        p: '4, 2',
        step: 1,
        color: 'green'
      },
      // 所有角色列表
      defaultRoles: [
        {
          name: 'A',
          index: 0,
          p: '4,2',
          step: 1,
          color: 'green'
        },
        {
          name: 'B',
          index: 1,
          p: '0,1',
          step: 1,
          color: 'red'
        },
        {
          name: 'C',
          index: 2,
          p: '0,6',
          step: 1,
          color: 'skyblue'
        }
      ],
      // 彩蛋列表
      defaultEasterEgg: ['2,0', '4,5'],
      // 墙体列表
      defaultWall: ['1,1', '1,2', '1,4', '1,5', '1,6', '2,1', '2,6', '3,1', '3,3', '3,4', '4,3', '4,4', '4,6', '5,1', '5,6', '6,1', '6,2', '6,3', '6,5', '6,6'],
      arr: [] as Array<any>,
      cur: {} as any,
      activeRole: {
        name: '',
        index: 0,
        p: '',
        step: 1
      }
    }
  },
  computed: {
    boxWidth: function (): number {
      return this.cols * 60
    },
    boxHeight: function (): number {
      return this.rows * 60
    }
  },
  mounted () {
    this.keyDown()
    this.$store.commit('setActiveRole', {})
    this.$store.commit('setRole', [{}])
    this.$store.commit('setEasterEgg', [])
    this.$store.commit('setWall', [])
  },
  methods: {
    run () {
      this.$alert('首先构建地图信息, 点击确认使用默认配置', 'Victory', {
        confirmButtonText: '确定'
      }).then(() => {
        this.$store.commit('setActiveRole', this.defaultActiveRole)
        this.$store.commit('setRole', this.defaultRoles)
        this.$store.commit('setEasterEgg', this.defaultEasterEgg)
        this.$store.commit('setWall', this.defaultWall)
      })
    },
    keyDown () {
      document.onkeydown = (event) => {
        const e = event || window.event
        const keyCode = e.keyCode || e.which
        console.log(e, keyCode)
        switch (keyCode) {
          case 38:
            this.up()
            break
          case 40:
            this.down()
            break
          case 37:
            this.left()
            break
          case 39:
            this.right()
            break
        }
      }
    },
    change (e: any) {
      console.log('点击', e)
      this.arr.push(e)
      console.log('点击 this.arr', this.arr)
    },
    touchWall (arr: any, sit: string): boolean {
      const x: number = parseInt(sit.split(',')[0])
      const y: number = parseInt(sit.split(',')[1])
      console.log('位置', x, y)
      return arr.includes(sit) || x < 0 || y < 0 || x > this.cols - 1 || y > this.rows - 1
    },
    up () {
      this.activeRole = this.$store.state.activeRole
      this.cur = this.$store.state.role[this.activeRole.index]
      const arr: any = this.$store.state.role
      const x = parseInt(this.cur.p.split(',')[0]) - this.activeRole.step
      const y = parseInt(this.cur.p.split(',')[1])
      if (this.touchWall(this.$store.state.wall, `${x},${y}`)) {
        this.$message({
          message: '撞墙啦',
          type: 'warning'
        })
        return false
      }
      arr[this.activeRole.index].p = `${x},${y}`
      this.activeRole.p = `${x},${y}`
      this.$store.commit('setActiveRole', this.activeRole)
      this.$store.commit('setRole', [...arr])
    },
    down () {
      this.activeRole = this.$store.state.activeRole
      this.cur = this.$store.state.role[this.activeRole.index]
      const arr: any = this.$store.state.role
      const x = parseInt(this.cur.p.split(',')[0]) + this.activeRole.step
      const y = parseInt(this.cur.p.split(',')[1])
      if (this.touchWall(this.$store.state.wall, `${x},${y}`)) {
        this.$message({
          message: '撞墙啦',
          type: 'warning'
        })
        console.log('墙墙墙墙墙墙墙')
        return false
      }
      arr[this.activeRole.index].p = `${x},${y}`
      this.activeRole.p = `${x},${y}`
      this.$store.commit('setActiveRole', this.activeRole)
      this.$store.commit('setRole', [...arr])
    },
    left () {
      this.activeRole = this.$store.state.activeRole
      this.cur = this.$store.state.role[this.activeRole.index]
      const arr: any = this.$store.state.role
      const x = parseInt(this.cur.p.split(',')[0])
      const y = parseInt(this.cur.p.split(',')[1]) - this.activeRole.step
      if (this.touchWall(this.$store.state.wall, `${x},${y}`)) {
        this.$message({
          message: '撞墙啦',
          type: 'warning'
        })
        console.log('墙墙墙墙墙墙墙')
        return false
      }
      arr[this.activeRole.index].p = `${x},${y}`
      this.activeRole.p = `${x},${y}`
      this.$store.commit('setActiveRole', this.activeRole)
      this.$store.commit('setRole', [...arr])
    },
    right () {
      this.activeRole = this.$store.state.activeRole
      this.cur = this.$store.state.role[this.activeRole.index]
      const arr: any = this.$store.state.role
      const x = parseInt(this.cur.p.split(',')[0])
      const y = parseInt(this.cur.p.split(',')[1]) + this.activeRole.step
      if (this.touchWall(this.$store.state.wall, `${x},${y}`)) {
        this.$message({
          message: '撞墙啦',
          type: 'warning'
        })
        console.log('墙墙墙墙墙墙墙')
        return false
      }
      arr[this.activeRole.index].p = `${x},${y}`
      this.activeRole.p = `${x},${y}`
      this.$store.commit('setActiveRole', this.activeRole)
      this.$store.commit('setRole', [...arr])
    },
    calc (role: string, x: number, y: number) {
      const newP = {
        role: role,
        step: 1,
        x: x,
        y: y
      }
      this.$store.commit('setActiveRole', newP)
    }

  }
})
</script>

<style lang="scss" scoped>
  .maze {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    background: #222;
    margin-top: 50px;
    .map {
      // width: 500px;
      // height: 500px;
      background-color: antiquewhite;
      .row {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .keys {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      #container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #222;
        display: grid;
        grid-template-rows: 60% 40%;
      }
      #maze {
        position: absolute;
        width: 340px;
        height: 240px;
        /*background: #39a;

        align-self: center;
        justify-self: center;
        place-self: center center;*/
        top: 30vh;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .mbox,
      .controls {
        height: 100%;
        background: #222;
        display: grid;
      }

      .mbox {
      }
      .buttons {
        width: 210px;
        height: 140px;
        background: #222;
        align-self: center;
        justify-self: center;
        display: grid;
        grid-template-rows: 70px 70px;
        grid-template-columns: 70px 70px 70px;
      }
      .btn {
        width: 60px;
        height: 60px;
        border: 2px #fff solid;
        border-bottom: 2px #fff solid;
        align-self: center;
        justify-self: center;
        cursor: pointer;
        border-radius: 8px;
        display: grid;
        /*box-shadow: 4px 4px 10px rgba(255, 255, 255, 0.2);*/
        &:hover {
          border: 3px #fff solid;
          border-top: 1px #fff solid;
          border-bottom: 4px #fff solid;
        }
      }
      .chevron {
        height: 20px;
        width: 20px;
        align-self: center;
        justify-self: center;
        color: #222;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
      }

      #bu {
        grid-column-start: 2;
        &:hover, :active {
          transform: translateY(-2px);
        }
      }
      #bd {
        grid-column-start: 2;
        grid-row-start: 2;
        &:hover, :active {
          transform: translateY(2px);
        }
      }
      #bl {
        grid-column-start: 1;
        grid-row-start: 2;
        &:hover, :active {
          transform: translateY(-2px);
        }
      }
      #br {
        grid-column-start: 3;
        grid-row-start: 2;
        &:hover, :active {
          transform: translateY(2px);
        }
      }

      #thingie,
      #home {
        position: absolute;
        top: 100px;
        left: 100px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        /*background: #39a;
        transition: all .1s;*/
      }

      .emo {
        position: absolute;
        top: 4px;
        left: 1px;
        width: 13px;
        height: 13px;
        border-radius: 20px;
        font-size: 15px;
        line-height: 15px;
        text-align: left;
      }

      .barrier {
        position: absolute;
        background: #fff;
      }

      #top {
        top: 20px;
        left: 20px;
        width: 300px;
        height: 2px;
      }

      #bottom {
        top: 220px;
        left: 20px;
        width: 302px;
        height: 2px;
      }
      button {
        display: inline-block;
        border: none;
        padding: none;
        margin: 0;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: none;
        -webkit-tap-highlight-color: transparent;
      }

      button:hover,
      button:focus {
        -webkit-appearance: none;
      }

      button:focus {
        outline: none;
      }

      button:active {
        transform: scale(1);
        -webkit-appearance: none;
      }
    }
    .run {
      margin-top: 50px;
    }
  }
</style>
