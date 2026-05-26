import { type TextStyle } from "react-native"

import { body, muted as mutedColor } from "./colors"

export const display: TextStyle = {
  fontFamily: "JetBrainsMono_700Bold",
  fontSize: 26,
  letterSpacing: -1,
  color: body,
}

export const title: TextStyle = {
  fontFamily: "JetBrainsMono_700Bold",
  fontSize: 20,
  letterSpacing: -0.4,
  color: body,
}

export const large: TextStyle = {
  fontFamily: "JetBrainsMono_600SemiBold",
  fontSize: 15,
  color: body,
}

export const normal: TextStyle = {
  fontFamily: "JetBrainsMono_400Regular",
  fontSize: 14,
  color: body,
}

export const muted: TextStyle = {
  fontFamily: "JetBrainsMono_400Regular",
  fontSize: 12,
  color: mutedColor,
}

export const label: TextStyle = {
  fontFamily: "JetBrainsMono_700Bold",
  fontSize: 10,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: mutedColor,
}

export const mono: TextStyle = {
  fontFamily: "JetBrainsMono_500Medium",
  fontSize: 13,
  fontVariant: ["tabular-nums"],
  color: body,
}
