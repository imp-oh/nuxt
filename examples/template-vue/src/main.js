import { createPinia } from 'pinia'
import { createSSRApp, createApp as createApps, getCurrentInstance, hasInjectionContext } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import './styles/index.css'
import { ID_INJECTION_KEY } from 'element-plus'

import { createHead } from '@impoh/nuxt'
import { createNuxtApp } from '@impoh/nuxt/core/nuxt'



export function createApp () {
  // 如果 client 模式 还是原理的vue,设置打包降解模式
  const app = import.meta.env.MODE === 'client' ? createApps(App) : createSSRApp(App)

  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })

  const nuxt = createNuxtApp({
    baseURL: 'http://127.0.0.1:5200',
    vueApp: app,
    ssrContext: {},
    env: import.meta.env
  })


  const pinia = createPinia()
  app.use(pinia)
  const router = createRouter()
  app.use(router)

  const head = createHead()
  app.use(head)




  return { app, router, nuxt, head }
}
