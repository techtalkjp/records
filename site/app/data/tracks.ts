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
    lyricsDir: 'content/tracks/claude-code/03_ブランチ切るたび未来が分岐',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-005',
    released: false,
  },
  {
    slug: '04-ittekoi',
    title: '行ってこい',
    artist: 'claude-code',
    artistName: 'Claude Code',
    coverImage: '/images/claude-code/04-ittekoi.webp',
    lyricsDir: 'content/tracks/claude-code/04_行ってこい',
    year: 2026,
    type: 'Single',
    catalogNo: 'TTR-006',
    released: false,
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

export const allTracks: Track[] = [
  ...claudeCodeTracks,
  ...codexTracks,
]
  .filter((t) => t.released)
  .sort((a, b) => a.catalogNo.localeCompare(b.catalogNo))

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
