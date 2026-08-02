import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { usePlayer } from './player-context'
import type { Track } from '~/data/tracks'

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface LyricLine {
  start: number
  end: number
  text: string
}

function SyncedLyrics({
  track,
  currentTime,
  accent,
  onSeek,
}: {
  track: Track
  currentTime: number
  accent: string
  onSeek: (time: number) => void
}) {
  const [lines, setLines] = useState<LyricLine[] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackKey = `${track.artist}/${track.slug}`

  useEffect(() => {
    let cancelled = false
    setLines(null)
    fetch(`/lyrics/${track.artist}/${track.slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) setLines(d?.lines ?? [])
      })
      .catch(() => {
        if (!cancelled) setLines([])
      })
    return () => {
      cancelled = true
    }
  }, [track.artist, track.slug])

  const activeIndex = useMemo(() => {
    if (!lines) return -1
    let idx = -1
    for (let i = 0; i < lines.length; i++) {
      if (currentTime >= lines[i]!.start) idx = i
      else break
    }
    return idx
  }, [lines, currentTime])

  // アクティブ行を追従スクロール（コンテナ内のみ、ページは動かさない）
  useEffect(() => {
    const container = containerRef.current
    if (!container || activeIndex < 0) return
    const el = container.querySelector<HTMLElement>(
      `[data-line="${activeIndex}"]`,
    )
    if (!el) return
    // 行の頭が必ず見えるように: 短い行は中央寄せ、長い行は上から48pxに固定
    const offset = Math.max(
      48,
      (container.clientHeight - el.clientHeight) / 2,
    )
    container.scrollTo({
      top: el.offsetTop - offset,
      behavior: 'smooth',
    })
  }, [activeIndex])

  if (lines === null) {
    return (
      <div className="h-64 flex items-center justify-center text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
        Loading lyrics...
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
        No synced lyrics
      </div>
    )
  }

  return (
    <div
      key={trackKey}
      ref={containerRef}
      className="h-72 overflow-y-auto px-4 py-8 scrollbar-none [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="space-y-3">
        {lines.map((line, i) => (
          <button
            key={i}
            type="button"
            data-line={i}
            onClick={() => onSeek(line.start + 0.05)}
            className={`block w-full text-left font-mono text-sm leading-relaxed whitespace-pre-line transition-colors duration-300 ${
              i === activeIndex
                ? `text-${accent} font-bold`
                : i < activeIndex
                  ? 'text-neutral-500 hover:text-neutral-300'
                  : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {line.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seekTo,
    playNext,
    playPrev,
    accentColor: accent,
  } = usePlayer()
  const [expanded, setExpanded] = useState(false)

  if (!currentTrack) return null

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant shadow-lg hover:scale-105 transition-transform"
      >
        <img
          src={currentTrack.coverImage}
          alt=""
          className="w-7 h-7 rounded-full object-cover"
        />
        {isPlaying ? (
          <span className="flex items-end gap-[2px] h-4 w-4">
            <span className={`w-[3px] rounded-full bg-${accent} animate-eq-1`} />
            <span className={`w-[3px] rounded-full bg-${accent} animate-eq-2`} />
            <span className={`w-[3px] rounded-full bg-${accent} animate-eq-3`} />
          </span>
        ) : (
          <span
            className={`material-symbols-outlined text-lg text-${accent}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl bg-surface-container-high border border-outline-variant shadow-2xl overflow-hidden">
      {/* Cover art background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={currentTrack.coverImage}
          alt=""
          className="w-full h-full object-cover blur-xl scale-125 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
      </div>

      <div className="relative">
      {/* Header: cover + info + close */}
      <div className="flex items-center gap-3 p-3">
        <Link
          to={`/tracks/${currentTrack.artist}/${currentTrack.slug}`}
          viewTransition
          className="flex-shrink-0"
        >
          <img
            src={currentTrack.coverImage}
            alt={currentTrack.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to={`/tracks/${currentTrack.artist}/${currentTrack.slug}`}
            viewTransition
            className="text-sm font-bold text-white truncate leading-tight block hover:underline font-headline"
          >
            {currentTrack.title}
          </Link>
          <Link
            to={`/artists/${currentTrack.artist}`}
            viewTransition
            className="text-[10px] text-neutral-400 truncate leading-tight block hover:underline uppercase"
          >
            {currentTrack.artistName}
          </Link>
          <p className="text-[9px] font-mono text-neutral-600 mt-0.5">
            {currentTrack.catalogNo}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="p-0.5 text-neutral-500 hover:text-white transition-colors flex-shrink-0 self-start"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Synced lyrics */}
      <SyncedLyrics
        track={currentTrack}
        currentTime={currentTime}
        accent={accent}
        onSeek={seekTo}
      />

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pt-2 pb-1">
        <button
          type="button"
          onClick={playPrev}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">
            skip_previous
          </span>
        </button>
        <button
          type="button"
          onClick={togglePlayPause}
          className="text-white hover:scale-110 transition-transform"
        >
          <span
            className={`material-symbols-outlined text-3xl text-${accent}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isPlaying ? 'pause_circle' : 'play_circle'}
          </span>
        </button>
        <button
          type="button"
          onClick={playNext}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">skip_next</span>
        </button>
      </div>

      {/* Seek */}
      <div className="px-3 pb-3">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={currentTime}
          onChange={(e) => seekTo(Number(e.target.value))}
          className={`w-full h-1 rounded-full appearance-none bg-surface-container accent-${accent} cursor-pointer`}
          aria-label="Seek"
        />
        {duration > 0 && (
          <div className="flex justify-between mt-1">
            <span className="text-[9px] font-mono text-neutral-400">
              {formatTime(currentTime)}
            </span>
            <span className="text-[9px] font-mono text-neutral-400">
              {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
