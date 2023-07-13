
import { createApp } from './main'

import 'element-plus/dist/index.css'
import { applyPlugins } from '@impoh/nuxt/core/nuxt'
import ceInit from '@impoh/nuxt/plugins/init'



const { app, router, cessr } = createApp()



// wait until router is ready before mounting to ensure hydration match
router.isReady().then(async () => {
  app.mount('#app')

  try {
    // 注入初始化代码
    await applyPlugins(cessr, [ceInit])

    await cessr.hooks.callHook("app:created", app)
  } catch (error) {

  }
  console.log('hydrated')
})

