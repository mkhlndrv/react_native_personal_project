import { render } from "@testing-library/react-native"

import CountryChip from "./CountryChip"

describe("CountryChip", () => {
  it("renders", () => {
    const { getByText } = render(<CountryChip country="Monaco" />)
    expect(getByText("MON")).toBeTruthy()
  })

  describe("country code derivation", () => {
    it("maps a known country to its 3-letter code", () => {
      const { getByText } = render(<CountryChip country="UK" />)
      expect(getByText("GBR")).toBeTruthy()
    })

    it("falls back to the first three letters when the country is unknown", () => {
      const { getByText } = render(<CountryChip country="Atlantis" />)
      expect(getByText("ATL")).toBeTruthy()
    })
  })

  describe("integration", () => {
    it("looks the code up through #shared/countries for every size", () => {
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"]
      for (const size of sizes) {
        const { getByText, unmount } = render(
          <CountryChip country="Spain" size={size} />,
        )
        expect(getByText("ESP")).toBeTruthy()
        unmount()
      }
    })
  })
})
