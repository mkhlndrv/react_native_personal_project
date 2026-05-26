import { StyleSheet, Text, View } from "react-native"

import CountryChip from "#design/elements/CountryChip"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

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
        {isNext ? (
          <View style={styles.pill}>
            <Text style={styles.pillText}>NEXT</Text>
          </View>
        ) : null}
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
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  middle: {
    flex: 1,
    gap: 4,
  },
  right: {
    alignItems: "flex-end",
    gap: 6,
  },
  pill: {
    backgroundColor: colors.brand,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pillText: {
    color: colors.body,
    fontFamily: "JetBrainsMono_700Bold",
    fontSize: 10,
    letterSpacing: 1,
  },
})
