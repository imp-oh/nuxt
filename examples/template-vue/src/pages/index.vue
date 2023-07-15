<script setup>
import { useHead } from '@impoh/nuxt'
import ImportType from '@/components/ImportType.vue'

useHead({
  title: 'This is a lightweight nuxt api',
  meta: [
    { name: 'keywords', content: 'vite,vue3,ssr,nuxt-api' },
    { name: 'description', content: 'Lightweight nuxt-core plugin' },
  ]
})
</script>
<template>
  <div class="mian">
    <h1>nuxt api</h1>
    <div class="link-box">
      <router-link to="/api">useApi</router-link>
      <router-link to="/use">use</router-link>
    </div>

    <ImportType></ImportType>
  </div>
</template>
<style scoped>
.mian {
  text-align: center;
}

.link-box a {
  display: inline-block;
  width: 100px;
}
</style>