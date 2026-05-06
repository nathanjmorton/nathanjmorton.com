import { createRouter } from 'remix/fetch-router'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { home } from './controllers/home.tsx'
import { routes } from './routes.ts'

const faviconSvg = readFileSync(resolve(import.meta.dirname, '../public/favicon.svg'), 'utf-8')

export const router = createRouter()

// Asset server (dev only — skipped when VERCEL_BUILD is set)
if (!process.env.VERCEL_BUILD) {
  try {
    const { assets } = await import('./assets.ts')
    router.get(routes.assets, async ({ request }) => {
      let response = await assets.fetch(request)
      return response ?? new Response('Not Found', { status: 404 })
    })
  } catch {}
}

router.get(routes.favicon, () => {
  return new Response(faviconSvg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
})

router.map(routes.home, home)
