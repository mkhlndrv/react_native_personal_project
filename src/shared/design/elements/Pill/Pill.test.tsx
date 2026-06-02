import { render } from "@testing-library/react-native"

import Pill from "./Pill"

describe("Pill", () => {
  it("renders the label", () => {
    const { getByText } = render(<Pill>NEXT</Pill>)

    expect(getByText("NEXT")).toBeTruthy()
  })
})
