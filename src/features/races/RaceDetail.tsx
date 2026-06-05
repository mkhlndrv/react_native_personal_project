import Ionicons from "@expo/vector-icons/Ionicons"
import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"

import Card from "#design/elements/Card"
import Pill from "#design/elements/Pill"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import CountryChip from "#design/patterns/CountryChip"
import { useFavoriteCompetitor, useSettings } from "#features/settings"

import ResultRow from "./ResultRow"
import { type Race, type ResultEntry, type Session } from "./types"
import { useFavoriteRaces } from "./useFavoriteRaces"
import { useRaceReminder } from "./useRaceReminder"
import { useSeason } from "./useSeason"

type ApiResponse = {
  MRData: { RaceTable: { Races: Race[] } }
}

type RawResult = {
  position: string
  points: string
  status: string
  Driver: { driverId: string; givenName: string; familyName: string }
  Constructor: { constructorId: string; name: string }
  Time?: { time: string }
}

type ResultsResponse = {
  MRData: { RaceTable: { Races: Array<{ Results: RawResult[] }> } }
}

type Status = "loading" | "ready" | "error" | "missing"

type SessionRow = {
  label: string
  session: Session
  when: number
}

const sessionWhen = (session: Session): number => {
  const iso = session.time ? `${session.date}T${session.time}` : session.date
  const ms = new Date(iso).getTime()
  return Number.isNaN(ms) ? Number.POSITIVE_INFINITY : ms
}

const formatDay = (session: Session): string => {
  const iso = session.time ? `${session.date}T${session.time}` : session.date
  return new Date(iso)
    .toLocaleDateString("en-GB", { weekday: "short" })
    .toUpperCase()
}

