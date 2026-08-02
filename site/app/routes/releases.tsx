import { Link } from 'react-router'
import { getReleasedAlbums } from '~/data/albums'
import { getReleasedTracks } from '~/data/tracks'
import { TrackCard } from '~/components/track-card'

export function meta() {
  return [
    { title: 'RELEASES — TECHTALK RECORDS' },
    { name: 'description', content: 'TECHTALK RECORDS リリース一覧' },
    { property: 'og:title', content: 'RELEASES — TECHTALK RECORDS' },
    { property: 'og:description', content: 'TECHTALK RECORDS リリース一覧' },
    { property: 'og:url', content: 'https://records.techtalk.jp/releases' },
  ]
}

export default function Releases() {
  const tracks = getReleasedTracks()
  const albums = getReleasedAlbums()

  return (
    <div className="px-6 max-w-2xl mx-auto mt-8">
      {albums.length > 0 && (
        <section className="mb-16">
          <h1 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-8 uppercase">
            ALBUMS
          </h1>
          {albums.map((album) => (
            <Link
              key={album.slug}
              to={`/albums/${album.slug}`}
              viewTransition
              className="group block"
            >
              <div className="aspect-square overflow-hidden bg-surface-container-low mb-4">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
                {album.catalogNo} — 1ST ALBUM
              </p>
              <p className="text-2xl font-black tracking-tighter font-headline uppercase text-white group-hover:underline">
                {album.title}
              </p>
            </Link>
          ))}
        </section>
      )}

      <h1 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-12 uppercase">
        {albums.length > 0 ? 'TRACKS' : 'RELEASES'}
      </h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-12">
        {tracks.map((track) => (
          <TrackCard
            key={`${track.artist}/${track.slug}`}
            {...track}
            accentHover={
              track.artist === 'claude-code'
                ? 'group-hover:text-amber-accent'
                : 'group-hover:text-red-accent'
            }
            showArtistName
          />
        ))}
      </div>
    </div>
  )
}
