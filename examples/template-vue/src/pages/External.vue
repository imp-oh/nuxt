<template>

  {{ state }}
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




</script>
