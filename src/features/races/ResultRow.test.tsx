import { render } from "@testing-library/react-native"

import ResultRow from "./ResultRow"
import { type ResultEntry } from "./types"

const entry: ResultEntry = {
  position: "1",
  driver: "George Russell",
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
})
