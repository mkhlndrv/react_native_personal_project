import { render } from "@testing-library/react-native"

import StandingRow from "./StandingRow"
import { type StandingEntry } from "./types"

const entry: StandingEntry = {
  id: "max_verstappen",
  position: "1",
  name: "Max Verstappen",
  detail: "Red Bull",
  points: "169",
}

describe("StandingRow", () => {
  it("shows the position, name, team and points", () => {
    const { getByText } = render(<StandingRow entry={entry} />)

    expect(getByText("Max Verstappen")).toBeTruthy()
    expect(getByText("Red Bull")).toBeTruthy()
    expect(getByText("169")).toBeTruthy()
  })

  it("shows a favourite marker only when highlighted", () => {
    const { queryByLabelText, rerender } = render(<StandingRow entry={entry} />)
    expect(queryByLabelText("Favourite")).toBeNull()

    rerender(<StandingRow entry={entry} highlight />)
    expect(queryByLabelText("Favourite")).toBeTruthy()
  })
})
