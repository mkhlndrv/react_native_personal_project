import { Link, type LinkProps } from "expo-router"
import { StyleSheet, Text } from "react-native"

import { typography } from "#design/foundations"

export type TypographyProps = {
  variant?: keyof typeof typography
  children: React.ReactNode
} & (
  | { href?: never }
  | Pick<LinkProps, "href" | "replace" | "push" | "dismissTo">
)

const Typography: React.FC<TypographyProps> = ({
  variant = "normal",
  children,
  ...props
}) => {
  if ("href" in props && props.href) {
    return (
      <Link {...props} style={styles[variant]}>
        {children}
      </Link>
    )
  }

  return (
    <Text {...props} style={styles[variant]}>
      {children}
    </Text>
  )
}

export default Typography

const styles = StyleSheet.create({ ...typography })
