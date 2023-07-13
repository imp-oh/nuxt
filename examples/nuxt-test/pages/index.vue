<script setup>

const list = []

const { data, pending, error, refresh } = await useFetch('http://127.0.0.1:5200/api/test/list')
const { data: adata } = await useFetch('http://127.0.0.1:5200/api/test/list?id=12312', {
  query: { id: 2 }
})

console.log(data)
console.log('===============================')


</script>

<template>
  <div>
    1312321312
    <a href="/page">去Page页面</a>

    <NuxtLink to="/page">page</NuxtLink>

    <div v-for="item in data.data">
      {{ item }}
    </div>

    {{ data.data }}
    <button @click="handleclick">点击发财</button>
  </div>
</template>
