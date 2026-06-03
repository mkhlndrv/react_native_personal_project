import { StyleSheet, Text, View } from "react-native"

import { colors, fonts, shapes } from "#design/foundations"
import { codeForCountry } from "#shared/countries"

type CountryChipProps = {
  country: string
  size?: "sm" | "md" | "lg"
}

const CountryChip: React.FC<CountryChipProps> = ({ country, size = "md" }) => {
  return (
    <View style={[styles.chip, sized[size]]}>
      <Text style={[styles.code, sizedText[size]]}>
        {codeForCountry(country)}
      </Text>
    </View>
  )
}

export default CountryChip

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderRadius: shapes.chip,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  code: {
    color: colors.body,
    fontFamily: fonts.bold,
    letterSpacing: 1,
  },
})

const sized = StyleSheet.create({
  sm: { paddingHorizontal: 6, paddingVertical: 3, minWidth: 36 },
  md: { paddingHorizontal: 8, paddingVertical: 5, minWidth: 44 },
  lg: { paddingHorizontal: 12, paddingVertical: 8, minWidth: 64 },
})

const sizedText = StyleSheet.create({
  sm: { fontSize: 10 },
  md: { fontSize: 12 },
  lg: { fontSize: 18 },
})
