
function parseVueRequest (id) {
  const [filename, rawQuery] = id.split(`?`, 2)
  const query = Object.fromEntries(new URLSearchParams(rawQuery))
  if (query.vue != null) {
    query.vue = true
  }
  if (query.index != null) {
    query.index = Number(query.index)
  }
  if (query.raw != null) {
    query.raw = true
  }
  if (query.url != null) {
    query.url = true
  }
  if (query.scoped != null) {
    query.scoped = true
  }
  return {
    filename,
    query
  }
}

export default function ViteSsrPlugin (options = []) {

  let server
  return {
    name: 'impoh-nuxt', // 必须的，将会在 warning 和 error 中显示
    configureServer (_server) {
      server = _server
    },
    transform (code, id, opt = {}) {

      const ssr = opt?.ssr === true
      const { filename, query } = parseVueRequest(id)

      if (query.raw || query.url) {
        return
      }

      // 获取插件，并写入代码
      if (filename.indexOf('@impoh/nuxt') != -1) {
        let env = server?.config?.env || {}
        env.client = !ssr
        env.server = ssr
        return `${ssr ? 'process.server=' + ssr + ';process.client=' + !ssr : 'export const process =' + JSON.stringify(env)}\n` + code
      }

      return
    },

  }
}