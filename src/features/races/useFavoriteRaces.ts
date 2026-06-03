import { usePersistedState } from "#shared/persistence"

const STORAGE_KEY = "skypit:favorite-races"

type Api = {
  favorites: string[]
  isFavorite: (round: string) => boolean
  toggle: (round: string) => void
  loaded: boolean
}

export function useFavoriteRaces(): Api {
  const [favorites, setFavorites, loaded] = usePersistedState<string[]>(
    STORAGE_KEY,
    [],
  )

  return {
    favorites,
    loaded,
    isFavorite: (round) => favorites.includes(round),
    toggle: (round) =>
      setFavorites(
        favorites.includes(round)
          ? favorites.filter((r) => r !== round)
          : [...favorites, round],
      ),
  }
}
