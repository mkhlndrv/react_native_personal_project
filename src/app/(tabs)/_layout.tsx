import Ionicons from "@expo/vector-icons/Ionicons"
import { Tabs } from "expo-router"

import { colors } from "#design/foundations"

type IconProps = { focused: boolean; color: string; size: number }

const icon =
  (
    active: React.ComponentProps<typeof Ionicons>["name"],
    inactive: React.ComponentProps<typeof Ionicons>["name"],
  ) =>
  ({ focused, color, size }: IconProps) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color} />
  )

const TabsLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontFamily: "JetBrainsMono_600SemiBold",
          fontSize: 11,
        },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.body,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: "JetBrainsMono_700Bold",
          fontSize: 16,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: icon("flag", "flag-outline"),
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: "Standings",
          tabBarIcon: icon("trophy", "trophy-outline"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: icon("settings", "settings-outline"),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
