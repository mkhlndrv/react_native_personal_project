import { Stack } from "expo-router"

const RootLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
