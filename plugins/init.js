/**
 * 初始化注入代码
 * 用于页面获取
 */

import { nextTick } from 'vue'
import { defineNuxtPlugin } from "../core/nuxt.js"

export default defineNuxtPlugin({
  name: "nuxt:init",
  enforce: "pre",
  async setup (nuxtApp) {
    const done = nuxtApp.deferHydration()
    nextTick(done)
    return nuxtApp
  }
})