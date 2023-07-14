<script setup>
import { useNuxtApp } from '@impoh/nuxt'
const nuxtApp = useNuxtApp()
// The control page is loaded
const onResolve = nuxtApp.deferHydration()
</script>

<template>
  <router-view v-slot="{ Component }">
    <!-- @resolve="onResolve" The control page is loaded -->
    <Suspense @resolve="onResolve">
      <div class="page">
        <component :is="Component" />
      </div>
      <!-- Loading state -->
      <template #fallback>
        Loading state...
      </template>
    </Suspense>
  </router-view>
</template>

<style></style>
