<script setup>
import { reactive } from 'vue'

const setData = reactive({
    list1: [],
    list2: []
})

const { data, pending, error, refresh } = await useFetch('http://127.0.0.1:5200/api/test/list', {
    server: false
})

setData.list1 = data.value.data


const { data: adata } = await useFetch('http://127.0.0.1:5200/api/test/list?id=12312', {
    query: { id: 2 }
})
console.log('===============================')


</script>

<template>
    <!-- <NuxtLayout>
        <NuxtPage />
    </NuxtLayout> -->

    <div v-for="item in setData.list1">
        {{ item }}
    </div>

    <div v-for="item in setData.list2">
        {{ item }}
    </div>
</template>
