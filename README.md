# nuxt  plug-in

The core code is nuxt-core，Mainly in order to reduce the burden of the frame, and the APi use is consistent, the new useGet, useSet, the use of the two methods please see lodash.js

[Presentation page](https://www.impoh.com/) 

[document](https://nuxt.com/docs/api/composables/use-app-config)

[github address](https://github.com/impohcom/nuxt)

[template-vue](https://github.com/impohcom/nuxt/tree/main/examples/template-vue)

##  Supported apis

``` js
export { useGet, useSet } from './core/lodash.js'
export { ClientOnly } from './core/components.js'
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

##  components

```vue
	<ClientOnly> slots .... </ClientOnly> 
```