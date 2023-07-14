
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

  const optimizedDepChunkRE = /\/chunk-[A-Z\d]{8}\.js/
  return {
    name: 'impoh-nuxt', // 必须的，将会在 warning 和 error 中显示
    // config (config, { command }) {
    //   if (!config.optimizeDeps || (config.optimizeDeps && !config.optimizeDeps.exclude)) {
    //     config.optimizeDeps = { exclude: ['@impoh/nuxt'] }
    //   }

    //   if (config.optimizeDeps && config.optimizeDeps.exclude && !config.optimizeDeps.exclude.includes('@impoh/nuxt')) {
    //     config.optimizeDeps.exclude.push('@impoh/nuxt')
    //   }
    // },
    // buildStart (opt) {
    //   console.log('打包立琳请求区', opt)
    // },
    // load (id, opt) {
    //   console.log(id)
    // },
    // buildEnd (err) {
    //   console.log(err)
    // },
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
      if (filename.indexOf('@impoh/nuxt') != -1 || filename.indexOf('@impoh_nuxt') != -1 || optimizedDepChunkRE.test(id)) {
        let env = server?.config?.env || {}
        env.client = !ssr
        env.server = ssr

        if (env.client && !env.env) env.env = {}
        return `${ssr ? 'process.server=' + ssr + ';process.client=' + !ssr : 'export const process =' + JSON.stringify(env)}\n` + code
      }


      return
    },


  }
}