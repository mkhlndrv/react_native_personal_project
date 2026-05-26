import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

const Standings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title">Standings</Typography>
      <Typography variant="muted">Driver standings land here next.</Typography>
    </View>
  )
}

export default Standings

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
