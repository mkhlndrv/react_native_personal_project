# SkyPit

SkyPit is a mobile F1 race-weekend companion. The Calendar tab shows the season's Grand Prix list with a country code chip, round number, circuit, and date on each row, and a NEXT pill on the upcoming race. Tap any race for a detail screen with the full session schedule — practice, qualifying, sprint, race — in local time, with the next future session highlighted. The Standings tab carries the drivers' and constructors' championship tables (pull to refresh), and a Settings tab rounds out the bottom navigation.

Race data comes from the free Jolpica-F1 API (the Ergast successor), so no API key is required.

## Potential features

- Per-session reminders with local push notifications before lights out
- Favourite driver and constructor pinned in standings and badged on the calendar
- Pole sitter and fastest-lap highlights on the GP detail results
- Sprint-weekend handling on the schedule
- "Now" landing tab with a next-session countdown
- Year switcher to browse past seasons
- Driver and constructor detail screens with season stats
- Circuit map preview on GP detail
- Light theme alongside the current paddock dark
- Offline cache of schedule and standings
- Calendar export to the system calendar

## Continuous integration

GitHub Actions runs the checks on every push to `main` and every pull request — typecheck, ESLint, Prettier, and Knip as separate steps, then the Jest suite.

EAS builds run on demand (manually from the Actions tab, or by pushing a `v*` tag) and only after the checks pass. The `preview` profile produces an installable Android APK.
