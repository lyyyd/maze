<!--
 * @Author: yanding.li David.Jackson.Lyd@gmail.com
 * @Date: 2023-02-03 20:38:53
 * @LastEditors: yanding.li David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-02-04 00:40:35
 * @FilePath: \maze\src\components\egg\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="egg" :style="{ backgroundColor: color}" @click="move">
    <span>?</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Egg',
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // x: 2,
      // y: 2
    }
  },
  watch: {
    '$store.state.userInfo': {
      deep: true,
      handler: (newVal, oldVal): any => {
        console.log('数据变化')
        console.log(newVal, oldVal)
      }
    }
  },
  computed: {
    // curPosition: function (): string {
    //   return this.x + '' + this.y
    // }
  },
  methods: {
    move () {
      // this.$emit('move', this.x + '' + this.y)
      // this.$store.commit('setActiveRole', {
      //   role: this.role,
      //   x: this.x,
      //   y: this.y
      // })
    }
  }
})
</script>

<style lang="scss" scoped>
  .egg {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  //   border-right: 1px solid #000;
  //   border-bottom: 1px solid #000;
  }
  .egg {
    // background: red;
  }
</style>
