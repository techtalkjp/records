import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useViewTransitionState } from 'react-router'
import { artists, getArtist, getReleasedTracks } from '~/data/tracks'

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
    <div className="flex-[0_0_100%] min-w-0 h-full">
      <Link to={href} viewTransition className="group block h-full">
        <div className="w-full h-full bg-surface-container-low overflow-hidden">
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
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
    setProgress(0)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()

    const autoplay = emblaApi.plugins()?.autoplay as
      | { isPlaying: () => boolean }
      | undefined
    if (!autoplay) return

    const tick = () => setIsPlaying(autoplay.isPlaying())
    emblaApi.on('autoplay:play' as never, tick)
    emblaApi.on('autoplay:stop' as never, tick)
    tick()
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (5000 / 50), 100))
    }, 50)
    return () => clearInterval(interval)
  }, [isPlaying, selectedIndex])

  const current = releases[selectedIndex]!
  const currentArtist = getArtist(current.artist)
  const accentHover = currentArtist?.accentColor === 'amber-accent'
    ? 'group-hover/title:text-amber-accent'
    : 'group-hover/title:text-red-accent'
  const currentHref = `/tracks/${current.artist}/${current.slug}`
  const isCurrentTransitioning = useViewTransitionState(currentHref)

  return (
    <div>
      {/* Hero + Carousel */}
      <section className="mb-24">
        <div className="relative group/carousel h-[calc(100dvh-5rem)]">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
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
            className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10"
          >
            <span className="material-symbols-outlined text-white/70 hover:text-white text-3xl drop-shadow-lg">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10"
          >
            <span className="material-symbols-outlined text-white/70 hover:text-white text-3xl drop-shadow-lg">
              chevron_right
            </span>
          </button>

          {/* Title overlay */}
          <Link
            to={currentHref}
            viewTransition
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent px-6 pt-20 pb-6 group/title"
          >
            <div className="max-w-2xl mx-auto">
              <p className="text-[10px] tracking-widest text-neutral-400 uppercase font-label mb-2">
                TECHTALK RECORDS <span className="ml-2 text-neutral-500">{current.catalogNo}</span>
              </p>
              <h1
                className={`text-4xl md:text-5xl font-black tracking-tighter leading-none font-headline uppercase transition-colors ${accentHover}`}
                style={{
                  viewTransitionName: isCurrentTransitioning
                    ? 'track-title'
                    : 'none',
                }}
              >
                {current.title}
              </h1>
              <p className="text-lg font-bold text-neutral-400 uppercase mt-1">
                {current.artistName}
              </p>
            </div>
          </Link>
        </div>

        {/* Progress indicators */}
        <div className="px-6 max-w-2xl mx-auto mt-4">
          <div className="flex gap-2">
            {releases.map((_, i) => (
              <button
                key={i}
                type="button"
                className="relative h-[2px] w-8 bg-neutral-800 overflow-hidden hover:bg-neutral-700 transition-colors"
                onClick={() => emblaApi?.scrollTo(i)}
              >
                <span
                  className="absolute inset-0 bg-white origin-left transition-transform duration-100 ease-linear"
                  style={{
                    transform: `scaleX(${i === selectedIndex ? progress / 100 : i < selectedIndex ? 1 : 0})`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="px-6 max-w-2xl mx-auto mb-24">
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
      <section className="px-6 max-w-2xl mx-auto mb-24 flex justify-between border-t border-neutral-900 pt-8">
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
