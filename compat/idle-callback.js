export const requestIdleCallback = process.server ? () => {
} : globalThis.requestIdleCallback || ((cb) => {
  const start = Date.now()
  const idleDeadline = {
    didTimeout: false,
    timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
  }
  return setTimeout(() => {
    cb(idleDeadline)
  }, 1)
})


export const cancelIdleCallback = process.server ? () => {
} : globalThis.cancelIdleCallback || ((id) => {
  clearTimeout(id)
});


