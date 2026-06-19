import type { GameDefinition, OptionValues, Player } from "@/games/types";
import { buildPromptDeck, kidFriendlyOption, packOption, roundsOption } from "@/games/shared";
import { MOST_LIKELY_TO, MLT_PACKS } from "./prompts";

export const mostLikelyTo: GameDefinition = {
  id: "most-likely-to",
  name: "Most Likely To",
  emoji: "👉",
  description:
    "Read one out, then on the count of three everyone points at who fits best. Keep it kind!",
  minPlayers: 3,
  options: [packOption(MLT_PACKS), kidFriendlyOption, roundsOption],

  createRound(_players: Player[], options: OptionValues) {
    return { kind: "prompts", prompts: buildPromptDeck(MOST_LIKELY_TO, options) };
  },
};
