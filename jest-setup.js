/* global require */
/* eslint-disable @typescript-eslint/no-require-imports */
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons")

jest.mock("expo-router", () => {
  const { Pressable, Text } = require("react-native")
  return {
    Link: ({ children, asChild: _asChild, ...rest }) =>
      typeof children === "string" ? (
        <Text {...rest}>{children}</Text>
      ) : (
        <Pressable {...rest}>{children}</Pressable>
      ),
    Stack: { Screen: () => null },
    useLocalSearchParams: () => ({}),
  }
})
