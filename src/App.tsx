import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkyPit</Text>
      <Text style={styles.tagline}>F1 race-weekend companion</Text>

      <StatusBar style="auto" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
})
