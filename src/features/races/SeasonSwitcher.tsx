import { Pressable, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"

import { useSeason } from "./useSeason"

const SeasonSwitcher: React.FC = () => {
  const { season, setSeason, seasons } = useSeason()

  return (
    <View style={styles.row}>
      {seasons.map((year) => {
        const active = year === season
        return (
          <Pressable
            key={year}
            onPress={() => setSeason(year)}
            style={[styles.pill, active && styles.pillActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Season ${year}`}
          >
            <Typography variant="mono">{String(year)}</Typography>
          </Pressable>
        )
      })}
    </View>
  )
}

export default SeasonSwitcher

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: shapes.chip,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
})
