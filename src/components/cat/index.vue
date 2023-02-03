<!--
 * @Author: yanding.li David.Jackson.Lyd@gmail.com
 * @Date: 2023-02-03 20:38:53
 * @LastEditors: yanding.li David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-02-04 03:11:43
 * @FilePath: \maze\src\components\cat\index.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="cat" :style="{ backgroundColor: color}" @click="move">
    <span>{{ role.name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Square',
  props: {
    color: {
      type: String,
      required: true
    },
    role: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
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
      this.$store.commit('setActiveRole', {
        name: this.role.name,
        index: this.role.index,
        step: this.role.step,
        p: this.role.p
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .cat {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
