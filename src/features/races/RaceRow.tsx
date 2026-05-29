import Ionicons from "@expo/vector-icons/Ionicons"
import { Link } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import Pill from "#design/elements/Pill"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import CountryChip from "#design/patterns/CountryChip"

import { type Race } from "./types"

type Props = {
  race: Race
  isNext: boolean
  isPast: boolean
  isStarred: boolean
  onToggleStar: () => void
}

const formatDate = (iso: string): string =>
  new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    .toUpperCase()

const RaceRow: React.FC<Props> = ({
  race,
  isNext,
  isPast,
  isStarred,
  onToggleStar,
}) => {
  return (
    <View style={[styles.row, isPast && styles.rowPast]}>
      <Link href={`/race/${race.round}`} asChild>
        <Pressable style={styles.main}>
          <CountryChip country={race.Circuit.Location.country} />

          <View style={styles.middle}>
            <Typography variant="large">{race.raceName}</Typography>
            <Typography variant="muted">
              R{race.round} · {race.Circuit.circuitName}
            </Typography>
          </View>

          <View style={styles.right}>
            <Typography variant="mono">{formatDate(race.date)}</Typography>
            {isNext ? <Pill>NEXT</Pill> : null}
          </View>
        </Pressable>
      </Link>

      <Pressable
        onPress={onToggleStar}
        hitSlop={10}
        style={styles.star}
        accessibilityLabel="Toggle favourite"
      >
        <Ionicons
          name={isStarred ? "star" : "star-outline"}
          size={22}
          color={isStarred ? colors.brand : colors.muted}
        />
      </Pressable>
    </View>
  )
}

export default RaceRow

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPast: {
    opacity: 0.45,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: spacing.screen,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  middle: {
    flex: 1,
    gap: spacing.xs,
  },
  right: {
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  star: {
    justifyContent: "center",
    paddingHorizontal: spacing.screen,
  },
})
