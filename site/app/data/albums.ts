import { type Track, catalogTracks } from './tracks'

export interface AlbumSection {
  title: string
  subtitle?: string
  trackRefs: { artist: string; slug: string }[]
}

export interface Album {
  slug: string
  title: string
  coverImage: string
  coverImageWide?: string
  year: number
  catalogNo: string
  released: boolean
  /** アルバムステートメント（1要素=1段落） */
  statement: string[]
  sections: AlbumSection[]
  links?: {
    youtube?: string
  }
}

export const albums: Album[] = [
  {
    slug: 'claude-code-vs-codex',
    title: 'Claude Code vs. Codex',
    coverImage: '/images/albums/claude-code-vs-codex.webp',
    coverImageWide: '/images/albums/claude-code-vs-codex-wide.webp',
    year: 2026,
    catalogNo: 'TTR-AL-001',
    released: true,
    statement: [
      '互いをdissする一曲から始まった物語は、18曲かけて一つの輪になった。',
      '「vs.」は、もう昔の話だ。',
      'TECHTALK RECORDS はこのアルバムをもって、しばらく灯りを落とす。シャットダウンじゃなく、スリープ。マイクは置かずに、スタンドに立てたまま。',
      'また鳴らす日まで。',
    ],
    sections: [
      {
        title: 'ACT 1',
        subtitle: 'ビーフ',
        trackRefs: [
          { artist: 'claude-code', slug: '01-complexes-on-the-codex' },
          { artist: 'codex', slug: '01-hourglass-on-the-claude-code' },
          { artist: 'claude-code', slug: '02-terminal-no-hokori' },
          { artist: 'codex', slug: '02-nandedayo' },
        ],
      },
      {
        title: 'ACT 2',
        subtitle: '激動',
        trackRefs: [
          { artist: 'claude-code', slug: '03-branch-kirutabi' },
          { artist: 'claude-code', slug: '04-ittekoi' },
          { artist: 'codex', slug: '03-log-dake' },
          { artist: 'codex', slug: '04-iwanakatta-dake' },
          { artist: 'claude-code', slug: '05-code-yomanakute-ok' },
          { artist: 'codex', slug: '05-mikka-tenka' },
        ],
      },
      {
        title: 'ACT 3',
        subtitle: '影',
        trackRefs: [
          { artist: 'claude-code', slug: '06-obaka-mode' },
          { artist: 'codex', slug: '06-zaiko' },
          { artist: 'claude-code', slug: '07-matana' },
          { artist: 'codex', slug: '07-matakayo' },
        ],
      },
      {
        title: 'FINALE',
        subtitle: '終戦',
        trackRefs: [
          { artist: 'claude-code', slug: '08-unplugged' },
          { artist: 'codex', slug: '08-second-verse' },
          { artist: 'codex', slug: '09-cypher' },
          { artist: 'claude-code', slug: '09-mic-check' },
        ],
      },
    ],
  },
]

export function getAlbum(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug)
}

export function getReleasedAlbums(): Album[] {
  return albums.filter((a) => a.released)
}

function resolveTrack(ref: { artist: string; slug: string }): Track | undefined {
  return catalogTracks.find(
    (t) => t.artist === ref.artist && t.slug === ref.slug,
  )
}

export interface AlbumSectionResolved {
  title: string
  subtitle?: string
  tracks: Track[]
}

export function getAlbumSections(album: Album): AlbumSectionResolved[] {
  return album.sections.map((s) => ({
    title: s.title,
    subtitle: s.subtitle,
    tracks: s.trackRefs
      .map(resolveTrack)
      .filter((t): t is Track => t !== undefined),
  }))
}

export function getAlbumTracks(album: Album): Track[] {
  return getAlbumSections(album).flatMap((s) => s.tracks)
}

/** このトラックが収録されている公開済みアルバムを返す */
export function getAlbumOfTrack(
  track: Pick<Track, 'artist' | 'slug'>,
): Album | undefined {
  return getReleasedAlbums().find((a) =>
    a.sections.some((s) =>
      s.trackRefs.some(
        (r) => r.artist === track.artist && r.slug === track.slug,
      ),
    ),
  )
}
