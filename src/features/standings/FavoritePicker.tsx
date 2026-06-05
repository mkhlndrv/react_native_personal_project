import Ionicons from "@expo/vector-icons/Ionicons"
import { router, Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { useSeason } from "#features/races"
import {
  type Competitor,
  type CompetitorKind,
  useFavoriteCompetitor,
} from "#features/settings"

type Status = "loading" | "ready" | "error"

type DriverRoster = {
  MRData: {
    DriverTable: {
      Drivers: Array<{
        driverId: string
        givenName: string
        familyName: string
      }>
    }
  }
}

type ConstructorRoster = {
  MRData: {
    ConstructorTable: {
      Constructors: Array<{ constructorId: string; name: string }>
    }
  }
}

const titles: Record<CompetitorKind, string> = {
  driver: "Favourite driver",
  constructor: "Favourite constructor",
}

const FavoritePicker: React.FC = () => {
  const { kind } = useLocalSearchParams<{ kind: CompetitorKind }>()
  const { season } = useSeason()
  const { favorite, set, clear } = useFavoriteCompetitor(kind)
  const [options, setOptions] = useState<Competitor[]>([])
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    let cancelled = false
    setStatus("loading")

    const path = kind === "driver" ? "drivers" : "constructors"
    fetch(`https://api.jolpi.ca/ergast/f1/${season}/${path}.json`)
      .then((r) => r.json())
      .then((raw: DriverRoster | ConstructorRoster) => {
        if (cancelled) return
        const list =
          kind === "driver"
            ? (raw as DriverRoster).MRData.DriverTable.Drivers.map((d) => ({
                id: d.driverId,
                name: `${d.givenName} ${d.familyName}`,
              }))
            : (
                raw as ConstructorRoster
              ).MRData.ConstructorTable.Constructors.map((c) => ({
                id: c.constructorId,
                name: c.name,
              }))
        setOptions(list)
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [kind, season])

  const choose = (competitor: Competitor): void => {
    set(competitor)
    router.back()
  }

  const chooseNone = (): void => {
    clear()
    router.back()
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: titles[kind] }} />

      {status === "loading" ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : status === "error" ? (
        <View style={styles.center}>
          <Typography variant="muted">
            Couldn&apos;t load the {season} grid. Check your connection.
          </Typography>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={options}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Pressable
              style={styles.row}
              onPress={chooseNone}
              accessibilityState={{ selected: favorite === null }}
            >
              <Typography variant="large">None</Typography>
              {favorite === null ? (
                <Ionicons name="checkmark" size={20} color={colors.brand} />
              ) : null}
            </Pressable>
          }
          renderItem={({ item }) => {
            const selected = favorite?.id === item.id
            return (
              <Pressable
                style={styles.row}
                onPress={() => choose(item)}
                accessibilityState={{ selected }}
              >
                <Typography variant="large">{item.name}</Typography>
                {selected ? (
                  <Ionicons name="checkmark" size={20} color={colors.brand} />
                ) : null}
              </Pressable>
            )
          }}
        />
      )}
    </View>
  )
}

export default FavoritePicker

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
})
