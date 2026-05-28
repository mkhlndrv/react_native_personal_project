import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { useFavoriteRaces } from "#shared/storage"

import RaceRow from "./RaceRow"
import { type Race } from "./types"

type Status = "loading" | "ready" | "error" | "empty"

type ApiResponse = {
  MRData: { RaceTable: { Races: Race[] } }
}

const SEASON = 2026

const Calendar: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([])
  const [status, setStatus] = useState<Status>("loading")
  const { isFavorite, toggle } = useFavoriteRaces()

  useEffect(() => {
    let cancelled = false
    setStatus("loading")

    fetch(`https://api.jolpi.ca/ergast/f1/${SEASON}.json`)
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
  }, [])

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.brand} />
      </View>
    )
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Typography variant="muted">
          Couldn&apos;t load the calendar. Check your connection.
        </Typography>
      </View>
    )
  }

  if (status === "empty") {
    return (
      <View style={styles.center}>
        <Typography variant="muted">No races yet for this season.</Typography>
      </View>
    )
  }

  const today = new Date()
  const nextRound = races.find((r) => new Date(r.date) >= today)?.round
  const pinned = races.filter((r) => isFavorite(r.round))

  const renderRow = (race: Race): React.ReactElement => (
    <RaceRow
      race={race}
      isNext={race.round === nextRound}
      isStarred={isFavorite(race.round)}
      onToggleStar={() => toggle(race.round)}
    />
  )

  return (
    <FlatList
      style={styles.list}
      data={races}
      keyExtractor={(race) => race.round}
      renderItem={({ item }) => renderRow(item)}
      ListHeaderComponent={
        pinned.length > 0 ? (
          <View style={styles.pinned}>
            <View style={styles.pinnedHeader}>
              <Typography variant="label">Pinned</Typography>
            </View>
            {pinned.map((race) => (
              <View key={`pinned-${race.round}`}>{renderRow(race)}</View>
            ))}
            <View style={styles.pinnedFooter}>
              <Typography variant="label">All races</Typography>
            </View>
          </View>
        ) : null
      }
    />
  )
}

export default Calendar

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.inside,
    backgroundColor: colors.background,
  },
  pinned: {
    backgroundColor: colors.background,
  },
  pinnedHeader: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  pinnedFooter: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    marginTop: spacing.md,
  },
})
