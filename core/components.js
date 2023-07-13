import { ref, onMounted, defineComponent, inject } from 'vue'

export const ClientOnly = defineComponent({
  name: 'ClientOnly',
  setup (_, { slots }) {
    const show = ref(false)
    onMounted(() => {
      show.value = true
    })

    return () => (show.value && slots.default ? slots.default() : null)
  },
})

const CONTEXT_SYMBOL = Symbol()
export function provideContext (app, context) {
  app.provide(CONTEXT_SYMBOL, context)
}

export function useContext () {
  return inject(CONTEXT_SYMBOL)
}

