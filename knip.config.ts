import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreDependencies: ["eslint-config-expo", "expo-updates", "expo-system-ui"],
}

export default config
