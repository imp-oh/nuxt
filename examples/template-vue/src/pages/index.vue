<script setup>
import { reactive, onMounted } from 'vue'
import { useFetch, useGet } from '@impoh/nuxt'

const setData = reactive({
  tableData: [],
  tableData2: [],
})




let testList2 = await useFetch('/api/test/list?id=12')
setData.tableData = useGet(testList2, 'data.value.data', [])


onMounted(async () => {
  let testList = await useFetch('/api/test/list', {
    server: false,
  })

  setData.tableData2 = testList

})

// setData.tableData2 = useGet(testList2, 'data.data', [])
// console.log(testList.error)



</script>
<template>
  <div>
    爱你一五年

    <div>=-===========</div>
    {{ testList2 }}

    <ul>
      <li v-for="item in setData.tableData">{{ item }}</li>
    </ul>

    <!-- {{testList2}} -->
    {{ setData.tableData2 }}
  </div>
</template>
<style scoped></style>