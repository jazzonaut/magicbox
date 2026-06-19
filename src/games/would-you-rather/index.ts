import type { GameDefinition, OptionValues, Player } from "@/games/types";
import { buildPromptDeck, kidFriendlyOption, packOption, roundsOption } from "@/games/shared";
import { WOULD_YOU_RATHER, WYR_PACKS } from "./prompts";

export const wouldYouRather: GameDefinition = {
  id: "would-you-rather",
  name: "Would You Rather",
  emoji: "🤔",
  description:
    "A deck of silly dilemmas. Read one out, then everyone says which they'd pick and why.",
  minPlayers: 2,
  options: [packOption(WYR_PACKS), kidFriendlyOption, roundsOption],

  createRound(_players: Player[], options: OptionValues) {
    return { kind: "prompts", prompts: buildPromptDeck(WOULD_YOU_RATHER, options) };
  },
};
