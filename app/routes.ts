import { get, route } from 'remix/fetch-router/routes'

export const routes = route({
  assets: get('/assets/*path'),
  favicon: get('/favicon.svg'),
  home: '/',
})
