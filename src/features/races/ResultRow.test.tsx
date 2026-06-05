import { render } from "@testing-library/react-native"

import ResultRow from "./ResultRow"
import { type ResultEntry } from "./types"

const entry: ResultEntry = {
  position: "1",
  driverId: "russell",
  driver: "George Russell",
  constructorId: "mercedes",
  team: "Mercedes",
  outcome: "1:23:06.801",
  points: "25",
}

describe("ResultRow", () => {
  it("shows the position, driver, team, points and outcome", () => {
    const { getByText } = render(<ResultRow entry={entry} />)

    expect(getByText("George Russell")).toBeTruthy()
    expect(getByText("Mercedes")).toBeTruthy()
    expect(getByText("25")).toBeTruthy()
    expect(getByText("1:23:06.801")).toBeTruthy()
  })

  it("shows a favourite marker only when highlighted", () => {
    const { queryByLabelText, rerender } = render(<ResultRow entry={entry} />)
    expect(queryByLabelText("Favourite")).toBeNull()

    rerender(<ResultRow entry={entry} highlight />)
    expect(queryByLabelText("Favourite")).toBeTruthy()
  })
})
