import { type RouteConfig, route } from '@react-router/dev/routes'

export default [
  route('/', 'routes/_index.tsx'),
  route('/artists', 'routes/artists._index.tsx'),
  route('/artists/:slug', 'routes/artists.$slug.tsx'),
  route('/releases', 'routes/releases.tsx'),
  route('/tracks/:artist/:slug', 'routes/tracks.$artist.$slug.tsx'),
] satisfies RouteConfig
