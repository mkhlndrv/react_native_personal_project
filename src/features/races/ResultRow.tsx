import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { type ResultEntry } from "./types"

type Props = {
  entry: ResultEntry
}

const ResultRow: React.FC<Props> = ({ entry }) => {
  return (
    <View style={styles.row}>
      <View style={styles.position}>
        <Typography variant="mono">{entry.position}</Typography>
      </View>
      <View style={styles.middle}>
        <Typography variant="large">{entry.driver}</Typography>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  position: {
    width: 28,
    alignItems: "center",
  },
  middle: {
    flex: 1,
    gap: spacing.xs,
  },
  right: {
    alignItems: "flex-end",
    gap: spacing.xs,
  },
})
