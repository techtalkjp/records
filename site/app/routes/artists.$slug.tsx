import { Link, data } from 'react-router'
import type { Route } from './+types/artists.$slug'
import { getArtist, artists } from '~/data/tracks'
import { TrackCard } from '~/components/track-card'

export function loader({ params }: Route.LoaderArgs) {
  const artist = getArtist(params.slug)
  if (!artist) throw data('Artist not found', { status: 404 })
  return { artist }
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.artist.name} — TECHTALK RECORDS` },
    { name: 'description', content: data.artist.tagline },
  ]
}

export default function ArtistPage({ loaderData }: Route.ComponentProps) {
  const { artist } = loaderData
  const isAmber = artist.accentColor === 'amber-accent'

  return (
    <div className="px-6 overflow-x-hidden max-w-2xl mx-auto">
      {/* Hero */}
      <section className="mb-20 mt-8">
        <h1
          className={`artist-detail-name text-[clamp(3.5rem,15vw,6rem)] font-headline font-black tracking-[-0.05em] uppercase leading-[0.9] transition-colors duration-300 ${
            isAmber ? 'hover:text-amber-accent' : 'hover:text-red-accent'
          }`}
        >
          {artist.name.split(' ').map((word, i) => (
            <span key={i}>
              {word}
              <br />
            </span>
          ))}
        </h1>

        <div className="mt-8">
          <p
            className={`font-headline font-bold text-lg mb-4 ${
              isAmber ? 'text-amber-accent' : 'text-red-accent'
            }`}
          >
            {artist.tagline}
          </p>
          <div className="max-w-xs border-l-2 border-white pl-4 py-1">
            <p className="text-neutral-400 text-sm leading-relaxed">
              {artist.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Discography */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-headline font-black text-3xl tracking-tighter">
            DISCOGRAPHY
          </h2>
          <span className="font-label text-[10px] text-outline uppercase tracking-widest">
            {artist.tracks.length} Releases
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12">
          {artist.tracks.map((track) => (
            <TrackCard
              key={track.slug}
              {...track}
              accentHover={
                isAmber
                  ? 'group-hover:text-amber-accent'
                  : 'group-hover:text-red-accent'
              }
            />
          ))}
        </div>
      </section>

      {/* Other Artists */}
      <section className="mb-20">
        <h2 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-6 uppercase">
          OTHER ARTISTS
        </h2>
        {artists
          .filter((a) => a.slug !== artist.slug)
          .map((other) => (
            <Link
              key={other.slug}
              to={`/artists/${other.slug}`}
              viewTransition
              className="group block"
            >
              <span className="text-4xl font-black tracking-tighter uppercase font-headline text-neutral-600 group-hover:text-white transition-colors duration-200">
                {other.name}
              </span>
            </Link>
          ))}
      </section>
    </div>
  )
}
