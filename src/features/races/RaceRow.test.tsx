import { render, userEvent } from "@testing-library/react-native"

import RaceRow from "./RaceRow"
import { type Race } from "./types"

jest.mock("expo-router", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pressable } = require("react-native")
  return {
    Link: ({
      children,
      asChild: _asChild,
      ...rest
    }: {
      children: React.ReactNode
      asChild?: boolean
    }) => <Pressable {...rest}>{children}</Pressable>,
  }
})

const fakeRace: Race = {
  round: "6",
  raceName: "Monaco Grand Prix",
  date: "2026-06-07",
  Circuit: {
    circuitName: "Circuit de Monaco",
    Location: { country: "Monaco", locality: "Monte Carlo" },
  },
}

describe("RaceRow", () => {
  it("calls onToggleStar when the star is tapped", async () => {
    const onToggleStar = jest.fn()
    const user = userEvent.setup()

    const { getByLabelText } = render(
      <RaceRow
        race={fakeRace}
        isNext={false}
        isPast={false}
        isStarred={false}
        onToggleStar={onToggleStar}
      />,
    )

    await user.press(getByLabelText("Toggle favourite"))

    expect(onToggleStar).toHaveBeenCalledTimes(1)
  })
})
