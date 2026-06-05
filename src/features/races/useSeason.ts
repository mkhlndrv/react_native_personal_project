import { usePersistedState } from "#shared/persistence"

const STORAGE_KEY = "skypit:season"

const SEASONS = [2024, 2025, 2026] as const

type Api = {
  season: number
  setSeason: (next: number) => void
  seasons: readonly number[]
}

export function useSeason(): Api {
  const [season, setSeason] = usePersistedState<number>(STORAGE_KEY, 2026)

  return { season, setSeason, seasons: SEASONS }
}
