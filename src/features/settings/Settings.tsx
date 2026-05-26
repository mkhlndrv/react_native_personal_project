import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title">Settings</Typography>
      <Typography variant="muted">
        Favourite driver, reminders, and the rest land here next.
      </Typography>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.inside,
    gap: 8,
  },
})
