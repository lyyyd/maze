<!--
 * @Author: yanding.li David.Jackson.Lyd@gmail.com
 * @Date: 2023-02-03 20:38:53
 * @LastEditors: yanding.li David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-02-04 03:14:52
 * @FilePath: \maze\src\components\square\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="square" @click.stop="clickBox" :class="{ mapBg: wall.includes(mapP) }">
    <div>
      <div v-for="(item, x) in roleOrigin" :key="x">
        <cat v-show="item.p === mapP" :color="item.color" :role="item" @move="move"/>
      </div>
    </div>
    <div v-show="easterEggs.includes(mapP)">
      <egg color="yellow" @move="move"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Cat from '../cat/index.vue'
import Egg from '../egg/index.vue'

export default Vue.extend({
  name: 'Square',
  components: {
    Cat,
    Egg
    // Wall
  },
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      active: false,
      setRole: true,
      rolePosition: '',
      curP: {
        role: String,
        x: Number,
        y: Number
      },
      role: [] as Array<any>,
      roleOrigin: [] as Array<any>,
      easterEggs: [] as Array<any>,
      activeRole: {
        name: '',
        index: 0,
        p: '',
        step: 0
      },
      wall: [] as Array<any>,
      tmpArr: [] as Array<any>
    }
  },
  computed: {
    mapP: function (): string {
      return this.x + ',' + this.y
    }
  },
  mounted () {
    console.log()
  },
  watch: {
    '$store.state.activeRole': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.activeRole = newVal
        console.log('数据变化 this.activeRole', newVal)
        // 判断彩蛋碰撞
        this.touchEgg()
        this.gameWin()
        // 判断其他cat碰撞
      }
    },
    '$store.state.role': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.roleOrigin = newVal
        this.role = []
        for (let index = 0; index < newVal.length; index++) {
          const ele = newVal[index]
          this.role.push(ele)
        }
      }
    },
    '$store.state.easterEgg': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.easterEggs = []
        for (let index = 0; index < newVal.length; index++) {
          const ele = newVal[index]
          this.easterEggs.push(ele)
        }
        this.easterEggs = newVal
      }
    },
    '$store.state.wall': {
      deep: true,
      handler: function (newVal, oldVal) {
        for (let index = 0; index < newVal.length; index++) {
          const ele = newVal[index]
          this.wall.push(ele)
        }
        // this.easterEggs = newVal
      }
    }
  },

  methods: {
    gameWin (): any {
      const curRoleIndex = this.activeRole.index
      const tmpArr = this.role.slice()
      tmpArr.splice(curRoleIndex, 1)

      const arr = []

      for (let index = 0; index < tmpArr.length; index++) {
        const ele = tmpArr[index].p
        arr.push(ele)
      }

      console.log('检测 this.curRoleIndex', curRoleIndex)
      console.log('检测 this.role', this.role)
      console.log('检测 tmpArr', tmpArr)

      if (arr.includes(this.activeRole.p)) {
        console.log('胜利')
        this.eatCat(tmpArr)
      }
    },
    eatCat (tmpArr: any): any {
      const arr = tmpArr.filter((val: any) => {
        return val.p !== this.activeRole.p
      })
      console.log('吃猫咪***', arr)
      this.$store.commit('setRole', [...arr])
      this.open()
      // alert(`猫咪${this.activeRole.name}获得了胜利`)
    },
    touchEgg (): any {
      if (this.easterEggs.includes(this.activeRole.p)) {
        this.activeRole.step = 2
        this.$store.commit('setActiveRole', this.activeRole)
        console.log('碰彩蛋')
        this.eatEgg()
      }
    },
    eatEgg (): any {
      const arr = this.easterEggs.filter(val => {
        return val !== this.activeRole.p
      })
      console.log('吃彩蛋***', arr)
      this.$store.commit('setEasterEgg', [...arr])
    },
    patch (): boolean {
      const res = this.roleOrigin.filter(val => {
        return val.p === this.mapP
      })
      console.log('res', res)
      return res.length > 0
    },
    clickBox () {
      console.log('x', this.x)
      console.log('y', this.y)
      this.active = true
      this.$emit('selectMap', this.x + '' + this.y)
    },
    change (e: any) {
      console.log('点击', e)
    },
    move (e: any) {
      console.log('移动', e)
      this.rolePosition = e
    },
    open () {
      this.$alert(`恭喜猫咪${this.activeRole.name}获得了胜利`, 'Victory', {
        confirmButtonText: '再来一局'
      }).then(() => {
        this.$router.go(0)
        location.reload()
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .square {
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mapBg {
    background: #333;
  }
</style>
