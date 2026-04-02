import { getReleasedTracks } from '~/data/tracks'
import { TrackCard } from '~/components/track-card'

export function meta() {
  return [
    { title: 'RELEASES — TECHTALK RECORDS' },
    { name: 'description', content: 'TECHTALK RECORDS リリース一覧' },
  ]
}

export default function Releases() {
  const tracks = getReleasedTracks()

  return (
    <div className="px-6 max-w-2xl mx-auto mt-8">
      <h1 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-12 uppercase">
        RELEASES
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
