// Option building blocks reused across games, so the discussion timer and the
// end-of-round reveal look and behave the same everywhere. A game opts in by
// spreading these into its `options`, then calling the matching reader inside
// `createRound` to translate the stored value.

import type {
  GameOption,
  OptionValues,
  Player,
  PromptCard,
  Round,
  SecretCard,
} from "@/games/types";
import { shuffle } from "@/utils/random";

const TIMER_OFF = "off";

/** A "Discussion timer" select: Off / 1 / 2 / 3 / 5 minutes. */
export const timerOption: GameOption = {
  kind: "select",
  key: "timer",
  label: "Discussion timer",
  help: "Show a countdown while everyone debates.",
  default: TIMER_OFF,
  choices: [
    { value: TIMER_OFF, label: "Off" },
    { value: "60", label: "1 minute" },
    { value: "120", label: "2 minutes" },
    { value: "180", label: "3 minutes" },
    { value: "300", label: "5 minutes" },
  ],
};

/** Translate the timer option into seconds, or `undefined` when off/invalid. */
export function timerSecondsFrom(options: OptionValues): number | undefined {
  const value = options.timer;
  if (typeof value !== "string" || value === TIMER_OFF) {
    return undefined;
  }
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds > 0 ? seconds : undefined;
}

/** A "Reveal the answer at the end" toggle, off by default. */
export const revealOption: GameOption = {
  kind: "boolean",
  key: "revealAtEnd",
  label: "Reveal the answer at the end",
  help: "After the discussion, show who it really was.",
  default: false,
};

/** Whether the end-of-round reveal was switched on. */
export function revealEnabled(options: OptionValues): boolean {
  return options.revealAtEnd === true;
}

// ---- Prompt-deck shared options (Would You Rather, Most Likely To) ----------

const PACK_ALL = "all";

/** A single deck prompt, tagged with a theme pack and an optional cheeky flag
 *  (cheeky prompts are hidden while "Keep it gentle" is on). */
export interface PromptEntry {
  text: string;
  pack: string;
  cheeky?: boolean;
}

/** Build a "Theme" select from a game's packs, with an "Everything" default. */
export function packOption(packs: { value: string; label: string }[]): GameOption {
  return {
    kind: "select",
    key: "pack",
    label: "Theme",
    help: "Narrow the deck to one flavour, or shuffle the lot.",
    default: PACK_ALL,
    choices: [{ value: PACK_ALL, label: "🎲 Everything" }, ...packs],
  };
}

/** Hide the cheekier prompts. On by default — gentle out of the box. */
export const kidFriendlyOption: GameOption = {
  kind: "boolean",
  key: "kidFriendly",
  label: "Keep it gentle",
  help: "Hide the cheekier prompts — best with younger players.",
  default: true,
};

/** How many cards to deal before the deck loops back round. */
export const roundsOption: GameOption = {
  kind: "number",
  key: "rounds",
  label: "Number of cards",
  help: "How many prompts to deal this round.",
  default: 12,
  min: 3,
  max: 40,
};

/** Filter a tagged prompt list by the chosen pack + gentle toggle, then shuffle
 *  and trim to the requested card count. Always returns at least one card. */
export function buildPromptDeck(entries: PromptEntry[], options: OptionValues): PromptCard[] {
  const pack = typeof options.pack === "string" ? options.pack : PACK_ALL;
  const keepGentle = options.kidFriendly !== false;

  let pool = entries;
  if (pack !== PACK_ALL) {
    pool = pool.filter((entry) => entry.pack === pack);
  }
  if (keepGentle) {
    pool = pool.filter((entry) => entry.cheeky !== true);
  }
  // Never deal an empty deck — fall back to the full list if filters cleared it.
  if (pool.length === 0) {
    pool = entries;
  }

  const requested = typeof options.rounds === "number" ? Math.round(options.rounds) : pool.length;
  const count = Math.max(1, Math.min(requested, pool.length));
  return shuffle(pool)
    .slice(0, count)
    .map((entry) => ({ text: entry.text }));
}

// ---- Personal-secret rounds (Secret Personality, Secret Identity) -----------

/** One secret a single player gets to play out. `value` is the short label shown
 *  both on the card title (via `titleFor`) and in the end-of-round recap. */
export interface PersonalSecret {
  value: string;
  hint: string;
}

/** Deal one secret per player from `items`, then offer a recap reveal listing who
 *  had what. Shared by the two "everyone gets a different secret, guess at the
 *  end" games. Items shuffle each round; if there are more players than items the
 *  list wraps, so a couple of players may share — fine for a party game. */
export function dealPersonalSecrets(
  players: Player[],
  items: PersonalSecret[],
  config: { accent: string; titleFor: (value: string) => string; revealLabel: string },
  options: OptionValues,
): Round {
  const deck = shuffle(items);
  const fallback: PersonalSecret = { value: "", hint: "" };
  const dealt = players.map((player, index) => {
    const secret = deck.length > 0 ? (deck[index % deck.length] ?? fallback) : fallback;
    return { playerId: player.id, value: secret.value, hint: secret.hint };
  });

  const cards: SecretCard[] = dealt.map((entry) => ({
    playerId: entry.playerId,
    title: config.titleFor(entry.value),
    subtitle: entry.hint,
    accent: config.accent,
  }));

  return {
    kind: "secret",
    cards,
    timerSeconds: timerSecondsFrom(options),
    reveal: revealEnabled(options)
      ? {
          label: config.revealLabel,
          playerIds: [],
          assignments: dealt.map((entry) => ({ playerId: entry.playerId, value: entry.value })),
        }
      : undefined,
  };
}
