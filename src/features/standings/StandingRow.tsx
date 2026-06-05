import Ionicons from "@expo/vector-icons/Ionicons"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { type StandingEntry } from "./types"

type Props = {
  entry: StandingEntry
  highlight?: boolean
}

const StandingRow: React.FC<Props> = ({ entry, highlight }) => {
  return (
    <View style={[styles.row, highlight && styles.rowHighlight]}>
      <View style={styles.position}>
        <Typography variant="mono">{entry.position}</Typography>
      </View>
      <View style={styles.middle}>
        <View style={styles.nameRow}>
          <Typography variant="large">{entry.name}</Typography>
          {highlight ? (
            <Ionicons
              name="star"
              size={13}
              color={colors.brand}
              accessibilityLabel="Favourite"
            />
          ) : null}
        </View>
        <Typography variant="muted">{entry.detail}</Typography>
      </View>
      <Typography variant="mono">{entry.points}</Typography>
    </View>
  )
}

export default StandingRow

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowHighlight: {
    borderLeftColor: colors.brand,
  },
  position: {
    width: 28,
    alignItems: "center",
  },
  middle: {
    flex: 1,
    gap: spacing.xs,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
})
