import { StyleSheet, Text, View } from "react-native"

const Standings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Standings</Text>
      <Text style={styles.hint}>Driver standings land here next.</Text>
    </View>
  )
}

export default Standings

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
  },
})
