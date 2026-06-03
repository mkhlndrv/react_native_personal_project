import { StyleSheet, View } from "react-native"

import { colors, shapes, spacing } from "#design/foundations"

type CardProps = {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: spacing.inside,
    marginVertical: spacing.between / 2,

    borderRadius: shapes.card,
    backgroundColor: colors.surface,
  },
})
