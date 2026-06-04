export type Session = {
  date: string
  time?: string
}

export type Race = {
  season?: string
  round: string
  raceName: string
  date: string
  time?: string
  Circuit: {
    circuitName: string
    Location: { country: string; locality?: string }
  }
  FirstPractice?: Session
  SecondPractice?: Session
  ThirdPractice?: Session
  Qualifying?: Session
  Sprint?: Session
}

export type ResultEntry = {
  position: string
  driver: string
  team: string
  outcome: string
  points: string
}
