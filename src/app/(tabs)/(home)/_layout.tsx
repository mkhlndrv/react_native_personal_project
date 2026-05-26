import { Stack } from "expo-router"

const HomeStackLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "2026 Calendar" }} />
      <Stack.Screen name="race/[round]" options={{ title: "Race" }} />
    </Stack>
  )
}

export default HomeStackLayout
