import { nextTick } from 'vue'
import { createApp } from './main'

import 'element-plus/dist/index.css'
import { applyPlugins } from '@impoh/nuxt/core/nuxt'
import initPlugin from '@impoh/nuxt/plugins/init'


// 使用
render()

export default async function render () {
  const { app, router, nuxt } = createApp()

  await router.isReady()
  console.log('hydrated')

  try {
    await applyPlugins(nuxt, [initPlugin])
  } catch (err) {
    await nuxt.callHook("app:error", err)
    nuxt.payload.error = nuxt.payload.error || err
  }

  try {
    await nuxt.hooks.callHook("app:created", app)
    await nuxt.hooks.callHook("app:beforeMount", app)
    app.mount('#app')
    await nuxt.hooks.callHook("app:mounted", app)
    await nextTick()
  } catch (err) {
    await nuxt.callHook("app:error", err)
    nuxt.payload.error = nuxt.payload.error || err
  }
}


