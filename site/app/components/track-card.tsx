import { Link, useViewTransitionState } from 'react-router'

interface TrackCardProps {
  slug: string
  artist: string
  artistName: string
  title: string
  coverImage: string
  year: number
  type: string
  accentHover?: string
  showArtistName?: boolean
}

export function TrackCard({
  slug,
  artist,
  artistName,
  title,
  coverImage,
  year,
  type,
  accentHover = 'group-hover:text-amber-accent',
  showArtistName,
}: TrackCardProps) {
  const href = `/tracks/${artist}/${slug}`
  const isTransitioning = useViewTransitionState(href)

  return (
    <Link to={href} viewTransition className="group">
      <div className="aspect-square w-full bg-surface-container mb-4 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
          style={{
            viewTransitionName: isTransitioning ? 'cover-art' : 'none',
          }}
        />
      </div>
      <p
        className={`font-headline font-bold text-sm tracking-tight leading-tight uppercase ${accentHover}`}
        style={{
          viewTransitionName: isTransitioning ? 'track-title' : 'none',
        }}
      >
        {title}
      </p>
      {showArtistName && (
        <p className="font-label text-[10px] text-neutral-500 uppercase tracking-tighter mt-1">
          {artistName}
        </p>
      )}
      <span className="font-label text-[10px] text-outline uppercase tracking-tighter">
        {year} {type}
      </span>
    </Link>
  )
}
