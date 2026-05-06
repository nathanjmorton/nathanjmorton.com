import { createRequestListener } from 'remix/node-fetch-server'

import { router } from './app/router.ts'

async function handler(request: Request) {
  try {
    return await router.fetch(request)
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// Export for Vercel serverless
export default createRequestListener(handler)

// Start local dev server only when not on Vercel
if (!process.env.VERCEL) {
  let { serve } = await import('remix/node-serve')
  let port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 44100
  let server = serve(handler, { port })
  await server.ready
  console.log(`Server listening on http://localhost:${server.port}`)

  let shuttingDown = false
  function shutdown() {
    if (shuttingDown) return
    shuttingDown = true
    server.close()
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}
