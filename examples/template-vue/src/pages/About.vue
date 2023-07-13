<template>
  <h1>{{ msg }}</h1>
  <p class="import-meta-url">{{ url }}</p>
  <Button>CommonButton</Button>
</template>

<script>
import { useHead } from '@impoh/nuxt'
import Button from '../components/button'

export default {
  async setup () {
    const url = import.meta.env.SSR
      ? import.meta.url
      : document.querySelector('.import-meta-url')?.textContent


    useHead({
      title: '哎吃咪咪',
      meta: [

      ],
    })


    return {
      msg: 'About',
      url,
    }
  },
  components: {
    Button,
  },
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
