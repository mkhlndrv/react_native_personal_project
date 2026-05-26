import { StyleSheet, View } from "react-native"

import Pill from "#design/elements/Pill"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import CountryChip from "#design/patterns/CountryChip"

import { type Race } from "./types"

type Props = {
  race: Race
  isNext: boolean
}

const formatDate = (iso: string): string =>
  new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    .toUpperCase()

const RaceRow: React.FC<Props> = ({ race, isNext }) => {
  return (
    <View style={styles.row}>
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
    </View>
  )
}

export default RaceRow

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  middle: {
    flex: 1,
    gap: spacing.xs,
  },
  right: {
    alignItems: "flex-end",
    gap: spacing.sm,
  },
})
