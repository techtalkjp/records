import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function readLyrics(lyricsDir: string): string {
  // lyricsDir is relative to repo root; site/ is one level down
  const filePath = join(process.cwd(), '..', lyricsDir, 'source', 'lyrics.txt')
  try {
    return readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}
