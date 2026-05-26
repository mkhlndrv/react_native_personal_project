import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
  JetBrainsMono_700Bold,
  useFonts,
} from "@expo-google-fonts/jetbrains-mono"
import { Stack } from "expo-router"
import { StatusBar, View } from "react-native"

import { colors } from "#design/foundations"

const RootLayout: React.FC = () => {
  const [loaded] = useFonts({
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_600SemiBold,
    JetBrainsMono_700Bold,
  })

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.body,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "JetBrainsMono_700Bold",
            fontSize: 16,
          },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

export default RootLayout
