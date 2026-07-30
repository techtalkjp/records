import { Link, data } from 'react-router'
import type { Route } from './+types/albums.$slug'
import { getAlbum, getAlbumSections, getAlbumTracks } from '~/data/albums'
import { getArtist, type Track } from '~/data/tracks'
import { usePlayer } from '~/components/player/player-context'

export function loader({ params }: Route.LoaderArgs) {
  const album = getAlbum(params.slug)
  if (!album || !album.released) throw data('Album not found', { status: 404 })
  const sections = getAlbumSections(album)
  return { album, sections }
}

export function meta({ data }: Route.MetaArgs) {
  const title = `${data.album.title} — TECHTALK RECORDS`
  const description = `1stアルバム『${data.album.title}』全18曲`
  const url = `https://records.techtalk.jp/albums/${data.album.slug}`
  const image = `https://records.techtalk.jp${data.album.coverImage}`
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'music.album' },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
}

function TrackRow({
  track,
  number,
  onPlay,
}: {
  track: Track
  number: number
  onPlay: () => void
}) {
  const artist = getArtist(track.artist)
  const accent = artist?.accentColor ?? 'amber-accent'
  const { isPlaying, isCurrentTrack, togglePlayPause } = usePlayer()
  const isActive = isCurrentTrack(track)

  return (
    <div className="group flex items-center gap-4 py-3 border-b border-neutral-900">
      <button
        type="button"
        onClick={() => (isActive ? togglePlayPause() : onPlay())}
        className="w-8 text-left shrink-0"
        aria-label={isActive && isPlaying ? 'pause' : 'play'}
      >
        <span className="font-mono text-xs text-neutral-600 group-hover:hidden">
          {String(number).padStart(2, '0')}
        </span>
        <span
          className={`material-symbols-outlined text-xl hidden group-hover:inline text-${accent}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isActive && isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>
      <Link
        to={`/tracks/${track.artist}/${track.slug}`}
        viewTransition
        className="flex-grow min-w-0"
      >
        <p
          className={`font-headline font-bold text-white truncate ${
            isActive ? `text-${accent}` : ''
          }`}
        >
          {track.title}
        </p>
        <p className="text-xs text-neutral-500 uppercase">{track.artistName}</p>
      </Link>
      <span className="font-mono text-[10px] text-neutral-700 shrink-0">
        {track.catalogNo}
      </span>
    </div>
  )
}

export default function AlbumPage({ loaderData }: Route.ComponentProps) {
  const { album, sections } = loaderData
  const { playQueue } = usePlayer()
  const albumTracks = sections.flatMap((s) => s.tracks)
  let n = 0

  return (
    <div className="pb-12">
      {/* Album Hero */}
      <div className="w-full aspect-square md:aspect-video bg-surface-container-low mb-8 overflow-hidden">
        <picture>
          {album.coverImageWide && (
            <source media="(min-width: 768px)" srcSet={album.coverImageWide} />
          )}
          <img
            src={album.coverImage}
            alt={album.title}
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      <section className="px-6 max-w-2xl mx-auto">
        <div className="space-y-2 mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
            {album.catalogNo} — 1ST ALBUM
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none font-headline uppercase">
            {album.title}
          </h1>
          <p className="font-label text-[10px] text-outline uppercase tracking-widest">
            {album.year} / {albumTracks.length} TRACKS
          </p>

          {album.links && (
            <div className="flex gap-4 pt-2">
              {album.links.spotify && (
                <a href={album.links.spotify} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Spotify</a>
              )}
              {album.links.appleMusic && (
                <a href={album.links.appleMusic} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Apple Music</a>
              )}
              {album.links.hyperFollow && (
                <a href={album.links.hyperFollow} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">All Platforms</a>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => playQueue(albumTracks)}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-headline font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 bg-white text-black"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            PLAY ALBUM
          </button>
        </div>

        {/* Statement */}
        <div className="mb-14 space-y-4 border-l-2 border-neutral-800 pl-5">
          {album.statement.map((line, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-neutral-300"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Tracklist */}
        <div className="space-y-12">
          {sections.map((section) => {
            const startIndex = n
            const rows = section.tracks.map((track, i) => {
              n += 1
              return (
                <TrackRow
                  key={`${track.artist}/${track.slug}`}
                  track={track}
                  number={startIndex + i + 1}
                  onPlay={() => playQueue(albumTracks, startIndex + i)}
                />
              )
            })
            return (
              <div key={section.title}>
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="text-[10px] font-mono tracking-[0.4em] text-neutral-500 uppercase">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <span className="text-[10px] text-neutral-700">
                      {section.subtitle}
                    </span>
                  )}
                </div>
                <div>{rows}</div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
