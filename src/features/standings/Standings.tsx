import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { SeasonSwitcher, useSeason } from "#features/races"
import { useFavoriteCompetitor } from "#features/settings"

import StandingRow from "./StandingRow"
import { type StandingEntry } from "./types"

type Status = "loading" | "ready" | "error" | "empty"

type DriverStanding = {
  position: string
  points: string
  Driver: { driverId: string; givenName: string; familyName: string }
  Constructors: Array<{ name: string }>
}

type ConstructorStanding = {
  position: string
  points: string
  Constructor: { constructorId: string; name: string; nationality: string }
}

type DriverResponse = {
  MRData: {
    StandingsTable: {
      StandingsLists: Array<{ DriverStandings: DriverStanding[] }>
    }
  }
}

type ConstructorResponse = {
  MRData: {
    StandingsTable: {
      StandingsLists: Array<{ ConstructorStandings: ConstructorStanding[] }>
    }
  }
}

const toDriverEntry = (s: DriverStanding): StandingEntry => ({
  id: s.Driver.driverId,
  position: s.position,
  name: `${s.Driver.givenName} ${s.Driver.familyName}`,
  detail: s.Constructors[s.Constructors.length - 1].name,
  points: s.points,
})

const toConstructorEntry = (s: ConstructorStanding): StandingEntry => ({
  id: s.Constructor.constructorId,
  position: s.position,
  name: s.Constructor.name,
  detail: s.Constructor.nationality,
  points: s.points,
})

const pinFavorite = (
  entries: StandingEntry[],
  favoriteId: string | null,
): StandingEntry[] => {
  const index = favoriteId ? entries.findIndex((e) => e.id === favoriteId) : -1
  if (index < 0) return entries
  return [
    entries[index],
    ...entries.slice(0, index),
    ...entries.slice(index + 1),
  ]
}

const Standings: React.FC = () => {
  const [drivers, setDrivers] = useState<StandingEntry[]>([])
  const [constructors, setConstructors] = useState<StandingEntry[]>([])
  const [status, setStatus] = useState<Status>("loading")
  const [refreshing, setRefreshing] = useState(false)
  const { season } = useSeason()
  const { favorite: favoriteDriver } = useFavoriteCompetitor("driver")
  const { favorite: favoriteConstructor } = useFavoriteCompetitor("constructor")

  const load = async (): Promise<void> => {
    const base = `https://api.jolpi.ca/ergast/f1/${season}`
    const [driverLists, constructorLists] = await Promise.all([
      fetch(`${base}/driverStandings.json`)
        .then((r) => r.json())
        .then(
          (raw: DriverResponse) => raw.MRData.StandingsTable.StandingsLists,
        ),
      fetch(`${base}/constructorStandings.json`)
        .then((r) => r.json())
        .then(
          (raw: ConstructorResponse) =>
            raw.MRData.StandingsTable.StandingsLists,
        ),
    ])

    const d = driverLists.length
      ? driverLists[0].DriverStandings.map(toDriverEntry)
      : []
    const c = constructorLists.length
      ? constructorLists[0].ConstructorStandings.map(toConstructorEntry)
      : []

    setDrivers(d)
    setConstructors(c)
    setStatus(d.length || c.length ? "ready" : "empty")
  }

  useEffect(() => {
    setStatus("loading")
    load().catch(() => setStatus("error"))
  }, [season])

  const onRefresh = (): void => {
    setRefreshing(true)
    load()
      .catch(() => undefined)
      .finally(() => setRefreshing(false))
  }

  const driverFavoriteId = favoriteDriver?.id ?? null
  const constructorFavoriteId = favoriteConstructor?.id ?? null
  const sections = [
    {
      title: "Drivers",
      favoriteId: driverFavoriteId,
      data: pinFavorite(drivers, driverFavoriteId),
    },
    {
      title: "Constructors",
      favoriteId: constructorFavoriteId,
      data: pinFavorite(constructors, constructorFavoriteId),
    },
  ]

  return (
    <View style={styles.screen}>
      <SeasonSwitcher />

      {status === "loading" ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : status === "error" ? (
        <View style={styles.center}>
          <Typography variant="muted">
            Couldn&apos;t load the standings. Check your connection.
          </Typography>
        </View>
      ) : status === "empty" ? (
        <View style={styles.center}>
          <Typography variant="muted">
            No standings yet — the season hasn&apos;t started.
          </Typography>
        </View>
      ) : (
        <SectionList<
          StandingEntry,
          { title: string; favoriteId: string | null }
        >
          style={styles.list}
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item, section }) => (
            <StandingRow
              entry={item}
              highlight={item.id === section.favoriteId}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.header}>
              <Typography variant="label">{section.title}</Typography>
              <Typography variant="label">PTS</Typography>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.muted}
              colors={[colors.brand]}
            />
          }
        />
      )}
    </View>
  )
}

export default Standings

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.inside,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
})
