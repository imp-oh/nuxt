# vite-ssr-api是一个 ssr 渲染插件的API

 "version": "0.0.4-beta.4",

因为电脑配置太低，没法驱动nuxt框架，所以把nuxt`Api`独立出来使用，还在不断完善，感觉现有的已经够用。

所以在使用的时候直接去 nuxt 官网开API

毕竟没时间去完善文档，我先尝鲜！！！！等有 初始话一个框架到github上

##  目前支持的api

``` js
export { useGet, useSet } from './core/lodash.js'
export { ClientOnly, useContext } from './core/components.js'
export { createHead, renderHeadToString, useHead } from '@vueuse/head'
export { useAsyncData, useLazyAsyncData, useNuxtData, refreshNuxtData, clearNuxtData } from "./core/asyncData.js"
export { useHydration } from "./core/hydrate.js"
export { useState, clearNuxtState } from "./core/state.js"
export { clearError, createError, isNuxtError, showError, useError } from "./core/error.js"
export { useFetch, useLazyFetch } from "./core/fetch.js"
export { useCookie } from "./core/cookie.js"
export { useRequestHeaders, useRequestEvent, useRequestFetch, setResponseStatus } from "./core/ssr.js"
export { onNuxtReady } from "./core/ready.js"
export { useNuxtApp } from './core/nuxt.js'
```

