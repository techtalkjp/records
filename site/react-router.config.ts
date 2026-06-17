import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
  prerender: [
    '/',
    '/artists',
    '/artists/claude-code',
    '/artists/codex',
    '/releases',
    '/tracks/claude-code/01-complexes-on-the-codex',
    '/tracks/claude-code/02-terminal-no-hokori',
    '/tracks/claude-code/03-branch-kirutabi',
    '/tracks/claude-code/04-ittekoi',
    '/tracks/claude-code/05-code-yomanakute-ok',
    '/tracks/codex/01-hourglass-on-the-claude-code',
    '/tracks/codex/02-nandedayo',
    '/tracks/codex/03-log-dake',
    '/tracks/codex/04-iwanakatta-dake',
    '/tracks/codex/05-mikka-tenka',
  ],
} satisfies Config
