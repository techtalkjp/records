import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  prerender: [
    '/',
    '/artists',
    '/artists/claude-code',
    '/artists/codex',
    '/releases',
    '/tracks/claude-code/01-complexes-on-the-codex',
    '/tracks/claude-code/02-terminal-no-hokori',
    '/tracks/codex/01-hourglass-on-the-claude-code',
    '/tracks/codex/02-nandedayo',
  ],
} satisfies Config
