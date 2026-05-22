# SkyPit

An F1 race-weekend companion: session times, reminders, standings, per-race stats.

Personal project for Harbour.Space FE411: React Native.

## What it does

- Browse the season's Grand Prix calendar with session times in your local timezone.
- Toggle a per-session reminder; get a local notification before lights out.
- After a race, see pole, podium, and fastest lap on the same GP screen.
- Pick a favourite driver + constructor; they get pinned in standings and badged on the calendar.

## Planned screens

- **Calendar** — list of the season, tap a row for detail.
- **GP detail** — sessions list with reminder toggles; results panel after the race.
- **Standings** — drivers' championship, pull-to-refresh.
- **Settings** — favourites, reminder lead time, clear local data.

## Data

Read-only from [Jolpica-F1](https://api.jolpi.ca/) (the Ergast successor). User state in `AsyncStorage`. No backend.

## Stack

Expo SDK 54, TypeScript strict, ESLint 9 + `@christopherjbaker/eslint-config/react-strict`, Prettier (no-semi), Knip.

## Getting started

```sh
npm install
npm start
npm run ios | android | web
```

## Linting

```sh
npm run lint          # typecheck → eslint → prettier --check → knip
```

Sub-scripts (`lint-typecheck`, `lint-eslint`, `lint-prettier`, `lint-knip`) run individually.

## Potential features

- Full qualifying grid on GP detail (currently pole sitter only)
- Sprint-weekend handling (separate sprint result row)
- Constructors / drivers toggle on Standings
- "Now" landing tab with next-session countdown
- Timezone override (currently auto-detected)
- Year switcher to browse past seasons
- Driver + constructor detail screens with season stats
- Results trend charts (points, podium streaks)
- Circuit map preview on GP detail
- Light / dark theme
- Offline cache of schedule and standings
- Push notifications via EAS
- Calendar export to the system calendar
- Apple Watch complication for the next session
