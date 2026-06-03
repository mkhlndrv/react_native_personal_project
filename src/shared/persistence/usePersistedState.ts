import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

const listeners = new Map<string, Set<(value: unknown) => void>>()

const subscribe = (
  key: string,
  listener: (value: unknown) => void,
): (() => void) => {
  let set = listeners.get(key)
  if (!set) {
    set = new Set()
    listeners.set(key, set)
  }
  set.add(listener)
  return () => {
    set.delete(listener)
  }
}

const notify = (key: string, value: unknown): void => {
  listeners.get(key)?.forEach((fn) => fn(value))
}

export function usePersistedState<T>(
  key: string,
  initial: T,
): [T, (next: T) => void, boolean] {
  const [value, setValue] = useState<T>(initial)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    void (async () => {
      const raw = await AsyncStorage.getItem(key)
      if (raw !== null) setValue(JSON.parse(raw) as T)
      setLoaded(true)
    })()

    return subscribe(key, (next) => setValue(next as T))
  }, [key])

  const update = (next: T): void => {
    setValue(next)
    notify(key, next)
    void AsyncStorage.setItem(key, JSON.stringify(next))
  }

  return [value, update, loaded]
}
