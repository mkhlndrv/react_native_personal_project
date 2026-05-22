import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { StyleSheet, View } from "react-native"

import Calendar from "./Calendar"
import Header from "./Header"

const App: React.FC = () => {
  const [season, setSeason] = useState(2026)

  return (
    <View style={styles.container}>
      <Header season={season} onSeasonChange={setSeason} />
      <Calendar season={season} />

      <StatusBar style="light" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
