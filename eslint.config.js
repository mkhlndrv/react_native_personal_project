import config from "@christopherjbaker/eslint-config/react-strict"
import { defineConfig, globalIgnores } from "eslint/config"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default defineConfig(globalIgnores(["dist/", "web-build/"]), config, {
  // configs overrides, if need
})
