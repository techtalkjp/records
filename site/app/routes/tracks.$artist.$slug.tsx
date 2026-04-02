import { Link, data } from 'react-router'
import type { Route } from './+types/tracks.$artist.$slug'
import { getTrack, getArtist } from '~/data/tracks'
import { readLyrics } from '~/data/lyrics.server'

export function loader({ params }: Route.LoaderArgs) {
  const track = getTrack(params.artist, params.slug)
  if (!track) throw data('Track not found', { status: 404 })

  const lyrics = readLyrics(track.lyricsDir)

  return { track, lyrics }
}

export function meta({ data }: Route.MetaArgs) {
  return [
    {
      title: `${data.track.title} — ${data.track.artistName} — TECHTALK RECORDS`,
    },
    {
      name: 'description',
      content: `${data.track.artistName}「${data.track.title}」の歌詞`,
    },
  ]
}

function parseLyrics(raw: string) {
  const sections: { tag: string; lines: string[] }[] = []
  let current: { tag: string; lines: string[] } | null = null

  for (const line of raw.split('\n')) {
    const tagMatch = line.match(/^\[(.+)\]$/)
    if (tagMatch) {
      if (current) sections.push(current)
      current = { tag: tagMatch[1]!, lines: [] }
    } else if (current) {
      if (line.trim()) current.lines.push(line)
    }
  }
  if (current) sections.push(current)
  return sections
}

export default function TrackPage({ loaderData }: Route.ComponentProps) {
  const { track, lyrics } = loaderData
  const artist = getArtist(track.artist)
  const isAmber = artist?.accentColor === 'amber-accent'
  const sections = parseLyrics(lyrics)

  return (
    <div className="pb-12">
      {/* Track Hero */}
      <section className="px-6 mb-12 max-w-2xl mx-auto mt-4">
        <div className="w-full aspect-square bg-surface-container-low mb-8 overflow-hidden">
          <img
            src={track.coverImage}
            alt={track.title}
            className="track-detail-cover w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2 mb-10">
          <p
            className={`font-mono text-[10px] tracking-[0.3em] uppercase ${
              isAmber ? 'text-amber-accent' : 'text-red-accent'
            }`}
          >
            {track.catalogNo}
          </p>
          <h1 className="track-detail-title text-4xl font-black text-white tracking-tighter leading-none font-headline uppercase">
            {track.title}
          </h1>
          <Link
            to={`/artists/${track.artist}`}
            viewTransition
            className="text-xl font-bold text-white tracking-tight font-headline hover:underline block"
          >
            {track.artistName}
          </Link>
          <p className="font-label text-[10px] text-outline uppercase tracking-widest">
            {track.year} / {track.type}
          </p>

          {track.links && (
            <div className="flex gap-4 pt-2">
              {track.links.youtube && (
                <a href={track.links.youtube} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">YouTube</a>
              )}
              {track.links.appleMusic && (
                <a href={track.links.appleMusic} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Apple Music</a>
              )}
              {track.links.spotify && (
                <a href={track.links.spotify} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Spotify</a>
              )}
            </div>
          )}
        </div>

        {/* Lyrics */}
        {sections.length > 0 && (
          <div className="space-y-12 pb-12">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-grow bg-outline-variant opacity-20" />
              <h3 className="text-[10px] font-mono tracking-[0.5em] text-outline uppercase">
                Lyrics
              </h3>
              <div className="h-[1px] flex-grow bg-outline-variant opacity-20" />
            </div>

            <div className="font-mono text-sm leading-relaxed text-white space-y-8 max-w-md mx-auto">
              {sections.map((section, i) => (
                <div key={i}>
                  <span
                    className={`block mb-4 text-xs font-bold ${
                      isAmber ? 'text-amber-accent' : 'text-red-accent'
                    }`}
                  >
                    [{section.tag}]
                  </span>
                  <p>
                    {section.lines.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < section.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Back to artist */}
      <div className="px-6 max-w-2xl mx-auto">
        <Link
          to={`/artists/${track.artist}`}
          viewTransition
          className="inline-block font-headline text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          &larr; {track.artistName}
        </Link>
      </div>
    </div>
  )
}
