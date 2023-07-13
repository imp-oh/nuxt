<template>
  <h1>{{ 1 }}</h1>
  <div>
    {{ state }}

    <button @click="handleButton">发财拉阿斯顿啊</button>
  </div>
</template>

<script setup>
import { shallowReactive } from 'vue'
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

state.nested = { bar: 3 }



function handleButton () {
  state.nested = {name:'12313123'} 
}

</script>

<style scoped>
h1 {
  color: red;
}
</style>
