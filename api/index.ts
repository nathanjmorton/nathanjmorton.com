import { createRequestListener } from 'remix/node-fetch-server'

import { router } from '../app/router.ts'

export default createRequestListener(async (request) => {
  try {
    return await router.fetch(request)
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
})
