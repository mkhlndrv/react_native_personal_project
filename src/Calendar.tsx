import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native"

import RaceRow, { type Race } from "./RaceRow"

type Status = "loading" | "ready" | "error" | "empty"

type ApiResponse = {
  MRData: { RaceTable: { Races: Race[] } }
}

type Props = {
  season: number
}

const Calendar: React.FC<Props> = ({ season }) => {
  const [races, setRaces] = useState<Race[]>([])
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    let cancelled = false
    setStatus("loading")

    fetch(`https://api.jolpi.ca/ergast/f1/${season}.json`)
      .then((r) => r.json())
      .then((raw: ApiResponse) => {
        if (cancelled) return
        const list = raw.MRData.RaceTable.Races
        setRaces(list)
        setStatus(list.length ? "ready" : "empty")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [season])

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    )
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>
          Couldn&apos;t load the calendar. Check your connection.
        </Text>
      </View>
    )
  }

  if (status === "empty") {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>No races yet for this season.</Text>
      </View>
    )
  }

  const today = new Date()
  const nextRound = races.find((r) => new Date(r.date) >= today)?.round

  return (
    <FlatList
      data={races}
      keyExtractor={(race) => race.round}
      renderItem={({ item }) => (
        <RaceRow race={item} isNext={item.round === nextRound} />
      )}
    />
  )
}

export default Calendar

const styles = StyleSheet.create({
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
})
