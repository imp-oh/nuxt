import path from 'node:path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ViteNuxtPlugin from '@impoh/nuxt/plugin'

export default defineConfig(({ command, ssrBuild }) => ({
  base: '/',
  resolve: {
    alias: {}
  },
  plugins: [
    vuePlugin(),
    vueJsx(),
    ViteNuxtPlugin(),

  ],
  experimental: {
  },
  build: {
    minify: false,
  },
  ssr: {
    noExternal: [

    ],
  },
  optimizeDeps: {
    include: [],
    exclude: ['@impoh/nuxt'],
  },
}))
