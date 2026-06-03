import { useEffect, useState } from "react"

import { REMINDER_LEAD_MAX, REMINDER_LEAD_MIN } from "./useSettings"

type Api = {
  draft: string
  onChange: (text: string) => void
  onCommit: () => void
}

export function useLeadTimeInput(
  value: number,
  setValue: (next: number) => void,
): Api {
  const [draft, setDraft] = useState(String(value))

  useEffect(() => {
    setDraft(String(value))
  }, [value])

  const onChange = (text: string): void => {
    setDraft(text.replace(/[^0-9]/g, ""))
  }

  const onCommit = (): void => {
    const parsed = parseInt(draft, 10)
    if (!Number.isFinite(parsed)) {
      setDraft(String(value))
      return
    }
    const clamped = Math.max(
      REMINDER_LEAD_MIN,
      Math.min(REMINDER_LEAD_MAX, parsed),
    )
    setDraft(String(clamped))
    if (clamped !== value) setValue(clamped)
  }

  return { draft, onChange, onCommit }
}
