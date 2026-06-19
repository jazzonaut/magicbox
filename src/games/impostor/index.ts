import type { GameDefinition, Player, OptionValues, SecretCard } from "@/games/types";
import { pickOne } from "@/utils/random";
import { WORD_BANK } from "./word-bank";

const ACCENT_CREW = "#22c55e";
const ACCENT_IMPOSTOR = "#ef4444";

const RANDOM_CATEGORY = "random";

// Category choices are derived from the word bank so the option stays in sync as
// categories are added or removed.
const categoryChoices = [
  { value: RANDOM_CATEGORY, label: "🎲 Surprise me" },
  ...WORD_BANK.map((c) => ({ value: c.category, label: c.category })),
];

export const impostor: GameDefinition = {
  id: "impostor",
  name: "Impostor",
  emoji: "🕵️",
  description:
    "Everyone gets the same secret word, except one impostor. Talk it out and unmask the faker.",
  minPlayers: 3,
  options: [
    {
      kind: "select",
      key: "category",
      label: "Word category",
      help: "Pick a theme, or let MagicBox surprise you.",
      default: RANDOM_CATEGORY,
      choices: categoryChoices,
    },
    {
      kind: "boolean",
      key: "impostorHint",
      label: "Give the impostor a hint",
      help: "Shows the category as a clue so the impostor can bluff along.",
      default: false,
    },
  ],

  createRound(players: Player[], options: OptionValues) {
    const giveHint = options.impostorHint === true;

    // Honour a chosen category; fall back to a random one for "Surprise me" or
    // any stale value no longer in the bank.
    const chosen = typeof options.category === "string" ? options.category : RANDOM_CATEGORY;
    const pick =
      chosen === RANDOM_CATEGORY
        ? pickOne(WORD_BANK)
        : (WORD_BANK.find((c) => c.category === chosen) ?? pickOne(WORD_BANK));
    const word = pickOne(pick.words);
    const impostorPlayer = pickOne(players);

    const cards: SecretCard[] = players.map((player) => {
      if (player.id === impostorPlayer.id) {
        return {
          playerId: player.id,
          title: "You're the impostor",
          subtitle: giveHint ? `Hint: ${pick.category}` : "Blend in. Don't get caught.",
          accent: ACCENT_IMPOSTOR,
        };
      }
      return {
        playerId: player.id,
        title: word,
        subtitle: "Keep it secret",
        accent: ACCENT_CREW,
      };
    });

    return { kind: "secret", cards };
  },
};
