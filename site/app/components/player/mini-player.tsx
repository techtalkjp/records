import { useState } from 'react'
import { Link } from 'react-router'
import { usePlayer } from './player-context'

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
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

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

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
    <div className="fixed top-4 right-4 z-50 w-72 rounded-2xl bg-surface-container-high border border-outline-variant shadow-2xl overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        <img
          src={currentTrack.coverImage}
          alt={currentTrack.title}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <Link
            to={`/tracks/${currentTrack.artist}/${currentTrack.slug}`}
            viewTransition
            className="text-xs font-bold text-white truncate leading-tight block hover:underline"
          >
            {currentTrack.title}
          </Link>
          <Link
            to={`/artists/${currentTrack.artist}`}
            viewTransition
            className="text-[10px] text-neutral-400 truncate leading-tight block hover:underline"
          >
            {currentTrack.artistName}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="p-0.5 text-neutral-500 hover:text-white transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 pb-2">
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
            className={`material-symbols-outlined text-2xl text-${accent}`}
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
            <span className="text-[9px] font-mono text-neutral-500">
              {formatTime(currentTime)}
            </span>
            <span className="text-[9px] font-mono text-neutral-500">
              {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
