import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

import { type Race } from "#features/races"

const STORAGE_KEY = "skypit:reminder-ids"

type ReminderMap = Record<string, string>

const readMap = async (): Promise<ReminderMap> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY)
  return raw ? (JSON.parse(raw) as ReminderMap) : {}
}

const writeMap = async (map: ReminderMap): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export const isReminderSet = async (round: string): Promise<boolean> => {
  const map = await readMap()
  return Boolean(map[round])
}

export const scheduleRaceReminder = async (
  race: Race,
  leadMinutes: number,
): Promise<boolean> => {
  if (Platform.OS === "web") return false

  const permission = await Notifications.requestPermissionsAsync()
  if (!permission.granted) return false

  const iso = race.time ? `${race.date}T${race.time}` : `${race.date}T00:00:00Z`
  const fireAt = new Date(iso)
  fireAt.setMinutes(fireAt.getMinutes() - leadMinutes)

  if (fireAt.getTime() <= Date.now()) return false

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: race.raceName,
      body: `Lights out in ${leadMinutes} minutes — ${race.Circuit.circuitName}.`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: fireAt,
    },
  })

  const map = await readMap()
  map[race.round] = id
  await writeMap(map)
  return true
}

export const cancelRaceReminder = async (round: string): Promise<void> => {
  const map = await readMap()
  const id = map[round]
  if (!id) return
  await Notifications.cancelScheduledNotificationAsync(id)
  const { [round]: _removed, ...rest } = map
  await writeMap(rest)
}
