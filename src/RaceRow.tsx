import { StyleSheet, Text, View } from "react-native"

import { flagForCountry } from "./lib/flags"

export type Race = {
  round: string
  raceName: string
  date: string
  Circuit: {
    circuitName: string
    Location: { country: string }
  }
}

type Props = {
  race: Race
  isNext: boolean
}

const RaceRow: React.FC<Props> = ({ race, isNext }) => {
  const date = new Date(race.date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })

  return (
    <View style={styles.row}>
      <Text style={styles.flag}>
        {flagForCountry(race.Circuit.Location.country)}
      </Text>

      <View style={styles.middle}>
        <View style={styles.titleRow}>
          <Text style={styles.round}>R{race.round}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {race.raceName}
          </Text>
          {isNext ? <Text style={styles.pill}>NEXT</Text> : null}
        </View>
        <Text style={styles.circuit} numberOfLines={1}>
          {race.Circuit.circuitName}
        </Text>
      </View>

      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default RaceRow

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
    gap: 12,
  },
  flag: {
    fontSize: 28,
  },
  middle: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  round: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
  pill: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "#e10600",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  circuit: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: "#444",
  },
})
