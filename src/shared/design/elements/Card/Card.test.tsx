import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Card from "./Card"

describe("Card", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Card>
        <Text>hello</Text>
      </Card>,
    )

    expect(getByText("hello")).toBeTruthy()
  })
})
