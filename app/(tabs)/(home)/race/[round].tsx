import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

import { flagForCountry } from "../../../../src/lib/flags"

type Session = {
  date: string
  time?: string
}

type Race = {
  season: string
  round: string
  raceName: string
  date: string
  time?: string
  Circuit: {
    circuitName: string
    Location: { country: string; locality: string }
  }
  FirstPractice?: Session
  SecondPractice?: Session
  ThirdPractice?: Session
  Qualifying?: Session
  Sprint?: Session
}

type ApiResponse = {
  MRData: { RaceTable: { Races: Race[] } }
}

type Status = "loading" | "ready" | "error" | "missing"

const formatSession = (session: Session): string => {
  const iso = session.time ? `${session.date}T${session.time}` : session.date
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return session.date
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

const RaceDetail: React.FC = () => {
  const { round } = useLocalSearchParams<{ round: string }>()
  const [race, setRace] = useState<Race | null>(null)
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    if (!round) return
    let cancelled = false
    setStatus("loading")

    fetch(`https://api.jolpi.ca/ergast/f1/2026/${round}.json`)
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
  }, [round])

  if (status === "loading") {
    return (
      <>
        <Stack.Screen options={{ title: `Round ${round ?? ""}` }} />
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      </>
    )
  }

  if (status === "error" || status === "missing" || !race) {
    return (
      <>
        <Stack.Screen options={{ title: `Round ${round ?? ""}` }} />
        <View style={styles.center}>
          <Text style={styles.muted}>
            {status === "missing"
              ? "No race found for that round."
              : "Couldn't load the race. Check your connection."}
          </Text>
        </View>
      </>
    )
  }

  const sessions: Array<{ label: string; session: Session }> = []
  if (race.FirstPractice)
    sessions.push({ label: "Practice 1", session: race.FirstPractice })
  if (race.SecondPractice)
    sessions.push({ label: "Practice 2", session: race.SecondPractice })
  if (race.ThirdPractice)
    sessions.push({ label: "Practice 3", session: race.ThirdPractice })
  if (race.Qualifying)
    sessions.push({ label: "Qualifying", session: race.Qualifying })
  if (race.Sprint) sessions.push({ label: "Sprint", session: race.Sprint })
  sessions.push({
    label: "Race",
    session: { date: race.date, time: race.time },
  })

  return (
    <>
      <Stack.Screen options={{ title: race.raceName }} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.flag}>
            {flagForCountry(race.Circuit.Location.country)}
          </Text>
          <View style={styles.headerText}>
            <Text style={styles.gpName}>{race.raceName}</Text>
            <Text style={styles.circuit}>
              {race.Circuit.circuitName} · {race.Circuit.Location.locality}
            </Text>
          </View>
        </View>

        <View style={styles.sessions}>
          {sessions.map(({ label, session }) => (
            <View key={label} style={styles.sessionRow}>
              <Text style={styles.sessionLabel}>{label}</Text>
              <Text style={styles.sessionTime}>{formatSession(session)}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

export default RaceDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  muted: {
    color: "#666",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  flag: {
    fontSize: 40,
  },
  headerText: {
    flex: 1,
  },
  gpName: {
    fontSize: 18,
    fontWeight: "700",
  },
  circuit: {
    marginTop: 2,
    fontSize: 13,
    color: "#666",
  },
  sessions: {
    paddingVertical: 8,
  },
  sessionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  sessionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  sessionTime: {
    fontSize: 14,
    color: "#555",
  },
})
