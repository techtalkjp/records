import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useViewTransitionState } from 'react-router'
import { artists, getReleasedTracks } from '~/data/tracks'

function CarouselSlide({
  track,
  isSelected,
}: {
  track: (typeof import('~/data/tracks'))['allTracks'][number]
  isSelected: boolean
}) {
  const href = `/tracks/${track.artist}/${track.slug}`
  const isTransitioning = useViewTransitionState(href)

  return (
    <div className="flex-[0_0_100%] min-w-0">
      <Link to={href} viewTransition className="group block">
        <div className="aspect-square md:aspect-video w-full bg-surface-container-low mb-6 overflow-hidden">
          <picture>
            {track.coverImageWide && (
              <source media="(min-width: 768px)" srcSet={track.coverImageWide} />
            )}
            <img
              src={track.coverImage}
              alt={track.title}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-300"
              style={{
                viewTransitionName:
                  isTransitioning && isSelected ? 'cover-art' : 'none',
              }}
            />
          </picture>
        </div>
      </Link>
    </div>
  )
}

function ArtistLink({ artist }: { artist: (typeof artists)[number] }) {
  const href = `/artists/${artist.slug}`
  const isTransitioning = useViewTransitionState(href)

  return (
    <Link
      to={href}
      viewTransition
      className="relative overflow-hidden group"
    >
      <span
        className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-headline block leading-[0.85] text-white"
        style={{
          viewTransitionName: isTransitioning ? 'artist-name' : 'none',
        }}
      >
        {artist.name}
      </span>
      <div className="h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 mt-2" />
    </Link>
  )
}

export default function Index() {
  const releases = getReleasedTracks()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const current = releases[selectedIndex]!
  const currentHref = `/tracks/${current.artist}/${current.slug}`
  const isCurrentTransitioning = useViewTransitionState(currentHref)

  return (
    <div className="px-6 max-w-2xl mx-auto">
      {/* Hero */}
      <header className="mb-20 mt-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none font-headline mb-2 uppercase">
          TECHTALK RECORDS
        </h1>
        <p className="text-[10px] tracking-widest text-neutral-400 uppercase font-label">
          AIエージェントが紡ぐ、ターミナルからのヒップホップ
        </p>
      </header>

      {/* Releases Carousel */}
      <section className="mb-24">
        <h2 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-6 uppercase">
          RELEASES
        </h2>

        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {releases.map((track, i) => (
                <CarouselSlide
                  key={track.slug}
                  track={track}
                  isSelected={i === selectedIndex}
                />
              ))}
            </div>
          </div>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="absolute left-0 top-0 bottom-6 w-16 flex items-center justify-start pl-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined text-white/70 hover:text-white text-3xl drop-shadow-lg">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className="absolute right-0 top-0 bottom-6 w-16 flex items-center justify-end pr-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined text-white/70 hover:text-white text-3xl drop-shadow-lg">
              chevron_right
            </span>
          </button>
        </div>

        {/* Track info + dots */}
        <Link
          to={currentHref}
          viewTransition
          className="block group"
        >
          <div className="space-y-1">
            <h3
              className="text-3xl font-black tracking-tighter leading-tight uppercase font-headline group-hover:text-amber-accent transition-colors"
              style={{
                viewTransitionName: isCurrentTransitioning
                  ? 'track-title'
                  : 'none',
              }}
            >
              {current.title}
            </h3>
            <p className="text-lg font-bold text-neutral-400 uppercase">
              {current.artistName}
            </p>
          </div>
        </Link>

        {/* Progress indicators */}
        <div className="flex gap-2 mt-4">
          {releases.map((_, i) => (
            <button
              key={i}
              type="button"
              className="relative h-[2px] w-8 bg-neutral-800 overflow-hidden hover:bg-neutral-700 transition-colors"
              onClick={() => emblaApi?.scrollTo(i)}
            >
              <span
                className={`absolute inset-0 bg-white origin-left ${
                  i === selectedIndex ? 'animate-progress' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Artists */}
      <section className="mb-24">
        <h2 className="text-[10px] tracking-[0.3em] font-label text-neutral-500 mb-8 uppercase">
          ARTISTS
        </h2>
        <div className="flex flex-col gap-8">
          {artists.map((artist) => (
            <ArtistLink key={artist.slug} artist={artist} />
          ))}
        </div>
      </section>

      {/* Catalog Metadata */}
      <section className="mb-24 flex justify-between border-t border-neutral-900 pt-8">
        <div className="text-[10px] font-mono text-neutral-600 leading-relaxed">
          LOC: TOKYO / VIRTUAL
          <br />
          EST: 2026
          <br />
          TYPE: INDEPENDENT AI LABEL
        </div>
        <div className="text-[10px] font-mono text-neutral-600 text-right leading-relaxed">
          TTR-001 — TTR-004
          <br />
          AVAILABLE WORLDWIDE
          <br />
          TERMINAL CORE SOUNDS
        </div>
      </section>
    </div>
  )
}
