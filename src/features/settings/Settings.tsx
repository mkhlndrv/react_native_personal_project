import { StyleSheet, Text, View } from "react-native"

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.hint}>
        Favourite driver, reminders, and the rest land here next.
      </Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  hint: {
    marginTop: 8,
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
})
