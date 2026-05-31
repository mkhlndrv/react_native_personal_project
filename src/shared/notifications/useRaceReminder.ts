import { useCallback, useEffect, useState } from "react"
import { Platform } from "react-native"

import { type Race } from "#features/races"
import { useSettings } from "#shared/storage"

import {
  cancelRaceReminder,
  isReminderSet,
  scheduleRaceReminder,
} from "./raceReminders"

type Status = "loading" | "ready" | "past" | "disabled" | "unsupported"

type Api = {
  isSet: boolean
  status: Status
  toggle: () => Promise<void>
}

const raceStart = (race: Race): number =>
  new Date(
    race.time ? `${race.date}T${race.time}` : `${race.date}T00:00:00Z`,
  ).getTime()

export function useRaceReminder(race: Race | null): Api {
  const [isSet, setIsSet] = useState(false)
  const [status, setStatus] = useState<Status>("loading")
  const { notificationsEnabled, reminderLeadMinutes } = useSettings()
  const round = race?.round
  const startAt = race ? raceStart(race) : null

  useEffect(() => {
    if (!round || startAt === null) return
    if (startAt <= Date.now()) {
      setStatus("past")
      return
    }
    if (Platform.OS === "web") {
      setStatus("unsupported")
      return
    }
    if (!notificationsEnabled) {
      setStatus("disabled")
      return
    }

    let cancelled = false
    void isReminderSet(round).then((set) => {
      if (cancelled) return
      setIsSet(set)
      setStatus("ready")
    })

    return () => {
      cancelled = true
    }
  }, [round, startAt, notificationsEnabled])

  const toggle = useCallback(async () => {
    if (!race || status !== "ready") return
    if (isSet) {
      await cancelRaceReminder(race.round)
      setIsSet(false)
    } else {
      const ok = await scheduleRaceReminder(race, reminderLeadMinutes)
      if (ok) setIsSet(true)
    }
  }, [race, isSet, status, reminderLeadMinutes])

  return { isSet, status, toggle }
}
