import { render } from "@testing-library/react-native"

import Typography from "./Typography"

describe("Typography", () => {
  it("renders its children text", () => {
    const { getByText } = render(<Typography>SkyPit</Typography>)

    expect(getByText("SkyPit")).toBeTruthy()
  })
})
