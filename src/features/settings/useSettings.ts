import { usePersistedState } from "#shared/persistence"

const STORAGE_KEYS = {
  reminderLeadMinutes: "skypit:reminder-lead-minutes",
  notificationsEnabled: "skypit:notifications-enabled",
  showOnlyStarred: "skypit:show-only-starred",
  hidePastRaces: "skypit:hide-past-races",
} as const

export const REMINDER_LEAD_MIN = 5
export const REMINDER_LEAD_MAX = 24 * 60

type Api = {
  reminderLeadMinutes: number
  setReminderLeadMinutes: (next: number) => void
  notificationsEnabled: boolean
  setNotificationsEnabled: (next: boolean) => void
  showOnlyStarred: boolean
  setShowOnlyStarred: (next: boolean) => void
  hidePastRaces: boolean
  setHidePastRaces: (next: boolean) => void
}

export function useSettings(): Api {
  const [reminderLeadMinutes, setReminderLeadMinutes] =
    usePersistedState<number>(STORAGE_KEYS.reminderLeadMinutes, 60)
  const [notificationsEnabled, setNotificationsEnabled] =
    usePersistedState<boolean>(STORAGE_KEYS.notificationsEnabled, true)
  const [showOnlyStarred, setShowOnlyStarred] = usePersistedState<boolean>(
    STORAGE_KEYS.showOnlyStarred,
    false,
  )
  const [hidePastRaces, setHidePastRaces] = usePersistedState<boolean>(
    STORAGE_KEYS.hidePastRaces,
    false,
  )

  return {
    reminderLeadMinutes,
    setReminderLeadMinutes,
    notificationsEnabled,
    setNotificationsEnabled,
    showOnlyStarred,
    setShowOnlyStarred,
    hidePastRaces,
    setHidePastRaces,
  }
}
