import { Suspense, Transition, computed, defineComponent, h, inject, mergeProps, nextTick, onMounted, provide, ref, unref } from "vue"

import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from "../core/nuxt.js"
import { _wrapIf } from '../core/utils.js'

export default defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup (props, context) {
    const nuxtApp = useNuxtApp()

    return () => {
      const done = nuxtApp.deferHydration()

      return h(Suspense, {
        suspensible: true, onResolve: () => {
          nextTick(done)
        }
      })
    }
  }
})