import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  season: number
  onSeasonChange: (s: number) => void
}

const seasons = [2024, 2025, 2026]

const Header: React.FC<Props> = ({ season, onSeasonChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏁 SkyPit · {season} Season</Text>

      <View style={styles.seasons}>
        {seasons.map((s) => {
          const active = s === season
          return (
            <Pressable
              key={s}
              onPress={() => {
                onSeasonChange(s)
              }}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>
                {s}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#15151e",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  seasons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#2a2a35",
  },
  pillActive: {
    backgroundColor: "#e10600",
  },
  pillText: {
    color: "#bbb",
    fontWeight: "600",
    fontSize: 13,
  },
  pillTextActive: {
    color: "#fff",
  },
})
