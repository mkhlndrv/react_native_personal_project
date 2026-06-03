import { ScrollView, StyleSheet, Switch, TextInput, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, fonts, shapes, spacing } from "#design/foundations"

import { useLeadTimeInput } from "./useLeadTimeInput"
import { useSettings } from "./useSettings"

const Settings: React.FC = () => {
  const settings = useSettings()
  const leadTime = useLeadTimeInput(
    settings.reminderLeadMinutes,
    settings.setReminderLeadMinutes,
  )

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Typography variant="label">Notifications</Typography>
      <Card>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Typography variant="large">Race reminders</Typography>
            <Typography variant="muted">
              Schedule a local notification before each race you star.
            </Typography>
          </View>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={settings.setNotificationsEnabled}
            trackColor={{ false: colors.surface, true: colors.brand }}
            thumbColor={colors.body}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Typography variant="large">Lead time</Typography>
            <Typography variant="muted">
              Minutes before lights out. 5 to 1440.
            </Typography>
          </View>
          <TextInput
            value={leadTime.draft}
            onChangeText={leadTime.onChange}
            onBlur={leadTime.onCommit}
            onSubmitEditing={leadTime.onCommit}
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={4}
            editable={settings.notificationsEnabled}
            style={[
              styles.input,
              styles.inputNumeric,
              !settings.notificationsEnabled && styles.inputDisabled,
            ]}
          />
        </View>
      </Card>

      <Typography variant="label">Calendar</Typography>
      <Card>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Typography variant="large">Show only starred</Typography>
            <Typography variant="muted">
              Hide unstarred races from the season list.
            </Typography>
          </View>
          <Switch
            value={settings.showOnlyStarred}
            onValueChange={settings.setShowOnlyStarred}
            trackColor={{ false: colors.surface, true: colors.brand }}
            thumbColor={colors.body}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Typography variant="large">Hide past races</Typography>
            <Typography variant="muted">
              Drop rounds whose race weekend has already finished.
            </Typography>
          </View>
          <Switch
            value={settings.hidePastRaces}
            onValueChange={settings.setHidePastRaces}
            trackColor={{ false: colors.surface, true: colors.brand }}
            thumbColor={colors.body}
          />
        </View>
      </Card>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.inside,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  rowText: {
    flex: 1,
    gap: spacing.xs,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: shapes.chip,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.body,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  inputNumeric: {
    width: 72,
    textAlign: "center",
    fontFamily: fonts.medium,
    fontVariant: ["tabular-nums"],
  },
  inputDisabled: {
    opacity: 0.4,
  },
})
