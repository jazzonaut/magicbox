import type { GameDefinition, OptionValues, Player, SecretCard } from "@/games/types";
import { pickOne, shuffle } from "@/utils/random";
import { revealEnabled, revealOption, timerOption, timerSecondsFrom } from "@/games/shared";
import { WORD_PAIRS } from "./word-pairs";

export const wordWolf: GameDefinition = {
  id: "word-wolf",
  name: "Word Wolf",
  emoji: "🐺",
  description:
    "Everyone gets a word. One sneaky wolf gets a different one, but nobody knows who. Talk and find the odd word out.",
  minPlayers: 3,
  // Not knowing whether you're the wolf is the whole game — so no role reveal up
  // front. The extras below only ever change things after the round, or scale
  // the pack of wolves for bigger groups.
  options: [
    revealOption,
    timerOption,
    {
      kind: "number",
      key: "wolves",
      label: "Number of wolves",
      help: "Two wolves share the odd word — harder to sniff out (capped to fit the group).",
      default: 1,
      min: 1,
      max: 2,
    },
  ],

  createRound(players: Player[], options: OptionValues) {
    const pair = pickOne(WORD_PAIRS);
    // Randomise which word is the majority's so the pair alone gives nothing away.
    const shuffled = shuffle(pair);
    const majorityWord = shuffled[0] ?? pair[0];
    const wolfWord = shuffled[1] ?? pair[1];

    // Keep at least two players on the majority word so there's a crowd to blend
    // into.
    const requested = typeof options.wolves === "number" ? options.wolves : 1;
    const maxWolves = Math.max(1, players.length - 2);
    const wolfCount = Math.min(Math.max(1, Math.round(requested)), maxWolves);
    const wolfIds = new Set(
      shuffle(players)
        .slice(0, wolfCount)
        .map((p) => p.id),
    );

    const cards: SecretCard[] = players.map((player) => ({
      playerId: player.id,
      title: wolfIds.has(player.id) ? wolfWord : majorityWord,
      subtitle: "Keep this to yourself",
    }));

    return {
      kind: "secret",
      cards,
      timerSeconds: timerSecondsFrom(options),
      reveal: revealEnabled(options)
        ? {
            label: wolfCount > 1 ? "The wolves were" : "The wolf was",
            playerIds: [...wolfIds],
            note: `Wolf word: ${wolfWord} · Everyone else: ${majorityWord}`,
          }
        : undefined,
    };
  },
};
