import type { GameDefinition, OptionValues, Player } from "@/games/types";
import { shuffle } from "@/utils/random";
import { WOULD_YOU_RATHER } from "./prompts";

export const wouldYouRather: GameDefinition = {
  id: "would-you-rather",
  name: "Would You Rather",
  emoji: "🤔",
  description:
    "A deck of silly dilemmas. Read one out, then everyone says which they'd pick and why.",
  minPlayers: 2,
  options: [],

  createRound(_players: Player[], _options: OptionValues) {
    return { kind: "prompts", prompts: shuffle(WOULD_YOU_RATHER).map((text) => ({ text })) };
  },
};
