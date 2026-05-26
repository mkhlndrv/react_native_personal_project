import { Stack } from "expo-router"

import { colors, fonts } from "#design/foundations"

const HomeStackLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.body,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: fonts.bold,
          fontSize: 16,
        },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: "2026 Calendar" }} />
      <Stack.Screen name="race/[round]" options={{ title: "Race" }} />
    </Stack>
  )
}

export default HomeStackLayout
