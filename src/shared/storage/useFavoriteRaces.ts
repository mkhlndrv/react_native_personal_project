import { STORAGE_KEYS } from "./keys"
import { usePersistedState } from "./usePersistedState"

type Api = {
  favorites: string[]
  isFavorite: (round: string) => boolean
  toggle: (round: string) => void
  loaded: boolean
}

export function useFavoriteRaces(): Api {
  const [favorites, setFavorites, loaded] = usePersistedState<string[]>(
    STORAGE_KEYS.favoriteRaces,
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
