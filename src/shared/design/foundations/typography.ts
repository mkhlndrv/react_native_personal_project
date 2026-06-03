import { type TextStyle } from "react-native"

import { body, muted as mutedColor } from "./colors"
import { bold, medium, regular, semibold } from "./fonts"

export const typography = {
  display: { fontFamily: bold, fontSize: 26, letterSpacing: -1, color: body },
  title: { fontFamily: bold, fontSize: 20, letterSpacing: -0.4, color: body },
  large: { fontFamily: semibold, fontSize: 15, color: body },
  normal: { fontFamily: regular, fontSize: 14, color: body },
  muted: { fontFamily: regular, fontSize: 12, color: mutedColor },
  label: {
    fontFamily: bold,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: mutedColor,
  },
  mono: {
    fontFamily: medium,
    fontSize: 13,
    fontVariant: ["tabular-nums"],
    color: body,
  },
} satisfies Record<string, TextStyle>
