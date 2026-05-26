import { type TextStyle } from "react-native"

import { body, muted as mutedColor } from "./colors"
import { bold, medium, regular, semibold } from "./fonts"

export const display: TextStyle = {
  fontFamily: bold,
  fontSize: 26,
  letterSpacing: -1,
  color: body,
}

export const title: TextStyle = {
  fontFamily: bold,
  fontSize: 20,
  letterSpacing: -0.4,
  color: body,
}

export const large: TextStyle = {
  fontFamily: semibold,
  fontSize: 15,
  color: body,
}

export const normal: TextStyle = {
  fontFamily: regular,
  fontSize: 14,
  color: body,
}

export const muted: TextStyle = {
  fontFamily: regular,
  fontSize: 12,
  color: mutedColor,
}

export const label: TextStyle = {
  fontFamily: bold,
  fontSize: 10,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: mutedColor,
}

export const mono: TextStyle = {
  fontFamily: medium,
  fontSize: 13,
  fontVariant: ["tabular-nums"],
  color: body,
}
