import type { GameDefinition, OptionValues, Player } from "@/games/types";
import { dealPersonalSecrets, revealOption, timerOption } from "@/games/shared";
import { TRAITS } from "./traits";

const ACCENT = "#8b5cf6";

export const secretPersonality: GameDefinition = {
  id: "secret-personality",
  name: "Secret Personality",
  emoji: "🎭",
  description:
    "Everyone secretly gets a personality — dramatic, suspicious, overly polite. Subtly play it up, then guess who had what.",
  minPlayers: 3,
  options: [revealOption, timerOption],

  createRound(players: Player[], options: OptionValues) {
    return dealPersonalSecrets(
      players,
      TRAITS,
      {
        accent: ACCENT,
        titleFor: (value) => `You are: ${value}`,
        revealLabel: "Everyone's secret personality",
      },
      options,
    );
  },
};
