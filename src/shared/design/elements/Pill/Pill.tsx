import { StyleSheet, Text, View } from "react-native"

import { colors, fonts, shapes, spacing } from "#design/foundations"

type PillProps = {
  children: React.ReactNode
}

const Pill: React.FC<PillProps> = ({ children }) => {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default Pill

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: shapes.pill,
  },
  text: {
    color: colors.body,
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 1,
  },
})
