

import { nextTick } from 'vue'
import { defineNuxtPlugin, useRuntimeConfig } from "../core/nuxt.js"


export default defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup (nuxtApp) {
    const done = nuxtApp.deferHydration()
    nextTick(done)
    return nuxtApp
  }
})