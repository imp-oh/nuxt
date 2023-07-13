import { basename } from 'node:path'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

import { renderHeadToString } from '@impoh/nuxt'
import { applyPlugins } from '@impoh/nuxt/core/nuxt'
import ceInit from '@impoh/nuxt/plugins/init'


export async function render (url, manifest) {
  const { app, router, cessr, head } = createApp()



  // set the router to the desired URL before rendering
  await router.push(url)
  await router.isReady()


  const ctx = {}
  let html = await renderToString(app, ctx)
  const heads = head ? await renderHeadToString(head) : {}
  const teleports = renderTeleports(ctx.teleports)
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)




  try {
    // 注入初始化代码
    await applyPlugins(cessr, [ceInit])

    await cessr.hooks.callHook("app:created", app)
  } catch (error) {

  }

  return [html, preloadLinks, heads, cessr, teleports]
}


function renderTeleports (teleports) {
  if (!teleports) return ''
  return Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith('#el-popper-container-')) {
      return `${all}<div id="${key.slice(1)}">${value}</div>`
    }
    return all
  }, teleports.body || '')
}


function renderPreloadLinks (modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink (file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
