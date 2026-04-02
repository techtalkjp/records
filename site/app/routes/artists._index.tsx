import { Link, useViewTransitionState } from 'react-router'
import { artists } from '~/data/tracks'

export function meta() {
  return [
    { title: 'ARTISTS — TECHTALK RECORDS' },
    { name: 'description', content: 'TECHTALK RECORDS 所属アーティスト' },
  ]
}

function ArtistCard({
  artist,
}: { artist: (typeof artists)[number] }) {
  const href = `/artists/${artist.slug}`
  const isTransitioning = useViewTransitionState(href)
  const isAmber = artist.accentColor === 'amber-accent'

  return (
    <Link to={href} viewTransition className="group block">
      <span
        className={`text-6xl md:text-8xl font-black tracking-tighter uppercase font-headline block leading-[0.85] text-white transition-colors duration-200 ${
          isAmber
            ? 'group-hover:text-amber-accent'
            : 'group-hover:text-red-accent'
        }`}
        style={{
          viewTransitionName: isTransitioning ? 'artist-name' : 'none',
        }}
      >
        {artist.name}
      </span>
      <p className="text-sm text-neutral-500 mt-3 font-body">
        {artist.tagline}
      </p>
      <p className="text-[10px] text-neutral-600 font-label uppercase tracking-widest mt-1">
        {artist.tracks.length} Releases
      </p>
      <div
        className={`h-[2px] w-0 group-hover:w-full transition-all duration-300 mt-3 ${
          isAmber ? 'bg-amber-accent' : 'bg-red-accent'
        }`}
      />
    </Link>
  )
}

export default function ArtistsIndex() {
  return (
    <div className="px-6 max-w-2xl mx-auto mt-8">
      <h1 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-12 uppercase">
        ARTISTS
      </h1>

      <div className="flex flex-col gap-12">
        {artists.map((artist) => (
          <ArtistCard key={artist.slug} artist={artist} />
        ))}
      </div>
    </div>
  )
}
