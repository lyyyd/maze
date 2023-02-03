<!--
 * @Author: yanding.li David.Jackson.Lyd@gmail.com
 * @Date: 2023-02-03 20:38:53
 * @LastEditors: yanding.li David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-02-04 03:39:12
 * @FilePath: \maze\src\components\wall\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="wall" :style="{ backgroundColor: color}" @click="move">
    <span>{{ role }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Wall',
  props: {
    color: {
      type: String,
      required: true
    },
    role: {
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
    // curPosition: function (): string
  },
  methods: {
    move () {
      // this.$emit('move', this.x + '' + this.y)
    }
  }
})
</script>

<style lang="scss" scoped>
  .wall {
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
  .wall {
    // background: red;
  }
</style>