const formatTime = (session: Session): string => {
  if (!session.time) return "—"
  const iso = `${session.date}T${session.time}`
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

const formatLeadTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`
  if (minutes % 60 === 0) {
    const hours = minutes / 60
    return hours === 1 ? "1 hour" : `${hours} hours`
  }
  return `${minutes} min`
}

const buildSessions = (race: Race): SessionRow[] => {
  const out: SessionRow[] = []
  const push = (label: string, session?: Session): void => {
    if (session) out.push({ label, session, when: sessionWhen(session) })
  }
  push("Practice 1", race.FirstPractice)
  push("Practice 2", race.SecondPractice)
  push("Practice 3", race.ThirdPractice)
  push("Qualifying", race.Qualifying)
  push("Sprint", race.Sprint)
  out.push({
    label: "Race",
    session: { date: race.date, time: race.time },
    when: sessionWhen({ date: race.date, time: race.time }),
  })
  return out
}

const outcome = (r: RawResult): string => {
  if (r.Time) return r.Time.time
  if (r.status === "Did not start") return "DNS"
  if (r.status.startsWith("+")) return r.status
  return "DNF"
}

const toResult = (r: RawResult): ResultEntry => ({
  position: r.position,
  driverId: r.Driver.driverId,
  driver: `${r.Driver.givenName} ${r.Driver.familyName}`,
  constructorId: r.Constructor.constructorId,
  team: r.Constructor.name,
  outcome: outcome(r),
  points: r.points,
})

const RaceDetail: React.FC = () => {
  const { round } = useLocalSearchParams<{ round: string }>()
  const [race, setRace] = useState<Race | null>(null)
  const [results, setResults] = useState<ResultEntry[]>([])
  const [status, setStatus] = useState<Status>("loading")
  const { isFavorite, toggle } = useFavoriteRaces()
  const { reminderLeadMinutes } = useSettings()
  const { season } = useSeason()
  const { favorite: favoriteDriver } = useFavoriteCompetitor("driver")
  const { favorite: favoriteConstructor } = useFavoriteCompetitor("constructor")
  const reminder = useRaceReminder(race)

  useEffect(() => {
    if (!round) return
    let cancelled = false
    setStatus("loading")

    fetch(`https://api.jolpi.ca/ergast/f1/${season}/${round}.json`)
      .then((r) => r.json())
      .then((raw: ApiResponse) => {
        if (cancelled) return
        const found = raw.MRData.RaceTable.Races[0]
        if (!found) {
          setStatus("missing")
          return
        }
        setRace(found)
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [round, season])

  useEffect(() => {
    if (!round) return
    let cancelled = false

    fetch(`https://api.jolpi.ca/ergast/f1/${season}/${round}/results.json`)
      .then((r) => r.json())
      .then((raw: ResultsResponse) => {
        if (cancelled) return
        const races = raw.MRData.RaceTable.Races
        setResults(races.length ? races[0].Results.map(toResult) : [])
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [round, season])

  if (status === "loading") {
    return (
      <>
        <Stack.Screen options={{ title: `Round ${round ?? ""}` }} />
        <View style={styles.center}>
          <ActivityIndicator color={colors.brand} />
        </View>
      </>
    )
  }

  if (status === "error" || status === "missing" || !race) {
    return (
      <>
        <Stack.Screen options={{ title: `Round ${round ?? ""}` }} />
        <View style={styles.center}>
          <Typography variant="muted">
            {status === "missing"
              ? "No race found for that round."
              : "Couldn't load the race. Check your connection."}
          </Typography>
        </View>
      </>
    )
  }

  const sessions = buildSessions(race)
  const now = Date.now()
  const nextWhen = sessions.find((s) => s.when >= now)?.when

  return (
    <>
      <Stack.Screen options={{ title: race.raceName }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <CountryChip country={race.Circuit.Location.country} size="lg" />
          <View style={styles.heading}>
            <Typography variant="title">{race.raceName}</Typography>
            <Pressable
              onPress={() => toggle(race.round)}
              hitSlop={10}
              accessibilityLabel="Toggle favourite"
            >
              <Ionicons
                name={isFavorite(race.round) ? "star" : "star-outline"}
                size={26}
                color={isFavorite(race.round) ? colors.brand : colors.muted}
              />
            </Pressable>
          </View>
          <Typography variant="muted">
            {race.Circuit.circuitName}
            {race.Circuit.Location.locality
              ? ` · ${race.Circuit.Location.locality}`
              : ""}
          </Typography>
        </View>

        <Card>
          {sessions.map(({ label, session, when }) => {
            const isNext = when === nextWhen
            return (
              <View
                key={label}
                style={[styles.sessionRow, isNext && styles.sessionRowNext]}
              >
                <Typography variant="mono">{formatDay(session)}</Typography>
                <View style={styles.sessionTime}>
                  <Typography variant="mono">{formatTime(session)}</Typography>
                </View>
                <Typography variant="normal">{label}</Typography>
                {isNext ? (
                  <View style={styles.pillSlot}>
                    <Pill>NEXT</Pill>
                  </View>
                ) : null}
              </View>
            )
          })}
        </Card>

        {results.length > 0 ? (
          <View style={styles.results}>
            <View style={styles.resultsHeading}>
              <Typography variant="label">Result</Typography>
            </View>
            {results.map((entry) => (
              <ResultRow
                key={entry.position}
                entry={entry}
                highlight={
                  entry.driverId === favoriteDriver?.id ||
                  entry.constructorId === favoriteConstructor?.id
                }
              />
            ))}
          </View>
        ) : null}

        {reminder.status === "ready" ? (
          <Pressable
            onPress={() => {
              void reminder.toggle()
            }}
            style={[
              styles.reminder,
              reminder.isSet ? styles.reminderActive : null,
            ]}
            accessibilityLabel="Toggle race reminder"
          >
            <Ionicons
              name={reminder.isSet ? "notifications" : "notifications-outline"}
              size={18}
              color={reminder.isSet ? colors.background : colors.body}
            />
            <Typography variant="normal">
              {reminder.isSet
                ? "Reminder set"
                : `Remind me ${formatLeadTime(reminderLeadMinutes)} before`}
            </Typography>
          </Pressable>
        ) : reminder.status === "past" ? (
          <View style={styles.reminderNote}>
            <Typography variant="muted">This race has finished.</Typography>
          </View>
        ) : reminder.status === "disabled" ? (
          <View style={styles.reminderNote}>
            <Typography variant="muted">
              Race reminders are off. Turn them on in Settings.
            </Typography>
          </View>
        ) : reminder.status === "unsupported" ? (
          <View style={styles.reminderNote}>
            <Typography variant="muted">
              Reminders need a phone — they don&apos;t fire on web.
            </Typography>
          </View>
        ) : null}
      </ScrollView>
    </>
  )
}

export default RaceDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.between,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.inside,
  },
  hero: {
    alignItems: "center",
    paddingVertical: spacing.inside,
    gap: spacing.md,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    gap: spacing.xl,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
    paddingLeft: spacing.md,
  },
  sessionRowNext: {
    borderLeftColor: colors.brand,
  },
  sessionTime: {
    width: 56,
  },
  pillSlot: {
    marginLeft: "auto",
  },
  results: {
    marginTop: spacing.between,
  },
  resultsHeading: {
    paddingBottom: spacing.sm,
  },
  reminder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    marginTop: spacing.between,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: shapes.card,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  reminderActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  reminderNote: {
    marginTop: spacing.between,
    alignItems: "center",
  },
})
