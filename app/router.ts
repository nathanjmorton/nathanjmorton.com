import { createRouter } from 'remix/fetch-router'

import { home } from './controllers/home.tsx'
import { routes } from './routes.ts'

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0d1117"/>
  <polygon points="17,3 7,16 13,16 11,29 22,15 16,15" fill="#f7a41d"/>
  <path d="M22,8 A10,10 0 1,0 22,24" fill="none" stroke="#e6edf3" stroke-width="3" stroke-linecap="round"/>
</svg>`

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
