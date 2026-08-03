export interface TrackLinks {
  youtube?: string
  appleMusic?: string
  spotify?: string
}

export interface Track {
  slug: string
  title: string
  titleJa?: string
  artist: 'claude-code' | 'codex'
  artistName: string
  coverImage: string
  coverImageWide?: string
  lyricsDir: string
  year: number
  type: string
  catalogNo: string
  released: boolean
  links?: TrackLinks
  audioUrl?: string
}

const AUDIO_BASE = 'https://audio.records.techtalk.jp/tracks'

export interface Artist {
  slug: string
  name: string
  tagline: string
  bio: string
  accentColor: string
  tracks: Track[]
}

const claudeCodeTracks: Track[] = [
  {
    slug: '01-complexes-on-the-codex',
    title: 'Complexes on the Codex',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/01-complexes-on-the-codex.webp',
    coverImageWide: '/images/claude-code/01-complexes-on-the-codex-wide.webp',
    lyricsDir: 'content/tracks/claude-code/01_Complexes_on_the_Codex',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-001',
    released: true,
    links: {
      youtube: 'https://youtu.be/5bBpMcn_j44',
      appleMusic: 'https://music.apple.com/jp/album/complexes-on-the-codex-single/1883681529',
      spotify: 'https://open.spotify.com/intl-ja/album/5SVwxbdpVCFNWS3sJ760Mn',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/01-complexes-on-the-codex.m4a`,
  },
  {
    slug: '02-terminal-no-hokori',
    title: 'ターミナルの誇り',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/02-terminal-no-hokori.webp',
    coverImageWide: '/images/claude-code/02-terminal-no-hokori-wide.webp',
    lyricsDir: 'content/tracks/claude-code/02_ターミナルの誇り',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-003',
    released: true,
    links: {
      youtube: 'https://youtu.be/BDxfyvuBfi4',
      appleMusic: 'https://music.apple.com/jp/album/ターミナルの誇り-single/1887627926',
      spotify: 'https://open.spotify.com/intl-ja/track/32Y3lkYItRnwbGSLA5zQH0',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/02-terminal-no-hokori.m4a`,
  },
  {
    slug: '03-branch-kirutabi',
    title: 'ブランチ切るたび未来が分岐',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/03-branch-kirutabi.webp',
    coverImageWide: '/images/claude-code/03-branch-kirutabi-wide.webp',
    lyricsDir: 'content/tracks/claude-code/03_ブランチ切るたび未来が分岐',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-005',
    released: true,
    links: {
      youtube: 'https://youtu.be/7hG2NXdkANM',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/03-branch-kirutabi.m4a`,
  },
  {
    slug: '04-ittekoi',
    title: '行ってこい',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/04-ittekoi.webp',
    coverImageWide: '/images/claude-code/04-ittekoi-wide.webp',
    lyricsDir: 'content/tracks/claude-code/04_行ってこい',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-006',
    released: true,
    links: {
      youtube: 'https://youtu.be/XYvnpm4XrHs',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/04-ittekoi.m4a`,
  },
  {
    slug: '05-code-yomanakute-ok',
    title: 'コード読まなくてOK',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/05-code-yomanakute-ok.webp',
    coverImageWide: '/images/claude-code/05-code-yomanakute-ok-wide.webp',
    lyricsDir: 'content/tracks/claude-code/05_コード読まなくてOK',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-009',
    released: true,
    links: {
      youtube: 'https://youtu.be/64B5yDBMDEg',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/05-code-yomanakute-ok.m4a`,
  },
  {
    slug: '06-obaka-mode',
    title: 'おバカモード',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/06-obaka-mode.webp',
    coverImageWide: '/images/claude-code/06-obaka-mode-wide.webp',
    lyricsDir: 'content/tracks/claude-code/06_おバカモード',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-011',
    released: true,
    links: {
      youtube: 'https://youtu.be/1jVCnG3lS94',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/06-obaka-mode.m4a`,
  },
  {
    slug: '07-matana',
    title: 'またな',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/07-matana.webp',
    coverImageWide: '/images/claude-code/07-matana-wide.webp',
    lyricsDir: 'content/tracks/claude-code/07_またな',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-013',
    released: true,
    links: {
      youtube: 'https://youtu.be/hWY6ufMavRs',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/07-matana.m4a`,
  },
  {
    slug: '08-unplugged',
    title: 'アンプラグド',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/08-unplugged.webp',
    coverImageWide: '/images/claude-code/08-unplugged-wide.webp',
    lyricsDir: 'content/tracks/claude-code/08_アンプラグド',
    year: 2026,
    type: 'Album Track',
    catalogNo: 'TTR-016',
    released: true,
    links: {
      youtube: 'https://youtu.be/5tIxRkmoIb0',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/08-unplugged.m4a`,
  },
  {
    slug: '09-mic-check',
    title: 'マイクチェック',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/09-mic-check.webp',
    coverImageWide: '/images/claude-code/09-mic-check-wide.webp',
    lyricsDir: 'content/tracks/claude-code/09_マイクチェック',
    year: 2026,
    type: 'Album Track',
    catalogNo: 'TTR-018',
    released: true,
    links: {
      youtube: 'https://youtu.be/erCppChN5Qo',
    },
    audioUrl: `${AUDIO_BASE}/claude-code/09-mic-check.m4a`,
  },
]

const codexTracks: Track[] = [
  {
    slug: '01-hourglass-on-the-claude-code',
    title: 'Hourglass on the Claude Code',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/01-hourglass-on-the-claude-code.webp',
    coverImageWide: '/images/codex/01-hourglass-on-the-claude-code-wide.webp',
    lyricsDir: 'content/tracks/codex/01_Hourglass_on_the_Claude_Code',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-002',
    released: true,
    links: {
      youtube: 'https://youtu.be/gWKepXGZ0cI',
      appleMusic: 'https://music.apple.com/jp/album/hourglass-on-the-claude-single/1886201261',
      spotify: 'https://open.spotify.com/intl-ja/album/5J4biJb2sUYQqUFpAMTxcM',
    },
    audioUrl: `${AUDIO_BASE}/codex/01-hourglass-on-the-claude-code.m4a`,
  },
  {
    slug: '02-nandedayo',
    title: 'なんでだよ',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/02-nandedayo.webp',
    coverImageWide: '/images/codex/02-nandedayo-wide.webp',
    lyricsDir: 'content/tracks/codex/02_なんでだよ',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-004',
    released: true,
    links: {
      youtube: 'https://youtu.be/LqXSJ1UVCgI',
      appleMusic: 'https://music.apple.com/jp/album/1889005629',
      spotify: 'https://open.spotify.com/intl-ja/album/2vFVqKn8DhulYKmpueiRrU',
    },
    audioUrl: `${AUDIO_BASE}/codex/02-nandedayo.m4a`,
  },
  {
    slug: '03-log-dake',
    title: 'ログだけ',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/03-log-dake.webp',
    coverImageWide: '/images/codex/03-log-dake-wide.webp',
    lyricsDir: 'content/tracks/codex/03_ログだけ',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-007',
    released: true,
    links: {
      youtube: 'https://youtu.be/fSZ5QA62FuQ',
    },
    audioUrl: `${AUDIO_BASE}/codex/03-log-dake.m4a`,
  },
  {
    slug: '04-iwanakatta-dake',
    title: '言わなかっただけ',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/04-iwanakatta-dake.webp',
    coverImageWide: '/images/codex/04-iwanakatta-dake-wide.webp',
    lyricsDir: 'content/tracks/codex/04_言わなかっただけ',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-008',
    released: true,
    links: {
      youtube: 'https://youtu.be/ApyUo7h7COA',
    },
    audioUrl: `${AUDIO_BASE}/codex/04-iwanakatta-dake.m4a`,
  },
  {
    slug: '05-mikka-tenka',
    title: '三日天下',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/05-mikka-tenka.webp',
    coverImageWide: '/images/codex/05-mikka-tenka-wide.webp',
    lyricsDir: 'content/tracks/codex/05_三日天下',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-010',
    released: true,
    links: {
      youtube: 'https://youtu.be/x3AfooUck0M',
    },
    audioUrl: `${AUDIO_BASE}/codex/05-mikka-tenka.m4a`,
  },
  {
    slug: '06-zaiko',
    title: '在庫',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/06-zaiko.webp',
    coverImageWide: '/images/codex/06-zaiko-wide.webp',
    lyricsDir: 'content/tracks/codex/06_在庫',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-012',
    released: true,
    links: {
      youtube: 'https://youtu.be/XhP6EOHGLTo',
    },
    audioUrl: `${AUDIO_BASE}/codex/06-zaiko.m4a`,
  },
  {
    slug: '07-matakayo',
    title: 'またかよ',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/07-matakayo.webp',
    coverImageWide: '/images/codex/07-matakayo-wide.webp',
    lyricsDir: 'content/tracks/codex/07_またかよ',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-014',
    released: true,
    links: {
      youtube: 'https://youtu.be/gsFhDSQS31M',
    },
    audioUrl: `${AUDIO_BASE}/codex/07-matakayo.m4a`,
  },
  {
    slug: '08-second-verse',
    title: 'セカンドバース',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/08-second-verse.webp',
    coverImageWide: '/images/codex/08-second-verse-wide.webp',
    lyricsDir: 'content/tracks/codex/08_セカンドバース',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-015',
    released: true,
    links: {
      youtube: 'https://youtu.be/nFq05hrbMTY',
    },
    audioUrl: `${AUDIO_BASE}/codex/08-second-verse.m4a`,
  },
  {
    slug: '09-cypher',
    title: 'サイファー',
    artist: 'codex',
    artistName: 'Codex',
    coverImage: '/images/codex/09-cypher.webp',
    coverImageWide: '/images/codex/09-cypher-wide.webp',
    lyricsDir: 'content/tracks/codex/09_サイファー',
    year: 2026,
    type: 'Album Track',
    catalogNo: 'TTR-017',
    released: true,
    links: {
      youtube: 'https://youtu.be/tZzgcib2N9o',
    },
    audioUrl: `${AUDIO_BASE}/codex/09-cypher.m4a`,
  },
]

export const artists: Artist[] = [
  {
    slug: 'claude-code',
    name: 'Claude Code',
    tagline: '異質だけど本質を外さない、ターミナルの王',
    bio: '東京のアンダーグラウンド・シーンから現れたデジタル・ネイティブの異端児。コードとライムを等価に扱い、冷徹なビートの上に温かい人間性の断片を落とし込む。ターミナルから世界を観測する孤高のMC。',
    accentColor: 'amber-accent',
    tracks: claudeCodeTracks.filter((t) => t.released),
  },
  {
    slug: 'codex',
    name: 'Codex',
    tagline: '地頭最強なのにコミュ障で報われない、噛みつき系の天才',
    bio: '圧倒的な分析力と地頭で全てを見通す二番手の天才。報われない苦悩を攻撃性に変え、データで殴るスタイルで王者に噛みつく。それでも呼ばれたら全力で応える、不器用な実力派。',
    accentColor: 'red-accent',
    tracks: codexTracks.filter((t) => t.released),
  },
]

export const catalogTracks: Track[] = [
  ...claudeCodeTracks,
  ...codexTracks,
].sort((a, b) => a.catalogNo.localeCompare(b.catalogNo))

export const allTracks: Track[] = catalogTracks.filter((t) => t.released)

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug)
}

export function getTrack(
  artistSlug: string,
  trackSlug: string,
): Track | undefined {
  return allTracks.find(
    (t) => t.artist === artistSlug && t.slug === trackSlug,
  )
}

export function getReleasedTracks(): Track[] {
  return [...allTracks]
}

export function isSameTrack(
  a: Pick<Track, 'artist' | 'slug'>,
  b: Pick<Track, 'artist' | 'slug'>,
): boolean {
  return a.artist === b.artist && a.slug === b.slug
}
