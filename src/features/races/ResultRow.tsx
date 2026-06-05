import Ionicons from "@expo/vector-icons/Ionicons"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { type ResultEntry } from "./types"

type Props = {
  entry: ResultEntry
  highlight?: boolean
}

const ResultRow: React.FC<Props> = ({ entry, highlight }) => {
  return (
    <View style={[styles.row, highlight && styles.rowHighlight]}>
      <View style={styles.position}>
        <Typography variant="mono">{entry.position}</Typography>
      </View>
      <View style={styles.middle}>
        <View style={styles.nameRow}>
          <Typography variant="large">{entry.driver}</Typography>
          {highlight ? (
            <Ionicons
              name="star"
              size={13}
              color={colors.brand}
              accessibilityLabel="Favourite"
            />
          ) : null}
        </View>
        <Typography variant="muted">{entry.team}</Typography>
      </View>
      <View style={styles.right}>
        <Typography variant="mono">{entry.points}</Typography>
        <Typography variant="muted">{entry.outcome}</Typography>
      </View>
    </View>
  )
}

export default ResultRow

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    paddingVertical: spacing.md,
    paddingLeft: spacing.md,
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
  right: {
    alignItems: "flex-end",
    gap: spacing.xs,
  },
})
