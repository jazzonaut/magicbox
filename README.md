# 🎲 MagicBox

A pass-the-phone party game engine for playing with the family. Pick a game, tick
who's playing, and pass the phone around — each player privately reveals their
secret. Built as an offline-capable PWA, no backend, no accounts.

Games so far:

- **Impostor** — everyone gets a secret word except one impostor; talk it out and find the faker.
- **Word Wolf** — everyone gets a word, but the lone wolf gets a different one and nobody knows who.
- **Spyfall** — everyone shares a secret location and role; one spy must blend in.
- **Would You Rather** — a deck of silly dilemmas to read aloud and debate.
- **Most Likely To** — read a prompt, then everyone points at who fits best.

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

> Deploying under a GitHub Pages project sub-path? Set `base: "/<repo>/"` in
> `vite.config.ts`.

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

- Impostor: single impostor, optional category hint (off by default). Both "more
  impostors" (another option) and an end-of-round "who was it" reveal (one extra
  `Round` field + screen) are easy to add later.
- Word lists live in `src/games/impostor/word-bank.ts` — edit to taste.
- App icons in `public/` are flat-colour placeholders; swap in real art anytime.
