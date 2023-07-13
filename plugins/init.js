/**
 * 初始化注入代码
 * 用于页面获取
 */

import { defineNuxtPlugin } from "../core/nuxt.js"

export default defineNuxtPlugin({
  name: "nuxt:init",
  enforce: "pre",
  async setup (nuxtApp) {
    return nuxtApp
  }
})