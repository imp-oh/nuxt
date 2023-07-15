import { nextTick } from 'vue'
import { createApp } from './main'
import 'element-plus/dist/index.css'


// 使用
render()
export default async function render () {
  const { app, router, nuxt } = createApp()

  await router.isReady()
  console.log('hydrated')

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


