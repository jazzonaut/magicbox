import type { GameDefinition, OptionValues, Player } from "@/games/types";
import { shuffle } from "@/utils/random";
import { MOST_LIKELY_TO } from "./prompts";

export const mostLikelyTo: GameDefinition = {
  id: "most-likely-to",
  name: "Most Likely To",
  emoji: "👉",
  description:
    "Read one out, then on the count of three everyone points at who fits best. Keep it kind!",
  minPlayers: 3,
  options: [],

  createRound(_players: Player[], _options: OptionValues) {
    return { kind: "prompts", prompts: shuffle(MOST_LIKELY_TO).map((text) => ({ text })) };
  },
};
