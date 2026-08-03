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
import { getAlbumTracks, getReleasedAlbums } from '~/data/albums'

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
}

export type RepeatMode = 'off' | 'all' | 'one'

interface PlayerContextValue extends PlayerState {
  playlist: Track[]
  play: (track: Track) => void
  playQueue: (tracks: Track[], startIndex?: number) => void
  /** playQueue が呼ばれるたびに増える。プレイヤーUIの自動展開トリガー */
  expandSignal: number
  repeatMode: RepeatMode
  cycleRepeatMode: () => void
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
  // 既定の再生順はアルバムの曲順。allTracks はカタログ順（＝リリース順）なので、
  // 先行シングルが収録位置とずれる（例: セカンドバースがアンプラグドより前に来る）
  const defaultPlaylist = useMemo(() => {
    const albumOrder = getReleasedAlbums().flatMap(getAlbumTracks)
    const rest = allTracks.filter(
      (t) => !albumOrder.some((a) => isSameTrack(a, t)),
    )
    return [...albumOrder, ...rest].filter((t) => t.audioUrl)
  }, [])
  const [queue, setQueue] = useState<Track[] | null>(null)
  const [expandSignal, setExpandSignal] = useState(0)
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off')
  const repeatModeRef = useRef<RepeatMode>('off')
  repeatModeRef.current = repeatMode
  const playlist = queue ?? defaultPlaylist

  const cycleRepeatMode = useCallback(() => {
    setRepeatMode((m) => (m === 'off' ? 'all' : m === 'all' ? 'one' : 'off'))
  }, [])

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
      setQueue(null)
      audio.src = track.audioUrl
      safePlay(audio)
      setState((s) => ({ ...s, currentTrack: track, isPlaying: true, currentTime: 0, duration: 0 }))
    },
    [state.currentTrack],
  )

  const playQueue = useCallback(
    (tracks: Track[], startIndex = 0) => {
      const playable = tracks.filter((t) => t.audioUrl)
      if (playable.length === 0) return
      setQueue(playable)
      setExpandSignal((n) => n + 1)
      setRepeatMode('all')
      const start = playable[Math.min(startIndex, playable.length - 1)]!
      const audio = audioRef.current
      if (!audio || !start.audioUrl) return
      audio.src = start.audioUrl
      safePlay(audio)
      setState((s) => ({ ...s, currentTrack: start, isPlaying: true, currentTime: 0, duration: 0 }))
    },
    [],
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

    // 歌詞同期のため再生中は rAF で細かく追従する。
    // timeupdate は 250ms 程度でしか発火せず、歌詞が体感で遅れる。
    let raf = 0
    let lastPushed = -1
    const pushTime = () => {
      const t = audio.currentTime
      if (Math.abs(t - lastPushed) >= 0.1) {
        lastPushed = t
        setState((s) => ({ ...s, currentTime: t }))
      }
    }
    const tick = () => {
      pushTime()
      raf = requestAnimationFrame(tick)
    }
    const startTicking = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const stopTicking = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
    // 一時停止中のシークや読み込み直後にも追従させる
    const onTimeUpdate = pushTime
    const onSeeked = pushTime
    const onLoadedMetadata = () =>
      setState((s) => ({ ...s, duration: audio.duration }))
    const onPlay = () => {
      startTicking()
      setState((s) => ({ ...s, isPlaying: true }))
    }
    const onPause = () => {
      stopTicking()
      setState((s) => ({ ...s, isPlaying: false }))
    }
    const onEnded = () => {
      const mode = repeatModeRef.current
      if (mode === 'one') {
        audio.currentTime = 0
        safePlay(audio)
        return
      }
      setState((s) => {
        const idx = s.currentTrack
          ? playlist.findIndex((t) => isSameTrack(t, s.currentTrack!))
          : -1
        // off: 最後の曲で止まる / all: 先頭に戻ってループ
        if (mode === 'off' && idx >= playlist.length - 1) {
          return { ...s, isPlaying: false }
        }
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
    audio.addEventListener('seeked', onSeeked)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    if (!audio.paused) startTicking()

    return () => {
      stopTicking()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('seeked', onSeeked)
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
        playQueue,
        expandSignal,
        repeatMode,
        cycleRepeatMode,
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
