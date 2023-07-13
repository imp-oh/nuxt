<template>
  <h1>Home {{ state.tiem }} ----- {{ 123 }}</h1>
  <h2>{{ state.name }}</h2>

  <client-only>
    sadasdasd asdasd

  </client-only>

  <el-tooltip content="the tooltip content">
    <el-button>tooltip</el-button>
  </el-tooltip>

  <el-tooltip content="the tooltip content">
    <el-button>tooltip2</el-button>
  </el-tooltip>



  <el-tooltip content="the tooltip content">
    <el-button>tooltip3</el-button>
  </el-tooltip>


  <ul>
    <li v-for="item in setData.tableData">
      {{ item.name }}
    </li>
  </ul>

  <p>
    <img src="../assets/logo.png" alt="logo" />
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <p class="virtual">msg from virtual module:</p>
  <p class="inter">this will be styled with a font-face</p>
  <p class="import-meta-url">{{ state.url }}</p>
  <p class="protocol">{{ state.protocol }}</p>
  <p class="nested-virtual">msg from nested virtual module:xxx</p>
  <Button>CommonButton</Button>
  <div>
    encrypted message:
    <p class="encrypted-msg"></p>
  </div>


  <button @click="handleAxios">点击发财</button>
</template>

<script setup>
import { reactive, defineAsyncComponent, onServerPrefetch, useSSRContext, watch } from 'vue'
import { useContext, useHead, useFetch, useLazyFetch, useGet } from '@impoh/nuxt'


import { ElButton, ElTooltip } from 'element-plus'
import Button from '../components/button'



const url = import.meta.env.SSR
  ? import.meta.url
  : document.querySelector('.import-meta-url')?.textContent
const protocol = url ? new URL(url).protocol : undefined

let state = reactive({
  count: 0,
  protocol,
  url,
  tiem: '',
  name: '',
  initialState: []
})


const title = 'Vitesse SSR --' + new Date().getTime()
const description = 'Opinionated SSR Vite Starter Template'



useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
  ],
})

useHead({
  meta: [
    { property: 'og:title1', content: title },
    { property: 'og:title2', content: title },
    { property: 'og:title3', content: title },
    { property: 'og:title4', content: title },
    { property: 'og:title5', content: title },
  ]
})


const setData = reactive({
  tableData: []
})

let testList = await useFetch('/api/test/list')
console.log(testList.error)

setData.tableData = useGet(testList, 'data.value.data', [])

for (let i in setData.tableData) {
  let row = setData.tableData[i]
  row.xxx = '啊哎吃阿斯顿v🤣🤣😂🤩'
}


let index = 0

async function handleAxios () {
  index += 1
  let { data } = await useFetch('http://127.0.0.1:5200/api/test/list', {
    query: {
      page: index
    }
  })

}


</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
