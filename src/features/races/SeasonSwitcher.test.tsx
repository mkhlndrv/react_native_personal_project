import { render, userEvent } from "@testing-library/react-native"

import SeasonSwitcher from "./SeasonSwitcher"

describe("SeasonSwitcher", () => {
  it("selects the season that gets pressed", async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(<SeasonSwitcher />)

    expect(getByLabelText("Season 2026")).toBeSelected()

    await user.press(getByLabelText("Season 2024"))

    expect(getByLabelText("Season 2024")).toBeSelected()
    expect(getByLabelText("Season 2026")).not.toBeSelected()
  })
})
