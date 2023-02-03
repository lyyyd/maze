/*
 * @Author: yanding.li David.Jackson.Lyd@gmail.com
 * @Date: 2023-02-03 20:38:53
 * @LastEditors: yanding.li David.Jackson.Lyd@gmail.com
 * @LastEditTime: 2023-02-04 00:21:30
 * @FilePath: \maze\src\store\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里面访问方便，但是没有持久化的功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    // role: JSON.parse(window.localStorage.getItem('role') || 'null'),
    role: window.localStorage.getItem('role') || 'null',
    activeRole: window.localStorage.getItem('activeRole') || 'null',
    easterEgg: window.localStorage.getItem('easterEgg') || 'null',
    wall: window.localStorage.getItem('wall') || 'null'
    // easterEgg: JSON.parse(window.localStorage.getItem('easterEgg') || 'null')
  },
  mutations: {
    // 修改容器数据必须使用 mutation 函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    },
    setRole (state, payload) {
      state.role = payload
      window.localStorage.setItem('role', payload)
    },
    setActiveRole (state, payload) {
      console.log('setActiveRole', payload)
      state.activeRole = payload
      window.localStorage.setItem('activeRole', payload)
    },
    setEasterEgg (state, payload) {
      console.log('setEasterEgg', payload)
      state.easterEgg = payload
      window.localStorage.setItem('easterEgg', payload)
    },
    setWall (state, payload) {
      console.log('setWall', payload)
      state.wall = payload
      window.localStorage.setItem('wall', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
