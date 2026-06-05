import { usePersistedState } from "#shared/persistence"

export type CompetitorKind = "driver" | "constructor"

export type Competitor = {
  id: string
  name: string
}

type Api = {
  favorite: Competitor | null
  set: (competitor: Competitor) => void
  clear: () => void
  loaded: boolean
}

export function useFavoriteCompetitor(kind: CompetitorKind): Api {
  const [favorite, setFavorite, loaded] = usePersistedState<Competitor | null>(
    `skypit:favorite-${kind}`,
    null,
  )

  return {
    favorite,
    loaded,
    set: setFavorite,
    clear: () => setFavorite(null),
  }
}
