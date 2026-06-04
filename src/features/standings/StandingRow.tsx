import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { type StandingEntry } from "./types"

type Props = {
  entry: StandingEntry
}

const StandingRow: React.FC<Props> = ({ entry }) => {
  return (
    <View style={styles.row}>
      <View style={styles.position}>
        <Typography variant="mono">{entry.position}</Typography>
      </View>
      <View style={styles.middle}>
        <Typography variant="large">{entry.name}</Typography>
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
})
