# 🎲 MagicBox

A pass-the-phone party game engine for playing with the family. Pick a game, tick
who's playing, and pass the phone around — each player privately reveals their
secret. Built as an offline-capable PWA, no backend, no accounts.

**▶️ Play it: https://jazzonaut.github.io/magicbox**

Games so far:

- **Impostor** — everyone gets a secret word except one impostor; talk it out and find the faker.
- **Word Wolf** — everyone gets a word, but the lone wolf gets a different one and nobody knows who.
- **Spyfall** — everyone shares a secret location and role; one spy must blend in.
- **Would You Rather** — a deck of silly dilemmas to read aloud and debate.
- **Most Likely To** — read a prompt, then everyone points at who fits best.

Each game has per-round options on the setup screen — pick the variant before you deal:

- **Impostor** — word category, number of impostors, whether impostors know each other, an
  optional category hint.
- **Word Wolf** — number of wolves.
- **Spyfall** — location pack (everyday / fantasy), number of spies, whether the spy sees the
  list of possible locations (the classic rule), and a roles-off mode for younger players.
- **Would You Rather** / **Most Likely To** — theme pack, a "Keep it gentle" toggle that hides
  the cheekier prompts (on by default), and how many cards to deal.

The hidden-role games (Impostor, Word Wolf, Spyfall) also share two engine-level extras: an
optional **discussion timer** and an **end-of-round reveal** that names who it was.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server |
| `pnpm build` | Typecheck + production build to `dist/` |
| `pnpm preview` | Serve the built app (PWA + service worker) |
| `pnpm typecheck` | `vue-tsc --noEmit` |
| `pnpm lint` / `pnpm format` | oxlint / oxfmt |

## Use it on your phone

It's a PWA: `pnpm build` produces a static `dist/` you can host anywhere (Netlify,
GitHub Pages, or serve over your home Wi-Fi). Open it on the phone and "Add to Home
Screen" — it then launches fullscreen and works offline.

### Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the app on every push to `main`
(or `master`). One-time setup: in the repo, go to **Settings → Pages → Build and
deployment → Source** and choose **GitHub Actions**. After the next push the app is
live at `https://<user>.github.io/<repo>/`.

The workflow sets `VITE_BASE` to `/<repo>/` so assets and deep links resolve under
the project sub-path, and copies `index.html` to `404.html` so refreshing a client
route works. For a root user/org page (`<user>.github.io` repo) or a custom domain,
build with `VITE_BASE=/` instead.

## How it's built

A **generic engine** owns everything shared across games; each **game is a plug-in**.

- `src/games/types.ts` — the plug-in contract (`GameDefinition`): a game declares its
  `options` and a pure `createRound(players, options)` that returns one `SecretCard`
  per player.
- `src/games/registry.ts` — the catalogue of games.
- `src/composables/use-players.ts` — the roster (names + emojis) and who's playing,
  persisted in `localStorage`.
- `src/composables/use-game-options.ts` — per-game option values, remembered between
  sessions.
- A game's `createRound` returns one of two round kinds: `secret` (per-player cards
  revealed by passing the phone, via `SecretRevealFlow.vue`) or `prompts` (a shared
  deck the group flips through together, via `PromptDeckFlow.vue`). `PlayView` picks
  the right flow automatically.
- `src/views/` — `HomeView` (picker) → `SetupView` (players + options) → `PlayView`
  (deal + reveal + discuss).

### Add a new game

1. Create `src/games/<your-game>/index.ts` exporting a `GameDefinition`.
2. Add it to the array in `src/games/registry.ts`.

That's it — the engine renders its options and runs the reveal flow. No engine changes.

## Notes

- Shared option building blocks (the discussion timer, the end-of-round reveal, and the
  prompt-deck pack / gentle / card-count options) live in `src/games/shared.ts` so every
  game wires them up the same way. A game opts in by spreading the option into its `options`
  and calling the matching reader (`timerSecondsFrom`, `revealEnabled`, `buildPromptDeck`)
  inside `createRound`.
- The engine renders `Round.timerSeconds` (a countdown via `DiscussionTimer.vue`) and
  `Round.reveal` (a "who was it" panel) — no game-specific UI needed.
- Word lists live in `src/games/impostor/word-bank.ts` — edit to taste. Prompt decks
  (`would-you-rather`, `most-likely-to`) are tagged `PromptEntry`s; the per-game `*_PACKS`
  export drives the theme dropdown, and a `cheeky: true` flag hides a prompt while
  "Keep it gentle" is on.
- App icons in `public/` are generated die-face tiles. Regenerate with `pnpm icons`
  (edit colour/pips in `scripts/gen-icons.mjs`); the favicon is a matching SVG.
