import type { GameDefinition, OptionValues, Player, SecretCard } from "@/games/types";
import { pickOne, shuffle } from "@/utils/random";
import { WORD_PAIRS } from "./word-pairs";

export const wordWolf: GameDefinition = {
  id: "word-wolf",
  name: "Word Wolf",
  emoji: "🐺",
  description:
    "Everyone gets a word. One sneaky wolf gets a different one, but nobody knows who. Talk and find the odd word out.",
  minPlayers: 3,
  // No role reveal, no hint: not knowing whether you're the wolf is the whole game.
  options: [],

  createRound(players: Player[], _options: OptionValues) {
    const pair = pickOne(WORD_PAIRS);
    // Randomise which word is the majority's so the pair alone gives nothing away.
    const shuffled = shuffle(pair);
    const majorityWord = shuffled[0] ?? pair[0];
    const wolfWord = shuffled[1] ?? pair[1];
    const wolf = pickOne(players);

    const cards: SecretCard[] = players.map((player) => ({
      playerId: player.id,
      title: player.id === wolf.id ? wolfWord : majorityWord,
      subtitle: "Keep this to yourself",
    }));

    return { kind: "secret", cards };
  },
};
