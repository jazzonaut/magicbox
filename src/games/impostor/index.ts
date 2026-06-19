import type { GameDefinition, Player, OptionValues, SecretCard } from "@/games/types";
import { pickOne, shuffle } from "@/utils/random";
import { revealEnabled, revealOption, timerOption, timerSecondsFrom } from "@/games/shared";
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
    revealOption,
    timerOption,
    {
      kind: "number",
      key: "impostors",
      label: "Number of impostors",
      help: "More than one turns it into a bluffing team game (capped to fit the group).",
      default: 1,
      min: 1,
      max: 3,
    },
    {
      kind: "boolean",
      key: "impostorsKnowEachOther",
      label: "Impostors know each other",
      help: "With two or more, tell them they're not alone so they can team up.",
      default: false,
    },
  ],

  createRound(players: Player[], options: OptionValues) {
    const giveHint = options.impostorHint === true;
    const knowEachOther = options.impostorsKnowEachOther === true;

    // Honour a chosen category; fall back to a random one for "Surprise me" or
    // any stale value no longer in the bank.
    const chosen = typeof options.category === "string" ? options.category : RANDOM_CATEGORY;
    const pick =
      chosen === RANDOM_CATEGORY
        ? pickOne(WORD_BANK)
        : (WORD_BANK.find((c) => c.category === chosen) ?? pickOne(WORD_BANK));
    const word = pickOne(pick.words);

    // Clamp the requested impostor count so at least two players always share the
    // real word — otherwise there's nothing to bluff against.
    const requested = typeof options.impostors === "number" ? options.impostors : 1;
    const maxImpostors = Math.max(1, players.length - 2);
    const impostorCount = Math.min(Math.max(1, Math.round(requested)), maxImpostors);

    const impostorIds = new Set(
      shuffle(players)
        .slice(0, impostorCount)
        .map((p) => p.id),
    );
    const teamHint = knowEachOther && impostorCount > 1 ? ` (${impostorCount} of you)` : "";

    const cards: SecretCard[] = players.map((player) => {
      if (impostorIds.has(player.id)) {
        return {
          playerId: player.id,
          title: "You're the impostor",
          subtitle: giveHint
            ? `Hint: ${pick.category}${teamHint}`
            : `Blend in. Don't get caught.${teamHint}`,
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

    return {
      kind: "secret",
      cards,
      timerSeconds: timerSecondsFrom(options),
      reveal: revealEnabled(options)
        ? {
            label: impostorCount > 1 ? "The impostors were" : "The impostor was",
            playerIds: [...impostorIds],
            note: `The word was: ${word}`,
          }
        : undefined,
    };
  },
};
