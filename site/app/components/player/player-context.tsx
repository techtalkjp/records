import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { type Track, allTracks, getArtist, isSameTrack } from '~/data/tracks'

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
}

interface PlayerContextValue extends PlayerState {
  playlist: Track[]
  play: (track: Track) => void
  togglePlayPause: () => void
  seekTo: (time: number) => void
  playNext: () => void
  playPrev: () => void
  isCurrentTrack: (track: Track) => boolean
  accentColor: string
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}

function safePlay(audio: HTMLAudioElement) {
  audio.play().catch(() => {})
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playlist = useMemo(() => allTracks.filter((t) => t.audioUrl), [])

  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  })

  const currentIndex = state.currentTrack
    ? playlist.findIndex((t) => isSameTrack(t, state.currentTrack!))
    : -1

  const isCurrentTrackFn = useCallback(
    (track: Track) =>
      state.currentTrack != null && isSameTrack(state.currentTrack, track),
    [state.currentTrack],
  )

  const accentColor = state.currentTrack
    ? (getArtist(state.currentTrack.artist)?.accentColor ?? 'amber-accent')
    : 'amber-accent'

  const play = useCallback(
    (track: Track) => {
      const audio = audioRef.current
      if (!audio || !track.audioUrl) return
      if (state.currentTrack && isSameTrack(state.currentTrack, track)) {
        safePlay(audio)
        return
      }
      audio.src = track.audioUrl
      safePlay(audio)
      setState((s) => ({ ...s, currentTrack: track, isPlaying: true, currentTime: 0, duration: 0 }))
    },
    [state.currentTrack],
  )

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !state.currentTrack) return
    if (audio.paused) {
      safePlay(audio)
    } else {
      audio.pause()
    }
  }, [state.currentTrack])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
  }, [])

  const playNext = useCallback(() => {
    if (currentIndex < 0) return
    const next = playlist[(currentIndex + 1) % playlist.length]
    if (next) play(next)
  }, [currentIndex, playlist, play])

  const playPrev = useCallback(() => {
    if (currentIndex < 0) return
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    const prev = playlist[(currentIndex - 1 + playlist.length) % playlist.length]
    if (prev) play(prev)
  }, [currentIndex, playlist, play])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let lastSecond = -1
    const onTimeUpdate = () => {
      const sec = Math.floor(audio.currentTime)
      if (sec !== lastSecond) {
        lastSecond = sec
        setState((s) => ({ ...s, currentTime: audio.currentTime }))
      }
    }
    const onLoadedMetadata = () =>
      setState((s) => ({ ...s, duration: audio.duration }))
    const onPlay = () => setState((s) => ({ ...s, isPlaying: true }))
    const onPause = () => setState((s) => ({ ...s, isPlaying: false }))
    const onEnded = () => {
      setState((s) => {
        const idx = s.currentTrack
          ? playlist.findIndex((t) => isSameTrack(t, s.currentTrack!))
          : -1
        const next = playlist[(idx + 1) % playlist.length]
        if (next?.audioUrl) {
          audio.src = next.audioUrl
          safePlay(audio)
          return { ...s, currentTrack: next, currentTime: 0, duration: 0, isPlaying: true }
        }
        return { ...s, isPlaying: false }
      })
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [playlist])

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playlist,
        play,
        togglePlayPause,
        seekTo,
        playNext,
        playPrev,
        isCurrentTrack: isCurrentTrackFn,
        accentColor,
      }}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: audio player for music tracks */}
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  )
}
