<script setup>
import { useNuxtApp } from '@impoh/nuxt'
const nuxtApp = useNuxtApp()
const onResolve = nuxtApp.deferHydration()
</script>

<template>
  <router-view v-slot="{ Component }">
    <!-- 此组件用于控制请求 必须要的 -->
    <Suspense @resolve="onResolve">
      <component :is="Component" />
      <!-- 加载中状态 -->
      <template #fallback>
        正在加载...
      </template>
    </Suspense>
  </router-view>
</template>

<style></style>
