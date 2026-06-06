# SkyPit

SkyPit is a phone companion for following a Formula 1 season. It pulls the
schedule, results, and championship standings from a public F1 API and lays them
out the way you actually want them during a race weekend: the **Calendar** lists
every Grand Prix with its country, round, circuit, and date and flags the next
one up; tapping a race opens the full session schedule — practice, qualifying,
sprint, race — converted to **your local time** with the next upcoming session
highlighted, plus the finishing classification once the race has run. The
**Standings** tab carries the drivers' and constructors' tables with
pull-to-refresh, and you can pick a favourite driver and constructor to pin them
to the top and mark them in the results. You can star a race to get a local
reminder before lights out, browse past seasons (2024–2026), and tune the
reminder lead time and calendar filters in **Settings**. Everything you choose —
favourites, reminders, preferences, the season you're viewing — is saved on the
device, and the app only ever talks to the F1 API, so there's no account, no
sign-in, and no API key to manage.

## Features

- Season **Calendar** (`FlatList`) with country chips and a NEXT pill on the
  upcoming round.
- **GP detail**: session schedule in local time with the next session
  highlighted, and the race classification once it has run.
- Drivers' & constructors' **Standings** (`SectionList`) with pull-to-refresh.
- **Favourite driver + constructor** — chosen from Settings, pinned and starred
  in the standings and on the results row.
- **Race reminders** — star a race to schedule a local notification a
  configurable time before it starts.
- **Browse past seasons** (2024–2026) from a switcher on Calendar and Standings.
- **Settings** — reminder lead time, a reminders master toggle, and "show only
  starred" / "hide past races" calendar filters.
- F1 paddock-dark design system; all user state persisted locally.

## How it's built

SkyPit is an **Expo / React Native** app (SDK 56, New Architecture) written in
strict **TypeScript**. Routing is file-based with **Expo Router** and kept
deliberately thin: every route file under `src/app/` is a one-line wrapper that
renders a component from a feature, so the navigation structure — a bottom-tab
navigator with a nested stack for the Calendar → GP-detail flow, plus dynamic
`[round]` and `[kind]` routes — stays separate from application and rendering
logic. The code is organised into feature **modlets** (`races`, `standings`,
`settings`) over a small `shared` layer (a design system, a country-code helper,
and a generic persistence engine). Each modlet exposes a single public surface
through its `index.ts` barrel and is reached only through subpath import aliases
(`#features/*`, `#shared/*`, `#design/*`) rather than deep relative paths;
internal files stay private. Data comes from the public Jolpica-F1 REST API with
explicit loading / error / empty states, and all user-owned state (favourites,
reminders, settings, selected season) lives in AsyncStorage behind domain hooks
that each own their storage key and a small module-level pub/sub so multiple
screens stay in sync. Device integration is local notifications for the race
reminders.

**Tech stack**

- Expo SDK 56 · React Native 0.85 · React 19.2 · TypeScript (strict)
- Expo Router — file-based navigation
- AsyncStorage — local-first persistence
- expo-notifications — local race reminders
- Jest + `@testing-library/react-native` — tests
- ESLint · Prettier · Knip — composite lint pipeline

**External services**

- **Jolpica-F1 API** (`https://api.jolpi.ca/ergast/f1/…`) — public, keyless F1
  schedule / results / standings (the Ergast successor).
- **Expo Application Services (EAS)** — on-demand native builds (optional).
- **GitHub Actions** — continuous integration.

## Getting started

### Prerequisites

- **Node `>= 20.19.4`** (required by React Native 0.85) and npm.
- To run on a device or simulator: **Xcode** (iOS Simulator) or **Android
  Studio** (Android emulator). Note: SDK 56 is newer than the public **Expo Go**
  app, so Expo Go can't open this project — use a development build (below) or
  the web target.

### Install

```sh
npm install
```

`.npmrc` sets `legacy-peer-deps=true`, so a plain `npm install` resolves the
React Native peer ranges without extra flags.

### Run

```sh
npm run web          # runs in the browser — no native build; quickest way to see it
npm start            # Metro dev server (then press i / a, or open a dev build)
npx expo run:ios     # build + launch a dev client in the iOS Simulator (needs Xcode)
npx expo run:android # same for the Android emulator (needs Android Studio)
```

### Environment variables

**None are required to run the app.** Jolpica-F1 is a public, keyless API and
all user data is stored on the device, so there is no `.env` to configure. The
only secret in the project is `EXPO_TOKEN` — a GitHub Actions repository secret
used _solely_ for optional EAS cloud builds; local development and running need
nothing.

### Quality checks

```sh
npm run lint   # typecheck → ESLint → Prettier → Knip → Jest
npm test       # Jest suite only
```

## Project structure

```
src/
  app/                 # Expo Router routes — thin wrappers around feature components
  features/            # feature modlets, each with a public index.ts barrel
    races/             # Calendar, GP detail, favourite races, reminders, season switcher
    standings/         # standings tables, favourite-competitor picker
    settings/          # Settings screen, preferences, favourite driver/constructor
  shared/
    countries/         # country code → flag/name helper
    design/            # 3-tier design system (foundations / elements / patterns)
    persistence/       # usePersistedState — generic AsyncStorage hook with pub/sub
```

Cross-feature code is imported only through the aliases (`#features/*`,
`#shared/*`, `#design/*`), which resolve to each module's barrel; internal files
are reached with relative imports and never from outside the modlet.

## Continuous integration

GitHub Actions runs the checks on every push to `main` and every pull request —
typecheck, ESLint, Prettier, and Knip as separate steps, then the Jest suite.

EAS builds run on demand (manually from the Actions tab, or by pushing a `v*`
tag) and only after the checks pass. The `preview` profile produces an
installable Android APK.

## Potential features

- Pole sitter and fastest-lap highlights on the GP detail results
- Sprint-weekend handling on the schedule
- A "Now" landing tab with a next-session countdown
- Driver and constructor detail screens with season stats
- Circuit map preview on GP detail
- Light theme alongside the current paddock dark
- Offline cache of schedule and standings
- Calendar export to the system calendar
