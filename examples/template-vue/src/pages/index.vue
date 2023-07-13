<script setup>
import { reactive } from 'vue'
import { useFetch, useGet } from '@impoh/nuxt'

const setData = reactive({
  tableData: []
})


let testList = await useFetch('/api/test/list')
console.log(testList.error)

setData.tableData = useGet(testList, 'data.data', [])


</script>
<template>
  <div>
    爱你一五年

    <ul>
      <li v-for="item in setData.tableData">{{ item }}</li>
    </ul>
  </div>
</template>
<style scoped></style>