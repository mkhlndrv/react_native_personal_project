import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { useSettings } from "#features/settings"

import RaceRow from "./RaceRow"
import { type Race } from "./types"
import { useFavoriteRaces } from "./useFavoriteRaces"

type Status = "loading" | "ready" | "error" | "empty"

type ApiResponse = {
  MRData: { RaceTable: { Races: Race[] } }
}

const SEASON = 2026

const Calendar: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([])
  const [status, setStatus] = useState<Status>("loading")
  const { isFavorite, toggle } = useFavoriteRaces()
  const { showOnlyStarred, hidePastRaces } = useSettings()

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
  const isPastRace = (race: Race): boolean => new Date(race.date) < today
  const nextRound = races.find((r) => !isPastRace(r))?.round
  const filterPast = (list: Race[]): Race[] =>
    hidePastRaces ? list.filter((r) => !isPastRace(r)) : list
  const pinned = filterPast(races.filter((r) => isFavorite(r.round)))
  const visible = showOnlyStarred ? pinned : filterPast(races)

  const renderRow = (race: Race): React.ReactElement => (
    <RaceRow
      race={race}
      isNext={race.round === nextRound}
      isPast={new Date(race.date) < today}
      isStarred={isFavorite(race.round)}
      onToggleStar={() => toggle(race.round)}
    />
  )

  if (visible.length === 0) {
    return (
      <View style={styles.center}>
        <Typography variant="muted">
          {showOnlyStarred && pinned.length === 0
            ? "No starred races match. Tap a star on any race to pin it."
            : "No races match your current filters."}
        </Typography>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.list}
      data={visible}
      keyExtractor={(race) => race.round}
      renderItem={({ item }) => renderRow(item)}
      ListHeaderComponent={
        !showOnlyStarred && pinned.length > 0 ? (
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
